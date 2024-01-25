import {
    Component,
    OnInit,
    ViewChild,
    QueryList,
    ViewChildren,
    ElementRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from "@angular/forms";
import { StateDataForm } from "../../admin.model";
import {
    OverlayRef,
    Overlay,
    OverlayConfig,
    PositionStrategy,
} from "@angular/cdk/overlay";
import { TemplatePortalDirective, Portal } from "@angular/cdk/portal";
import { DatePipe } from "@angular/common";
import { CalendarEvent } from "calendar-utils";
import { InventaryService } from "../inventary/inventary.service";
import { LocalStorageService } from "@root/app/shared/providers/storage/local-storage.service";
import { filter } from "rxjs/operators";
import { GlobalService } from "../../services/global.service";
import { addMonths, addDays, endOfWeek } from "date-fns";
import { validatorsForm } from "../inventary/inventary.model";
import { LoadingService } from "../../services/loading.service";
import * as moment from "moment";
import { MatDialog } from "@angular/material/dialog";
import { AppService } from "@root/app/app.service";
import { ModalResponseComponent } from "@root/app/shared/components/modal-response/modal-response.component";
import { UtilsHelper } from "../../utils_helper";
import {
    MESSAGE_ERROR,
    SCREEN_SCHEDULING_FORM,
} from "@root/app/shared/shared.variables";
import { EVENTS_ANALYTICS } from "@root/app/app.constants";
import { TypesProductService } from "../types-product/types-product";
import { MarkProductService } from "../mark-product/mark-product";
import { StoreService } from "../store/store";
import { ClasificationProductService } from "../clasification-product/clasification-product";

@Component({
    selector: "app-inventary-add",
    templateUrl: "./inventary-add.component.pug",
    styleUrls: ["./inventary-add.component.scss"],
})
export class InventaryAddComponent implements OnInit {
    value_suministro: string = "1";
    overlayPosition: PositionStrategy;
    min_date: Date = new Date();
    max_date: Date = new Date();
    overlayRef: OverlayRef;
    formAdd: FormGroup;
    infoDateSelect: DateSelect[];
    tooltipInfo: any[];
    contactSelect: FormControl = new FormControl();
    order_code: number = 1;
    is_edit: boolean = false;
    messageTexts    : any;
    disabledCombo: boolean = false;
    // Estados de data del formulario
    state_data: StateDataForm = { edit: false, new: true, recupered: false };
    @ViewChild("toogle") toogle;
    // Overlays calandario
    @ViewChildren(TemplatePortalDirective) templatePortals: QueryList<
        Portal<any>
    >;
    @ViewChild("portal1", { static: true }) portal1: TemplatePortalDirective;
    @ViewChild("portal2", { static: true }) portal2: TemplatePortalDirective;
    @ViewChild("portal3", { static: true }) portal3: TemplatePortalDirective;
    @ViewChild("portal4", { static: true }) portal4: TemplatePortalDirective;

    infoIcon = "./assets/images/info-icon.png";
    showContainerDetails: boolean = false;
    showImgInfo: boolean = false;
    showLowMessage: boolean = false;

    minDate: Date = new Date();
    maxDate: Date = addMonths(new Date(), 1);
    minDate2: any;
    tmp_selectedDays: any;
    tmp_selectedDay: any;

    // VALIDACIONES
    maxLengthVolume: number = validatorsForm.maxLengthVolume;
    minHour: number = validatorsForm.minHour;
    maxHour: number = validatorsForm.maxHour;
    minMinute: number = validatorsForm.minMinute;
    maxMinute: number = validatorsForm.maxMinute;
    maxValueObs: number = validatorsForm.maxValueObs;
    is_data_save: any;
    regex_number: any = /^(?:100(?:\.0)?|\d{1,4}(?:\.\d)?)$/;
    data_edit: any;

    typeProductList:any;
    markProductList:any;
    tempClasificationProductList:any;
    clasificationProductList:any = [];
    storeList:any;
    id_product:any;
    stateList = [{
        id_state :  'BUENO',
        description: 'BUENO'
    },
    {
        id_state :  'MALO',
        description: 'MALO'
    }]

    situationList = [{
        id_state :  'OPERATIVO',
        description: 'OPERATIVO'
    },
    {
        id_state :  'INOPERATIVO',
        description: 'INOPERATIVO'
    }]
    // IMPORTANTE : route, elem, Aunque no se usen deben estar en el constructor para analitycs
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public overlay: Overlay,
        private datePipe: DatePipe,
        private invetarySrv: InventaryService,
        private storageSrv: LocalStorageService,
        private globalSrv: GlobalService,
        private loading: LoadingService,
        private dialog: MatDialog,
        private utils: UtilsHelper,
        public appSrv: AppService,
        public typesProductSrv: TypesProductService,
        public markProductSrv: MarkProductService,
        public clasificationProductSrv: ClasificationProductService,
        public storeSrv: StoreService,
        // Importante para analitycs
        private route: ActivatedRoute,
        private elem: ElementRef
    ) {
        this.route.params.subscribe((params) => {
            this.id_product = +params["id"];
        });
    }

    async ngOnInit() {
        this.data_edit = null;
        this.typeProductList = await this.typesProductSrv.getAll().toPromise();
        this.markProductList = await this.markProductSrv.getAll().toPromise();
        this.tempClasificationProductList = await this.clasificationProductSrv.getAll().toPromise();
        this.storeList = await this.storeSrv.getAll().toPromise();
        this.loading.changeStatus(true);
        if(this.id_product) {
            const [data] = await this.invetarySrv.getById(this.id_product).toPromise();
            console.log('data', data);
            this.clasificationProductList = this.tempClasificationProductList.filter(row => { return +row.id_type_product === data.id_type_product});
            this.formAdd = this.__buildForm(data);
        } else {
            this.formAdd = this.__buildForm();
        }
        this.listenerForm();
    }

    __buildForm(valueDefault?: any): FormGroup {
        const description = valueDefault?.description || null;
        const id_type_product = valueDefault?.id_type_product || null;
        const id_mark_product = valueDefault?.id_mark_product || null;
        const id_clasification_product = valueDefault?.id_clasification_product || null;
        const measure = valueDefault?.measure || null;
        const state = valueDefault?.state || null;
        const situation = valueDefault?.situation || null;
        const amount = valueDefault?.amount || null;
        const unit = valueDefault?.unit || null;
        const id_store = valueDefault?.id_store || null;
        let form = this.formBuilder.group({
            description: [description, [Validators.required]],
            id_type_product: [id_type_product, [Validators.required]],
            id_mark_product: [id_mark_product, [Validators.required]],
            id_clasification_product: [id_clasification_product, [Validators.required]],
            measure: [measure, [Validators.required]],
            state: [state, [Validators.required]],
            situation: [situation, [Validators.required]],
            amount: [amount, [Validators.required]],
            unit: [unit, [Validators.required]],
            id_store: [id_store, [Validators.required]],
        });
        this.loading.changeStatus(false);
        if (valueDefault) {
            form.markAsTouched();
        }
        return form;
    }

    load_save: boolean = false;
    async saveData(): Promise<any> {
        const _value = this.formAdd.value;
        try {
            if(this.id_product) {
                const data = await this.invetarySrv.editProduct(this.id_product, this.formAdd.value).toPromise();
                this.appSrv.showSnackBar.next({
                    message:'Editado',
                });
                this.formAdd.reset();
                this.router.navigate(["/admin/inventary"]);
            } else {
                const data = await this.invetarySrv.createProduct(this.formAdd.value).toPromise();
                this.appSrv.showSnackBar.next({
                    message:'Creado',
                });
                this.formAdd.reset();
                this.router.navigate(["/admin/inventary"]);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    async listenerForm() {
        this.id_type_product.valueChanges.subscribe(async(type_product) => {
            this.clasificationProductList = this.tempClasificationProductList.filter(row => { return +row.id_type_product === +type_product});
        })
    }

    cancelForm() {
        this.router.navigate(["/admin/inventary"]);
    }

    showError(err) {
        this.loading.changeStatus(false);
        this.appSrv.showSnackBar.next({
            message: err.error.message || err.error.errors || MESSAGE_ERROR,
        });
    }

    closeModal() {
        this.overlayRef.detach();
    }

    showDetails() {
        this.showContainerDetails = !this.showContainerDetails;
    }

    // GET'S FORM
    get id_mark_product() {
        return this.formAdd.controls.id_mark_product;
    }

    get id_type_product() {
        return this.formAdd.controls.id_type_product;
    }

    get id_store() {
        return this.formAdd.controls.id_store;
    }

    get description() {
        return this.formAdd.controls.description;
    }

    get id_clasification_product() {
        return this.formAdd.controls.id_clasification_product;
    }

    get measure() {
        return this.formAdd.controls.measure;
    }

    get state() {
        return this.formAdd.controls.state;
    }

    get situation() {
        return this.formAdd.controls.situation;
    }

    get amount() {
        return this.formAdd.controls.amount;
    }

    get unit() {
        return this.formAdd.controls.unit;
    }
}

export interface DateSelect {
    days?: number[];
    dates?: Date[];
    text?: string;
    month?: number;
    year?: number;
}

import { ActivatedRoute, Router } from "@angular/router";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from "@angular/forms";
import { StateDataForm, } from "../../admin.model";
import {
    OverlayRef,
    Overlay,
    PositionStrategy,
} from "@angular/cdk/overlay";
import { CalendarEvent } from "calendar-utils";
import { LoadingService } from "../../services/loading.service";
import { AppService } from "@root/app/app.service";
import {
    MESSAGE_ERROR,
} from "@root/app/shared/shared.variables";
import { Component, OnInit } from "@angular/core";
import { TypesProductService } from "../types-product/types-product";
import { ClasificationProductService } from "../clasification-product/clasification-product";

@Component({
    selector: "clasification-product-add",
    templateUrl: "./clasification-product-add.component.pug",
    styleUrls: ["./clasification-product-add.component.scss"],
})
export class ClasificationProductAddComponent implements OnInit {
    value_suministro: string = "1";
    overlayPosition: PositionStrategy;
    min_date: Date = new Date();
    max_date: Date = new Date();
    overlayRef: OverlayRef;
    formAdd: FormGroup;
    tooltipInfo: any[];
    contactSelect: FormControl = new FormControl();
    order_code: number = 1;
    is_edit: boolean = false;
    messageTexts    : any;
    disabledCombo: boolean = false;
    // Estados de data del formulario
    state_data: StateDataForm = { edit: false, new: true, recupered: false };
    data_edit: any;

    id_clasification_product: number;
    types_product:any;
    // IMPORTANTE : route, elem, Aunque no se usen deben estar en el constructor para analitycs
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public overlay: Overlay,
        private loading: LoadingService,
        public appSrv: AppService,
        public clasificationProductSrv: ClasificationProductService,
        // Importante para analitycs
        private route: ActivatedRoute,
        public typesProductSrv: TypesProductService,
    ) {
        this.loading.changeStatus(true);
        this.route.params.subscribe((params) => {
            this.id_clasification_product = +params["id"];
        });
    }

    async ngOnInit() {
        this.data_edit = null;
        this.types_product = await this.typesProductSrv.getAll().toPromise();
        if(this.id_clasification_product) {
            const [data] = await this.clasificationProductSrv.getById(this.id_clasification_product).toPromise();
            this.formAdd = this.__buildForm(data);
        } else {
            this.formAdd = this.__buildForm();
        }

    }

    __buildForm(valueDefault?: any): FormGroup {
        const id_clasification_product = valueDefault?.id_clasification_product || null;
        const id_type_product = valueDefault?.id_type_product || null;
        const description = valueDefault?.description || null;
        let form = this.formBuilder.group({
            id_clasification_product: [id_clasification_product],
            id_type_product: [id_type_product, [Validators.required]],
            description: [description, [Validators.required]],
        });
        this.loading.changeStatus(false);
        if (valueDefault) {
            form.markAsTouched();
        }
        return form;
    }

    load_save: boolean = false;
    async saveData(): Promise<any> {
        try {
            if(this.id_clasification_product) {
                const data = await this.clasificationProductSrv.edit(this.id_clasification_product, this.formAdd.value).toPromise();
                this.appSrv.showSnackBar.next({
                    message:'Editado',
                });
                this.formAdd.reset();
                this.router.navigate(["/admin/clasification"]);
            } else {
                const data = await this.clasificationProductSrv.create(this.formAdd.value).toPromise();
                this.appSrv.showSnackBar.next({
                    message:'Creado',
                });
                this.formAdd.reset();
                this.router.navigate(["/admin/clasification"]);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    listenerForm() {

    }

    cancelForm() {
        this.router.navigate(["/admin/clasification"]);
    }

    showError(err) {
        this.loading.changeStatus(false);
        this.appSrv.showSnackBar.next({
            message: err.error.message || err.error.errors || MESSAGE_ERROR,
        });
    }

    get id_type_product() {
        return this.formAdd.controls.id_type_product
    }

    get description() {
        return this.formAdd.controls.description
    }

}

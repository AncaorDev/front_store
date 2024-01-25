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
    PositionStrategy,
} from "@angular/cdk/overlay";
import { CalendarEvent } from "calendar-utils";
import { LoadingService } from "../../services/loading.service";
import { AppService } from "@root/app/app.service";
import {
    MESSAGE_ERROR,
} from "@root/app/shared/shared.variables";
import { Component, OnInit } from "@angular/core";
import { StoreService } from "../store/store";

@Component({
    selector: "store-add",
    templateUrl: "./store-add.component.pug",
    styleUrls: ["./store-add.component.scss"],
})
export class StoreAddComponent implements OnInit {
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

    id_store: number;

    // IMPORTANTE : route, elem, Aunque no se usen deben estar en el constructor para analitycs
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public overlay: Overlay,
        private loading: LoadingService,
        public appSrv: AppService,
        public storeSrv: StoreService,
        // Importante para analitycs
        private route: ActivatedRoute,
    ) {
        this.loading.changeStatus(true);
        this.route.params.subscribe((params) => {
            this.id_store = +params["id"];
        });
    }

    async ngOnInit() {
        this.data_edit = null;
        if(this.id_store) {
            const [data] = await this.storeSrv.getById(this.id_store).toPromise();
            this.formAdd = this.__buildForm(data);
        } else {
            this.formAdd = this.__buildForm();
        }

    }

    __buildForm(valueDefault?: any): FormGroup {
        const description = valueDefault?.description || null;
        const name = valueDefault?.name || null;
        const id_store = valueDefault?.id_store || null;
        let form = this.formBuilder.group({
            description: [description, [Validators.required]],
            name: [name, [Validators.required]],
        });
        this.loading.changeStatus(false);
        if (valueDefault) {
            form.markAsTouched();
        }
        return form;
    }

    selectWork() {}

    load_save: boolean = false;
    async saveData(): Promise<any> {
        try {
            if(this.id_store) {
                const data = await this.storeSrv.edit(this.id_store, this.formAdd.value).toPromise();
                this.appSrv.showSnackBar.next({
                    message:'Editado',
                });
                this.formAdd.reset();
                this.router.navigate(["/admin/stores"]);
            } else {
                const data = await this.storeSrv.create(this.formAdd.value).toPromise();
                this.appSrv.showSnackBar.next({
                    message:'Creado',
                });
                this.formAdd.reset();
                this.router.navigate(["/admin/stores"]);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    listenerForm() {

    }

    cancelForm() {
        this.router.navigate(["/admin/stores"]);
    }

    showError(err) {
        this.loading.changeStatus(false);
        this.appSrv.showSnackBar.next({
            message: err.error.message || err.error.errors || MESSAGE_ERROR,
        });
    }

    get name() {
        return this.formAdd.controls.name
    }

    get description() {
        return this.formAdd.controls.description
    }
}

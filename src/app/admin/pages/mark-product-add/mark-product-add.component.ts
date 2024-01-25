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
import { MarkProductService } from "../mark-product/mark-product";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "mark-product-add",
    templateUrl: "./mark-product-add.component.pug",
    styleUrls: ["./mark-product-add.component.scss"],
})
export class MarkProductAddComponent implements OnInit {
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

    id_mark_product: number;

    // IMPORTANTE : route, elem, Aunque no se usen deben estar en el constructor para analitycs
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public overlay: Overlay,
        private loading: LoadingService,
        public appSrv: AppService,
        public markProductSrv: MarkProductService,
        // Importante para analitycs
        private route: ActivatedRoute,
    ) {
        this.loading.changeStatus(true);
        this.route.params.subscribe((params) => {
            this.id_mark_product = +params["id"];
        });
    }

    async ngOnInit() {
        this.data_edit = null;
        if(this.id_mark_product) {
            const [data] = await this.markProductSrv.getById(this.id_mark_product).toPromise();
            this.formAdd = this.__buildForm(data);
        } else {
            this.formAdd = this.__buildForm();
        }

    }

    __buildForm(valueDefault?: any): FormGroup {
        const description = valueDefault?.description || null;
        const name = valueDefault?.name || null;
        const id_mark_product = valueDefault?.id_mark_product || null;
        let form = this.formBuilder.group({
            id_mark_product: [id_mark_product],
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
            if(this.id_mark_product) {
                const data = await this.markProductSrv.edit(this.id_mark_product, this.formAdd.value).toPromise();
                this.appSrv.showSnackBar.next({
                    message:'Editado',
                });
                this.formAdd.reset();
                this.router.navigate(["/admin/marks"]);
            } else {
                const data = await this.markProductSrv.create(this.formAdd.value).toPromise();
                this.appSrv.showSnackBar.next({
                    message:'Creado',
                });
                this.formAdd.reset();
                this.router.navigate(["/admin/marks"]);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    listenerForm() {

    }

    cancelForm() {
        this.router.navigate(["/admin/marks"]);
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

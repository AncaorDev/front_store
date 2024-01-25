import { ActivatedRoute, Router } from "@angular/router";
import {
    FormGroup,
    FormBuilder,
    Validators,
} from "@angular/forms";
import {
    Overlay,
} from "@angular/cdk/overlay";
import { LoadingService } from "../../services/loading.service";
import { AppService } from "@root/app/app.service";
import {
    MESSAGE_ERROR,
} from "@root/app/shared/shared.variables";
import { MovementsService } from "../movements/movements";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "movements-add-form",
    templateUrl: "./movements-add-form.component.pug",
    styleUrls: ["./movements-add-form.component.scss"],
})
export class MovementsAddFormComponent implements OnInit {
    formAdd: FormGroup;
    is_edit: boolean = false;
    id: number;
    data_edit:any;
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
    }];

    typeMovementList = [{
        id_type_movement : 'INGRESO',
        description: 'INGRESO'
    },
    {
        id_type_movement : 'SALIDA',
        description: 'SALIDA'
    }];
    @Input('products') products:any;
    @Input('form_code') form_code:any;
    @Output() remove = new EventEmitter<any>();
    @Output() update = new EventEmitter<any>();
    productList:any;
    showRemove:boolean = false;
    // IMPORTANTE : route, elem, Aunque no se usen deben estar en el constructor para analitycs
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public overlay: Overlay,
        private loading: LoadingService,
        public appSrv: AppService,
        public movementsSrv: MovementsService,
        // Importante para analitycs
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe((params) => {
            this.id = +params["id"];
        });
    }

    async ngOnInit() {
        this.data_edit = null;
        // this.loading.changeStatus(true);
        if(this.id) {
            const [data] = await this.movementsSrv.getById(this.id).toPromise();
            this.formAdd = this.__buildForm(data);
        } else {
            this.formAdd = this.__buildForm();
        }
        this.formAdd.valueChanges.subscribe(row => {
            this.movementsSrv.updateForm.next({row:this.formAdd, form_code: this.form_code});
        })
    }

    async ngOnChanges() {
        this.productList = this.products;
        this.showRemove = this.form_code != '1';
    }

    __buildForm(valueDefault?: any): FormGroup {
        const id_product = valueDefault?.id_product || null;
        const state = valueDefault?.state || null;
        const situation = valueDefault?.situation || null;
        const type_movement = valueDefault?.type_movement || null;
        const observation = valueDefault?.observation || null;
        const amount = valueDefault?.amount || null;
        const date = valueDefault?.date || null;
        let form = this.formBuilder.group({
            id_product : [id_product, [Validators.required]],
            state: [state, [Validators.required]],
            situation: [situation, [Validators.required]],
            type_movement: [type_movement, [Validators.required]],
            observation: [observation, [Validators.required]],
            amount: [amount, [Validators.required]],
            date: [date, [Validators.required]],
        });
        this.loading.changeStatus(false);
        if (valueDefault) {
            form.markAsTouched();
        }
        return form;
    }

    removeForm() {
        this.remove.emit(this.form_code)
    }

    load_save: boolean = false;
    async saveData(): Promise<any> {
        try {
            if(this.id) {
                const data = await this.movementsSrv.edit(this.id, this.formAdd.value).toPromise();
                this.appSrv.showSnackBar.next({
                    message:'Editado',
                });
                this.formAdd.reset();
                this.router.navigate(["/admin/movements"]);
            } else {
                const data = await this.movementsSrv.create(this.formAdd.value).toPromise();
                this.appSrv.showSnackBar.next({
                    message:'Creado',
                });
                this.formAdd.reset();
                this.router.navigate(["/admin/movements"]);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    listenerForm() {

    }

    cancelForm() {
        this.router.navigate(["/admin/movements"]);
    }

    showError(err) {
        this.loading.changeStatus(false);
        this.appSrv.showSnackBar.next({
            message: err.error.message || err.error.errors || MESSAGE_ERROR,
        });
    }

    get id_product() {
        return this.formAdd.controls.id_product;
    };

    get state() {
        return this.formAdd.controls.state;
    };

    get situation() {
        return this.formAdd.controls.situation;
    };

    get type_movement() {
        return this.formAdd.controls.type_movement;
    };

    get observation() {
        return this.formAdd.controls.observation;
    };

    get amount() {
        return this.formAdd.controls.amount;
    };

    get date() {
        return this.formAdd.controls.date;
    };
}

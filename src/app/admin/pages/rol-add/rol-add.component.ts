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
import { PermissionService } from "../rol/permission";
import { RolService } from "../rol/rol";

@Component({
    selector: "rol-add",
    templateUrl: "./rol-add.component.pug",
    styleUrls: ["./rol-add.component.scss"],
})
export class RolAddComponent implements OnInit {
    value_suministro: string = "1";
    overlayPosition: PositionStrategy;
    min_date: Date = new Date();
    max_date: Date = new Date();
    overlayRef: OverlayRef;
    formAdd: FormGroup;
    temp_month_select: any;
    selectedDays: any = [];
    selectedDay: any = [];
    disabledDays: any = [];
    tooltipInfo: any[];
    contactSelect: FormControl = new FormControl();
    order_code: number = 1;
    is_edit: boolean = false;
    messageTexts    : any;
    disabledCombo: boolean = false;
    // Estados de data del formulario
    state_data: StateDataForm = { edit: false, new: true, recupered: false };
    data_edit: any;

    id_rol: number;
    listPermission:any;

    // IMPORTANTE : route, elem, Aunque no se usen deben estar en el constructor para analitycs
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public overlay: Overlay,
        private loading: LoadingService,
        public appSrv: AppService,
        // Importante para analitycs
        private route: ActivatedRoute,
        public permissionSrv: PermissionService,
        public rolSrv: RolService,
    ) {
        this.loading.changeStatus(true);
        console.log('%crol-add.component.ts line:8', 'color: #007acc;');
        this.route.params.subscribe((params) => {
            this.id_rol = +params["id"];
            console.log('this.id_rol', this.id_rol);
        });
    }

    async ngOnInit() {
        this.data_edit = null;
        this.listPermission = await this.permissionSrv.getAll().toPromise();
        console.log('listPermission', this.listPermission);
        if(this.id_rol) {
            const [data] = await this.rolSrv.getById(this.id_rol).toPromise();
            console.log('data', data);
            this.listPermission.map(row => {
                console.log('row', row);
                row.checked = data.permission_id.includes(row.id_permission);
                console.log('data.permission_id', data.permission_id);
            })
            console.log('this.listPermission', this.listPermission);
            this.formAdd = this.__buildForm(data);
        } else {
            console.log('%crol-add.component.ts line:98 object', 'color: #007acc;');
            this.formAdd = this.__buildForm();
        }
        this.loading.changeStatus(false);
    }

    __buildForm(valueDefault?: any): FormGroup {
        const description = valueDefault?.description || null;
        const name = valueDefault?.name || null;
        const id_rol = valueDefault?.id_rol || null;
        const permission = valueDefault?.permission || null;
        let form = this.formBuilder.group({
            // id_rol: [id_rol],
            description: [description, [Validators.required]],
            name: [name, [Validators.required]],
            // permission: [permission, [Validators.required]],
        });
        this.loading.changeStatus(false);
        if (valueDefault) {
            form.markAsTouched();
        }
        return form;
    }

    load_save: boolean = false;

    changePermission(element, permission) {
        permission.checked = element.checked;
        console.log('%crol-add.component.ts line:122 this.permission', 'color: #007acc;', this.listPermission);
    }

    async saveData(): Promise<any> {
        try {
            const _permission = this.listPermission
            .filter(row => {
                return row.checked;
            }).map(row => row.id_permission)
            if(this.id_rol) {
                const data = await this.rolSrv.edit(this.id_rol, {...this.formAdd.value, permission_id: _permission}).toPromise();
                this.appSrv.showSnackBar.next({
                    message:'Editado',
                });
                this.formAdd.reset();
                this.router.navigate(["/admin/rol"]);
            } else {
                const data = await this.rolSrv.create({...this.formAdd.value, permission_id: _permission}).toPromise();
                this.appSrv.showSnackBar.next({
                    message:'Creado',
                });
                this.formAdd.reset();
                this.router.navigate(["/admin/rol"]);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    listenerForm() {

    }

    cancelForm() {
        this.router.navigate(["/admin/rol"]);
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

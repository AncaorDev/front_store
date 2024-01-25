import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { GlobalService } from "../../services/global.service";
import { NotificationsService } from "@root/app/admin/services/notifications.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Select2Option } from "ng-select2-component";
import { Gtag } from "angular-gtag";
import { UsersService } from "./users.service";
import { UserList, StatusUser, typeUser } from "@root/app/admin/admin.model";
import { AppService } from "@root/app/app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingService } from "@root/app/admin/services/loading.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { of, Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { SCREEN_USER_MANAGER } from "@root/app/shared/shared.variables";
import { AngularFireAnalytics } from "@angular/fire/analytics";
import { EVENTS_ANALYTICS } from "@root/app/app.constants";
import { LocalStorageService } from "@root/app/shared/providers/storage/local-storage.service";
@Component({
    selector: "app-users",
    templateUrl: "./users.component.pug",
    styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
    load: boolean = false;

    filter = [
        { value: 0, desc: "Todos", selected: true },
        { value: 1, desc: "Activos", selected: false },
        { value: 2, desc: "Pendientes", selected: false },
        { value: 3, desc: "Más recientes", selected: false },
    ];
    usuarios: UserList[] = [];
    StatusUser = StatusUser;
    permissionList: any = [];

    user_edit: UserList;
    user_delete: UserList;
    type_user = typeUser;
    usuariosPromise: Observable<any[]>;
    changesUsuario: BehaviorSubject<any> = new BehaviorSubject(null);

    origenActual: string = "";

    @ViewChild("modalEditUser") modalConfirm: ElementRef;
    @ViewChild("modalDeleteUser") modalDeleteUser: ElementRef;
    @ViewChild("modalRejectUser") modalRejectUser: ElementRef;

    // IMPORTANTE : route, elem, Aunque no se usen deben estar en el constructor para analitycs
    constructor(
        private gtag: Gtag,
        public global: GlobalService,
        public notifications: NotificationsService,
        private usersSrv: UsersService,
        private appSrv: AppService,
        private router: Router,
        private loading: LoadingService,
        private modalService: NgbModal,
        private analytics: AngularFireAnalytics,
        private storageSrv: LocalStorageService,
        // Importante para analitycs
        private route: ActivatedRoute,
        private elem: ElementRef
    ) {
        this.loading.changeStatus(true);
        this.global.dataUser = null;
        this.usuariosPromise = this.changesUsuario.pipe(
            map((val) => (val ? this._filter(val) : this.usuarios.slice()))
        );
    }

    async ngOnInit() {
        this.load = true;
        if (this.storageSrv.get("origen") === "menu") {
            this.origenActual = "Menú lateral";
        } else if (this.storageSrv.get("origen") === "dashboard persona") {
            this.origenActual = "dashboard persona";
        } else if (this.storageSrv.get("origen") === "dashboard empresa") {
            this.origenActual = "dashboard empresa";
        } else {
            this.origenActual = "Menú inferior";
        }
        await this.appSrv.setUserData();
        const sizes = this.appSrv.getScreenSize();
        this.analytics.logEvent(EVENTS_ANALYTICS.ADM.SHOW_ADM_USERS, {
            origen: this.origenActual,
            ...sizes,
        });
        try {
            // listSubUser
            let users = await this.usersSrv.listSubUser().toPromise();
            this.usuarios = users.data;
            // listPermisos
            let permisos = await this.appSrv.permissionList().toPromise();
            this.permissionList = permisos.data;

            this.changesUsuario.next(null);
        } catch (err) {}
        this.loading.changeStatus(false);
    }

    title: string = "Listado de Usuarios";
    selectUsers: Select2Option[] = [];
    dataUsers: Select2Option[] = [];
    valueUserId: string = "";
    classViewProjects: String = "";

    searchUsersForm = new FormGroup({
        userId: new FormControl(""),
    });

    // Desplegable: Carga de usuarios
    loadDataUsers() {}

    loadPermission() {}

    _filter(val) {
        return this.usuarios.filter((res, i) => {
            return res.id == val;
        });
    }
    userSearch = [];

    // Desplegable: Busqueda de proyectos
    searchUsers(event: any) {
        // console.log('search :>> ', event.search);

        // var input = document.getElementById("myInput");
        // input.addEventListener("keypress", function(event) {
        //     console.log('event.key :>> ', event.key);

        //     if (event.key === "Enter") {
        //         event.preventDefault();
        //         document.getElementById("myBtn").click();
        //     }
        // });
        this.usersSrv.getSubUserByName(event.search).subscribe(
            (row: any) => {
                this.dataUsers = [];
                row.data &&
                    row.data.map((a) => {
                        this.dataUsers.push({
                            value: a.id,
                            label: a.name + " " + a.lastname,
                        });
                    });
                this.userSearch = row.data;
                this.selectUsers = event.search
                    ? (
                          JSON.parse(
                              JSON.stringify(this.dataUsers)
                          ) as Select2Option[]
                      ).filter(
                          (option) =>
                              option.label
                                  .toLowerCase()
                                  .indexOf(event.search.toLowerCase()) > -1
                      )
                    : JSON.parse(JSON.stringify(this.dataUsers));
            },
            (err) => {
                this.dataUsers = [];
                this.selectUsers = event.search
                    ? (
                          JSON.parse(
                              JSON.stringify(this.dataUsers)
                          ) as Select2Option[]
                      ).filter(
                          (option) =>
                              option.label
                                  .toLowerCase()
                                  .indexOf(event.search.toLowerCase()) > -1
                      )
                    : JSON.parse(JSON.stringify(this.dataUsers));
            }
        );
    }

    // Desplegable: update de variable de búsqueda
    updateUsers(value: string) {
        this.load = false;

        this.usuarios = this.userSearch;
        this.valueUserId = value;
        this.changesUsuario.next(+value);
        this.load = true;
    }

    // Busqueda de proyectos con filtros -> Botón Buscar
    onSubmitSearchProjects() {}

    // Resetear formulario de búsqueda
    async onResetForm() {
        this.load = false;
        const select2 = this.searchUsersForm.get("userId");
        if (select2) select2.reset();
        this.valueUserId = "";
        this.selectUsers = [];
        this.searchUsersForm.reset();
        // listSubUser
        let users = await this.usersSrv.listSubUser().toPromise();
        this.usuarios = users.data;
        this.changesUsuario.next(null);
        this.load = true;
    }

    viewProjects() {
        this.classViewProjects =
            this.classViewProjects == "active" ? "" : "active";
    }

    async changeFilter(b) {
        const sizes = this.appSrv.getScreenSize();
        let fechaActual =
            new Date().getDate() +
            "/" +
            new Date().getMonth() +
            "/" +
            new Date().getFullYear();
        let horaActual = new Date().getHours() + ":" + new Date().getMinutes();
        await this.appSrv.setUserData();
        this.analytics.logEvent(EVENTS_ANALYTICS.ADM.FILTER_LIST_USERS, {
            fecha: fechaActual,
            hora: horaActual,
            ...sizes,
        });
        this.loading.changeStatus(true);
        this.filter.map((a) => {
            a.selected = false;
            if (b.value == a.value) {
                a.selected = true;
            }
        });
        switch (b.value) {
            case 0:
                this.usersSrv.listSubUser().subscribe(
                    (res) => {
                        this.usuarios = res.data;
                        this.changesUsuario.next(null);
                        this.loading.changeStatus(false);
                    },
                    (err) => {
                        this.usuarios = [];
                        this.changesUsuario.next(null);
                        this.loading.changeStatus(false);
                    }
                );
                break;
            case 1:
                this.usersSrv.listSubUser("active").subscribe(
                    (res) => {
                        this.usuarios = res.data;
                        this.changesUsuario.next(null);
                        this.loading.changeStatus(false);
                    },
                    (err) => {
                        this.usuarios = [];
                        this.changesUsuario.next(null);
                        this.loading.changeStatus(false);
                    }
                );
                break;
            case 2:
                this.usersSrv.listSubUser("inactive").subscribe(
                    (res) => {
                        this.usuarios = res.data;
                        this.changesUsuario.next(null);
                        this.loading.changeStatus(false);
                    },
                    (err) => {
                        this.usuarios = [];
                        this.changesUsuario.next(null);
                        this.loading.changeStatus(false);
                    }
                );
                break;
            case 3:
                this.usersSrv.listSubUser(null, true).subscribe(
                    (res) => {
                        this.usuarios = res.data;
                        this.changesUsuario.next(null);
                        this.loading.changeStatus(false);
                    },
                    (err) => {
                        this.usuarios = [];
                        this.changesUsuario.next(null);
                        this.loading.changeStatus(false);
                    }
                );
                break;
            default:
                break;
        }
    }

    permissionActive(perm, permisos) {
        let perms = [];
        permisos.map((row) => {
            perms.push(row.id);
        });
        return perms.includes(perm.id);
    }

    editUser(item) {
        let permission = [];
        let works = [];
        item.permissions.map((row) => {
            permission.push(row.id);
        });
        item.works.map((row) => {
            works.push(row.work_code);
        });
        this.global.dataUser = {
            ...item,
            email: item.email,
            permission,
            works,
            id: item.id,
        };
        this.router.navigate(["/admin/usuarios/agregar"], {
            queryParams: { sub_user: item.id },
        });
    }

    openModalChangeStateUser(item: UserList) {
        this.user_edit = item;
        this.modalService.open(this.modalConfirm, {
            centered: true,
            keyboard: false,
        });
    }

    changeStatusUser(item: UserList = this.user_edit) {
        this.loading.changeStatus(true);
        let new_status =
            item.user_status == StatusUser.activo
                ? StatusUser.inactivo
                : StatusUser.activo;
        this.usersSrv.changeStatusSubUser(item.id, new_status).subscribe(
            (row: any) => {
                if (row.success) {
                    this.loading.changeStatus(false);
                    this.modalService.dismissAll();
                    item.user_status = new_status;
                }
            },
            (err) => {}
        );
    }

    openModalDeleteUser(item: UserList, type?) {
        this.user_delete = item;
        if (type == 3) {
            this.modalService.open(this.modalRejectUser, {
                centered: true,
                keyboard: false,
            });
        } else if (type == 4) {
            this.modalService.open(this.modalDeleteUser, {
                centered: true,
                keyboard: false,
            });
        }
    }

    async deleteUser() {
        const sizes = this.appSrv.getScreenSize();
        let fechaActual =
            new Date().getDate() +
            "/" +
            new Date().getMonth() +
            "/" +
            new Date().getFullYear();
        let horaActual = new Date().getHours() + ":" + new Date().getMinutes();

        await this.appSrv.setUserData();
        this.analytics.logEvent(EVENTS_ANALYTICS.ADM.DELETE_USER, {
            id: this.user_delete.id,
            nombre: this.user_delete.name,
            correo: this.user_delete.email,
            estado: this.user_delete.user_status,
            fecha: fechaActual,
            hora: horaActual,
            ...sizes,
        });

        this.loading.changeStatus(true);
        this.usersSrv.deleteStatusSubUser(this.user_delete.id).subscribe(
            async (row: any) => {
                if (row.success) {
                    await this.appSrv.setUserData();
                    this.analytics.logEvent(
                        EVENTS_ANALYTICS.ADM.DELETE_USER_OK,
                        {
                            id: this.user_delete.id,
                            nombre: this.user_delete.name,
                            correo: this.user_delete.email,
                            estado: this.user_delete.user_status,
                            descripcion: row.message,
                            fecha_ok: fechaActual,
                            hora_ok: horaActual,
                            ...sizes,
                        }
                    );
                    this.usuarios = this.usuarios.filter(
                        (res) => res.id != this.user_delete.id
                    );
                    this.changesUsuario.next(null);
                    this.loading.changeStatus(false);
                    this.modalService.dismissAll();
                }
            },
            async (err) => {
                await this.appSrv.setUserData();
                this.analytics.logEvent(EVENTS_ANALYTICS.ADM.DELETE_USER_ERR, {
                    id: this.user_delete.id,
                    nombre: this.user_delete.name,
                    correo: this.user_delete.email,
                    estado: this.user_delete.user_status,
                    descripcion: err.error.message,
                    fecha_error: fechaActual,
                    hora_error: horaActual,
                    ...sizes,
                });
            }
        );
    }

    async rejectUser() {
        let fechaActual =
            new Date().getDate() +
            "/" +
            new Date().getMonth() +
            "/" +
            new Date().getFullYear();
        let horaActual = new Date().getHours() + ":" + new Date().getMinutes();
        const sizes = this.appSrv.getScreenSize();
        await this.appSrv.setUserData();
        this.analytics.logEvent(EVENTS_ANALYTICS.ADM.REFUSE_USER_PENDING, {
            id: this.user_delete.id,
            nombre: this.user_delete.name,
            correo: this.user_delete.email,
            estado: this.user_delete.user_status,
            fecha: fechaActual,
            hora: horaActual,
            ...sizes,
        });
        this.loading.changeStatus(true);
        this.usersSrv
            .rejectSubUser(this.user_delete.id, this.user_delete.request_id)
            .subscribe(
                async (row: any) => {
                    if (row.success) {
                        await this.appSrv.setUserData();
                        this.analytics.logEvent(
                            EVENTS_ANALYTICS.ADM.REFUSE_USER_PENDING_OK,
                            {
                                id: this.user_delete.id,
                                nombre: this.user_delete.name,
                                correo: this.user_delete.email,
                                estado: this.user_delete.user_status,
                                descripcion: row.message,
                                fecha_ok: fechaActual,
                                hora_ok: horaActual,
                                ...sizes,
                            }
                        );
                        this.usuarios = this.usuarios.filter(
                            (res) => res.id != this.user_delete.id
                        );
                        this.changesUsuario.next(null);
                        this.loading.changeStatus(false);
                        this.modalService.dismissAll();
                    }
                },
                async (err) => {
                    await this.appSrv.setUserData();
                    this.analytics.logEvent(
                        EVENTS_ANALYTICS.ADM.REFUSE_USER_PENDING_ERR,
                        {
                            id: this.user_delete.id,
                            nombre: this.user_delete.name,
                            correo: this.user_delete.email,
                            estado: this.user_delete.user_status,
                            descripcion: err.error.message,
                            fecha_error: fechaActual,
                            hora_error: horaActual,
                            ...sizes,
                        }
                    );
                }
            );
    }

    async onAddUser() {
        const sizes = this.appSrv.getScreenSize();
        let fechaActual =
            new Date().getDate() +
            "/" +
            new Date().getMonth() +
            "/" +
            new Date().getFullYear();
        let horaActual = new Date().getHours() + ":" + new Date().getMinutes();
        await this.appSrv.setUserData();
        this.analytics.logEvent(EVENTS_ANALYTICS.ADM.ADD_USERS, {
            fecha: fechaActual,
            hora: horaActual,
            ...sizes,
        });
    }

    get filterDesc() {
        return this.filter.filter((res) => res.selected)[0].desc;
    }

    get userId() {
        return this.searchUsersForm.controls.userId;
    }
}

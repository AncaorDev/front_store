import { Injectable } from "@angular/core";
import { HeaderService } from "@root/app/header.service";
import { Observable } from "rxjs";
import { HttpParams, HttpClient } from "@angular/common/http";
import { USER } from "@root/app/urls";
import { UtilsHelper } from "@root/app/admin/utils_helper";
import URLS from "@root/app/urls";
@Injectable({
    providedIn: "root",
})
export class UsersService {
    header: any;
    constructor(
        public headerSrv: HeaderService,
        private http: HttpClient,
        private utlHelper: UtilsHelper
    ) {
        this.header = headerSrv.buildServiceToken();
    }

    /**
     * @param {String} status - Para filtrar por  el estado de los sub usuarios //  active / inactive
     * @param {Boolean} latest - Para traer ordenado por fecha de manera descendente.
     * @returns {Users}
     */
    listSubUser(status?, latest?): Observable<any> {
        let params = new HttpParams();
        if (status) {
            params = params.set("status", status);
        }
        if (latest) {
            params = params.set("latest", latest);
        }
        let url = this.utlHelper.urlSanatizer(USER.SUB_USERS_FIL, [
            localStorage.getItem("uid"),
        ]);
        return this.http.get(url, { params: params });
    }

    /**
     * @param {String} id_user - id_usuario, solo si se va actualizar
     * @param {String} email - correo electronico
     * @param {Array<Permissions>} permissions - permisos
     * @param {Array<Works>} works - obras
     * @returns {}
     */
    userRegisterUpdate(
        email,
        permissions,
        works,
        id_user = null,
        request_id = null
    ) {
        if (id_user) {
            let url = this.utlHelper.urlSanatizer(USER.SUB_USER, [
                localStorage.getItem("uid"),
                id_user,
            ]);
            return this.http.put(url, { email, permissions, works });
        } else {
            let url = this.utlHelper.urlSanatizer(USER.SUB_USERS, [
                localStorage.getItem("uid"),
            ]);
            let json;
            if (request_id) {
                json = { email, permissions, works, request_id };
            } else {
                json = { email, permissions, works };
            }
            return this.http.post(url, json);
        }
    }

    /**
     * @param {String} id_user - id_usuario, solo si se va actualizar
     * @returns {}
     */
    getSubUser(id_user) {
        let url = this.utlHelper.urlSanatizer(USER.SUB_USER, [
            localStorage.getItem("uid"),
            id_user,
        ]);
        return this.http.get(url);
    }

    /**
     * @param {String} id_user - id_usuario que se ha habilitar o deshabilitar
     * @param {Number} status -  Valor para activar o desactivar - 1 o 2 (1: activar / 2: desactivar )
     * @returns {}
     */
    changeStatusSubUser(id_user, status) {
        let url = this.utlHelper.urlSanatizer(USER.SUB_USER, [
            localStorage.getItem("uid"),
            id_user,
        ]);
        return this.http.patch(url, { status });
    }

    /**
     * @param {String} id_user - id_usuario que se ha habilitar o deshabilitar
     * @param {Number} request_id
     * @returns {}
     */
    rejectSubUser(id_user, request_id) {
        let url = this.utlHelper.urlSanatizer(USER.SUB_USER, [
            localStorage.getItem("uid"),
            id_user,
        ]);
        return this.http.post(url, { request_id });
    }

    /**
     * @param {String} id_user - id_usuario que se va a eliminar
     * @returns {}
     */
    deleteStatusSubUser(id_user) {
        let url = this.utlHelper.urlSanatizer(USER.SUB_USER, [
            localStorage.getItem("uid"),
            id_user,
        ]);
        return this.http.delete(url);
    }

    /**
     * @param {String} name - texto para buscar
     * @returns {}
     */
    getSubUserByName(name: string) {
        let Params = new HttpParams().set("name", name);
        let url = this.utlHelper.urlSanatizer(USER.SUB_USERS_SEARCH, [
            localStorage.getItem("uid"),
        ]);
        return this.http.get(url, { params: Params });
    }
}

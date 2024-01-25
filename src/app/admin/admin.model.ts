export interface DataResponse {
    success : boolean;
    message : string;
    data    : any;
    status ?: number;
    url    ?: string;
}

export interface Root {
    success: boolean
    payload: Payload
    token: string
}

export interface Payload {
    _employee: Employee
    _user: User
}

export interface Employee {
    employee_id: number
    user_id: number
    rol_id: number
    description: any
    credentials_status: any
}

export interface User {
    user_id: number
    name: string
    last_name: string
    email: string
}

export interface PermissionUser {
    id      : number;
    name    : string;
    disabled?: boolean;
}

export enum StatusUser {
    activo = 1,
    inactivo
}

export enum typeUser {
    admin   = 1,
    company,
    person,
    sub_user,
    seller,
    superadmin
}

export enum typeUserString {
    administrador = 1,
    empresa,
    persona,
    subusuario,
    vendedor,
    superadmin
}

export enum TypeViewSchedule {
    list        = 1,
    calendar
}

export interface StateDataForm {
    edit        : boolean;
    new         : boolean;
    recupered   : boolean,
}

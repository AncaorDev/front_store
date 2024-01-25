import { UserPerm } from '../app.component'


export const permissionDefault:UserPerm[] = [
	{ public: false , link : '/admin/v2/dashboard' , title : 'Inicio' , disabled : false , icono : 'home_new' , order : 1, code: 1, id: 0, size : '18px' ,  padding : '1px' , group : "" },
    { public: false, link : '/admin/types' , title : 'Tipos de Producto' , disabled : false , icono : 'paste_outline'  , order : 2, code: 2, size : '21px', id: 1, group : "" },
    { public: false, link : '/admin/clasification' , title : 'Clasificación' , disabled : false , icono : 'package_distribute'  , order : 3, code: 3, size : '21px', id: 2 , group : "" },
    { public: false, link : '/admin/inventary' , title : 'Inventario' , disabled : false , icono : 'search_barcode'  , order : 3, code: 3, size : '21px', id: 3 , group : "" },
    { public: false, link : '/admin/marks' , title : 'Marcas' , disabled : false , icono : 'document'  , order : 2, code: 2, size : '21px', id: 4 , group : "" },
    { public: false, link : '/admin/movements' , title : 'Movimientos' , disabled : false , icono : 'package_replacement'  , order : 3, code: 3, size : '21px', id: 5 , group : "" },
    { public: false, link : '/admin/rol' , title : 'Roles' , disabled : false , icono : 'maintenance_team'  , order : 3, code: 3, size : '21px', id: 6 , group : "" },
    { public: false, link : '/admin/stores' , title : 'Almacén' , disabled : false , icono : 'warehouse'  , order : 3, code: 3, size : '21px', id: 7, group : "" },
]


export const URL_SOLUTIONS  = "soluciones";
export const URL_BIM        = "bim";
export const URL_EVENTS     = "eventos";
export const URL_LOCATIONS  = "ubicanos";
export const URL_TERMS      = "terms-conditions";
export const URL_PRIVACY    = "privacy_policy";
export const URL_ADMIN      = "admin";
export const URL_ABOUT      = "nosotros";

export const URL_CATEGORY   = "categoria";
export const URL_TYPE       = "type";
export const URL_PROD       = "prod";

export const STATUS_NOT_FOUND = 404;

export const EVENTS_ANALYTICS = {
    TOKEN_PROF_ERR : 'token_store_error',
    BIM: {
      USER_VISITS : 'user_visits'
    },
    DASHBOARD : {
        SHOW_DASHBOARD : 'mostrar_dashboard'
    },
    ORDERS : {
      SHOW_ORDERS : 'mostrar_despachos',
      FILTER_ORDERS_FINALS: 'filtro_despachos_finalizados_ok',
      FILTER_ORDERS_ERR: 'filtro_despachos_finalizados_error'
    },
    ORDERS_HISTORY : {
        SHOW_ORDERS_HISTORY : 'mostrar_despachos_historial'
    },
    ORDERS_HISTORY_DETAILS : {
        SHOW_ORDERS_HISTORY_DETAILS : 'mostrar_despachos_historial_detalles'
    },
    NAVIGATION : {
      SHOW_HOME: 'mostrar_home'
    },
    PROGRAMMING    : {
        SHOW_PROG : 'mostrar_programaciones',
        FILTER_PROG : 'filtrar_programacion',
        DELETE_PROG_CONF : 'eliminar_programacion_confirmada',
        DELETE_PROG_CONF_OK : 'eliminar_programacion_confirmada_ok',
        DELETE_PROG_CONF_ERR : 'eliminar_programacion_confirmada_error',
        EDIT_PROG_CONF : 'editar_programacion_confirmada',
        EDIT_PROG_CONF_OK : 'editar_programacion_confirmada_ok',
        EDIT_PROG_CONF_ERR : 'editar_programacion_confirmada_error',
        CREATE_PROG : 'crear_programacion',
        CREATE_PROG_OK : 'crear_programacion_ok',
        CREATE_PROG_ERR : 'crear_programacion_error',
        CONFIRM_PROG : 'confirmar_programacion',
        CONFIRM_PROG_OK : 'confirmar_programacion_ok',
        CONFIRM_PROG_ERR : 'confirmar_programacion_error',
        DISPLAY_VIEW_PROG : 'vista_pantalla',
        DELETE_PROG_CR : 'eliminar_programacion_creada',
        DELETE_PROG_CR_OK : 'eliminar_programacion_creada_ok',
        DELETE_PROG_CR_ERR : 'eliminar_programacion_creada_error',
        EDIT_PROG_CR : 'editar_programacion_creada',
        EDIT_PROG_CR_OK : 'editar_programacion_creada_ok',
        EDIT_PROG_CR_ERR : 'editar_programacion_creada_error'
    },
    PROFILE  : {
        SHOW_PROFILE : 'mostrar_perfil',
        UPDATE_PASSWORD : 'actualizar_password',
        UPDATE_PASSWORD_OK: 'actualizar_password_ok',
        UPDATE_PASSWORD_ERR : 'actualizar_password_error',
        UPDATE_PROFILE : 'editar_perfil',
        UPDATE_PROFILE_OK : 'editar_perfil_ok',
        UPDATE_PROFILE_ERR : 'editar_perfil_error',
        DELETE_COMPANY : 'eliminar_empresa',
        DELETE_COMPANY_OK : 'eliminar_empresa_ok',
        DELETE_COMPANY_ERR : 'eliminar_empresa_error',
        ADD_COMPANY : 'agregar_empresa',
        ADD_COMPANY_OK : 'agregar_empresa_ok',
        ADD_COMPANY_ERR : 'agregar_empresa_error',
        SHOW_COMPANY_INFO : 'mostrar_informacion_empresa',
    },
    FIND_US : {
        START : 'inicia_ubicanos',
        SHOW_DETAIL: 'mostrar_detalle_distribuidor',
        SHOW_LIST: 'mostrar_lista_distribuidores',
        HOW_TO_GET: 'como_llegar_al_distribuidor'
    },
    TUTORIAL : {
      SHOW_TUTORIAL:  'mostrar_tutorial'
    },
    ADM : {
      SHOW_ADM_USERS : 'mostrar_administracion_usuarios',
      FILTER_LIST_USERS : 'filtrar_lista_usuarios',
      ADD_USERS : 'agregar_usuario',
      ADD_USERS_OK : 'agregar_usuario_ok',
      ADD_USERS_ERR : 'agregar_usuario_error',
      SHOW_DETAIL_USER_ACT : 'mostrar_detalle_usuario_activo',
      DELETE_USER : 'eliminar_usuario',
      DELETE_USER_OK : 'eliminar_usuario_ok',
      DELETE_USER_ERR : 'eliminar_usuario_error',
      EDIT_USER_ACT : 'editar_usuario_activo',
      EDIT_USER_ACT_OK : 'editar_usuario_activo_ok',
      EDIT_USER_ACT_ERR : 'editar_usuario_activo_error',
      APPROVE_USER_PENDING : 'aprobar_usuario_pendiente',
      APPROVE_USER_PENDING_OK : 'aprobar_usuario_pendiente_ok',
      APPROVE_USER_PENDING_ERR : 'aprobar_usuario_pendiente_error',
      REFUSE_USER_PENDING : 'rechazar_usuario_pendiente',
      REFUSE_USER_PENDING_OK : 'rechazar_usuario_pendiente_ok',
      REFUSE_USER_PENDING_ERR : 'rechazar_usuario_pendiente_error'
    },
    TRACKING : {
      SHOW: 'mostrar_tracking',
      SHOW_OK: 'mostrar_tracking_activo_ok',
      SHOW_ERROR: 'mostrar_tracking_activo_error',
      INIT_LATERAL_MENU: 'mostrar_menu_lateral_tracking',
      SELECT_CARD: 'seleccionar_carta_tracking',
      INFO: 'mostrar_tracking_data'
    },
    EVENTS : {
      SHOW: 'mostrar_eventos',
      SHOW_EVENT_SELECT: 'mostrar_evento_seleccionado',
      INIT_INSC_EVENT: 'iniciar_inscripcion_evento',
      INIT_INSC_EVENT_OK: 'inscribir_evento_ok',
      INIT_INSC_EVENT_ERR: 'inscribir_evento_error',
      CANCEL_EVENT: 'cancelar_evento',
      SHARE_EVENT: 'compartir_evento',
      INTEGRATE_CALENDAR_EVENT: 'integrar_evento_calendario',
      NAME_COMPETITOR: 'llamar_participante',
      SEND_EMAIL_COMPETITOR: 'enviar_correo_participante'
    },
    SOLUTIONS : {
      SHOW_SOLUTIONS_CONST: 'ver_soluciones_constructivas',
      SHOW_LIST: 'ver_lista_soluciones_por_tipo',
      FILTER: 'filtrar_soluciones_por_categoria',
      SHARE_DETAIL: 'compartir_detalle_solucion_constructiva',
      SHOW_VIDEO: 'ver_video_solucion_constructiva',
      SHOW_FT: 'ver_ficha_tecnica_solucion_constructiva',
    },
    DOCUMENTS : {
      SHOW_DOCS_WORK : 'mostrar_documentos_de_obra',
      SHOW_DOCS_WORK_SUCCESS : 'mostrar_documentos_de_obra_ok',
      SHOW_DOCS_WORK_ERROR : 'mostrar_documentos_de_obra_error',
      SHOW_CERTIFICATE : 'mostrar_certificado',
      SHOW_CERTIFICATE_SUCCESS : 'mostrar_certificado_ok',
      SHOW_CERTIFICATE_ERROR : 'mostrar_certificado_error',
      DOWNLOAD_ALL : 'descargar_todo',
      DOWNLOAD_ALL_SUCCESS : 'descargar_todo_ok',
      DOWNLOAD_ALL_ERROR : 'descargar_todo_error',
      SHOW_GUIDE : 'mostrar_guia',
      SHOW_GUIDE_SUCCESS : 'mostrar_guia_ok',
      SHOW_GUIDE_ERROR: 'mostrar_guia_error',
      DOWNLOAD_GUIDE : 'descargar_guia',
      DOWNLOAD_GUIDE_SUCCESS : 'descargar_guia_ok',
      DOWNLOAD_GUIDE_ERROR :  'descargar_guia_error'
    }
}


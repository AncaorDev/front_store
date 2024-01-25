export interface RoutesApp {
    link : string;
    name : string;
}
export interface Products {
    logo    : string;
    nombre  : string;
}

export interface Product {
    id                          :   number;
    name                        :   string;
    description                 :   string;
    url                         :   string;
    logo                        :   string;
    category                    :   number;
    numbers_phone               :   any;
    photos                      :   string[];
    show_dealers                :   boolean;
    dealers                     :   Dealer[];
    options                     :   Options[];
    card_options                :   CardOptions[];
    // buttons                  :   Buttons[];
    group_buttons               :   any[];
    presentation                :   Presentation[];
}

export interface Benefit {
    id:string;
    tiltulo:string;
    info:InfoDetail[];
    foto:string;
}
export interface InfoDetail {
    titulo:string;
    detalle:string[];
}

export interface Distributor {
    direccion:string;
    id:number;
    logo:string;
    nombre:string;
    telefono_contacto:any;
    ubicacion_gps:string;
}
export interface Dealer {
    id:number;
    name:string;
    address:string;
    office:string;
    logo:string;
    gps_location:string;
    contact_number:any[];
}
export interface Options {
    id              : number;
    title           : string;
    info            : OptionsInfo[] | CardOptions[];
    photo           : string;
    type_info       : number;  // 1: solo textos, 2: textos y fotos, 3: textos y videos
    array_photos    : string[];
    array_videos    : Videos2[];
    selected        : boolean;
}
export interface OptionsInfo {
    title           : string;
    details         : string[];
}
export interface CardOptions {
    id              : number;
    title           : string;
    info            : CardsInfo[];
    type_info       : number;  // 4: tarjeta sencilla con imagen, 5: tarjeta sencilla sin imagen, 6: tarjeta grande
}
export interface CardsInfo {
    img             : string;
    text            : string;
    url             : string;
    sub_title       : string;
    button_text     : string;
}
export interface  Presentation {
    url             : string;
    button_text     : string;
}
export interface Buttons {
    id                  : number;
    name                : string;
    file_url            : string;
    icon_url            : string;
    color_text          : string;
    color_button_web    : string;
    color_button_start  : string;
    color_button_end    : string;
    color_stroke        : string;
    stroke_width        : string;
    action              : boolean;
}
export interface Videos {
    id              : number;
    titulo          : string;
    descripcion     : string;
    foto            : string;
    codigo_youtube  : string;
    estado          : boolean;
}
export interface Videos2 {
    id              : number;
    title           : string;
    description     : string;
    photo           : string;
    youtube_code    : string;
    state           : boolean;
}
export interface Cards {
    image           : string;
    text            : string;
    url             : string;
}

export interface EventP {
    direccion           : string;
    fecha               : string;
    hora                : string;
    hora_fin            : string;
    hora_inicio         : string;
    hora_final          : string;
    id                  : string;
    titulo              : string;
    foto                ?: string;
    galeria             ?: string[];
    participante        ?: eParticipant[];
    inscription         ?: boolean;
    descripcion         : string;
    en_vivo             : number;
    estado_participado  : number;
    ir_evento           : string;
    permitir_inscripcion: number;
    pregunta            ?: string[];
    presentacion        : string;
    url                 : string;
}
export interface eParticipant {
    apellidos   : string;
    correo      : string;
    empresa     : string;
    fecha_inscripcion: string;
    foto        : string;
    id          : string;
    idEgipto    : number;
    nombre      : string;
    telefono    : string;
}
export interface resultEvent {
    titulo   : string;
    tipo     : string;
    data  : EventD;
}

export interface chartEvent {
    send   : number;
    in_review     : number;
    approved  : number;
}

export interface EventD {
    id            : string;
    titulo        : string;
    direccion     : string;
    fecha         : string;
    hora          : string;
    hora_inicio   : string;
    hora_fin      : string;
    open         ?: boolean;
    detail       ?: EventP;
    load         ?: boolean;
}

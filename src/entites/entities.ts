export interface MenuItem {
    id: number,
    name: string,
    quantity: number,
    desc: string,
    price: number,
    image: string
}

export interface Pedido{
    fecha: string|undefined,
    id_menu: number,
    nombre_menu: string,
    cantidad: number,
    precio_total:number
}

export interface TimeData {
    timeZone: string;
    dateTime: string;
}
//"Europe/Amsterdam"
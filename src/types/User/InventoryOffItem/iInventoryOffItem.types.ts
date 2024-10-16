export interface IInventoryOffItem {
    date: Date;
    reason: string;
    quantity: number;
    description?: string;
}


export interface IInventoryOffAssets {
    date: Date;
    reason: "Activo en uso" | "Activo en reposo" | "Dañado" | "Donado" | "Desechado" | "Reciclado" | "Vendido";
    quantity: number;
    description?: string;
}
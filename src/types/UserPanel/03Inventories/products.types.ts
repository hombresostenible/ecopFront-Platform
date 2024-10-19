import { IInventoryOffItem } from './InventoryOffItem/iInventoryOffItem.types';
import { IIvaAiu } from './RetentonAndTaxes/ivaAiu.types';

export interface IProduct {
    id: string;
    barCode?: string;
    nameItem: string;
    brandItem?: string;
    packaged?: 'Si' | 'No';
    primaryPackageType?: 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas';
    individualPackaging?: 'Si' | 'No';
    secondaryPackageType?: 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas';
    quantityPerPackage?: number,
    returnablePackaging?: 'Si' | 'No';
    inventory: number;
    unitMeasure: 'Unidades' | 'Ristra' | 'Decena' | 'Docena' | 'Miligramo' | 'Gramo' | 'Media libra' | 'Libra' | 'Kilogramo' | 'Caja' | 'Paca' | 'Arroba' | 'Bolsa' | 'Bulto' | 'Caneca' | 'Frasco' | 'Saco' | 'Tonelada' | 'Mililitro' | 'Onza' | 'Botella' | 'Litro' | 'Galon' | 'Pimpina' | 'Metro cubico' | 'Milimetro' | 'Centrimetro' | 'Pulgada' | 'Metro' | 'Centimetro cuadrado' | 'Metro cuadrado';
    inventoryIncrease?: 'Si' | 'No';
    periodicityAutomaticIncrease?: 'Diario' | 'Semanal' | 'Quincenal' | 'Mensual' | 'Bimestral' | 'Trimestral' | 'Semestral';
    automaticInventoryIncrease?: number;
    productionPrice?: number;
    sellingPrice: number;
    isDiscounted?: 'Si' | 'No';
    discountPercentage?: number;
    expirationDate?: Date;
    inventoryChanges?: { date: string; quantity: number, type: 'Ingreso' | 'Salida' }[];
    salesCount?: number;
    inventoryOff?: IInventoryOffItem[];
    reasonManualDiscountingInventory?: 'Donado' | 'Desechado' | 'Caducado' | 'Perdido' | 'Hurtado';
    quantityManualDiscountingInventory?: number;
    productAccesory?: 'Si' | 'No';
    productAccesories?: {
        accesory: string;
        productAccesoryPackageType?: string | null;
    }[];
    productAsset?: 'Si' | 'No';
    productAssets?: {
        nameAssets: string;
        assetId?: string | null;
    }[];
    productRawMaterials?: {
        nameItem: string;
        rawMaterialId?: string | null;
        quantity: string;
    }[];
    // Impuestos y rentenciones
    IVA: 'No aplica' | 0 | 5 | 19;
    ivaAiu?: IIvaAiu;
    consumptionTax: 'No aplica' | 4 | 8 | 16;
    retentionType: 'No aplica' | 'Honorarios y consultoria' | 'Servicios' | 'Compras' | 'Otros' | 'Pagos al exterior y dividendos';
    withholdingTax: 'No aplica' | 0.1 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 6 | 7 | 8 | 10 | 11 | 15 | 20 | 33 | 35;
    withholdingIVA: 'No aplica' | 15 | 100;
    withholdingICA: 'No aplica' | 2 | 3.4 | 4.14 | 5 | 6.9 | 8 | 9.66 | 11.04 | 13.8;
    
    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
}
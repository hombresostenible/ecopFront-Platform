import { IIvaAiu } from '../../types/User/RetentonAndTaxes/ivaAiu.types';

export interface IService {
    id: string;
    barCode?: string;
    nameItem: string;
    sellingPrice?: number;
    isDiscounted?: 'Si' | 'No';
    discountPercentage?: number;
    salesCount?: number;
    serviceAssets?: {
        nameItem: string;
        assetId?: string | null;
    }[];
    serviceProducts?: {
        nameItem: string;
        productlId?: string | null;
        quantity: string;
    }[];
    serviceRawMaterials?: {
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
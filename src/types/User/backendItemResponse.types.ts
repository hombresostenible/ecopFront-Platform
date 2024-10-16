export interface IBackendItem {
    id: string;
    branchId: string;
    barCode: string;
    nameItem: string;
    inventory: number | null;
    IVA: string;
    sellingPrice: number;
    type: 'Assets' | 'Merchandise' | 'Product' | 'RawMaterial' | 'Service';
    userId: string;
}

export interface IBackendItemResponse {
    result: IBackendItem;
}
export interface IBestClientValue {
    id: string;
    transactionDate: string;
    branchId: string;
    transactionCounterpartId: string;
    totalValue: number;
    value: number;
}


export interface IBestClientQuantity {
    id: string;
    transactionDate: string;
    branchId: string;
    transactionCounterpartId: string;
    totalValue: number;
    count: number;
}
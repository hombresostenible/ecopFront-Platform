export interface IAccountsReceivable {
    id: string;
    transactionDate: Date;
    transactionCounterpartId: string;
    creditDescription: string;
    stateAccount?: 'Activo' | 'Pagado';    
    creditWithInterest?: 'Si' | 'No';
    creditInterestRate?: string;
    initialValue?: number;
    initialNumberOfPayments?: number;
    paymentValue?: number;
    currentBalance?: number;
    pendingNumberOfPayments?: number;
    creditPayments?: { date: Date; value: number; branchId: string; userRegister: string }[]; 
    cancellationDate?: Date;
    seller?: string;
    
    //RELACION CON OTRAS TABLAS
    accountsBookId: string;
    assetId?: string;
    merchandiseId?: string;
    productId?: string;
    rawMaterialId?: string;
    serviceId?: string;
    branchId: string;
    userId?: string;
}
export interface IAccountsBookItems {
    nameItem: string;
    id: string;
    type: 'Asset' | 'Merchandise' | 'Product' | 'RawMaterial' | 'Service';
    IVA: string;
    sellingPrice: number;
    purchasePrice?: number;
    quantity: number;
    subTotalValue: number;
}

export interface IAccountsBook {
    id: string;
    registrationDate: string;
    transactionDate: string;
    transactionType: 'Ingreso' | 'Gasto';
    creditCash: 'Contado' | 'Credito';
    meanPayment?: 'Efectivo' | 'Tarjeta de Credito/Debito' | 'Transferencia bancaria (PSE)' | 'Daviplata' | 'Nequi' | 'Movii' | 'Tuya Pay' | 'Dale' | 'Nubank' | 'Uala' | 'Lulo Bank' | 'Tpaga' | 'Powwi' | 'BBVA Wallet' | 'Ahorro a la mano' | 'Apple Pay' | 'Rappipay' | 'Claro Pay'     | 'Baloto' | 'Giro' | 'Cheque';
    initialDate?: Date;
    finalDate?: Date;
    itemsSold?: IAccountsBookItems[];
    itemsBuy?: IAccountsBookItems[];
    otherIncomes: 'Credito del Banco' | 'Credito en Cooperativa' | 'Gota gota' | 'Credito de almacen' | 'Credito de servicios publicos';
    otherExpenses: 'Arriendo' | 'Mantenimiento de equipos, maquinaria, herramientas' | 'Reparaciones locativas' | 'Transporte' | 'Combustible' | 'Nomina' | 'Seguridad Social y/o parafiscales' | 'Acueducto' | 'Energia' | 'Gas' | 'Internet' | 'Celular/Plan de datos' | 'Credito del Banco' | 'Credito en Cooperativa' | 'Gota gota' | 'Credito de almacen' | 'Credito de servicios publicos' | 'IVA' | 'ICA' | 'Declaracion de Renta' | 'Retencion en la Fuente' | 'Predial' | 'Vehiculos y motos' | 'Asesoria Contable' | 'Renovacion Camara de Comercio' | 'Licencias y permisos' | 'Asesoria Juridica' | 'Honorarios de contratista' | 'Honorarios de contratista';
    totalValue: number;
    creditDescription?: string;
    creditWithInterest?: 'Si' | 'No';
    creditInterestRate?: string;    
    numberOfPayments?: number;
    paymentValue?: number;
    paymentNumber?: number;
    accountsReceivable?: number;
    accountsPayable?: number;
    transactionCounterpartId?: number;
    transactionApproved: boolean;
    seller?: string;
    userRegister?: string;
    pay?: 'Si' | 'No';

    //RELACION CON OTRAS TABLAS 
    branchId: string;
    userId?: string;
}
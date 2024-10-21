// PARAMETROS
export interface IParametros {
    ContactoReceptor: {
        CorreoElectronico: string;
        IdEtiquetaUbicacionCorreo: string;
        SoloEnvioCasoDeFalloSpecified: boolean;
    }[];
}



// LINEAS
export interface ILineas {
    Id: {
        Value: string;
    };
    Nota?: {
        Value?: string;
    }[];
    Cantidad: {
        CodUnidad: string;
        Value: number;
    };
    ValorNeto: {
        IdMoneda: string;
        Value: number;
    };
    FechaVigenciaImpuestoSpecified: boolean;
    IndicaEsGratisSpecified: boolean;
    Item: {
        Descripcion: {
            Value: string;
        }[];
        ItemsPorEmpaqueSpecified: boolean;
        IndicaDesdeCatalogoSpecified: boolean;
        Nombre: {
            Value: string;
        };
        IndicadorDePeligroSpecified: boolean;
        IdItemEstandar: {
            Id: {
                SmaIdCodigo: string;
            SmaIdNombre: string;
                Value: string;
            };
        };
        PropiedadesAdicionalesItem?: {
            Nombre?: {
                Value?: string;
            };
            Valor?: {
                Value?: string;
            };
        }[];
    };
    Precio: {
        ValorPrecio: {
            IdMoneda: string;
            Value: number;
        };
        CantidadBase: {
            CodUnidad: string;
            Value: number;
        };
        FactorConvAUnidadPedidoSpecified: boolean;
    };
} [];


// AGREGADOCOMERCIAL
export interface IAgregadoComercial {
    MediosDePago: {
        Id: {
            Value: string;
        };
        CodigoMedioDePago: {
            Value: string;
        };
        FechaLimitePago: Date;
        FechaLimitePagoSpecified: boolean;
        NotaInstruccion: {
            Value: string;
        }[];
        IdPago: {
            Value: string;
        }[];
    }[];
}


// TOTALES
export interface ITotales {
    TotalMonetario: {
        ValorBruto: {
            IdMoneda: string;
            Value: number;
        };
        ValorBaseImpuestos: {
            IdMoneda: string;
            Value: number;
        };
        TotalMasImpuestos: {
            IdMoneda: string;
            Value: number;
        };
        ValorAPagar: {
            IdMoneda: string;
            Value: number;
        };
    };
}


export interface IElectronicInvoicing {
    generationDate: Date | undefined;
    Parametros: IParametros;
    Lineas: ILineas[];
    AgregadoComercial: IAgregadoComercial;
    Totales: ITotales;
    
    //RELACION CON OTRAS TABLAS
    branchId: string;
    accountsBookId?: string;
}
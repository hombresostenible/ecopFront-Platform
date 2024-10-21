// PARAMETROS
export interface IParametros {
    ContactoReceptor: {
        CorreoElectronico: string;                  //"."correo electronico, donde nuestro cliente quiere que le llegue la factura de su cliente, es donde se transmite la factura electrónica
        IdEtiquetaUbicacionCorreo: string;          //"1" - Etiquetra de ese contacto, si queremo que se transmita a varios correos, los relacionamos, es un array de objetos, entonces el primero es etiqueta 1, el segundo es etiqueta 2 y así sucesivamente
        SoloEnvioCasoDeFalloSpecified: boolean;     //false - Siempre esta en false
    }[];
}



// LINEAS
export interface ILineas {                          //^SON CADA UNO DE LOS PRODUCTOS
    Id: {
        Value: string;                              //"1" PARA EL PRIMER PRODUCTO - 2 PARA EL SEGUNDO Y ASI CON CADA UNO DE LOS PRODUCTOS O SERVICIOS QUE COMPONEN LA COMPRA
    };
    Nota: {
        Value: string;
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
                SmaIdCodigo: string;                //VALORES DE ACUERDO CON UNA TABLA
            SmaIdNombre: string;                    //VALORES DE ACUERDO CON UNA TABLA
                Value: string;                      //"ES EL CODIGO DEL PRODUCTO, POR EJEMPLO, EL CODIGO DE BARRAS, EL CODIGO SAP CON EL QUE EL CLIENTE CREO ESE PRODUCTO"
            };
        };
        PropiedadesAdicionalesItem: {
            Nombre: {
                Value: string;
            };
            Valor: {
                Value: string;
            };
        }[];
    };
    Precio: {
        ValorPrecio: {
            IdMoneda: string;                       //"COP"
            Value: number;                          //2100 PRECIO DEL PRODUCTO
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
            Value: string;                          //"1" 1 ES CONTADO, 2 ES A CREDITO
        };
        CodigoMedioDePago: {
            Value: string;                          //"1" ES DE ACUERDO A TABLA, EFECTIVO, CHEQUE, TRANSFERENCIA
        };
        FechaLimitePago: Date;                      //"FECHA" SI LA FACTURA TIENE FECHA LIMITE DE PAGO, ACA SE PONE ESA FECHA
        FechaLimitePagoSpecified: boolean;          //true
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
        ValorBruto: {                               //SIMULACION DE UN PRODUCTO
            IdMoneda: string;                       //COP
            Value: number;                          //TOTAL NETO - 1000
        };
        ValorBaseImpuestos: {
            IdMoneda: string;                       //COP
            Value: number;                          //TOTAL IMPUESTOS - 50
        };
        TotalMasImpuestos: {
            IdMoneda: string;                       //COP
            Value: number;                          //TOTAL NETO + IMPUESTOS - 1050
        };
        ValorAPagar: {
            IdMoneda: string;                       //COP
            Value: number;                          //1050
        };
    };
}


export interface IElectronicInvoicing {
    generationDate: Date | undefined;       // YA
    Parametros: IParametros;                // YA
    Lineas: ILineas;
    AgregadoComercial: IAgregadoComercial;  // YA
    Totales: ITotales;                      // YA
    
    //RELACION CON OTRAS TABLAS
    branchId: string;                       // YA
    accountsBookId?: string;
}
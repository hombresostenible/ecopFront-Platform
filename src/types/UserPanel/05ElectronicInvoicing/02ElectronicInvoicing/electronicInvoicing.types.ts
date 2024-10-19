/*

NIT: 901714110-5
EMPRESA: ECOPCION SAS BIC
TOKEN: 89E33A03-23F7-4B45-A3A1-FE7B6D773B1A
http://fe2.simba.co:8080/TX_TransmisionDocElectronicoSOAP_A02?wsdl
*/



// PARAMETROS
export interface IParametros {
    VersionDocElectronico?: string;                          //"4.0" - No se modifica
    NombreSistemaEmisor?: string;                            //"Ecopcion" - Nuestro software
    VersionSistemaEmisor?: string;                           //"v1.0.0.1" - La versión actual
    ModoRespuesta?: string;                                  //"1" - No se modifica
    TipoAmbiente?: string;                                   //"1" - 1 para producción - 2 para pruebas - 5 para habilitación, Simba nos crea como empresa y nos habilita
    TokenEmpresa?: string;                                   //"TOKEN_ASIGNADO_POR_SIMBA"
    PasswordEmpresa?: string;                                //"" - Dejar en blanco No se usa en el momento
    TipoReporte?: string;                                    //"1"
    Personalizacion: string;                                //"20" - Para el tipo de documento a utilizar
    ContactoReceptor: {
        CorreoElectronico: string;                          //"."correo electronico, donde nuestro cliente quiere que le llegue la factura de su cliente, es donde se transmite la factura electrónica
        IdEtiquetaUbicacionCorreo: string;                  //"1" - Etiquetra de ese contacto, si queremo que se transmita a varios correos, los relacionamos, es un array de objetos, entonces el primero es etiqueta 1, el segundo es etiqueta 2 y así sucesivamente
        SoloEnvioCasoDeFalloSpecified: boolean;             //false - Siempre esta en false
    }[];
    IndicadoresAdicionales?: [                              //^Simba nos informa cuando se usa
        {
            NombreIndicador: string;                        //"SKIPVALIDDIANLOGI"
            Activado: boolean;                              //Por defecto en false, Simba nos informa cuándo cambiarlas
        },
        {
            NombreIndicador: string;                        //"SKIPVALIDDIANREQU"
            Activado: boolean;                              //Por defecto en false, Simba nos informa cuándo cambiarlas
        },
    ];
}


// EXTENCIONES
export interface IExtensiones {
    ContenidoExtension?: {
        FabricanteSoftware?: {                               //^ES OBLIGATOTIO SOLO PARA POS
            InformacionDelFabricanteDelSoftware?: [
                {
                    Name?: string;                           //"NombreApellidos"     --Este string no se cambia
                    Value?: string;                          //"FELIPE HERNANDEZ"    --Este si se cambia, es libre
                },
                {
                    Name?: string;                           //"RazonSocial"         --Este string no se cambia
                    Value?: string;                          //"Ecopcion SAS Bic"    --Este si se cambia, es libre
                },
                {
                    Name?: string;                           //"NombreSoftware"      --Este string no se cambia
                    Value?: string;                          //"EcopcionApp"         --Este si se cambia, es libre
                }
            ]
        };
        BeneficiosComprador?: {
            InformacionBeneficiosComprador?: [               //^ES OPCIONAL SI EL CLIENTE DE NUESTRO CLIENTE TIENE BENEFICIOS COMO ACUMULACION DE PUNTOS
                {
                    Name?: string;                           //"Codigo"
                    Value?: string;                          //"Codigo del comprador" Es código libre
                },
                {
                    Name?: string;                           //"NombreApellidos"
                    Value?: string;                          //"Carlos Mario Reyes"
                },
                {
                    Name?: string;                           //"Puntos"
                    Value?: string;                          //"1000" CANTIDAD DE PUNTOS
                }
            ]
        };
        PuntoVenta?: {
            InformacionCajaVenta?: [                         //^ES OPCIONAL, EL CLIENTE DEBE DE OTORGAR ESTO SI QUIERE QUE EN LA FACTURA POS SE MUESTRE
                {   //PlacaCaja
                    Name?: string;                           //"PlacaCaja"
                    Value?: string;                          //"Corresponde a la Placa de inventario de la Caja"
                },
                {   //UbicaciónCaja
                    Name?: string;                           //"UbicaciónCaja"
                    Value?: string;                          //"Corresponde a la Ubicación de la caja"
                },
                {   //Cajero
                    Name?: string;                           //"Cajero"
                    Value?: string;                          //"Corresponde a los Nombres y apellidos del cajero o vendedor"
                },
                {   //TipoCaja
                    Name?: string;                           //"TipoCaja"
                    Value?: string;                          //"Corresponse al Tipo de Caja"
                },
                {   //CódigoVenta
                    Name?: string;                           //"CódigoVenta"
                    Value?: string;                          //"Corresponde al Código de la Venta"
                },
                {   //SubTotal
                    Name?: string;                           //"SubTotal"
                    Value?: string;                          //"1000"
                },
            ];
        };
        CustomTagGeneral?: {                                 //^SI APLICA PARA FACTURACION ELECTRONICA SIEMPRE Y CUANDO SE EMITA LA FACTURA EN MONEDA EXTRANGERA, SI ES COP NO
            TotalesCop?:{                                    //PARA ANEXO DEL PROCESO TECNICO 1.9
                FctConvCop?: string;
                MonedaCop?: string;
                SubTotalCop?: string;
                DescuentoDetalleCop?: string;
                RecargoDetalleCop?: string;
                TotalBrutoFacturaCop?: string;
                TotIvaCop?: string;
                TotIncCop?: string;
                TotBolCop?: string;
                ImpOtroCop?: string;
                MntImpCop?: string;
                TotalNetoFacturaCop?: string;
                MntDctoCop?: string;
                MntRcgoCop?: string;
                VlrPagarCop?: string;
                ReteFueCop?: string;
                ReteIvaCop?: string;
                ReteIcaCop?: string;
                TotAnticiposCop?: string;
            }[];
        };
    };
} [];


// ENCABEZADO
export interface IEncabezado {
    TipoDocElectronico: string;                             //"1" CADA CODIGO ES UNA FAMILIA 1 ES FACTURA, NOTA CREDITO DEBITO
    IdPersonalizacion: {
        Value: string;                                      //"10" - 10 ES FACTURA ESTANDAR, CAMBIAN DE ACUERDO A LO QUE SE NECESITE, SIMBA DIJO QUE NOS SUMINISTRABA ESAS TABLAS
    };
    PrefijoDocumento: string;                               //
    NumeroDocumento: string;                                //
    IndicaCopiaSpecified: boolean;                          //
    FechaYHoraDocumento: Date;                              //FECHA EN LA QUE SE CREA EL DOCUMENTO, PONER EL DEL MISMO DIA PARA EVITAR NOVEDADES CON LA DIAN
    FechaDeVencimientoSpecified: boolean;                   //false
    TipoDeFactura: {
        Value: string;                                      //"01" - 01 ES FACTURA DE VENTA - 02 FACTURA DE EXPORTACION
    };
    FechaTributariaSpecified: boolean;                      //
    CodigoMoneda: {
        Value: string;                                      //"COP"
    };
    CantidadLineas: number;                                 //1.0   --ES LA CANTIDAD DE PRODUCTOS, UNA LINEA ES UN PRODUCTO
    CantidadLineasSpecified: boolean;                       //true
}


// TERCEROS
export interface ITerceros {
    TerceroProveedorContable: {                             //^ESTOS SON LOS DATOS DE LA EMPRESA QUE EMITE LA FACTURA
        IdAdicional: {
            Value: string;
        }[];
        Tercero: {
            IndicaATravesDeSpecified: boolean;
            IndicaAtencionASpecified: boolean;
            CodigoClasificacionIndustria: {
                Value: string;
            };
            IdTercero: {
                SmaIdCodigo: string;                        //"0" DIGITO DE VERIFICACION DEL NIT
                SmaIdNombre: string;                        //"31" 31 ES NIT
                Value: string;                              //"Nit 900100200" NUMERO DE NIT SIN DIGITO DE VERIFICACION
            }[]
            NombreTercero: {
                Value: string;                              //"Nombre de la empresa"
            }[];
            UbicacionFisica: {
                Direccion: {
                    Id: {                                   //ACA SE DEJAN LOS DATOS DE LA SEDE, DEBE SER DINAMICO DEPENDIENDO DE SU UBICACION
                        Value: string;                      //"11001" ESTE ES EL CODIGO DEL MUNICIPIO SEGUN EL DANE
                    };
                    Departamento: {
                        Value: string;                      //"Bogotá"
                    };
                    Ciudad: {
                        Value: string;                      //"Bogotá, D.C."
                    };
                    ZonaPostal: {
                        Value: string;                      //""
                    };
                    SubdivisionPais: {
                        Value: string;                      //""
                    };
                    SubdivisionPaisCodigo: {
                        Value: string;                      //""
                    };
                    LineaDireccion: {
                        TextoLinea: {
                            Value: string;                  //""
                        }
                    }[];
                    Pais: {
                        Codigo: {
                            Value: string;                  //""
                        };
                        Nombre: {
                            IdLenguaje: string;             //""
                            Value: string                   //""
                        };
                    };
                };
            };
            EsquemaTributarioTercero: {                     //^ESQUEMA TRIBUTARIO PARA QUIEN VA A EMITIR EL DOCUMENTO ELECTRONICO, EN ESTE CASO, NUESTRO CLIENTE
                NombreRegistrado: {
                    Value: string;                          //"Nombre de la empresa"
                };
                NumeroIdTributario: {
                    SmaIdCodigo: string;
                    SmaIdNombre: string;
                    Value: string;
                };
                NivelTributario: {
                    ListaNombre: string;                    //"48" - 48 RESPONSABLE DE IVA o 49 SI NO ES RESPONSABLE DE IVA
                    Value: string;                          //"" SE PONE SEGUN UNA LISTA
                };
                DireccionParaImpuestos: {                   //ES COMO LA ESTRUCTURA DE DIRECCION ANTERIOR
                    Id: {
                        Value: string;
                    };
                    Departamento: {
                        Value: string;
                    };
                    Ciudad: {
                        Value: string;
                    };
                    ZonaPostal: {
                        Value: string;
                    };
                    SubdivisionPais: {
                        Value: string;
                    };
                    SubdivisionPaisCodigo: {
                        Value: string;
                    };
                    LineaDireccion: {
                        TextoLinea: {
                            Value: string;
                        };
                    }[];
                    Pais: {
                        Codigo: {
                            Value: string;
                        };
                        Nombre: {
                            IdLenguaje: string;
                            Value: string;
                        };
                    };
                };
                EsquemaTributario: {                        //HAY UNA TABLA PARA ESTO
                    Id: {
                        Value: string;                      //"01"
                    };
                    Nombre: {
                        Value: string;                      //"IVA"
                    };
                };
            }[];
            EntidadLegalTercero: {                          //REPETIMOS DATOS DE IDENTIFICACION
                NombreRegistrado: {
                    Value: string;                          //"Nombre de la empresa"
                };
                NumeroIdLegal: {
                    SmaIdCodigo: string;
                    SmaIdNombre: string;
                    Value: string;
                };
                FechaRegistroSpecified: boolean;            //false - DEJAR ASI, NO SE UTILIZAN
                FechaExpiracionRegistroSpecified: boolean;  //false - DEJAR ASI, NO SE UTILIZAN
                IndicaPropietarioPersonaSpecified: boolean; //false - DEJAR ASI, NO SE UTILIZAN
                IndicaAccionesPagadasSpecified: boolean;    //false - DEJAR ASI, NO SE UTILIZAN
                EsquemaRegistroCorporativo: {
                    Id: {
                        Value: string;                       //"SETT" ES EL PREFIJO DE LA FACTURA
                    };
                    Nombre: {
                        Value: string;                      //"6496" ES EL NUMERO DE LA FACTURA QUE SE ESTA TRANSMITIENDO
                    };
                };
            }[];
        };
    };
    TerceroClienteContable: {                               //^ESTOS SON LOS DATOS DEL CLIENTE DE LA EMPRESA QUE EMITE LA FACTURA
        IdAdicional: {
            Value: string;
        }[];
        Tercero: {
            IndicaATravesDeSpecified: boolean;
            IndicaAtencionASpecified: boolean;
            CodigoClasificacionIndustria: {
                Value: string;
            };
            IdTercero: {
                SmaIdCodigo: string;
                SmaIdNombre: string;
                Value: string;
            }[];
            NombreTercero: {
                Value: string;
            }[];
            UbicacionFisica: {
                Direccion: {
                    Id: {
                        Value: string;
                    };
                    Departamento: {
                        Value: string;
                    };
                    Ciudad: {
                        Value: string;
                    };
                    ZonaPostal: {
                        Value: string;
                    };
                    SubdivisionPais: {
                        Value: string;
                    };
                    SubdivisionPaisCodigo: {
                        Value: string;
                    };
                    LineaDireccion: {
                        TextoLinea: {
                            Value: string;
                        };
                    }[];
                    Pais: {
                        Codigo: {
                            Value: string;
                        };
                        Nombre: {
                            IdLenguaje: string;
                            Value: string;
                        };
                    };
                };
            };
            EsquemaTributarioTercero: {
                NombreRegistrado: {
                    Value: string;
                };
                NumeroIdTributario: {
                    SmaIdCodigo?: string;
                    SmaIdNombre: string;
                    Value: string;
                };
                NivelTributario: {
                    ListaNombre: string;
                    Value: string;
                };
                DireccionParaImpuestos: {
                    Id: {
                        Value: string;
                    };
                    Departamento: {
                        Value: string;
                    };
                    Ciudad: {
                        Value: string;
                    };
                    ZonaPostal: {
                        Value: string;
                    };
                    SubdivisionPais: {
                        Value: string;
                    };
                    SubdivisionPaisCodigo: {
                        Value: string;
                    };
                    LineaDireccion: {
                        TextoLinea: {
                            Value: string;
                        };
                    }[];
                    Pais: {
                        Codigo: {
                            Value: string;
                        };
                        Nombre: {
                            IdLenguaje: string;
                            Value: string;
                        };
                    };
                };
                EsquemaTributario: {
                    Id: {
                        Value: string;
                    };
                    Nombre: {
                        Value: string;
                    };
                };
            }[];
            EntidadLegalTercero: {
                NombreRegistrado: {
                    Value: string;
                };
                NumeroIdLegal: {
                    SmaIdCodigo: string;
                    SmaIdNombre: string;
                    Value: string;
                };
                FechaRegistroSpecified: boolean;
                FechaExpiracionRegistroSpecified: boolean;
                IndicaPropietarioPersonaSpecified: boolean;
                IndicaAccionesPagadasSpecified: boolean;
                EsquemaRegistroCorporativo: {
                    Id: {
                        Value: string;
                    };
                    Nombre: {
                        Value: string;
                    };
                };
            }[];
        };
    };
}


// LINEAS
export interface ILineas {                                  //^SON CADA UNO DE LOS PRODUCTOS
    Id: {
        Value: string;                                      //"1" PARA EL PRIMER PRODUCTO - 2 PARA EL SEGUNDO Y ASI CON CADA UNO DE LOS PRODUCTOS O SERVICIOS QUE COMPONEN LA COMPRA
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
            Id: {                                           //
                SmaIdCodigo: string;                        //VALORES DE ACUERDO CON UNA TABLA
            SmaIdNombre: string;                            //VALORES DE ACUERDO CON UNA TABLA
                Value: string;                              //"ES EL CODIGO DEL PRODUCTO, POR EJEMPLO, EL CODIGO DE BARRAS, EL CODIGO SAP CON EL QUE EL CLIENTE CREO ESE PRODUCTO"
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
            IdMoneda: string;                               //"COP"
            Value: number;                                  //2100 PRECIO DEL PRODUCTO
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
            Value: string;                                  //"1" 1 ES CONTADO, 2 ES A CREDITO
        };
        CodigoMedioDePago: {
            Value: string;                                  //"1" ES DE ACUERDO A TABLA, EFECTIVO, CHEQUE, TRANSFERENCIA
        };
        FechaLimitePago: Date;                              //"FECHA" SI LA FACTURA TIENE FECHA LIMITE DE PAGO, ACA SE PONE ESA FECHA
        FechaLimitePagoSpecified: boolean;                  //true
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
        ValorBruto: {               //SIMULACION DE UN PRODUCTO
            IdMoneda: string;       //COP
            Value: number;          //1000
        };
        ValorBaseImpuestos: {
            IdMoneda: string;       //COP
            Value: number;          //50
        };
        TotalMasImpuestos: {
            IdMoneda: string;       //COP
            Value: number;          //1050
        };
        ValorAPagar: {
            IdMoneda: string;       //COP
            Value: number;          //1050
        };
    };
}


export interface IElectronicInvoicing {
    id: string;
    Parametros: IParametros;
    Extensiones: IExtensiones;
    Encabezado: IEncabezado;
    Terceros: ITerceros;
    Lineas: ILineas;
    AgregadoComercial: IAgregadoComercial;
    Totales: ITotales;
    
    //RELACION CON OTRAS TABLAS
    branchId: string;
    accountsBookId: string;
    userId: string | null;  
}
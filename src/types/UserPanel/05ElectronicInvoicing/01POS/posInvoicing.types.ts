// PARAMETROS
export interface IParametros {
    VersionDocElectronico: number;
    NombreSistemaEmisor: string;
    VersionSistemaEmisor: number;
    ModoRespuesta: number;
    TipoAmbiente: number;
    TokenEmpresa: string;
    // PasswordEmpresa: string;
    TipoReporte: number;
    Personalizacion: number;
    ContactoReceptor: {
        CorreoElectronico: string;
        IdEtiquetaUbicacionCorreo: number;
        SoloEnvioCasoDeFalloSpecified: boolean;
    }[];
    IndicadoresAdicionales: [
        {
            NombreIndicador: string;
            Activado: boolean;
        },
        {
            NombreIndicador: string;
            Activado: boolean;
        }
    ];
}



// EXTENCIONES
export interface IExtensiones {
    ContenidoExtension: {
        FabricanteSoftware: {
            InformacionDelFabricanteDelSoftware: [
                {
                    Name: string;
                    Value: string;
                },
                {
                    Name: string;
                    Value: string;
                },
                {
                    Name: string;
                    Value: string;
                }
            ];
        };
        ContenidoExtension: {
            BeneficiosComprador: {
                InformacionBeneficiosComprador: [
                    {
                        Name: string;
                        Value: string;
                    },
                    {
                        Name: string;
                        Value: string;
                    },
                    {
                        Name: string;
                        Value: string;
                    }
                ];
            };
        };
        PuntoVenta: {
            InformacionCajaVenta: [
                {
                    Name: string;
                    Value: string;
                },
                {
                    Name: string;
                    Value: string;
                },
                {
                    Name: string;
                    Value: string;
                },
                {
                    Name: string;
                    Value: string;
                },
                {
                    Name: string;
                    Value: string;
                },
                {
                    Name: string;
                    Value: number;
                }
            ];
        };
    };
}[];


// ENCABEZADO
export interface IEncabezado {
    TipoDocElectronico: number;
    IdPersonalizacion: {
        Value: string;
    };
    PrefijoDocumento: string;
    NumeroDocumento: number;
    IndicaCopiaSpecified: boolean;
    FechaYHoraDocumento: Date;
    FechaDeVencimientoSpecified: boolean;
    TipoDeFactura: {
        Value: string;
    };
    FechaTributariaSpecified: boolean;
    CodigoMoneda: {
        Value: string;
    };
    CentroDeCostoCodigo: {          //SOLO PARA POS
        Value: string;
    };
    CentroDeCostoNombre: {          //SOLO PARA POS
        Value: string;
    };
    CantidadLineas: number;
    CantidadLineasSpecified: boolean;
}


// TERCEROS
export interface ITerceros {
    TerceroProveedorContable: {
        IdAdicional: {
            Value: string;
        }[];
        Tercero: {
            IndicaATravesDeSpecified: boolean;
            IndicaAtencionASpecified: boolean;
            CodigoClasificacionIndustria: {
                Value: number;
            };
            IdTercero: {
                SmaIdCodigo: number;
                SmaIdNombre: number;
                Value: number;
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
                        }
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
                    SmaIdCodigo: number;
                    SmaIdNombre: number;
                    Value: number;
                };
                NivelTributario: {
                    ListaNombre: number;
                    Value: string;
                };
                DireccionParaImpuestos: {
                    Id: {
                        Value: number;
                    };
                    Departamento: {
                        Value: string;
                    };
                    Ciudad: {
                        Value: string;
                    };
                    ZonaPostal: {
                        Value: number;
                    };
                    SubdivisionPais: {
                        Value: string;
                    };
                    SubdivisionPaisCodigo: {
                        Value: number;
                    };
                    LineaDireccion: {
                        TextoLinea: {
                            Value: string;
                        }
                    };
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
                        Value: number;
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
                    SmaIdCodigo: number;
                    SmaIdNombre: number;
                    Value: number;
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
                        Value: number;
                    };
                };
            }[];
            Contacto: {
                Nombre: {
                    Value: string;
                };
                Email: {
                    Value: string;
                };
                Nota: [];
            };
        };
    };
    TerceroClienteContable: {
        IdAdicional: {
            Value: number;
        }[];
        Tercero: {
            IndicaATravesDeSpecified: boolean;
            IndicaAtencionASpecified: boolean;
            IdTercero: {
                SmaIdNombre: number;
                Value: number;
            };
            NombreTercero: {
                Value: string;
            };
            EsquemaTributarioTercero: {
                NombreRegistrado: {
                    Value: string;
                };
                NumeroIdTributario: {
                    SmaIdNombre: string;
                    Value: string;
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
        };
    };
}


// LINEAS
export interface ILineas {
    Id: {
        Value: string;
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
    ReferenciaLineaDocPedido: [];
    TotalImpuesto: [
        {
            ValorImpuesto: {
                IdMoneda: string;
                Value: number;
            };
            ValorAjusteRedondeo: {
                IdMoneda: string;
                Value: number;
            };
            IndicaEsSoloEvidencia: boolean;
            IndicaEsSoloEvidenciaSpecified: boolean;
            IndicaImpuestoIncluidoSpecified: boolean;
            SubTotalImpuesto: {
                BaseImponible: {
                    IdMoneda: string;
                    Value: number;
                };
                ValorImpuesto: {
                    IdMoneda: string;
                    Value: number;
                };
                SecuenciaNumericaSpecified: boolean;
                PorcentajeSpecified: boolean;
                PorcentajeRangoSpecified: boolean;
                CategoriaImpuesto: {
                    Porcentaje: number;
                    PorcentajeSpecified: boolean;
                    PorcentajeRangoSpecified: boolean;
                    EsquemaTributario: {
                        Id: {
                            Value: number;
                        };
                        Nombre: {
                            Value: string;
                        };
                    };
                };
            }[];
        },
        {
            ValorImpuesto: {
                IdMoneda: string;
                Value: number;
            };
            ValorAjusteRedondeo: {
                IdMoneda: string;
                Value: number;
            };
            IndicaEsSoloEvidencia: boolean;
            IndicaEsSoloEvidenciaSpecified: boolean;
            IndicaImpuestoIncluidoSpecified: boolean;
            SubTotalImpuesto: {
                BaseImponible: {
                    IdMoneda: string;
                    Value: number;
                };
                ValorImpuesto: {
                    IdMoneda: string;
                    Value: number;
                };
                SecuenciaNumericaSpecified: boolean;
                PorcentajeSpecified: boolean;
                PorcentajeRangoSpecified: boolean;
                CategoriaImpuesto: {
                    Porcentaje: number;
                    PorcentajeSpecified: boolean;
                    PorcentajeRangoSpecified: boolean;
                    EsquemaTributario: {
                        Id: {
                            Value: number;
                        };
                        Nombre: {
                            Value: string;
                        };
                    };
                };
            }[];
        },
    ];
    Item: {
        Descripcion: {
            Value: string;
        }[];
        CantidadEmpaque: {
            CodUnidad: string;
            Value: number;
        };
        ItemsPorEmpaqueSpecified: boolean;
        IndicaDesdeCatalogoSpecified: boolean;
        Nombre: {
            Value: string;
        };
        IndicadorDePeligroSpecified: boolean;
        Marca: {
            Value: string;
        }[];
        Modelo: {
            Value: string;
        }[];
        IdItemComprador: {
            Id: {
                SmaIdCodigo: number;
                SmaIdNombre: string;
                Value: number;
            };
            IdExtendida: {
                Value: string;
            };
            IdCodigoDeBarras: {
                Value: string;
            };
        };
        IdItemVendedor: {
            Id: {
                SmaIdCodigo: number;
                SmaIdNombre: string;
                Value: number;
            };
            IdExtendida: {
                Value: string
            };
            IdCodigoDeBarras: {
                Value: string;
            };
        };
        IdItemEstandar: {
            Id: {
                SmaIdCodigo: number;
                SmaIdNombre: string;
                SmaIdOrgEmisorID: number;
                Value: number;
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
            IdMoneda: string;
            Value: number;
        };
        CantidadBase: {
            CodUnidad: string;
            Value: number;
        };
        FactorConvAUnidadPedidoSpecified: boolean;
    }
}[];


// AGREGADOCOMERCIAL
export interface IAgregadoComercial {
    MediosDePago: {
        Id: {
            Value: number;
        };
        CodigoMedioDePago: {
            Value: number;
        };
        FechaLimitePago: Date;
        FechaLimitePagoSpecified: boolean;
        IdInstruccion: {
            Value: number;
        };
        NotaInstruccion: {
            Value: string;
        }[];
        IdPago: {
            Value: number;
        };
        CuentaFinancieraPagador: {
            Id: {
                Value: number;
            };
            Nombre: {
                Value: string;
            };
            TipoDeCuenta: {
                Value: string;
            };
            CodigoMoneda: {
                Value: string;
            };
            Nota: [];
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
    }[];
}


// TOTALES
export interface ITotales {
    TotalImpuestos: [
        {
            ValorImpuesto: {
                IdMoneda: string;                       //COP
                Value: number;                          //VR EN DINERO DEL IMPUESTO (IVA)
            };
            ValorAjusteRedondeo: {
                IdMoneda: string;                       //COP
                Value: number;                          //VELOR DE LOS CENTAVOS PARA RECONDEO
            };
            IndicaEsSoloEvidenciaSpecified: boolean;
            IndicaImpuestoIncluidoSpecified: boolean;
            SubTotalImpuesto: {
                BaseImponible: {                        //TOTAL PRECIOS SIN IMPUESTOS
                    IdMoneda: string;                   //COP
                    Value: number;                      //VALOR TOTAL PRECIOS 
                };
                ValorImpuesto: {                        //TOTALES IMPUESTOS
                    IdMoneda: string;                   //TIPO DE MONEDA (COP)
                    Value: number;                      //VALOR TOTAL DE IMPUESTOS 
                };
                SecuenciaNumericaSpecified: boolean;
                PorcentajeSpecified: boolean;
                PorcentajeRangoSpecified: boolean;
                CategoriaImpuesto: {
                    Porcentaje: number;                 //ES 19, EL VALOR DEL IVA
                    PorcentajeSpecified: boolean;
                    PorcentajeRangoSpecified: boolean;
                    EsquemaTributario: {
                        Id: {
                            Value: number;
                        };
                        Nombre: {
                            Value: string;
                        };
                    };
                };
            }[];
        },
        {
            ValorImpuesto: {
                IdMoneda: string;       //COP
                Value: number;
            };
            ValorAjusteRedondeo: {
                IdMoneda: string;       //COP
                Value: number;
            };
            IndicaEsSoloEvidenciaSpecified: boolean;
            IndicaImpuestoIncluidoSpecified: boolean;
            SubTotalImpuesto: {
                BaseImponible: {
                    IdMoneda: string;       //COP
                    Value: number;
                };
                ValorImpuesto: {
                    IdMoneda: string;       //COP
                    Value: number;
                };
                SecuenciaNumericaSpecified: boolean;
                PorcentajeSpecified: boolean;
                PorcentajeRangoSpecified: boolean;
                CategoriaImpuesto: {
                    Porcentaje: number;
                    PorcentajeSpecified: boolean;
                    PorcentajeRangoSpecified: boolean;
                    EsquemaTributario: {
                        Id: {
                            Value: number;
                        };
                        Nombre: {
                            Value: string;
                        };
                    };
                };
            }[];
        },
    ];
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
        ValorAjusteRedondeo: {
            IdMoneda: string;
            Value: number;
        };
        ValorAPagar: {
            IdMoneda: string;
            Value: number;
        };
        ValorAPagarAlternativo: {
            IdMoneda: string;
            Value: number;
        };
    };
}


export interface IPosInvoicing {
    id: string;    
    Parametros: IParametros;
    Extensiones: IExtensiones;
    Encabezado: IEncabezado;
    Terceros: ITerceros;
    Lineas: ILineas;
    AgregadoComercial: IAgregadoComercial;
    Notas: [
        {
            Value: string;
        },
        {
            Value: string;
        },
        {
            Value: string;
        },
        {
            Value: string;
        },
        {
            Value: string;
        }
    ];
    Totales: ITotales;
    
    //RELACION CON OTRAS TABLAS
    branchId: string;
    accountsBookId: string;
    userId: string | null; 
}
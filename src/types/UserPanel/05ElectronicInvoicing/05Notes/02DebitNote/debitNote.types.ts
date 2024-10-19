// PARAMETROS
export interface IParametros {
    NombreSistemaEmisor: string;
    TipoAmbiente: string;
    TokenEmpresa: string;
    VersionDocElectronico: string;
    VersionSistemaEmisor: string;
    ModoRespuesta: string;
    PasswordEmpresa: string;
    TipoReporte: string;
    ContactoReceptor: {
        CorreoElectronico: string;
        IdEtiquetaUbicacionCorreo: string;
    }[];
}

// ENCABEZADO
export interface IEncabezado {
    TipoDocElectronico: string;
    IdPersonalizacion: string;
    PrefijoDocumento: string;
    NumeroDocumento: string;
    FechaYHoraDocumento: Date;
    CodigoMoneda: string;
    CantidadLineas: number;
    RespuestaMotivoNota: {
        IdReferencia: string;
        CodRespuesta: string;
        Descripcion: string;
    };
}

// TERCERO
export interface ITerceros {
    TerceroProveedorContable: {
        IdAdicional: string;
        Tercero: {
            NombreTercero: string;
            CodigoClasificacionIndustria: string;
            UbicacionFisica: {
                Direccion: {
                    Id: string;
                    Departamento: string;
                    Ciudad: string;
                    SubdivisionPais: string;
                    SubdivisionPaisCodigo: string;
                    ZonaPostal: string;
                    LineaDireccion: {
                        TextoLinea: string;
                    };
                    Pais: {
                        Codigo: string;
                        Nombre: {
                            IdLenguaje: string;
                            Value: string;
                        };
                    };
                };
            };
            EsquemaTributarioTercero: {
                NombreRegistrado: string;
                NumeroIdTributario: {
                    SmaIdCodigo: string;
                    SmaIdNombre: string;
                    Value: string;
                };
                NivelTributario: {
                    ListaNombre: string;
                    Value: string;
                };
                EsquemaTributario: {
                    Id: string;
                    Nombre: string;
                };
                DireccionParaImpuestos: {
                    Id: string;
                    Departamento: string;
                    Ciudad: string;
                    SubdivisionPais: string;
                    SubdivisionPaisCodigo: string;
                    ZonaPostal: string;
                    LineaDireccion: {
                        TextoLinea: string;
                    };
                    Pais: {
                        Codigo: string;
                        Nombre: {
                            IdLenguaje: string;
                            Value: string;
                        };
                    };
                };
            };
            EntidadLegalTercero: {
                NumeroIdLegal: {
                    SmaIdCodigo: string;
                    SmaIdNombre: string;
                    Value: string;
                };
                NombreRegistrado: string;
                EsquemaRegistroCorporativo: {
                    Id: string;
                    Nombre: string;
                };
            };
            Contacto: {
                Nombre: string;
                Telefono: string;
                Email: string;
            };
        };
    };
    TerceroClienteContable: {
        IdAdicional: string;
        Tercero: {
            IdTercero: {
                SmaIdCodigo: string;
                SmaIdNombre: string;
                Value: string;
            };
            NombreTercero: string;
            UbicacionFisica: {
                Direccion: {
                    Id: string;
                    Departamento: string;
                    Ciudad: string;
                    SubdivisionPais: string;
                    SubdivisionPaisCodigo: string;
                    ZonaPostal: string;
                    LineaDireccion: {
                        TextoLinea: string;
                    };
                    Pais: {
                        Codigo: string;
                        Nombre: {
                            IdLenguaje: string;
                            Value: string;
                        };
                    };
                };
            };
            EsquemaTributarioTercero: {
                NumeroIdTributario: {
                    SmaIdCodigo?: string;
                    SmaIdNombre: string;
                    Value: string;
                };
                NombreRegistrado: string;
                NivelTributario: {
                    ListaNombre: string;
                    Value: string;
                };
                DireccionParaImpuestos: {
                    Id: string;
                    Departamento: string;
                    Ciudad: string;
                    SubdivisionPais: string;
                    SubdivisionPaisCodigo: string;
                    LineaDireccion: {
                        TextoLinea: string;
                    };
                    Pais: {
                        Codigo: string;
                        Nombre: {
                            IdLenguaje: string;
                            Value: string;
                        };
                    };
                };
                EsquemaTributario: {
                    Id: string;
                    Nombre: string;
                };
            };
            EntidadLegalTercero: {
                NombreRegistrado: string
                NumeroIdLegal: {
                    SmaIdCodigo: string;
                    SmaIdNombre: string;
                    Value: string;
                };
                EsquemaRegistroCorporativo: {
                    Nombre: string;
                };
            };
            Contacto: {
                Id: string;
                Nombre: string;
                Telefono: string;
                Email: string;
            };
        };
    };
    TerceroRpteFiscal: {
        IdTercero: {
            SmaIdNombre: string;
            valor: string;
        }
    };
}


// LINEAS
export interface ILineas {
    Id: number;
    Cantidad: {
        CodUnidad: string;
        Value: string;
    };
    ValorNeto: {
        IdMoneda: string;
        Value: number;
    };
    TotalImpuesto: {
        ValorImpuesto: {
            IdMoneda: string;
            valor: number;
        };
        IndicaEsSoloEvidencia: boolean;
        SubTotalImpuesto: {
            BaseImponible: {
                IdMoneda: string;
                valor: number;
            };
            ValorImpuesto: {
                IdMoneda: string;
                valor: number;
            };
            Porcentaje: number;
            CategoriaImpuesto: {
                Porcentaje: number;
                EsquemaTributario: {
                    Id: number;
                    Nombre: string;
                }
            }
        }
    };
    TotalRetenciones: {
        ValorImpuesto: {
            IdMoneda: string;
            valor: number;
        };
        IndicaEsSoloEvidencia: boolean;
        SubTotalImpuesto: {
            BaseImponible: {
                IdMoneda: string;
                valor: number;
            };
            ValorImpuesto: {
                IdMoneda: string;
                valor: number;
            };
            Porcentaje: number;
            CategoriaImpuesto: {
                Porcentaje: number;
                EsquemaTributario: {
                    Id: number;
                    Nombre: string;
                }
            }
        }
    };
    Item: {
        Descripcion: string;
        IdItemEstandar: {
            Id: {
                SmaIdCodigo: string;
                Value: string;
            };
        };
        IdItemVendedor: {
            Id: string;
        };
    }[];
    Precio: {
        ValorPrecio: {
            IdMoneda: string;
            Value: number;
        };
        CantidadBase: {
            CodUnidad: string;
            Value: number;
        };
    };
}

// AGREGADOCOMERCIAL
export interface IAgregadoComercial {
    MediosDePago: {
        Id: string;
        CodigoMedioDePago: string;
        IdInstruccion: string;
        IdPago: string;
    }[];
}

// REFERENCIA
export interface IReferencias {
    ReferenciaFacturacion: {
        ReferenciaDocFactura: {
            Id: string;
            UID: string;
            Fecha: Date;
        };
    };
}

// TOTALES
export interface ITotales {
    TotalImpuestos: {
        ValorImpuesto: {
            IdMoneda: string;
            value: number;
        };
        IndicaEsSoloEvidencia: boolean;
        SubTotalImpuesto: {
            BaseImponible: {
                IdMoneda: string;
                value: number;
            };
            ValorImpuesto: {
                IdMoneda: string;
                value: number;
            };
            Porcentaje: number;
            CategoriaImpuesto: {
                Porcentaje: number;
                EsquemaTributario: {
                    Id: number;
                    Nombre: string;
                }
            }
        }
    }[];
    TotalRetenciones: {
        ValorImpuesto: {
            IdMoneda: string;
            value: number;
        };
        IndicaEsSoloEvidencia: boolean;
        SubTotalImpuesto: {
            BaseImponible: {
                IdMoneda: string;
                value: number;
            };
            ValorImpuesto: {
                IdMoneda: string;
                value: number;
            };
            Porcentaje: number;
            CategoriaImpuesto: {
                Porcentaje: number;
                EsquemaTributario: {
                    Id: number;
                    Nombre: string;
                }
            }
        }
    }[];
    TotalMonetario: {
        ValorBruto: {
            IdMoneda: string;
            Value: number;
        };
        TotalMasImpuestos: {
            IdMoneda: string;
            Value: number;
        };
        ValorBaseImpuestos: {
            IdMoneda: string;
            Value: number;
        };
        ValorAPagar: {
            IdMoneda: string;
            Value: number;
        };
    };
}


export interface IDebitNote {
    id: string;
    Parametros: IParametros;
    Encabezado: IEncabezado;
    Terceros: ITerceros;
    Lineas: ILineas;
    AgregadoComercial: IAgregadoComercial;
    Referencias: IReferencias;
    Notas: string;
    Totales: ITotales;
    
    //RELACION CON OTRAS TABLAS
    branchId: string;
    accountsBookId: string;
    userId: string | null;  
}
/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import jsCookie from 'js-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getProfileUser } from '../../../../../redux/User/userSlice/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
import { postElectronicInvoicing } from '../../../../../redux/User/05ElectronicInvoicing/02ElectronicInvoicing/actions.ts';
// ELEMENTOS DEL COMPONENTE
import { IElectronicInvoicing } from '../../../../../types/UserPanel/05ElectronicInvoicing/02ElectronicInvoicing/electronicInvoicing.types.ts';
import { ICrmClient } from '../../../../../types/UserPanel/07CrmClientSlice/crmClient.types.ts';
import { IAssets } from "../../../../../types/UserPanel/03Inventories/assets.types";
import { IMerchandise } from "../../../../../types/UserPanel/03Inventories/merchandise.types";
import { IProduct } from "../../../../../types/UserPanel/03Inventories/products.types";
import { IRawMaterial } from "../../../../../types/UserPanel/03Inventories/rawMaterial.types";
import { IService } from "../../../../../types/UserPanel/03Inventories/services.types";
import SearchItemsByname from '../../../../../helpers/SearchItemName/SearchItemsByname copy.tsx';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import SearchClientCrm from '../../../../../helpers/SearchClientCrm/SearchClientCrm';
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from "react-icons/fa";
import styles from './styles.module.css';
import { ILineas } from '../../../../../types/UserPanel/05ElectronicInvoicing/02ElectronicInvoicing/electronicInvoicing.types.ts';

function ElectronicInvoicingPage() {
    const navigate = useNavigate();
    const token = jsCookie.get("token") || '';
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const branches = useSelector((state: RootState) => state.branch.branch);
    const errorElectronicInvoicing = useSelector((state: RootState) => state.electronicInvoicing.errorElectronicInvoicing);

    useEffect(() => {
        if (token) {
            dispatch(getProfileUser(token));
            dispatch(getBranches(token))
        }
    }, [token]);

    const { handleSubmit, reset } = useForm<IElectronicInvoicing>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [messageSelectedBranch, setMessageSelectedBranch] = useState<string | null>('');
    const [messageSelectedClient, setMessageSelectedClient] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    // SETEA LA SEDE
    const [selectedBranch, setSelectedBranch] = useState('');
    const handleBranchChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectedBranch(value);
    };
    
    // SETEA LA FECHA DE EMISION DE LA FACTURA
    const [currentDate, setCurrentDate] = useState<Date>();
    useEffect(() => {
        const currentDate = new Date();
        setCurrentDate(currentDate);
    }, []);
    
    // SETEA EL CLIENTE
    const [selectedClient, setSelectedClient] = useState<ICrmClient | null>(null);
    
    // SETEA LOS ARTICULOS 
    const [scannedItems, setScannedItems] = useState<Array<{
        id: number | null;
        item: IAssets | IMerchandise | IProduct | IRawMaterial | IService | null;
        sellingPrice: number | null;
        quantity: number | null;
        discountPercentage: number | null;
    }>>([
        { id: null, item: null, sellingPrice: null, quantity: null, discountPercentage: null }
    ]);
    
    // EVENTO PARA AGREGAR MAS ARTICULOS
    const addRow = () => {
        setScannedItems(prevRows => [
            ...prevRows,
            { id: null, item: null, sellingPrice: null, quantity: null, discountPercentage: null }
        ]);
    };
    
    // CALCULA EL DESCUENTO
    const calculateDiscount = (quantity: number | null, sellingPrice: number | null, discountPercentage: number | null): number => {
        if (quantity && sellingPrice !== null && discountPercentage !== null) {
            const discountValue = (sellingPrice * discountPercentage / 100) * quantity;
            return discountValue;
        }
        return 0;
    };

    // TABLA DE RETENCIONES
    const calculateTaxableBaseForRow = (row: any) => {
        const subtotal = (row.quantity || 1) * (row.item?.sellingPrice || 0);
        const discount = row.discountPercentage ? (row.discountPercentage / 100) * subtotal : 0;
        return subtotal - discount;
    };

    const calculateTotalConsumptionTax = () => {
        return parseFloat(scannedItems.reduce((acc, row) => {
            const consumptionTax = row.item?.consumptionTax;
            if (typeof consumptionTax === "string" && consumptionTax === "No aplica") {
                return acc;
            } else {
                const taxableBase = calculateTaxableBaseForRow(row);
                const consumptionTaxValue = consumptionTax !== undefined ? (typeof consumptionTax === "number" ? consumptionTax : parseInt(consumptionTax, 10)) : 0;
                const taxAmount = taxableBase * (consumptionTaxValue / 100);
                return acc + taxAmount;
            }
        }, 0).toFixed(2));
    };

    const calculateTotalWithholdingTax = () => {
        return parseFloat(scannedItems.reduce((acc, row) => {
            const withholdingTax = row.item?.withholdingTax;
            if (typeof withholdingTax === "string" && withholdingTax === "No aplica") {
                return acc;
            } else if (typeof withholdingTax === "number" || typeof withholdingTax === "string") {
                const taxableBase = calculateTaxableBaseForRow(row);
                const withholdingTaxValue = typeof withholdingTax === "number" ? withholdingTax : parseFloat(withholdingTax);
                const taxAmount = taxableBase * (withholdingTaxValue / 100);
                return acc + taxAmount;
            }
            return acc;
        }, 0).toFixed(2));
    };
    
    const calculateTotalWithholdingIVA = () => {
        return parseFloat(scannedItems.reduce((acc, row) => {
            const withholdingIVA = row.item?.withholdingIVA;
            if (typeof withholdingIVA === "string" && withholdingIVA === "No aplica") {
                return acc;
            } else if (typeof withholdingIVA === "number" || typeof withholdingIVA === "string") {
                const taxableBase = calculateTaxableBaseForRow(row);
                const withholdingIVAValue = typeof withholdingIVA === "number" ? withholdingIVA : parseFloat(withholdingIVA);
                const taxAmount = taxableBase * (withholdingIVAValue / 100);
                return acc + taxAmount;
            }
            return acc;
        }, 0).toFixed(2));
    };
    
    const calculateTotalWithholdingICA = () => {
        return parseFloat(scannedItems.reduce((acc, row) => {
            const withholdingICA = row.item?.withholdingICA;
            if (typeof withholdingICA === "string" && withholdingICA === "No aplica") {
                return acc;
            } else if (typeof withholdingICA === "number" || typeof withholdingICA === "string") {
                const taxableBase = calculateTaxableBaseForRow(row);
                const withholdingICAValue = typeof withholdingICA === "number" ? withholdingICA : parseFloat(withholdingICA);
                const taxAmount = taxableBase * (withholdingICAValue / 100);
                return acc + taxAmount;
            }
            return acc;
        }, 0).toFixed(2));
    };

    const calculateSubtotal = () => {
        return scannedItems.reduce((acc, row) => {
            const totalRowValue = (row.quantity || 1) * (row.item?.sellingPrice || 0);
            return acc + totalRowValue;
        }, 0);
    };
    
    const calculateDiscounts = () => {
        return scannedItems.reduce((acc, row) => {
            const discountValue = ((row.discountPercentage || 0) / 100) * (row.quantity || 1) * (row.item?.sellingPrice || 0);
            return acc + discountValue;
        }, 0);
    };
    
    const calculateTaxableBase = () => {
        return calculateSubtotal() - calculateDiscounts();
    };
    
    const calculateIVA = (taxableBase: number, ivaRate: number) => {
        return taxableBase * (ivaRate / 100);
    };
    
    const calculateTotalIVA = () => {
        const taxableBase = calculateTaxableBase();
        return scannedItems.reduce((acc, row) => {
            const iva = row.item?.IVA;
            if (typeof iva === "string" && iva === "No aplica") {
                return acc;
            } else {
                const ivaValue = iva !== undefined ? (typeof iva === "number" ? iva : parseInt(iva, 10)) : 0;
                const ivaAmount = calculateIVA(taxableBase, ivaValue);
                return acc + ivaAmount;
            }
        }, 0);
    };

    const calculateTotalInvoice = (taxableBase: number, totalIVA: number) => {
        return taxableBase + totalIVA;
    };

    // TABLA DE TOTALES
    const subtotal = calculateSubtotal();
    const discounts = calculateDiscounts();
    const taxableBase = calculateTaxableBase();
    const totalIVA = calculateTotalIVA();
    const totalInvoice = calculateTotalInvoice(taxableBase, totalIVA);

    // SETEA LOS ARTICULOS PARA REGISTRO DE LA FACTURA ELECTRONICA
    const transformScannedItemsToLineas = (items: typeof scannedItems): ILineas[] => {
        return items.map(item => {
            if (!item.item) return null;
            return {
                Id: {
                    Value: item.id ? item.id.toString() : '',
                },
                Cantidad: {
                    CodUnidad: "KGM",
                    Value: item.quantity || 1,
                },
                ValorNeto: {
                    IdMoneda: "COP",
                    Value: (item.item?.sellingPrice ?? 0) * (item.quantity || 1) * (1 - (item.discountPercentage || 0) / 100),
                },
                FechaVigenciaImpuestoSpecified: true,
                IndicaEsGratisSpecified: false,
                Item: {
                    Descripcion: [{ Value: item.item.nameItem }],
                    ItemsPorEmpaqueSpecified: true,
                    IndicaDesdeCatalogoSpecified: false,
                    Nombre: { Value: item.item.nameItem },
                    IndicadorDePeligroSpecified: false,
                    IdItemEstandar: {
                        Id: {
                            SmaIdCodigo: "999",
                            SmaIdNombre: "Estándar de adopción del contribuyente",
                            Value: "001",
                        },
                    },
                    PropiedadesAdicionalesItem: [],
                },
                Precio: {
                    ValorPrecio: {
                        IdMoneda: "COP",
                        Value: (item.item?.sellingPrice ?? 0),
                    },
                    CantidadBase: {
                        CodUnidad: "KGM",
                        Value: item.quantity || 1,
                    },
                    FactorConvAUnidadPedidoSpecified: true,
                },
            };
        }).filter(linea => linea !== null) as ILineas[];
    };

    const onSubmit = async (values: IElectronicInvoicing) => {
        setLoading(true);
        try {
            const formData: IElectronicInvoicing = {
                ...values,
                branchId: selectedBranch,
                generationDate: currentDate,
                Parametros: {
                    ContactoReceptor: [{
                        CorreoElectronico: "carlosmario.reyesp@gmail.com",
                        IdEtiquetaUbicacionCorreo: "1",
                        SoloEnvioCasoDeFalloSpecified: false,
                    }],
                },
                Lineas: transformScannedItemsToLineas(scannedItems),
                AgregadoComercial: {
                    MediosDePago: [{
                        Id: { Value: "1" },
                        CodigoMedioDePago: { Value: "1" },
                        FechaLimitePago: new Date("2024-12-31T16:59:03Z"), // Formato correcto de fecha
                        FechaLimitePagoSpecified: true,
                        NotaInstruccion: [{ Value: 'Nota de ejemplo para la factura' }],
                        IdPago: [{ Value: '123456789' }],
                    }],
                },
                Totales: {
                    TotalMonetario: {
                        ValorBruto: {
                            IdMoneda: 'COP',
                            Value: taxableBase,
                        },
                        ValorBaseImpuestos: {
                            IdMoneda: 'COP',
                            Value: calculateTotalConsumptionTax() + calculateTotalWithholdingTax() + calculateTotalWithholdingIVA() + calculateTotalWithholdingICA() + totalIVA,
                        },
                        TotalMasImpuestos: {
                            IdMoneda: 'COP',
                            Value: taxableBase + calculateTotalConsumptionTax() + calculateTotalWithholdingTax() + calculateTotalWithholdingIVA() + calculateTotalWithholdingICA() + totalIVA,
                        },
                        ValorAPagar: {
                            IdMoneda: 'COP',
                            Value: taxableBase + calculateTotalConsumptionTax() + calculateTotalWithholdingTax() + calculateTotalWithholdingIVA() + calculateTotalWithholdingICA() + totalIVA,
                        },
                    },
                },
            };
            console.log('formData: ', formData);

            // PARAMETROS
            if (formData.Parametros && formData.Parametros.ContactoReceptor && formData.Parametros.ContactoReceptor.length > 0) {
                formData.Parametros.ContactoReceptor[0].CorreoElectronico = "carlosmario.reyesp@gmail.com";
                formData.Parametros.ContactoReceptor[0].IdEtiquetaUbicacionCorreo = "1";
                formData.Parametros.ContactoReceptor[0].SoloEnvioCasoDeFalloSpecified = false;
            } else throw new Error('Parametros o ContactoReceptor no está definido');

            // AGREGADOCOMERCIAL --> PREGUNTAR POR QUE ES UN ARRAY
            if (formData.AgregadoComercial && formData.AgregadoComercial.MediosDePago && formData.AgregadoComercial.MediosDePago.length > 0) {
                formData.AgregadoComercial.MediosDePago[0].Id.Value = "1";
                formData.AgregadoComercial.MediosDePago[0].CodigoMedioDePago.Value = "1";
                formData.AgregadoComercial.MediosDePago[0].FechaLimitePago = new Date("2024-12-31 16:59:03");
                formData.AgregadoComercial.MediosDePago[0].FechaLimitePagoSpecified = true;
                formData.AgregadoComercial.MediosDePago[0].NotaInstruccion = [{ Value: 'Nota de ejemplo para la factura' }];
                formData.AgregadoComercial.MediosDePago[0].IdPago = [{ Value: '123456789' }];
            } else throw new Error('Parametros o ContactoReceptor no está definido');

            formData.Lineas = transformScannedItemsToLineas(scannedItems);

            // TOTALES DE LA FACTURA
            formData.Totales.TotalMonetario.ValorBruto.IdMoneda = 'COP';
            formData.Totales.TotalMonetario.ValorBruto.Value = taxableBase;
            
            formData.Totales.TotalMonetario.ValorBaseImpuestos.IdMoneda = 'COP';
            formData.Totales.TotalMonetario.ValorBruto.Value = calculateTotalConsumptionTax() + calculateTotalWithholdingTax() + calculateTotalWithholdingIVA() + calculateTotalWithholdingICA() + totalIVA;

            formData.Totales.TotalMonetario.TotalMasImpuestos.IdMoneda = 'COP';
            formData.Totales.TotalMonetario.ValorBruto.Value = taxableBase + calculateTotalConsumptionTax() + calculateTotalWithholdingTax() + calculateTotalWithholdingIVA() + calculateTotalWithholdingICA() + totalIVA;
            
            formData.Totales.TotalMonetario.ValorAPagar.IdMoneda = 'COP';
            formData.Totales.TotalMonetario.ValorBruto.Value = taxableBase + calculateTotalConsumptionTax() + calculateTotalWithholdingTax() + calculateTotalWithholdingIVA() + calculateTotalWithholdingICA() + totalIVA;
            if (!selectedBranch) {
                setMessageSelectedBranch('Debes de seleccionar una sede');
                setTimeout(() => setMessageSelectedBranch(null), 5000);
                return;
            }
            if (!selectedClient) {
                setMessageSelectedClient('Debes de seleccionar un cliente o un proveedor');
                setTimeout(() => setMessageSelectedClient(null), 5000);
                return;
            }
            await dispatch(postElectronicInvoicing(formData, token));
            setFormSubmitted(true);
            reset();
            setSelectedClient(null);
            setTimeout(() => {
                setShouldNavigate(true);
            }, 1500);
        } catch (error) {
            throw new Error(`Error en el envío del formulario: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/invoicing-and-pos/see-electronic-invoicing-pos');
        }
    }, [shouldNavigate, navigate]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <div className="d-flex align-items-center justify-content-between">
                            <h1 className={`${styles.title} mb-4 mt-4`}>Facturación</h1>

                            <div className={styles.link__Head_Navigate}>
                                <LiaFileInvoiceSolid className={`${styles.icon__Plus} `}/>
                                <Link to='/invoicing-and-pos/pos' className={`${styles.link} text-decoration-none`}>POS</Link>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} m-auto d-flex flex-column position-relative`}>
                            <div className='d-flex gap-3'>
                                <select
                                    className={`${styles.input__Branch} p-2 border `}
                                    value={selectedBranch}
                                    onChange={handleBranchChange}
                                >
                                    <option value=''>Selecciona una Sede</option>
                                    {Array.isArray(branches) && branches.map((branch, index) => (
                                        <option key={index} value={branch.id}>
                                            {branch.nameBranch}
                                        </option>
                                    ))}
                                </select>
                                <div className="p-2 d-flex flex-column border rounded">
                                    <p className={`${styles.text} mb-0`}>Usuario(a) que registra</p>
                                    <p className={`${styles.text} mb-0`}>{user?.name} {user?.lastName}</p>
                                </div>
                            </div>

                            <div className={`${styles.container__Invoice} mt-4 mb-5 px-4 d-flex flex-column align-items-center justify-content-center`}>
                                <div className={`${styles.container__Header} mt-4 d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.container__Logo} d-flex align-items-center justify-content-center`}>
                                        <img src={user?.logo} alt="Logo" className={`${styles.logo} `}/>
                                    </div>
                                    <div className={`d-flex flex-column align-items-center justify-content-center`}>
                                        <h4 className='text-center m-0'>Factura de venta N°</h4>
                                        <h4 className='text-center m-0'>9593122DFDF-1</h4>
                                        <h4 className='text-center m-0'>FECHA: {currentDate  && currentDate.toLocaleDateString()}</h4>
                                        <h4 className='text-center m-0'>FECHA DE VENCIMIENTO:</h4>
                                        <div className={`${styles.container__Calendars} d-flex align-items-center justify-content-between`}>
                                            <DatePicker
                                                selected={currentDate || undefined}
                                                onChange={(date) => setCurrentDate(date || undefined)}
                                                className={`${styles.input} p-2 border text-center`}
                                                calendarClassName={styles.custom__Calendar}
                                                dayClassName={(date) =>
                                                    date.getDay() === 6 || date.getDay() === 0 ? styles.weekend__Day : styles.weekday
                                                }
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                        </div>
                                    </div>
                                    <div className={`${styles.container__Qr_Invoicing} d-flex align-items-center justify-content-center`}>
                                        <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/1200px-Codigo_QR.svg.png'} alt="Logo" className={`${styles.qr__Code} `}/>
                                    </div>
                                </div>

                                <div className={`${styles.container__Dates} mb-4 d-flex`}>
                                    <div className={`${styles.container__Issuer_Data} `}>
                                        <div className={`${styles.title__Section} px-2 d-flex align-items-center justify-content-start`}>Datos del Emisor</div>
                                        <div className="px-2">
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Razón social/Nombre</h4>
                                                <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{user?.name ? `${user.name} ${user.lastName}` : user?.corporateName}</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>NIT/CC</h4>
                                                <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{user?.verificationDigit ? `${user.documentId}-${user.verificationDigit}` : user?.documentId}</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Dirección</h4>
                                                <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{user?.address}</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Teléfono</h4>
                                                <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{user?.phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.container__Issuer_Data}>
                                        <div className={`${styles.title__Section} px-2 d-flex align-items-center justify-content-start`}>Datos del Adquiriente</div>
                                        <div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>NIT/CC</h4>
                                                <div className={`${styles.data__Section} `}>
                                                    <SearchClientCrm
                                                        token={token}
                                                        onDataClientSelect={(client) => setSelectedClient(client)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Razón social/Nombre</h4>
                                                <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>
                                                    {selectedClient?.name ? `${selectedClient?.name} ${selectedClient.lastName}` : selectedClient?.corporateName || 'No asignado aún'}
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Dirección</h4>
                                                <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{selectedClient?.address ? selectedClient?.address : 'No asignada aún'}</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <h4 className={`${styles.subtitle__Section} m-0 d-flex align-items-center justify-content-start`}>Teléfono</h4>
                                                <p className={`${styles.data__Section} m-0 d-flex align-items-center justify-content-start`}>{selectedClient?.phone ? selectedClient?.phone : 'No asignado aún'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={`${styles.container__Table} mt-2 mb-2 mx-auto`}>
                                    <table className="table">
                                        <thead className={`${styles.container__Head} `}>
                                            <tr className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                                <th className={`${styles.number} d-flex align-items-center justify-content-center text-center`}>#</th>
                                                <th className={`${styles.code} d-flex align-items-center justify-content-center text-center`}>Código</th>
                                                <th className={`${styles.product__Service} d-flex align-items-center justify-content-center text-center`}>Producto/Servicio</th>
                                                <th className={`${styles.unit__Value} d-flex align-items-center justify-content-center text-center`}>Valor Unitario</th>
                                                <th className={`${styles.quantity} d-flex align-items-center justify-content-center text-center`}>Cant.</th>
                                                <th className={`${styles.IVA} d-flex align-items-center justify-content-center text-center`}>% IVA</th>
                                                <th className={`${styles.discount} d-flex align-items-center justify-content-center text-center`}>% Descuento</th>
                                                <th className={`${styles.discount__Value} d-flex align-items-center justify-content-center text-center`}>Valor Descuento</th>
                                                <th className={`${styles.subtotal} d-flex align-items-center justify-content-center text-center`}>Subotal</th>
                                                <th className={`${styles.action} d-flex align-items-center justify-content-center text-center`}></th>
                                            </tr>
                                        </thead>

                                        <tbody className={`${styles.container__Body} `}>
                                            {Array.isArray(scannedItems) && scannedItems.length > 0 ? (
                                                scannedItems.map((row, index) => (
                                                    <tr key={index} className={`${styles.container__Info} d-flex`}>
                                                        <td className={`${styles.number} d-flex align-items-center justify-content-center`}>
                                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{index + 1}</span>
                                                        </td>
                                                        <td className={`${styles.code} `}>
                                                            <SearchItemsByname
                                                                selectedBranch={selectedBranch}
                                                                token={token}
                                                                onItemSelect={() => {
                                                                    const updatedRows = [...scannedItems];
                                                                    updatedRows[index] = { ...updatedRows[index] };
                                                                    setScannedItems(updatedRows);
                                                                }}
                                                                onDataItemSelect={(item) => {
                                                                    const updatedRows = [...scannedItems];
                                                                    updatedRows[index] = { ...updatedRows[index], item };
                                                                    setScannedItems(updatedRows);
                                                                }}
                                                            />
                                                        </td>
                                                        <td className={`${styles.product__Service} d-flex align-items-center justify-content-center`}>
                                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{row.item?.nameItem}</span>
                                                        </td>
                                                        <td className={`${styles.unit__Value} d-flex align-items-center justify-content-center`}>
                                                            <input
                                                                type="number"
                                                                className={`${styles.input__Quantity} p-2`}
                                                                value={row.item?.sellingPrice ?? ''}
                                                                min={0}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td className={`${styles.quantity} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                            <input
                                                                type="number"
                                                                className={`${styles.input__Quantity} p-2`}
                                                                placeholder='Cantidad'
                                                                min={0}
                                                                value={row.quantity ?? ''}
                                                                onChange={(e) => {
                                                                    const value = parseFloat(e.target.value);
                                                                    const updatedRows = [...scannedItems];
                                                                    updatedRows[index] = { ...updatedRows[index], quantity: !isNaN(value) ? value : null };
                                                                    setScannedItems(updatedRows);
                                                                }}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                            />
                                                        </td>
                                                        <td className={`${styles.IVA} d-flex align-items-center justify-content-center`}>
                                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{row.item?.IVA ? `${row.item?.IVA} %` : 'No aplica'}</span>
                                                        </td>
                                                        <td className={`${styles.discount} d-flex align-items-center justify-content-center`}>
                                                            <input
                                                                type="number"
                                                                className={`${styles.input__Discount} p-2`}
                                                                placeholder='Descuento'
                                                                min={0}
                                                                value={row.discountPercentage ?? ''}
                                                                onChange={(e) => {
                                                                    const value = parseFloat(e.target.value);
                                                                    const updatedRows = [...scannedItems];
                                                                    updatedRows[index] = { ...updatedRows[index], discountPercentage: !isNaN(value) ? value : null };
                                                                    setScannedItems(updatedRows);
                                                                }}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                            />
                                                        </td>
                                                        <td className={`${styles.discount__Value} d-flex align-items-center justify-content-end`}>
                                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>
                                                                {row.discountPercentage !== null && row.item?.sellingPrice !== undefined
                                                                    ? `$ ${formatNumber(calculateDiscount(row.quantity, row.item.sellingPrice, row.discountPercentage))}`
                                                                    : ''
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className={`${styles.subtotal} d-flex align-items-center justify-content-end`}>
                                                            <span className={`${styles.text__Ellipsis} text-align-center overflow-hidden`}>
                                                                $ {formatNumber(
                                                                    (row.quantity || 1) * (row.item?.sellingPrice || 0) * (1 - (row.discountPercentage || 0) / 100)
                                                                )}
                                                            </span>
                                                        </td>
                                                        <td className={`${styles.action} d-flex align-items-center justify-content-center`}>
                                                            <RiDeleteBin6Line
                                                                className={`${styles.button__Delete}`}
                                                                onClick={() => {
                                                                    const updatedRows = scannedItems.filter((_, i) => i !== index);
                                                                    setScannedItems(updatedRows);
                                                                }}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={10} className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                                        No tienes artículos registrados
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className={`${styles.container__Add} mb-4 d-flex flex-column align-items-start justify-content-between gap-2`}>
                                    <div>CADA PRODUCTO SE DEBE DE AGREGAR CON CODIGO DE BARRAS O POR NOMBRE EN EL SELECT</div>
                                    <div
                                        className={`${styles.container__Append} d-flex align-items-center justify-content-between`}
                                        onClick={addRow}
                                    >
                                        <FaPlus className={`${styles.icon__Plus}`} />
                                        <span>Agregar artículo</span>
                                    </div>
                                </div>
                                
                                <div className={`${styles.container__Taxes_And_Values} pb-4 d-flex align-items-start justify-content-between`}>
                                    <div className={styles.container__Totales}>
                                        <div className={`${styles.title__Container_Totales} p-2 text-center`}>Totales retenciones</div>
                                        <div className={`${styles.ffffffffff} d-flex`}>
                                            <div className={styles.container__Column_Totals}>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Totales Impuesto al consumo:</div>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Totales Retefuente:</div>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Totales ReteIVA:</div>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Totales ReteICA:</div>
                                            </div>
                                            <div className={styles.container__Values_Totals}>
                                                <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>
                                                    $ {formatNumber(calculateTotalConsumptionTax())}
                                                </div>
                                                <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>
                                                    $ {formatNumber(calculateTotalWithholdingTax())}
                                                </div>
                                                <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>
                                                    $ {formatNumber(calculateTotalWithholdingIVA())}
                                                </div>
                                                <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>
                                                    $ {formatNumber(calculateTotalWithholdingICA())}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.container__Totales}>
                                        <div className={`${styles.title__Container_Totales} p-2 text-center`}>Totales</div>
                                        <div className={`${styles.ffffffffff} d-flex`}>
                                            <div className={styles.container__Column_Totals}>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Base antes de descuentos:</div>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Descuentos:</div>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Total Base Imponible:</div>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>IVA:</div>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Total Factura:</div>
                                            </div>
                                            <div className={`${styles.container__Values_Totals}`}>
                                                <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>
                                                    $ {formatNumber(subtotal)}
                                                </div>
                                                <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>
                                                    $ {formatNumber(discounts)}
                                                </div>
                                                <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>
                                                    $ {formatNumber(taxableBase)}
                                                </div>
                                                <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>
                                                    $ {formatNumber(totalIVA)}
                                                </div>
                                                <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>
                                                    $ {formatNumber(totalInvoice)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles.letter__Amount} p-2 d-flex align-items-start justify-content-center`}>
                                            MONTO EN LETRAS PERO NUESTRO CLIENTE LO DEBE DE ESCRIBIR
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="mb-4 d-flex align-items-center justify-content-center position-relative">
                                {messageSelectedBranch && (
                                    <div className={`${styles.error__Message_Selected_Branch} position-absolute`}>{messageSelectedBranch}</div>
                                )}
                                {messageSelectedClient && (
                                    <div className={`${styles.error__Message_Selected_Client} position-absolute`}>{messageSelectedClient}</div>
                                )}

                                <div className="mb-5 d-flex">
                                    {loading ? 
                                        <div className={`${styles.container__Loading} position-relative w-100`}>
                                            <button className={`${styles.button__Submit} border-0 mx-auto rounded m-auto text-decoration-none`} type='submit' >
                                                <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Guardando...
                                            </button>
                                        </div> 
                                    :
                                        <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit' >Enviar</button>
                                    }
                                </div>
                            </div>

                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}

                            {Array.isArray(errorElectronicInvoicing) && errorElectronicInvoicing?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ElectronicInvoicingPage;
/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getProfileUser } from '../../../../../redux/User/userSlice/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../../types/User/crmClient.types';
import { IAssets } from "../../../../../types/User/assets.types";
import { IMerchandise } from "../../../../../types/User/merchandise.types";
import { IProduct } from "../../../../../types/User/products.types";
import { IRawMaterial } from "../../../../../types/User/rawMaterial.types";
import { IService } from "../../../../../types/User/services.types";
import SearchItemsByname from '../../../../../helpers/SearchItemName/SearchItemsByname';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import SearchClientCrm from '../../../../../helpers/SearchClientCrm/SearchClientCrm';
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from "react-icons/fa";
import styles from './styles.module.css';

function ElectronicInvoicingPage() {
    const token = jsCookie.get("token") || '';
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const branches = useSelector((state: RootState) => state.branch.branch);

    useEffect(() => {
        if (token) {
            dispatch(getProfileUser(token));
            dispatch(getBranches(token))
        }
    }, [token]);

    const [selectedBranch, setSelectedBranch] = useState('');

    const handleBranchChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectedBranch(value);
    };
    
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);
    
    const [selectedClient, setSelectedClient] = useState<ICrmClient | null>(null);
    
    const [currentDate, setCurrentDate] = useState<Date>();
    useEffect(() => {
        const currentDate = new Date();
        setCurrentDate(currentDate);
    }, []);
    
    const [rows, setRows] = useState<Array<{
        id: number | null;
        item: IAssets | IMerchandise | IProduct | IRawMaterial | IService | null;
        quantity: number | null;
        discountPercentage: number | null;
    }>>([
        { id: null, item: null, quantity: null, discountPercentage: null }
    ]);

    const addRow = () => {
        setRows(prevRows => [
            ...prevRows,
            { id: null, item: null, sellingPrice: null, quantity: null, discountPercentage: null }
        ]);
    };

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
        return parseFloat(rows.reduce((acc, row) => {
            const consumptionTax = row.item?.consumptionTax;
            if (typeof consumptionTax === "string" && consumptionTax === "No aplica") {
                return acc;
            } else {
                const taxableBase = calculateTaxableBaseForRow(row);
                const consumptionTaxValue = consumptionTax !== undefined ? (typeof consumptionTax === "number" ? consumptionTax : parseInt(consumptionTax, 10)) : 0;
                const taxAmount = taxableBase * (consumptionTaxValue / 100);
                return acc + taxAmount;
            }
        }, 0).toFixed(2)); // Convertir a número después de toFixed()
    };

    const calculateTotalWithholdingTax = () => {
        return parseFloat(rows.reduce((acc, row) => {
            const withholdingTax = row.item?.withholdingTax;
            if (typeof withholdingTax === "string" && withholdingTax === "No aplica") {
                return acc;
            } else if (typeof withholdingTax === "number" || typeof withholdingTax === "string") { // Verificación adicional
                const taxableBase = calculateTaxableBaseForRow(row);
                const withholdingTaxValue = typeof withholdingTax === "number" ? withholdingTax : parseFloat(withholdingTax); // Removido el .toString()
                const taxAmount = taxableBase * (withholdingTaxValue / 100);
                return acc + taxAmount;
            }
            return acc;
        }, 0).toFixed(2));
    };
    
    const calculateTotalWithholdingIVA = () => {
        return parseFloat(rows.reduce((acc, row) => {
            const withholdingIVA = row.item?.withholdingIVA;
            if (typeof withholdingIVA === "string" && withholdingIVA === "No aplica") {
                return acc;
            } else if (typeof withholdingIVA === "number" || typeof withholdingIVA === "string") { // Verificación adicional
                const taxableBase = calculateTaxableBaseForRow(row);
                const withholdingIVAValue = typeof withholdingIVA === "number" ? withholdingIVA : parseFloat(withholdingIVA); // Removido el .toString()
                const taxAmount = taxableBase * (withholdingIVAValue / 100);
                return acc + taxAmount;
            }
            return acc;
        }, 0).toFixed(2));
    };
    
    const calculateTotalWithholdingICA = () => {
        return parseFloat(rows.reduce((acc, row) => {
            const withholdingICA = row.item?.withholdingICA;
            if (typeof withholdingICA === "string" && withholdingICA === "No aplica") {
                return acc;
            } else if (typeof withholdingICA === "number" || typeof withholdingICA === "string") { // Verificación adicional
                const taxableBase = calculateTaxableBaseForRow(row);
                const withholdingICAValue = typeof withholdingICA === "number" ? withholdingICA : parseFloat(withholdingICA); // Removido el .toString()
                const taxAmount = taxableBase * (withholdingICAValue / 100);
                return acc + taxAmount;
            }
            return acc;
        }, 0).toFixed(2));
    };






    const calculateSubtotal = () => {
        return rows.reduce((acc, row) => {
            const totalRowValue = (row.quantity || 1) * (row.item?.sellingPrice || 0);
            return acc + totalRowValue;
        }, 0);
    };
    
    const calculateDiscounts = () => {
        return rows.reduce((acc, row) => {
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
        return rows.reduce((acc, row) => {
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

    const onSubmit = async (values: any) => {
        try {
            const formData = {
                ...values,
            } as any;
            console.log('formData: ', formData)
            setTimeout(() => {
                setShouldNavigate(true);
            }, 1500);
        } catch (error) {
            throw new Error(`Error en el envío del formulario: ${error}`);
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

                        <form onSubmit={onSubmit} className={`${styles.form} position-relative`}>
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
                                            {Array.isArray(rows) && rows.length > 0 ? (
                                                rows.map((row, index) => (
                                                    <tr key={index} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                                        <td className={`${styles.number} d-flex align-items-center justify-content-center`}>
                                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{index + 1}</span>
                                                        </td>
                                                        <td className={`${styles.code} `}>
                                                            <SearchItemsByname
                                                                selectedBranch={selectedBranch}
                                                                token={token}
                                                                onItemSelect={() => {
                                                                    const updatedRows = [...rows];
                                                                    updatedRows[index] = { ...updatedRows[index] };
                                                                    setRows(updatedRows);
                                                                }}
                                                                onDataItemSelect={(item) => {
                                                                    const updatedRows = [...rows];
                                                                    updatedRows[index] = { ...updatedRows[index], item };
                                                                    setRows(updatedRows);
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
                                                                    const updatedRows = [...rows];
                                                                    updatedRows[index] = { ...updatedRows[index], quantity: !isNaN(value) ? value : null };
                                                                    setRows(updatedRows);
                                                                }}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                            />
                                                        </td>
                                                        <td className={`${styles.IVA} d-flex align-items-center justify-content-center`}>
                                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{row.item?.IVA === 'No aplica' ? 'No aplica' : `${row.item?.IVA} %`}</span>
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
                                                                    const updatedRows = [...rows];
                                                                    updatedRows[index] = { ...updatedRows[index], discountPercentage: !isNaN(value) ? value : null };
                                                                    setRows(updatedRows);
                                                                }}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                            />
                                                        </td>
                                                        <td className={`${styles.discount__Value} d-flex align-items-center justify-content-center`}>
                                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>
                                                                {row.discountPercentage !== null && row.item?.sellingPrice !== undefined
                                                                    ? `$ ${formatNumber(calculateDiscount(row.quantity, row.item.sellingPrice, row.discountPercentage))}`
                                                                    : ''
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className={`${styles.subtotal} d-flex align-items-center justify-content-center`}>
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
                                                                    const updatedRows = rows.filter((_, i) => i !== index);
                                                                    setRows(updatedRows);
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
                                                {/* <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Totales IVA:</div> */}
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Totales Impuesto al consumo:</div>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Totales Retefuente:</div>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Totales ReteIVA:</div>
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Totales ReteICA:</div>
                                            </div>
                                            <div className={styles.container__Values_Totals}>
                                                {/* <div className={`${styles.column__Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>
                                                    $ {formatNumber(totalIVA)}
                                                </div> */}
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
                                                <div className={`${styles.title__Column_Totals} m-0 px-2 d-flex align-items-center justify-content-end`}>Total Impuestos:</div>
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

                            <div className="mb-4 d-flex align-items-center justify-content-center">
                                <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                            </div>
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ElectronicInvoicingPage;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
import { getProfileUser } from '../../../../../redux/User/userSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../../types/UserPanel/07CrmClientSlice/crmClient.types.ts';
import { IAssets } from "../../../../../types/UserPanel/03Inventories/assets.types";
import { IMerchandise } from "../../../../../types/UserPanel/03Inventories/merchandise.types";
import { IProduct } from "../../../../../types/UserPanel/03Inventories/products.types";
import { IRawMaterial } from "../../../../../types/UserPanel/03Inventories/rawMaterial.types";
import { IService } from "../../../../../types/UserPanel/03Inventories/services.types";
import SearchClientCrm from '../../../../../helpers/SearchClientCrm/SearchClientCrm';
import SearchItemsByname from '../../../../../helpers/SearchItemName/SearchItemsByname';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import { CgNotes } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import styles from './styles.module.css';

function CreateCreditNotesPage() {
    const token = jsCookie.get("token") || '';
    const dispatch: AppDispatch = useDispatch();

    // Estado de Redux
    const branches = useSelector((state: RootState) => state.branch.branch);
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
            dispatch(getProfileUser(token));
        }
    }, [token, dispatch]);

    //Selección de la sede
    const [selectedBranch, setSelectedBranch] = useState('');

    // Manejar cambio de la sede
    const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setSelectedBranch(selectedId);
    };

    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);

    // Selecciona el cliente al que se le vende
    const [idSelectedClient, setIdSelectedClient] = useState<number | null>(null);
    const [selectedClient, setSelectedClient] = useState<ICrmClient | null>(null);

    // Estados para las fechas de registro y transacción
    const [registrationDate, setRegistrationDate] = useState<Date>();

    const [rows, setRows] = useState<Array<{ id: number | null; item: IAssets | IMerchandise | IProduct | IRawMaterial | IService | null; quantity: number | null }>>([]);
    const addRow = () => {
        setRows(prevRows => [
            ...prevRows,
            { id: null, item: null, quantity: null }
        ]);
    };

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
            navigate('/inventories/consult-merchandises');
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
                            <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus notas crédito</h1>
                            <div className={styles.link__Head_Navigate}>
                                <CgNotes className={`${styles.icon__Head_Navigate} `}/>
                                <Link to='/debit-notes/consult-debit-notes' className={`${styles.link} text-decoration-none`}>Consulta tus notas débito</Link>
                            </div>
                        </div>

                        <div className="p-2 border">
                            <select
                                className="p-1 text-center border-0"
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
                        </div>

                        <form onSubmit={onSubmit} className={`${styles.form} position-relative`}>
                            <div className={`${styles.container__Debit_Note} mt-4 mb-5 p-4 d-flex flex-column align-items-center justify-content-center`}>
                                <div className={`${styles.container__Header_Debit_Note} mt-4 pb-4 d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.container__Logo} d-flex align-items-center justify-content-center`}>
                                        <img src={user?.logo} alt="Logo" className={`${styles.logo__User} `}/>
                                    </div>
                                    <div className={`${styles.container__Info_User} d-flex flex-column align-items-center justify-content-center`}>
                                        <h4 className={`${styles.name__User} m-0`}>
                                            {user?.name && user?.lastName
                                                ? `${String(user?.name).toUpperCase()} ${String(user?.lastName).toUpperCase()}`
                                                : String(user?.corporateName).toUpperCase()}
                                        </h4>
                                        <div className={`${styles.container__Identification} d-flex gap-1`}>
                                            <p className={`${styles.type__Document_Id} m-0`}>{user?.typeDocumentId === 'NIT' && ('NIT:')}</p>
                                            <p className={`${styles.type__Document_Id} m-0`}>{user?.typeDocumentId === 'Cedula de Ciudadania' && ('CC:')}</p>
                                            <p className={`${styles.type__Document_Id} m-0`}>{user?.typeDocumentId === 'Cedula de Extranjeria' && ('CE:')}</p>
                                            <p className={`${styles.type__Document_Id} m-0`}>{user?.typeDocumentId === 'Pasaporte' && ('PS:')}</p>
                                            <p className={`${styles.document__Id} m-0`}>{user?.documentId}</p>
                                        </div>
                                        <p className={`${styles.email} m-0`}>{user?.email}</p>
                                    </div>
                                    <div className={`${styles.container__Number_Debit_Note} d-flex`}>
                                        <span className={`${styles.numerator} d-flex align-items-center justify-content-center`}>No.</span>
                                        <div className={`${styles.invoice__Number} p-2 d-flex align-items-center justify-content-start`}>1</div>
                                        <div className={`${styles.container__Icon_setting} d-flex align-items-center justify-content-center`}>
                                            <IoMdSettings className={`${styles.icon__Setting} `}/>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.container__Dates_Client} pt-4 pb-4 d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.dates__Client} `}>
                                        <div className={`${styles.container__Info_Section} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Cliente</p>
                                            <SearchClientCrm
                                                token={token}
                                                onClientSelect={(client) => setIdSelectedClient(client)}
                                                onDataClientSelect={(client) => setSelectedClient(client)}
                                            />
                                        </div>
                                        <div className={`${styles.container__Info_Section} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Identificación</p>
                                            <div className={`${styles.data} px-3 d-flex align-items-center justify-content-start`}>{idSelectedClient}</div>
                                        </div>
                                        <div className={`${styles.container__Info_Section} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Teléfono</p>
                                            <div className={`${styles.data} px-3 d-flex align-items-center justify-content-start`}>{selectedClient?.phone}</div>
                                        </div>
                                        <div className={`${styles.container__Info_Reason} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label__Reason} m-0 d-flex align-items-center justify-content-end`}>Razón</p>{/* TOOLTIP RAZON QUE JUSTIFICA LA CREACION DE LA NOTA DEBITO DEL CLIENTE */}
                                            <textarea name="" id="" className={`${styles.textarea} p-3`}></textarea>
                                        </div>
                                    </div>

                                    <div className={`${styles.dates__Debit_Note} `}>
                                        <div className={`${styles.container__Info_Section} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Fecha</p>{/* TOOLTIP FECHA EN LA QUE SE EMITE LA FACTURA */}
                                            <DatePicker
                                                selected={registrationDate || undefined}
                                                onChange={(date) => setRegistrationDate(date || undefined)}
                                                className={`${styles.calendar} p-2 border`}
                                                dayClassName={(date) =>
                                                    date.getDay() === 6 || date.getDay() === 0 ? styles.weekend__Day : styles.weekday
                                                }
                                                placeholderText='Fecha de registro'
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                        </div>
                                        <div className={`${styles.container__Info_Section} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Factura</p>
                                            <div className={`${styles.data} px-3 d-flex align-items-center justify-content-start`}>
                                                Hacer ruta del back para traer el # de factura
                                            </div>
                                        </div>
                                        <div className={`${styles.container__Info_Section} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label} m-0 d-flex align-items-center justify-content-end`}>Tipo</p>
                                            <select
                                                className={`${styles.select} px-3 d-flex align-items-center justify-content-start`}
                                            >
                                                <option value="">Cobro de intereses</option>
                                                <option value="">Gastos por cobrar</option>
                                                <option value="">Cambio de valor</option>
                                                <option value="">Otros</option>
                                            </select>
                                        </div>
                                        <div className={`${styles.container__Info_Reason} mb-2 d-flex gap-2`}>
                                            <p className={`${styles.label__Reason} m-0 d-flex align-items-center justify-content-end`}>Notas</p>
                                            <textarea name="" id="" className={`${styles.textarea} p-3`}></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.container__Table} mt-2 mb-2 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                                    <div className={styles.container__Head}>
                                        <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                            <div className={`${styles.name__Item} d-flex align-items-center justify-content-center text-center`}>Item</div>
                                            <div className={`${styles.selling__Price} d-flex align-items-center justify-content-center text-center`}>Precio</div>
                                            <div className={`${styles.discount__Percentage} d-flex align-items-center justify-content-center text-center`}>Desc %</div>
                                            <div className={`${styles.tax} d-flex align-items-center justify-content-center text-center`}>Impuesto</div>
                                            <div className={`${styles.quantity} d-flex align-items-center justify-content-center text-center`}>Cantidad</div>
                                            <div className={`${styles.total} d-flex align-items-center justify-content-center text-center`}>Subtotal</div>
                                            <div className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</div>
                                        </div>
                                    </div>

                                    <div className={`${styles.container__Body}`}>
                                        {Array.isArray(rows) && rows.length > 0 ? (
                                            rows.map((row, index) => (
                                                <div className={`${styles.container__Info} d-flex align-items-center justify-content-between`} key={index}>
                                                    <div className={`${styles.name__Item} d-flex align-items-center justify-content-center text-center`}>
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
                                                    </div>
                                                    <div className={`${styles.selling__Price} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <input
                                                            type="number"
                                                            className={`${styles.input} p-2 border `}
                                                            value={row.item?.sellingPrice}
                                                            min={0}
                                                        />
                                                    </div>
                                                    <div className={`${styles.discount__Percentage} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} text-align-center overflow-hidden`}>{row.item?.discountPercentage || 'N/A'}</span>
                                                    </div>
                                                    <div className={`${styles.tax} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <select defaultValue={0} className={`${styles.input} p-2 border `}>
                                                            <optgroup label="IVA">
                                                                <option value='No aplica'>No aplica</option>
                                                                <option value={0}>IVA 0 %</option>
                                                                <option value={5}>IVA 5 %</option>
                                                                <option value={19}>IVA 19 %</option>
                                                            </optgroup>
                                                            <optgroup label="INC">
                                                                <option value={4}>INC 4 %</option>
                                                                <option value={8}>INC 8 %</option>
                                                                <option value={16}>INC 16 %</option>
                                                            </optgroup>
                                                        </select>
                                                    </div>
                                                    <div className={`${styles.quantity} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <input
                                                            type="number"
                                                            className={`${styles.input} p-2 border `}
                                                            placeholder='Cantidad'
                                                            min={0}
                                                            value={row.quantity || ''}
                                                            onChange={(e) => {
                                                                const value = parseFloat(e.target.value);
                                                                const updatedRows = [...rows];
                                                                updatedRows[index] = { ...updatedRows[index], quantity: value };
                                                                setRows(updatedRows);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.total} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} text-align-center overflow-hidden`}>$ {formatNumber((row.quantity || 0) * (row.item?.sellingPrice || 0))}</span>
                                                    </div>
                                                    <div className={`${styles.action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <RiDeleteBin6Line
                                                            className={`${styles.button__Delete}`}
                                                            onClick={() => {
                                                                const updatedRows = rows.filter((_, i) => i !== index);
                                                                setRows(updatedRows);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                                No tienes artículos registrados
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`${styles.container__Append} mt-3 mb-3 d-flex align-items-center justify-content-between`}
                                onClick={addRow}
                            >
                                <FaPlus className={`${styles.icon__Plus}`} />
                                <span>Agregar artículo</span>
                            </div>

                            <div className={`${styles.container__Totals} mb-5 d-flex align-items-center justify-content-between`}>
                                <div className="d-flex"></div>
                                <div className={`${styles.debit__Note_Total} `}>
                                    <div className={`{} `}>
                                        <div className={`${styles.container__Section_Total} d-flex`}>
                                            <span className={`${styles.title__Total} px-2 d-flex align-items-center justify-content-end`}>Subtotal</span>
                                            <div className={`${styles.total__Debit__Note} d-flex align-items-center justify-content-center`}>24.000</div>
                                        </div>
                                        <div className={`${styles.container__Section_Total} d-flex`}>
                                            <span className={`${styles.title__Total} px-2 d-flex align-items-center justify-content-end`}>Descuentos</span>
                                            <div className={`${styles.total__Debit__Note} d-flex align-items-center justify-content-center`}>2.400</div>
                                        </div>
                                    </div>
                                    <div className={`${styles.container__Section_Total} d-flex`}>
                                        <span className={`${styles.title__Total} px-2 d-flex align-items-center justify-content-end`}>Total</span>
                                        <div className={`${styles.total__Debit__Note} d-flex align-items-center justify-content-center`}>21.600</div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CreateCreditNotesPage;
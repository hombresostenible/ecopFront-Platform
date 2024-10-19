/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { postAccountsBook } from '../../../../../redux/User/04AccountsSlice/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from "../../../../../types/UserPanel/04Accounts/accountsBook.types";
import { IAccountsReceivable } from '../../../../../types/UserPanel/10ReportsAndIndicators/finantialIndicators/accountsReceivable.types';
import { IUserPlatform } from '../../../../../types/UserPanel/06ElectronicPayroll/userPlatform.types';
import SearchCXC from '../../../../../helpers/SearchCXC/SearchCXC';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface AccountsReceivableProps {
    token: string;
    decodeUserIdRegister: string;
    usersPlatform: IUserPlatform | IUserPlatform[] | null;
    selectedBranch: string;
    defaultDates: boolean;
    registrationDate: string | undefined;
    transactionDate: string | undefined;
}

function AccountsReceivable({ token, decodeUserIdRegister, selectedBranch, defaultDates, registrationDate, transactionDate }: AccountsReceivableProps) {
    const navigate = useNavigate();

    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorAccountsBook = useSelector((state: RootState) => state.accountsBook.errorAccountsBook);
    const branches = useSelector((state: RootState) => state.branch.branch);

    useEffect(() => {
        dispatch(getBranches(token));
    }, [dispatch, token]);

    const { register, handleSubmit, formState: { errors } } = useForm<IAccountsBook>();
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [messageSelectedBranch, setMessageSelectedBranch] = useState<string | null>('');
    const [loading, setLoading] = useState(false);

    // SELECCIONA LA CXP
    const [ selectedCXP, setSelectedCXP ] = useState<IAccountsReceivable | null>(null);
    const [ transactionCounterpartId, setTransactionCounterpartId ] = useState('');
    const [ creditDescription, setCreditDescription ] = useState('');
    const handleCXPSelect = (selectedCXP: IAccountsReceivable) => {
        setSelectedCXP(selectedCXP);
        setTransactionCounterpartId(selectedCXP.transactionCounterpartId);
        setCreditDescription(selectedCXP.creditDescription);
    };


    const onSubmit = async (values: IAccountsBook) => {
        setLoading(true);
        try {
            const formData = {
                ...values,
                branchId: selectedBranch,
                transactionType: "Ingreso",
                creditCash: "Contado",
                transactionCounterpartId: transactionCounterpartId,
                creditDescription: creditDescription,
                pay: 'Si',
                userRegister: decodeUserIdRegister,
            } as unknown as IAccountsBook;
            if (defaultDates) {
                formData.registrationDate = new Date().toLocaleDateString();
                formData.transactionDate = new Date().toLocaleDateString();
            }
            if (registrationDate) formData.registrationDate = registrationDate;
            if (transactionDate) formData.transactionDate = transactionDate;
            if (!selectedBranch) {
                setMessageSelectedBranch('Debes de seleccionar una sede');
                setTimeout(() => setMessageSelectedBranch(null), 5000);
                return;
            }
            await dispatch(postAccountsBook(formData, token));
            setTimeout(() => {
                setShouldNavigate(true);
            }, 1500);
        } catch (error) {
            throw new Error(`Error en el envío del formulario: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const getBranchName = useCallback((branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    }, [branches]);

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/accounts/see-records');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div>
            {Array.isArray(errorAccountsBook) && errorAccountsBook.map((error, i) => (
                <div key={i} className='bg-red-500 p-2 text-white text-center my-2'>{error}</div>
            ))}

            <h3 className='text-center text-primary-emphasis'>Selecciona la cuenta por cobrar</h3>
            <div>
                <p className={`${styles.label} m-0`}>Busca la cuenta por cobrar</p>
                <SearchCXC
                    token={token}
                    selectedBranch={selectedBranch}
                    onCXCSelect={handleCXPSelect}
                />
            </div>

            <div className={`${styles.container__Accounts_Receivable} mt-3 mb-3`}>
                {selectedCXP && (
                    <div>
                        <h3 className="text-primary-emphasis">Información de la Cuenta por Cobrar</h3>

                        <div className={`${styles.container__Header} d-flex align-items-center justify-content-between gap-3`}>
                            <div>
                                <p className={`${styles.label} m-0`}>Fecha de creación</p>
                                <p className='m-0'>{new Date(selectedCXP.transactionDate).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className={`${styles.label} m-0`}>Número de documento de identidad</p>
                                <p className='m-0'>{selectedCXP.transactionCounterpartId}</p>
                            </div>
                        </div>

                        <div className={`${styles.container__Credit_Description} mt-3 mb-3 p-2`}>
                            <p className={`${styles.label} m-0`}>Descripción del crédito</p>
                            <p className='m-0'>{selectedCXP.creditDescription}</p>
                        </div>

                        <div className={`${styles.container__Credit_Data} mt-3 mb-3 p-2`}>
                            <h4 className="m-0 text-primary-emphasis text-start">Información del crédito</h4>
                            <div className={`${styles.container__Table} mt-2 mb-2`}>
                                <table className="table">
                                    <thead className={`${styles.container__Head} `}>
                                        <tr className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                            <th className={`${styles.state} d-flex align-items-center justify-content-center text-center`}>Estado del crédito</th>
                                            <th className={`${styles.interest} d-flex align-items-center justify-content-center text-center`}>¿Es con interés?</th>
                                            <th className={`${styles.rate__Interest} d-flex align-items-center justify-content-center text-center`}>Tasa de interés</th>
                                            <th className={`${styles.initial__Value} d-flex align-items-center justify-content-center text-center`}>Vr. Inicial</th>
                                            <th className={`${styles.initial_Number_Payments} d-flex align-items-center justify-content-center text-center`}>Cuotas</th>
                                            <th className={`${styles.current__Balance} d-flex align-items-center justify-content-center text-center`}>Saldo actual</th>
                                            <th className={`${styles.payment__Value} d-flex align-items-center justify-content-center text-center`}>Vr. Cuota</th>
                                            <th className={`${styles.pending__Number_Payments} d-flex align-items-center justify-content-center text-center`}>Cuotas pendientes</th>
                                        </tr>
                                    </thead>

                                    <tbody className={`${styles.container__Body} `}>
                                        <tr className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            <td className={`${styles.state} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{selectedCXP.stateAccount}</span>
                                            </td>
                                            <td className={`${styles.interest} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{selectedCXP.creditWithInterest}</span>
                                            </td>
                                            <td className={`${styles.rate__Interest} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{selectedCXP.creditInterestRate ? `${selectedCXP.creditInterestRate} %` : 'N/A'}</span>
                                            </td>
                                            <td className={`${styles.initial__Value} d-flex align-items-center justify-content-end`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>$ {formatNumber(selectedCXP.initialValue)}</span>
                                            </td>
                                            <td className={`${styles.initial_Number_Payments} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{selectedCXP.initialNumberOfPayments}</span>
                                            </td>
                                            <td className={`${styles.current__Balance} d-flex align-items-center justify-content-end`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>$ {formatNumber(selectedCXP.currentBalance)}</span>
                                            </td>
                                            <td className={`${styles.payment__Value} d-flex align-items-center justify-content-end`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>$ {formatNumber(selectedCXP.paymentValue)}</span>
                                            </td>
                                            <td className={`${styles.pending__Number_Payments} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{selectedCXP.pendingNumberOfPayments}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className={`${styles.container__Credit_Data} mt-3 mb-3 p-2`}>
                            <h4 className="m-0 text-primary-emphasis text-start">Historial de Pagos</h4>
                            <div className={`${styles.container__Table} mt-2 mb-2`}>
                                <table className="table">
                                    <thead className={`${styles.container__Head}`}>
                                        <tr className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                            <th className={`${styles.branch} d-flex align-items-center justify-content-center text-center`}>Sede donde se realizó el pago</th>
                                            <th className={`${styles.payment__Date} d-flex align-items-center justify-content-center text-center`}>Fecha de pago</th>
                                            <th className={`${styles.Payment__Value} d-flex align-items-center justify-content-center text-center`}>Valor pagado</th>
                                            <th className={`${styles.user__Platform} d-flex align-items-center justify-content-center text-center`}>Funcionario que recibió el pago</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${styles.container__Body} `}>
                                        {selectedCXP.creditPayments && selectedCXP.creditPayments.length > 0 ? (
                                            selectedCXP.creditPayments.map((payment, index) => (
                                                <tr key={index} className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                                    <td className={`${styles.branch} d-flex align-items-center justify-content-center`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{getBranchName(payment.branchId)}</span>
                                                    </td>
                                                    <td className={`${styles.payment__Date} d-flex align-items-center justify-content-center`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{new Date(payment.date).toLocaleString()}</span>
                                                    </td>
                                                    <td className={`${styles.Payment__Value} d-flex align-items-center justify-content-center`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>$ {formatNumber(payment.value)}</span>
                                                    </td>
                                                    <td className={`${styles.user__Platform} d-flex align-items-center justify-content-center`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{payment.userRegister}</span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={10} className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                                    No hay pagos registrados
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} `}>
                            <div className="mb-4 d-flex flex-column align-items-center justify-content-center position-relative">
                                {messageSelectedBranch && (
                                    <div className={`${styles.error__Message_Selected_Branch} position-absolute`}>{messageSelectedBranch}</div>
                                )}

                                <div className="mb-4 position-relative">
                                    <p className={`${styles.label} m-0`}>Valor a pagar</p>
                                    <input
                                        type="number"
                                        {...register('totalValue', { required: 'El valor a pagar es requerido', setValueAs: (value) => parseFloat(value) })}
                                        className={`${styles.input} p-2`}
                                        placeholder={`Pago mínimo $ ${formatNumber(selectedCXP?.paymentValue)}`}
                                        min={0}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {errors.totalValue && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>{errors.totalValue.message}</p>
                                    )}
                                </div>

                                {/* <p>Salir el input con el valor del pago mínimo</p>
                                <p>Si el cliente deudor va a paar más</p> */}

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
                        </form>
                    </div>
                )}
            </div>

        </div>
    );
}

export default AccountsReceivable;
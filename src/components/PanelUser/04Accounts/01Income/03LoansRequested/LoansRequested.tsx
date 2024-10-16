/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { postAccountsBook } from '../../../../../redux/User/04AccountsSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from "../../../../../types/User/accountsBook.types";
import { formatCurrency } from '../../../../../helpers/FormatCurrency/FormatCurrency';
import SearchSupplierCrm from '../../../../../helpers/SearchSupplierCrm/SearchSupplierCrm';
import styles from './styles.module.css';

interface LoansRequestedProps {
    token: string;
    decodeUserIdRegister: string;
    selectedBranch: string;
    defaultDates: boolean;
    registrationDate: string | undefined;
    transactionDate: string | undefined;
}

function LoansRequested({ token, decodeUserIdRegister, selectedBranch, defaultDates, registrationDate, transactionDate }: LoansRequestedProps) {
    const navigate = useNavigate();

    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorAccountsBook = useSelector((state: RootState) => state.accountsBook.errorAccountsBook);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IAccountsBook>();
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [messageSelectedBranch, setMessageSelectedBranch] = useState<string | null>('');
    const [messageSelectedSupplier, setMessageSelectedSupplier] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // OTROS INGRESOS
    // SETEA EL PROVEEDOR CUANCO SE CREA O SE SELECCIONA
    const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);

    const [showOtherIncomes, setShowOtherIncomes] = useState('');
    const handleOtherIncomesChange = (event: { target: { value: SetStateAction<string> }}) => {
        setShowOtherIncomes(event.target.value);
    };

    // SETEA EL VALOR TOTAL DE LA VENTA
    const [totalValueOtherIncome, setTotalValueOtherIncome] = useState<string>('');
    const handleTotalValueOtherIncome = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, '');
        setTotalValueOtherIncome(value);
    };
    
    // SETEA SI ES CON O SIN INTRERES
    const [creditWithInterest, setCreditWithInterest] = useState<'No' | 'Si'>('Si');
    const handleCreditWithInterest = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCreditWithInterest = event.target.value as 'No' | 'Si';
        setCreditWithInterest(newCreditWithInterest);
        setValue('creditWithInterest', newCreditWithInterest);
    };

    // SETEA LA TASA DE INTERES DE LA VENTA
    const [interestRateChange, setInterestRateChange] = useState<number>(0);
    const handleInterestRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const interestRate = parseFloat(event.target.value);
        setInterestRateChange(interestRate);
    };

    // SETEA LA CANTIDAD DE CUOTAS
    const [numberOfPayments, setNumberOfPayments] = useState<number>(0);
    const handleNumberOfPaymentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUnitValue = parseFloat(event.target.value);
        setNumberOfPayments(newUnitValue);
    };
    
    // SETEA EL VALOR DE LA CUOTA
    const [paymentValue, setPaymentValue] = useState<number>(0);
    useEffect(() => {
        if (totalValueOtherIncome !== undefined && numberOfPayments !== 0) {
            if (interestRateChange !== 0) {
                const tasaInteresMensual = interestRateChange / 100 / 12;
                const totalValue = Number(totalValueOtherIncome);
                const cuotaWithInterest = totalValue * (tasaInteresMensual * Math.pow(1 + tasaInteresMensual, numberOfPayments)) / (Math.pow(1 + tasaInteresMensual, numberOfPayments) - 1);
                setPaymentValue(cuotaWithInterest);
            } else {
                const totalValue = Number(totalValueOtherIncome);
                const cuotaSinInteres = totalValue / numberOfPayments;
                setPaymentValue(cuotaSinInteres);
            }
        }
    }, [totalValueOtherIncome, numberOfPayments, interestRateChange]);
    

    const onSubmit = async (values: IAccountsBook) => {
        setLoading(true);
        const totalValueOtherIncomeNumber = Number(totalValueOtherIncome);
        try {
            const formData = {
                ...values,
                branchId: selectedBranch,
                transactionType: "Ingreso",
                creditCash: "Contado",
                transactionCounterpartId: selectedSupplier,
                totalValue: totalValueOtherIncomeNumber,
                pay: 'No',
                userRegister: decodeUserIdRegister,
            } as IAccountsBook;
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
            if (!selectedSupplier) {
                setMessageSelectedSupplier('Debes de seleccionar un proveedor');
                setTimeout(() => setMessageSelectedSupplier(null), 5000);
                return;
            }
            await dispatch(postAccountsBook(formData, token));
            setSelectedSupplier(null);
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
            navigate('/accounts/see-records');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div>
            {Array.isArray(errorAccountsBook) && errorAccountsBook.map((error, i) => (
                <div key={i} className='bg-red-500 p-2 text-white text-center my-2'>{error}</div>
            ))}

            <h3 className='text-center text-primary-emphasis'>Rellena los datos para registrar tu ingreso por concepto de préstamos que te otorgaron</h3>

            <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} mx-auto`}>
                <div className={`${styles.container__Info} mb-4 d-flex align-items-center justify-content-center gap-3`}>
                    <p className={`${styles.label} m-0`}>Selecciona el concepto de otros ingresos</p>
                    <select
                        {...register('otherIncomes', { required: true })}
                        className={`${styles.input} p-2`}
                        onChange={handleOtherIncomesChange}
                    >
                        <option value='Credito del Banco'>Crédito del Banco</option>
                        <option value='Credito en Cooperativa'>Crédito en Cooperativa</option>
                        <option value='Gota gota'>Gota gota</option>
                        <option value='Credito de almacen'>Crédito de almacén</option>
                        <option value='Credito de servicios publicos'>Crédito de servicios públicos</option>
                    </select>
                    {errors.otherIncomes && (
                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El dato es requerido</p>
                    )}
                </div>

                <div className={`${styles.container__Info} mb-4 d-flex align-items-center justify-content-between gap-3`}>
                    {showOtherIncomes !== 'Gota gota' && (
                        <div className="position-relative w-100">
                            <p className={`${styles.label} m-0`}>Selecciona o crea a tu proveedor</p>
                            <SearchSupplierCrm
                                token={token}
                                onSupplierSelect={(supplier) => setSelectedSupplier(supplier)}
                            />
                            {messageSelectedSupplier && (
                                <div className={`${styles.error__Selected_Client} p-2 position-absolute`}>
                                    <div className={`${styles.triangle} position-absolute`}></div>
                                    <p className='m-0'>Selecciona el cliente acá</p>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="position-relative w-100">
                        <p className={`${styles.label} m-0`}>Describe tu crédito</p>
                        <input
                            type="text"
                            {...register('creditDescription', { required: true })}
                            className={`${styles.input} p-2`}
                            placeholder='Describe tu crédito: Venta de arroz a don Lucho'
                        />
                        {errors.creditDescription && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>La descripión es requerida</p>
                        )}
                    </div>
                </div>

                <div className="mb-4 position-relative w-100">
                    <p className={`${styles.label} m-0`}>Valor total del préstamo</p>
                    <input
                        type="text"
                        {...register('totalValue', { required: true } )}
                        className={`${styles.input} p-2`}
                        onChange={handleTotalValueOtherIncome}
                        value={formatCurrency(totalValueOtherIncome)}
                        placeholder='Valor total del préstamo'
                    />
                    {errors.totalValue && (
                        <p className={`${styles.text__Danger} text-danger position-absolute`}>Valor total del préstamo</p>
                    )}
                </div>

                <div className={`${styles.container__Info} mb-4 d-flex align-items-center justify-content-between gap-3`}>
                    <div className="position-relative w-100">
                        <p className={`${styles.label} m-0`}>¿Es con interés?</p>
                        <select
                            {...register('creditWithInterest', { required: true })}
                            className={`${styles.input} p-2`}
                            onChange={handleCreditWithInterest}
                        >
                            <option value='Si'>Si</option>
                            <option value='No'>No</option>
                        </select>
                        {errors.creditWithInterest && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El dato es requerido</p>
                        )}
                    </div>

                    {creditWithInterest === 'Si' && (
                        <div className="position-relative w-100">
                            <p className={`${styles.label} m-0`}>Tasa de interés</p>
                            <input
                                type="number"
                                {...register('creditInterestRate', { setValueAs: (value) => parseFloat(value) })}
                                className={`${styles.input} p-2`}
                                placeholder='5'
                                inputMode="numeric"
                                onChange={handleInterestRateChange}
                                min={0}
                            />
                            {errors.creditInterestRate && (
                                <p className={`${styles.text__Danger} text-danger position-absolute`}>La tasa de interés es requerida</p>
                            )}
                        </div>
                    )}
                </div>

                <div className={`${styles.container__Info} mb-4 d-flex align-items-center justify-content-between gap-3`}>
                    <div className="position-relative w-100">
                        <p className={`${styles.label} m-0`}>¿A cuántas cuotas vas a pagar?</p>
                        <input
                            type="number"
                            {...register('numberOfPayments', { setValueAs: (value) => parseFloat(value) })}
                            className={`${styles.input} p-2`}
                            placeholder="Número de cuotas"
                            inputMode="numeric"
                            onChange={handleNumberOfPaymentsChange}
                            min={0}
                        />
                        {errors.numberOfPayments && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>
                                El número de cuotas es requerido
                            </p>
                        )}
                    </div>
                    <div className="position-relative w-100">
                        <p className={`${styles.label} m-0`}>Valor aproximado de cada cuota</p>
                        <input
                            type="number"
                            {...register('paymentValue', { setValueAs: (value) => parseFloat(value) })}
                            className={`${styles.input} p-2`}
                            placeholder='Valor de cada cuota'
                            inputMode="numeric"
                            readOnly
                            value={paymentValue}
                            min={0}
                        />
                    </div>
                </div>

                <div className="mb-4 d-flex align-items-center justify-content-center position-relative">
                    {messageSelectedBranch && (
                        <div className={`${styles.error__Message_Selected_Branch} position-absolute`}>{messageSelectedBranch}</div>
                    )}
                    {messageSelectedSupplier && (
                        <div className={`${styles.error__Message_Selected_Client} position-absolute`}>{messageSelectedSupplier}</div>
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
            </form>
        </div>
    );
}

export default LoansRequested;
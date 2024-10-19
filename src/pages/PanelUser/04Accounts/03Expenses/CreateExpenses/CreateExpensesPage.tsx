/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
import { getProfileUser } from '../../../../../redux/User/userSlice/actions.ts';
import { getUsersPlatform } from '../../../../../redux/User/userPlatformSlice/actions.ts';
// ELEMENTOS DEL COMPONENTE
import ExpenseCash from '../../../../../components/PanelUser/04Accounts/02Expenses/01ExpenseCash/ExpenseCash.tsx';
import ExpenseCredit from '../../../../../components/PanelUser/04Accounts/02Expenses/02ExpenseCredit/ExpenseCredit.tsx';

import AccountsPayable from '../../../../../components/PanelUser/04Accounts/02Expenses/04AccountsPayable/AccountsPayable.tsx';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

interface DecodedToken {
    userId: string;
    typeRole: string;
}

function CreateExpensesPage() {
    const token = jsCookie.get("token") || '';

    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const branches = useSelector((state: RootState) => state.branch.branch);
    const user = useSelector((state: RootState) => state.user.user);
    const usersPlatform = useSelector((state: RootState) => state.usersPlatform.usersPlatform);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
            dispatch(getProfileUser(token));
            dispatch(getUsersPlatform(token));
        }
    }, [token]);
    
    //Selección de la sede
    const [selectedBranch, setSelectedBranch] = useState('');

    // Manejar cambio de la sede
    const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setSelectedBranch(selectedId);
    };

    //Decodificar el token para saber quién hace la transacción
    const [decodeUserIdRegister, setDecodeUserIdRegister] = useState<string>('');
    useEffect(() => {
        if (token) {
            try {
                const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
                setDecodeUserIdRegister(decodedToken.userId);
            } catch (error) {
                throw new Error(`Error al decodificar el token: ${error}`);
            }
        }
    }, [token]);

    // Estado para manejar el checkbox de fechas automáticas
    const [checkDatesRegisterTx, setCheckDatesRegisterTx] = useState(true);

    // Estados para las fechas de registro y transacción
    const [registrationDate, setRegistrationDate] = useState<Date>();
    const [transactionDate, setTransactionDate] = useState<Date>();
    const [defaultDates, setDefaultDates] = useState<boolean>(true);

    // Manejar cambio en el checkbox de fechas automáticas
    const handleCheckDatesRegisterTx = () => {
        setCheckDatesRegisterTx(prevCheckDatesRegisterTx => !prevCheckDatesRegisterTx);
    };

    // Estado para seleccionar contado o crédito
    const [creditCashOption, setCreditCashOption] = useState('GastoContado');
    const handleCreditCashChange = (creditCash: string) => {
        setCreditCashOption(creditCash);
    };

    // Efecto para establecer las fechas por defecto o manualmente
    useEffect(() => {
        if (checkDatesRegisterTx) {
            const currentDate = new Date();
            setRegistrationDate(currentDate);
            setTransactionDate(currentDate);
            setDefaultDates(true);
        } else {
            setRegistrationDate(undefined);
            setTransactionDate(undefined);
            setDefaultDates(false);
        }
    }, [checkDatesRegisterTx]);

    // Formatear las fechas para pasarlas como props
    const formattedRegistrationDate = registrationDate ? format(registrationDate, 'yyyy-MM-dd HH:mm:ss') : undefined;
    const formattedTransactionDate = transactionDate ? format(transactionDate, 'yyyy-MM-dd HH:mm:ss') : undefined;

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus gastos y cuentas por pagar</h1>

                        <div className={`${styles.container__Head} mb-4 d-flex align-items-start justify-content-between`}>
                            <div className='d-flex flex-column gap-3'>
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

                            <div className={`${styles.container__Date} d-flex flex-column position-relative gap-2`}>
                                <div className={`${styles.check__Date} d-flex align-items-center justify-content-between`}>
                                    <p className="m-0">Selecciona el check si la fecha de registro es la fecha de la transacción</p>
                                    <input
                                        type="checkbox"
                                        onChange={handleCheckDatesRegisterTx}
                                        className={`${styles.checkbox} `}
                                        defaultChecked={true}
                                    />
                                </div>

                                <div className={`${styles.container__Calendars} d-flex align-items-center justify-content-center gap-3`}>
                                    <div className="d-flex flex-column align-items-start justify-content-center">
                                        <p className="mb-1">Fecha de registro</p>
                                        <DatePicker
                                            selected={registrationDate || undefined}
                                            onChange={(date) => setRegistrationDate(date || undefined)}
                                            className={`${styles.calendar} p-2 border `}
                                            dayClassName={(date) =>
                                                date.getDay() === 6 || date.getDay() === 0 ? styles.weekend__Day : styles.weekday
                                            }
                                            placeholderText='Fecha de registro'
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            disabled={checkDatesRegisterTx}
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start justify-content-center">
                                        <p className="mb-1">Fecha de transacción</p>
                                        <DatePicker
                                            selected={transactionDate || undefined}
                                            onChange={(date) => setTransactionDate(date || undefined)}
                                            className={`${styles.calendar} p-2 border `}
                                            dayClassName={(date) =>
                                                date.getDay() === 6 || date.getDay() === 0 ? styles.weekend__Day : styles.weekday
                                            }
                                            placeholderText='Fecha de transacción'
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            disabled={checkDatesRegisterTx}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 d-flex align-items-center justify-content-between">
                            <div>
                                <p className={`${styles.label} m-0`}>El gasto ¿Es de contado o a crédito?</p>
                                <div className="d-flex align-items-center justify-content-center gap-3">
                                    <div
                                        className={`${styles.type__Income} ${creditCashOption === 'GastoContado' ? styles.active : ''} d-flex align-items-center justify-content-center`}
                                        onClick={() => handleCreditCashChange('GastoContado')}
                                    >
                                        Compras de contado
                                    </div>
                                    <div
                                        className={`${styles.type__Income} ${creditCashOption === 'GastoCredito' ? styles.active : ''} d-flex align-items-center justify-content-center`}
                                        onClick={() => handleCreditCashChange('GastoCredito')}
                                    >
                                        Compras a crédito
                                    </div>
                                    <div
                                        className={`${styles.type__Income} ${creditCashOption === 'OtrosGastos' ? styles.active : ''} d-flex align-items-center justify-content-center`}
                                        onClick={() => handleCreditCashChange('OtrosGastos')}
                                    >
                                        Otros gastos
                                    </div>
                                    <div
                                        className={`${styles.type__Income} ${creditCashOption === 'CuentasPagar' ? styles.active : ''} d-flex align-items-center justify-content-center`}
                                        onClick={() => handleCreditCashChange('CuentasPagar')}
                                    >
                                        Cuentas por pagar
                                    </div>
                                </div>
                            </div>
                        </div>

                        {creditCashOption === 'GastoContado' && (
                            <ExpenseCash
                                token={token}
                                decodeUserIdRegister={decodeUserIdRegister}
                                selectedBranch={selectedBranch}
                                defaultDates={defaultDates}
                                registrationDate={formattedRegistrationDate}
                                transactionDate={formattedTransactionDate}
                                typeExpense='Gasto'
                            />
                        )}

                        {creditCashOption === 'GastoCredito' && (
                            <ExpenseCredit
                                token={token}
                                decodeUserIdRegister={decodeUserIdRegister}
                                selectedBranch={selectedBranch}
                                defaultDates={defaultDates}
                                registrationDate={formattedRegistrationDate}
                                transactionDate={formattedTransactionDate}
                            />
                        )}

                        {creditCashOption === 'CuentasPagar' && (
                            <AccountsPayable
                                token={token}
                                decodeUserIdRegister={decodeUserIdRegister}
                                usersPlatform={usersPlatform}
                                selectedBranch={selectedBranch}
                                defaultDates={defaultDates}
                                registrationDate={formattedRegistrationDate}
                                transactionDate={formattedTransactionDate}
                            />
                        )}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CreateExpensesPage;
/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { format } from 'date-fns';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getAccountsReceivablePaginated, getAccountsReceivableByBranchPaginated } from '../../../../../redux/User/10ReportsAndIndicators/finantialIndicators/actions.ts';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsReceivable } from '../../../../../types/User/accountsReceivable.types.ts';
import ColumnSelector from '../../../../../helpers/ColumnSelector/ColumnSelector';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import ComponentPaginated from '../../../../../components/GeneralComponents/Paginated/ComponentPaginated.tsx';
import styles from './styles.module.css';

function ConsultCxcPage() {
    const token = jsCookie.get('token') || '';

    //REDUX
    const dispatch: AppDispatch = useDispatch();
    const { accountsReceivable, totalRegisters } = useSelector((state: RootState) => state.finantialIndicators);
    const branches = useSelector((state: RootState) => state.branch.branch);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
        }
    }, [token]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsByPage, setItemsByPage] = useState<number>(20);
    useEffect(() => {
        const fetchData = async (page: number, limit: number) => {
            try {
                await dispatch(getAccountsReceivablePaginated(token, page, limit));
            } catch (error) {
                throw new Error('Error al traer los registros');
            }
        };
        fetchData(currentPage, itemsByPage);
    }, [currentPage, itemsByPage]);

    const handleItemsByPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsByPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    const [selectedBranch, setSelectedBranch] = useState('');
    useEffect(() => {
        if (token) {
            if (selectedBranch) {
                const fetchData = async (page: number, limit: number) => {
                    try {
                        await dispatch(getAccountsReceivableByBranchPaginated(selectedBranch, token, page, limit));
                    } catch (error) {
                        throw new Error('Error al traer los registros');
                    }
                };
                fetchData(currentPage, itemsByPage);
            } else {
                const fetchData = async (page: number, limit: number) => {
                    try {
                        await dispatch(getAccountsReceivablePaginated(token, page, limit));
                    } catch (error) {
                        throw new Error('Error al traer los registros');
                    }
                };
                fetchData(currentPage, itemsByPage);
            }
        }
    }, [selectedBranch, token, dispatch]);

    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [filteredTransactions, setFilteredTransactions] = useState<IAccountsReceivable[] | null>(null);

    const handleFilter = () => {
        if (!startDate || !endDate) {
            setFilteredTransactions(null);
            return;
        }
        if (accountsReceivable === null) return;
        const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
        const endDateForFilter = new Date(endDate);
        endDateForFilter.setDate(endDateForFilter.getDate() + 1);
        const formattedEndDate = format(endDateForFilter, 'yyyy-MM-dd');
        const filtered = Array.isArray(accountsReceivable)
            ? accountsReceivable.filter((accountsReceivable) => {
                const transactionDate = format(new Date(accountsReceivable.transactionDate), 'yyyy-MM-dd');
                return (
                    transactionDate >= formattedStartDate &&
                    transactionDate <= formattedEndDate &&
                    (!selectedBranch || accountsReceivable.branchId === selectedBranch)
                );
            }) : [];
        setFilteredTransactions(filtered);
    };

    const clearFilterDate = () => {
        setStartDate(null);
        setEndDate(null);
        setFilteredTransactions(null);
    };

    const menuColumnSelector = useRef<HTMLDivElement | null>(null);
    const [menuColumnSelectorVisible, setMenuColumnSelectorVisible] = useState(false);
    const handleColumnSelector = () => {
        setMenuColumnSelectorVisible(!menuColumnSelectorVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuColumnSelector.current && !menuColumnSelector.current.contains(event.target as Node)) {
                setMenuColumnSelectorVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ menuColumnSelector ]);

    const [selectedColumns, setSelectedColumns] = useState<string[]>([
        'Fecha de transacción',
        'Sede',
        'Cuotas',
        'Valor de la cuota',
        'Valor total',
        'Deudor',
    ]);

    const handleColumnChange = (column: string) => {
        const updatedColumns = selectedColumns.includes(column)
            ? selectedColumns.filter((col) => col !== column)
            : [...selectedColumns, column];
        setSelectedColumns(updatedColumns);
    };

    const transactionsToShow = filteredTransactions && filteredTransactions.length > 0 ? filteredTransactions : accountsReceivable;

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4 mx-auto`}>Ver todas las cuentas por cobrar</h1>

                        <div className={`${styles.container__Filters} mb-3 mx-auto d-flex align-items-center justify-content-between`}>
                            <div className={`${styles.container__Filter_Branch} d-flex align-items-center justify-content-center gap-2`}>
                                <h3 className={`${styles.title__Branch} m-0`}>Filtra los registros por sede</h3>
                                <select
                                    className={`${styles.select__Branch} p-2 border rounded`}
                                    value={selectedBranch}
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                >
                                    <option value=''>Todas</option>
                                    {Array.isArray(branches) && branches.map((branch, index) => (
                                        <option key={index} value={branch.id}>
                                            {branch.nameBranch}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={`${styles.container__Column_Selector} d-flex align-items-center justify-content-end position-relative`} >
                                <span className={`${styles.span__Menu} p-2`} onClick={handleColumnSelector}>Escoge las columnas que deseas ver</span>
                                {menuColumnSelectorVisible && (
                                    <div ref={menuColumnSelector} className={`${styles.menu} p-3 d-flex flex-column align-items-start position-absolute`}>
                                        <ColumnSelector
                                            selectedColumns={selectedColumns}
                                            onChange={handleColumnChange}
                                            minSelectedColumns={3}
                                            availableColumns={[
                                                'Fecha de transacción',
                                                'Sede',
                                                'Cuotas',
                                                'Valor de la cuota',
                                                'Valor total',
                                                'Deudor',
                                            ]}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`${styles.container__Link_Head_Navigate} mb-3 mx-auto d-flex align-items-start justify-content-between`}>
                            <div className={`${styles.container__Navigate_Consult} d-flex align-items-center justify-content-between gap-2`}>
                                <Link to='/accounts/consult-incomes' className={`${styles.Link__Consult} ${location.pathname === '/accounts/consult-incomes' ? styles.active : ''} text-decoration-none` }>Consulta Ingresos</Link>
                                <Link to='/accounts/consult-cxc' className={`${styles.Link__Consult} ${location.pathname === '/accounts/consult-cxc' ? styles.active : ''} text-decoration-none` }>Consulta CXC</Link>
                                <Link to='/accounts/consult-expences' className={`${styles.Link__Consult} ${location.pathname === '/accounts/consult-expences' ? styles.active : ''} text-decoration-none` }>Consulta Gastos</Link>
                                <Link to='/accounts/consult-cxp' className={`${styles.Link__Consult} ${location.pathname === '/accounts/consult-cxp' ? styles.active : ''} text-decoration-none` }>Consulta CXP</Link>
                            </div>
                            <div className={`${styles.container__Filter_Dates} flex-column d-flex align-items-end justify-content-end gap-2`}>
                                <div className={`${styles.filter__Dates} d-flex gap-2`}>
                                    <input
                                        type="date"
                                        className={`${styles.input__Date} border p-1 text-secondary`}
                                        value={startDate || ''}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                    <input
                                        type="date"
                                        className={`${styles.input__Date} border p-1 text-secondary`}
                                        value={endDate || ''}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                    <button className={`${styles.handle__Filter} border-0 text-decoration-none`} onClick={handleFilter}>Filtrar</button>
                                </div>
                                <button className={`${styles.clear__Filter} border-0 text-decoration-none`} onClick={clearFilterDate}>Borrar filtro de fechas</button>
                            </div>
                        </div>

                        <div className={`${styles.container__Paginated} mb-4 mx-auto d-flex align-items-center justify-content-end gap-3`}>
                            <ComponentPaginated
                                totalRegisters={totalRegisters}
                                limit={itemsByPage}
                                onPageChange={handlePageChange}
                                currentPage={currentPage}
                            />
                            <div className={`${styles.container__Items_By_page} d-flex align-items-center justify-content-center`}>
                                <span>Ver:</span>
                                <select
                                    className={`${styles.select} p-1 border`}
                                    value={itemsByPage}
                                    onChange={handleItemsByPage}
                                >
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <span>por página</span>
                            </div>
                        </div>

                        <div className={`${styles.container__Table} mt-2 mb-2 mx-auto`}>
                            <table className="table">
                                <thead className={`${styles.container__Head} `}>
                                    <tr className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                        {selectedColumns.includes('Fecha de transacción') && (
                                            <th className={`${styles.transaction__Date} d-flex align-items-center justify-content-center text-center`}>Fecha de TX</th>
                                        )}
                                        {selectedColumns.includes('Sede') && (
                                            <th className={`${styles.branch} d-flex align-items-center justify-content-center`}>Sede</th>
                                        )}
                                        {selectedColumns.includes('Cuotas') && (
                                            <th className={`${styles.initial__Number_Payments} d-flex align-items-center justify-content-center text-center`}>Cuotas</th>
                                        )}
                                        {selectedColumns.includes('Valor de la cuota') && (
                                            <th className={`${styles.payment__Value} d-flex align-items-center justify-content-center text-center`}>Valor de la cuota</th>
                                        )}
                                        {selectedColumns.includes('Valor total') && (
                                            <th className={`${styles.total__Value} d-flex align-items-center justify-content-center text-center`}>Total</th>
                                        )}
                                        {selectedColumns.includes('Deudor') && (
                                            <th className={`${styles.transaction__Counterpart} d-flex align-items-center justify-content-center text-center`}>Deudor</th>
                                        )}
                                    </tr>
                                </thead>

                                <tbody className={`${styles.container__Body} `}>
                                    {Array.isArray(transactionsToShow) && transactionsToShow.length > 0 ? (
                                        transactionsToShow.map((accountsReceivable) => (
                                            <tr key={accountsReceivable.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                                {selectedColumns.includes('Fecha de transacción') && (
                                                    <td className={`${styles.transaction__Date} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{new Date(accountsReceivable.transactionDate).toLocaleDateString('en-GB')}</span>
                                                    </td>
                                                )}
                                                {selectedColumns.includes('Sede') && (
                                                    <td className={`${styles.branch} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span>
                                                            {Array.isArray(branches) && branches.map((branch, index) => (
                                                                accountsReceivable.branchId === branch.id && (
                                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`} key={index}>{branch.nameBranch}</span>
                                                                )
                                                            ))}
                                                        </span>
                                                    </td>
                                                )}
                                                {selectedColumns.includes('Cuotas') && (
                                                    <td className={`${styles.initial__Number_Payments} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{accountsReceivable.initialNumberOfPayments}</span>
                                                    </td>
                                                )}
                                                {selectedColumns.includes('Valor de la cuota') && (
                                                    <td className={`${styles.payment__Value} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>$ {formatNumber(accountsReceivable.paymentValue)}</span>
                                                    </td>
                                                )}
                                                {selectedColumns.includes('Valor total') && (
                                                    <td className={`${styles.total__Value} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{accountsReceivable.currentBalance? `$ ${formatNumber(accountsReceivable.currentBalance)}` : 'N/A'}</span>
                                                    </td>
                                                )}
                                                {selectedColumns.includes('Deudor') && (
                                                    <td className={`${styles.transaction__Counterpart} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{accountsReceivable.transactionCounterpartId}</span>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={10} className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                                No tienes transacciones registradas
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ConsultCxcPage;
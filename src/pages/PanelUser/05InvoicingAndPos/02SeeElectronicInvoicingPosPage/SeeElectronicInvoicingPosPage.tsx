/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import jsCookie from 'js-cookie';
import { format } from 'date-fns';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { getAccountsBooks, getAccountsBookByBranch } from '../../../../redux/User/04AccountsSlice/actions';
import { getBranches } from '../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from '../../../../types/User/accountsBook.types';
import ColumnSelector from '../../../../helpers/ColumnSelector/ColumnSelector';
import { formatNumber } from '../../../../helpers/FormatNumber/FormatNumber';
import NavBar from '../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../components/PanelUser/Footer/Footer';
import ComponentPaginated from '../../../../components/GeneralComponents/Paginated/ComponentPaginated.tsx';
import { BsCloudDownload } from "react-icons/bs";
import { FaPrint } from "react-icons/fa";
import styles from './styles.module.css';

function SeeElectronicInvoicingPosPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    //REDUX
    const { accountsBook, totalRegisters } = useSelector((state: RootState) => state.accountsBook);
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
                await dispatch(getAccountsBooks(token, page, limit));
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
                        await dispatch(getAccountsBookByBranch(selectedBranch, token, page, limit));
                    } catch (error) {
                        throw new Error('Error al traer los registros');
                    }
                };
                fetchData(currentPage, itemsByPage);
            } else {
                const fetchData = async (page: number, limit: number) => {
                    try {
                        await dispatch(getAccountsBooks(token, page, limit));
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
    const [filteredTransactions, setFilteredTransactions] = useState<IAccountsBook[] | null>(null);

    const handleFilter = () => {
        if (!startDate || !endDate) {
            setFilteredTransactions(null);
            return;
        }
        if (accountsBook === null) return;
        const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
        const endDateForFilter = new Date(endDate);
        endDateForFilter.setDate(endDateForFilter.getDate() + 1);
        const formattedEndDate = format(endDateForFilter, 'yyyy-MM-dd');
        const filtered = Array.isArray(accountsBook)
            ? accountsBook.filter((accountsBook) => {
                const transactionDate = format(new Date(accountsBook.transactionDate), 'yyyy-MM-dd');
                return (
                    transactionDate >= formattedStartDate &&
                    transactionDate <= formattedEndDate &&
                    (!selectedBranch || accountsBook.branchId === selectedBranch)
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
        'Emisión',
        'Vencimiento',
        'Sede',
        'Comprador',
        'Valor total',
        'Estado Dian',
        'Estado',
    ]);

    const handleColumnChange = (column: string) => {
        const updatedColumns = selectedColumns.includes(column)
            ? selectedColumns.filter((col) => col !== column)
            : [...selectedColumns, column];
        setSelectedColumns(updatedColumns);
    };

    const transactionsToShow = filteredTransactions && filteredTransactions.length > 0 ? filteredTransactions : accountsBook;

    // Función para manejar la impresión
    const handlePrint = () => {
        window.print();
    };

    // Función para manejar la descarga del PDF
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = 'https://www.uaeh.edu.mx/investigacion/productos/4774/ecologia.pdf';
        link.download = 'ecologia.pdf';
        link.target = '_blank';                 // Abrir en una nueva pestaña
        link.rel = 'noopener noreferrer';       // Añadir noreferrer y noopener
        link.click();
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4 mx-auto`}>Gestión de Facturas y POS</h1>
                        <p>Poner la funcionalidad de convertir un POS a Factua electrónica y viceverza</p>

                        <div className={`${styles.container__Filters} mb-3 mx-auto d-flex align-items-center justify-content-between`}>
                            <div className={`${styles.container__Filter_Branch} d-flex align-items-center justify-content-center gap-2`}>
                                <h3 className={`${styles.title__Branch} m-0`}>Filtra por sede</h3>
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

                            <div className={`${styles.container__Services} mb-3 d-flex align-items-center justify-content-end position-relative`} >
                                <span className={`${styles.span__Menu} p-2`} onClick={handleColumnSelector}>Escoge las columnas que deseas ver</span>
                                {menuColumnSelectorVisible && (
                                    <div ref={menuColumnSelector} className={`${styles.menu} p-3 d-flex flex-column align-items-start position-absolute`}>
                                        <ColumnSelector
                                            selectedColumns={selectedColumns}
                                            onChange={handleColumnChange}
                                            minSelectedColumns={3}
                                            availableColumns={[
                                                'Emisión',
                                                'Vencimiento',
                                                'Sede',
                                                'Comprador',
                                                'Valor total',
                                                'Estado Dian',
                                                'Estado',
                                            ]}
                                        />
                                    </div>
                                )}
                            </div>
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
                                        {selectedColumns.includes('Emisión') && (
                                            <th className={`${styles.issue__Date} d-flex align-items-center justify-content-center text-center`}>Emisión</th>
                                        )}
                                        {selectedColumns.includes('Vencimiento') && (
                                            <th className={`${styles.expiration__Date} d-flex align-items-center justify-content-center text-center`}>Vencimiento</th>
                                        )}
                                        {selectedColumns.includes('Sede') && (
                                            <th className={`${styles.branch} d-flex align-items-center justify-content-center text-center`}>Sede</th>
                                        )}
                                        {selectedColumns.includes('Comprador') && (
                                            <th className={`${styles.transaction__Counterpart} d-flex align-items-center justify-content-center text-center`}>Comprador</th>
                                        )}
                                        {selectedColumns.includes('Valor total') && (
                                            <th className={`${styles.total__Value} d-flex align-items-center justify-content-center text-center`}>Total</th>
                                        )}
                                        {selectedColumns.includes('Estado Dian') && (
                                            <th className={`${styles.dian__State} d-flex align-items-center justify-content-center text-center`}>Estado Dian</th>
                                        )}
                                        {selectedColumns.includes('Estado') && (
                                            <th className={`${styles.state} d-flex align-items-center justify-content-center text-center`}>Estado</th>
                                        )}
                                        <th className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody className={`${styles.container__Body} `}>
                                    {Array.isArray(transactionsToShow) && transactionsToShow.length > 0 ? (
                                        transactionsToShow.map((accountsBook) => (
                                            <tr key={accountsBook.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                                {selectedColumns.includes('Emisión') && (
                                                    <td className={`${styles.issue__Date} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{new Date(accountsBook.transactionDate).toLocaleDateString('en-GB')}</span>
                                                    </td>
                                                )}
                                                {selectedColumns.includes('Vencimiento') && (
                                                    <td className={`${styles.expiration__Date} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{new Date(accountsBook.transactionDate).toLocaleDateString('en-GB')}</span>
                                                    </td>
                                                )}
                                                {selectedColumns.includes('Sede') && (
                                                    <td className={`${styles.branch} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span>
                                                            {Array.isArray(branches) && branches.map((branch, index) => (
                                                                accountsBook.branchId === branch.id && (
                                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`} key={index}>{branch.nameBranch}</span>
                                                                )
                                                            ))}
                                                        </span>
                                                    </td>
                                                )}
                                                {selectedColumns.includes('Comprador') && (
                                                    <td className={`${styles.transaction__Counterpart} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{accountsBook.transactionCounterpartId}</span>
                                                    </td>
                                                )}
                                                {selectedColumns.includes('Valor total') && (
                                                    <td className={`${styles.total__Value} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>{accountsBook.totalValue? `$ ${formatNumber(accountsBook.totalValue)}` : 'N/A'}</span>
                                                    </td>
                                                )}
                                                {selectedColumns.includes('Estado Dian') && (
                                                    <td className={`${styles.dian__State} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>Pendiente</span>
                                                    </td>
                                                )}
                                                {selectedColumns.includes('Estado') && (
                                                    <td className={`${styles.state} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <span className={`${styles.text__Ellipsis} overflow-hidden`}>Pendiente</span>
                                                    </td>
                                                )}
                                                <td className={`${styles.action} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`} >
                                                            <FaPrint
                                                                className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                                onClick={handlePrint}
                                                            />
                                                        </div>
                                                        <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`} >
                                                            <BsCloudDownload
                                                                className={`${styles.button__Action} d-flex align-items-center justify-content-center`}
                                                                onClick={handleDownload}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
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

export default SeeElectronicInvoicingPosPage;
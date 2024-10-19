/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { PDFDownloadLink } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getAverageTicketPerPeriod, getAverageTicketPerPeriodByBranch } from '../../../../../redux/User/10ReportsAndIndicators/finantialIndicators/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from "../../../../../types/UserPanel/04Accounts/accountsBook.types";
import DownloadAverageTicket from './DownloadAverageTicket';
import ModalAverageTicket from './ModalAverageTicket';
import { BsCart } from 'react-icons/bs';
import { PiExportBold } from "react-icons/pi";
import styles from './styles.module.css';

function AverageTicket () {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const averageTicketPerPeriod = useSelector((state: RootState) => state.finantialIndicators.averageTicketPerPeriod);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [originalData, setOriginalData] = useState<IAccountsBook[] | null>(null);
    const [sales, setSales] = useState<IAccountsBook[] | null>(null);
    const [averageTicketToday, setAverageTicketToday] = useState(0);
    const [averageTicketThisMonth, setAverageTicketThisMonth] = useState(0);
    const [averageTicketThisYear, setAverageTicketThisYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [filteredAverageTicket, setFilteredAverageTicket] = useState<number>(0);
    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        dispatch(getBranches(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (selectedBranch === 'Todas') {
            dispatch(getAverageTicketPerPeriod(token));
        } else {
            dispatch(getAverageTicketPerPeriodByBranch(selectedBranch, token));
        }
    }, [selectedBranch, dispatch, token]);

    useEffect(() => {
        if (averageTicketPerPeriod && averageTicketPerPeriod.length > 0) {
            setOriginalData(averageTicketPerPeriod);
        }
    }, [averageTicketPerPeriod]);

    useEffect(() => {
        if (averageTicketPerPeriod) {
            const filteredSales = averageTicketPerPeriod.filter(
                (transaction: { transactionType: string; }) =>
                    transaction.transactionType === 'Ingreso'
            );
            setSales(filteredSales);
        }
    }, [ averageTicketPerPeriod ]);

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const salesToday = sales?.filter(
        (transaction) => new Date(transaction.transactionDate).toLocaleDateString() === today.toLocaleDateString()
    ) || [];

    const salesThisMonth = sales?.filter(
        (transaction) => new Date(transaction.transactionDate) >= startOfMonth
    ) || [];

    const salesThisYear = sales?.filter(
        (transaction) => new Date(transaction.transactionDate) >= startOfYear
    ) || [];

    useEffect(() => {
        // Calcular el ticket promedio para hoy
        const totalValueToday = salesToday.reduce((sum, transaction) => sum + transaction.totalValue, 0);
        const averageTicketTodayValue = salesToday.length > 0 ? totalValueToday / salesToday.length : 0;
        setAverageTicketToday(averageTicketTodayValue);
    
        // Calcular el ticket promedio para este mes
        const totalValueThisMonth = salesThisMonth.reduce((sum, transaction) => sum + transaction.totalValue, 0);
        const averageTicketThisMonthValue = salesThisMonth.length > 0 ? totalValueThisMonth / salesThisMonth.length : 0;
        setAverageTicketThisMonth(averageTicketThisMonthValue);
    
        // Calcular el ticket promedio para este año
        const totalValueThisYear = salesThisYear.reduce((sum, transaction) => sum + transaction.totalValue, 0);
        const averageTicketThisYearValue = salesThisYear.length > 0 ? totalValueThisYear / salesThisYear.length : 0;
        setAverageTicketThisYear(averageTicketThisYearValue);
    }, [salesToday, salesThisMonth, salesThisYear]);

    const getBranchName = useCallback((branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    }, [branches]);

    const exportToExcel = useCallback(() => {
        if (originalData) {
            const dataForExcel = originalData.map(item => ({
                'Sede': item.branchId,
            }));
            const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Ticket_Promedio');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Ticket_Promedio.xlsx';
            a.click();
            URL.revokeObjectURL(url);
        }
    }, [originalData, getBranchName]);

    const handleFilter = () => {
        if (!selectedMonth || !selectedYear) {
            setFilteredAverageTicket(0);
            return;
        }
        const filteredSales = sales?.filter((transaction) => {
            const transactionDate = new Date(transaction.transactionDate);
            return (
                transactionDate.getMonth() + 1 === Number(selectedMonth) &&
                transactionDate.getFullYear() === Number(selectedYear)
            );
        }) || [];
        const averageTicketForFilteredData = calculateAverageTicket(filteredSales);
        setFilteredAverageTicket(averageTicketForFilteredData);
    };

    const resetFilter = () => {
        setSelectedMonth('');
        setSelectedYear('');
        setFilteredAverageTicket(0);
    };

    const calculateAverageTicket = (salesData: IAccountsBook[]) => {
        if (salesData.length === 0) return 0;  
        const totalSales = salesData.reduce((sum, transaction) => sum + transaction.totalValue, 0);
        const averageTicket = totalSales / salesData.length;      
        return averageTicket;
    };   

    return (
        <div className={`${styles.container} m-2 p-3 chart-container border rounded d-flex flex-column align-items-center justify-content-center`} >
            <div className={styles.containerS}>
                <div className={`${styles.containerTitle} pt-2 pb-4 d-flex align-items-center justify-content-between`}>
                    <h2 className="text-primary-emphasis text-start">Ticket promedio</h2>
                    <div className={styles.containerButtonExportT}>
                        {originalData && (
                            <PDFDownloadLink
                                document={<DownloadAverageTicket data={originalData} />}
                                fileName="Ticket_Promedio.pdf"
                            >
                                <button className={`${styles.buttonPDF} `} >PDF <PiExportBold className={styles.icon} /></button>
                            </PDFDownloadLink>
                        )}
                        <button className={`${styles.buttonExcel} btn btn-success btn-sm`} onClick={exportToExcel}>Excel <PiExportBold className={styles.icon} /></button>
                    </div>
                </div>

                <div className="m-auto text-center border">
                    <div className="d-flex justify-content-between">
                        <select
                            className="p-3 border-0 text-center"
                            value={selectedBranch}
                            onChange={(e) => setSelectedBranch(e.target.value)}
                        >
                            <option value=''>Todas las Sedes</option>
                            {Array.isArray(branches) && branches.map((branch, index) => (
                                <option key={index} value={branch.id}>
                                    {branch.nameBranch}
                                </option>
                            ))}
                        </select>
                        <button className="m-2 p-3 chart-container border rounded" onClick={resetFilter}>Borrar Filtro de sedes</button>
                    </div>
                </div>

                <div className={`${styles.containerInformatives} `}>
                    <div className={`${styles.data} border rounded d-flex`}>
                        <h5 className={`${styles.dataTitle} text-primary m-0`}>Ticket promedio de hoy</h5>
                        <BsCart className={`${styles.dataIcon} text-success`} />
                        <div className={`${styles.containerDataIcon} d-flex`}>
                            <h6 className='text-success m-0'>$ </h6>
                            <h5 className={`${styles.dataValue} m-0`}>{averageTicketToday.toLocaleString()}</h5>
                        </div>
                    </div>
                    <div className={`${styles.data} border rounded d-flex`}>
                        <h5 className={`${styles.dataTitle} text-primary m-0`}>Ticket promedio de este mes</h5>
                        <BsCart className={`${styles.dataIcon} text-success`} />
                        <div className={`${styles.containerDataIcon} d-flex`}>
                            <h6 className='text-success m-0'>$ </h6>
                            <h5 className={`${styles.dataValue} m-0`}>{averageTicketThisMonth.toLocaleString()}</h5>
                        </div>
                    </div>
                    <div className={`${styles.data} border rounded d-flex`}>
                        <h5 className={`${styles.dataTitle} text-primary m-0`}>Ticket promedio de este año</h5>
                        <BsCart className={`${styles.dataIcon} text-success`} />
                        <div className={`${styles.containerDataIcon} d-flex`}>
                            <h6 className='text-success m-0'>$ </h6>
                            <h5 className={`${styles.dataValue} m-0`}>{averageTicketThisYear.toLocaleString()}</h5>
                        </div>
                    </div>
                </div>
                
                <div className="p-3 d-flex flex-column align-items-center justify-content-center">
                    <div className='d-flex'>
                        <select
                            className="m-2 p-3 border rounded text-center"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            <option value=''>Selecciona un Mes</option>
                            <option value="1">Enero</option>
                            <option value="2">Febrero</option>
                            <option value="3">Marzo</option>
                            <option value="4">Abril</option>
                            <option value="5">Mayo</option>
                            <option value="6">Junio</option>
                            <option value="7">Julio</option>
                            <option value="8">Agosto</option>
                            <option value="9">Septiembre</option>
                            <option value="10">Octubre</option>
                            <option value="11">Noviembre</option>
                            <option value="12">Diciembre</option>
                        </select>
                        <select
                            className="m-2 p-3 border rounded text-center"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value=''>Selecciona un Año</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>
                    <div>
                        <button className={styles.buttonFilter} onClick={handleFilter}>Filtrar</button>
                        <button className={styles.buttonFilter} onClick={resetFilter}>Borrar Filtros</button>
                    </div>
                </div>

                <div className={`${styles.containerInformatives} `}>
                    <h5 className="text-primary-emphasis">Datos filtrados por mes y año</h5>
                    <div className={`${styles.data} border rounded d-flex`}>
                        <h5 className={`${styles.dataTitle} text-primary m-0`}>Ticket promedio filtrado</h5>
                        <BsCart className={`${styles.dataIcon} text-success`} />
                        <div className={`${styles.containerDataIcon} d-flex`}>
                            <h6 className='text-success m-0'>$ </h6>
                            <h5 className={`${styles.dataValue} m-0`}>{filteredAverageTicket.toLocaleString()}</h5>
                        </div>
                    </div>
                </div>
                
                <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl">
                    <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                        <Modal.Title>Detalles de tus tickets promedios</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalAverageTicket />
                    </Modal.Body>
                </Modal>
            </div>

            <div className="d-flex">
                <button className={styles.buttonDetail} onClick={() => { setShowCancelModal(true) }} >Ver Detalles</button>
            </div>
        </div>
    );
}

export default AverageTicket;
/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useRef } from 'react';
import Cookies from 'js-cookie';
import { Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Chart from 'chart.js/auto';
import { PDFDownloadLink } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getAccountsReceivable, getAccountsReceivableByBranch } from '../../../../../redux/User/10ReportsAndIndicators/finantialIndicators/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsReceivable } from '../../../../../types/User/accountsReceivable.types';
import DownloadAccountsReceivable from './DownloadAccountsReceivable';
import ModalAccountsReceivable from './ModalAccountsReceivable';
import { PiExportBold } from "react-icons/pi";
import styles from './styles.module.css';

function AccountsReceivable() {
    const token = Cookies.get('token') || '';
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const accountsReceivable = useSelector((state: RootState) => state.finantialIndicators.accountsReceivable);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [originalData, setOriginalData] = useState<IAccountsReceivable[] | null>(null);
    const chartContainer = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        dispatch(getBranches(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (selectedBranch === 'Todas') {
            dispatch(getAccountsReceivable(token));
        } else {
            dispatch(getAccountsReceivableByBranch(selectedBranch, token));
        }
    }, [selectedBranch, dispatch, token]);

    useEffect(() => {
        if (Array.isArray(accountsReceivable)) {
            if (accountsReceivable.length > 0) {
                setOriginalData(accountsReceivable);
            } else {
                setOriginalData([]);
            }
        } else if (accountsReceivable) {
            setOriginalData([accountsReceivable]);
        }
    }, [accountsReceivable]);

    const renderChart = (data: IAccountsReceivable[] | null, start: Date | null, end: Date | null) => {
        if (!data || !chartContainer.current) return;
        if (chartContainer.current && data) {
            const ctx = chartContainer.current.getContext('2d');
            if (chartInstance.current) chartInstance.current.destroy();
            const filteredAccumulatedData: { date: string; total: number }[] = [];    
            let accumulatedTotal = 0;
            data.forEach(item => {
                const transactionDate = new Date(item.transactionDate).toLocaleDateString();
                if (!start || !end || (start && end && new Date(item.transactionDate) >= start && new Date(item.transactionDate) <= end)) {
                    if (item.currentBalance !== undefined) {
                        accumulatedTotal += item.currentBalance;
                        filteredAccumulatedData.push({ date: transactionDate, total: accumulatedTotal });
                    }
                }
            });
            const dates = filteredAccumulatedData.map(entry => entry.date);
            const totals = filteredAccumulatedData.map(entry => entry.total);
            if (ctx) {
                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [
                            {
                                data: totals,
                                fill: false,
                                borderColor: 'rgba(42, 157, 143, 1)',
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                            },
                            title: {
                                display: false,
                            },
                        },
                    },
                });
            }
        }
    };

    const handleFilter = () => {
        if (startDate && endDate) {
            const filteredData = originalData!.filter(item => {
                const itemDate = new Date(item.transactionDate);
                return itemDate >= startDate && itemDate <= endDate;
            });
            renderChart(filteredData, startDate, endDate);
        } else {
            renderChart(originalData, null, null);
        }
    };

    const clearFilter = () => {
        setStartDate(null);
        setEndDate(null);
        renderChart(originalData, null, null);
    };
    useEffect(() => {
        if (accountsReceivable) {
            setOriginalData(Array.isArray(accountsReceivable) ? accountsReceivable : [accountsReceivable]);
            renderChart(Array.isArray(accountsReceivable) ? accountsReceivable : [accountsReceivable], null, null);
        }
    }, [accountsReceivable]);

    const getBranchName = useCallback((branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    }, [branches]);

    const exportToExcel = useCallback(() => {
        if (originalData) {
            const dataForExcel = originalData.map(item => ({
                'Sede': item.branchId,
                'Fecha de Registro': item.transactionDate,
                'Cliente': item.transactionCounterpartId,
                'Id de cliente': item.transactionCounterpartId,
                'Tipo de Transacción': 'Venta',
            }));
            const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Cuentas_Por_Cobrar');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Cuentas_Por_Cobrar.xlsx';
            a.click();
            URL.revokeObjectURL(url);
        }
    }, [originalData, getBranchName]);

    return (
        <div className={`${styles.container} m-2 p-3 chart-container border rounded d-flex flex-column align-items-center justify-content-center`} >
            <div className={styles.containerS}>
                <div className={`${styles.containerTitle} pt-2 pb-4 d-flex align-items-center justify-content-between`}>
                    <h2 className="text-primary-emphasis text-start">Cuentas por cobrar</h2>
                    <div className={styles.containerButtonExportT}>
                        {originalData && (
                            <PDFDownloadLink
                                document={<DownloadAccountsReceivable data={originalData} />}
                                fileName="Cuentas_Por_Cobrar.pdf"
                            >
                                <button className={`${styles.buttonPDF} `} >PDF <PiExportBold className={styles.icon} /></button>
                            </PDFDownloadLink>
                        )}
                        <button className={`${styles.buttonExcel} btn btn-success btn-sm`} onClick={exportToExcel}>Excel <PiExportBold className={styles.icon} /></button>
                    </div>
                </div>

                <p className='text-center'>El calculo de las cuentas por cobrar no incluyen los pagos o compras a crédito relacionados con el Costos de Adquisición de Clientes y Costo de retención de clientes. En específico, no incluye el transporte o participación en eventos pagados a crédito.</p>
                
                <div className="m-auto text-center border">
                    <div className="d-flex justify-content-between">
                        <select
                            className="p-3 border-0 text-center"
                            value={selectedBranch}
                            onChange={(e) => setSelectedBranch(e.target.value)}
                        >
                            <option value=''>Selecciona una Sede</option>
                            {Array.isArray(branches) && branches.map((branch, index) => (
                                <option key={index} value={branch.id}>
                                    {branch.nameBranch}
                                </option>
                            ))}
                        </select>
                        <button className="m-2 p-3 chart-container border rounded" onClick={() => setSelectedBranch('')}>Borrar Filtro de sedes</button>
                    </div>
                </div>

                <div><canvas ref={chartContainer} /></div>

                <div className="p-4 d-flex align-items-center justify-content-around">
                    <div style={{ marginRight: '20px' }}>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Fecha de inicio"
                            className='p-1 border rounded'
                        />
                    </div>
                    <div>
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Fecha de fin"
                            className='p-1 border rounded'
                        />
                    </div>
                </div>

                <div className='d-flex align-items-center justify-content-center'>
                    <button className="btn btn-warning btn-sm m-2" onClick={handleFilter}>Filtrar</button>
                    <button className="btn btn-secondary btn-sm m-2" onClick={clearFilter}>Borrar Filtro</button>
                </div>
                
                <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl">
                    <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                        <Modal.Title>Detalle de tus cuentas por cobrar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalAccountsReceivable />
                    </Modal.Body>
                </Modal>
            </div>

            <div className="d-flex">
                <button className={styles.buttonDetail} onClick={() => { setShowCancelModal(true) }} >Ver Detalles</button>
            </div>
        </div>
    );
}

export default AccountsReceivable;
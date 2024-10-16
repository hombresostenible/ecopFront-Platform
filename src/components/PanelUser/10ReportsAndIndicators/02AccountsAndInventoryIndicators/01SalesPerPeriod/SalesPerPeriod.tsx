/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Chart from 'chart.js/auto';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getSalesPerPeriod, getSalesPerPeriodByBranch } from '../../../../../redux/User/indicator/finantialIndicators/actions';
import { getProfileUser } from '../../../../../redux/User/userSlice/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from "../../../../../types/User/accountsBook.types";
import DownloadSalesPerPeriod from './DownloadSalesPerPeriod';
import ModalSalesPerPeriod from './ModalSalesPerPeriod';
import { BsCart } from 'react-icons/bs';
import { PiExportBold } from "react-icons/pi";
import styles from './styles.module.css';

function SalesPerPeriod() {
    const token = jsCookie.get('token') || '';
    
    //REDUX
    const dispatch: AppDispatch = useDispatch();
    const salesPerPeriod = useSelector((state: RootState) => state.finantialIndicators.salesPerPeriod);
    const branches = useSelector((state: RootState) => state.branch.branch);
    const user = useSelector((state: RootState) => state.user.user);

    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [originalData, setOriginalData] = useState<IAccountsBook[] | null>(null);
    const chartContainer = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        dispatch(getBranches(token));
        dispatch(getProfileUser(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (selectedBranch === 'Todas') {
            dispatch(getSalesPerPeriod(token));
        } else {
            dispatch(getSalesPerPeriodByBranch(selectedBranch, token));
        }
    }, [selectedBranch, dispatch, token]);

    useEffect(() => {
        if (salesPerPeriod && salesPerPeriod.length > 0) {
            setOriginalData(salesPerPeriod);
        }
    }, [salesPerPeriod]);

    const renderChart = (data: IAccountsBook[] | null, start: Date | null, end: Date | null) => {
        if (chartContainer.current && data) {
            const ctx = chartContainer.current.getContext('2d');

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const filteredData = data.filter(item => {
                if (start && end) {
                    const itemDate = new Date(item.transactionDate);
                    return itemDate >= start && itemDate <= end;
                }
                return true;
            });

            const salesByDay: { [key: string]: number } = {};
            filteredData.forEach(item => {
                const transactionDate = new Date(item.transactionDate).toLocaleDateString();
                if (salesByDay[transactionDate]) {
                    salesByDay[transactionDate] += item.totalValue;
                } else {
                    salesByDay[transactionDate] = item.totalValue;
                }
            });

            const dates = Object.keys(salesByDay);
            const totals = Object.values(salesByDay);

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
            const filteredData = originalData!.filter((item: IAccountsBook) => {
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

    const [salesToday, setSalesToday] = useState(0);
    const [salesThisMonth, setSalesThisMonth] = useState(0);
    const [salesThisYear, setSalesThisYear] = useState(0);

    useEffect(() => {
        if (salesPerPeriod) {
            setOriginalData(salesPerPeriod);
            renderChart(salesPerPeriod, null, null);
            calculateSalesToday(salesPerPeriod);
            calculateSalesThisMonth(salesPerPeriod);
            calculateSalesThisYear(salesPerPeriod);
        }
    }, [salesPerPeriod]);

    const calculateSalesToday = (data: IAccountsBook[] | null) => {
        if (data) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const totalToday = data
                .filter(item => new Date(item.transactionDate) > yesterday && new Date(item.transactionDate) <= today)
                .reduce((total, item) => total + item.totalValue, 0);
            setSalesToday(totalToday);
        }
    };

    const calculateSalesThisMonth = (data: IAccountsBook[] | null) => {
        if (data) {
            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();
            const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
            firstDayOfMonth.setHours(0, 0, 0, 0);
            const totalThisMonth = data
                .filter(item => new Date(item.transactionDate) >= firstDayOfMonth)
                .reduce((total, item) => total + item.totalValue, 0);
            setSalesThisMonth(totalThisMonth);
        }
    };

    const calculateSalesThisYear = (data: IAccountsBook[] | null) => {
        if (data) {
            const now = new Date();
            const currentYear = now.getFullYear();
            const firstDayOfYear = new Date(currentYear, 0, 1);
            firstDayOfYear.setHours(0, 0, 0, 0);
            const totalThisYear = data
                .filter(item => new Date(item.transactionDate) >= firstDayOfYear)
                .reduce((total, item) => total + item.totalValue, 0);
            setSalesThisYear(totalThisYear);
        }
    };

    const getBranchName = useCallback((branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    }, [branches]);

    const [downloadPdf, setDownloadPdf] = React.useState(false);
    useEffect(() => {
        interface IAccountsBookWithBranch extends IAccountsBook {
            nameBranch: string;
        }
        if (downloadPdf) {
            const date = new Date();
            const nameBranch = getBranchName(selectedBranch);
            const dataForPdf = salesPerPeriod.map((item: IAccountsBookWithBranch) => ({
                nameBranch: getBranchName(item.branchId),
            }));
            const generatePdfDocument = async () => {
                const MyDocument = () => (
                    <DownloadSalesPerPeriod
                        user={user}
                        date={date}
                        data={dataForPdf as IAccountsBook[]}
                        nameBranch={nameBranch}
                    />
                );
                const blob = await pdf(<MyDocument />).toBlob();
                saveAs(blob, 'Ventas_del_Período.pdf');
                setDownloadPdf(false);
            };
            generatePdfDocument();
        }
    }, [downloadPdf, salesPerPeriod]);

    const handleDownload = () => {
        setDownloadPdf(true);
    };

    const exportToExcel = useCallback(() => {
        if (originalData) {
            const dataForExcel = originalData.map(item => ({
                'Sede': getBranchName(item.branchId),
                'Fecha de Registro': item.transactionDate,
                'Valor Total': item.totalValue,
                'Tipo de Transacción': 'Venta'
            }));
            const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas_del_Período');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Ventas_del_Período.xlsx';
            a.click();
            URL.revokeObjectURL(url);
        }
    }, [originalData, getBranchName]);

    return (
        <div className={`${styles.container} m-2 p-3 chart-container border rounded d-flex flex-column align-items-center justify-content-center`} >
            <div className={styles.containerS}>
                <div className={`${styles.containerTitle} pt-2 pb-4 d-flex align-items-center justify-content-between`}>
                    <h2 className="text-primary-emphasis text-start">Ventas del período</h2>
                    <div className={styles.containerButtonExportT}>
                        <div className={`${styles.buttonPDF} d-flex align-items-center justify-content-center gap-1`} onClick={handleDownload}>
                            PDF <PiExportBold className={styles.icon} />
                        </div>
                        <button className={`${styles.buttonExcel} btn btn-success btn-sm`} onClick={exportToExcel}>Excel <PiExportBold className={styles.icon} /></button>
                    </div>
                </div>

                <div className="d-flex justify-content-between border">
                    <select
                        className="p-3 border-0 text-center"
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                    >
                        <option value=''>Todas las sedes</option>
                        {Array.isArray(branches) && branches.map((branch, index) => (
                            <option key={index} value={branch.id}>
                                {branch.nameBranch}
                            </option>
                        ))}
                    </select>
                    <button className="m-2 p-3 chart-container border rounded" onClick={() => setSelectedBranch('')}>Borrar Filtro de sedes</button>
                </div>
                
                <div className={`${styles.containerInformatives} `}>
                    <div className={`${styles.data} border rounded d-flex`}>
                        <h5 className={`${styles.dataTitle} m-0 text-primary`}>Ventas de hoy</h5>
                        <BsCart className={`${styles.dataIcon} text-success`} />
                        <div className={`${styles.containerDataIcon} d-flex`}>
                            <h6 className='m-0 text-success'>$ </h6>
                            <h5 className={`${styles.dataValue} m-0`}>{salesToday.toLocaleString()}</h5>
                        </div>
                    </div>

                    <div className={`${styles.data} border rounded d-flex`}>
                        <h5 className={`${styles.dataTitle} m-0 text-primary`}>Ventas de este mes</h5>
                        <BsCart className={`${styles.dataIcon} text-success`} />
                        <div className={`${styles.containerDataIcon} d-flex`}>
                            <h6 className='m-0 text-success'>$ </h6>
                            <h5 className={`${styles.dataValue} m-0`}>{salesThisMonth.toLocaleString()}</h5>
                        </div>
                    </div>
                    
                    <div className={`${styles.data} border rounded d-flex`}>
                        <h5 className={`${styles.dataTitle} m-0 text-primary`}>Ventas de este año</h5>
                        <BsCart className={`${styles.dataIcon} text-success`} />
                        <div className={`${styles.containerDataIcon} d-flex`}>
                            <h6 className='m-0 text-success'>$ </h6>
                            <h5 className={`${styles.dataValue} m-0`}>{salesThisYear.toLocaleString()}</h5>
                        </div>
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
                            placeholderText="Fecha inicial"
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
                            placeholderText="Fecha final"
                            className='p-1 border rounded'
                        />
                    </div>
                </div>

                <div className='d-flex align-items-center justify-content-center'>
                    <button className="m-2 btn btn-warning btn-sm" onClick={handleFilter}>Filtrar</button>
                    <button className="m-2 btn btn-secondary btn-sm" onClick={clearFilter}>Borrar Filtro</button>
                </div>

                <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl">
                    <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                        <Modal.Title>Detalles de tus ventas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalSalesPerPeriod />
                    </Modal.Body>
                </Modal>
            </div>

            <div className="d-flex">
                <button className={styles.buttonDetail} onClick={() => { setShowCancelModal(true) }} >Ver Detalles</button>
            </div>
        </div>
    );
}

export default SalesPerPeriod;
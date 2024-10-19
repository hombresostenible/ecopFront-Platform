/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { PDFDownloadLink } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getBestClientQuantity, getBestClientQuantityByBranch } from '../../../../../redux/User/10ReportsAndIndicators/finantialIndicators/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IBestClientQuantity } from "../../../../../types/User/financialIndicators.types";
import DownloadBestClientQuantity from './DownloadBestClientQuantity';
import ModalBestClientQuantity from './ModalBestClientQuantity';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import Uno from '../../../../../assets/Top-Uno.png';
import Dos from '../../../../../assets/Top-Dos.png';
import Tres from '../../../../../assets/Top-Tres.png';
import { PiExportBold } from "react-icons/pi";
import styles from './styles.module.css';

function BestClientQuantity() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const bestClientQuantity = useSelector((state: RootState) => state.finantialIndicators.bestClientQuantity);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [originalData, setOriginalData] = useState<IBestClientQuantity[] | null>(null);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        dispatch(getBranches(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (selectedBranch === 'Todas') {
            dispatch(getBestClientQuantity(token));
        } else {
            dispatch(getBestClientQuantityByBranch(selectedBranch, token));
        }
    }, [selectedBranch, dispatch, token]);

    useEffect(() => {
        if (bestClientQuantity && bestClientQuantity.length > 0) {
            setOriginalData(bestClientQuantity);
        }
    }, [bestClientQuantity]);

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
                'Id de cliente': item.transactionCounterpartId,
                'Tipo de Transacción': 'Venta',
            }));
            const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Mejor_Cliente_Frecuente');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Mejor_Cliente_Frecuente.xlsx';
            a.click();
            URL.revokeObjectURL(url);
        }
    }, [originalData, getBranchName]);

    function countedClients(data: IBestClientQuantity[]) {
        const countedClients: IBestClientQuantity[] = [];
        
        data.forEach(item => {
            const existingClient = countedClients.find(client => client.transactionCounterpartId === item.transactionCounterpartId);
            if (existingClient) {
                existingClient.count++;
            } else {
                countedClients.push({
                    id: item.id,
                    branchId: item.branchId,
                    transactionCounterpartId: item.transactionCounterpartId,
                    totalValue: item.totalValue,
                    transactionDate: item.transactionDate,
                    count: 1
                });
            }
        });
        countedClients.sort((a, b) => b.count - a.count);
        return countedClients;
    }

    const adjustTimeZone = (date: Date) => {
        date.setUTCHours(5, 0, 0, 0);
        return date;
    };

    const handleFilter = () => {
        if (selectedMonth && selectedYear) {
            const filterYear = parseInt(selectedYear);
            const filterMonth = parseInt(selectedMonth);
            const filterDate = new Date(filterYear, filterMonth - 1, 1);
            const nextMonthDate = new Date(filterDate);
            nextMonthDate.setMonth(nextMonthDate.getMonth() + 1, 0);

            const adjustedFilterDate = adjustTimeZone(filterDate);
            const adjustedNextMonthDate = adjustTimeZone(nextMonthDate);

            const filteredData = originalData?.filter(item => {
                const transactionDate = adjustTimeZone(new Date(item.transactionDate));
                return (
                    transactionDate >= adjustedFilterDate && transactionDate <= adjustedNextMonthDate
                );
            }); 
            // Actualizar consolidatedData directamente aquí
            setConsolidatedData(filteredData ? countedClients(filteredData) : null);
        }
    };

    //Setear toda la información consolidada de clientes con el acumulado de sus compras, se pasa por props a "ModalBestClientValue"
    const [consolidatedData, setConsolidatedData] = useState<IBestClientQuantity[] | null>(null);

    useEffect(() => {
        if (bestClientQuantity) {
            const valueClientsArray = countedClients(bestClientQuantity);
            setConsolidatedData(valueClientsArray);
        }
    }, [ bestClientQuantity ]);
        
    //Resetea tood para borras los filtros
    const resetFilter = () => {
        setSelectedMonth('');
        setSelectedYear('');
    };

    return (
        <div className={`${styles.container} m-2 p-3 chart-container border rounded d-flex flex-column align-items-center justify-content-center`} >
            <div className={styles.containerS}>
                <div className={`${styles.containerTitle} pt-2 pb-4 d-flex align-items-center justify-content-between`}>
                    <h2 className="text-primary-emphasis text-start">Cliente frecuente</h2>
                    <div className={styles.containerButtonExportT}>
                        {originalData && (
                            <PDFDownloadLink
                                document={<DownloadBestClientQuantity data={originalData} />}
                                fileName="Mejor_Cliente_Frecuente.pdf"
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
                
                <div className={`${styles.containerInfoBestClient}`}>
                    {bestClientQuantity ? (
                        countedClients(bestClientQuantity).map((countedItem, index) => (
                            <div key={index} className='mb-3 border rounded d-flex align-items-center justify-content-center'>
                                {index < 3 && (
                                    <div className="mr-2">
                                        {index === 0 && <img src={Uno} alt="1" style={{ width: '100px', height: '100px'}} />}
                                        {index === 1 && <img src={Dos} alt="2" style={{ width: '100px', height: '100px'}} />}
                                        {index === 2 && <img src={Tres} alt="3" style={{ width: '100px', height: '100px'}} />}
                                    </div>
                                )}
                                <div className={`${styles.infoBestClient} m-2`}>
                                    <h4 className="text-primary m-0">{index + 1} - {countedItem.transactionCounterpartId}</h4>
                                    <p className="m-0 text-secondary">Cantidad de compras: {formatNumber(countedItem.count)}</p>
                                    <p className="m-0 text-secondary">ID del cliente: {countedItem.transactionCounterpartId}</p>
                                    <p className="m-0 text-secondary">{getBranchName(countedItem.branchId)}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center">
                            <p>Los datos no están disponibles.</p>
                        </div>
                    )}
                </div>
                
                <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl">
                    <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                        <Modal.Title>Detalles de tus mejores clientes por cantidad</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalBestClientQuantity
                            consolidatedData={consolidatedData}
                        />
                    </Modal.Body>
                </Modal>
            </div>

            <div className="d-flex">
                <button className={styles.buttonDetail} onClick={() => { setShowCancelModal(true) }} >Ver Detalles</button>
            </div>
        </div>
    );
}

export default BestClientQuantity;
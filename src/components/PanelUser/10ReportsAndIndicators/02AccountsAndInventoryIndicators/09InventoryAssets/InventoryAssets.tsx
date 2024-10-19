/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { PDFDownloadLink } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getAssetsInventory, getAssetsInventoryByBranch } from '../../../../../redux/User/10ReportsAndIndicators/finantialIndicators/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../types/User/assets.types';
import DownloadInventoryAssets from './DownloadInventoryAssets';
import ModalInventoryAssets from './ModalInventoryAssets';
import { PiExportBold } from "react-icons/pi";
import styles from './styles.module.css';

function InventoryAssets() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const assetsInventory = useSelector((state: RootState) => state.finantialIndicators.assetsInventory);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [originalData, setOriginalData] = useState<IAssets[] | null>(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        dispatch(getBranches(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (selectedBranch === 'Todas') {
            dispatch(getAssetsInventory(token));
        } else {
            dispatch(getAssetsInventoryByBranch(selectedBranch, token));
        }
    }, [selectedBranch, dispatch, token]);

    useEffect(() => {
        if (assetsInventory && assetsInventory.length > 0) {
            setOriginalData(assetsInventory);
        }
    }, [assetsInventory]);

    const getBranchName = useCallback((branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    }, [branches]);

    const exportToExcel = useCallback(() => {
        if (originalData) {
            const dataForExcel = originalData.map(item => ({
                'Sede': getBranchName(item.branchId),
                'Nombre del activo': item.nameItem,
                'Marca del activo': item.brandItem,
                'Condición del activo': item.conditionAssets,
                'Estado del activo': item.stateAssets,
            }));
            const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventario_De_Activos');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Inventario_De_Activos.xlsx';
            a.click();
            URL.revokeObjectURL(url);
        }
    }, [originalData, getBranchName]);

    return (
        <div className={`${styles.container} m-2 p-3 chart-container border rounded d-flex flex-column align-items-center justify-content-center`} >
            <div className={styles.containerS}>
                <div className={`${styles.containerTitle} pt-2 pb-4 d-flex align-items-center justify-content-between`}>
                    <h2 className="text-primary-emphasis text-start">Inventario de activos</h2>
                    <div className={styles.containerButtonExportT}>
                        {originalData && (
                            <PDFDownloadLink
                                document={<DownloadInventoryAssets data={originalData} />}
                                fileName="Inventario_De_Activos.pdf"
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
                            <option value='Todas'>Todas las Sedes</option>
                            {Array.isArray(branches) && branches.map((branch, index) => (
                                <option key={index} value={branch.id}>
                                    {branch.nameBranch}
                                </option>
                            ))}
                        </select>
                        <button className="m-2 p-3 chart-container border rounded" onClick={() => setSelectedBranch('Todas')}>Borrar Filtro de sedes</button>
                    </div>
                </div>

                <div className='mt-3 text-center'>
                    <div className="col-12 text-center">
                        {assetsInventory && assetsInventory.length > 0 ? (
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th className="text-center align-middle">Sede</th>
                                        <th className="text-center align-middle">Nombre del activo</th>
                                        <th className="text-center align-middle">Condición del activo</th>
                                        {/* <th className="text-center align-middle">Estado del activo</th> */}
                                        <th className="text-center align-middle">Ver gráfica</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assetsInventory.map((asset: IAssets) => (
                                        <tr key={asset.id}>
                                            <td>{getBranchName(asset.branchId)}</td>
                                            <td>{asset.nameItem}</td>
                                            <td>{asset.conditionAssets}</td>
                                            {/* <td>{asset.stateAssets}</td> */}
                                            <td>
                                                <button
                                                    className='border'
                                                    onClick={() => setShowCancelModal(true)}
                                                >
                                                    Ver Gráfica
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center">
                                <p>Los datos de inventario no están disponibles</p>
                            </div>
                        )}
                    </div>
                </div>

                <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>Detalle del inventario de tus activos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalInventoryAssets assetsInventory={assetsInventory} />
                    </Modal.Body>
                </Modal>
            </div>

            <div className="d-flex">
                <button className={styles.buttonDetail} onClick={() => setShowCancelModal(true)}>Ver Detalles</button>
            </div>
        </div>
    );
}

export default InventoryAssets;
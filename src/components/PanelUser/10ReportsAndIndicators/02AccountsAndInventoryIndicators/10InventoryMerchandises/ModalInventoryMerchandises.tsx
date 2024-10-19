/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IMerchandise } from '../../../../../types/UserPanel/03Inventories/merchandise.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface ModalInventoryMerchandiseProps {
    merchandisesInventory: IMerchandise[] | null;
}

function ModalInventoryMerchandises ({ merchandisesInventory }: ModalInventoryMerchandiseProps) {
    const token = jsCookie.get('token') || '';
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const branches = useSelector((state: RootState) => state.branch.branch);

    // ESTADO LOCAL PARA EL FILTRO
    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [filteredRegisters, setFilteredRegisters] = useState(merchandisesInventory);

    useEffect(() => {
        dispatch(getBranches(token));
    }, [ selectedBranch ]);

    useEffect(() => {
        if (Array.isArray(merchandisesInventory)) {
            if (selectedBranch === 'Todas') {
                setFilteredRegisters(merchandisesInventory);
            } else {
                setFilteredRegisters(merchandisesInventory.filter((sale) => sale.branchId === selectedBranch));
            }
        } else setFilteredRegisters([]);
    }, [selectedBranch, merchandisesInventory]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };

    return (
        <div className="p-3 text-center m-auto border">
            <h2 className="mb-3 text-primary-emphasis text-start">Inventario de Mercancías</h2>
  
            <div className="d-flex justify-content-between">
                <select
                    className={`${styles.input} p-3 border rounded`}
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
                <button className="p-3 chart-container border rounded" onClick={() => setSelectedBranch('Todas')}>Borrar Filtro de sedes</button>
            </div>

            <div className="mt-4 col-12">  
                {filteredRegisters && filteredRegisters.length > 0 ? (
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Sede</th>
                                <th>Nombre de la mercancía</th>
                                <th>Inventario</th>                                
                                <th>Unidades vendidas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRegisters.map((merchandiseInventory, index) => (
                                <tr key={merchandiseInventory.id || index}>
                                    <td>
                                        {getBranchName(merchandiseInventory.branchId)}
                                    </td>
                                    <td>
                                        {merchandiseInventory.nameItem ? (merchandiseInventory.nameItem) : 'N/A'}
                                    </td>
                                    <td>
                                        {merchandiseInventory.inventory? formatNumber(merchandiseInventory.inventory) : 'N/A'}
                                    </td>
                                    <td>
                                        {merchandiseInventory.salesCount? formatNumber(merchandiseInventory.salesCount) : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">
                        <p>Los datos no están disponibles.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalInventoryMerchandises;
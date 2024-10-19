/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IRawMaterial } from '../../../../../types/UserPanel/03Inventories/rawMaterial.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface ModalInventoryRawMaterialProps {
    rawMaterialsInventory: IRawMaterial[] | null;
}

function ModalInventoryRawMaterials ({ rawMaterialsInventory }: ModalInventoryRawMaterialProps) {
    const token = jsCookie.get('token') || '';
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const branches = useSelector((state: RootState) => state.branch.branch);

    // ESTADO LOCAL PARA EL FILTRO
    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [filteredRegisters, setFilteredRegisters] = useState(rawMaterialsInventory);

    useEffect(() => {
        dispatch(getBranches(token));
    }, [ selectedBranch, rawMaterialsInventory ]);

    useEffect(() => {
        if (Array.isArray(rawMaterialsInventory)) {
            if (selectedBranch === 'Todas') {
                setFilteredRegisters(rawMaterialsInventory);
            } else {
                setFilteredRegisters(rawMaterialsInventory.filter((sale) => sale.branchId === selectedBranch));
            }
        } else setFilteredRegisters([]);
    }, [selectedBranch, rawMaterialsInventory]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };

    return (
        <div className="p-3 text-center m-auto border">
            <h2 className="mb-3 text-primary-emphasis text-start">Inventario de materias primas</h2>

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
                                <th>Nombre de la materia prima</th>
                                <th>Inventario</th>                                
                                <th>Unidades vendidas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRegisters.map((rawMaterialInventory, index) => (
                                <tr key={rawMaterialInventory.id || index}>
                                    <td>
                                        {getBranchName(rawMaterialInventory.branchId)}
                                    </td>
                                    <td>
                                        {rawMaterialInventory.nameItem ? (rawMaterialInventory.nameItem) : 'N/A'}
                                    </td>
                                    <td>
                                        {rawMaterialInventory.inventory? formatNumber(rawMaterialInventory.inventory) : 'N/A'}
                                    </td>
                                    <td>
                                        {rawMaterialInventory.salesCount? formatNumber(rawMaterialInventory.salesCount) : 'N/A'}
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

export default ModalInventoryRawMaterials;
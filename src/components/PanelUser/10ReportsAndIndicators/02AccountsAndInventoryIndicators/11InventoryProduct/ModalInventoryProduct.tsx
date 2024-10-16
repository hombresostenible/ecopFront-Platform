/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../../../types/User/products.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface ModalInventoryProductProps {
    productsInventory: IProduct[] | null;
}

function ModalInventoryProduct ({ productsInventory }: ModalInventoryProductProps) {
    const token = jsCookie.get('token') || '';
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const branches = useSelector((state: RootState) => state.branch.branch);

    // ESTADO LOCAL PARA EL FILTRO
    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [filteredRegisters, setFilteredRegisters] = useState(productsInventory);

    useEffect(() => {
        dispatch(getBranches(token));
    }, [ selectedBranch ]);

    useEffect(() => {
        if (Array.isArray(productsInventory)) {
            if (selectedBranch === 'Todas') {
                setFilteredRegisters(productsInventory);
            } else {
                setFilteredRegisters(productsInventory.filter((sale) => sale.branchId === selectedBranch));
            }
        } else setFilteredRegisters([]);
    }, [selectedBranch, productsInventory]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };

    return (
        <div className="p-3 text-center m-auto border">
            <h2 className="mb-3 text-primary-emphasis text-start">Inventario de productos</h2>

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
                                <th>Nombre del producto</th>
                                <th>Inventario</th>                                
                                <th>Unidades vendidas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRegisters.map((productInventory, index) => (
                                <tr key={productInventory.id || index}>
                                    <td>
                                        {getBranchName(productInventory.branchId)}
                                    </td>
                                    <td>
                                        {productInventory.nameItem ? (productInventory.nameItem) : 'N/A'}
                                    </td>
                                    <td>
                                        {productInventory.inventory? formatNumber(productInventory.inventory) : 'N/A'}
                                    </td>
                                    <td>
                                        {productInventory.salesCount? formatNumber(productInventory.salesCount) : 'N/A'}
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

export default ModalInventoryProduct;
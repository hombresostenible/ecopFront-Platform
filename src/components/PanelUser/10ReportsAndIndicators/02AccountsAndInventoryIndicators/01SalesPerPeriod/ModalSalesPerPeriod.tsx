/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getSalesPerPeriod } from '../../../../../redux/User/indicator/finantialIndicators/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

function ModalSalesPerPeriod() {
    const token = jsCookie.get('token') || '';
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const salesPerPeriod = useSelector((state: RootState) => state.finantialIndicators.salesPerPeriod);
    const branches = useSelector((state: RootState) => state.branch.branch);

    // ESTADO LOCAL PARA EL FILTRO
    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [filteredRegisters, setFilteredRegisters] = useState(salesPerPeriod);

    useEffect(() => {
        dispatch(getBranches(token));
        dispatch(getSalesPerPeriod(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (selectedBranch === 'Todas') {
            setFilteredRegisters(salesPerPeriod);
        } else {
            setFilteredRegisters(salesPerPeriod.filter((sale: { branchId: string; }) => sale.branchId === selectedBranch));
        }
    }, [selectedBranch, salesPerPeriod]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };

    return (
        <div className="p-3 text-center m-auto border">
            <h2 className="mb-3 text-primary-emphasis text-start">Ventas del período</h2>

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
                                <th>Fecha de transacción</th>
                                <th>Sede</th>
                                <th>Concepto de ingreso</th>
                                <th>Nombre del artículo</th>
                                <th>Valor unitario</th>
                                <th>Cantidad</th>
                                <th>Valor total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRegisters.map((salePerPeriod: { id: any; transactionDate: string | number | Date; branchId: string; incomeCategory: any; nameItem: any; unitValue: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; quantity: number | undefined; totalValue: number | undefined; }, index: any) => (
                                <tr key={salePerPeriod.id || index}>
                                    <td>
                                        {new Date(salePerPeriod.transactionDate).toLocaleDateString('en-GB')}
                                    </td>
                                    <td>
                                        {getBranchName(salePerPeriod.branchId)}
                                    </td>
                                    <td>
                                        {salePerPeriod.incomeCategory || 'N/A'}
                                    </td>
                                    <td>
                                        {salePerPeriod.nameItem || 'N/A'}
                                    </td>
                                    <td className='text-end'>
                                        $ {salePerPeriod.unitValue}
                                    </td>
                                    <td>
                                        {salePerPeriod.quantity ? formatNumber(salePerPeriod.quantity) : 'N/A'}
                                    </td>
                                    <td className='text-end'>
                                        $ {salePerPeriod.totalValue !== undefined ? formatNumber(salePerPeriod.totalValue) : 'N/A'}
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

export default ModalSalesPerPeriod;
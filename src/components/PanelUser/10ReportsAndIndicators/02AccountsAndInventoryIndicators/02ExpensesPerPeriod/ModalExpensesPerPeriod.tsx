/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getExpensesPerPeriod } from '../../../../../redux/User/indicator/finantialIndicators/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

function ModalExpensesPerPeriod () {
    const token = jsCookie.get('token') || '';
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const expensesPerPeriod = useSelector((state: RootState) => state.finantialIndicators.expensesPerPeriod);
    const branches = useSelector((state: RootState) => state.branch.branch);
    
    // ESTADO LOCAL PARA EL FILTRO
    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [filteredRegisters, setFilteredRegisters] = useState(expensesPerPeriod);

    useEffect(() => {
        dispatch(getBranches(token));
        dispatch(getExpensesPerPeriod(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (selectedBranch === 'Todas') {
            setFilteredRegisters(expensesPerPeriod);
        } else {
            setFilteredRegisters(expensesPerPeriod.filter((sale: { branchId: string; }) => sale.branchId === selectedBranch));
        }
    }, [selectedBranch, expensesPerPeriod]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };

    return (
        <div className="p-3 text-center m-auto border">
            <h2 className="mb-3 text-primary-emphasis text-start">Gastos del período</h2>
            
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
                                <th>Concepto de egreso</th>
                                <th>Nombre del artículo</th>
                                <th>Valor unitario</th>
                                <th>Cantidad</th>
                                <th>Valor total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRegisters.map((expensePerPeriod: { id: any; transactionDate: string | number | Date; branchId: string; typeExpenses: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; nameItem: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; unitValue: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; quantity: number; totalValue: number | undefined; }, index: any) => (
                                <tr key={expensePerPeriod.id || index}>
                                    <td>
                                        {new Date(expensePerPeriod.transactionDate).toLocaleDateString('en-GB')}
                                    </td>
                                    <td>
                                        {getBranchName(expensePerPeriod.branchId)}
                                    </td>
                                    <td>
                                        {expensePerPeriod.typeExpenses? (expensePerPeriod.typeExpenses) : 'N/A'}
                                    </td>
                                    <td>
                                        {expensePerPeriod.nameItem ? (expensePerPeriod.nameItem) : 'N/A'}
                                    </td>
                                    <td className='text-end'>
                                        $ {expensePerPeriod.unitValue}
                                    </td>
                                    <td>
                                        $ {expensePerPeriod.quantity? formatNumber(expensePerPeriod.quantity) : 'N/A'}
                                    </td>
                                    <td className='text-end'>
                                        $ {expensePerPeriod.totalValue !== undefined ? formatNumber(expensePerPeriod.totalValue) : 'N/A'}
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

export default ModalExpensesPerPeriod

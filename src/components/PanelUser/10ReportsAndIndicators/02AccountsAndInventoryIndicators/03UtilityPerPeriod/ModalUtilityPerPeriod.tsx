/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any  */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getAllTransactionsPerPeriod } from '../../../../../redux/User/10ReportsAndIndicators/finantialIndicators/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from '../../../../../types/User/accountsBook.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

function ModalUtilityPerPeriod () {
    const token = jsCookie.get('token') || '';
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const allTransactionsPerPeriod = useSelector((state: RootState) => state.finantialIndicators.allTransactionsPerPeriod);
    const branches = useSelector((state: RootState) => state.branch.branch);

    // ESTADO LOCAL PARA EL FILTRO
    const [selectedBranch, setSelectedBranch] = useState('Todas');
    const [filteredRegisters, setFilteredRegisters] = useState(allTransactionsPerPeriod);

    useEffect(() => {
        dispatch(getBranches(token));
        dispatch(getAllTransactionsPerPeriod(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (selectedBranch === 'Todas') {
            setFilteredRegisters(allTransactionsPerPeriod);
        } else {
            setFilteredRegisters(allTransactionsPerPeriod.filter((sale: { branchId: string; }) => sale.branchId === selectedBranch));
        }
    }, [selectedBranch, allTransactionsPerPeriod]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };
    
    // Función para agrupar transacciones por fecha y sede
    const groupTransactionsByDateAndBranch = (): Map<string, IAccountsBook[]> => {
        const groupedTransactions = new Map<string, IAccountsBook[]>();
    
        if (filteredRegisters) {
            filteredRegisters.forEach((transaction: IAccountsBook) => {
                const date = new Date(transaction.transactionDate);
                const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                const key = `${formattedDate}_${transaction.branchId}`;
    
                if (!groupedTransactions.has(key)) groupedTransactions.set(key, []);
                groupedTransactions.get(key)?.push(transaction);
            });
        }
        return groupedTransactions;
    };
    
    // Función para calcular la utilidad del día
    const calculateDailyUtility = (transactions: IAccountsBook[]): number => {
        const income = transactions.filter(t => t.transactionType === 'Ingreso').reduce((sum, t) => sum + t.totalValue, 0);
        const expenses = transactions.filter(t => t.transactionType === 'Gasto').reduce((sum, t) => sum + t.totalValue, 0);
        return income - expenses;
    };

    return (
        <div className="p-3 text-center m-auto border">
            <h2 className="mb-3 text-primary-emphasis text-start">Utilidad del período</h2>

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
                                <th>Fecha</th>
                                <th>Sede</th>
                                <th>Total ingreso del día</th>
                                <th>Total egreso del día</th>
                                <th>Utilidad del día</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(groupTransactionsByDateAndBranch()).map(([key, transactions], index) => {
                                const [date, branchId] = key.split('_');
                                const branchName = getBranchName(branchId);

                                return (
                                    <tr key={index}>
                                        <td>{new Date(date).toLocaleDateString('en-GB')}</td>
                                        <td>{branchName}</td>
                                        <td className='text-end'>${formatNumber(transactions.filter(t => t.transactionType === 'Ingreso').reduce((sum, t) => sum + t.totalValue, 0))}</td>
                                        <td className='text-end'>${formatNumber(transactions.filter(t => t.transactionType === 'Gasto').reduce((sum, t) => sum + t.totalValue, 0))}</td>
                                        <td className='text-end'>${formatNumber(calculateDailyUtility(transactions))}</td>
                                    </tr>
                                );
                            })}
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

export default ModalUtilityPerPeriod;
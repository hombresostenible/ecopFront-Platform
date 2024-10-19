/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any  */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getAccountsPayable } from '../../../../../redux/User/10ReportsAndIndicators/finantialIndicators/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsPayable } from '../../../../../types/UserPanel/10ReportsAndIndicators/finantialIndicators/accountsPayable.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

function ModaAccountsPayable() {
    const token = jsCookie.get('token') || '';
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const accountsPayable = useSelector((state: RootState) => state.finantialIndicators.accountsPayable);
    const branches = useSelector((state: RootState) => state.branch.branch);

    // ESTADO LOCAL PARA EL FILTRO
    const [selectedBranch, setSelectedBranch] = useState('Todas');   
    const [filteredRegisters, setFilteredRegisters] = useState(accountsPayable); 

    useEffect(() => {
        dispatch(getBranches(token));
        dispatch(getAccountsPayable(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (Array.isArray(accountsPayable)) {
            if (selectedBranch === 'Todas') {
                setFilteredRegisters(accountsPayable);
            } else {
                setFilteredRegisters(accountsPayable.filter((sale) => sale.branchId === selectedBranch));
            }
        } else setFilteredRegisters([]);
    }, [selectedBranch, accountsPayable]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };




    return (
        <div className="p-3 text-center m-auto border">
            <h2 className="mb-3 text-primary-emphasis text-start">Cuentas por pagar</h2>

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

            <div className="mt-4 col-12 text-center">    
                {Array.isArray(filteredRegisters) && filteredRegisters.length > 0 ? (
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className="text-center align-middle">Fecha</th>
                                <th className="text-center align-middle">Sede</th>
                                <th className="text-center align-middle">Descripción</th>
                                <th className="text-center align-middle">Estado</th>
                                <th className="text-center align-middle">Valor inicial</th>
                                <th className="text-center align-middle">Valor actual</th>
                                <th className="text-center align-middle">Número de cuotas</th>
                                <th className="text-center align-middle">Valor de la cuota</th>
                                <th className="text-center align-middle">Número de cuota pendiente</th>
                                <th className="text-center align-middle">A quién le debo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRegisters.map((account: IAccountsPayable) => (
                                <tr key={account.id}>
                                    <td>
                                        {new Date(account.transactionDate).toLocaleDateString('en-GB')}
                                    </td>
                                    <td>
                                        {getBranchName(account.branchId)}
                                    </td>
                                    <td>
                                        {account.creditDescription}
                                    </td>
                                    <td>
                                        {account.stateAccount || 'N/A'}
                                    </td>
                                    <td>
                                        $ {account.initialValue ? formatNumber(account.initialValue) : 'N/A'}
                                    </td>
                                    <td>
                                        $ {account.currentBalance ? formatNumber(account.currentBalance) : 'N/A'}
                                    </td>
                                    <td>
                                        {account.initialNumberOfPayments || 'N/A'}
                                    </td>
                                    <td>
                                        $ {account.paymentValue ? formatNumber(account.paymentValue) : 'N/A'}
                                    </td>
                                    <td>
                                        {account.pendingNumberOfPayments || 'N/A'}
                                    </td>
                                    <td>
                                        {account.transactionCounterpartId}
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

export default ModaAccountsPayable;
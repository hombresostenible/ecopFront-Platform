/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IBestClientValue } from "../../../../../types/UserPanel/10ReportsAndIndicators/finantialIndicators/financialIndicators.types";
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface ModalBestClientValueProps {
    consolidatedData: IBestClientValue[] | null;
}

function ModalBestClientValue ({ consolidatedData }: ModalBestClientValueProps) {
    const token = jsCookie.get('token') || '';

    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas');

    useEffect(() => {
        dispatch(getBranches(token));
    }, [ selectedBranch, consolidatedData ]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };

    return (
        <div className="p-3 text-center m-auto border">
            <h2 className="mb-3 text-primary-emphasis text-start">Mejor cliente por valor</h2>

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


            <div className="mt-4">    
                {consolidatedData && consolidatedData.length > 0 ? (
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Puesto</th>
                                <th>Sede</th>
                                <th>Cliente</th>
                                <th>Valor total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consolidatedData.map((data, index) => (
                                <tr key={data.id || index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {getBranchName(data.branchId)}
                                    </td>
                                    <td>
                                        {data.transactionCounterpartId ? (data.transactionCounterpartId) : 'N/A'}
                                    </td>
                                    <td className='text-end'>
                                        $ {data.value ? formatNumber(data.value) : 'N/A'}
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

export default ModalBestClientValue;
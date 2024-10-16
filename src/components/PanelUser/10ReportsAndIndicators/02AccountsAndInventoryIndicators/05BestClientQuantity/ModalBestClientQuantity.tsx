/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';

import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IBestClientQuantity } from "../../../../../types/User/financialIndicators.types";
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';

interface ModalBestClientQuantityProps {
    consolidatedData: IBestClientQuantity[] | null;
}

function ModalBestClientQuantity ({ consolidatedData }: ModalBestClientQuantityProps) {
    const token = jsCookie.get('token') || '';
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
            <div className="pt-3 pb-3 d-flex align-items-center justify-content-between">
                <h2 className="m-0 text-primary-emphasis text-start">Mejor cliente por cantidad</h2>
            </div>

            <div className="border">
                <div className="d-flex justify-content-between">
                    <select
                        className="border-0 p-3"
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
                    <button className="m-2 p-3 chart-container border rounded" onClick={() => setSelectedBranch('')}>Borrar Filtro de sedes</button>
                </div>
            </div>

            <div className="mt-4">
                {consolidatedData && consolidatedData.length > 0 ? (
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Puesto</th>
                                <th>Sede</th>
                                <th>Cliente</th>
                                <th>Cantidad total de compras</th>
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
                                    <td>
                                        {data.count ? formatNumber(data.count) : 'N/A'}
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

export default ModalBestClientQuantity;
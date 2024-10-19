/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any  */
import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getAverageTicketPerPeriod, getAverageTicketPerPeriodByBranch } from '../../../../../redux/User/10ReportsAndIndicators/finantialIndicators/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';

function ModalAverageTicket () {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const averageTicketPerPeriod = useSelector((state: RootState) => state.finantialIndicators.averageTicketPerPeriod);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState('Todas');

    useEffect(() => {
        dispatch(getBranches(token));
        if (selectedBranch === 'Todas') {
            dispatch(getAverageTicketPerPeriod(token));
        } else {
            dispatch(getAverageTicketPerPeriodByBranch(selectedBranch, token));
        }
    }, [selectedBranch, dispatch, token]);

    const getBranchName = (branchId: string) => {
        if (!Array.isArray(branches)) return "Sede no encontrada";
        const branch = branches.find((b: { id: string }) => b.id === branchId);
        return branch ? branch.nameBranch : "Sede no encontrada";
    };
        
    const calculateDailyAverages = () => {
        if (!averageTicketPerPeriod) return null;    
        const dailyTotals: { [date: string]: { sum: number; count: number } } = {};    
        averageTicketPerPeriod.forEach((record: { transactionType: string; transactionDate: string | number | Date; totalValue: number; }) => {
            if (record.transactionType === 'Ingreso') {
                const transactionDate = new Date(record.transactionDate).toLocaleDateString();
                const totalValue = record.totalValue || 0;
        
                if (!dailyTotals[transactionDate]) {
                    dailyTotals[transactionDate] = { sum: 0, count: 0 };
                }
        
                dailyTotals[transactionDate].sum += totalValue;
                dailyTotals[transactionDate].count += 1;
            }
        });
        const dailyAverages = Object.keys(dailyTotals).map((date) => {
            const { sum, count } = dailyTotals[date];
            return { date, accumulatedValue: sum, accumulatedQuantity: count, average: sum / count };
        });
        return dailyAverages;
    };

    return (
        <div className="p-3 text-center m-auto border">
            <div className="pt-3 pb-3 d-flex align-items-center justify-content-between">
                <h2 className="m-0 text-primary-emphasis text-start">Ticket promedio</h2>
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
                <div className="col-12">    
                    {averageTicketPerPeriod && averageTicketPerPeriod.length > 0 ? (
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Sede</th>
                                    <th>Valor acumulado de ventas</th>
                                    <th>Cantidad acumulada de ventas</th>                                    
                                    <th>Ticket promedio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calculateDailyAverages()?.map((dailyAverage) => (
                                    <tr key={dailyAverage.date}>
                                        <td>{dailyAverage.date}</td>
                                        <td>{getBranchName(selectedBranch)}</td>
                                        <td className='text-end'>${dailyAverage.accumulatedValue? formatNumber(dailyAverage.accumulatedValue) : 'N/A'}</td>
                                        <td>{dailyAverage.accumulatedQuantity? formatNumber(dailyAverage.accumulatedQuantity) : 'N/A'}</td>
                                        <td className='text-end'>${dailyAverage.average? formatNumber(dailyAverage.average) : 'N/A'}</td>
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
        </div>
    );
}

export default ModalAverageTicket;
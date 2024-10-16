/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { IRawMaterial } from '../../../../../types/User/rawMaterial.types';

interface ModalInventoryRawMaterialProps {
    selectedRawMaterial: IRawMaterial | null;
}

function ModalGraphicInventoryRawMaterial ({ selectedRawMaterial }: ModalInventoryRawMaterialProps) {
    const chartContainer = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    
    const [ consolidatedInventory, setConsolidatedInventory ] = useState<{
        [x: string]: any; date: Date; quantity: number 
    }[]>([]);
    
    useEffect(() => {
        if (selectedRawMaterial) {
            renderChart(selectedRawMaterial.inventoryChanges || []);

            // Consolidar los datos por día para la tabla
            const consolidatedData: { [date: string]: { ingresos: number, salidas: number, quantity: number } } = {};
    
            selectedRawMaterial.inventoryChanges?.forEach(entry => {
                const entryDate = new Date(entry.date).toISOString().split('T')[0];
    
                if (!consolidatedData[entryDate]) {
                    consolidatedData[entryDate] = { ingresos: 0, salidas: 0, quantity: 0 };
                }
    
                if (entry.type === 'Ingreso') {
                    consolidatedData[entryDate].ingresos += entry.quantity;
                } else if (entry.type === 'Salida') {
                    consolidatedData[entryDate].salidas += entry.quantity;
                }
            });
    
            // Calcular los valores acumulativos después de procesar todas las entradas y salidas de cada día
            let cumulativeQuantity = 0;
            const consolidatedArray = Object.keys(consolidatedData).map(date => {
                cumulativeQuantity += consolidatedData[date].ingresos + consolidatedData[date].salidas;
                return {
                    date: new Date(date),
                    ...consolidatedData[date],
                    quantity: cumulativeQuantity,
                };
            });
    
            // Ordenar los datos consolidados por fecha en orden ascendente
            consolidatedArray.sort((a, b) => a.date.getTime() - b.date.getTime());
            setConsolidatedInventory(consolidatedArray.reverse());
        }
    }, [ selectedRawMaterial ]);
    
    const renderChart = (data: { date: string; quantity: number }[]) => {
        if (chartContainer.current) {
            if (chartInstance.current) chartInstance.current.destroy();
    
            const ctx = chartContainer.current.getContext('2d');
            if (ctx) {
                // Agrupar los registros por día antes de consolidar
                const groupedData: { [date: string]: number } = {};
    
                data.forEach(entry => {
                    const entryDate = new Date(entry.date).toISOString().split('T')[0];
                    if (groupedData[entryDate]) {
                        groupedData[entryDate] += entry.quantity;
                    } else {
                        groupedData[entryDate] = entry.quantity;
                    }
                });

                // Convertir los datos agrupados en un array de objetos
                const consolidatedData = Object.keys(groupedData).map(date => ({
                    date: new Date(date),
                    quantity: groupedData[date],
                }));
    
                // Ordenar los datos consolidados por fecha
                consolidatedData.sort((a, b) => a.date.getTime() - b.date.getTime());
    
                // Calcular los valores acumulativos
                let cumulativeQuantity = 0;
                const cumulativeData = consolidatedData.map(entry => {
                    cumulativeQuantity += entry.quantity;
                    return {
                        date: entry.date.toISOString(),
                        quantity: cumulativeQuantity,
                    };
                });
    
                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: cumulativeData.map(entry => entry.date),
                        datasets: [
                            {
                                label: 'Inventario',
                                data: cumulativeData.map(entry => entry.quantity),
                                fill: false,
                                borderColor: '#c1121f',
                                borderWidth: 2,
                                pointBackgroundColor: 'rgba(217, 4, 41, 1)',
                                pointRadius: 4,
                                pointHoverRadius: 6,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'day',
                                    displayFormats: {
                                        day: 'MMM d',
                                    },
                                },
                                title: {
                                    display: true,
                                    text: 'Fecha',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Inventario',
                                },
                            },
                        },
                    },
                });
            }
        }
    };
    
    // const toggleRow = (index: number, date: Date) => {
    //     setExpandedRows((prevRows) => {
    //         if (prevRows.includes(index)) {
    //             return prevRows.filter((row) => row !== index);
    //         } else {
    //             setExpandedDate(date);
    //             return [...prevRows, index];
    //         }
    //     });
    // };

    function formatNumberWithCommas(number: number): string {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    

    return (
        <div className="m-2 p-3 text-center m-auto">
            <h2 className="text-primary-emphasis text-start">Trazabilidad del inventario</h2>
            <div><canvas ref={chartContainer} /></div>
            <div className="mt-4">
                <h2 className="text-primary-emphasis text-start mb-4">Saldos diarios de tu materia prima</h2>
                {selectedRawMaterial ? (
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className='align-middle'>Fecha</th>
                                <th className='align-middle'>Ingresos de inventario</th>
                                <th className='align-middle'>Salidas de inventario</th>
                                <th className='align-middle'>Inventario al cierre del día</th>
                                {/* <th className='align-middle'>Resumen</th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {consolidatedInventory.map((entry, index) => (
                                <React.Fragment key={index}>
                                    {/* <tr className={expandedRows.includes(index) ? 'expanded' : ''}> */}
                                    <tr>
                                        <td>
                                            {entry.date.toLocaleDateString('en-GB')}
                                        </td>
                                        <td>
                                            {entry.ingresos ? formatNumberWithCommas(entry.ingresos) : 'N/A'}
                                        </td>
                                        <td>
                                            {entry.salidas ? formatNumberWithCommas(entry.salidas) : 'N/A'}
                                        </td>
                                        <td>
                                            {entry.quantity ? formatNumberWithCommas(entry.quantity) : 'N/A'}
                                        </td>
                                        {/* <td>
                                            <button type="button" className="btn btn-link" onClick={() => toggleRow(index, entry.date)}>
                                                {expandedRows.includes(index) ? <FaAngleUp /> : <FaAngleDown />}
                                            </button>
                                        </td> */}
                                    </tr>
                                    {/* {expandedRows.includes(index) && (
                                        <>
                                            {selectedRawMaterial?.inventoryChanges
                                                ?.filter(entry => new Date(entry.date).toISOString().split('T')[0] === expandedDate?.toISOString().split('T')[0])
                                                .map((entry, recordIndex) => (
                                                    <tr key={recordIndex}>
                                                        <td>{new Date(entry.date).toLocaleDateString('en-GB')}</td>
                                                        <td>{entry.type === 'Ingreso' ? formatNumberWithCommas(entry.quantity) : 'N/A'}</td>
                                                        <td>{entry.type === 'Salida' ? formatNumberWithCommas(entry.quantity) : 'N/A'}</td>
                                                        <td>Calcular el inventario al cierre de cada registro</td>
                                                    </tr>
                                                ))}
                                        </>
                                    )} */}
                                </React.Fragment>
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

export default ModalGraphicInventoryRawMaterial;
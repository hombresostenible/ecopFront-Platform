/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { IProduct } from '../../../../../types/UserPanel/03Inventories/products.types';

interface ModalInventoryProductProps {
    selectedProduct: IProduct | null;
}

function ModalGraphicInventoryProduct ({ selectedProduct }: ModalInventoryProductProps) {   
    const chartContainer = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    
    const [consolidatedInventory, setConsolidatedInventory] = useState<{
        [x: string]: any; date: Date; quantity: number 
    }[]>([]);

    useEffect(() => {
        if (selectedProduct) {
            // Renderiza el gráfico solo si hay cambios en los datos
            renderChart(selectedProduct.inventoryChanges || []);
            
            // Consolidar los datos por día para la tabla
            const consolidatedData = consolidateInventoryData(selectedProduct.inventoryChanges || []);
            setConsolidatedInventory(consolidatedData);
        }
    }, [selectedProduct]);

    const consolidateInventoryData = (inventoryChanges: { date: string; type: string; quantity: number }[]) => {
        const consolidatedData: { [date: string]: { ingresos: number, salidas: number, quantity: number } } = {};
        
        inventoryChanges.forEach(entry => {
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

        let cumulativeQuantity = 0;
        return Object.keys(consolidatedData).map(date => {
            cumulativeQuantity += consolidatedData[date].ingresos + consolidatedData[date].salidas;
            return {
                date: new Date(date),
                ...consolidatedData[date],
                quantity: cumulativeQuantity,
            };
        });
    };

    const renderChart = (data: { date: string; quantity: number }[]) => {
        if (chartContainer.current) {
            if (chartInstance.current) chartInstance.current.destroy();

            const ctx = chartContainer.current.getContext('2d');
            if (ctx) {
                // Agrupar los registros por día
                const groupedData: { [date: string]: number } = {};
                data.forEach(entry => {
                    const entryDate = new Date(entry.date).toISOString().split('T')[0];
                    groupedData[entryDate] = (groupedData[entryDate] || 0) + entry.quantity;
                });

                // Convertir los datos agrupados en un array
                const consolidatedData = Object.keys(groupedData).map(date => ({
                    date: new Date(date),
                    quantity: groupedData[date],
                }));

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

    function formatNumberWithCommas(number: number): string {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return (
        <div className="m-2 p-3 text-center m-auto">
            <h2 className="text-primary-emphasis text-start">Trazabilidad del inventario de productos</h2>
            <div><canvas ref={chartContainer} /></div>
            <div className="mt-4">
                <h2 className="text-primary-emphasis text-start mb-4">Saldos diarios de tu producto</h2>
                {selectedProduct ? (
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className='align-middle'>Fecha</th>
                                <th className='align-middle'>Ingresos de inventario</th>
                                <th className='align-middle'>Salidas de inventario</th>
                                <th className='align-middle'>Inventario al cierre del día</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consolidatedInventory.map((entry, index) => (
                                <tr key={index}>
                                    <td>{entry.date.toLocaleDateString('en-GB')}</td>
                                    <td>{entry.ingresos ? formatNumberWithCommas(entry.ingresos) : '0'}</td>
                                    <td>{entry.salidas ? formatNumberWithCommas(entry.salidas) : '0'}</td>
                                    <td>{entry.quantity ? formatNumberWithCommas(entry.quantity) : '0'}</td>
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

export default ModalGraphicInventoryProduct;
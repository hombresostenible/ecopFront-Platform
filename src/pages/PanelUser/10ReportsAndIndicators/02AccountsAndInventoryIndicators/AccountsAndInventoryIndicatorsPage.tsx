import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

function AccountsAndInventoryIndicatorsPage() {
    const [ selectedItems, setSelectedItems ] = useState<string[]>([]);

    const navigate = useNavigate();

    const toggleSelect = (item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([ ...selectedItems, item ]);
        }
    };

    const handleCalculate = () => {
        navigate('/reports-and-indicators/accounts-and-inventory-indicators/calculate-financial-items', { state: { selectedItems } });
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className="px-5 overflow-hidden overflow-y-auto">
                        <h1 className={`${styles.title} mb-4 mt-4`}>Elige el indicador de cuentas e inventarios que quieres calcular</h1>

                        <div className={`${styles.container__Cards_Indicators} m-auto d-flex flex-wrap align-items-center justify-content-center gap-4`}>
                            <div className={`${styles.indicator} ${selectedItems.includes('Ventas') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('Ventas')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('Ventas')}>
                                    <div className={`${selectedItems.includes('Ventas') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Ventas del período</h5>
                                        <p className='m-0 text-center'>Este indicador te calcula las ventas del negocio por períodos</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('Ventas') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('Gastos') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('Gastos')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('Gastos')}>
                                    <div className={`${selectedItems.includes('Gastos') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Gastos del período</h5>
                                        <p className='m-0 text-center'>Este indicador te calcula los gastos del negocio por períodos</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('Gastos') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('Utilidad') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('Utilidad')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('Utilidad')}>
                                    <div className={`${selectedItems.includes('Utilidad') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Utilidad del período</h5>
                                        <p className='m-0 text-center'>Este indicador te calcula la utilidad del negocio por períodos</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('Utilidad') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('ClienteQueMasCompra') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('ClienteQueMasCompra')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('ClienteQueMasCompra')}>
                                    <div className={`${selectedItems.includes('ClienteQueMasCompra') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Cliente que más compra</h5>
                                        <p className='m-0 text-center'>Este indicador revela los clientes con los que generas mayores ingresos</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('ClienteQueMasCompra') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('ClienteFrecuente') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('ClienteFrecuente')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('ClienteFrecuente')}>
                                    <div className={`${selectedItems.includes('ClienteFrecuente') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Cliente frecuente</h5>
                                        <p className='m-0 text-center'>Este indicador revela los clientes con compras más frecuentes</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('ClienteFrecuente') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('TicketPromedio') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('TicketPromedio')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('TicketPromedio')}>
                                    <div className={`${selectedItems.includes('TicketPromedio') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Ticket promedio</h5>
                                        <p className='m-0 text-center'>Este indicador te permite calcular el valor promedio de cada compra</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('TicketPromedio') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>
                    
                            <div className={`${styles.indicator} ${selectedItems.includes('CuentasXPagar') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('CuentasXPagar')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('CuentasXPagar')}>
                                    <div className={`${selectedItems.includes('CuentasXPagar') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Cuentas por pagar</h5>
                                        <p className='m-0 text-center'>Este indicador te permite calcular las cuentas por pagar por períodos</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('CuentasXPagar') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('CuentasXCobrar') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('CuentasXCobrar')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('CuentasXCobrar')}>
                                    <div className={`${selectedItems.includes('CuentasXCobrar') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Cuentas por cobrar</h5>
                                        <p className='m-0 text-center'>Este indicador te permite calcular las cuentas por cobrar por períodos</p>
                                    </div>
                                </div>
                                <div className={` ${styles.button__Select} ${selectedItems.includes('CuentasXCobrar') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('InventarioProducto') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('InventarioProducto')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('InventarioProducto')}>
                                    <div className={`${selectedItems.includes('InventarioProducto') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Inventario de productos</h5>
                                        <p className='m-0 text-center'>Este indicador te calcula el inventario de tu negocio por períodos</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('InventarioProducto') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('InventarioMateriasPrimas') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('InventarioMateriasPrimas')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('InventarioMateriasPrimas')}>
                                    <div className={`${selectedItems.includes('InventarioMateriasPrimas') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Inventario de materias primas</h5>
                                        <p className='m-0 text-center'>Este indicador te calcula el inventario de tu negocio por períodos</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('InventarioMateriasPrimas') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('InventarioMercancias') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('InventarioMercancias')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('InventarioMercancias')}>
                                    <div className={`${selectedItems.includes('InventarioMercancias') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Inventario de mercancía</h5>
                                        <p className='m-0 text-center'>Este indicador te calcula el inventario de tu negocio por períodos</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('InventarioMercancias') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('InventarioActivos') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('InventarioActivos')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('InventarioActivos')}>
                                    <div className={`${selectedItems.includes('InventarioActivos') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Inventario de activos</h5>
                                        <p className='m-0 text-center'>Este indicador te calcula el inventario de tu negocio por períodos</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('InventarioActivos') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.container__Button} mt-4 mb-4 mx-auto d-flex align-items-center justify-content-center`}>
                            <button className={`${styles.button} border-0`} type='submit' onClick={handleCalculate}>Calcular</button>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default AccountsAndInventoryIndicatorsPage;
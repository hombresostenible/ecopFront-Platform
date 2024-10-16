import { useLocation, Link } from 'react-router-dom';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import SalesPerPeriod from '../../../../../components/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/01SalesPerPeriod/SalesPerPeriod';
import ExpensesPerPeriod from '../../../../../components/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/02ExpensesPerPeriod/ExpensesPerPeriod';
import UtilityPerPeriod from '../../../../../components/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/03UtilityPerPeriod/UtilityPerPeriod';
import BestClientValue from '../../../../../components/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/04BestClientValue/BestClientValue';
import BestClientQuantity from '../../../../../components/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/05BestClientQuantity/BestClientQuantity';
import AverageTicket from '../../../../../components/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/06AverageTicket/AverageTicket';
import AccountsPayable from '../../../../../components/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/07AccountsPayable/AccountsPayable';
import AccountsReceivable from '../../../../../components/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/08AccountsReceivable/AccountsReceivable';
import InventoryAssets from '../../../../../components/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/09InventoryAssets/InventoryAssets';
import InventoryMerchandises from '../../../../../components/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/10InventoryMerchandises/InventoryMerchandises';
import InventoryProduct from '../../../../../components/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/11InventoryProduct/InventoryProduct';
import InventoryRawMaterials from '../../../../../components/PanelUser/10ReportsAndIndicators/02AccountsAndInventoryIndicators/12InventoryRawMaterials/InventoryRawMaterials';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

function CalculateIndicatorsFinancialsPage() {
    const location = useLocation();
    const selectedItems = location.state?.selectedItems || [];

    return (
        <div className='d-flex flex-column'>
            <NavBar />                
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-start justify-content-between`}>
                    <Link to="/reports-and-indicators/accounts-and-inventory-indicators" className={`${styles.button__Back} m-4 text-decoration-none`}>
                        Volver
                    </Link>
                    <h1 className={`${styles.title} mx-4`}>Indicadores Financieros</h1>
                    <div className={`${styles.indicator__Calculate} d-flex flex-wrap align-items-start justify-content-center gap-4 overflow-y-auto`}>
                        {selectedItems.map((item: string) => {
                            let key;
                            if (item === 'Ventas') {
                                key = 'Ventas';
                                return <div key={key} ><SalesPerPeriod key={key} /></div>;
                            } else if (item === 'Gastos') {
                                key = 'Gastos';
                                return <div key={key} ><ExpensesPerPeriod key={key} /></div>;
                            } else if (item === 'Utilidad') {
                                key = 'Utilidad';
                                return <div key={key} ><UtilityPerPeriod key={key} /></div>;
                            } else if (item === 'ClienteQueMasCompra') {
                                key = 'ClienteQueMasCompra';
                                return <div key={key} ><BestClientValue key={key} /></div>;
                            } else if (item === 'ClienteFrecuente') {
                                key = 'ClienteFrecuente';
                                return <div key={key} ><BestClientQuantity key={key} /></div>;
                            } else if (item === 'TicketPromedio') {
                                key = 'TicketPromedio';
                                return <div key={key} ><AverageTicket key={key} /></div>;
                            } else if (item === 'CuentasXCobrar') {
                                key = 'CuentasXCobrar';
                                return <div key={key} ><AccountsReceivable key={key} /></div>;
                            } else if (item === 'CuentasXPagar') {
                                key = 'CuentasXPagar';
                                return <div key={key} ><AccountsPayable key={key} /></div>;
                            } else if (item === 'InventarioProducto') {
                                key = 'InventarioProducto';
                                return <div key={key} ><InventoryProduct key={key} /></div>;
                            } else if (item === 'InventarioMateriasPrimas') {
                                key = 'InventarioMateriasPrimas';
                                return <div key={key} ><InventoryRawMaterials key={key} /></div>;
                            } else if (item === 'InventarioMercancias') {
                                key = 'InventarioMercancias';
                                return <div key={key} ><InventoryMerchandises key={key} /></div>;
                            } else if (item === 'InventarioActivos') {
                                key = 'InventarioActivos';
                                return <div key={key} ><InventoryAssets key={key} /></div>;
                            }
                            return null;
                        })}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CalculateIndicatorsFinancialsPage;
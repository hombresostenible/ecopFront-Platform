import { useLocation, Link } from 'react-router-dom';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import AcquisitionClients from '../../../../../components/PanelUser/10ReportsAndIndicators/03MarketingIndicators/01AcquisitionClients/AcquisitionClients';
import RetentionClients from '../../../../../components/PanelUser/10ReportsAndIndicators/03MarketingIndicators/02RetentionClients/RetentionClients';
import CustomerDigital from '../../../../../components/PanelUser/10ReportsAndIndicators/03MarketingIndicators/03CustomerDigital/CustomerDigital';
import VisualisationImpressions from '../../../../../components/PanelUser/10ReportsAndIndicators/03MarketingIndicators/04VisualisationImpressions/VisualisationImpressions';
import ComparativeVisualisationImpressions from '../../../../../components/PanelUser/10ReportsAndIndicators/03MarketingIndicators/05ComparativeVisualisationImpressions/ComparativeVisualisationImpressions';
import ProspectsGenerated from '../../../../../components/PanelUser/10ReportsAndIndicators/03MarketingIndicators/06ProspectsGenerated/ProspectsGenerated';
import ComparativeProspectsGenerated from '../../../../../components/PanelUser/10ReportsAndIndicators/03MarketingIndicators/07ComparativeProspectsGenerated/ComparativeProspectsGenerated';
import NumberSalesDigitalCampaign from '../../../../../components/PanelUser/10ReportsAndIndicators/03MarketingIndicators/08NumberSalesDigitalCampaign/NumberSalesDigitalCampaign';
import ComparativeNumberSalesDigitalCampaign from '../../../../../components/PanelUser/10ReportsAndIndicators/03MarketingIndicators/09ComparativeNumberSalesDigitalCampaign/ComparativeNumberSalesDigitalCampaign';
import NumberInterestedCustomers from '../../../../../components/PanelUser/10ReportsAndIndicators/03MarketingIndicators/10NumberInterestedCustomers/NumberInterestedCustomers';
import ComparativeNumberInterestedCustomers from '../../../../../components/PanelUser/10ReportsAndIndicators/03MarketingIndicators/11ComparativeNumberInterestedCustomers/ComparativeNumberInterestedCustomers';
import ConversionRate from '../../../../../components/PanelUser/10ReportsAndIndicators/03MarketingIndicators/12ConversionRate/ConversionRate';
import ComparativeConversionRate from '../../../../../components/PanelUser/10ReportsAndIndicators/03MarketingIndicators/13ComparativeConversionRate/ComparativeConversionRate';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

function CalculateIndicatorsMarketingPage() {
    const location = useLocation();
    const selectedItems = location.state?.selectedItems || [];

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-start justify-content-between`}>
                    <Link to="/reports-and-indicators/marketing-indicators" className={`${styles.button__Back} m-4 text-decoration-none`}>
                        Volver
                    </Link>
                    <h1 className={`${styles.title} mx-4`}>Indicadores de Marketing</h1>
                    <div className={`${styles.indicator__Calculate} d-flex flex-wrap align-items-start justify-content-center gap-4 overflow-y-auto`}>
                        {selectedItems.map((item: string) => {
                            let key;
                            if (item === 'CostoAdquisicionClientes') {
                                key = 'CostoAdquisicionClientes';
                                return <div key={key} ><AcquisitionClients key={key} /></div>;
                            } else if (item === 'CostoRetencionClientes') {
                                key = 'CostoRetencionClientes';
                                return <div key={key} ><RetentionClients key={key} /></div>;
                            } else if (item === 'EmbudoCampañaDigital') {
                                key = 'EmbudoCampañaDigital';
                                return <div key={key} ><CustomerDigital key={key} /></div>;
                            } else if (item === 'VisualizacionImpresiones') {
                                key = 'VisualizacionImpresiones';
                                return <div key={key} ><VisualisationImpressions key={key} /></div>;
                            } else if (item === 'ComparativoVisualizacionImpresiones') {
                                key = 'ComparativoVisualizacionImpresiones';
                                return <div key={key} ><ComparativeVisualisationImpressions key={key} /></div>;
                            } else if (item === 'ProspectosGenerados') {
                                key = 'ProspectosGenerados';
                                return <div key={key} ><ProspectsGenerated key={key} /></div>;
                            } else if (item === 'ComparativoProspectosGenerados') {
                                key = 'ComparativoProspectosGenerados';
                                return <div key={key} ><ComparativeProspectsGenerated key={key} /></div>;
                            } else if (item === 'NumeroVentasCampañaDigital') {
                                key = 'NumeroVentasCampañaDigital';
                                return <div key={key} ><NumberSalesDigitalCampaign key={key} /></div>;
                            } else if (item === 'ComparativoNumeroVentasCampañaDigital') {
                                key = 'ComparativoNumeroVentasCampañaDigital';
                                return <div key={key} ><ComparativeNumberSalesDigitalCampaign key={key} /></div>;
                            } else if (item === 'NumeroPersonasInteresadas') {
                                key = 'NumeroPersonasInteresadas';
                                return <div key={key} ><NumberInterestedCustomers key={key} /></div>;
                            } else if (item === 'ComparativoNumeroPersonasInteresadas') {
                                key = 'ComparativoNumeroPersonasInteresadas';
                                return <div key={key} ><ComparativeNumberInterestedCustomers key={key} /></div>;
                            } else if (item === 'TasaConversion') {
                                key = 'TasaConversion';
                                return <div key={key} ><ConversionRate key={key} /></div>;
                            } else if (item === 'ComparativoTasaConversion') {
                                key = 'ComparativoTasaConversion';
                                return <div key={key} ><ComparativeConversionRate key={key} /></div>;
                            } else {
                                return null;
                            }
                        })}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CalculateIndicatorsMarketingPage;
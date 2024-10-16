import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

function MarketingIndicatorsPage() {
    const [ selectedItems, setSelectedItems ] = useState<string[]>([]);

    const navigate = useNavigate();

    const toggleSelect = (item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleCalculate = () => {
        navigate('/reports-and-indicators/marketing-indicators/calculate-marketing-items', { state: { selectedItems } });
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className="px-5 overflow-hidden overflow-y-auto">
                        <h1 className={`${styles.title} mb-4 mt-4`}>Elige el indicador de mercadeo que quieres calcular</h1>

                        <div className={`${styles.container__Cards_Indicators} m-auto d-flex flex-wrap align-items-center justify-content-center gap-4`}>
                            <div className={`${styles.indicator} ${selectedItems.includes('CostoAdquisicionClientes') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('CostoAdquisicionClientes')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('CostoAdquisicionClientes')}>
                                    <div className={`${selectedItems.includes('CostoAdquisicionClientes') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Costo de adquisición de clientes</h5>
                                        <p className='m-0 text-center'>Description costo de adquisición de clientes</p>
                                    </div>
                                </div>
                                <div className={` ${styles.button__Select} ${selectedItems.includes('CostoAdquisicionClientes') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('CostoRetencionClientes') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('CostoRetencionClientes')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('CostoRetencionClientes')}>
                                    <div className={`${selectedItems.includes('CostoRetencionClientes') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Costo de retención de clientes</h5>
                                        <p className='m-0 text-center'>Description costo de retención de clientes</p>
                                    </div>
                                </div>
                                <div className={` ${styles.button__Select} ${selectedItems.includes('CostoRetencionClientes') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('EmbudoCampañaDigital') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('EmbudoCampañaDigital')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('EmbudoCampañaDigital')}>
                                    <div className={`${selectedItems.includes('EmbudoCampañaDigital') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Embudo de ventas de campaña digital</h5>
                                        <p className='m-0 text-center'>Description campaña digital</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('EmbudoCampañaDigital') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('VisualizacionImpresiones') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('VisualizacionImpresiones')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('VisualizacionImpresiones')}>
                                    <div className={`${selectedItems.includes('VisualizacionImpresiones') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Visualización o impresiones en campaña digital específica</h5>
                                        <p className='m-0 text-center'>Description visualización o impresiones</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('VisualizacionImpresiones') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('ComparativoVisualizacionImpresiones') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('ComparativoVisualizacionImpresiones')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('ComparativoVisualizacionImpresiones')}>
                                    <div className={`${selectedItems.includes('ComparativoVisualizacionImpresiones') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Comparativo de visualización o impresiones en campañas digitales</h5>
                                        <p className='m-0 text-center'>Description visualización o impresiones</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('ComparativoVisualizacionImpresiones') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('ProspectosGenerados') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('ProspectosGenerados')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('ProspectosGenerados')}>
                                    <div className={`${selectedItems.includes('ProspectosGenerados') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Prospectos o leads generados en campaña digital específica</h5>
                                        <p className='m-0 text-center'>Description prospectos generados</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('ProspectosGenerados') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>                                

                            <div className={`${styles.indicator} ${selectedItems.includes('ComparativoProspectosGenerados') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('ComparativoProspectosGenerados')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('ComparativoProspectosGenerados')}>
                                    <div className={`${selectedItems.includes('ComparativoProspectosGenerados') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Comparativo de prospectos o leads generados en campañas digitales</h5>
                                        <p className='m-0 text-center'>Description prospectos generados</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('ComparativoProspectosGenerados') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('NumeroVentasCampañaDigital') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('NumeroVentasCampañaDigital')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('NumeroVentasCampañaDigital')}>
                                    <div className={`${selectedItems.includes('NumeroVentasCampañaDigital') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Número de ventas generadas en campaña digital específica</h5>
                                        <p className='m-0 text-center'>Description número de ventas generadas por campaña digital</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('NumeroVentasCampañaDigital') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('ComparativoNumeroVentasCampañaDigital') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('ComparativoNumeroVentasCampañaDigital')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('ComparativoNumeroVentasCampañaDigital')}>
                                    <div className={`${selectedItems.includes('ComparativoNumeroVentasCampañaDigital') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Comparativo de número de ventas generadas en campañas digitales</h5>
                                        <p className='m-0 text-center'>Description número de ventas generadas por campaña digital</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('ComparativoNumeroVentasCampañaDigital') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('NumeroPersonasInteresadas') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('NumeroPersonasInteresadas')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('NumeroPersonasInteresadas')}>
                                    <div className={`${selectedItems.includes('NumeroPersonasInteresadas') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Número de personas interesadas en campaña digital específica</h5>
                                        <p className='m-0 text-center'>Description valor total de las ventas digitales</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('NumeroPersonasInteresadas') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('ComparativoNumeroPersonasInteresadas') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('ComparativoNumeroPersonasInteresadas')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('ComparativoNumeroPersonasInteresadas')}>
                                    <div className={`${selectedItems.includes('ComparativoNumeroPersonasInteresadas') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Comparativo de número de personas interesadas en campañas digitales</h5>
                                        <p className='m-0 text-center'>Description valor total de las ventas digitales</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('ComparativoNumeroPersonasInteresadas') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('TasaConversion') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('TasaConversion')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('TasaConversion')}>
                                    <div className={`${selectedItems.includes('TasaConversion') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Tasa de conversión en campaña digital específica</h5>
                                        <p className='m-0 text-center'>Description tasa de conversión</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('TasaConversion') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
                                    Selecciona
                                </div>
                            </div>

                            <div className={`${styles.indicator} ${selectedItems.includes('ComparativoTasaConversion') ? 'border-primary' : ''} d-flex flex-column align-items-center justify-content-between`} onClick={() => toggleSelect('ComparativoTasaConversion')} >
                                <div className={`${styles.indicator__Description} pt-4 px-4`} onClick={() => toggleSelect('ComparativoTasaConversion')}>
                                    <div className={`${selectedItems.includes('ComparativoTasaConversion') ? 'text-primary' : ''}`}>
                                        <h5 className={`${styles.title__Indicator} mb-3 text-center`}>Comparativo de tasa de conversión en campañas digitales</h5>
                                        <p className='m-0 text-center'>Description tasa de conversión</p>
                                    </div>
                                </div>
                                <div className={`${styles.button__Select} ${selectedItems.includes('ComparativoTasaConversion') ? 'active' : ''} mb-4 pt-2 pb-2 text-center`} >
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

export default MarketingIndicatorsPage;
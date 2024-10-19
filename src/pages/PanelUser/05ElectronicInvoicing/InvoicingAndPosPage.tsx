import { Link } from 'react-router-dom';
import NavBar from '../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

function InvoicingAndPosPage() {

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                    <h1 className={`${styles.title} mb-4 mt-4`}>Facturación y POS</h1>
                        <p>Aquí podrás expedir tus facturas electrónicas y POS para tu punto de venta</p>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Nota Credito</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Consulta tus notas Credito</Link>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Crea notas Credito</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Nota débito</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Consulta tus notas débito</Link>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Crea notas débito</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Facturas frecuentes</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Consulta tus clientes con facturas frecuentes</Link>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Crea facturas frecuentes</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Cotizaciones</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Consulta todas tus cotizaciones enviadas</Link>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Crea una cotización</Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default InvoicingAndPosPage;
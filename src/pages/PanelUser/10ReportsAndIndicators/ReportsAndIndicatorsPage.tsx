import { Link } from 'react-router-dom';
import NavBar from '../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

function ReportsAndIndicatorsPage() {

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Reportes e indicadores</h1>
                        <p>Nuestra inteligencia de negocio hará de tu emprendimieto más exitoso</p>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Indicadores de Cuentas e Inventarios</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/reports-and-indicators/accounts-and-inventory-indicators' className={`${styles.link__Section} `} >Calcula tus indicadores de Cuentas e Inventarios</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Indicadores de Mercadeo</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/reports-and-indicators/marketing-indicators' className={`${styles.link__Section} `} >Calcula tus indicadores de Mercadeo</Link>
                            </div>
                        </div>
                        {/* <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Indicadores de Sostenibilidad</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/reports-and-indicators/sustainability-indicators' className={`${styles.link__Section} `} >Calcula tus indicadores de Sostenibilidad</Link>
                            </div>
                        </div> */}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ReportsAndIndicatorsPage;
import { Link } from 'react-router-dom';
import NavBar from '../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

function StrategicNotificationsPage() {
    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Notificaciones estratégicas</h1>
                        <p>No te preocupes por tus fechas críticas, nosotros te las recordaremos todo el tiempo</p>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Vencimiento de productos</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Crea tus notificaciones</Link>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Consulta tus notificaciones</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Calendario tributario</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Tu fecha para Declarar Renta</Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default StrategicNotificationsPage;
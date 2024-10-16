import { Link } from 'react-router-dom';
import NavBar from '../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

function SustainabilityPage() {
    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Sostenibilidad</h1>
                        <p>Sección legal para tus temas pendientes de sostenibilidad empresarial y medioambiental</p>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Consulta normas ambientales</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} `} >Consulta tus clientes</Link>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Crea tus clientes</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Diseño de planes</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Registra el seguimiento de tus clientes</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Informes ASG</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Registra el seguimiento de tus clientes</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Historias de sostenibilidad</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Registra el seguimiento de tus clientes</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Diagnósticos</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} `} >Registra el seguimiento de tus clientes</Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default SustainabilityPage;
import { Link, useLocation } from 'react-router-dom';
// ELEMENTOS DEL COMPONENTE
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

function YourCurrentPlanPage() {
    const location = useLocation();

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} p-4 overflow-y-auto`}>
                        <div className={`${styles.container__Navigation} d-flex gap-2`}>
                            <Link to={'/configuration/profile'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/profile' ? styles.active : ''} `}>Perfil</Link>
                            <Link to={'/configuration/your-current-plan'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/your-current-plan' ? styles.active : ''} `}>Tu plan actual</Link>
                            <Link to={'/configuration/mail-configuration'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/mail-configuration' ? styles.active : ''} `}>Configuración de correo</Link>
                            <Link to={'/configuration/billing-configuration'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/billing-configuration/' ? styles.active : ''} `}>Configuración de facturación</Link>
                            <Link to={'/configuration/role-information'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/role-information' ? styles.active : ''} `}>Información de roles</Link>
                        </div>

                        <h1 className={`${styles.title} mb-4`}>Tu plan actual</h1>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default YourCurrentPlanPage;
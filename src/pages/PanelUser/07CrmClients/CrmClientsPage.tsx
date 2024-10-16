import { Link } from 'react-router-dom';
import NavBar from '../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../components/PanelUser/Footer/Footer.tsx';
import styles from './styles.module.css';

function CrmClientsPage() {

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>CRM Clientes</h1>

                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Clientes</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/crm-clients/consult-crm-clients' className={`${styles.link__Section} `} >Consulta tus clientes</Link>
                                <Link to='/crm-clients/create-crm-clients' className={`${styles.link__Section} `} >Crea tus clientes</Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CrmClientsPage;
import { Link } from 'react-router-dom';
import NavBar from '../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../components/PanelUser/Footer/Footer.tsx';
import styles from './styles.module.css';

function CrmSuppliersPage() {

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>CRM Proveedores</h1>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Proveedores</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/crm-suppliers/consult-crm-suppliers' className={`${styles.link__Section} `} >Consulta tus proveedores</Link>
                                <Link to='/crm-suppliers/create-crm-suppliers' className={`${styles.link__Section} `} >Crea tus proveedores</Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CrmSuppliersPage;
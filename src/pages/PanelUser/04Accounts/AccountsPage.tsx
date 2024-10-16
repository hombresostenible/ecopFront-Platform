import { Link } from 'react-router-dom';
import NavBar from '../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

function AccountsPage() {
    
    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Cuentas</h1>
                        <p>Bienvendo al espacio del Libro Diario de cuentas, aquí podrás registrar tus ingresos, gastos, cuentas por cobrar y cuentas por pagar.</p>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Ver todos los registros</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/accounts/see-records' className={`${styles.link__Section} `} >Consulta todos tus regiatros</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Crea ingresos y cuentas por cobrar</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/accounts/create-incomes' className={`${styles.link__Section} `} >Ingresos</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Crea gastos y cuentas por pagar</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/accounts/create-expenses' className={`${styles.link__Section} `} >Gastos</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Transacciones pendientes de aprobar</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/accounts/consult-pending-approval' className={`${styles.link__Section} `}>Consulta tus transacciones pendientes de aprobación</Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default AccountsPage;
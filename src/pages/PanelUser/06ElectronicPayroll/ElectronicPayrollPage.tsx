import { Link } from 'react-router-dom';
import NavBar from '../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../components/PanelUser/Footer/Footer.tsx';
import styles from './styles.module.css';

function ElectronicPayrollPage() {

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Nómina electrónica</h1>
                        <p>Bienvenido a Nómina Electrónica, aqui puedes crear y gestionar los colaboradores de tu negocio, Selecciona la opción que queires trabajar</p>

                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} text-center`}>Colaboradores</h4>
                            <div className={`${styles.container__Link_Section} d-flex align-items-center justify-content-center gap-4`}>
                                <Link to='/electronic-payroll/consult-collaborators' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`}>Consulta tus colaboradores</Link>
                                <Link to='/electronic-payroll/create-collaborators' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`} >Crea tus colaboradores</Link>
                            </div>
                        </div>
                        {/* <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Pagos de nómina</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/electronic-payroll/consult-payroll-payments' className={`${styles.link__Section} `} >Pagos de nómina</Link>
                                <Link to='/electronic-payroll/create-payroll-payments' className={`${styles.link__Section} `} >Crea tus pagos de nómina</Link>
                            </div>
                        </div> */}
                        {/* <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Certificaciones</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/electronic-payroll/certifications' className={`${styles.link__Section} `} >Crea certificaciones para tus colaboradores</Link>
                            </div>
                        </div> */}
                        {/* <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} `}>Liquidación de nómina</h4>
                            <div className={`${styles.container__Link_Section} `}>
                                <Link to='/electronic-payroll/payroll-settlement' className={`${styles.link__Section} `} >Liquida la nómina de tus colaboradores</Link>
                            </div>
                        </div> */}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ElectronicPayrollPage;
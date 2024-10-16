import { Link } from 'react-router-dom';
import NavBar from '../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../components/PanelUser/Footer/Footer.tsx';
import styles from './styles.module.css';

function BranchPage() {

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Sedes</h1>
                        <p>Bienvenido a Sede, aqui puedes controlar y gestionar las sedes de tu negocio. Selecciona la opción que queires trabajar:</p>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} text-center`}>Equipos, herramientas o máquinas</h4>
                            <div className={`${styles.container__Link_Section} d-flex align-items-center justify-content-center gap-4`}>
                                <Link to='/branches/consult-branches' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`}>Consulta tus sedes</Link>
                                <Link to='/branches/create-branches' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`} >Crea tus sedes</Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default BranchPage;
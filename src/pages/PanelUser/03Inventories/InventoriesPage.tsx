import { Link } from 'react-router-dom';
import NavBar from '../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

function InventoriesPage() {

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Inventarios</h1>
                        <p>Bienvenido a Inventarios, aqui puedes controlar y gestionar los inventarios de tu negocio. Selecciona la opción que queires trabajar:</p>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} text-center`}>Equipos, herramientas o máquinas</h4>
                            <div className={`${styles.container__Link_Section} d-flex align-items-center justify-content-center gap-4`}>
                                <Link to='/inventories/consult-assets' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`}>Consulta tus equipos, herramientas o máquinas</Link>
                                <Link to='/inventories/create-assets' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`} >Crea tus equipos, herramientas o máquinas</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} text-center`}>Mercancías</h4>
                            <div className={`${styles.container__Link_Section} d-flex align-items-center justify-content-center gap-4`}>
                                <Link to='/inventories/consult-merchandises' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`} >Consulta tus mercancías</Link>
                                <Link to='/inventories/create-merchandises' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`} >Crea tus mercancías</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} text-center`}>Productos</h4>
                            <div className={`${styles.container__Link_Section} d-flex align-items-center justify-content-center gap-4`}>
                                <Link to='/inventories/consult-products' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`} >Consulta tus productos</Link>
                                <Link to='/inventories/create-products' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`} >Crea tus productos</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} text-center`}>Materias primas</h4>
                            <div className={`${styles.container__Link_Section} d-flex align-items-center justify-content-center gap-4`}>
                                <Link to='/inventories/consult-raw-materals' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`} >Consulta tus materias primas</Link>
                                <Link to='/inventories/create-raw-materals' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`} >Crea tus materias primas</Link>
                            </div>
                        </div>
                        <div className='m-4 d-flex flex-column'>
                            <h4 className={`${styles.subtitle} text-center`}>Servicios</h4>
                            <div className={`${styles.container__Link_Section} d-flex align-items-center justify-content-center gap-4`}>
                                <Link to='/inventories/consult-services' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`} >Consulta tus servicios</Link>
                                <Link to='/inventories/create-services' className={`${styles.link__Section} d-flex align-items-center justify-content-center text-center text-decoration-none overflow-hidden`} >Crea tus servicios</Link>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default InventoriesPage;
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

function ServiceActivateNewPlansPage() {
    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Activa nuevos planes</h1>
                        <div className={`${styles.container__Plants_Table} `}>
                            <div className={`${styles.container__Titles_Columns} `}>
                                <div className={`${styles.name__Plain} `}>Nombre de plan</div>
                                <div className={`${styles.primera} `}>Gratis</div>
                                <div className={`${styles.primera} `}>Nivel 1</div>
                                <div className={`${styles.primera} `}>Nivel 2</div>
                                <div className={`${styles.primera} `}>Nivel 3</div>
                                <div className={`${styles.primera} `}>Nivel 4</div>
                            </div>
                            <div className={`${styles.container__Data_Columns} `}>
                                <div className={`${styles.title__Plaint} `}>Cuentas e Inventarios</div>
                                <div className={`${styles.primera} `}></div>
                                <div className={`${styles.primera} `}>Emprendedor básico</div>
                                <div className={`${styles.primera} `}>Emprendedor avanzado</div>
                                <div className={`${styles.primera} `}></div>
                                <div className={`${styles.primera} `}></div>
                            </div>
                            <div className={`${styles.container__Data_Columns} `}>
                                <div className={`${styles.title__Plaint} `}>Facturación y POS</div>
                                <div className={`${styles.segunda} `}></div>
                                <div className={`${styles.segunda} `}>36 documentos</div>
                                <div className={`${styles.segunda} `}>150 documentos</div>
                                <div className={`${styles.segunda} `}>1000 documentos</div>
                                <div className={`${styles.segunda} `}>premium</div>
                            </div>
                            <div className={`${styles.container__Data_Columns} `}>
                                <div className={`${styles.title__Plaint} `}>Nomina electrónica</div>
                                <div className={`${styles.segunda} `}>1 colaborador</div>
                                <div className={`${styles.segunda} `}>3 colaboradores</div>
                                <div className={`${styles.segunda} `}>15 colaboradores</div>
                                <div className={`${styles.segunda} `}>30 colaboradores</div>
                                <div className={`${styles.segunda} `}>colaboradores ilimitados</div>
                            </div>
                            <div className={`${styles.container__Data_Columns} `}>
                                <div className={`${styles.title__Plaint} `}>CRM Clientes</div>
                                <div className={`${styles.segunda} `}>1 colaborador</div>
                                <div className={`${styles.segunda} `}>3 colaboradores</div>
                                <div className={`${styles.segunda} `}>15 colaboradores</div>
                                <div className={`${styles.segunda} `}>30 colaboradores</div>
                                <div className={`${styles.segunda} `}>colaboradores ilimitados</div>
                            </div>
                            <div className={`${styles.container__Data_Columns} `}>
                                <div className={`${styles.title__Plaint} `}>CRM Proveedores</div>
                                <div className={`${styles.segunda} `}>1 colaborador</div>
                                <div className={`${styles.segunda} `}>3 colaboradores</div>
                                <div className={`${styles.segunda} `}>15 colaboradores</div>
                                <div className={`${styles.segunda} `}>30 colaboradores</div>
                                <div className={`${styles.segunda} `}>colaboradores ilimitados</div>
                            </div>
                            <div className={`${styles.container__Data_Columns} `}>
                                <div className={`${styles.title__Plaint} `}>Sostenibilidad</div>
                                <div className={`${styles.segunda} `}></div>
                                <div className={`${styles.segunda} `}>3 colaboradores</div>
                                <div className={`${styles.segunda} `}>15 colaboradores</div>
                                <div className={`${styles.segunda} `}>30 colaboradores</div>
                                <div className={`${styles.segunda} `}>colaboradores ilimitados</div>
                            </div>
                            <div className={`${styles.container__Data_Columns} `}>
                                <div className={`${styles.title__Plaint} `}>Notificaciones estratégicas</div>
                                <div className={`${styles.segunda} `}></div>
                                <div className={`${styles.segunda} `}>3 colaboradores</div>
                                <div className={`${styles.segunda} `}>15 colaboradores</div>
                                <div className={`${styles.segunda} `}>30 colaboradores</div>
                                <div className={`${styles.segunda} `}>colaboradores ilimitados</div>
                            </div>
                            <div className={`${styles.container__Data_Columns} `}>
                                <div className={`${styles.title__Plaint} `}>Asesorías</div>
                                <div className={`${styles.segunda} `}></div>
                                <div className={`${styles.segunda} `}>3 colaboradores</div>
                                <div className={`${styles.segunda} `}>15 colaboradores</div>
                                <div className={`${styles.segunda} `}>30 colaboradores</div>
                                <div className={`${styles.segunda} `}>colaboradores ilimitados</div>
                            </div>
                        </div>

                        <div className={`${styles.ssssssss} `}>

                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ServiceActivateNewPlansPage;
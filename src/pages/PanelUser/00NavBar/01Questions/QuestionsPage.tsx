import NavBar from '../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

function QuestionsPage() {
    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <p>Soporte</p>
                        ¿Qué tipo de soporte necesitas hoy?
                        <div className='m-4 p-3 border rounded'>
                            <h3>Información clave para gerenciar tu negocio</h3>
                        </div>
                        <div>
                            <h3>Conacto con soporte para PQRF</h3>
                            crear una tabla de seuimiento de casos de atención al clientes
                            <p>RUTA DEL BACK - Comunicate con nosotros: línea telefónica WhatsApp</p>
                            <p>RUTA DEL BACK - Autogestión adjuntando su inquietud con la posibilidad de adjuntar documentos</p>
                            <p>Seguimento de casos</p>
                        </div>
                        <div>
                            <p>Visión de Ecopción, por ejemplo, nosotros impolementamos que todo ()</p>
                            <h3>Funcionamient de la plataforma</h3>
                            <p>Configuración de la cuenta</p>
                            <p>Paso a paso para utilizar Ecopción</p>

                            <p>Cómo actualizar la información</p>
                            <p>Cómno crear una sede o sucursal</p>
                            <p>Cómno crear un usuario de plataforma</p>
                            <p>crear la contrasea de aplicaciones para enviar correos electrónicos desde la misma plataforma</p>
                            <p>hbilitar la nómina electrónica</p>
                            <p>Contrato de mandato para firma digital el usuario</p>
                        </div>




                        <div className='m-4 p-3 border rounded'>
                            <h3>Inventarios</h3>
                            <p className='m-0'>Concepto general del tema</p>
                            <p className='m-0'>Videos explicativos</p>
                            <p className='m-0'>Enlaces con información complementaria sobre cada tema: activos, mercancías, productos, materias primas y servicios</p>
                        </div>

                        <div className='m-4 p-3 border rounded'>
                            <h3>Cuentas</h3>
                        </div>
                        <div className='m-4 p-3 border rounded'>
                            <h3>Facturación y POS</h3>
                        </div>
                        <div className='m-4 p-3 border rounded'>
                            <h3>Nomina electrónica</h3>
                        </div>
                        <div className='m-4 p-3 border rounded'>
                            <h3>CRM CLietes</h3>
                        </div>
                        <div className='m-4 p-3 border rounded'>
                            <h3>CRM Proveedores</h3>
                        </div>
                        <div className='m-4 p-3 border rounded'>
                            <h3>Sostenibilidad</h3>
                        </div>
                        <div className='m-4 p-3 border rounded'>
                            <h3>Estrategia y toma de desiciones</h3>
                        </div>

                        <p>Aprender con nosotros</p>
                        <div className='m-4 p-3 border rounded'>
                            <h3>Ipuestos</h3>
                            <p></p>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid veniam, vitae corporis id velit omnis, optio harum, perferendis cumque placeat necessitatibus laborum. Nesciunt reiciendis consequatur natus fugit perferendis hic dicta atque, distinctio quidem iusto placeat fugiat animi nisi voluptatem rem illum harum velit doloribus molestiae ab amet sit modi officia!</p>
                        </div>


                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default QuestionsPage;
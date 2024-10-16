/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useEffect, useState, SetStateAction } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getProfileUser, patchUpdateApplicationPassword } from '../../../../../redux/User/userSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IUser } from '../../../../../types/User/user.types';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import styles from './styles.module.css';

function MailConfigurationPage() {
    const location = useLocation();
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const errorUser = useSelector((state: RootState) => state.user.errorUser);

    useEffect(() => {
        if (token) dispatch(getProfileUser(token));
    }, [token]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IUser>();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [emailProvider, setEmailProvider] = useState('aol');
    const handleEmailProvider = (event: { target: { value: SetStateAction<string>; }; }) => {
        setEmailProvider(event.target.value);
    };
    
    const [applicationPassword, setApplicationPassword] = useState('');
    const handleApplicationPassword = (event: { target: { value: SetStateAction<string>; }; }) => {
        setApplicationPassword(event.target.value);
    };
    
    const onSubmit = async (values: IUser) => {
        try {
            const formData = {
                ...values,
                emailProvider: emailProvider,
                applicationPassword: applicationPassword,
            } as IUser;
            dispatch(patchUpdateApplicationPassword(formData, token));
            setFormSubmitted(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getProfileUser(token));
            reset();
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} p-4 overflow-y-auto`}>
                        <div className={`${styles.container__Navigation} d-flex gap-2`}>
                            <Link to={'/configuration/profile'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/profile' ? styles.active : ''} `}>Perfil</Link>
                            {/* <Link to={'/configuration/your-current-plan'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/your-current-plan' ? styles.active : ''} `}>Tu plan actual</Link> */}
                            <Link to={'/configuration/mail-configuration'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/mail-configuration' ? styles.active : ''} `}>Configuración de correo</Link>
                            {/* <Link to={'/configuration/billing-configuration'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/billing-configuration/' ? styles.active : ''} `}>Configuración de facturación</Link> */}
                            {/* <Link to={'/configuration/role-information'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/role-information' ? styles.active : ''} `}>Información de roles</Link> */}
                        </div>

                        <h1 className={`${styles.title} mb-4 text-start`}>Configuración de correo</h1>
                        <div>
                            <p>Es necesario configurar tu correo electrónico para envío de emails a tus clientes, proveedores, Ecopción y demás.</p>
                            <p>Desde Ecopción puedes configurar tus campañas de vetas para tus clientes donde les podrás informar sobre las novedades de tus productos y las promociones que tienes para ellos, como recomendación, puedes usar este medio para vender todos los articulos que tienen poca rotación en tu inventario, nosotros te enviaremos reportes periódicos sobre todo aquello que casi no se vende, para que obtegas de vuelta el dinero que tienes invertido allí y puedas darle un mejor uso.</p>
                            <p>Además, es común de que tus clientes se contacten contigo y sea necesario el envío de una cotización</p>
                            <p>Si contratas con nosotros el servicio de facturación electrónica, puede ser muy útil que luego de generar la factura, la puedas remitir al correo electrónico de tu cliente.</p>
                            <p>De igual forma, si tienes algúna inquietud, duda o inconveniente con la plataforma de Ecopción, puedes enviar tu comunicación directamente desde nuestra plataforma.</p>
                            <p>Para poder configurar tu correo, necesitamos que crees una cuenta de Gmail</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} mt-5 m-auto position-relative`}>
                            {Array.isArray(errorUser) && errorUser?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}
                            <p>Define la contraseña de aplicaciones para tu correo: {user?.email}</p>
                            <div className="mb-2 w-100">
                                <h6 className={`${styles.label} mb-1`}>¿Cuál es el proveedor de tu correo electrónico?</h6>
                                <select
                                    defaultValue={0}
                                    className={`${styles.input} mb-2 p-2 border`}
                                    {...register('emailProvider', { required: true})}
                                    onChange={handleEmailProvider}
                                >
                                    <option value='aol'>Aol</option>
                                    <option value='gmail'>Gmail</option>
                                    <option value='hotmail'>Hotmail</option>
                                    <option value='outlook'>Outlook</option>
                                    <option value='yahoo'>Yahoo</option>
                                    <option value='zoho'>Zoho</option>
                                </select>
                                {errors.emailProvider && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre de la mercancía es requerido</p>
                                )}
                            </div>
                            <div className="mb-2 w-100">
                                <h6 className={`${styles.label} mb-1`}>¿Cuál es tu contraseña de aplicaciones?</h6>
                                <input
                                    type="text"
                                    {...register('applicationPassword', { required: true })}
                                    className={`${styles.input} mb-2 p-2 border`}
                                    onChange={handleApplicationPassword}
                                    placeholder='Contraseña de aplicaciones'
                                />
                                {errors.applicationPassword && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La contraseña de aplicaciones es requerida</p>
                                )}
                            </div>
                            <div className="mb-5 d-flex align-items-center justify-content-center">
                                <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                            </div>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default MailConfigurationPage;
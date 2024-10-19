/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { accountUnlockingUser } from '../../../../redux/User/userSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IResetPasswordBlocked } from '../../../../types/User/resetPasswordBlocked.types';
import Logo from '../../../../assets/LogoEcopcion.svg';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import styles from './styles.module.css';

function UnblockingAccountPage() {
    const { idParams } = useParams(); 
    const navigate = useNavigate();

    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorUser = useSelector((state: RootState) => state.user.errorUser);

    const { register, formState: { errors }, handleSubmit } = useForm<IResetPasswordBlocked>();
    const [ loading, setLoading ] = useState(false);

    const [ idParamsUser, setIdParamsUser ] = useState('');
    const [ resetPassword, setResetPassword ] = useState('');
    const [ replyResetPassword, setReplyResetPassword ] = useState('');
    const [ messageErrorResetPassword, setMessageErrorResetPassword ] = useState('');
    const [ resetPasswordUpdated, setResetPasswordUpdated ] = useState(false);

    useEffect(() => {
        if (idParams) setIdParamsUser(idParams);
    }, []);

    const [ showResetPassword, setShowResetPassword ] = useState(false);
    const toggleShowResetPassword = () => {
        setShowResetPassword((prevState) => !prevState);
    };

    const [ showReplayResetPassword, setShowReplayResetPassword ] = useState(false);
    const toggleShowReplayResetPassword = () => {
        setShowReplayResetPassword((prevState) => !prevState);
    };

    const onSubmit = async (values: IResetPasswordBlocked) => {
        if (resetPassword !== replyResetPassword) {
            setMessageErrorResetPassword('Las contraseñas no coinciden');
            return;
        }
        setLoading(true);
        try {
            const formData = {
                ...values,
            } as IResetPasswordBlocked;
            await dispatch(accountUnlockingUser(idParamsUser, formData));
            setMessageErrorResetPassword('');
            setResetPasswordUpdated(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setMessageErrorResetPassword('Hubo un problema al realizar el proceso de desbloqueo de cuenta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className={`${styles.container} d-flex align-items-center justify-content-center vh-100`}>
                <main className={`${styles.container__Component} d-flex flex-column align-items-center justify-content-center`}>
                    <header>
                        <Link to="/login">
                            <img src={Logo} alt="Ecopcion" className={`${styles.logo} mb-2`} />
                        </Link>
                    </header>

                    <section className='p-4 position-relative'>
                        <h2 className={`${styles.title} text-center`}>Restablecer contraseña para Usuarios</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-3 d-flex align-items-center justify-content-center position-relative'>
                                <input
                                    type="text"
                                    {...register('unlockCode', { required: true })}
                                    className={`${styles.input} p-2 mb-3 border rounded`}
                                    placeholder='Código de desbloqueo'
                                />
                            </div>

                            <div className='mb-3 d-flex align-items-center justify-content-center position-relative'>
                                <input
                                    type={showResetPassword ? "text" : "resetPassword"}
                                    {...register('resetPassword', { required: true })}
                                    className={`${styles.input} p-2 mb-3 border rounded`}
                                    value={resetPassword}
                                    onChange={(e) => setResetPassword(e.target.value)}
                                    placeholder='Nueva contraseña'
                                />
                                {showResetPassword ? (
                                    <RiEyeOffFill className={`${styles.icon} position-absolute`} onClick={toggleShowResetPassword} />
                                ) : (
                                    <RiEyeFill className={`${styles.icon} position-absolute`} onClick={toggleShowResetPassword} />
                                )}
                                {errors.resetPassword && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La nueva contraseña es requerida</p>
                                )}
                            </div>

                            <div className='mb-3 d-flex align-items-center justify-content-center position-relative'>
                                <input
                                    type={showReplayResetPassword ? "text" : "password"}
                                    {...register('resetPasswordConfirm', { required: true })}
                                    className={`${styles.input} p-2 mb-3 border rounded`}
                                    value={replyResetPassword}
                                    onChange={(e) => setReplyResetPassword(e.target.value)}
                                    placeholder='Repetir nueva contraseña'
                                />
                                {showReplayResetPassword ? (
                                    <RiEyeOffFill className={`${styles.icon} position-absolute`} onClick={toggleShowReplayResetPassword} />
                                ) : (
                                    <RiEyeFill className={`${styles.icon} position-absolute`} onClick={toggleShowReplayResetPassword} />
                                )}
                                {errors.resetPasswordConfirm && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La confirmación de tu nueva contraseña es requerida</p>
                                )}
                            </div>

                            <div className='d-flex align-items-center justify-content-center position-relative'>
                                {messageErrorResetPassword && <p className={`${styles.text__Danger} text-danger position-absolute`}>{messageErrorResetPassword}</p>}
                            </div>

                            <div className='d-flex align-items-center justify-content-center position-relative'>
                                {resetPasswordUpdated && <p className={`${styles.alert__Success} text-center position-absolute`}>Contraseña actualizada exitosamente</p>}
                            </div>

                            {errorUser && errorUser.length > 0 && (
                                <div className={`${styles.errors} bg-danger p-2 text-white text-center border position-absolute w-100`}>
                                    {Array.isArray(errorUser) && errorUser.map((error, i) => (
                                        <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                                    ))}
                                </div>
                            )}

                            {loading ? 
                                <div className="d-flex mb-4">
                                    <button className={`${styles.button__Submit} mx-auto border-0 rounded m-auto text-decoration-none`} disabled>
                                        <span className="spinner-border spinner-border-sm" role="status"></span> Enviando...
                                    </button>
                                </div>
                            :
                                <div className="d-flex mb-4">
                                    <button className={`${styles.button__Submit} mx-auto border-0 rounded m-auto text-decoration-none`} type='submit'>Enviar</button>
                                </div>
                            }
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default UnblockingAccountPage;
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { putResetPassword } from '../../../redux/User/userSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IResetPassword } from '../../../types/Auth/resetPassword.types';
import Logo from '../../../assets/LogoEcopcion.svg';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import styles from './styles.module.css';

function ResetPasswordPage() {
    const { idParams, passwordResetCode } = useParams(); 
    const navigate = useNavigate();

    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorUser = useSelector((state: RootState) => state.user.errorUser);

    const { register, formState: { errors }, handleSubmit } = useForm<IResetPassword>();
    const [ loading, setLoading ] = useState(false);

    const [ idParamsUser, setIdParamsUser ] = useState('');
    const [ passwordResetCodeUser, setIdPasswordResetCodeUser ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ replyPassword, setReplyPassword ] = useState('');
    const [ messageErrorPassword, setMessageErrorPassword ] = useState('');
    const [ passwordUpdated, setPasswordUpdated ] = useState(false);

    useEffect(() => {
        if (idParams) setIdParamsUser(idParams);
        if (passwordResetCode) setIdPasswordResetCodeUser(passwordResetCode);
    }, []);

    const [ showPassword, setShowPassword ] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const [ showReplayPassword, setShowReplayPassword ] = useState(false);
    const toggleShowReplayPassword = () => {
        setShowReplayPassword((prevState) => !prevState);
    };

    const onSubmit = async (values: IResetPassword) => {
        if (password !== replyPassword) {
            setMessageErrorPassword('Las contraseñas no coinciden');
            return;
        }
        setLoading(true);
        try {
            const formData = {
                ...values,
            } as IResetPassword;
            await dispatch(putResetPassword(idParamsUser, passwordResetCodeUser, formData));
            setMessageErrorPassword('');
            setPasswordUpdated(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setMessageErrorPassword('Hubo un problema al actualizar la contraseña');
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
                        <h2 className={`${styles.title} text-center`}>Restablecer contraseña</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-3 d-flex align-items-center justify-content-center position-relative'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register('password', { required: true })}
                                    className={`${styles.input} p-2 mb-3 border rounded`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Nueva contraseña'
                                />
                                {showPassword ? (
                                    <RiEyeOffFill className={`${styles.icon} position-absolute`} onClick={toggleShowPassword} />
                                ) : (
                                    <RiEyeFill className={`${styles.icon} position-absolute`} onClick={toggleShowPassword} />
                                )}
                                {errors.password && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La nueva contraseña es requerida</p>
                                )}
                            </div>

                            <div className='mb-3 d-flex align-items-center justify-content-center position-relative'>
                                <input
                                    type={showReplayPassword ? "text" : "password"}
                                    {...register('replyPassword', { required: true })}
                                    className={`${styles.input} p-2 mb-3 border rounded`}
                                    value={replyPassword}
                                    onChange={(e) => setReplyPassword(e.target.value)}
                                    placeholder='Repetir nueva contraseña'
                                />
                                {showReplayPassword ? (
                                    <RiEyeOffFill className={`${styles.icon} position-absolute`} onClick={toggleShowReplayPassword} />
                                ) : (
                                    <RiEyeFill className={`${styles.icon} position-absolute`} onClick={toggleShowReplayPassword} />
                                )}
                                {errors.replyPassword && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La confirmación de tu nueva contraseña es requerida</p>
                                )}
                            </div>

                            <div className='d-flex align-items-center justify-content-center position-relative'>
                                {messageErrorPassword && <p className={`${styles.text__Danger} text-danger position-absolute`}>{messageErrorPassword}</p>}
                            </div>

                            <div className='d-flex align-items-center justify-content-center position-relative'>
                                {passwordUpdated && <p className={`${styles.alert__Success} text-center position-absolute`}>Contraseña actualizada exitosamente</p>}
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

export default ResetPasswordPage;
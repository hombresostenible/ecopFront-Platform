import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IUser } from "../../../../types/User/user.types";
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import styles from './styles.module.css';

interface InfoCredentialsSectionProps {
    register: UseFormRegister<IUser>;
    errors: FieldErrors<IUser>;
}

function UserCredentialsPage({ register, errors }: InfoCredentialsSectionProps) {
    const [ acceptedPolicy, setAcceptedPolicy ] = useState(false);

    const [ showPassword, setShowPassword ] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div>
            <h4 className={`${styles.tertiary__Title } text-center`}>Tus datos de acceso</h4>
            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Email</h6>
                <input
                    type="email"
                    {...register('email', {
                        required: `El email es requerido`,
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: `El formato del email no es válido`
                        }
                    })}
                    className={`${styles.input} p-2 border `}
                    placeholder={`¿Cuál es tu email?`}
                />
                {errors.email && (
                    <p className={`${styles.text__Danger} text-danger position-absolute`}>{errors.email.message}</p>
                )}
            </div>

            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Contraseña</h6>
                <input
                    type={showPassword ? "text" : "password"}
                    {...register('password', { required: true })}
                    className={`${styles.input} p-2 border `}
                    placeholder='¿Cuál es tu contraseña?'
                />
                {showPassword ? (
                    <RiEyeOffFill className={`${styles.icon} position-absolute`} onClick={toggleShowPassword} />
                ) : (
                    <RiEyeFill className={`${styles.icon} position-absolute`} onClick={toggleShowPassword} />
                )}
                {errors.password && (
                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La contraseña es requerida</p>
                )}
            </div>

            <div className={`${styles.container__Accepted_Policy} d-flex align-items-center justify-content-center position-relative`}>
                <p className={`${styles.text__Accepted_Policy} text-center m-0`}>He leído y acepto los <Link to="/personalDataPolicy" className={`${styles.link} text-decoration-none text-sky-500`}>Términos y Condiciones junto con la Política de tratamiento de datos Personales</Link></p>
                <input
                    type="checkbox"
                    {...register('isAceptedConditions', { required: true })}
                    checked={acceptedPolicy}
                    onChange={() => setAcceptedPolicy(!acceptedPolicy)}
                    className={`${styles.checkbox} border`}
                />
                {errors.isAceptedConditions && (
                    <p className={`${styles.text__Danger_Accepted_Policy} text-danger position-absolute`}>Debes de aceptar términos y condiciones</p>
                )}
            </div>
        </div>
    );
}

export default UserCredentialsPage;
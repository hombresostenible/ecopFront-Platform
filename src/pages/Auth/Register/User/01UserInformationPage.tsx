import { useEffect, useState } from 'react';
import { IUser } from "../../../../types/User/user.types";
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import styles from './styles.module.css';

interface UserInfoSectionProps {
    register: UseFormRegister<IUser>;
    errors: FieldErrors<IUser>;
}

function UserInformationPage({ register, errors }: UserInfoSectionProps) {
    // Verifica si hay un valor en localStorage y úsalo, o predetermina a 'NIT'
    const [typeDocument, setTypeDocument] = useState(() => {
        return localStorage.getItem('typeDocument') || 'NIT';
    });

    // Actualiza el localStorage cada vez que el usuario cambie el tipo de documento
    const handleTypeDocument = (event: { target: { value: string }}) => {
        const selectedType = event.target.value;
        setTypeDocument(selectedType);
        localStorage.setItem('typeDocument', selectedType);
    };

    useEffect(() => {
        const savedType = localStorage.getItem('typeDocument');
        if (savedType) {
            setTypeDocument(savedType);
        }
    }, []);

    return (
        <div>
            <h4 className={`${styles.tertiary__Title } text-center`}>Información personal</h4>
            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Tipo de identificación</h6>
                <select
                    {...register('typeDocumentId', { required: true })}
                    className={`${styles.input} p-2 border `}
                    onChange={handleTypeDocument}
                >
                    <option value='NIT' translate="no">NIT</option>
                    <option value='Cedula de Ciudadania'>Cedula de Ciudadania</option>
                    <option value='Cedula de Extranjeria'>Cedula de Extranjeria</option>
                    <option value='Pasaporte'>Pasaporte</option>
                </select>
                {errors.typeDocumentId && (
                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de documento del usuario es requerido</p>
                )}
            </div>

            <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                <div className={`${styles.info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                    <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Número de identificación</h6>
                    <input
                        type="text"
                        {...register('documentId', { 
                            required: true,
                            pattern: /^\d{1,10}$/
                        })}
                        className={`${styles.input} p-2 border `}
                        placeholder='¿Cuál es tu número de identificación?'
                        maxLength={10}
                        onKeyDown={(e) => {
                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.' || e.key === ' ') {
                                e.preventDefault();
                            }
                        }}
                    />
                        {errors.documentId && (
                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El número de identidad es requerido y debe ser de hasta 9 dígitos.</p>
                    )}
                </div>
                
                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                    <h6 className={styles.label}>Dígito de verificación</h6>
                    <input
                        type="text"
                        {...register('verificationDigit', {
                            pattern: /^\d{1}$/
                        })}
                        className={`${styles.input} p-2 border `}
                        placeholder='Opcional ¿Cuál es el dígito de verificación de tu empresa?'
                        maxLength={1}
                        onKeyDown={(e) => {
                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.' || e.key === ' ') {
                                e.preventDefault();
                            }
                        }}
                    />
                </div>
            </div>

            {typeDocument === 'NIT' && (
                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                    <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Razón Social</h6>
                    <input
                        type="text"
                        {...register('corporateName', { required: true })}
                        className={`${styles.input} p-2 border `}
                        placeholder='Razón Social de tu empresa'
                    />
                    {errors.corporateName && (
                        <p className={`${styles.text__Danger} text-danger position-absolute`}>La Razón Social es requerida</p>
                    )}
                </div>
            )}

            {(typeDocument === 'Cedula de Ciudadania' || typeDocument === 'Cedula de Extranjeria' || typeDocument === 'Pasaporte')  && ( 
                <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                    <div className={`${styles.info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                        <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Nombres</h6>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className={`${styles.input} p-2 border `}
                            placeholder='¿Cuáles son tus nombres?'
                        />
                        {errors.name && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>Tus nombres son requeridos</p>
                        )}
                    </div>
                    <div className={`${styles.info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                        <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Apellidos</h6>
                        <input
                            type="text"
                            {...register('lastName', { required: true })}
                            className={`${styles.input} p-2 border `}
                            placeholder='¿Cuáles son tu apellidos?'
                        />
                        {errors.lastName && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>Tus apellidos son requeridos</p>
                        )}
                    </div>
                </div>
            )}

            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}>¿Tu negocio tiene nombre comercial?</h6>
                <input
                    type="text"
                    {...register('commercialName')}
                    className={`${styles.input} p-2 border `}
                    placeholder='Nombre comercial de tu negocio si lo tiene'
                />
            </div>
        </div>
    );
}

export default UserInformationPage;
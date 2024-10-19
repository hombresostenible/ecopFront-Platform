/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { postCrmSupplier, getCrmSuppliers } from '../../../../redux/User/08CrmSupplierSlice/actions';
import { getProfileUser } from '../../../../redux/User/userSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmSupplier } from '../../../../types/UserPanel/08CrmSupplierSlice/crmSupplier.types';
import styles from './styles.module.css';

interface CreateSupplierProps {
    token: string;
    onCreateComplete: () => void;
    onSupplierCreated: (token: string) => void;
}

function CreateSupplier({ token, onCreateComplete, onSupplierCreated }:CreateSupplierProps) {
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorCrmSupplier = useSelector((state: RootState) => state.crmSupplier.errorCrmSupplier);
    const user = useSelector((state: RootState) => state.user.user);
    
    const { register, handleSubmit, formState: { errors } } = useForm<ICrmSupplier>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token)
            dispatch(getProfileUser(token));
    }, [ token ]);

    const userId = user?.id;

    const [typeDocumentId, settypeDocumentId] = useState('NIT');
    const handletypeDocumentIdChange = (event: { target: { value: SetStateAction<string> }}) => {
        settypeDocumentId(event.target.value);
    };

    const onSubmit = async (values: ICrmSupplier) => {
        setLoading(true);
        try {
            const formData = {
                ...values,
                entityUserId: userId,
            } as ICrmSupplier;
            await dispatch(postCrmSupplier(formData, token));
            await new Promise(resolve => setTimeout(resolve, 500));
            await dispatch(getCrmSuppliers(token));
            setFormSubmitted(true);
            onCreateComplete();
            onSupplierCreated(token);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} pt-4 position-relative`}>
                {formSubmitted && (
                    <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                )}
                {Array.isArray(errorCrmSupplier) && errorCrmSupplier?.map((error, i) => (
                    <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                ))}

                <div className="w-100 position-relative">
                    <h6 className={styles.label}>Tipo de identificación</h6>
                    <select
                        {...register('typeDocumentId', { required: true })}
                        className={`${styles.input} p-2 border`}
                        onChange={handletypeDocumentIdChange}
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

                {(typeDocumentId === 'Cedula de Ciudadania' || typeDocumentId === 'Cedula de Extranjeria' || typeDocumentId === 'Pasaporte') && (
                    <div>
                        <div className="w-100 position-relative">
                            <h6 className={styles.label}>Nombres de tu proveedor</h6>
                            <input
                                type="text"
                                {...register('name')}
                                className={`${styles.input} p-2`}
                                placeholder='Nombres de tu proveedor'
                            />
                            {errors.name && (
                                <p className={`${styles.text__Danger} text-danger position-absolute`}>los nombres de tu proveedor son requeridos</p>
                            )}
                        </div>

                        <div className="w-100 position-relative">
                            <h6 className={styles.label}>Apellidos de tu proveedor</h6>
                            <input
                                type="text"
                                {...register('lastName')}
                                className={`${styles.input} p-2`}
                                placeholder='Apellidos de tu proveedor'
                            />
                            {errors.lastName && (
                                <p className={`${styles.text__Danger} text-danger position-absolute`}>los apllidos de tu proveedor son requeridos</p>
                            )}
                        </div>
                    </div>
                )}

                <div className="w-100 position-relative">
                    <h6 className={styles.label}>No. de identificación</h6>
                    <input
                        type="text"
                        {...register('documentId', { 
                            required: true,
                            pattern: /^\d{1,9}$/
                        })}
                        className={`${styles.input} p-2 border `}
                        placeholder='¿Cuál es tu número de identificación?'
                        maxLength={9}
                        onKeyDown={(e) => {
                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.' || e.key === ' ') {
                                e.preventDefault();
                            }
                        }}
                    />
                    {errors.lastName && (
                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El número de identidad es requerido</p>
                    )}
                </div>

                <div className="w-100 position-relative">
                    <h6 className={styles.label}>Dígito de verificación</h6>
                    <input
                        type="text"
                        {...register('verificationDigit', { 
                            required: true,
                            pattern: /^\d{1,1}$/
                        })}
                        className={`${styles.input} p-2 border `}
                        placeholder='¿Cuál es el dígito de verificación?'
                        maxLength={1}
                        onKeyDown={(e) => {
                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.' || e.key === ' ') {
                                e.preventDefault();
                            }
                        }}
                    />
                </div>

                {typeDocumentId === 'NIT' && (
                    <div className="w-100 position-relative">
                        <h6 className={styles.label}>Nombre de la empresa</h6>
                        <input
                            type="text"
                            {...register('corporateName')}
                            className={`${styles.input} p-2`}
                            placeholder='¿Cuál es el nombre de la empresa?'
                        />
                        {errors.corporateName && (
                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre de la empresa es requerido</p>
                        )}
                    </div>
                )}

                <div className="w-100 position-relative">
                    <h6 className={styles.label}>Email</h6>
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

                <div className="w-100 position-relative">
                    <h6 className={styles.label}>Celular o teléfono fijo</h6>
                    <input
                        type="tel"
                        {...register('phone', { 
                            required: true, 
                            pattern: /^\d{1,10}$/,
                            setValueAs: (value) => value.substring(0, 10)
                        })}
                        className={`${styles.input} p-2 border `}
                        placeholder='¿Cuál es el celular o teléfono fijo de tu oficina principal?'
                        maxLength={10}
                        min={0}
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            target.value = target.value.replace(/\D/g, '').substring(0, 10);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                e.preventDefault();
                            }
                        }}
                    />
                    {errors.phone && (
                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El celular del usuario es requerido</p>
                    )}
                </div>

                <div className="mb-3 d-flex align-items-center justify-content-center">
                    {loading ? 
                        <div>
                            <button className={`${styles.button__Submit} mx-auto border-0 rounded`} type='submit' >
                                <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Guardando...
                            </button>
                        </div> 
                    :
                        <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit' >Enviar</button>
                    }
                </div>
            </form>
        </div>
    );
}

export default CreateSupplier;
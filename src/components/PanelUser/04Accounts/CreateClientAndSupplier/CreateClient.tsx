/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { postCrmClient, getCrmClients } from '../../../../redux/User/07CrmClientSlice/actions';
import { getProfileUser } from '../../../../redux/User/userSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../types/User/crmClient.types';
import styles from './styles.module.css';

interface CreateClientProps {
    token: string;
    onCreateComplete: () => void;
    onClientCreated: (token: string) => void;
}

function CreateClient({ token, onCreateComplete, onClientCreated }:CreateClientProps) {
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorCrmClient = useSelector((state: RootState) => state.crmClient.errorCrmClient);
    const user = useSelector((state: RootState) => state.user.user);

    const { register, handleSubmit, formState: { errors } } = useForm<ICrmClient>();
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

    const onSubmit = async (values: ICrmClient) => {
        setLoading(true);
        try {
            const formData = {
                ...values,
                entityUserId: userId,
            } as ICrmClient;
            await dispatch(postCrmClient(formData, token));
            await new Promise(resolve => setTimeout(resolve, 500));
            await dispatch(getCrmClients(token));
            setFormSubmitted(true);
            onCreateComplete();
            onClientCreated(token);
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
                {Array.isArray(errorCrmClient) && errorCrmClient?.map((error, i) => (
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
                        <option value='Cedula de Ciudadania'>Cédula de Ciudadanía</option>
                        <option value='Cedula de Extranjeria'>Cédula de Extranjería</option>
                        <option value='Pasaporte'>Pasaporte</option>
                    </select>
                    {errors.typeDocumentId && (
                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de documento del usuario es requerido</p>
                    )}
                </div>

                <div className="w-100 position-relative">
                    <h6 className={styles.label}>No. de identificación</h6>
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
                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El número de identidad es requerido</p>
                    )}
                </div>

                {(typeDocumentId === 'Cedula de Ciudadania' || typeDocumentId === 'Cedula de Extranjeria' || typeDocumentId === 'Pasaporte') && (
                    <div>
                        <div className="w-100 position-relative">
                            <h6 className={styles.label}>Nombres de tu cliente</h6>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className={`${styles.input} p-2`}
                                placeholder='Nombres de tu cliente'
                            />
                            {errors.name && (
                                <p className={`${styles.text__Danger} text-danger position-absolute`}>Los nombres de tu cliente son requeridos</p>
                            )}
                        </div>

                        <div className="w-100 position-relative">
                            <h6 className={styles.label}>Apellidos de tu cliente</h6>
                            <input
                                type="text"
                                {...register('lastName', { required: true })}
                                className={`${styles.input} p-2`}
                                placeholder='Apellidos de tu cliente'
                            />
                            {errors.lastName && (
                                <p className={`${styles.text__Danger} text-danger position-absolute`}>Los apllidos de tu cliente son requeridos</p>
                            )}
                        </div>
                    </div>
                )}

                {typeDocumentId === 'NIT' && (
                    <div className="w-100 position-relative">
                        <h6 className={styles.label}>Nombre de la empresa</h6>
                        <input
                            type="text"
                            {...register('corporateName', { required: true })}
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
                            <button className={`${styles.button__Submit} mx-auto border-0 rounded`} >
                                <span className={`${styles.role} spinner-border spinner-border-sm`} ></span> Guardando...
                            </button>
                        </div> 
                    :
                        <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} >Enviar</button>
                    }
                </div>
            </form>
        </div>
    );
}

export default CreateClient;
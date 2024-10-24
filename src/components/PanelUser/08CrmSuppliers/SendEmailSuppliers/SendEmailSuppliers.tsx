/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { getProfileUser } from '../../../../redux/User/userSlice/actions';
import { sendEmailCRMSupplier } from '../../../../redux/User/08CrmSupplierSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmSupplier } from '../../../../types/UserPanel/08CrmSupplierSlice/crmSupplier.types';
import styles from './styles.module.css';

interface SendEmailSuppliersProps {
    token: string;
    selectedCrmSupplier: ICrmSupplier | undefined;      //Cliente al que se le quiere enviar un correo
    onCloseModal: () => void;                       //Cierra el modal luego de enviarle el correo al cliente
}

function SendEmailSuppliers({ token, selectedCrmSupplier, onCloseModal }: SendEmailSuppliersProps) {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (token) dispatch(getProfileUser(token));
    }, [token]);

    const { register, handleSubmit } = useForm<any>();
    const [ formSubmitted, setFormSubmitted ] = useState(false);  

    const [ emailProvider, setEmailProvider ] = useState('');
    const [ emailUser, setEmailUser ] = useState('');
    const [ applicationPasswordUser, setApplicationPasswordUser ] = useState('');
    const [ emailUserClient, setEmailUserClient ] = useState('');

    useEffect(() => {
        if (selectedCrmSupplier) setEmailUserClient(selectedCrmSupplier?.email);
        if (token && user) {
            setEmailUser(user?.email);
            if (user?.emailProvider) setEmailProvider(user.emailProvider);
            if (user?.applicationPassword) setApplicationPasswordUser(user.applicationPassword);
        }
    }, [ token ])
    
    const sendEmail = async (values: FormData) => {
        try {
            dispatch(sendEmailCRMSupplier(values));
            setFormSubmitted(true);
            onCloseModal();
        } catch (error) {
            throw new Error('Error al enviar el email');
        }
    };

    return (
        <div className={`${styles.container} m-auto`}>
            <h2 className={styles.subtitle}>Información de tu proveedor</h2>

            <div className={`${styles.container__Input} mb-2 d-flex align-items-center justify-content-start`}>
                <label className={`${styles.label} `} htmlFor="email">Provedor</label>
                <p className={`${styles.input__Client} m-0 p-2`}>{selectedCrmSupplier?.name ? selectedCrmSupplier?.name + ' ' + selectedCrmSupplier?.lastName : selectedCrmSupplier?.corporateName}</p>
            </div>
    
            <form onSubmit={handleSubmit((data) => {
                const formData = new FormData();
                formData.append('emailProvider', emailProvider);
                formData.append('from', emailUser);
                formData.append('applicationPassword', applicationPasswordUser);
                formData.append('to', selectedCrmSupplier?.email || '');
                formData.append('subject', data.subject || '');
                formData.append('text', data.text || '');
                if (data.attachments) {
                    for (let i = 0; i < data.attachments.length; i++) {
                        formData.append(`attachments`, data.attachments[i]);
                    }
                }
                    sendEmail(formData);
                })}
                className={`${styles.form} position-relative`} encType="multipart/form-data" method="POST"
            >

                {formSubmitted && (
                    <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El email se ha enviado con éxito</div>
                )}

                <div className={`${styles.container__Email} mb-4`}>
                    <div className={`${styles.container__Input} mb-2 d-flex align-items-center justify-content-start`}>
                        <label className={`${styles.label} `} htmlFor="email">Desde</label>
                        <input
                            className={`${styles.input} p-2 border`}
                            type="email"
                            id="email"
                            value={emailUser}
                            readOnly
                        />
                    </div>
                    <div className={`${styles.container__Input} mb-2 d-flex align-items-center justify-content-start`}>
                        <label className={`${styles.label} `} htmlFor="to">Para</label>
                        <input
                            className={`${styles.input} p-2 border`}
                            type="email"
                            id="to"
                            value={emailUserClient}
                            readOnly
                        />
                    </div>
                    <div className={`${styles.container__Input} mb-2 d-flex align-items-center justify-content-start`}>
                        <label className={`${styles.label} `} htmlFor="subject">Asunto</label>
                        <input
                            {...register('subject')}
                            className={`${styles.input} p-2 border`}
                            type="text"
                            id="subject"
                        />
                    </div>
                    <div className={`${styles.container__Input} mb-2 d-flex align-items-center justify-content-start`}>
                        <textarea
                            className={`${styles.textarea} p-2 border`}
                            id=""
                            placeholder='El contenido del correo aquí'
                            cols={30}
                            rows={10}
                            {...register('text')}
                        />
                    </div>

                    <input
                        {...register('attachments')}
                        className={`${styles.input__File} p-2 border`}
                        type="file"
                        multiple={true}
                    />
                </div>

                <div className="mb-4 d-flex align-items-center justify-content-center">
                    <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar correo</button>
                </div>
            </form>
        </div>
    );
}

export default SendEmailSuppliers;
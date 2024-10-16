/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { getProfileUser } from '../../../../redux/User/userSlice/actions';
import { sendEmailCRMClient } from '../../../../redux/User/07CrmClientSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from "../../../../types/User/crmClient.types";
import styles from './styles.module.css';

interface SendEmailClientsProps {
    token: string;
    selectedCrmClient: ICrmClient | undefined;      //Cliente al que se le quiere enviar un correo
    onCloseModal: () => void;                       //Cierra el modal luego de enviarle el correo al cliente
}

function SendEmailClients({ token, selectedCrmClient, onCloseModal }: SendEmailClientsProps) {
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
        if (selectedCrmClient) setEmailUserClient(selectedCrmClient?.email);
        if (token && user) {
            setEmailUser(user?.email);
            if (user?.emailProvider) setEmailProvider(user.emailProvider);
            if (user?.applicationPassword) setApplicationPasswordUser(user.applicationPassword);
        }
    }, [ token ])
    
    const sendEmail = async (values: FormData) => {
        try {
            dispatch(sendEmailCRMClient(values));
            setFormSubmitted(true);
            onCloseModal();
        } catch (error) {
            throw new Error('Error al enviar el email');
        }
    };

    return (
        <div className={`${styles.container} m-auto`}>
            <h2 className={styles.subtitle}>Información de tu cliente</h2>

            <div className={`${styles.container__Input} mb-2 d-flex align-items-center justify-content-start`}>
                <label className={`${styles.label} `} htmlFor="email">Cliente</label>
                <p className={`${styles.input__Client} m-0 p-2`}>{selectedCrmClient?.name ? selectedCrmClient?.name + ' ' + selectedCrmClient?.lastName : selectedCrmClient?.corporateName}</p>
            </div>
    
            <form onSubmit={handleSubmit((data) => {
                const formData = new FormData();
                formData.append('emailProvider', emailProvider);
                formData.append('from', emailUser);
                formData.append('applicationPassword', applicationPasswordUser);
                formData.append('to', selectedCrmClient?.email || '');
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

export default SendEmailClients;
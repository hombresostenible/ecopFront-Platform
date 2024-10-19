// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../types/UserPanel/07CrmClientSlice/crmClient.types';
import styles from './styles.module.css';

interface SeeCrmClientProps {
    selectedCrmClient: ICrmClient;
}

function SeeCrmClient({ selectedCrmClient }: SeeCrmClientProps) {

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Información del cliente</h1>

            <div className='d-flex gap-3'>
                {selectedCrmClient?.name ? (
                    <div className='d-flex gap-3 w-100'>
                        <div className="w-100">
                            <h6 className={styles.label}>Nombre del cliente</h6>
                            <p className={`${styles.input} p-2 text-start border`}>{selectedCrmClient?.name}</p>
                        </div>
                        <div className="w-100">
                            <h6 className={styles.label}>Tipo de identidad</h6>
                            <p className={`${styles.input} p-2 text-start border`}>{selectedCrmClient?.lastName}</p>
                        </div>
                    </div>
                ): (
                    <div className='d-flex gap-3'>
                        <p className={`${styles.input} p-2 text-start border`}>{selectedCrmClient?.corporateName}</p>
                    </div>
                )}
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Tipo de identidad</h6>
                <p className={`${styles.input} p-2 text-start border`}>{selectedCrmClient?.typeDocumentId}</p>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Número de identidad</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedCrmClient?.documentId}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Dígito de verificación</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedCrmClient?.verificationDigit ? selectedCrmClient?.verificationDigit : 'No asignado'}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Email</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedCrmClient?.email}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Teléfono</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedCrmClient?.phone}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Departamento</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedCrmClient?.department ? selectedCrmClient?.department : 'No definido'}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Ciudad</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedCrmClient?.city ? selectedCrmClient?.city : 'No definido'}</p>
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Dirección</h6>
                <p className={`${styles.input} p-2 text-start border`}>{selectedCrmClient?.address ? selectedCrmClient?.address : 'No definido'}</p>
            </div>
        </div>
    );
}

export default SeeCrmClient;
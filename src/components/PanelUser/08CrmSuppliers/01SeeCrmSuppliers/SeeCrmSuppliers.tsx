/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
// ELEMENTOS DEL COMPONENTE
import { ICrmSupplier } from '../../../../types/User/crmSupplier.types';
import styles from './styles.module.css';

interface SeeCrmSuppliersProps {
    selectedCrmSupplier: ICrmSupplier;
}

function SeeCrmSuppliers({ selectedCrmSupplier }: SeeCrmSuppliersProps) {

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Información del proveedor</h1>
            
            <div className='d-flex gap-3'>
                {selectedCrmSupplier?.name ? (
                    <div className='d-flex gap-3 w-100'>
                        <div className="w-100">
                            <h6 className={styles.label}>Nombre del proveedor</h6>
                            <p className={`${styles.input} p-2 text-start border`}>{selectedCrmSupplier?.name}</p>
                        </div>
                        <div className="w-100">
                            <h6 className={styles.label}>Tipo de identidad</h6>
                            <p className={`${styles.input} p-2 text-start border`}>{selectedCrmSupplier?.lastName}</p>
                        </div>
                    </div>
                ): (
                    <div className='d-flex gap-3'>
                        <p className={`${styles.input} p-2 text-start border`}>{selectedCrmSupplier?.corporateName}</p>
                    </div>
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de identidad</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedCrmSupplier?.typeDocumentId}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Número de identidad</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedCrmSupplier?.documentId}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Email</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedCrmSupplier?.email}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Teléfono</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedCrmSupplier?.phone}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Departamento</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedCrmSupplier?.department ? selectedCrmSupplier?.department : 'No definido'}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Ciudad</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedCrmSupplier?.city ? selectedCrmSupplier?.city : 'No definido'}</p>
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Dirección</h6>
                <p className={`${styles.input} p-2 text-start border`}>{selectedCrmSupplier?.address ? selectedCrmSupplier?.address : 'No definido'}</p>
            </div>
        </div>
    );
}

export default SeeCrmSuppliers;
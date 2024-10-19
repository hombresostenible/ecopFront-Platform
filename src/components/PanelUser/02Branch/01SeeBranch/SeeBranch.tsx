// ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../types/UserPanel/02Branch/branch.types';
import styles from './styles.module.css';

interface SeeBranchProps {
    selectedBranch: IBranch;
}

function SeeBranch({ selectedBranch }: SeeBranchProps) {

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Información de la sede</h1>

            <div className='d-flex gap-3'>
                <div className='d-flex gap-3 w-100'>
                    <div className="w-100">
                        <h6 className={styles.label}>Nombre del cliente</h6>
                        <p className={`${styles.input} p-2 text-start border`}>{selectedBranch.nameBranch}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Departamento</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedBranch.department}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Ciudad</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedBranch.city}</p>
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Dirección</h6>
                <p className={`${styles.input} p-2 text-start border`}>{selectedBranch.addressBranch}</p>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Email</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedBranch.contactEmailBranch}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Teléfono</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedBranch.contactPhoneBranch}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre del líder de la sede</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedBranch.nameManagerBranch}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Apellido del líder de la sede</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedBranch.lastNameManagerBranch}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de identidad</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedBranch.typeDocumentIdManager}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Número de identidad</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedBranch.documentIdManager}</p>
                </div>

            </div>
        </div>
    );
}

export default SeeBranch;
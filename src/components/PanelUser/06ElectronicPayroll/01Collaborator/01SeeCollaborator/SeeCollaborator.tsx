// ELEMENTOS DEL COMPONENTE
import { IUserPlatform } from '../../../../../types/UserPanel/06ElectronicPayroll/userPlatform.types';
import { IBranch } from '../../../../../types/UserPanel/02Branch/branch.types';
import styles from './styles.module.css';

interface SeeCrmClientProps {
    selectedUserPlatform: IUserPlatform;
    branches: IBranch[] | null;
}

function SeeCollaborator({ selectedUserPlatform, branches }: SeeCrmClientProps) {

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Información del colaborador</h1>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al colaborador</h6>
                {branches && branches.map((branch, index) => (
                    selectedUserPlatform.branchId === branch.id && (
                        <p className={`${styles.input} p-2 text-start border`} key={index}>{branch.nameBranch}</p>
                    )
                ))}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Nombres del colaborador</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedUserPlatform?.name}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Apellidos del colaborador</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedUserPlatform?.lastName}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de identidad</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedUserPlatform?.typeDocumentId}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Número de identidad</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedUserPlatform?.documentId}</p>
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Tipo de rol</h6>
                <p className={`${styles.input} p-2 text-start border`}>{selectedUserPlatform?.typeRole}</p>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Departamento</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedUserPlatform?.department}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Ciudad</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedUserPlatform?.city}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Dirección</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedUserPlatform?.address}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Teléfono</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{selectedUserPlatform?.phone}</p>
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Email</h6>
                <p className={`${styles.input} p-2 text-start border`}>{selectedUserPlatform?.email}</p>
            </div>
        </div>
    );
}

export default SeeCollaborator;
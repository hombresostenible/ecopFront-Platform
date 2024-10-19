import { IAccountsBook } from '../../../../../types/UserPanel/04Accounts/accountsBook.types';
import { IBranch } from '../../../../../types/UserPanel/02Branch/branch.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface SeeRegisterAccountsBookProps {
    accountsBook: IAccountsBook;
    branches: IBranch[] | null;
}

function SeeRegisterAccountsBook({ accountsBook, branches }: SeeRegisterAccountsBookProps) {

    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Información del registro</h1>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al registro</h6>
                <div className={styles.containerInput}>
                    <span>
                        {branches && branches.map((branch, index) => (
                            accountsBook.branchId === branch.id && (
                                <p className={`${styles.input} p-2 text-start border`} key={index}>{branch.nameBranch}</p>
                            )
                        ))}
                    </span>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Fecha de registro</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{accountsBook.registrationDate ? new Date(accountsBook.registrationDate).toISOString().split('T')[0] : ''}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Fecha de transacción</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{accountsBook.transactionDate ? new Date(accountsBook.transactionDate).toISOString().split('T')[0] : ''}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de transacción</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{accountsBook.transactionType}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de ingreso</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{accountsBook.creditCash}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Total</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>$ {formatNumber(accountsBook.totalValue)}</p> 
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Comprador</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{accountsBook.transactionCounterpartId}</p>
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Vendedor</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{accountsBook.seller ? accountsBook.seller : accountsBook.userRegister}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeeRegisterAccountsBook;
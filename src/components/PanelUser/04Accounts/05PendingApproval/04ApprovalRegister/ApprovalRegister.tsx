/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../redux/store';
import { patchApproveRecord, getUnapprovedRecords } from '../../../../../redux/User/04AccountsSlice/actions';
// ELEMENTOS DEL COMPONENTE
import styles from './styles.module.css';

interface ApprovalRegisterProps {
    token: string;
    idItem: string;
    onCloseModal: () => void;
}
function ApprovalRegister({ token, idItem, onCloseModal }: ApprovalRegisterProps) {
    const dispatch: AppDispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsByPage, setItemsByPage] = useState<number>(20);
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        try {
            dispatch(patchApproveRecord(idItem, token));
            setCurrentPage(1);
            setItemsByPage(20);
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getUnapprovedRecords(token, currentPage, itemsByPage));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al aprobar el registro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3">
            <p>¿Estás seguro de que quieres aprobar este registro?</p>
            <div className="mb-3 d-flex align-items-center justify-content-center">
                {loading ? 
                    <div>
                        <button className={`${styles.button__Submit} mx-auto border-0 rounded`} type='submit' >
                            <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Aprobando...
                        </button>
                    </div> 
                :
                    <button className={`${styles.button__Submit} m-auto border-0 rounded`} type='submit' onClick={onSubmit}>Aprobar</button>
                }
            </div> 
        </div>
    );
}

export default ApprovalRegister;
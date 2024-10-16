// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../redux/store';
import { deleteUserPlatform, getUsersPlatform } from '../../../../../redux/User/userPlatformSlice/actions';
import styles from './styles.module.css';

interface ConfirmDeleteCollaboratorProps {
    token: string;
    idUserPlatform: string;
    nameUserPlatform: string;
    onCloseModal: () => void;
}

function ConfirmDeleteCollaborator({ token, idUserPlatform, nameUserPlatform, onCloseModal }: ConfirmDeleteCollaboratorProps) {
    const dispatch: AppDispatch = useDispatch();

    const onDelete = async () => {
        try {
            dispatch(deleteUserPlatform(idUserPlatform, token));
            // Simulamos un delay de la API
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getUsersPlatform(token));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al eliminar tu colaborador');
        }
    };

    return (
        <div className="p-3">
            <p>¿Estas seguro de que quieres eliminar tu colaborador "{nameUserPlatform}"?</p>
            <div className={` d-flex mt-3`}>
                <button className={`${styles.button__Submit} m-auto border-0 rounded text-decoration-none`} onClick={onDelete} >Enviar</button>
            </div>  
        </div>
    );
}

export default ConfirmDeleteCollaborator;
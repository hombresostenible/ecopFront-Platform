import styles from './styles.module.css';

interface NotificationProps {
    type: 'success' | 'delete' | 'blocked' | 'error';
    message: string;
    onClose: () => void;
}

function Notification({ type, message, onClose }: NotificationProps) {

    return (
        <div className={`${styles.notification} ${type} d-flex align-items-center justify-content-start overflow-hidden position-absolute`}>
            <p className={`${styles[type]} m-0 p-2 d-flex align-items-center justify-content-start`}>{message}</p>
            <div className={`${styles.container__Close_Button} pt-1`}>
                <button className={`${styles.close__Button} border-0`} onClick={onClose}>X</button>
            </div>
        </div>
    );
}

export default Notification;
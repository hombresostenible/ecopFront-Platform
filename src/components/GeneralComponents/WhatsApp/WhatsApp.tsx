import logo from '../../../assets/WhatsApp.png';
import styles from "./styles.module.css";

export default function WhatsApp () {
    const phoneNumber = '573213270365';

    const handleWhatsAppClick = () => {
        const url = `whatsapp://send?phone=${phoneNumber}`;
        window.location.href = url;
    };

    return (
        <div className={`${styles.container__Whatsapp} center`}>
            <div onClick={handleWhatsAppClick} >
                <img className={`${styles.whatsapp}`} src={logo} alt="Logo WhatsApp" />
            </div>
        </div>
    );
}
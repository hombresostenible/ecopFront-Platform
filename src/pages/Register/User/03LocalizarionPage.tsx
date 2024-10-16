import { IUser } from "../../../types/User/user.types";
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import DepartmenAndCity from '../../../helpers/DepartmenAndCity/DepartmenAndCity';
import styles from './styles.module.css';

interface UserInfoSectionProps {
    register: UseFormRegister<IUser>;
    errors: FieldErrors<IUser>;
    onSelect: (department: string, city: string, codeDane: string, subregionCodeDane: string) => void;
    reset: boolean;
}

function LocalizarionPage({ register, errors, onSelect, reset }: UserInfoSectionProps) {

    return (
        <div>
            <h4 className={`${styles.tertiary__Title } text-center`}>Tus datos de contacto</h4>
            <DepartmenAndCity
                onSelect={(department, city, codeDane, subregionCodeDane) => onSelect(department, city, codeDane, subregionCodeDane)}
                reset={reset}
            />

            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Dirección</h6>
                <input
                    type="text"
                    {...register('address', { required: true })}
                    className={`${styles.input} p-2 border `}
                    placeholder='¿Cuál es tu dirección?'
                />
                {errors.address && (
                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La dirección de tu oficina es requerida</p>
                )}
            </div>

            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}>Código postal</h6>
                <input
                    type="text"
                    {...register('postalCode', {
                        maxLength: 10,
                        pattern: /^[A-Za-z0-9]{1,10}$/
                    })}
                    className={`${styles.input} p-2 border `}
                    placeholder='Si tienes código postal ¿Cuál es el código?'
                    maxLength={10}
                    onKeyDown={(e) => {
                        if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.' || e.key === ' ') {
                            e.preventDefault();
                        }
                    }}
                />
            </div>

            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Celular o teléfono fijo</h6>
                <input
                    type="tel"
                    {...register('phone', { 
                        required: true, 
                        pattern: /^\d{1,10}$/,
                        setValueAs: (value) => value.substring(0, 10)
                    })}
                    className={`${styles.input} p-2 border `}
                    placeholder='¿Cuál es el celular o teléfono fijo de tu oficina principal?'
                    maxLength={10}
                    min={0}
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/\D/g, '').substring(0, 10);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                            e.preventDefault();
                        }
                    }}
                />
                {errors.phone && (
                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El celular del usuario es requerido</p>
                )}
            </div>
        </div>
    );
}

export default LocalizarionPage;
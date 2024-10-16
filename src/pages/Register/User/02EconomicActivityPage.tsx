import { IUser } from "../../../types/User/user.types";
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import CIIUCodes from '../../../helpers/CodesCiiu/CodesCiiu';
import styles from './styles.module.css';

interface EconomicSectionProps {
    register: UseFormRegister<IUser>;
    errors: FieldErrors<IUser>;
    onSelect: (codeCiiu: string) => void;
}

function EconomicActivityPage({ register, errors, onSelect }: EconomicSectionProps) {

    return (
        <div>
            <h4 className={`${styles.tertiary__Title } text-center`}>Tu actividad económica</h4>
            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Sector económico</h6>
                <select
                    {...register('economicSector', { required: true })}
                    className={`${styles.input} p-2 border`}
                >
                    <option value='Agricultura'>Agricultura</option>
                    <option value='Manufactura'>Manufactura</option>
                    <option value='Comercio'>Comercio</option>
                    <option value='Servicios'>Servicios</option>                        
                    <option value='Construcción'>Construcción</option>
                    <option value='Turismo'>Turismo</option>
                    <option value='Otro'>Otro</option>
                </select>
                {errors.economicSector && (
                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El departamento donde opera tu negocio es requerido</p>
                )}
            </div>

            <CIIUCodes 
                onSelect={(codeCiiu) => onSelect(codeCiiu)}
            />
        </div>
    );
}

export default EconomicActivityPage;
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { clearUserErrors } from '../../redux/User/userSlice/userSlice';
// ELEMENTOS DEL COMPONENTE
import { Link } from 'react-router-dom';
import Logo from '../../assets/LogoEcopcion.svg';
import styles from './styles.module.css';

function RegisterPage() {
    // REDUX
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(clearUserErrors());
    }, [  ]);

    return (
        <div className={`${styles.container} d-flex align-items-center justify-content-center`}>
            <div className={`${styles.container__Register} d-flex flex-column align-items-center justify-content-center gap-4`}>
                <Link to="https://ecopcion.com" >
                    <img src={Logo} alt="Ecopcion" className={`${styles.logo}`} />
                </Link>

                <div className='d-flex justify-content-around text-decoration-none'>
                    <Link to="/register-user" className={`${styles.button__Submit} m-auto border-0 text-decoration-none d-flex justify-content-center align-items-center`} role="button" >
                        Usuarios
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;

    {/* <div className={`${styles.program__Funder} d-flex flex-column align-items-center justify-content-center gap-2`} >
        <p className={`${styles.text__Program_Funder} m-0 text-center`}>Si eres una Cámara de Comercio, Gremio empresarial, Agencia de Cooperación Internacional, ONG, Entidad Pública o Entidad Territorial, regístrate dando clic acá</p>
        <Link to="/register-program-funder" className='p-2'>
            <button className={`${styles.button__Program_Funder} border-0`} >Financiadores de proyectos</button>
        </Link>
    </div> */}
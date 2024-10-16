/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { getProfileUser } from '../../../redux/User/userSlice/actions';
import { logoutUser } from '../../../redux/User/userSlice/actions';
//ELEMENTOS DEL COMPONENTE
import Logo from '../../../assets/LogoEcopcion.svg';
import { SlQuestion } from "react-icons/sl";
import { CgMenuGridO } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import styles from './styles.module.css';

function NavBar() {
    const token = jsCookie.get("token");
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (token) {
            dispatch(getProfileUser(token));
        }
    }, [token, dispatch]);

    const menuQuestionRef = useRef<HTMLDivElement | null>(null);
    const [menuQuestionVisible, setMenuQuestionVisible] = useState(false);
    const handleQuestionClick = () => {
        setMenuQuestionVisible(!menuQuestionVisible);
    };

    const menuServiceRef = useRef<HTMLDivElement | null>(null);
    const [menuServiceVisible, setMenuServiceVisible] = useState(false);
    const handleServiceClick = () => {
        setMenuServiceVisible(!menuServiceVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuQuestionRef.current && !menuQuestionRef.current.contains(event.target as Node)) {
                setMenuQuestionVisible(false);
            }
            if (menuServiceRef.current && !menuServiceRef.current.contains(event.target as Node)) {
                setMenuServiceVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ menuQuestionRef, menuServiceRef ]);

    const signout = async () => {
        try {
            dispatch(logoutUser());
        } catch (error) {
            throw new Error('Error al hacer el cierre de sesión');
        }
    };

    return (
        <div className={`${styles.container} px-2 d-flex align-items-center justify-content-between`}>
            <div className={styles.container__Logo}>
                <Link to="/home" className="text-center">
                    <img src={Logo} alt="Ecopcion" className={`${styles.logo} m-auto`} />
                </Link>
            </div>

            <div className={`${styles.container__Navigation} d-flex`}>
                <div className={`${styles.container__Services} d-flex align-items-center justify-content-center position-relative`}>
                    <SlQuestion className={`${menuQuestionVisible ? styles.hover__Icon_Question : styles.icon__Question} `} onClick={handleQuestionClick} />
                </div>
                {menuQuestionVisible && (
                    <div ref={menuQuestionRef} className={`${styles.menu} p-3 d-flex flex-column align-items-start position-absolute`}>
                        <h6 className={`${styles.title__Sub_Menu} `}>Preguntas</h6>
                        <Link to='/questions/information-manage-your-business' className={`${styles.link__NavBar} text-decoration-none ${location.pathname === '/questions/information-manage-your-business' ? styles.active : ''} `}>Información clave para gerenciar tu negocio</Link>
                        <Link to='/questions/support-contact' className={`${styles.link__NavBar} text-decoration-none ${location.pathname === '/questions/support-contact' ? styles.active : ''}`}>Contacta con soporte</Link>
                        <Link to='/questions/operation-platform' className={`${styles.link__NavBar} text-decoration-none ${location.pathname === '/questions/operation-platform' ? styles.active : ''} `}>Funcionamiento de la plataforma</Link>
                        <Link to='/questions/prepare-for-billing' className={`${styles.link__NavBar} text-decoration-none ${location.pathname === '/questions/prepare-for-billing' ? styles.active : ''} `}>Prepárate para facturar</Link>
                    </div>
                )}

                <div className={`${styles.container__Services} d-flex align-items-center justify-content-center position-relative`}>
                    <CgMenuGridO className={`${menuServiceVisible ? styles.hover__Icon_Services : styles.icon__Services} `} onClick={handleServiceClick} />
                </div>
                {menuServiceVisible && (
                    <div ref={menuServiceRef} className={`${styles.menu} p-3 d-flex flex-column align-items-start position-absolute`}>
                        <h6 className={`${styles.title__Sub_Menu} `}>Planes</h6>
                        <Link to='/services/activate-new-plans' className={`${styles.link__NavBar} text-decoration-none ${location.pathname === '/services/activate-new-plans' ? styles.active : ''}`}>Activa nuevos planes</Link>
                    </div>
                )}

                <Link to="/notifications" className={`${styles.container__Notification} d-flex align-items-center justify-content-center position-relative text-decoration-none`}>
                    <IoNotificationsOutline className={`${styles.icon__Notification} `}/>
                    <div className={`${styles.notification} d-flex align-items-center justify-content-center position-absolute`}>
                        5
                    </div>
                </Link>

                <div className={`${styles.container__Configuration} d-flex align-items-center justify-content-center`}>
                    <Link to="/configuration/profile" className={`${styles.icon__Configuration} d-flex align-items-center justify-content-center overflow-hidden`}>
                        <img src={user?.logo} alt="Logo" className={`${styles.logo__User} `}/>
                    </Link>
                </div>

                <Link to="/login" onClick={() => { signout() }} className={`${styles.container__Logout} d-flex align-items-center justify-content-center`}>
                    <GoSignOut className={`${styles.icon__Logout} m-2`}/>
                </Link>
            </div>
        </div>
    );
}

export default NavBar;
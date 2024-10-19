/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getProfileUser, putPutProfileUser, logoChangeUser, deleteLogoUser } from '../../../../../redux/User/userSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IUser } from '../../../../../types/User/user.types';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import DepartmenAndCity from '../../../../../helpers/DepartmenAndCity/DepartmenAndCity';
import { BsPencil } from 'react-icons/bs';
import styles from './styles.module.css';

function ProfileUserPage() {
    const location = useLocation();
    const token = jsCookie.get('token') || '';

    //REDUX
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    const [isEditing, setIsEditing] = useState(false);
    const [userLogo, setUserLogo] = useState<string | null>(null);
    const [editedUser, setEditedUser] = useState({ ...user });
    const [editedtypeDocumentId, setEditedtypeDocumentId] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCity, setSelectedCity] = useState(''); 
    const [selectedCodeDane, setSelectedCodeDane] = useState('');
    const [selectedSubregionCodeDane, setSelectedSubregionCodeDane] = useState('');
    const [resetDepartmenAndCity, setResetDepartmenAndCity] = useState(false);
    const handleSelectDepartmentAndCity = (department: string, city: string, codeDane: string, subregionCodeDane: string) => {
        setSelectedDepartment(department);
        setSelectedCity(city);
        setSelectedCodeDane(codeDane);
        setSelectedSubregionCodeDane(subregionCodeDane);
    };
    const [editedEconomicSector, setEditedEconomicSector] = useState(user?.economicSector);
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    
    useEffect(() => {
        if (token) dispatch(getProfileUser(token));
    }, [token]);

    useEffect(() => {
        if (user?.logo) setUserLogo(user.logo);
        if (user) {
            setEditedtypeDocumentId(user.typeDocumentId);
            setSelectedDepartment(user.department);
            setSelectedCity(user.city);
        }
    }, [user]);

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string,
        dataType: 'text' | 'number' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedUser((prevEditedUser) => ({
                    ...prevEditedUser,
                    [field]: numericValue,
                }));
            }
        } else {
            setEditedUser((prevEditedUser) => ({
                ...prevEditedUser,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (editedUser: IUser) => {
        try {
            editedUser.typeDocumentId = editedtypeDocumentId as IUser['typeDocumentId'];
            editedUser.department = selectedDepartment as IUser['department'];
            editedUser.city = selectedCity;
            editedUser.codeDane = selectedCodeDane;
            editedUser.subregionCodeDane = selectedSubregionCodeDane;
            editedUser.economicSector = editedEconomicSector;
            dispatch(putPutProfileUser(editedUser, token));
            dispatch(getProfileUser(token));
            setResetDepartmenAndCity(true);
            setIsEditing(false);
        } catch (error) {
            throw new Error('Error al guardar cambios');
        }
    };

    const cancelEditing = () => {
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setMenuVisible(!menuVisible);
    };

    const handleMenuOptionClick = async (option: string) => {
        if (option === 'CargarImagen') {
            setSelectedImage(null);
            setMenuVisible(false);
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = (e: any) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                    setSelectedImage(file);
                    handleUploadImage(file);
                }
            };
            fileInput.click();
        } else if (option === 'EliminarImagen') {
            try {
                await dispatch(deleteLogoUser(token));
                // Simulamos un delay de la API
                await new Promise(resolve => setTimeout(resolve, 500));
                await dispatch(getProfileUser(token));
                setUserLogo(null);
            } catch (error) {
                throw new Error('Error al eliminar la imagen');
            }
            setMenuVisible(false);
        }
    };


    const menuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ menuRef ]);

    const handleUploadImage = async (image: File) => {
        try {
            const formData = new FormData();
            formData.append("file", image);
            //NOTA: Para guardar las imágenes en una carpeta en especial, debo de crearla en Cloudinary y actualizar esa carpeta en el preset:
            //https://console.cloudinary.com/settings/c-bca001092476ab04ce992efda02d0c/upload_presets/1cac495dfbca9fc61f64efcd83acd244/edit
            formData.append("upload_preset", "profiles");   // Asegúrate de que este preset esté configurado en Cloudinary
            formData.append("folder", "profiles");          // Especifica la carpeta en la que quieres guardar la imagen
            const response = await axios.post(import.meta.env.VITE_CLOUDINARY, formData);
            const imageUrl = response.data.secure_url;
            const userData: Partial<IUser> = {
                logo: imageUrl,
            };
            dispatch(logoChangeUser(userData, token));
            // Simulamos un delay de la API
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getProfileUser(token));
        } catch (error) {
            throw new Error('Error al cargar la imagen');
        }
    };

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} p-4 overflow-y-auto`}>
                        <div className={`${styles.container__Navigation} mb-4 d-flex flex-wrap gap-2`}>
                            <Link to={'/configuration/profile'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/profile' ? styles.active : ''} `}>Perfil</Link>
                            {/* <Link to={'/configuration/your-current-plan'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/your-current-plan' ? styles.active : ''} `}>Tu plan actual</Link> */}
                            <Link to={'/configuration/mail-configuration'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/mail-configuration' ? styles.active : ''} `}>Configuración de correo</Link>
                            {/* <Link to={'/configuration/billing-configuration'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/billing-configuration/' ? styles.active : ''} `}>Configuración de facturación</Link> */}
                            {/* <Link to={'/configuration/role-information'} className={` ${styles.component} d-flex align-items-center justify-content-center text-decoration-none ${location.pathname === '/configuration/role-information' ? styles.active : ''} `}>Información de roles</Link> */}
                        </div>

                        <h1 className={`${styles.title} mb-4`}>Tu información de perfil</h1>
                        <div className={`${styles.container__Card} m-auto d-flex flex-column align-items-center justify-content-center position-relative`}>
                            <div className={`${styles.container__Image_Icon} mb-4 position-relative r d-flex align-items-center justify-content-center`}>
                                <div>
                                    {userLogo && (
                                        <img className={`${styles.logo} `} src={userLogo} alt="Logo del usuario" />
                                    )}
                                    {!userLogo && (
                                        <div className={styles.container__Text_Logo}>
                                            <p className="m-0 text-center">No tienes un logo para mostrar</p>
                                        </div>
                                    )}
                                </div>
                                <div className={`${styles.container__Image} `}>
                                    <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center position-absolute`} onClick={handleEditClick} >
                                        <BsPencil className={`${styles.iconLogo} `} />
                                    </div>
                                    {menuVisible && (
                                        <div ref={menuRef} className={`${styles.menu} d-flex align-items-center justify-content-center position-absolute`}>
                                            {selectedImage ? (
                                                <div>       {/* Si hay una imagen seleccionada, mostrar "Cambiar imagen" y "Eliminar imagen" */}
                                                    <button className={`${styles.text__Menu} border-0`} onClick={() => handleUploadImage(selectedImage)}>Cambiar imagen</button>
                                                    <button className={`${styles.text__Menu} border-0`} onClick={() => handleMenuOptionClick('EliminarImagen')}>Eliminar imagen</button>
                                                </div>
                                            ) : (
                                                <div>       {/* Si no hay imagen, mostrar solo "Cargar imagen" */}
                                                    <div className={styles.text__Menu} onClick={() => handleMenuOptionClick('CargarImagen')}>Cargar imagen</div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-2 w-100">
                                <p className={`${styles.label} mb-1`}>Nombres</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className={`${styles.input} mb-2 p-2 border`}
                                        value={editedUser.name}
                                        onChange={(e) => handleEditField(e, 'name', 'text')}
                                    />
                                ) : (
                                    <p className={`${styles.input} p-2 text-start border`}>{user?.name}</p>
                                )}
                            </div>

                            <div className="mb-2 w-100">
                                <p className={`${styles.label} mb-1`}>Apellidos</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className={`${styles.input} mb-2 p-2 border`}
                                        value={editedUser.lastName}
                                        onChange={(e) => handleEditField(e, 'lastName', 'text')}
                                    />
                                ) : (
                                    <p className={`${styles.input} p-2 text-start border`}>{user?.lastName}</p>
                                )}
                            </div>

                            <div className="mb-2 w-100">
                                <p className={`${styles.label} mb-1`}>Tipo de identificación</p>
                                {isEditing ? (
                                    <select
                                        value={editedtypeDocumentId || ''}
                                        className={`${styles.input} mb-2 p-2 border`}
                                        onChange={(e) => setEditedtypeDocumentId(e.target.value as 'NIT' | 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte')}
                                    >
                                        <option value='NIT'>Cédula de Ciudadanía</option>
                                        <option value='Cedula de Ciudadania'>Cédula de Ciudadanía</option>
                                        <option value='Cedula de Extranjeria'>Cédula de Extranjería</option>
                                        <option value='Pasaporte'>Pasaporte</option>
                                    </select>
                                ) : (
                                    <p className={`${styles.input} p-2 text-start border`}>{user?.typeDocumentId}</p>
                                )}
                            </div>

                            <div className="d-flex align-items-center justify-content-center w-100 gap-2">
                                <div className="mb-2 w-100">
                                    <p className={`${styles.label} mb-1`}>Identificación</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedUser.documentId || ''}
                                            className={`${styles.input} mb-2 p-2 border`}
                                            onChange={(e) => handleEditField(e, 'documentId', 'text')}
                                        />
                                    ) : (
                                        <p className={`${styles.input} p-2 text-start border`}>{user?.documentId}</p>
                                    )}
                                </div>
                                <div className="mb-2 w-100">
                                    <p className={`${styles.label} mb-1`}>Dígito de verificación</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className={`${styles.input} mb-2 p-2 border`}
                                            value={editedUser.verificationDigit || ''}
                                            onChange={(e) => handleEditField(e, 'verificationDigit', 'text')}
                                        />
                                    ) : (
                                        <p className={`${styles.input} p-2 text-start border`}>{user?.verificationDigit ? user?.verificationDigit : 'No asignado aún'}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-2 w-100">
                                <p className={`${styles.label} mb-1`}>Nombre comercial de tu empresa</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className={`${styles.input} mb-2 p-2 border`}
                                        value={editedUser.corporateName || ''}
                                        onChange={(e) => handleEditField(e, 'corporateName', 'text')}
                                        placeholder='Nombre comercial de tu empresa'
                                    />
                                ) : (
                                    <p className={`${styles.input} p-2 text-start border`}>{user?.corporateName ? user?.corporateName : 'No asignado aún'}</p>
                                )}
                            </div>

                            <div className="mb-2 w-100">
                                <p className={`${styles.label} mb-1`}>Email</p>
                                <p className={`${styles.input} p-2 text-start border`}>{user?.email || ''}</p>
                            </div>

                            <div className="mb-2 w-100">
                                <p className={`${styles.label} mb-1`}>Rol del usuario</p>
                                <p className={`${styles.input} p-2 text-start border`}>{user?.typeRole || ''}</p>
                            </div>

                            <div className="mb-2 w-100">
                                <p className={`${styles.label} mb-1`}>Celular</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className={`${styles.input} mb-2 p-2 border`}
                                        value={editedUser.phone || ''}
                                        onChange={(e) => handleEditField(e, 'phone', 'text')}
                                    />
                                ) : (
                                    <p className={`${styles.input} p-2 text-start border`}>{user?.phone}</p>
                                )}
                            </div>

                            <div className="mb-2 w-100">
                                {isEditing ? (
                                    <DepartmenAndCity
                                        onSelect={handleSelectDepartmentAndCity}
                                        reset={resetDepartmenAndCity}
                                        initialDepartment={selectedDepartment}
                                        initialCity={selectedCity}
                                    />
                                ) : (
                                    <div className='d-flex gap-3 w-100'>
                                        <div className="w-100">
                                            <p className={styles.label}>Departamento</p>
                                            <div className={styles.container__Input}>
                                                <p className={`${styles.input} p-2 text-start border`}>{user?.department}</p>
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <p className={styles.label}>Ciudad</p>
                                            <div className={styles.container__Input}>
                                                <p className={`${styles.input} p-2 text-start border`}>{user?.city}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-2 w-100">
                                <p className={`${styles.label} mb-1`}>Dirección</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className={`${styles.input} mb-2 p-2 border`}
                                        value={editedUser.address || ''}
                                        onChange={(e) => handleEditField(e, 'address', 'text')}
                                    />
                                ) : (
                                    <p className={`${styles.input} p-2 text-start border`}>{user?.address}</p>
                                )}
                            </div>

                            <div className="mb-2 w-100">
                                <p className={`${styles.label} mb-1`}>Sector económico</p>
                                {isEditing ? (
                                    <select
                                        value={editedEconomicSector || ''}
                                        className={`${styles.input} mb-2 p-2 border`}
                                        onChange={(e) => setEditedEconomicSector(e.target.value as 'Agricultura' | 'Manufactura' | 'Comercio' | 'Servicios' | 'Construcción' | 'Turismo' | 'Otro')}
                                    >
                                        <option value='Agricultura'>Agricultura</option>
                                        <option value='Manufactura'>Manufactura</option>
                                        <option value='Comercio'>Comercio</option>
                                        <option value='Servicios'>Servicios</option>
                                        <option value='Construcción'>Construcción</option>
                                        <option value='Comercio'>Comercio</option>
                                        <option value='Turismo'>Turismo</option>
                                        <option value='Otro'>Otro</option>
                                    </select>
                                ) : (
                                    <p className={`${styles.input} p-2 text-start border`}>{user?.economicSector}</p>
                                )}
                            </div>

                            <div className="mb-2 w-100">
                                {isEditing ? (
                                    <div className="d-flex align-items-center justify-content-center">
                                        <button className={`${styles.button__Save} mx-2 pt-1 pb-1 px-2 border-0`} onClick={() => {handleSaveChanges(editedUser as IUser);}}>Guardar</button>
                                        <button className={`${styles.button__Cancel} mx-2 pt-1 pb-1 px-2 border-0`} onClick={() => cancelEditing()}>Cancelar</button>
                                    </div>
                                ) : (
                                    <div
                                        className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                        onClick={() => {
                                            setEditedUser({ ...user });
                                            setIsEditing(true);
                                        }}
                                    >
                                        <p className='m-0'>Edita tu información</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ProfileUserPage;
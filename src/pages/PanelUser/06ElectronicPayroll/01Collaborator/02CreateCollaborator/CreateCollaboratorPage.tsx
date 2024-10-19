/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store.ts';
import { postUserPlatform, getUsersPlatform } from '../../../../../redux/User/userPlatformSlice/actions.ts';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions.ts';
// ELEMENTOS DEL COMPONENTE
import { IUserPlatform } from '../../../../../types/UserPanel/06ElectronicPayroll/userPlatform.types.ts';
import { IBranch } from '../../../../../types/UserPanel/02Branch/branch.types.ts';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer.tsx';
import CreateManyCollaborators from '../../../../../components/PanelUser/06ElectronicPayroll/01Collaborator/CreateManyCollaborator/CreateManyCollaborator.tsx';
import DepartmenAndCity from '../../../../../helpers/DepartmenAndCity/DepartmenAndCity.tsx';
import { FaPlus } from "react-icons/fa6";
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import styles from './styles.module.css';

interface CreateCollaboratorPageProps {
    addNotification: (type: 'success' | 'error', message: string) => void;
}

function CreateCollaboratorPage({ addNotification }: CreateCollaboratorPageProps) {
    const token = jsCookie.get('token') || '';
    const navigate = useNavigate();
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorUserPlatform = useSelector((state: RootState) => state.usersPlatform.errorUserPlatform);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IUserPlatform>();
    const [loading, setLoading] = useState(false);
    
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
        }
    }, [token, dispatch]);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const onCloseCrmClientModal = () => {
        setShowCancelModal(false);
    };

    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCodeDane, setSelectedCodeDane] = useState('');
    const [selectedsubregionCodeDane, setSelectedsubregionCodeDane] = useState('');
    const [resetDepartmenAndCity, setResetDepartmenAndCity] = useState(false);    //Estado para resetear el componente "DepartmenAndCity" luego de crear el registro
    // Función para manejar los datos seleccionados del departamento y los municipios
    const handleSelectDepartmentAndCity = (department: string, city: string, codeDane: string, subregionCodeDane: string) => {
        setSelectedDepartment(department);
        setSelectedCity(city);
        setSelectedCodeDane(codeDane);
        setSelectedsubregionCodeDane(subregionCodeDane);
    };

    const [ showPassword, setShowPassword ] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const onSubmit = async (values: IUserPlatform) => {
        setLoading(true);
        try {
            const formData = {
                ...values,
                // entityUserId: userId,
                department: selectedDepartment,
                city: selectedCity,
                codeDane: selectedCodeDane,
                subregionCodeDane: selectedsubregionCodeDane,
            } as IUserPlatform;
            await dispatch(postUserPlatform(formData, token));
            setFormSubmitted(true);    
            reset();
            setTimeout(() => {
                dispatch(getUsersPlatform(token));
                setFormSubmitted(false);
                addNotification('success', 'Colaborador creado exitosamente!');
                setShouldNavigate(true);
                setResetDepartmenAndCity(true);
                setTimeout(() => {
                    setResetDepartmenAndCity(false);
                }, 10); // Se reinicia después de un corto período para asegurarse de que el reset haya tenido efecto
            }, 1500);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/electronic-payroll/consult-collaborators');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus colaboradores</h1>

                        <div className={`${styles.container__Navigate_Inventories} mb-4 d-flex align-items-center justify-content-between`}>
                            <Link to='/electronic-payroll/consult-collaborators' className={`${styles.link__Consult_Inventory} text-decoration-none`}>Consulta tus colaboradores</Link>
                            <div className={`${styles.link__Head_Navigate} d-flex align-items-center justify-content-between`}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <div className={`${styles.button__Bulk_Create} `} onClick={() => { setShowCancelModal(true) }} >Crea tus colaboradores de forma masiva</div>
                            </div>
                        </div>

                        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                                <Modal.Title className='text-primary-emphasis text-start'>Crea tus colaboradores de forma masiva</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateManyCollaborators
                                    branches={branches}
                                    token={token}
                                    onCreateComplete={() => {
                                        onCloseCrmClientModal();
                                    }}
                                />
                            </Modal.Body>
                        </Modal>
                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}
                            {Array.isArray(errorUserPlatform) && errorUserPlatform?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}

                            <div className="w-100 position-relative">
                                <p className={`${styles.label} `}><span className={`${styles.required__Information} `}>*</span> Selecciona una Sede</p>
                                <select
                                    {...register('branchId', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                >
                                    <option value=''>Selecciona una Sede</option>
                                    {Array.isArray(branches) && branches.map((branch: IBranch, index: number) => (
                                        <option key={index} value={branch.id}>
                                            {branch.nameBranch}
                                        </option>
                                    ))}
                                </select>
                                {errors.branchId && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La Sede es requerida</p>
                                )}
                            </div>

                            <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Nombres de tu colaboradores</h6>
                                    <input
                                        type="text"
                                        {...register('name')}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='Nombres de tu colaboradores'
                                    />
                                    {errors.name && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>Los nombres de tu colaboradores son requeridos</p>
                                    )}
                                </div>
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Apellidos de tu colaboradores</h6>
                                    <input
                                        type="text"
                                        {...register('lastName')}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='Apellidos de tu colaboradores'
                                    />
                                    {errors.lastName && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>Los apellidos de tu colaboradores son requeridos</p>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Tipo de identificación</h6>
                                    <select
                                        {...register('typeDocumentId', { required: true })}
                                        className={`${styles.input} p-2 border`}
                                    >
                                        <option value='Cedula de Ciudadania'>Cédula de Ciudadania</option>
                                        <option value='Cedula de Extranjeria'>Cédula de Extranjeria</option>
                                        <option value='Pasaporte'>Pasaporte</option>
                                    </select>
                                    {errors.typeDocumentId && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de documento del proveedor es requerido</p>
                                    )}
                                </div>
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Número de identificación</h6>
                                    <input
                                        type="text"
                                        {...register('documentId', { 
                                            required: true,
                                            pattern: /^\d{1,10}$/
                                        })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='¿Cuál es el número de identificación de tu colaborador?'
                                        maxLength={10}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.' || e.key === ' ') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {errors.documentId && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El número de identidad es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Tipo de rol</h6>
                                <select
                                    {...register('typeRole', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                >
                                    <option value='Superadmin'>Superadmin</option>
                                    <option value='Administrador'>Administrador</option>
                                    <option value='Vendedor'>Vendedor</option>
                                    <option value='Cajero'>Cajero</option>
                                    <option value='Operativo'>Operativo</option>
                                    <option value='Contador'>Contador</option>
                                </select>
                                {errors.typeRole && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de rol del colaborador es requerido</p>
                                )}
                            </div>

                            <DepartmenAndCity
                                onSelect={handleSelectDepartmentAndCity}
                                reset={resetDepartmenAndCity}
                            />

                            <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Dirección</h6>
                                    <input
                                        type="text"
                                        {...register('address')}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='Dirección'
                                    />
                                    {errors.address && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>La dirección son requeridos</p>
                                    )}
                                </div>
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Celular o teléfono del colaborador</h6>
                                    <input
                                        type="tel"
                                        {...register('phone', { 
                                            required: true, 
                                            pattern: /^\d{1,10}$/,
                                            setValueAs: (value) => value.substring(0, 10)
                                        })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='Celular o teléfono del colaborador'
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
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El celular o teléfono del colaborador son requeridos</p>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Email</h6>
                                    <input
                                        type="email"
                                        {...register('email', {
                                            required: `El email es requerido`,
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: `El formato del email no es válido`
                                            }
                                        })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder={`¿Cuál es tu email?`}
                                    />
                                    {errors.email && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>{errors.email.message}</p>
                                    )}
                                </div>

                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Contraseña</h6>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register('password', { required: true })}
                                        className={`${styles.input} p-2 border `}
                                        placeholder='¿Cuál es tu contraseña?'
                                    />
                                    {showPassword ? (
                                        <RiEyeOffFill className={`${styles.icon} position-absolute`} onClick={toggleShowPassword} />
                                    ) : (
                                        <RiEyeFill className={`${styles.icon} position-absolute`} onClick={toggleShowPassword} />
                                    )}
                                    {errors.password && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>La contraseña es requerida</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3 d-flex align-items-center justify-content-center">
                                {loading ? 
                                    <div>
                                        <button className={`${styles.button__Submit} mx-auto border-0 rounded`} type='submit' >
                                            <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Guardando...
                                        </button>
                                    </div> 
                                :
                                    <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit' >Enviar</button>
                                }
                            </div>
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CreateCollaboratorPage;
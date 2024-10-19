/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { postBranch, getBranches } from '../../../../redux/User/02BranchSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../types/UserPanel/02Branch/branch.types.ts';
import NavBar from '../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../components/PanelUser/Footer/Footer';
import CreateManyBranches from '../../../../components/PanelUser/02Branch/CreateManyBranches/CreateManyBranches';
// import Loading from '../../../../../components/Loading/Loading';
import DepartmenAndCity from '../../../../helpers/DepartmenAndCity/DepartmenAndCity';
import { FaPlus } from "react-icons/fa6";
import styles from './styles.module.css';

interface CreateBranchProps {
    addNotification: (type: 'success' | 'error', message: string) => void;
}

function CreateBranchPage({ addNotification }: CreateBranchProps) {
    const token = jsCookie.get('token') || '';
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);

    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorBranch = useSelector((state: RootState) => state.branch.errorBranch);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IBranch>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const onCloseBranchModal = () => {
        setShowCancelModal(false);
    };

    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCodeDane, setSelectedCodeDane] = useState('');
    const [selectedsubregionCodeDane, setSelectedsubregionCodeDane] = useState('');
    const [resetDepartmenAndCity, setResetDepartmenAndCity] = useState(false);
    // Función para manejar los datos seleccionados del departamento y los municipios
    const handleSelectDepartmentAndCity = (department: string, city: string, codeDane: string, subregionCodeDane: string) => {
        setSelectedDepartment(department);
        setSelectedCity(city);
        setSelectedCodeDane(codeDane);
        setSelectedsubregionCodeDane(subregionCodeDane);
    };
    
    const onSubmit = async (values: IBranch) => {
        setLoading(true);
        try {
            const formData = {
                ...values,
                department: selectedDepartment,
                city: selectedCity,
                codeDane: selectedCodeDane,
                subregionCodeDane: selectedsubregionCodeDane,
            } as IBranch;
            await dispatch(postBranch(formData, token));
            setFormSubmitted(true);    
            reset();
            setTimeout(() => {
                dispatch(getBranches(token));
                setFormSubmitted(false);
                setShouldNavigate(true);
                addNotification('success', 'Sede creada exitosamente!');
                setResetDepartmenAndCity(true);
                setTimeout(() => {
                    setResetDepartmenAndCity(false);
                }, 10);
            }, 1500);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (shouldNavigate) navigate('/branches/consult-branches');
    }, [ shouldNavigate, navigate ]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus sedes</h1>

                        <div className='mb-4 d-flex align-items-center justify-content-between'>
                            <Link to='/branches/consult-branches' className={`${styles.link__Head_Navigate} text-decoration-none`}>Consultar tus sedes</Link>
                            <div className={`${styles.container__Bulk_Create} d-flex align-items-center justify-content-between`}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <div className={`${styles.button__Bulk_Create} `} onClick={() => { setShowCancelModal(true) }} >Crea tus sedes de forma masiva</div>
                            </div>
                        </div>

                        <p>Acá podrás crear tus sedes, que son las unidades de negocio que tienes abiertas, cada colaborador, activo, mercancía, producto, etc, estará ligado a cada sede, de esta forma se te facilitará el entendimiento de tu negocio en aspectos como ingresos, inventarios y demás</p>
                        
                        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                                <Modal.Title className='text-primary-emphasis text-start'>Crea tus sedes de forma masiva</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateManyBranches
                                    token={token}
                                    onCreateComplete={() => {
                                        onCloseBranchModal();
                                    }}
                                />
                            </Modal.Body>
                        </Modal>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} m-auto d-flex flex-column align-items-center justify-content-center position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}
                            {Array.isArray(errorBranch)&& errorBranch?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> Nombre de la Sede</p>
                                <input
                                    type="text"
                                    {...register('nameBranch', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Nombre de la Sede'
                                />
                                {errors.nameBranch && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre de la sede es requerido</p>
                                )}
                            </div>

                            <DepartmenAndCity
                                onSelect={handleSelectDepartmentAndCity}
                                reset={resetDepartmenAndCity}
                            />

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> Dirección de la Sede</p>
                                <input
                                    type="text"
                                    {...register('addressBranch', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Dirección de la Sede'
                                />
                                {errors.addressBranch && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La dirección de la Sede es requerida</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> Email de la Sede</p>
                                <input
                                    type="email"
                                    {...register('contactEmailBranch', {
                                        required: `El email es requerido`,
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: `El formato del email no es válido`
                                        }
                                    })}
                                    className={`${styles.input} p-2 border `}
                                    placeholder={`¿Cuál es tu email?`}
                                />
                                {errors.contactEmailBranch && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>{errors.contactEmailBranch.message}</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> Número telefónico de la Sede</p>
                                <input
                                    type="tel"
                                    {...register('contactPhoneBranch', { 
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
                                {errors.contactPhoneBranch && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El celular del usuario es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> Nombre del gerente de la Sede</p>
                                <input
                                    type="text"
                                    {...register('nameManagerBranch', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Nombre del gerente de la Sede'
                                />
                                {errors.nameManagerBranch && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre del gerente de la Sede es requerido</p>
                                )}
                            </div>
                            
                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> Apellido del gerente de la Sede</p>
                                <input
                                    type="text"
                                    {...register('lastNameManagerBranch', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Apellido del gerente de la Sede'
                                />
                                {errors.lastNameManagerBranch && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El apellido del gerente de la Sede es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> Tipo de identificación del Gerente de la Sede</p>
                                <select
                                    {...register('typeDocumentIdManager', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                >
                                    <option value='Cedula de Ciudadania'>Cedula de Ciudadania</option>
                                    <option value='Cedula de Extranjeria'>Cedula de Extranjeria</option>
                                    <option value='Pasaporte'>Pasaporte</option>
                                </select>
                                {errors.typeDocumentIdManager && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de identidad del Gerente de la Sede es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} mb-1`}><span className={`${styles.required__Information} `}>*</span> Número de identidad del Gerente de la Sede</p>
                                <input
                                    type="text"
                                    {...register('documentIdManager', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Número de identidad del Gerente de la Sede'
                                />
                                {errors.documentIdManager && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El número de identidad del Gerente de la Sede es requerido</p>
                                )}
                            </div>

                            <div className="mb-5 d-flex">
                                {loading ? 
                                    <div className={`${styles.container__Loading} `}>
                                        <button className={`${styles.button__Submit} border-0 mx-auto rounded m-auto text-decoration-none`} type='submit' >
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
    )
}

export default CreateBranchPage;
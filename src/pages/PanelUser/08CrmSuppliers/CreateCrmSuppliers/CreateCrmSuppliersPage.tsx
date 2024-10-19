/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { postCrmSupplier, getCrmSuppliers } from '../../../../redux/User/08CrmSupplierSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmSupplier } from '../../../../types/UserPanel/08CrmSupplierSlice/crmSupplier.types.ts';
import NavBar from '../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../components/PanelUser/Footer/Footer';
import CreateManySuppliers from '../../../../components/PanelUser/08CrmSuppliers/CreateManySuppliers/CreateManySuppliers.tsx';
import DepartmenAndCity from '../../../../helpers/DepartmenAndCity/DepartmenAndCity';
import { FaPlus } from "react-icons/fa6";
import styles from './styles.module.css';

interface CreateCrmSupplierPageProps {
    addNotification: (type: 'success' | 'error', message: string) => void;
}

function CreateCrmSupplierPage({ addNotification }: CreateCrmSupplierPageProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    // Estado de Redux
    const errorCrmSupplier = useSelector((state: RootState) => state.crmSupplier.errorCrmSupplier);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ICrmSupplier>();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const onCloseCrmSupplierModal = () => {
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
    
    const [typeDocumentId, setTypeDocumentId] = useState('NIT');
    const handleTypeDocumentIdChange = (event: { target: { value: SetStateAction<string> }}) => {
        setTypeDocumentId(event.target.value);
    };

    const onSubmit = async (values: ICrmSupplier) => {
        setLoading(true);
        try {
            const formData = {
                ...values,
                // entityUserId: userId,
                department: selectedDepartment,
                city: selectedCity,
                codeDane: selectedCodeDane,
                subregionCodeDane: selectedsubregionCodeDane,
            } as ICrmSupplier;
            
            await dispatch(postCrmSupplier(formData, token));
            setFormSubmitted(true);    
            reset();
            setTimeout(() => {
                dispatch(getCrmSuppliers(token));
                setFormSubmitted(false);
                setShouldNavigate(true);
                addNotification('success', 'Proveedor creado exitosamente!');
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
        if (shouldNavigate) {
            navigate('/crm-suppliers/consult-crm-suppliers');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus proveedores</h1>

                        <div className={`${styles.container__Navigate_Inventories} mb-4 d-flex align-items-center justify-content-between`}>
                            <Link to='/crm-suppliers/consult-crm-suppliers' className={`${styles.link__Consult_Inventory} text-decoration-none`}>Consulta tus proveedores</Link>
                            <div className={`${styles.link__Head_Navigate} d-flex align-items-center justify-content-between`}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <div className={`${styles.button__Bulk_Create} `} onClick={() => { setShowCancelModal(true) }} >Crea tus proveedores de forma masiva</div>
                            </div>
                        </div>

                        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                                <Modal.Title className='text-primary-emphasis text-start'>Crea tus proveedores de forma masiva</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateManySuppliers
                                    token={token}
                                    onCreateComplete={() => {
                                        onCloseCrmSupplierModal();
                                    }}
                                />
                            </Modal.Body>
                        </Modal>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}
                            {Array.isArray(errorCrmSupplier) && errorCrmSupplier?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}

                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Tipo de identificación</h6>
                                <select
                                    {...register('typeDocumentId', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                    onChange={handleTypeDocumentIdChange}
                                >
                                    <option value='NIT' translate="no">NIT</option>
                                    <option value='Cedula de Ciudadania'>Cedula de Ciudadania</option>
                                    <option value='Cedula de Extranjeria'>Cedula de Extranjeria</option>
                                    <option value='Pasaporte'>Pasaporte</option>
                                </select>
                                {errors.typeDocumentId && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de documento del proveedor es requerido</p>
                                )}
                            </div>

                            <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Número de identificación</h6>
                                    <input
                                        type="text"
                                        {...register('documentId')}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='¿Cuál es el número de identificación de tu proveedor?'
                                    />
                                    {errors.documentId && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El número de identidad es requerido</p>
                                    )}
                                </div>
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}>Dígito de verificación</h6>
                                    <input
                                        type="text"
                                        {...register('verificationDigit')}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='¿Cuál es el número de identificación?'
                                    />
                                </div>
                            </div>

                            {(typeDocumentId === 'Cedula de Ciudadania' || typeDocumentId === 'Cedula de Extranjeria' || typeDocumentId === 'Pasaporte') && (
                                <div className={`${styles.container__Info} d-flex align-items-center justify-content-center gap-3`}>
                                    <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                        <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Nombres de tu proveedor</h6>
                                        <input
                                            type="text"
                                            {...register('name')}
                                            className={`${styles.input} p-2 border`}
                                            placeholder='Nombres de tu proveedor'
                                        />
                                        {errors.name && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>Los nombres de tu proveedor son requeridos</p>
                                        )}
                                    </div>
                                    <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                        <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Apellidos de tu proveedor</h6>
                                        <input
                                            type="text"
                                            {...register('lastName')}
                                            className={`${styles.input} p-2 border`}
                                            placeholder='Apellidos de tu proveedor'
                                        />
                                        {errors.lastName && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>Los apellidos de tu proveedor son requeridos</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {typeDocumentId === 'NIT' && (
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Nombre de la empresa</h6>
                                    <input
                                        type="text"
                                        {...register('corporateName')}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='¿Cuál es el nombre de la empresa?'
                                    />
                                    {errors.corporateName && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre de la empresa es requerido</p>
                                    )}
                                </div>
                            )}

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

                            <DepartmenAndCity
                                onSelect={handleSelectDepartmentAndCity}
                                reset={resetDepartmenAndCity}
                            />

                            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Dirección</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="text"
                                        {...register('address')}
                                        className={`${styles.input} p-2 border`}
                                        placeholder='¿Cuál es la dirección?'
                                    />
                                </div>
                            </div>

                            <div className="mb-5 d-flex">
                                {loading ? 
                                    <div className={`${styles.container__Loading} `}>
                                        <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit' >
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

export default CreateCrmSupplierPage;
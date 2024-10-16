/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { postRawMaterial, getRawMaterials } from '../../../../../redux/User/03Inventories/04InventoryRawMateralsSlice/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { IRawMaterial } from '../../../../../types/User/rawMaterial.types';
import { IBranch } from '../../../../../types/User/branch.types';
import CreateManyRawMaterals from '../../../../../components/PanelUser/03Inventories/04RawMaterials/CreateManyRawMaterials/CreateManyRawMaterals';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import { FaPlus } from "react-icons/fa6";
import styles from './styles.module.css';

interface CreateRawMateralPageProps {
    selectedBranchId?: string;
    onCreateComplete?: () => void;
    onRawMaterialCreated?: (idBranch: string, token: string) => void;
    addNotification: (type: 'success' | 'error', message: string) => void;
}

function CreateRawMateralsPage({ selectedBranchId, onCreateComplete, onRawMaterialCreated, addNotification }: CreateRawMateralPageProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    
    // Estados de Redux
    const errorRawMaterial = useSelector((state: RootState) => state.rawMaterial.errorRawMaterial);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<IRawMaterial>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
        }
    }, [token]);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const onCloseRawMaterialModal = () => {
        setShowCancelModal(false);
    };

    //Setea si el producto aumentará de forma periódica en el inventario
    const [inventoryIncrease, setInventoryIncrease] = useState('Si');
    const [periodicityAutomaticIncrease, setPeriodicityAutomaticInventoryIncrease] = useState<string | undefined>(undefined);
    const handleInventoryIncrease = (value: 'Si' | 'No') => {
        setInventoryIncrease(value);
        setPeriodicityAutomaticInventoryIncrease(undefined)
        setValue('inventoryIncrease', value);
    };

    //Setea la periodicidad en la que se aumentará el inventario
    const handlePeriodicityAutomaticInventoryIncrease = (value: string) => {
        setPeriodicityAutomaticInventoryIncrease(value);
    };

    //Setea si la materia prima está empacada
    const [selectedpackaged, setSelectedpackaged] = useState('Si');
    const handlePackagedChange = (value: 'Si' | 'No') => {
        setSelectedpackaged(value);
        setValue('packaged', value);
    };

    //Setea el valor 'Si' o 'No' en la propiedad "returnablePackaging"
    const [selectedReturnablePackaging, setSelectedReturnablePackaging] = useState('Si');
    const handleReturnablePackagingChange = (value: 'Si' | 'No') => {
        setSelectedReturnablePackaging(value);
        setValue('returnablePackaging', value);
    };

    //Setea la unidad de medida
    const [showUnitMeasure, setShowUnitMeasure] = useState('');
    const handleUnitMeasureChange = (event: { target: { value: SetStateAction<string> }}) => {
        setShowUnitMeasure(event.target.value);
    };

    //Setea el valor 'Si' o 'No' en la propiedad "individualPackaging"
    const [selectedIndividualPackaging, setSelectedIndividualPackaging] = useState('Si');
    const handleIndividualPackagingChange = (value: 'Si' | 'No') => {
        setSelectedIndividualPackaging(value);
        setValue('individualPackaging', value);
    };

    //Setea el retentionType
    const [showRetentionType, setShowRetentionType] = useState('No aplica');
    const handleRetentionTypeChange = (event: { target: { value: SetStateAction<string> }}) => {
        setShowRetentionType(event.target.value);
    };
    
    //IVA AIU
    const [showIvaAiu, setShowIvaAiu] = useState('No');
    const handleIvaAiuChange = (event: { target: { value: SetStateAction<string> }}) => {
        setShowIvaAiu(event.target.value);
    };

    const onSubmit = (values: IRawMaterial) => {
        setLoading(true);
        try {
            if (values.packaged === 'No') values.primaryPackageType = undefined;
            const formData = {
                ...values,
                packaged: selectedpackaged,
                returnablePackaging: selectedReturnablePackaging,
                inventoryIncrease: inventoryIncrease,
                periodicityAutomaticIncrease: periodicityAutomaticIncrease,
                retentionType: showRetentionType,
            } as IRawMaterial;
            dispatch(postRawMaterial(formData, token));
            setFormSubmitted(true);
            reset();
            setTimeout(() => {
                dispatch(getRawMaterials(token));
                setFormSubmitted(false);
                addNotification('success', 'Materia prima creada exitosamente!');
                if (onCreateComplete) {
                    onCreateComplete();
                } else {
                    setShouldNavigate(true);
                }
                if (onRawMaterialCreated && selectedBranchId) {
                    onRawMaterialCreated(selectedBranchId, token);
                }
            }, 1500);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/inventories/consult-raw-materals');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus materias primas</h1>

                        <div className={`${styles.container__Navigate_Inventories} mb-4 d-flex align-items-center justify-content-between`}>
                            <Link to='/inventories/consult-raw-materals' className={`${styles.link__Consult_Inventory} text-decoration-none`}>Consulta tu inventario</Link>
                            <div className={`${styles.link__Head_Navigate} d-flex align-items-center justify-content-between`}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <div className={`${styles.button__Bulk_Create} `} onClick={() => { setShowCancelModal(true) }} >Crea tus materias primas de forma masiva</div>
                            </div>
                        </div>

                        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                                <Modal.Title className='text-primary-emphasis text-start'>Crea tus materias primas de forma masiva</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateManyRawMaterals
                                    branches={branches}
                                    token={token}
                                    onCreateComplete={() => {
                                        onCloseRawMaterialModal();
                                    }}
                                />
                            </Modal.Body>
                        </Modal>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} m-auto d-flex flex-column align-items-center justify-content-center position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}

                            {Array.isArray(errorRawMaterial) && errorRawMaterial?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}
                        
                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Selecciona una Sede</p>
                                <select
                                    {...register('branchId', { required: true })}
                                    className={`${styles.input} p-2 border `}
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

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} >Si tiene código de barras ¿Cuál es el código?</p>
                                <input
                                    type="text"
                                    {...register('barCode')}
                                    className={`${styles.input} p-2 border `}
                                    placeholder='Código de barras de la materia prima que quieres registrar'
                                />
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿Cuál es el nombre de la materia prima que vas a registrar?</p>
                                <input
                                    type="text"
                                    {...register('nameItem', { required: true })}
                                    className={`${styles.input} p-2 border `}
                                    placeholder='Nombre de la materias prima quieres registrar'
                                />
                                {errors.nameItem && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre de la mercancía es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} >¿Cuál es la marca o referencia de la materia prima?</p>
                                <input
                                    type="text"
                                    {...register('brandItem')}
                                    className={`${styles.input} p-2 border `}
                                    placeholder='Marca de la materia prima que quieres registrar'
                                />
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿En qué unidad de medida desear registrar el inventario de tu materia prima?</p>
                                <select
                                    {...register('unitMeasure', { required: true })}
                                    className={`${styles.input} p-2 border `}
                                    onChange={handleUnitMeasureChange}
                                >                                         
                                    <option value=''>Selecciona una unidad de medida</option>
                                    <optgroup label="Unidades">
                                        <option value='Unidades'>Unidades</option>
                                        <option value='Ristra'>Ristra</option>
                                        <option value='Decena'>Decena</option>
                                        <option value='Docena'>Docena</option>
                                    </optgroup>
                                    <optgroup label="Líquidos">
                                        <option value='Mililitro'>Mililitro</option>
                                        <option value='Onza'>Onza</option>
                                        <option value='Botella'>Botella</option>
                                        <option value='Litro'>Litro</option>
                                        <option value='Galon'>Galón</option>
                                        <option value='Pimpina'>Pimpina</option>
                                        <option value='Metro cubico'>Metro cúbico</option>
                                    </optgroup>
                                    <optgroup label="Sólidos">
                                        <option value='Miligramo'>Miligramo</option>
                                        <option value='Gramo'>Gramo</option>
                                        <option value='Libra'>Libra</option>
                                        <option value='Kilogramo'>Kilogramo</option>
                                        <option value='Caja'>Caja</option>
                                        <option value='Paca'>Paca</option>
                                        <option value='Arroba'>Arroba</option>
                                        <option value='Bulto'>Bulto</option>
                                        <option value='Saco'>Saco</option>
                                        <option value='Tonelada'>Tonelada</option>
                                    </optgroup>
                                    <optgroup label="longitud">
                                        <option value='Milimetro'>Milimetro</option>
                                        <option value='Centrimetro'>Centrimetro</option>
                                        <option value='Pulgada'>Pulgada</option>
                                        <option value='Metro'>Metro</option>
                                        <option value='Centimetro cuadrado'>Centimetro cuadrado</option>
                                        <option value='Metro cuadrado'>Metro cuadrado</option>
                                    </optgroup>
                                </select>
                                {errors.unitMeasure && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de empaque de tu materia prima es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Hoy siendo la primer vez que registras información, ¿Cuánta materia prima tienes en el inventario?</p>
                                <input
                                    type="number"
                                    {...register('inventory', { required: true, setValueAs: (value) => parseFloat(value) })}
                                    className={`${styles.input} p-2 border `}
                                    placeholder='Tu inventario acá'
                                    min={0}
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') { e.preventDefault(); }
                                    }}
                                />
                                {errors.inventory && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El inventario de la materia prima es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿La materia prima/insumo viene empacada?</p>
                                <div className={`${styles.condition__Container} d-flex align-items-center justify-content-center  border rounded`}>
                                    <div
                                        className={`${styles.condition__Option} ${selectedpackaged === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handlePackagedChange('Si')}
                                    >
                                        Si
                                    </div>
                                    <div
                                        className={`${styles.condition__Option} ${selectedpackaged === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handlePackagedChange('No')}
                                    >
                                        No
                                    </div>
                                    {errors.packaged && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                    )}
                                </div>
                            </div>

                            {selectedpackaged === 'Si' && (
                                <div>
                                    <div className="mb-4 w-100 position-relative">
                                        <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Si la materia prima viene empacada ¿Cuál es el tipo de empaque principal?</p>
                                        <select
                                            {...register('primaryPackageType')}
                                            className={`${styles.input} p-2 border `}
                                        >
                                            <option value='Papel'>Papel</option>
                                            <option value='Papel de archivo'>Papel de archivo</option>
                                            <option value='Carton'>Cartón</option>
                                            <option value='Aluminio'>Aluminio</option>
                                            <option value='Plegadiza'>Plegadiza</option>
                                            <option value='Vidrio'>Vidrio</option>
                                            <option value='PET / PETE Polietileno Tereftalato'>PET / PETE Polietileno Tereftalato</option>
                                            <option value='HDPE Polietileno de alta densidad'>HDPE Polietileno de alta densidad</option>
                                            <option value='PVC Policloruro de Vinilo'>PVC Policloruro de Vinilo</option>
                                            <option value='LDPE Polietileno de baja densidad'>LDPE Polietileno de baja densidad</option>
                                            <option value='PP Polipropileno'>PP Polipropileno</option>
                                            <option value='PS Poliestireno'>PS Poliestireno</option>
                                            <option value='Otros plasticos (Policarbonato, estireno, nylon)'>Otros plásticos (Policarbonato, estireno, nylon)</option>
                                            <option value='Hierro'>Hierro</option>
                                            <option value='Icopor'>Icopor</option>
                                            <option value='Biodegradable'>Biodegradable</option>
                                            <option value='Plastico de burbujas'>Plástico de burbujas</option>
                                        </select>
                                        {errors.primaryPackageType && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de empaque de tu materia prima es requerido</p>
                                        )}
                                    </div>

                                    <div className="mb-4 w-100 position-relative">
                                        <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿La materia prima tiene empaques adicionales?</p>
                                        <div className={`${styles.condition__Container} d-flex align-items-center justify-content-center border rounded`}>
                                            <div
                                                className={`${styles.condition__Option} ${selectedIndividualPackaging === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                                                onClick={() => handleIndividualPackagingChange('Si')}
                                            >
                                                Si
                                            </div>
                                            <div
                                                className={`${styles.condition__Option} ${selectedIndividualPackaging === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                                                onClick={() => handleIndividualPackagingChange('No')}
                                            >
                                                No
                                            </div>
                                            {errors.individualPackaging && (
                                                <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                            )}
                                        </div>
                                    </div>
        
                                    {selectedIndividualPackaging === 'Si' && (
                                        <div className="mb-4 w-100 position-relative">
                                            <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Si la materia prima tiene empaques adicionales ¿Cuál es el tipo de empaque?</p>
                                            <select
                                                {...register('secondaryPackageType', { required: true })}
                                                className={`${styles.input} p-2 border `}                                    
                                            >
                                                <option value='Papel'>Papel</option>
                                                <option value='Papel de archivo'>Papel de archivo</option>
                                                <option value='Carton'>Cartón</option>                                                
                                                <option value='Aluminio'>Aluminio</option>
                                                <option value='Plegadiza'>Plegadiza</option>
                                                <option value='Vidrio'>Vidrio</option>
                                                <option value='PET / PETE Polietileno Tereftalato'>PET / PETE Polietileno Tereftalato</option>                                                
                                                <option value='HDPE Polietileno de alta densidad'>HDPE Polietileno de alta densidad</option>
                                                <option value='PVC Policloruro de Vinilo'>PVC Policloruro de Vinilo</option>
                                                <option value='LDPE Polietileno de baja densidad'>LDPE Polietileno de baja densidad</option>
                                                <option value='PP Polipropileno'>PP Polipropileno</option>
                                                <option value='PS Poliestireno'>PS Poliestireno</option>
                                                <option value='Otros plasticos (Policarbonato, estireno, nylon)'>Otros plásticos (Policarbonato, estireno, nylon)</option>
                                                <option value='Hierro'>Hierro</option>
                                                <option value='Icopor'>Icopor</option>
                                                <option value='Biodegradable'>Biodegradable</option>
                                                <option value='Plastico de burbujas'>Plástico de burbujas</option>
                                            </select>
                                            {errors.secondaryPackageType && (
                                                <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de empaque de tu materia prima es requerido</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {selectedpackaged === 'Si' && (
                                <div className="mb-4 w-100 position-relative">
                                    <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿El empaque, embalaje o envoltura de tu materia prima es retornable?</p>
                                    <div className={`${styles.condition__Container} d-flex align-items-center justify-content-center  border rounded`}>
                                        <div
                                            className={`${styles.condition__Option} ${selectedReturnablePackaging === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                                            onClick={() => handleReturnablePackagingChange('Si')}
                                        >
                                            Si
                                        </div>
                                        <div
                                            className={`${styles.condition__Option} ${selectedReturnablePackaging === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                                            onClick={() => handleReturnablePackagingChange('No')}
                                        >
                                            No
                                        </div>
                                        {errors.returnablePackaging && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿Deseas sumar existencias a tu inventario de manera periódica?</p>
                                <div className={`${styles.condition__Container} d-flex align-items-center justify-content-center  border rounded`}>
                                    <div
                                        className={`${styles.condition__Option} ${inventoryIncrease === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handleInventoryIncrease('Si')}
                                    >
                                        Si
                                    </div>
                                    <div
                                        className={`${styles.condition__Option} ${inventoryIncrease === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handleInventoryIncrease('No')}
                                    >
                                        No
                                    </div>
                                    {errors.inventoryIncrease && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                    )}
                                </div>
                            </div>

                            {inventoryIncrease === 'Si' && (
                                <div className="mb-4 w-100 position-relative">
                                    <div className="mb-4 w-100 position-relative">
                                        <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿Cada cuánto quieres sumar existencias a tu inventario?</p>
                                        <div className={`${styles.condition__Container} d-flex flex-wrap align-items-center justify-content-center w-100`}>
                                            <div
                                                className={`${styles.condition__Option} ${periodicityAutomaticIncrease === 'Diario' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Diario')}
                                            >
                                                Diario
                                            </div>
                                            <div
                                                className={`${styles.condition__Option} ${periodicityAutomaticIncrease === 'Semanal' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Semanal')}
                                            >
                                                Semanal
                                            </div>
                                            <div
                                                className={`${styles.condition__Option} ${periodicityAutomaticIncrease === 'Quincenal' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Quincenal')}
                                            >
                                                Quincenal
                                            </div>
                                            <div
                                                className={`${styles.condition__Option} ${periodicityAutomaticIncrease === 'Mensual' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Mensual')}
                                            >
                                                Mensual
                                            </div>
                                            <div
                                                className={`${styles.condition__Option} ${periodicityAutomaticIncrease === 'Bimestral' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Bimestral')}
                                            >
                                                Bimestral
                                            </div>
                                            <div
                                                className={`${styles.condition__Option} ${periodicityAutomaticIncrease === 'Trimestral' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Trimestral')}
                                            >
                                                Trimestral
                                            </div>
                                            <div
                                                className={`${styles.condition__Option} ${periodicityAutomaticIncrease === 'Semestral' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Semestral')}
                                            >
                                                Semestral
                                            </div>
                                            {errors.periodicityAutomaticIncrease && (
                                                <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-100 position-relative">
                                        <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Inventario: A futuro, ¿Qué cantidad deseas que se sume "{periodicityAutomaticIncrease}" a tu inventario?</p>
                                        <input
                                            type="number"
                                            {...register('automaticInventoryIncrease', { required: true, setValueAs: (value) => parseFloat(value) })}
                                            className={`${styles.input} p-2 border `}
                                            placeholder='Valor numérico de lo que quieres aumentar'
                                            min={0}
                                            onKeyDown={(e) => {
                                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                        {errors.automaticInventoryIncrease && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                        )}
                                    </div>
                                </div>
                            )}


                            {/* RETENCIONES */}
                            <div className="mb-4 d-flex w-100 position-relative gap-3">
                                <div className="w-100 position-relative">
                                    <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Tipo de retención</p>
                                    <select
                                        {...register(`retentionType`, { required: true })}
                                        className={`${styles.input__Retention} p-2 border`}
                                        onChange={handleRetentionTypeChange}
                                    >
                                        <option value='No aplica'>No aplica</option>
                                        <option value='Honorarios y consultoria'>Honorarios y consultoria</option>
                                        <option value='Servicios'>Servicios</option>
                                        <option value='Compras'>Compras</option>
                                        <option value='Pagos al exterior y dividendos'>Pagos al exterior y dividendos</option>
                                        <option value='Otros'>Otros</option>
                                    </select>
                                </div>
                                
                                <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <p className={`${styles.label} `} >Porcentaje de retención</p>
                                    <select
                                        {...register(`withholdingTax`, { setValueAs: value => parseInt(value, 10) })}
                                        className={`${styles.input__Retention} p-2 border`}
                                    >
                                        <option value='No aplica'>No aplica</option>
                                        <option value={0.1}>0.1 %</option>
                                        <option value={0.5}>0.5 %</option>
                                        <option value={1}>1 %</option>
                                        <option value={1.5}>1.5 %</option>
                                        <option value={2}>2 %</option>
                                        <option value={2.5}>2.5 %</option>
                                        <option value={3}>3 %</option>
                                        <option value={3.5}>3.5 %</option>
                                        <option value={4}>4 %</option>
                                        <option value={6}>6 %</option>
                                        <option value={7}>7 %</option>
                                        <option value={8}>8 %</option>
                                        <option value={10}>10 %</option>
                                        <option value={11}>11 %</option>
                                        <option value={15}>15 %</option>
                                        <option value={20}>20 %</option>
                                        <option value={33}>33 %</option>
                                        <option value={35}>35 %</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿Cuál es el porcentaje de IVA de la mercancía?</p>
                                <select
                                    defaultValue={0}
                                    className={`${styles.input} p-2 border `}
                                    {...register('IVA', { required: true, setValueAs: value => parseInt(value, 10) })}
                                >
                                    <option value='No aplica'>No aplica</option>
                                    <option value={0}>0 %</option>
                                    <option value={5}>5 %</option>
                                    <option value={19}>19 %</option>
                                </select>
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Si la materia prima  está grabada con el impuesto al consumo, elige el porcentaje</p>
                                <select
                                    defaultValue={0}
                                    className={`${styles.input} p-2 border `}
                                    {...register('consumptionTax', { required: true, setValueAs: value => parseInt(value, 10) })}
                                >
                                    <option value='No aplica'>No aplica</option>
                                    <option value={4}>4 %</option>
                                    <option value={8}>8 %</option>
                                    <option value={16}>16 %</option>
                                </select>
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿La materia prima está grabado con IVA AIU?</p>
                                <select
                                    className={`${styles.input} p-2 border `}
                                    onChange={handleIvaAiuChange}
                                >
                                    <option value={'No'}>No</option>
                                    <option value={'Si'}>Si</option>
                                </select>
                            </div>

                            {showIvaAiu === 'Si' && (
                                <div className='mb-3'>
                                    <div className='mb-3 d-flex gap-2'>
                                        <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Define el porcentaje de Administración</p>
                                        <input
                                            type="number"
                                            {...register('ivaAiu.administrativePercentage', { required: true, setValueAs: (value) => parseFloat(value) })}
                                            className={` p-2 border `}
                                            placeholder='Porcentaje de Administración'
                                            min={0}
                                            onKeyDown={(e) => {
                                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                        <span>%</span>
                                    </div>

                                    <div className='mb-3 d-flex gap-2'>
                                        <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Define el porcentaje de Imprevistos</p>
                                        <input
                                            type="number"
                                            {...register('ivaAiu.unforeseenPercentage', { required: true, setValueAs: (value) => parseFloat(value) })}
                                            className={` p-2 border `}
                                            placeholder='Porcentaje de Imprevistos'
                                            min={0}
                                            onKeyDown={(e) => {
                                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                        <span>%</span>
                                    </div>

                                    <div className='mb-3 d-flex gap-2'>
                                        <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Define el porcentaje de Utilidad</p>
                                        <input
                                            type="number"
                                            {...register('ivaAiu.utilityPercentage', { required: true, setValueAs: (value) => parseFloat(value) })}
                                            className={` p-2 border `}
                                            placeholder='Porcentaje de Utilidad'
                                            min={0}
                                            onKeyDown={(e) => {
                                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                        <span>%</span>
                                    </div>
                                </div>
                            )}
                            
                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿Cuál es el precio de compra antes de impuestos de cada "{showUnitMeasure}"?</p>
                                <input
                                    type="number"
                                    {...register('purchasePriceBeforeTax', { required: true, setValueAs: (value) => parseFloat(value) })}
                                    className={`${styles.input} p-2 border `}
                                    placeholder='Precio de compra de la mercancía'
                                    min={0}
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') { e.preventDefault(); }
                                    }}
                                />
                                {errors.purchasePriceBeforeTax && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El el precio de compra antes de impuestos es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} >Si deseas ¿Cuál es el precio de venta?</p>
                                <input
                                    type="number"
                                    {...register('sellingPrice', { setValueAs: (value) => parseFloat(value) })}
                                    className={`${styles.input} p-2 border `}
                                    placeholder='Precio de venta de a mercancía'
                                    min={0}
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') { e.preventDefault(); }
                                    }}
                                />
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
    );
}

export default CreateRawMateralsPage;
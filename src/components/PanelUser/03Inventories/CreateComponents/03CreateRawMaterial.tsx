/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { postRawMaterial, getRawMaterials } from '../../../../redux/User/03Inventories/04InventoryRawMateralsSlice/actions';
import { getBranches } from '../../../../redux/User/02BranchSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { IRawMaterial } from '../../../../types/UserPanel/03Inventories/rawMaterial.types';
import { IBranch } from '../../../../types/UserPanel/02Branch/branch.types';
import styles from './styles.module.css';

interface CreateRawMateralProps {
    token: string;
    selectedBranchId: string;
    onCreateComplete?: () => void;
    onRawMaterialCreated?: (idBranch: string, token: string) => void;
}

function CreateRawMateral({ token, selectedBranchId, onCreateComplete, onRawMaterialCreated }: CreateRawMateralProps) {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    
    // Estados de Redux
    const errorRawMaterial = useSelector((state: RootState) => state.rawMaterial.errorRawMaterial);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<IRawMaterial>();
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
        }
    }, [token]);

    useEffect(() => {
        if (selectedBranchId) {
            setValue('branchId', selectedBranchId);
        }
    }, [selectedBranchId, setValue]);

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

    //Setea el valor 'Si' o 'No' en la propiedad "individualPackaging"
    const [selectedIndividualPackaging, setSelectedIndividualPackaging] = useState('Si');
    const handleIndividualPackagingChange = (value: 'Si' | 'No') => {
        setSelectedIndividualPackaging(value);
        setValue('individualPackaging', value);
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

    const onSubmit = (values: IRawMaterial) => {
        setLoading(true);
        try {
            if (values.packaged === 'No') {
                values.primaryPackageType = undefined;
            }
            const formData = {
                ...values,
                branchId: selectedBranchId || values.branchId,
                packaged: selectedpackaged,
                returnablePackaging: selectedReturnablePackaging,
                inventoryIncrease: inventoryIncrease,
                periodicityAutomaticIncrease: periodicityAutomaticIncrease,
            } as IRawMaterial;
            dispatch(postRawMaterial(formData, token));
            setFormSubmitted(true);
            reset();
            setTimeout(() => {
                dispatch(getRawMaterials(token));
                setFormSubmitted(false);
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
    }

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/inventories/consult-raw-materals');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div className="d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto">
            <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus materias primas</h1>

            <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`}>
                {formSubmitted && (
                    <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                )}
                {Array.isArray(errorRawMaterial) && errorRawMaterial?.map((error, i) => (
                    <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                ))}
            
                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`}>Sede</p>
                    </div>
                    <div>
                        <select
                            {...register('branchId', { required: true })}
                            className={`${styles.input} p-2 border `}
                            defaultValue={selectedBranchId || ''}
                            disabled={!!selectedBranchId}
                        >
                            <option value=''>Selecciona una Sede</option>
                            {Array.isArray(branches) && branches.map((branch: IBranch, index: number) => (
                                <option key={index} value={branch.id}>
                                    {branch.nameBranch}
                                </option>
                            ))}
                        </select>
                        {errors.branchId && (
                            <p className='text-danger'>La Sede es requerida</p>
                        )}
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`}>Si tiene código de barras ¿Cuál es el código?</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            {...register('barCode')}
                            className={`${styles.input} p-2 border `}
                            placeholder='Código de barras de la materia prima que quieres registrar'
                        />
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el nombre de la materia prima que vas a registrar?</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            {...register('nameItem', { required: true })}
                            className={`${styles.input} p-2 border `}
                            placeholder='¿Qué materia prima quieres registrar?'
                        />
                        {errors.nameItem && (
                            <p className='text-danger'>El nombre de la materia prima es requerido</p>
                        )}
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`}>Si tiene marca la materia prima ¿Cuál es?</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            {...register('brandItem')}
                            className={`${styles.input} p-2 border `}
                            placeholder='Marca de la materia prima que quieres registrar'
                        />
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`} >¿En qué unidad de medida desear registrar el inventario de tu materia prima?</p>
                    </div>
                    <div>
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
                            <p className='text-danger'>El tipo de empaque de tu materia prima es requerido</p>
                        )}
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`} >Hoy siendo la primer vez que registras información, ¿Cuánta materia prima tienes en el inventario?</p>
                    </div>
                    <div>
                        <input
                            type="number"
                            {...register('inventory', { required: true, setValueAs: (value) => parseFloat(value) })}
                            className={`${styles.input} p-2 border `}
                            placeholder='Tu inventario acá'
                            min={0}
                            onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {errors.inventory && (
                            <p className='text-danger'>El inventario de la materia prima es requerido</p>
                        )}
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text}`} >¿La materia prima/insumo viene empacada?</p>
                    </div>
                    <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center  border rounded`}>
                        <div
                            className={`${styles.conditionOption} ${selectedpackaged === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                            onClick={() => handlePackagedChange('Si')}
                        >
                            Si
                        </div>
                        <div
                            className={`${styles.conditionOption} ${selectedpackaged === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                            onClick={() => handlePackagedChange('No')}
                        >
                            No
                        </div>
                        {errors.packaged && (
                            <p className='text-danger'>Este dato es requerido</p>
                        )}
                    </div>
                </div>

                {selectedpackaged === 'Si' && (
                    <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                        <div className="px-3">
                            <p className={`${styles.text} mb-0 p-2`} >Si la materia prima viene empacada ¿Cuál es el tipo de empaque principal?</p>
                        </div>
                        <div>
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
                                <p className='text-danger'>El tipo de empaque de tu materia prima es requerido</p>
                            )}
                        </div>
                    </div>
                )}

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`} >¿La materia prima tiene empaques adicionales?</p>
                    </div>
                    <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center border rounded`}>
                        <div
                            className={`${styles.conditionOption} ${selectedIndividualPackaging === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                            onClick={() => handleIndividualPackagingChange('Si')}
                        >
                            Si
                        </div>
                        <div
                            className={`${styles.conditionOption} ${selectedIndividualPackaging === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                            onClick={() => handleIndividualPackagingChange('No')}
                        >
                            No
                        </div>
                        {errors.individualPackaging && (
                            <p className='text-danger'>Este dato es requerido</p>
                        )}
                    </div>
                </div>

                {selectedIndividualPackaging === 'Si' && (
                    <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                        <div>
                            <p className={`${styles.text} mb-0 p-2`} >Si la materia prima tiene empaques adicionales ¿Cuál es el tipo de empaque?</p>
                        </div>
                        <div>
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
                                <p className='text-danger'>El tipo de empaque de tu materia prima es requerido</p>
                            )}
                        </div>
                    </div>
                )}

                {selectedpackaged === 'Si' && (
                    <div>
                        {/* <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                            <div className="px-3">
                                <p className={`${styles.text} mb-0 p-2`} >¿Cuánt{['Unidades', 'Onza', 'Pimpina', 'Libra', 'Arroba', 'Tonelada'].includes(showUnitMeasure) ? 'as' : 'os'} {showUnitMeasure}{['Unidades'].includes(showUnitMeasure) ? '' : 's'} de "{nameItem}" vienen por cada empaque o paquete?</p>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    {...register('quantityPerPackage', { required: true, setValueAs: (value) => parseFloat(value) })}
                                    className={`${styles.input} p-2 border `}
                                    placeholder='Ej: 10'
                                    min={0}
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') { e.preventDefault(); }
                                    }}
                                />
                                {errors.quantityPerPackage && (
                                    <p className='text-danger'>El valor en {showUnitMeasure} es requerido</p>
                                )}
                            </div>
                        </div> */}

                        <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                            <div>
                                <p className={`${styles.text} mb-0 p-2`} >¿El empaque, embalaje o envoltura de tu materia prima es retornable?</p>
                            </div>
                            <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center  border rounded`}>
                                <div
                                    className={`${styles.conditionOption} ${selectedReturnablePackaging === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                                    onClick={() => handleReturnablePackagingChange('Si')}
                                >
                                    Si
                                </div>
                                <div
                                    className={`${styles.conditionOption} ${selectedReturnablePackaging === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                                    onClick={() => handleReturnablePackagingChange('No')}
                                >
                                    No
                                </div>
                                {errors.returnablePackaging && (
                                    <p className='text-danger'>Este dato es requerido</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`} >¿Deseas sumar existencias a tu inventario de manera periódica?</p>
                    </div>
                    <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center  border rounded`}>
                        <div
                            className={`${styles.conditionOption} ${inventoryIncrease === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                            onClick={() => handleInventoryIncrease('Si')}
                        >
                            Si
                        </div>
                        <div
                            className={`${styles.conditionOption} ${inventoryIncrease === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                            onClick={() => handleInventoryIncrease('No')}
                        >
                            No
                        </div>
                        {errors.inventoryIncrease && (
                            <p className='text-danger'>Este dato es requerido</p>
                        )}
                    </div>
                </div>

                {inventoryIncrease === 'Si' && (
                    <div>
                        <div className="mb-3 p-2 d-flex flex-column align-items-center justify-content-center border rounded">
                            <div>
                                <p className="text-center mb-0 p-2">¿Cada cuánto quieres sumar existencias a tu inventario?</p>
                            </div>
                            <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center w-100`}>
                                <div
                                    className={`${styles.conditionOption} ${periodicityAutomaticIncrease === 'Diario' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                    onClick={() => handlePeriodicityAutomaticInventoryIncrease('Diario')}
                                >
                                    Diario
                                </div>
                                <div
                                    className={`${styles.conditionOption} ${periodicityAutomaticIncrease === 'Semanal' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                    onClick={() => handlePeriodicityAutomaticInventoryIncrease('Semanal')}
                                >
                                    Semanal
                                </div>
                                <div
                                    className={`${styles.conditionOption} ${periodicityAutomaticIncrease === 'Quincenal' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                    onClick={() => handlePeriodicityAutomaticInventoryIncrease('Quincenal')}
                                >
                                    Quincenal
                                </div>
                                <div
                                    className={`${styles.conditionOption} ${periodicityAutomaticIncrease === 'Mensual' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                    onClick={() => handlePeriodicityAutomaticInventoryIncrease('Mensual')}
                                >
                                    Mensual
                                </div>
                                <div
                                    className={`${styles.conditionOption} ${periodicityAutomaticIncrease === 'Bimestral' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                    onClick={() => handlePeriodicityAutomaticInventoryIncrease('Bimestral')}
                                >
                                    Bimestral
                                </div>
                                <div
                                    className={`${styles.conditionOption} ${periodicityAutomaticIncrease === 'Trimestral' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                    onClick={() => handlePeriodicityAutomaticInventoryIncrease('Trimestral')}
                                >
                                    Trimestral
                                </div>
                                <div
                                    className={`${styles.conditionOption} ${periodicityAutomaticIncrease === 'Semestral' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                    onClick={() => handlePeriodicityAutomaticInventoryIncrease('Semestral')}
                                >
                                    Semestral
                                </div>
                                {errors.periodicityAutomaticIncrease && (
                                    <p className='text-danger'>Este dato es requerido</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                            <div>
                                <p className={`${styles.text} mb-0 p-2`} >Inventario: A futuro, ¿Qué cantidad deseas que se sume "{periodicityAutomaticIncrease}" a tu inventario?</p>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    {...register('automaticInventoryIncrease', { required: true, setValueAs: (value) => parseFloat(value) })}
                                    className={`${styles.input} p-2 border `}
                                    placeholder='Valor numérico de lo que quieres aumentar'
                                    min={0}
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') { e.preventDefault(); }
                                    }}
                                />
                                {errors.automaticInventoryIncrease && (
                                    <p className='text-danger'>Este dato es requerido</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el precio de compra antes de impuestos de cada "{showUnitMeasure}"?</p>
                    </div>
                    <div>
                        <input
                            type="number"
                            {...register('purchasePriceBeforeTax', { required: true })}
                            className={`${styles.input} p-2 border `}
                            placeholder='Precio de la materia prima'
                            min={0}
                            onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {errors.purchasePriceBeforeTax && (
                            <p className='text-danger'>El el precio de compra antes de impuestos es requerido</p>
                        )}
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div className="px-3">
                        <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el IVA de la materia prima?</p>
                    </div>
                    <div className={styles.containerInput}>
                        <select
                            defaultValue={0}
                            className={`${styles.input} p-2 border `}
                            {...register('IVA', { required: true, setValueAs: value => parseInt(value, 10) })}
                        >
                            <option value={0}>0 %</option>
                            <option value={5}>5 %</option>
                            <option value={19}>19 %</option>
                        </select>
                    </div>
                </div>

                <div className="mb-5 d-flex">
                    {loading ? 
                        <div className={`${styles.container__Loading} position-relative w-100`}>
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
    );
}

export default CreateRawMateral;
/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { postAsset, getAssets } from '../../../../redux/User/03Inventories/01InventoryAssetsSlice/actions';
import { getBranches } from '../../../../redux/User/02BranchSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../types/User/assets.types';
import { IBranch } from '../../../../types/User/branch.types';
import styles from './styles.module.css';

interface CreateAssetProps {
    token: string;
    selectedBranchId: string;
    onCreateComplete?: () => void;
    onAssetCreated?: (idBranch: string, token: string) => void;
}

function CreateAsset({ token, selectedBranchId, onCreateComplete, onAssetCreated }: CreateAssetProps) {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    // Estados de Redux
    const errorAssets = useSelector((state: RootState) => state.assets.errorAssets);
    const branches = useSelector((state: RootState) => state.branch.branch);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<IAssets>();
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
    
    const [selectedCondition, setSelectedCondition] = useState('Nuevo');
    const handleConditionChange = (value: 'Nuevo' | 'Usado') => {
        setSelectedCondition(value);
        setValue('conditionAssets', value);
    };
    
    const [nameItem, setNameItem] = useState('');
    const handleNameItem = (event: { target: { value: SetStateAction<string>; }; }) => {
        setNameItem(event.target.value);
    };

    const onSubmit = async (values: IAssets) => {
        setLoading(true);
        try {
            const formData = {
                ...values,
                conditionAssets: selectedCondition,
                branchId: selectedBranchId || values.branchId,
            } as IAssets;
            await dispatch(postAsset(formData, token));
            setFormSubmitted(true);
            reset();
            setTimeout(() => {
                dispatch(getAssets(token));
                setFormSubmitted(false);
                if (onCreateComplete) {
                    onCreateComplete();
                } else {
                    setShouldNavigate(true);
                }
                if (onAssetCreated && selectedBranchId) {
                    onAssetCreated(selectedBranchId, token);
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
            navigate('/inventories/consult-assets');
        }
    }, [shouldNavigate, navigate]);

    return (
        <div className="d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto">
            <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus equipos, herramientas o máquinas</h1>

            <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`}>
                {formSubmitted && (
                    <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                )}
                {Array.isArray(errorAssets) && errorAssets?.map((error, i) => (
                    <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                ))}
                
                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <p className={`${styles.text} mb-0 p-2`}>Sede</p>
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
                            placeholder='Código de barras de la equipo, herramienta o maquinaría que quieres registrar'
                        />
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`}>¿Cuál es el nombre del equipo, herramienta o maquinaría que vas a registrar? Ej: Computador, Guadaña, torno</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            {...register('nameItem', { required: true })}
                            className={`${styles.input} p-2 border `}
                            placeholder='Nombre de tu equipo, herramienta o maquinaría que quieres registrar'
                            onChange={handleNameItem}
                        />
                        {errors.nameItem && (
                            <p className='text-danger'>El nombre del {nameItem} es requerido</p>
                        )}
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`}>¿Cuál es la marca de la activo "{nameItem}"? Ej: Lenovo, Steel, Siemens</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            {...register('brandItem', { required: true })}
                            className={`${styles.input} p-2 border `}
                            placeholder='Marca equipo, herramienta o maquinaría quieres registrar'
                        />
                        {errors.brandItem && (
                            <p className='text-danger'>La marca del equipo, herramienta o máquina es requerida</p>
                        )}
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`}>¿Cuál es la referencia de tu activo "{nameItem}"? Escribe la referencia de tu máquina tal y como la vas a identificar en tu inventario. Ej: IdeaPad 1 Intel Core i5</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            {...register('referenceItem', { required: true })}
                            className={`${styles.input} p-2 border `}
                            placeholder='Referencia o N/A'
                        />
                        {errors.referenceItem && (
                            <p className='text-danger'>La referencia del equipo, herramienta o máquina es requerido</p>
                        )}
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`}>¿Cuál es el estado del(de la) {nameItem}?</p>
                    </div>
                    <div>
                        <select
                            {...register('stateAssets', { required: true })}
                            className={`${styles.input} p-2 border `}
                        >
                            <option value=''>Seleccione una opción</option>
                            <option value='Funciona correctamente'>Funciona correctamente</option>
                            <option value='Funciona requiere mantenimiento'>Funciona bien pero requiere pronto mantenimiento</option>
                            <option value='Dañada requiere cambio'>Dañada y requiere cambio</option>
                            <option value='Dañada requiere reparacion'>Dañada y requiere reparación</option>
                        </select>
                        {errors.stateAssets && (
                            <p className='text-danger'>El estado de la máquina es requerido</p>
                        )}
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} `}>¿Tu activo "{nameItem}" lo(la) compraste nuevo(a) o usado(a)?</p>
                    </div>
                    <div className={`${styles.conditionContainer} d-flex align-items-center justify-content-center  border rounded`}>
                        <div
                            className={`${styles.conditionOption} ${selectedCondition === 'Nuevo' ? styles.selected : ''} m-1 p-2 text-center`}
                            onClick={() => handleConditionChange('Nuevo')}
                        >
                            Nuevo
                        </div>
                        <div
                            className={`${styles.conditionOption} ${selectedCondition === 'Usado' ? styles.selected : ''} m-1 p-2 text-center`}
                            onClick={() => handleConditionChange('Usado')}
                        >
                            Usado
                        </div>
                        {errors.conditionAssets && (
                            <p className='text-danger'>Este dato es requerido</p>
                        )}
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`} >Hoy siendo la primer vez que registras información, ¿Cuántos activos de este tipo tienes en el inventario?</p>
                    </div>
                    <div>
                        <input
                            type="number"
                            {...register('inventory', { required: true, setValueAs: (value) => parseFloat(value) })}
                            className={`${styles.input} p-2 border `}
                            placeholder='Tu inventario acá'
                            min={0}
                        />
                        {errors.inventory && (
                            <p className='text-danger'>El inventario es requerido</p>
                        )}
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div>
                        <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el precio de compra antes de impuestos?</p>
                    </div>
                    <div>
                        <input
                            type="number"
                            {...register('purchasePriceBeforeTax', { required: true })}
                            className={`${styles.input} p-2 border `}
                            placeholder='Precio del equipo, herramienta o máquina'
                            min={0}
                            onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {errors.purchasePriceBeforeTax && (
                            <p className='text-danger'>El precio de compra antes de impuestos es requerido</p>
                        )}
                    </div>
                </div>

                <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                    <div className="px-3">
                        <p className={`${styles.text} mb-0 p-2`} >¿Cuál es el IVA del equipo, herramienta o máquina?</p>
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

export default CreateAsset;
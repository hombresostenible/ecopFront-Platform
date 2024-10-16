/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { patchAddInventoryAsset, getAssets } from '../../../../../redux/User/03Inventories/01InventoryAssetsSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../types/User/assets.types';
import styles from './styles.module.css';

interface AddInventoryAssetProps {
    token: string;
    idItem: string;
    nameItem?: string;
    idBranch: string;
    onCloseModal: () => void;
}
function AddInventoryAsset({ token, idItem, nameItem, idBranch, onCloseModal }: AddInventoryAssetProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const errorAssets = useSelector((state: RootState) => state.assets.errorAssets);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IAssets>();
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const onSubmit = async (values: IAssets) => {
        setLoading(true);
        try {
            const formData = {
                ...values,
                branchId: idBranch,
            } as IAssets;
            dispatch(patchAddInventoryAsset(idItem, formData, token));
            setFormSubmitted(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getAssets(token));
            onCloseModal();
            reset();
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                {formSubmitted && (
                    <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                )}
                {Array.isArray(errorAssets) && errorAssets?.map((error, i) => (
                    <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                ))}

                <div className={`${styles.container__Info} mt-4 m-auto d-flex flex-column align-items-center justify-content-between`}>
                    <div className={`${styles.name__Item} mb-3`}>{nameItem}</div>
                    <div className={`${styles.inventory} mb-3 d-flex align-items-center justify-content-between`}>
                        <p className={`${styles.text} mb-0`} >Valor a agregar</p>
                        <input
                            type="number"
                            {...register('inventory', { required: true, setValueAs: (value) => parseFloat(value) })}
                            className={`${styles.input} p-2 border`}
                            placeholder='Cantidad a sumar al inventario'
                            min={0}
                            onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {errors.inventory && (
                            <p className='text-danger'>El inventario es requerido</p>
                        )}
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
                </div>
            </form>
        </div>
    );
}

export default AddInventoryAsset;
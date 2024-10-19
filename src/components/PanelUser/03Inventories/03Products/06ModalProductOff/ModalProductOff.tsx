import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { patchProduct, getProducts } from '../../../../../redux/User/03Inventories/03InventoryProductsSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../../../types/UserPanel/03Inventories/products.types';
import { IInventoryOffItem } from '../../../../../types/UserPanel/03Inventories/InventoryOffItem/iInventoryOffItem.types';
import styles from './styles.module.css';

interface ModalProductOffProps {
    token: string;
    product: IProduct;
    onCloseModal: () => void;
}

interface FormValues {
    reason: IInventoryOffItem['reason'];
    quantity: number;
    description: string;
}

function ModalProductOff({ token, product, onCloseModal }: ModalProductOffProps) {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const errorProduct = useSelector((state: RootState) => state.product.errorProduct);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const onSubmit = (values: FormValues) => {
        setLoading(true);
        try {
            const formData: Partial<IProduct> = {
                inventoryOff: [
                    {
                        date: new Date(),
                        reason: values.reason,
                        quantity: values.quantity,
                        description: values.description,
                    },
                ],
                inventory: product.inventory - values.quantity,
            };
            dispatch(patchProduct(product.id, formData, token));
            setFormSubmitted(true);
            reset();
            setTimeout(() => {
                setFormSubmitted(false);
                setShouldNavigate(true);
                onCloseModal();
                dispatch(getProducts(token));
            }, 1500);
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/inventories/consult-products');
        }
    }, [shouldNavigate, navigate]);

    return (
        <div className="p-3">
            <div className={`${styles.container__Modal}`}>
                <p>Si deseas dar de baja tu "{product?.nameItem}" del inventario de activos, selecciona el motivo:</p>

                {formSubmitted && (
                    <div className='alert alert-success'>El formulario se ha enviado con éxito</div>
                )}
                {Array.isArray(errorProduct) && errorProduct.map((error, i) => (
                    <div key={i} className='bg-red-500 my-2 p-2 text-white text-center'>{error}</div>
                ))}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="d-flex flex-column align-items-start justify-content-center">
                            <h6 className={styles.label}>Selecciona el motivo</h6>
                            <select
                                {...register('reason', { required: true })}
                                className={`${styles.input} p-2 border `}
                            >
                                <option value=''>Seleccione una opción</option>
                                <option value='Dañado'>Dañado</option>
                                <option value='Donado'>Donado</option>
                                <option value='Desechado'>Desechado</option>
                                <option value='Reciclado'>Reciclado</option>
                                <option value='Vendido'>Vendido</option>
                            </select>
                            {errors.reason && (
                                <p className='text-danger'>Este dato es requerido</p>
                            )}
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-center">
                            <h6 className={styles.label}>Descripción</h6>
                            <input
                                type="text"
                                className={`${styles.input} p-2 border `}
                                {...register('description', { required: true })}
                            />
                            {errors.description && (
                                <p className='text-danger'>La descripción es requerida</p>
                            )}
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-center">
                            <h6 className={styles.label}>Selecciona la cantidad - Existen {product.inventory} - {product.unitMeasure}</h6>
                            <input
                                type="number"
                                {...register('quantity', {
                                    required: true,
                                    valueAsNumber: true,
                                    min: 1,
                                    max: product.inventory,
                                })}
                                className={`${styles.input} p-2 border `}
                                placeholder="Ingrese una cantidad"
                            />
                            {errors.quantity && errors.quantity.type === "required" && (
                                <p className='text-danger'>La cantidad es requerida</p>
                            )}
                            {errors.quantity && errors.quantity.type === "max" && (
                                <p className='text-danger'>La cantidad no puede exceder el inventario disponible ({product.inventory} - {product.unitMeasure})</p>
                            )}
                            {errors.quantity && errors.quantity.type === "min" && (
                                <p className='text-danger'>La cantidad debe ser al menos 1</p>
                            )}
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
        </div>
    );
}

export default ModalProductOff;
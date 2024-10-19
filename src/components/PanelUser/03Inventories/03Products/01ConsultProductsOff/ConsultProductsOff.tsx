/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { patchProduct, getProductsOff, getProducts } from '../../../../../redux/User/03Inventories/03InventoryProductsSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../../../types/UserPanel/03Inventories/products.types';
import { IBranch } from '../../../../../types/UserPanel/02Branch/branch.types';
import styles from './styles.module.css';

interface ConsultProductsOffProps {
    token: string;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ConsultProductsOff({ token, branches, onCloseModal }: ConsultProductsOffProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const productOff = useSelector((state: RootState) => state.product.productOff);

    useEffect(() => {
        if (token) {
            dispatch(getProductsOff(token));
        }
    }, [token]);

    const calculateTotalInventoryOff = (inventoryOff: { quantity: number }[] = []) => {
        return inventoryOff.reduce((total, item) => total + item.quantity, 0);
    };

    //ESTA FUNCION EDITA LOS PRODUCTOS DADOS DE BAJA
    const onSubmit = (idProduct: string) => {
        try {
            const formData: IProduct = {
                inventoryOff: [{
                    date: new Date(),
                    quantity: 1, // O cualquier valor apropiado
                    reason: "Activo en uso",
                    description: "Activo en uso",
                }],
            } as IProduct;
            dispatch(patchProduct(idProduct, formData, token));
            onCloseModal();
            dispatch(getProducts(token));
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        }
    };

    return (
        <div className="m-auto w-100">
            <div className="mt-4 table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Sede</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Nombre del item</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Cantidad</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.isArray(productOff) && productOff.length > 0 ? (
                            productOff.map((product) => (
                                <tr key={product.id}>
                                    <td className='align-middle text-center'>
                                        <span>
                                            {branches && branches.map((branch, index) => (
                                                product.branchId === branch.id && (
                                                    <span className="text-center" key={index}>{branch.nameBranch}</span>
                                                )
                                            ))}
                                        </span>
                                    </td>
                                    <td className='align-middle text-center'>
                                        <span>{product.nameItem}</span>
                                    </td>
                                    <td className='align-middle text-center'>
                                        <span>{calculateTotalInventoryOff(product.inventoryOff)}</span>
                                    </td>
                                    <td className='d-flex align-items-center justify-content-center align-middle text-center'>
                                        <div
                                            className={styles.dsdsdsdsdsd}
                                            onClick={() => {
                                                onSubmit(product.id); // Llamamos a onSubmit al hacer clic en "Normalizar"
                                            }}
                                        >
                                            Editar
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center">
                                    No hay productos dados de baja
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ConsultProductsOff;
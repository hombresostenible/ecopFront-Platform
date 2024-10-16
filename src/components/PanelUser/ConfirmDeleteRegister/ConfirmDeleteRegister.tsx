/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store';
import { deleteAsset, getAssets } from '../../../redux/User/03Inventories/01InventoryAssetsSlice/actions';
import { deleteMerchandise, getMerchandises } from '../../../redux/User/03Inventories/02InventoryMerchadisesSlice/actions';
import { deleteProduct, getProducts } from '../../../redux/User/03Inventories/03InventoryProductsSlice/actions';
import { deleteRawMaterial, getRawMaterials } from '../../../redux/User/03Inventories/04InventoryRawMateralsSlice/actions';
import { deleteService, getServices } from '../../../redux/User/03Inventories/05InventoryServicesSlice/actions';
import { deleteAccountsBook, getAccountsBooks } from '../../../redux/User/04AccountsSlice/actions';
import styles from './styles.module.css';

interface ConfirmDeleteRegisterProps {
    typeRegisterDelete: string;
    idItem: string;
    nameRegister?: string;
    onCloseModal: () => void;
}

function ConfirmDeleteRegister({ typeRegisterDelete, idItem, nameRegister, onCloseModal }: ConfirmDeleteRegisterProps) {
    const token = Cookies.get('token') || '';
    // REDUX
    const dispatch: AppDispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [typeDelete, setTypeDelete] = useState('');
    useEffect(() => {
        if (typeRegisterDelete === 'Asset') {
            setTypeDelete(`¿Estas seguro de que quieres eliminar el equipo, herramienta o máquina ${nameRegister}?`)
        } 
        else if (typeRegisterDelete === 'Merchandise') {
            setTypeDelete(`¿Estas seguro de que quieres eliminar la Mercancía ${nameRegister}?`)
        }
        else if (typeRegisterDelete === 'Product') {      
            setTypeDelete(`¿Estas seguro de que quieres eliminar el Producto ${nameRegister}?`)
        }
        else if (typeRegisterDelete === 'RawMaterial') {  
            setTypeDelete(`¿Estas seguro de que quieres eliminar la Materia Prima ${nameRegister}?`)
        }
        else if (typeRegisterDelete === 'Service') {
            setTypeDelete(`¿Estas seguro de que quieres eliminar el Servicio ${nameRegister}?`)
        }
        else if (typeRegisterDelete === 'AccountsBook') {
            setTypeDelete('este registro del libro diario')
            setTypeDelete(`¿Estas seguro de que quieres eliminar este registro del libro diario?`)
        }
    }, [ typeRegisterDelete ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsByPage, setItemsByPage] = useState<number>(20);

    const onSubmit = async () => {
        setLoading(true);
        try {
            setCurrentPage(1);
            setItemsByPage(20);
            if (typeRegisterDelete === 'Asset') {
                dispatch(deleteAsset(idItem, token));
                await new Promise(resolve => setTimeout(resolve, 500));
                dispatch(getAssets(token));
            }
            if (typeRegisterDelete === 'Merchandise') {
                dispatch(deleteMerchandise(idItem, token));
                await new Promise(resolve => setTimeout(resolve, 500));
                dispatch(getMerchandises(token));
            }
            if (typeRegisterDelete === 'Product') {
                dispatch(deleteProduct(idItem, token));
                await new Promise(resolve => setTimeout(resolve, 500));
                dispatch(getProducts(token));
            }
            if (typeRegisterDelete === 'RawMaterial') {
                dispatch(deleteRawMaterial(idItem, token));
                await new Promise(resolve => setTimeout(resolve, 500));
                dispatch(getRawMaterials(token));
            }
            if (typeRegisterDelete === 'Service') {
                dispatch(deleteService(idItem, token));
                await new Promise(resolve => setTimeout(resolve, 500));
                dispatch(getServices(token));
            }
            if (typeRegisterDelete === 'AccountsBook') {
                dispatch(deleteAccountsBook(idItem, token));
                await new Promise(resolve => setTimeout(resolve, 500));
                dispatch(getAccountsBooks(token, currentPage, itemsByPage));
            }
            onCloseModal();
        } catch (error) {
            throw new Error('Error al eliminar el registro');
        }
    };

    return (
        <div className="p-3">
            <p>{typeDelete}</p>
            <div className="mb-3 d-flex align-items-center justify-content-center">
                {loading ? 
                    <div>
                        <button className={`${styles.button__Submit} mx-auto border-0 rounded`} type='submit' >
                            <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Eliminando...
                        </button>
                    </div> 
                :
                    <button className={`${styles.button__Submit} m-auto border-0 rounded`} type='submit' onClick={onSubmit}>Eliminar</button>
                }
            </div>
        </div>
    );
}

export default ConfirmDeleteRegister;
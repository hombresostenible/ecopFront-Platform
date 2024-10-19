/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { patchAsset, getAssetsOff, getAssets } from '../../../../../redux/User/03Inventories/01InventoryAssetsSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../types/UserPanel/03Inventories/assets.types';
import { IBranch } from '../../../../../types/UserPanel/02Branch/branch.types';
import styles from './styles.module.css';

interface ConsultAssetOffProps {
    token: string;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ConsultAssetOff({ token, branches, onCloseModal }: ConsultAssetOffProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const assetsOff = useSelector((state: RootState) => state.assets.assetsOff);

    useEffect(() => {
        if (token) {
            dispatch(getAssetsOff(token));
        }
    }, [token]);

    const calculateTotalInventoryOff = (inventoryOff: { quantity: number }[] = []) => {
        return inventoryOff.reduce((total, item) => total + item.quantity, 0);
    };

    //ESTA FUNCION EDITA LOS EQUIPOS, HERRAMIENTAS O MAQUINAS DADAS DE BAJA
    const onSubmit = (idAsset: string) => {
        try {
            const formData: IAssets = {
                inventoryOff: [{
                    date: new Date(),
                    quantity: 1, // O cualquier valor apropiado
                    reason: "Activo en uso",
                    description: "Activo en uso",
                }],
            } as IAssets;
            dispatch(patchAsset(idAsset, formData, token));
            onCloseModal();
            dispatch(getAssets(token));
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
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Marca</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Referencia</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Cantidad</th>
                            <th className="align-middle text-center" style={{ color: "#343a40", height: "50px" }}>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.isArray(assetsOff) && assetsOff.length > 0 ? (
                            assetsOff.map((asset) => (
                                <tr key={asset.id}>
                                    <td className='align-middle text-center'>
                                        <span>
                                            {branches && branches.map((branch, index) => (
                                                asset.branchId === branch.id && (
                                                    <span className="text-center" key={index}>{branch.nameBranch}</span>
                                                )
                                            ))}
                                        </span>
                                    </td>
                                    <td className='align-middle text-center'>
                                        <span>{asset.nameItem}</span>
                                    </td>
                                    <td className='align-middle text-center'>
                                        <span>{asset.brandItem}</span>
                                    </td>
                                    <td className='align-middle text-center'>
                                        <span>{asset.referenceItem}</span>
                                    </td>
                                    <td className='align-middle text-center'>
                                        <span>{calculateTotalInventoryOff(asset.inventoryOff)}</span>
                                    </td>
                                    <td className='d-flex align-items-center justify-content-center align-middle text-center'>
                                        <div
                                            className={styles.dsdsdsdsdsd}
                                            onClick={() => {
                                                onSubmit(asset.id); // Llamamos a onSubmit al hacer clic en "Normalizar"
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
                                    No hay equipos, herramientas o máquinas dadas de baja
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ConsultAssetOff;
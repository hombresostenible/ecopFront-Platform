import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../redux/store';
import { getAssets, putAsset } from '../../../../../redux/User/03Inventories/01InventoryAssetsSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../types/UserPanel/03Inventories/assets.types';
import { IBranch } from '../../../../../types/UserPanel/02Branch/branch.types';
import styles from './styles.module.css';

interface ModalEditAssetProps {
    token: string;
    idItem: string;
    asset: IAssets;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ModalEditAsset({ token, idItem, asset, branches, onCloseModal }: ModalEditAssetProps) {
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    
    const [loading, setLoading] = useState(false);
    const [editedAsset, setEditedAsset] = useState<IAssets>({ ...asset });

    const [editedCondition, setEditedCondition] = useState(asset?.conditionAssets);
    const [editedStateAssets, setEditedStateAssets] = useState(asset?.stateAssets);
    const [editedIVA, setEditedIVA] = useState<'No aplica' | 0 | 5 | 19>(asset?.IVA);
    const [editedConsumptionTax, setEditedConsumptionTax] = useState<'No aplica' | 4 | 8 | 16>(asset?.consumptionTax);
    const [editedRetentionType, setEditedRetentionType] = useState<'No aplica' | 'Honorarios y consultoria' | 'Servicios' | 'Compras' | 'Otros' | 'Pagos al exterior y dividendos'>(asset?.retentionType);
    const [editedWithholdingTax, setEditedWithholdingTax] = useState<'No aplica' | 0.1 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 6 | 7 | 8 | 10 | 11 | 15 | 20 | 33 | 35>(asset?.withholdingTax);
    const [editedWitholdingIVA, setEditedWitholdingIVA] = useState<'No aplica' | 15 | 100>(asset?.withholdingIVA);
    const [editedWwitholdingICA, setEditedWitholdingICA] = useState<'No aplica' | 2 | 3.4 | 4.14 | 5 | 6.9 | 8 | 9.66 | 11.04 | 13.8>(asset?.withholdingICA);
    const [editedIsDiscounted, setEditedIsDiscounted] = useState(asset?.isDiscounted);

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof IAssets,
        dataType: 'text' | 'number' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedAsset((prevEdited) => ({
                    ...prevEdited,
                    [field]: numericValue,
                }));
            }
        } else {
            setEditedAsset((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (editedAsset: IAssets) => {
        setLoading(true);
        try {
            editedAsset.conditionAssets = editedCondition;
            editedAsset.stateAssets = editedStateAssets;
            editedAsset.isDiscounted = editedIsDiscounted;
            editedAsset.IVA = editedIVA;
            editedAsset.consumptionTax = editedConsumptionTax;
            editedAsset.retentionType = editedRetentionType;
            editedAsset.withholdingTax = editedWithholdingTax;
            editedAsset.withholdingIVA = editedWitholdingIVA;
            editedAsset.withholdingICA = editedWwitholdingICA;
            await dispatch(putAsset(idItem, editedAsset, token));
            dispatch(getAssets(token));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al guardar cambios');
        } finally {
            setLoading(false);
        }
    };

    const cancelEditing = () => {
        onCloseModal();
        setEditedAsset({ ...asset });
    };

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Edita la información del equipo, herramienta o máquina</h1>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al activo</h6>
                <select
                    value={editedAsset.branchId || ''}
                    className={`${styles.input} mb-3 p-2 border`}
                    onChange={(e) => handleEditField(e, 'branchId')}
                >
                    {branches && branches.map((branch, index) => (
                        <option key={index} value={branch.id}>
                            {branch.nameBranch}
                        </option>
                    ))}
                </select>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.barCode || ''}
                        onChange={(e) => handleEditField(e, 'barCode', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre del activo</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.nameItem}
                        onChange={(e) => handleEditField(e, 'nameItem', 'text')}
                    />
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Marca del activo</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.brandItem}
                        onChange={(e) => handleEditField(e, 'brandItem', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Referencia del activo</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.referenceItem}
                        onChange={(e) => handleEditField(e, 'referenceItem', 'text')}
                    />
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Estado del activo</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.stateAssets || ''}
                        onChange={(e) => {
                            const value = e.target.value as 'Funciona correctamente' | 'Funciona requiere mantenimiento' | 'Dañada requiere cambio' | 'Dañada requiere reparacion';
                            setEditedStateAssets(value);
                            setEditedAsset((prevEdited) => ({
                                ...prevEdited,
                                stateAssets: value,
                            }));
                        }}
                    >
                        <option value=''>Selecciona una opción</option>
                        <option value='Funciona correctamente'>Funciona correctamente</option>
                        <option value='Funciona requiere mantenimiento'>Funciona requiere mantenimiento</option>
                        <option value='Dañada requiere cambio'>Dañada requiere cambio</option>
                        <option value='Dañada requiere reparacion'>Dañada requiere reparacion</option>
                    </select>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Condición del activo</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.conditionAssets || ''}
                        onChange={(e) => {
                            const value = e.target.value as 'Nuevo' | 'Usado';
                            setEditedCondition(value);
                            setEditedAsset((prevEdited) => ({
                                ...prevEdited,
                                conditionAssets: value,
                            }));
                        }}
                    >
                        <option value='Nuevo'>Nuevo</option>
                        <option value='Usado'>Usado</option>
                    </select>
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Inventario</h6>
                <input
                    type="number"
                    className={`${styles.input} mb-3 p-2 border`}
                    value={editedAsset.inventory}
                    onChange={(e) => handleEditField(e, 'inventory', 'number')}
                />
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de compra</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.purchasePriceBeforeTax}
                        onChange={(e) => handleEditField(e, 'purchasePriceBeforeTax', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.sellingPrice}
                        onChange={(e) => handleEditField(e, 'sellingPrice', 'text')}
                    />
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Equipo con descuento?</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.isDiscounted || ''}
                        onChange={(e) => {
                            const value = e.target.value as 'Si' | 'No';
                            setEditedIsDiscounted(value);
                            setEditedAsset((prevEdited) => ({
                                ...prevEdited,
                                isDiscounted: value,
                            }));
                        }}
                    >
                        <option value='Si'>Si</option>
                        <option value='No'>No</option>
                    </select>
                </div>
                {editedIsDiscounted && (
                    <div className="w-100">
                        <h6 className={styles.label}>Porcentaje de descuento</h6>
                        <input
                            type="text"
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedAsset.discountPercentage}
                            onChange={(e) => handleEditField(e, 'discountPercentage', 'text')}
                        />
                    </div>
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>IVA del activo</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.IVA || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 0 | 5 | 19;
                            setEditedIVA(value);
                            setEditedAsset((prevEdited) => ({
                                ...prevEdited,
                                IVA: value,
                            }));
                        }}
                    >
                        <option value='No aplica'>No aplica</option>
                        <option value={0}>0 %</option>
                        <option value={5}>5 %</option>
                        <option value={19}>19 %</option>
                    </select>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Impuesto al consumo del activo</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.consumptionTax || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 4 | 8 | 16;
                            setEditedConsumptionTax(value);
                            setEditedAsset((prevEdited) => ({
                                ...prevEdited,
                                consumptionTax: value,
                            }));
                        }}
                    >
                        <option value='No aplica'>No aplica</option>
                        <option value={4}>4 %</option>
                        <option value={8}>8 %</option>
                        <option value={16}>16 %</option>
                    </select>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de retención en la fuente del activo</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.retentionType || ''}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 'Honorarios y consultoria' | 'Servicios' | 'Compras' | 'Otros' | 'Pagos al exterior y dividendos';
                            setEditedRetentionType(value);
                            setEditedAsset((prevEdited) => ({
                                ...prevEdited,
                                retentionType: value,
                            }));
                        }}
                    >
                        <option value='No aplica'>No aplica</option>
                        <option value='Honorarios y consultoria'>Honorarios y consultoria</option>
                        <option value='Servicios'>Servicios</option>
                        <option value='Compras'>Compras</option>
                        <option value='Otros'>Otros</option>
                        <option value='Pagos al exterior y dividendos'>Pagos al exterior y dividendos</option>
                    </select>
                </div>

                <div className="w-100">
                    <h6 className={styles.label}>Porcentaje de Rete Fuente del activo</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.withholdingTax || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 0.1 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 6 | 7 | 8 | 10 | 11 | 15 | 20 | 33 | 35;
                            setEditedWithholdingTax(value);
                            setEditedAsset((prevEdited) => ({
                                ...prevEdited,
                                withholdingTax: value,
                            }));
                        }}
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

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Rete IVA del activo</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.withholdingIVA || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 15 | 100;
                            setEditedWitholdingIVA(value);
                            setEditedAsset((prevEdited) => ({
                                ...prevEdited,
                                withholdingIVA: value,
                            }));
                        }}
                    >
                        <option value='No aplica'>No aplica</option>
                        <option value={15}>15 %</option>
                        <option value={100}>100 %</option>
                    </select>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Rete ICA del activo</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedAsset.withholdingICA || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 2 | 3.4 | 4.14 | 5 | 6.9 | 8 | 9.66 | 11.04 | 13.8;
                            setEditedWitholdingICA(value);
                            setEditedAsset((prevEdited) => ({
                                ...prevEdited,
                                withholdingICA: value,
                            }));
                        }}
                    >
                        <option value='No aplica'>No aplica</option>
                        <option value={2}>2 %</option>
                        <option value={3.4}>3.4 %</option>
                        <option value={4.14}>4.14 %</option>
                        <option value={5}>5 %</option>
                        <option value={6.9}>6.9 %</option>
                        <option value={8}>8 %</option>
                        <option value={9.66}>9.66 %</option>
                        <option value={11.04}>11.04 %</option>
                        <option value={13.8}>13.8 %</option>
                    </select>
                </div>
            </div>

            <div className="mb-3 d-flex align-items-center justify-content-center">
                {loading ?
                    <div>
                        <button className={`${styles.button__Submit} border-0 mx-auto rounded`} type='submit' >
                            <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Guardando...
                        </button>
                    </div> 
                :
                    <button className={`${styles.button__Submit} border-0 rounded`} type='submit' onClick={() => handleSaveChanges(editedAsset)}>Guardar</button>
                }
                <button className={`${styles.button__Cancel} border-0`} onClick={() => cancelEditing()}>Cancelar</button>
            </div>
        </div>
    );
}

export default ModalEditAsset;
/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../redux/store';
import { getServices, putService } from '../../../../../redux/User/03Inventories/05InventoryServicesSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IService } from '../../../../../types/UserPanel/03Inventories/services.types';
import { IBranch } from '../../../../../types/UserPanel/02Branch/branch.types';
import styles from './styles.module.css';

interface ModalEditServiceProps {
    token: string;
    idItem: string;
    service: IService;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ModalEditService({ token, idItem, service, branches, onCloseModal }: ModalEditServiceProps) {
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [editedService, setEditedService] = useState<IService>({ ...service });

    const [editedIsDiscounted, setEditedIsDiscounted] = useState(service?.isDiscounted);
    const [editedIVA, setEditedIVA] = useState<'No aplica' | 0 | 5 | 19>(service?.IVA);
    const [editedConsumptionTax, setEditedConsumptionTax] = useState<'No aplica' | 4 | 8 | 16>(service?.consumptionTax);
    const [editedRetentionType, setEditedRetentionType] = useState<'No aplica' | 'Honorarios y consultoria' | 'Servicios' | 'Compras' | 'Pagos al exterior y dividendos' | 'Otros'>(service?.retentionType);
    const [editedWithholdingTax, setEditedWithholdingTax] = useState<'No aplica' | 0.1 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 6 | 7 | 8 | 10 | 11 | 15 | 20 | 33 | 35>(service?.withholdingTax);
    const [editedWitholdingIVA, setEditedWitholdingIVA] = useState<'No aplica' | 15 | 100>(service?.withholdingIVA);
    const [editedWwitholdingICA, setEditedWitholdingICA] = useState<'No aplica' | 2 | 3.4 | 4.14 | 5 | 6.9 | 8 | 9.66 | 11.04 | 13.8>(service?.withholdingICA);

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string,
        dataType: 'text' | 'number' | 'date' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedService((prevEdited) => ({
                    ...prevEdited,
                    [field]: numericValue,
                }));
            }
        } else if (dataType === 'date') {
            const formattedDate = new Date(newValue).toISOString().split('T')[0];
            setEditedService((prevEdited) => ({
                ...prevEdited,
                [field]: formattedDate,
            }));
        } else {
            setEditedService((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (editedService: IService) => {
        setLoading(true);
        try {
            editedService.isDiscounted = editedIsDiscounted;
            // IMPUESTOS
            editedService.IVA = editedIVA;
            editedService.consumptionTax = editedConsumptionTax;
            editedService.retentionType = editedRetentionType;
            editedService.withholdingTax = editedWithholdingTax;
            editedService.withholdingIVA = editedWitholdingIVA;
            editedService.withholdingICA = editedWwitholdingICA;
            await dispatch(putService(idItem, editedService, token));
            dispatch(getServices(token));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al guardar cambios');
        } finally {
            setLoading(false);
        }
    };

    const cancelEditing = () => {
        onCloseModal();
        setEditedService({ ...editedService });
    };

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Edita la información del servicio</h1>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al servicio</h6>
                <select
                    value={editedService.branchId}
                    className={`${styles.input} mb-3 p-2 border`}
                    onChange={(e) => handleEditField(e, 'branchId')}
                    
                >
                    {branches && branches.map((service, index) => (
                        <option key={index} value={service.id}>
                            {service.nameBranch}
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
                        value={editedService.barCode || ''}
                        onChange={(e) => handleEditField(e, 'barCode', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre del servicio</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedService.nameItem || ''}
                        onChange={(e) => handleEditField(e, 'nameItem', 'text')}
                    />
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Precio de venta</h6>
                <input
                    type="text"
                    className={`${styles.input} mb-3 p-2 border`}
                    value={editedService.sellingPrice || ''}
                    onChange={(e) => handleEditField(e, 'sellingPrice', 'text')}
                />
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene descuento?</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedIsDiscounted || ''}
                        onChange={(e) => setEditedIsDiscounted(e.target.value as 'Si' | 'No')}
                    >
                        <option value='Si'>Si</option>
                        <option value='No'>No</option>
                    </select>
                </div>
                {editedIsDiscounted === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Porcentage de descuento</h6>
                        <input
                            type="text"
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedService.discountPercentage || ''}
                            onChange={(e) => handleEditField(e, 'discountPercentage', 'text')}
                        />
                    </div>
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>IVA</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedService.IVA || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 0 | 5 | 19;
                            setEditedIVA(value);
                            setEditedService((prevEdited) => ({
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
                    <h6 className={styles.label}>Impuesto al consumo</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedService.consumptionTax || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 4 | 8 | 16;
                            setEditedConsumptionTax(value);
                            setEditedService((prevEdited) => ({
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
                    <h6 className={styles.label}>Tipo de retención en la fuente</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedService.retentionType || ''}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 'Honorarios y consultoria' | 'Servicios' | 'Compras' | 'Otros' | 'Pagos al exterior y dividendos';
                            setEditedRetentionType(value);
                            setEditedService((prevEdited) => ({
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
                    <h6 className={styles.label}>Porcentaje de Rete Fuente</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedService.withholdingTax || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 0.1 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 6 | 7 | 8 | 10 | 11 | 15 | 20 | 33 | 35;
                            setEditedWithholdingTax(value);
                            setEditedService((prevEdited) => ({
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
                    <h6 className={styles.label}>Rete IVA</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedService.withholdingIVA || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 15 | 100;
                            setEditedWitholdingIVA(value);
                            setEditedService((prevEdited) => ({
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
                    <h6 className={styles.label}>Rete ICA</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedService.withholdingICA || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 2 | 3.4 | 4.14 | 5 | 6.9 | 8 | 9.66 | 11.04 | 13.8;
                            setEditedWitholdingICA(value);
                            setEditedService((prevEdited) => ({
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
                    <button className={`${styles.button__Submit} border-0 rounded`} type='submit' onClick={() => handleSaveChanges(editedService)}>Guardar</button>
                }
                <button className={`${styles.button__Cancel} border-0`} onClick={() => cancelEditing()}>Cancelar</button>
            </div>
        </div>
    );
}

export default ModalEditService;
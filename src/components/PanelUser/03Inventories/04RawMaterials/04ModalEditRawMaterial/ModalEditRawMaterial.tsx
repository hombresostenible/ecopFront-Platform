import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../redux/store';
import { getRawMaterials, putRawMaterial } from '../../../../../redux/User/03Inventories/04InventoryRawMateralsSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IRawMaterial } from '../../../../../types/UserPanel/03Inventories/rawMaterial.types';
import { IBranch } from '../../../../../types/UserPanel/02Branch/branch.types';
import styles from './styles.module.css';

interface ModalEditRawMaterialProps {
    token: string;
    idItem: string;
    rawMaterial: IRawMaterial;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ModalEditRawMaterial({ token, idItem, rawMaterial, branches, onCloseModal }: ModalEditRawMaterialProps) {
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [editedRawMaterial, setEditedRawMaterial] = useState<IRawMaterial>({ ...rawMaterial });

    const [editedPackaged, setEditedPackaged] = useState(rawMaterial?.packaged || 'No');
    const [editedPrimaryPackageType, setEditedPrimaryPackageType] = useState(rawMaterial?.primaryPackageType);    
    const [editedIndividualPackaging, setEditedIndividualPackaging] = useState(rawMaterial?.individualPackaging);
    const [editedSecondaryPackageType, setEditedSecondaryPackageType] = useState(rawMaterial?.secondaryPackageType);
    const [editedReturnablePackaging, setEditedReturnablePackaging] = useState(rawMaterial?.returnablePackaging);
    const [editedUnitMeasure, setEditedUnitMeasure] = useState(rawMaterial?.unitMeasure);
    const [editedInventoryIncrease, setEditedInventoryIncrease] = useState(rawMaterial?.inventoryIncrease || 'No');
    const [editedPeriodicityAutomaticIncrease, setEditedPeriodicityAutomaticIncrease] = useState(rawMaterial?.periodicityAutomaticIncrease);
    const [editedIsDiscounted, setEditedIsDiscounted] = useState(rawMaterial?.isDiscounted);
    const [editedExpirationDate, setEditedExpirationDate] = useState<Date | undefined>(rawMaterial?.expirationDate ? new Date(rawMaterial.expirationDate) : undefined);
    const currentDate = new Date().toISOString().split('T')[0];

    const [editedIVA, setEditedIVA] = useState<'No aplica' | 0 | 5 | 19>(rawMaterial?.IVA);
    const [editedConsumptionTax, setEditedConsumptionTax] = useState<'No aplica' | 4 | 8 | 16>(rawMaterial?.consumptionTax);
    const [editedRetentionType, setEditedRetentionType] = useState<'No aplica' | 'Honorarios y consultoria' | 'Servicios' | 'Compras' | 'Pagos al exterior y dividendos' | 'Otros'>(rawMaterial?.retentionType);
    const [editedWithholdingTax, setEditedWithholdingTax] = useState<'No aplica' | 0.1 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 6 | 7 | 8 | 10 | 11 | 15 | 20 | 33 | 35>(rawMaterial?.withholdingTax);
    const [editedWitholdingIVA, setEditedWitholdingIVA] = useState<'No aplica' | 15 | 100>(rawMaterial?.withholdingIVA);
    const [editedWwitholdingICA, setEditedWitholdingICA] = useState<'No aplica' | 2 | 3.4 | 4.14 | 5 | 6.9 | 8 | 9.66 | 11.04 | 13.8>(rawMaterial?.withholdingICA);

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof IRawMaterial,
        dataType: 'text' | 'number' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedRawMaterial((prevEdited) => ({
                    ...prevEdited,
                    [field]: numericValue,
                }));
            }
        } else {
            setEditedRawMaterial((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (editedRawMaterial: IRawMaterial) => {
        setLoading(true);
        try {
            editedRawMaterial.packaged = editedPackaged;
            editedRawMaterial.primaryPackageType = editedPrimaryPackageType;
            editedRawMaterial.individualPackaging = editedIndividualPackaging;
            editedRawMaterial.secondaryPackageType = editedSecondaryPackageType;
            editedRawMaterial.returnablePackaging = editedReturnablePackaging;
            editedRawMaterial.unitMeasure = editedUnitMeasure;
            editedRawMaterial.inventoryIncrease = editedInventoryIncrease;
            editedRawMaterial.periodicityAutomaticIncrease = editedPeriodicityAutomaticIncrease;
            editedRawMaterial.isDiscounted = editedIsDiscounted;
            editedRawMaterial.expirationDate = editedExpirationDate;
            // IMPUESTOS
            editedRawMaterial.IVA = editedIVA;
            editedRawMaterial.consumptionTax = editedConsumptionTax;
            editedRawMaterial.retentionType = editedRetentionType;
            editedRawMaterial.withholdingTax = editedWithholdingTax;
            editedRawMaterial.withholdingIVA = editedWitholdingIVA;
            editedRawMaterial.withholdingICA = editedWwitholdingICA;
            if (editedInventoryIncrease === 'No') {
                editedRawMaterial.periodicityAutomaticIncrease = undefined;
                editedRawMaterial.automaticInventoryIncrease = 0;
            }
            if (editedPackaged === 'No') editedRawMaterial.primaryPackageType = undefined;
            if (editedIndividualPackaging === 'No') editedRawMaterial.secondaryPackageType = undefined;
            await dispatch(putRawMaterial(idItem, editedRawMaterial, token));
            dispatch(getRawMaterials(token));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al guardar cambios');
        } finally {
            setLoading(false);
        }
    };

    const cancelEditing = () => {
        onCloseModal();
        setEditedRawMaterial({ ...editedRawMaterial });
    };

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Edita la información de la meteria prima</h1>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada a la materia prima</h6>
                <select
                    value={editedRawMaterial.branchId}
                    className={`${styles.input} mb-3 p-2 border`}
                    onChange={(e) => handleEditField(e, 'branchId')}
                    
                >
                    {branches && branches.map((rawMaterial, index) => (
                        <option key={index} value={rawMaterial.id}>
                            {rawMaterial.nameBranch}
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
                        value={editedRawMaterial.barCode || ''}
                        onChange={(e) => handleEditField(e, 'barCode', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre de la materia prima</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedRawMaterial.nameItem || ''}
                        onChange={(e) => handleEditField(e, 'nameItem', 'text')}
                    />
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Marca de la materia prima</h6>
                <input
                    type="text"
                    className={`${styles.input} mb-3 p-2 border`}
                    value={editedRawMaterial.brandItem || ''}
                    onChange={(e) => handleEditField(e, 'brandItem', 'text')}
                />
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Empacado?</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedPackaged || ''}
                        onChange={(e) => setEditedPackaged(e.target.value as 'Si' | 'No')}
                    >
                        <option value='Si'>Si</option>
                        <option value='No'>No</option>
                    </select>
                </div>
                {editedPackaged === 'Si' && (
                   <div className="w-100">
                        <h6 className={styles.label}>Tipo de empaque principal</h6>
                        <select
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedPrimaryPackageType || ''}
                            onChange={(e) => setEditedPrimaryPackageType(e.target.value as 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas')}
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
                    </div>
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene empaques individuales?</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedIndividualPackaging || ''}
                        onChange={(e) => setEditedIndividualPackaging(e.target.value as 'Si' | 'No')}
                    >
                        <option value='Si'>Si</option>
                        <option value='No'>No</option>
                    </select>
                </div>
                {editedIndividualPackaging === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Tipo de empaque secundario</h6>
                        <select
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedSecondaryPackageType || ''}
                            onChange={(e) => setEditedSecondaryPackageType(e.target.value as 'Papel' | 'Papel de archivo' | 'Carton' | 'Aluminio' | 'Plegadiza' | 'Vidrio' | 'PET / PETE Polietileno Tereftalato' | 'HDPE Polietileno de alta densidad' | 'PVC Policloruro de Vinilo' | 'LDPE Polietileno de baja densidad' | 'PP Polipropileno' | 'PS Poliestireno' | 'Otros plasticos (Policarbonato, estireno, nylon)' | 'Hierro' | 'Icopor' | 'Biodegradable' | 'Plastico de burbujas')}
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
                    </div>
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad por paquete</h6>
                    <input
                        type="number"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedRawMaterial.quantityPerPackage || 1}
                        onChange={(e) => handleEditField(e, 'quantityPerPackage', 'number')}
                        min={0}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>¿Retornable?</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedReturnablePackaging || ''}
                        onChange={(e) => setEditedReturnablePackaging(e.target.value as 'Si' | 'No')}
                    >
                        <option value='Si'>Si</option>
                        <option value='No'>No</option>
                    </select>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Inventario</h6>
                    <input
                        type="number"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedRawMaterial.inventory || ''}
                        onChange={(e) => handleEditField(e, 'inventory', 'number')}
                        min={0}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Unidad de medida</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedUnitMeasure || ''}
                        onChange={(e) => setEditedUnitMeasure(e.target.value as 'Unidades' | 'Ristra' | 'Decena' | 'Docena' | 'Miligramo' | 'Gramo' | 'Media libra' | 'Libra' | 'Kilogramo' | 'Caja' | 'Paca' | 'Arroba' | 'Bulto' | 'Saco' | 'Tonelada' | 'Mililitro' | 'Onza' | 'Litro' | 'Galon' | 'Pimpina' | 'Metro cubico' | 'Milimetro' | 'Centrimetro' | 'Pulgada' | 'Metro' | 'Centimetro cuadrado' | 'Metro cuadrado')}
                    >
                        <option value='Unidades'>Unidades</option>
                        <option value='Ristra'>Ristra</option>
                        <option value='Decena'>Decena</option>
                        <option value='Docena'>Docena</option>
                        <option value='Miligramo'>Miligramo </option>
                        <option value='Gramo'>Gramo </option>
                        <option value='Media libra'>Media libra</option>
                        <option value='Libra'>Libra</option>
                        <option value='Kilogramo'>Kilogramo</option>
                        <option value='Caja'>Caja</option>
                        <option value='Paca'>Paca</option>
                        <option value='Arroba'>Arroba</option>
                        <option value='Bulto'>Bulto</option>
                        <option value='Saco'>Saco</option>
                        <option value='Tonelada'>Tonelada</option>
                        <option value='Mililitro'>Mililitro</option>
                        <option value='Onza'>Onza</option>
                        <option value='Litro'>Litro</option>
                        <option value='Galon'>Galón</option>
                        <option value='Pimpina'>Pimpina</option>
                        <option value='Metro cubico'>Metro cíbico</option>
                        <option value='Milimetro'>Milimetro</option>
                        <option value='Centrimetro'>Centrimetro</option>
                        <option value='Pulgada'>Pulgada</option>
                        <option value='Metro'>Metro</option>
                        <option value='Centimetro cuadrado'>Centímetro cuadrado</option>
                        <option value='Metro cuadrado'>Metro cuadrado</option>
                    </select>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Autoincremento?</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedInventoryIncrease || ''}
                        onChange={(e) => setEditedInventoryIncrease(e.target.value as 'Si' | 'No')}
                    >
                        <option value='Si'>Si</option>
                        <option value='No'>No</option>
                    </select>
                </div>
                {editedInventoryIncrease === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Periodicidad del Autoincremento</h6>
                        <select
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedPeriodicityAutomaticIncrease || ''}
                            onChange={(e) => setEditedPeriodicityAutomaticIncrease(e.target.value as 'Diario' | 'Semanal' | 'Quincenal' | 'Mensual' | 'Bimestral' | 'Trimestral' | 'Semestral')}
                        >
                            <option value='Diario'>Diario</option>
                            <option value='Semanal'>Semanal</option>
                            <option value='Quincenal'>Quincenal</option>
                            <option value='Mensual'>Mensual</option>
                            <option value='Bimestral'>Bimestral</option>
                            <option value='Trimestral'>Trimestral</option>
                            <option value='Semestral'>Semestral</option>
                        </select>
                    </div>
                )}
            </div>

            {editedInventoryIncrease === 'Si' && (
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad del autoincremento</h6>
                    <input
                        type="number"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedRawMaterial.automaticInventoryIncrease || ''}
                        onChange={(e) => handleEditField(e, 'automaticInventoryIncrease', 'number')}
                        min={0}
                    />
                </div>
            )}

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de compra antes de impuestos</h6>
                    <input
                        type="number"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedRawMaterial.purchasePriceBeforeTax || ''}
                        onChange={(e) => handleEditField(e, 'purchasePriceBeforeTax', 'number')}
                        min={0}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <input
                        type="number"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedRawMaterial.sellingPrice || ''}
                        onChange={(e) => handleEditField(e, 'sellingPrice', 'number')}
                        min={0}
                    />
                </div>
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
                            value={editedRawMaterial.discountPercentage || ''}
                            onChange={(e) => handleEditField(e, 'discountPercentage', 'text')}
                        />
                    </div>
                )}
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Fecha de expiración</h6>
                <input
                    type="date"
                    className={`${styles.input} mb-3 p-2 border`}
                    value={editedExpirationDate ? editedExpirationDate.toISOString().split('T')[0] : currentDate || ''}
                    onChange={(e) => setEditedExpirationDate(new Date(e.target.value))}
                />
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>IVA</h6>
                    <select
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedRawMaterial.IVA || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 0 | 5 | 19;
                            setEditedIVA(value);
                            setEditedRawMaterial((prevEdited) => ({
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
                        value={editedRawMaterial.consumptionTax || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 4 | 8 | 16;
                            setEditedConsumptionTax(value);
                            setEditedRawMaterial((prevEdited) => ({
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
                        value={editedRawMaterial.retentionType || ''}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 'Honorarios y consultoria' | 'Servicios' | 'Compras' | 'Otros' | 'Pagos al exterior y dividendos';
                            setEditedRetentionType(value);
                            setEditedRawMaterial((prevEdited) => ({
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
                        value={editedRawMaterial.withholdingTax || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 0.1 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 6 | 7 | 8 | 10 | 11 | 15 | 20 | 33 | 35;
                            setEditedWithholdingTax(value);
                            setEditedRawMaterial((prevEdited) => ({
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
                        value={editedRawMaterial.withholdingIVA || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 15 | 100;
                            setEditedWitholdingIVA(value);
                            setEditedRawMaterial((prevEdited) => ({
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
                        value={editedRawMaterial.withholdingICA || 'No aplica'}
                        onChange={(e) => {
                            const value = e.target.value as 'No aplica' | 2 | 3.4 | 4.14 | 5 | 6.9 | 8 | 9.66 | 11.04 | 13.8;
                            setEditedWitholdingICA(value);
                            setEditedRawMaterial((prevEdited) => ({
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
                    <button className={`${styles.button__Submit} border-0 rounded`} type='submit' onClick={() => handleSaveChanges(editedRawMaterial)}>Guardar</button>
                }
                <button className={`${styles.button__Cancel} border-0`} onClick={() => cancelEditing()}>Cancelar</button>
            </div>
        </div>
    );
}

export default ModalEditRawMaterial;
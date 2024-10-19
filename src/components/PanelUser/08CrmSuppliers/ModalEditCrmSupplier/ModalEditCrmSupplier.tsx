import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../redux/store';
import { putCrmSupplier, getCrmSuppliers } from '../../../../redux/User/08CrmSupplierSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmSupplier } from '../../../../types/UserPanel/08CrmSupplierSlice/crmSupplier.types';
import DepartmenAndCity from '../../../../helpers/DepartmenAndCity/DepartmenAndCity';
import styles from './styles.module.css';

interface ModalCrmSupplierProps {
    token: string;
    idCrmSupplier: string;
    crmSupplier: ICrmSupplier;
    onCloseModal: () => void;
}

function ModalEditCrmSupplier({ token, idCrmSupplier, crmSupplier, onCloseModal }: ModalCrmSupplierProps) {
    // REDUX
    const dispatch: AppDispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [editedCrmSupplier, setEditedCrmSupplier] = useState<ICrmSupplier>({ ...crmSupplier });
    const [editedTypeDocumentId, setEditedTypeDocumentId] = useState(crmSupplier?.typeDocumentId);

    const [selectedDepartment, setSelectedDepartment] = useState(crmSupplier?.department);
    const [selectedCity, setSelectedCity] = useState(crmSupplier?.city); 
    const [selectedCodeDane, setSelectedCodeDane] = useState(crmSupplier?.codeDane);
    const [selectedSubregionCodeDane, setSelectedSubregionCodeDane] = useState(crmSupplier?.subregionCodeDane);
    const [resetDepartmenAndCity, setResetDepartmenAndCity] = useState(false);
    
    const handleSelectDepartmentAndCity = (department: string, city: string, codeDane: string, subregionCodeDane: string) => {
        const validDepartment = department as 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada' | undefined;
        setSelectedDepartment(validDepartment);
        setSelectedCity(city);
        setSelectedCodeDane(codeDane);
        setSelectedSubregionCodeDane(subregionCodeDane);
    };

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof ICrmSupplier,
        dataType: 'text' | 'number' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedCrmSupplier((prevEdited) => ({
                    ...prevEdited,
                    [field]: numericValue,
                }));
            }
        } else {
            setEditedCrmSupplier((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (formData: ICrmSupplier) => {
        setLoading(true);
        try {
            formData.typeDocumentId = editedTypeDocumentId;         
            formData.department = selectedDepartment as ICrmSupplier['department'];
            formData.city = selectedCity;
            formData.codeDane = selectedCodeDane;
            formData.subregionCodeDane = selectedSubregionCodeDane;
            await dispatch(putCrmSupplier(idCrmSupplier, formData, token));
            dispatch(getCrmSuppliers(token));
            setResetDepartmenAndCity(true);
            onCloseModal();
        } catch (error) {
            throw new Error('Error al guardar cambios');
        } finally {
            setLoading(false);
        }
    };

    const cancelEditing = () => {
        onCloseModal();
        setEditedCrmSupplier({ ...editedCrmSupplier });
    };
   
    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Información del proveedor</h1>

            <div className="w-100">
                <h6 className={styles.label}>Tipo de identificación del proveedor</h6>
                <select
                    value={editedTypeDocumentId}
                    className={`${styles.input} mb-3 p-2 border`}
                    onChange={(e) => setEditedTypeDocumentId(e.target.value as 'NIT' | 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte')}
                >
                    <option value='NIT' translate="no">NIT</option>
                    <option value='Cedula de Ciudadania'>Cedula de Ciudadania</option>
                    <option value='Cedula de Extranjeria'>Cedula de Extranjeria</option>
                    <option value='Pasaporte'>Pasaporte</option>
                </select>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Número de identificación del proveedor</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedCrmSupplier.documentId}
                        onChange={(e) => handleEditField(e, 'documentId', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Dígito de verificación del proveedor</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedCrmSupplier.verificationDigit}
                        onChange={(e) => handleEditField(e, 'verificationDigit', 'text')}
                        placeholder='Dígito de verificación'
                    />
                </div>
            </div>

            {(editedTypeDocumentId === 'Cedula de Ciudadania' || editedTypeDocumentId ==='Cedula de Extranjeria' || editedTypeDocumentId === 'Pasaporte')  && (
                <div className='d-flex gap-3'>
                    <div className="w-100">
                        <h6 className={styles.label}>Nombre del proveedor</h6>
                        <input
                            type="text"
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedCrmSupplier.name}
                            onChange={(e) => handleEditField(e, 'name', 'text')}
                            placeholder='Nombre del proveedor'
                        />
                    </div>
                    <div className="w-100">
                        <h6 className={styles.label}>Apellido del proveedor</h6>
                        <input
                            type="text"
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedCrmSupplier.lastName}
                            onChange={(e) => handleEditField(e, 'lastName', 'text')}
                            placeholder='Apellido del proveedor'
                        />
                    </div>
                </div>
            )}

            {editedTypeDocumentId === 'NIT'  && (
                <div className='d-flex gap-3'>
                    <div className="w-100">
                        <h6 className={styles.label}>Nombre de la empresa</h6>
                        <input
                            type="text"
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedCrmSupplier.corporateName}
                            onChange={(e) => handleEditField(e, 'corporateName', 'text')}
                            placeholder='Nombre de la empresa'
                        />
                    </div>
                </div>
            )}

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Email del proveedor</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedCrmSupplier.email}
                        onChange={(e) => handleEditField(e, 'email', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Teléfono del proveedor</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedCrmSupplier.phone}
                        onChange={(e) => handleEditField(e, 'phone', 'text')}
                    />
                </div>
            </div>

            <DepartmenAndCity
                onSelect={handleSelectDepartmentAndCity}
                reset={resetDepartmenAndCity}
                initialDepartment={selectedDepartment}
                initialCity={selectedCity}
            />

            <div className="w-100">
                <h6 className={styles.label}>Dirección del proveedor</h6>
                <input
                    type="text"
                    className={`${styles.input} mb-3 p-2 border`}
                    value={editedCrmSupplier.address}
                    onChange={(e) => handleEditField(e, 'address', 'text')}
                />
            </div>

            <div className="mb-3 d-flex align-items-center justify-content-center">
                {loading ?
                    <div>
                        <button className={`${styles.button__Submit} border-0 mx-auto rounded`} type='submit' >
                            <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Guardando...
                        </button>
                    </div> 
                :
                    <button className={`${styles.button__Submit} border-0 rounded`} type='submit' onClick={() => handleSaveChanges(editedCrmSupplier)}>Guardar</button>
                }
                <button className={`${styles.button__Cancel} border-0`} onClick={() => cancelEditing()}>Cancelar</button>
            </div>
        </div>
    );
}

export default ModalEditCrmSupplier;
import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../../redux/store';
import { putUserPlatform, getUsersPlatform } from '../../../../../redux/User/userPlatformSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IUserPlatform } from '../../../../../types/UserPanel/06ElectronicPayroll/userPlatform.types';
import { IBranch } from '../../../../../types/UserPanel/02Branch/branch.types';
import DepartmenAndCity from '../../../../../helpers/DepartmenAndCity/DepartmenAndCity';
import styles from './styles.module.css';

interface ModalEditCollaboratorProps {
    token: string;
    idUserPlatform: string;
    userPlatform: IUserPlatform;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ModalEditCollaborator({ token, idUserPlatform, userPlatform, branches, onCloseModal }: ModalEditCollaboratorProps) {
    const dispatch: AppDispatch = useDispatch();

    const [editedUserPlatform, setEditedUserPlatform] = useState<IUserPlatform>({ ...userPlatform });
    const [editedTypeDocumentId, setEditedTypeDocumentId] = useState(userPlatform?.typeDocumentId);
    const [editedTypeRole, setEditedTypeRole] = useState(userPlatform?.typeRole);

    const [selectedDepartment, setSelectedDepartment] = useState(userPlatform?.department);
    const [selectedCity, setSelectedCity] = useState(userPlatform?.city); 
    const [selectedCodeDane, setSelectedCodeDane] = useState(userPlatform?.codeDane);
    const [selectedSubregionCodeDane, setSelectedSubregionCodeDane] = useState(userPlatform?.subregionCodeDane);
    const [resetDepartmenAndCity, setResetDepartmenAndCity] = useState(false);
    
    const handleSelectDepartmentAndCity = (department: string, city: string, codeDane: string, subregionCodeDane: string) => {
        // Asegurar que el valor de department es un valor válido de la lista o undefined
        const validDepartment = department as 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
    
        setSelectedDepartment(validDepartment);
        setSelectedCity(city);
        setSelectedCodeDane(codeDane);
        setSelectedSubregionCodeDane(subregionCodeDane);
    };

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof IUserPlatform,
        dataType: 'text' | 'number' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedUserPlatform((prevEdited) => ({
                    ...prevEdited,
                    [field]: numericValue,
                }));
            }
        } else {
            setEditedUserPlatform((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (formData: IUserPlatform) => {
        try {
            formData.typeDocumentId = editedTypeDocumentId;
            formData.typeRole = editedTypeRole;
            formData.department = selectedDepartment as IUserPlatform['department'];
            formData.city = selectedCity;
            formData.codeDane = selectedCodeDane;
            formData.subregionCodeDane = selectedSubregionCodeDane;

            await dispatch(putUserPlatform(token, formData));
            dispatch(getUsersPlatform(token));
            setResetDepartmenAndCity(true);
            onCloseModal();
        } catch (error) {
            throw new Error('Error al guardar cambios');
        }
    };

    const cancelEditing = (id: string) => {
        onCloseModal();
        setEditedUserPlatform({ ...editedUserPlatform, [id]: { ...userPlatform } });
    };

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Información del colaborador</h1>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al colaborador</h6>
                <select
                    value={editedUserPlatform.branchId}
                    className={`${styles.input} mb-3 p-2 border`}
                    onChange={(e) => handleEditField(e, 'branchId')}
                >
                    {branches && branches.map((merchandise, index) => (
                        <option key={index} value={merchandise.id}>
                            {merchandise.nameBranch}
                        </option>
                    ))}
                </select>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Nombres del colaborador</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedUserPlatform.name}
                        onChange={(e) => handleEditField(e, 'name', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Apellidos del colaborador</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedUserPlatform.lastName}
                        onChange={(e) => handleEditField(e, 'lastName', 'text')}
                    />
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de identificación del colaborador</h6>
                    <select
                        value={editedTypeDocumentId}
                        className={`${styles.input} mb-3 p-2 border`}
                        onChange={(e) => setEditedTypeDocumentId(e.target.value as 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte')}
                    >
                        <option value='NIT' translate="no">NIT</option>
                        <option value='Cedula de Ciudadania'>Cedula de Ciudadania</option>
                        <option value='Cedula de Extranjeria'>Cedula de Extranjeria</option>
                        <option value='Pasaporte'>Pasaporte</option>
                    </select>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Número de identificación del colaborador</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedUserPlatform.documentId}
                        onChange={(e) => handleEditField(e, 'documentId', 'text')}
                    />
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Tipo de rol del colaborador</h6>
                <select
                    value={editedTypeDocumentId}
                    className={`${styles.input} mb-3 p-2 border`}
                    onChange={(e) => setEditedTypeRole(e.target.value as 'Superadmin' | 'Administrador' | 'Vendedor' | 'Cajero' | 'Operativo' | 'Contador')}
                >
                    <option value='Superadmin'>Superadmin</option>
                    <option value='Administrador'>Administrador</option>
                    <option value='Vendedor'>Vendedor</option>
                    <option value='Cajero'>Cajero</option>
                    <option value='Operativo'>Operativo</option>
                    <option value='Contador'>Contador</option>
                </select>
            </div>

            <DepartmenAndCity
                onSelect={handleSelectDepartmentAndCity}
                reset={resetDepartmenAndCity}
                initialDepartment={selectedDepartment}
                initialCity={selectedCity}
            />

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Dirección del colaborador</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedUserPlatform.address}
                        onChange={(e) => handleEditField(e, 'address', 'text')}
                    />
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Teléfono del colaborador</h6>
                    <input
                        type="text"
                        className={`${styles.input} mb-3 p-2 border`}
                        value={editedUserPlatform.phone}
                        onChange={(e) => handleEditField(e, 'phone', 'text')}
                    />
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Email del colaborador</h6>
                <input
                    type="text"
                    className={`${styles.input} mb-3 p-2 border`}
                    value={editedUserPlatform.email}
                    onChange={(e) => handleEditField(e, 'email', 'text')}
                />
            </div>

            <div className="d-flex align-items-center justify-content-center">
                <button className={`${styles.button__Submit} border-0`} onClick={() => handleSaveChanges(editedUserPlatform)}>Guardar</button>
                <button className={`${styles.button__Cancel} border-0`} onClick={() => cancelEditing(idUserPlatform)}>Cancelar</button>
            </div>
        </div>
    )
}

export default ModalEditCollaborator
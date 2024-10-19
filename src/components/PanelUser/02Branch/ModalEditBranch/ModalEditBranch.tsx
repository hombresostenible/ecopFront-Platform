import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../redux/store';
import { putBranch, getBranches } from '../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../types/UserPanel/02Branch/branch.types';
import DepartmenAndCity from '../../../../helpers/DepartmenAndCity/DepartmenAndCity';
import styles from './styles.module.css';

interface ModalEditBranchProps {
    token: string;
    idBranch: string;
    branch: IBranch;
    onCloseModal: () => void;
}

function ModalEditBranch({ idBranch, branch, token, onCloseModal }: ModalEditBranchProps) {
    // REDUX
    const dispatch: AppDispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [editedBranch, setEditedBranch] = useState<IBranch>({ ...branch });
    const [editedTypeDocumentIdManager, setEditedTypeDocumentIdManager] = useState<string>(branch.typeDocumentIdManager || 'Cedula de Ciudadania');

    const [selectedDepartment, setSelectedDepartment] = useState(branch.department);
    const [selectedCity, setSelectedCity] = useState(branch.city); 
    const [selectedCodeDane, setSelectedCodeDane] = useState(branch.codeDane);
    const [selectedSubregionCodeDane, setSelectedSubregionCodeDane] = useState(branch.subregionCodeDane);
    const [resetDepartmenAndCity, setResetDepartmenAndCity] = useState(false);

    const handleSelectDepartmentAndCity = (department: string, city: string, codeDane: string, subregionCodeDane: string) => {
        const validDepartment = department as 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
        setSelectedDepartment(validDepartment);
        setSelectedCity(city);
        setSelectedCodeDane(codeDane);
        setSelectedSubregionCodeDane(subregionCodeDane);
    };

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof IBranch,
        dataType: 'text' | 'number' = 'text'
    ) => {
        const newValue = e.target.value;
        if (editedBranch) {
            setEditedBranch((prevEdited) => ({
                ...prevEdited!,
                [field]: dataType === 'number' ? parseFloat(newValue) : newValue,
            }));
        } else {
            setEditedBranch((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (formData: IBranch) => {
        setLoading(true);
        try {
            formData.typeDocumentIdManager = editedTypeDocumentIdManager as 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte';
            formData.department = selectedDepartment;
            formData.city = selectedCity;
            formData.codeDane = selectedCodeDane;
            formData.subregionCodeDane = selectedSubregionCodeDane;
            await dispatch(putBranch(idBranch, formData, token));
            dispatch(getBranches(token));
            setResetDepartmenAndCity(true);
            onCloseModal();
        } catch (error) {
            throw new Error('Error al guardar cambios');
        } finally {
            setLoading(false);
        }
    };

    const cancelEditing = (id: string) => {
        onCloseModal();
        setEditedBranch({ ...editedBranch, [id]: { ...branch } });
    };

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Edita la información de la sede</h1>

            {editedBranch && (
                <div>
                    <div className="w-100">
                        <h6 className={styles.label}>Nombre de la sede</h6>
                        <input
                            type="text"
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedBranch.nameBranch}
                            onChange={(e) => handleEditField(e, 'nameBranch', 'text')}
                        />
                    </div>

                    <DepartmenAndCity
                        onSelect={handleSelectDepartmentAndCity}
                        reset={resetDepartmenAndCity}
                        initialDepartment={selectedDepartment}
                        initialCity={selectedCity}
                    />

                    <div className="w-100">
                        <h6 className={styles.label}>Dirección de la sede</h6>
                        <input
                            type="text"
                            className={`${styles.input} mb-3 p-2 border`}
                            value={editedBranch.addressBranch}
                            onChange={(e) => handleEditField(e, 'addressBranch', 'text')}
                        />
                    </div>

                    <div className='d-flex gap-3'>
                        <div className="w-100">
                            <h6 className={styles.label}>Email de la sede</h6>
                            <input
                                type="text"
                                className={`${styles.input} mb-3 p-2 border`}
                                value={editedBranch.contactEmailBranch}
                                onChange={(e) => handleEditField(e, 'contactEmailBranch', 'text')}
                            />
                        </div>
                        <div className="w-100">
                            <h6 className={styles.label}>Teléfono de la sede</h6>
                            <input
                                type="text"
                                className={`${styles.input} mb-3 p-2 border`}
                                value={editedBranch.contactPhoneBranch}
                                onChange={(e) => handleEditField(e, 'contactPhoneBranch', 'text')}
                            />
                        </div>
                    </div>

                    <div className='d-flex gap-3'>
                        <div className="w-100">
                            <h6 className={styles.label}>Nombres del líder de la sede</h6>
                            <input
                                type="text"
                                className={`${styles.input} mb-3 p-2 border`}
                                value={editedBranch.nameManagerBranch}
                                onChange={(e) => handleEditField(e, 'nameManagerBranch', 'text')}
                            />
                        </div>
                        <div className="w-100">
                            <h6 className={styles.label}>Apellidos del líder de la sede</h6>
                            <input
                                type="text"
                                className={`${styles.input} mb-3 p-2 border`}
                                value={editedBranch.lastNameManagerBranch}
                                onChange={(e) => handleEditField(e, 'lastNameManagerBranch', 'text')}
                            />
                        </div>
                    </div>

                    <div className='d-flex gap-3'>
                        <div className="w-100">
                            <h6 className={styles.label}>Tipo de identificación</h6>
                            <select
                                value={editedTypeDocumentIdManager}
                                className={`${styles.input} mb-3 p-2 border`}
                                onChange={(e) => setEditedTypeDocumentIdManager(e.target.value as 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte')}
                            >
                                <option value='Cedula de Ciudadania'>Cédula de Ciudadanía</option>
                                <option value='Cedula de Extranjeria'>Cédula de Extranjería</option>
                                <option value='Pasaporte'>Pasaporte</option>
                            </select>
                        </div>
                        <div className="w-100">
                            <h6 className={styles.label}>Número de identificación del líder de la sede</h6>
                            <input
                                type="text"
                                className={`${styles.input} mb-3 p-2 border`}
                                value={editedBranch.documentIdManager}
                                onChange={(e) => handleEditField(e, 'documentIdManager', 'text')}
                            />
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
                            <button className={`${styles.button__Submit} border-0 rounded`} type='submit' onClick={() => handleSaveChanges(editedBranch)}>Guardar</button>
                        }
                        <button className={`${styles.button__Cancel} border-0`} onClick={() => cancelEditing(idBranch)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModalEditBranch;
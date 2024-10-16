/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store.ts';
import { getUsersPlatform } from '../../../../../redux/User/userPlatformSlice/actions.ts';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions.ts';
// ELEMENTOS DEL COMPONENTE
import { IUserPlatform } from '../../../../../types/User/userPlatform.types.ts';
import ColumnSelector from '../../../../../helpers/ColumnSelector/ColumnSelector.tsx';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer.tsx';
import SeeCollaborator from '../../../../../components/PanelUser/06ElectronicPayroll/01Collaborator/01SeeCollaborator/SeeCollaborator.tsx';
import ConfirmDeleteCollaborator from '../../../../../components/PanelUser/06ElectronicPayroll/01Collaborator/ConfirmDeleteCollaborator/ConfirmDeleteCollaborator.tsx';
import ModalEditCollaborator from '../../../../../components/PanelUser/06ElectronicPayroll/01Collaborator/02ModalEditCollaborator/ModalEditCollaborator.tsx';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import styles from './styles.module.css';

function ConsultCollaboratorPage() {
    const token = jsCookie.get('token') || '';
    
    //REDUX
    const dispatch: AppDispatch = useDispatch();
    const userPlatforms = useSelector((state: RootState) => state.usersPlatform.usersPlatform);
    const branches = useSelector((state: RootState) => state.branch.branch);

    useEffect(() => {
        if (token) {
            dispatch(getUsersPlatform(token));
            dispatch(getBranches(token));
        }
    }, [token]);

    const branchesArray = Array.isArray(branches) ? branches : [];

    const [idUserPlatform, setIdUserPlatform] = useState('');
    const [nameUserPlatform, setNameUserPlatform] = useState('');
    const [selectedUserPlatform, setSelectedUserPlatform] = useState<IUserPlatform>();
    const [showSeeUserPlatform, setShowSeeUserPlatform] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showUserPlatformModal, setShowUserPlatformModal] = useState(false);

    //MODAL PARA VISUALIZAR INFORMACION DEL COLABORADOR
    const handleSeeUserPlatform = useCallback((userPlatform: IUserPlatform) => {
        setSelectedUserPlatform(userPlatform);
        setShowSeeUserPlatform(true);
    }, []);

    //MODAL PARA ELIMINAR UN COLABORADOR
    const handleDelete = useCallback((userPlatform: IUserPlatform) => {
        setSelectedUserPlatform(userPlatform);
        setShowDeleteConfirmation(true);
    }, []);
    
    //MODAL PARA EDITAR INFORMACION DEL COLABORADOR
    const handleEdit = useCallback((userPlatform: IUserPlatform) => {
        setSelectedUserPlatform(userPlatform);
        setShowUserPlatformModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowSeeUserPlatform(false);
        setShowDeleteConfirmation(false);
        setShowUserPlatformModal(false);
    }, []);

    const menuColumnSelector = useRef<HTMLDivElement | null>(null);
    const [menuColumnSelectorVisible, setMenuColumnSelectorVisible] = useState(false);
    const handleColumnSelector = () => {
        setMenuColumnSelectorVisible(!menuColumnSelectorVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuColumnSelector.current && !menuColumnSelector.current.contains(event.target as Node)) {
                setMenuColumnSelectorVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ menuColumnSelector ]);

    const [selectedColumns, setSelectedColumns] = useState<string[]>([
        'Nombres',
        'Apellidos',
        'Tipo de Doc. Id',
        'Documento identidad',
        'Tipo de rol',
        'Departamento',
        'Ciudad',
        'Dirección',
        'Teléfono',
        'Email',
    ]);

    const handleColumnChange = (column: string) => {
        const updatedColumns = selectedColumns.includes(column)
            ? selectedColumns.filter((col) => col !== column)
            : [...selectedColumns, column];
        setSelectedColumns(updatedColumns);
    };

    return (
<div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Colaboradores</h1>

                        <div className='mb-4 d-flex align-items-center justify-content-between'>
                            <div className="d-flex"></div>
                            <div className={styles.link__Head_Navigate}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <Link to='/electronic-payroll/create-collaborators' className={`${styles.link} text-decoration-none`}>Crea tus colaboradores</Link>
                            </div>
                        </div>

                        <div className={`${styles.container__Column_Selector} d-flex align-items-center justify-content-end position-relative`} >
                            <span className={`${styles.span__Menu} p-2 text-center`} onClick={handleColumnSelector}>Escoge las columnas que deseas ver</span>
                            {menuColumnSelectorVisible && (
                                <div ref={menuColumnSelector} className={`${styles.menu} p-3 d-flex flex-column align-items-start position-absolute`}>
                                    <ColumnSelector
                                        selectedColumns={selectedColumns}
                                        onChange={handleColumnChange}
                                        minSelectedColumns={3}
                                        availableColumns={[
                                            'Nombres',
                                            'Apellidos',
                                            'Tipo de Doc. Id',
                                            'Documento identidad',
                                            'Tipo de rol',
                                            'Departamento',
                                            'Ciudad',
                                            'Dirección',
                                            'Teléfono',
                                            'Email',
                                        ]}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={`${styles.container__Table} mt-2 mb-2 mx-auto table-responsive`}>
                            <table className="table table-striped">
                                <thead className={`${styles.container__Head}`}>
                                    <tr className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                        {selectedColumns.includes('Nombres') && (
                                            <th className={`${styles.name} d-flex align-items-center justify-content-center text-center`}>Nombres</th>
                                        )}
                                        {selectedColumns.includes('Apellidos') && (
                                            <th className={`${styles.last__Name} d-flex align-items-center justify-content-center text-center`}>Apellidos</th>
                                        )}
                                        {selectedColumns.includes('Tipo de Doc. Id') && (
                                            <th className={`${styles.type__Document_Id} d-flex align-items-center justify-content-center text-center`}>Tipo de Doc. Id</th>
                                        )}
                                        {selectedColumns.includes('Documento identidad') && (
                                            <th className={`${styles.document__Id} d-flex align-items-center justify-content-center text-center`}>Documento identidad</th>
                                        )}
                                        {selectedColumns.includes('Tipo de rol') && (
                                            <th className={`${styles.type__Role} d-flex align-items-center justify-content-center text-center`}>Tipo de rol</th>
                                        )}
                                        {selectedColumns.includes('Departamento') && (
                                            <th className={`${styles.department} d-flex align-items-center justify-content-center text-center`}>Departamento</th>
                                        )}
                                        {selectedColumns.includes('Ciudad') && (
                                            <th className={`${styles.city} d-flex align-items-center justify-content-center text-center`}>Ciudad</th>
                                        )}
                                        {selectedColumns.includes('Dirección') && (
                                            <th className={`${styles.address} d-flex align-items-center justify-content-center text-center`}>Dirección</th>
                                        )}
                                        {selectedColumns.includes('Teléfono') && (
                                            <th className={`${styles.phone} d-flex align-items-center justify-content-center text-center`}>Teléfono</th>
                                        )}
                                        {selectedColumns.includes('Email') && (
                                            <th className={`${styles.email} d-flex align-items-center justify-content-center text-center`}>Email</th>
                                        )}
                                        <th className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</th>
                                    </tr>
                                </thead>
                                
                                <tbody className={`${styles.container__Body}`}>
                                    {Array.isArray(userPlatforms) && userPlatforms.length > 0 ? (
                                        userPlatforms.map((userPlatform) => (
                                        <tr key={userPlatform.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            {selectedColumns.includes('Nombres') && (
                                                <td className={`${styles.name} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{userPlatform.name}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Apellidos') && (
                                                <td className={`${styles.last__Name} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{userPlatform.lastName}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Tipo de Doc. Id') && (
                                                <td className={`${styles.type__Document_Id} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{userPlatform.typeDocumentId}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Documento identidad') && (
                                                <td className={`${styles.document__Id} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{userPlatform.documentId}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Tipo de rol') && (
                                                <td className={`${styles.type__Role} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{userPlatform.typeRole}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Departamento') && (
                                                <td className={`${styles.department} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{userPlatform.department ? userPlatform.department : 'No definido'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Ciudad') && (
                                                <td className={`${styles.city} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{userPlatform.city ? userPlatform.city : 'No definido'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Dirección') && (
                                                <td className={`${styles.address} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{userPlatform.address}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Teléfono') && (
                                                <td className={`${styles.phone} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{userPlatform.phone ? userPlatform.phone : 'No registrado'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Email') && (
                                                <td className={`${styles.email} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{userPlatform.email}</span>
                                                </td>
                                            )}
                                            <td className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <MdOutlineRemoveRedEye
                                                            className={`${styles.button__Edit} `}
                                                            onClick={() => {
                                                                setIdUserPlatform(userPlatform.id);
                                                                setNameUserPlatform(userPlatform.name);
                                                                handleSeeUserPlatform(userPlatform);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <RiDeleteBin6Line
                                                            className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdUserPlatform(userPlatform.id);
                                                                setNameUserPlatform(userPlatform.name);
                                                                handleDelete(userPlatform);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <BsPencil
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdUserPlatform(userPlatform.id);
                                                                handleEdit(userPlatform)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={10} className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                                No tienes colaboradores registrados
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Modal show={showSeeUserPlatform} onHide={onCloseModal} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu colaborador</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedUserPlatform &&
                                    <SeeCollaborator
                                        selectedUserPlatform={selectedUserPlatform}
                                        branches={branchesArray}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para eliminar el colaborador "{nameUserPlatform}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteCollaborator
                                    token={token}
                                    idUserPlatform={idUserPlatform}
                                    nameUserPlatform={nameUserPlatform}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showUserPlatformModal} onHide={onCloseModal} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles del colaborador</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedUserPlatform &&
                                    <ModalEditCollaborator
                                        token={token}
                                        idUserPlatform={idUserPlatform}
                                        userPlatform={selectedUserPlatform}
                                        branches={branchesArray}
                                        onCloseModal={onCloseModal}
                                    />
                                }
                            </Modal.Body>
                        </Modal>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ConsultCollaboratorPage;
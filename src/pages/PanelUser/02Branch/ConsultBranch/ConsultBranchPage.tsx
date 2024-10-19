/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { getBranchesPaginated } from '../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../types/User/branch.types';
import ColumnSelector from '../../../../helpers/ColumnSelector/ColumnSelector';
import NavBar from '../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../components/PanelUser/Footer/Footer';
import SeeBranch from '../../../../components/PanelUser/02Branch/01SeeBranch/SeeBranch.tsx';
import ConfirmDeleteBranch from '../../../../components/PanelUser/02Branch/ConfirmDeleteBranch/ConfirmDeleteBranch';
import ModalEditBranch from '../../../../components/PanelUser/02Branch/ModalEditBranch/ModalEditBranch.tsx';
import ComponentPaginated from '../../../../components/GeneralComponents/Paginated/ComponentPaginated.tsx';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import styles from './styles.module.css';

interface ConsultBranchPageProps {
    addNotification: (type: 'delete' | 'error', message: string) => void;
}

function ConsultBranchPage({ addNotification }: ConsultBranchPageProps) {
    const token = jsCookie.get('token') || '';
    
    //REDUX
    const dispatch: AppDispatch = useDispatch();
    const { branch, totalRegisters } = useSelector((state: RootState) => state.branch);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsByPage, setItemsByPage] = useState<number>(20);
    useEffect(() => {
        const fetchData = async (page: number, limit: number) => {
            try {
                await dispatch(getBranchesPaginated(token, page, limit));
            } catch (error) {
                throw new Error('Error al traer las sedes');
            }
        };
        fetchData(currentPage, itemsByPage);
    }, [currentPage, itemsByPage]);

    const handleItemsByPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsByPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    const [idBranch, setIdBranch] = useState('');
    const [nameBranch, setNameBranch] = useState('');
    const [selectedBranch, setSelectedBranch] = useState<IBranch>();
    const [showSeeBranch, setShowSeeBranch] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showBranchModal, setShowBranchModal] = useState(false);

    //MODAL PARA VISUALIZAR INFORMACION DE LA SEDE
    const handleSeeBranch = useCallback((branch: IBranch) => {
        setSelectedBranch(branch);
        setShowSeeBranch(true);
    }, []);

    //MODAL PARA ELIMINAR UNA SEDE
    const handleDelete = useCallback((branch: IBranch) => {
        setSelectedBranch(branch);
        setShowDeleteConfirmation(true);
    }, []);

    //MODAL PARA EDITAR INFORMACION DEL CLIENTE
    const handleEdit = useCallback((branch: IBranch) => {
        setSelectedBranch(branch);
        setShowBranchModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowSeeBranch(false);
        setShowDeleteConfirmation(false);
        setShowBranchModal(false);
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
        'Departamento',
        'Ciudad',
        'Dirección',
        'Email',
        'Teléfono',
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
                        <h1 className={`${styles.title} mb-4 mt-4 mx-auto`}>Tu lista de sedes</h1>

                        <div className={`${styles.container__Link_Head_Navigate} mb-4 mx-auto d-flex align-items-center justify-content-between`}>
                            <div className="d-flex"></div>
                            <div className={styles.link__Head_Navigate}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <Link to='/branches/create-branches' className={`${styles.link} m-0 text-decoration-none`}>Crea tus sedes</Link>
                            </div>
                        </div>

                        <div className={`${styles.container__Column_Selector} mb-4 mx-auto d-flex align-items-center justify-content-end position-relative`} >
                            <span className={`${styles.span__Menu} p-2 text-center`} onClick={handleColumnSelector}>Escoge las columnas que deseas ver</span>
                            {menuColumnSelectorVisible && (
                                <div ref={menuColumnSelector} className={`${styles.menu} p-3 d-flex flex-column align-items-start position-absolute`}>
                                    <ColumnSelector
                                        selectedColumns={selectedColumns}
                                        onChange={handleColumnChange}
                                        minSelectedColumns={3}
                                        availableColumns={[
                                            'Departamento',
                                            'Ciudad',
                                            'Dirección',
                                            'Email',
                                            'Teléfono',
                                        ]}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={`${styles.container__Paginated} mb-4 mx-auto d-flex align-items-center justify-content-end gap-2`}>
                            <ComponentPaginated
                                totalRegisters={totalRegisters}
                                limit={itemsByPage}
                                onPageChange={handlePageChange}
                                currentPage={currentPage}
                            />
                            <div className={`${styles.container__Items_By_page} d-flex align-items-center justify-content-center`}>
                                <span>Ver:</span>
                                <select
                                    className={`${styles.select} mx-2 p-1 border`}
                                    value={itemsByPage}
                                    onChange={handleItemsByPage}
                                >
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <span>por página</span>
                            </div>
                        </div>

                        <div className={`${styles.container__Table} mt-2 mb-2 mx-auto`}>
                            <table className="table">
                                <thead className={`${styles.container__Head} `}>
                                    <tr className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                        <th className={`${styles.branch} d-flex align-items-center justify-content-center text-center`}>Sede</th>
                                        {selectedColumns.includes('Departamento') && (
                                            <th className={`${styles.department} d-flex align-items-center justify-content-center text-center`}>Departamento</th>
                                        )}
                                        {selectedColumns.includes('Ciudad') && (
                                            <th className={`${styles.city} d-flex align-items-center justify-content-center text-center`}>Ciudad</th>
                                        )}
                                        {selectedColumns.includes('Dirección') && (
                                            <th className={`${styles.address} d-flex align-items-center justify-content-center text-center`}>Dirección</th>
                                        )}
                                        {selectedColumns.includes('Email') && (
                                            <th className={`${styles.email} d-flex align-items-center justify-content-center text-center`}>Email</th>
                                        )}
                                        {selectedColumns.includes('Teléfono') && (
                                            <th className={`${styles.phone} d-flex align-items-center justify-content-center text-center`}>Teléfono</th>
                                        )}
                                        <th className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</th>
                                    </tr>
                                </thead>
                                
                                <tbody className={`${styles.container__Body}`}>
                                    {Array.isArray(branch) && branch.length > 0 ? (
                                        branch.map((branch) => (
                                        <tr key={branch.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            <td className={`${styles.branch} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.nameBranch}</span>
                                            </td>
                                            {selectedColumns.includes('Departamento') && (
                                                <td className={`${styles.department} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.department}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Ciudad') && (
                                                <td className={`${styles.city} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.city}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Dirección') && (
                                                <td className={`${styles.address} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.addressBranch}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Email') && (
                                                <td className={`${styles.email} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.contactEmailBranch}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Teléfono') && (
                                                <td className={`${styles.phone} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{branch.contactPhoneBranch}</span>
                                                </td>
                                            )}
                                            <td className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <MdOutlineRemoveRedEye
                                                            className={`${styles.button__Edit} `}
                                                            onClick={() => {
                                                                setIdBranch(branch.id);
                                                                setNameBranch(branch.nameBranch);
                                                                handleSeeBranch(branch);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <RiDeleteBin6Line
                                                            className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdBranch(branch.id);
                                                                setNameBranch(branch.nameBranch);
                                                                handleDelete(branch);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <BsPencil
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdBranch(branch.id);
                                                                handleEdit(branch)
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
                                                No tienes sedes registradas
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Modal show={showSeeBranch} onHide={onCloseModal} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu sede</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedBranch &&
                                    <SeeBranch
                                        selectedBranch={selectedBranch}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmación para eliminar la sede</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteBranch
                                    idBranch={idBranch}
                                    nameBranch={nameBranch}
                                    onCloseModal={onCloseModal}
                                    addNotification={addNotification}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showBranchModal} onHide={onCloseModal} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title>Detalles de la sede</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedBranch &&
                                    <ModalEditBranch
                                        token={token}
                                        idBranch={idBranch}
                                        branch={selectedBranch}
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

export default ConsultBranchPage;
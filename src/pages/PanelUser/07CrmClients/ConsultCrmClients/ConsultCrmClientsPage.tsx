/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store.ts';
import { getCrmClientsPaginated } from '../../../../redux/User/07CrmClientSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../../../types/User/crmClient.types.ts';
import ColumnSelector from '../../../../helpers/ColumnSelector/ColumnSelector';
import NavBar from '../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../components/PanelUser/Footer/Footer.tsx';
import SeeCrmClient from '../../../../components/PanelUser/07CrmClients/01SeeCrmClient/SeeCrmClient.tsx';
import ModalEditCrmClient from '../../../../components/PanelUser/07CrmClients/ModalEditCrmClient/ModalEditCrmClient.tsx';
import ConfirmDeleteCRMClient from '../../../../components/PanelUser/07CrmClients/ConfirmDeleteCRMClient/ConfirmDeleteCRMClient.tsx';
import SendEmailClients from '../../../../components/PanelUser/07CrmClients/SendEmailClients/SendEmailClients.tsx';
import ComponentPaginated from '../../../../components/GeneralComponents/Paginated/ComponentPaginated.tsx';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { MdOutgoingMail } from "react-icons/md";
import styles from './styles.module.css';

function ConsultCrmClientsPage() {
    const token = jsCookie.get('token') || '';
    
    //REDUX
    const dispatch: AppDispatch = useDispatch();
    const { crmClient, totalRegisters } = useSelector((state: RootState) => state.crmClient);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsByPage, setItemsByPage] = useState<number>(20);
    useEffect(() => {
        const fetchData = async (page: number, limit: number) => {
            try {
                await dispatch(getCrmClientsPaginated(token, page, limit));
            } catch (error) {
                throw new Error('Error al traer los clientes');
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

    const [idCrmClient, setIdCrmClient] = useState('');
    const [nameCrmClient, setNameCrmClient] = useState('');
    const [selectedCrmClient, setSelectedCrmClient] = useState<ICrmClient>();
    const [showSeeCrmClient, setShowSeeCrmClient] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showCrmClientModal, setShowCrmClientModal] = useState(false);
    const [showSendEmailCrmClientModal, setShowSendEmailCrmClientModal] = useState(false);
    
    //MODAL PARA VISUALIZAR INFORMACION DEL CLIENTE
    const handleSeeCrmClient = useCallback((crmClient: ICrmClient) => {
        setSelectedCrmClient(crmClient);
        setShowSeeCrmClient(true);
    }, []);

    //MODAL PARA ELIMINAR UN CLIENTE
    const handleDelete = useCallback((crmClient: ICrmClient) => {
        setSelectedCrmClient(crmClient);
        setShowDeleteConfirmation(true);
    }, []);
    
    //MODAL PARA EDITAR INFORMACION DEL CLIENTE
    const handleEdit = useCallback((crmClient: ICrmClient) => {
        setSelectedCrmClient(crmClient);
        setShowCrmClientModal(true);
    }, []);
    
    //MODAL PARA ENVIAR EMIAL AL CLIENTE
    const handleSendEmailClient = useCallback((crmClient: ICrmClient) => {
        setSelectedCrmClient(crmClient);
        setShowSendEmailCrmClientModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowSeeCrmClient(false);
        setShowDeleteConfirmation(false);
        setShowCrmClientModal(false);
        setShowSendEmailCrmClientModal(false);
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
        'Tipo de Doc. Id',
        'Documento identidad',
        'Cliente',
        'Email',
        'Teléfono',
        'Departamento',
        'Ciudad',
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
                        <h1 className={`${styles.title} mb-4 mt-4 mx-auto`}>CRM Clientes</h1>

                        <div className={`${styles.container__Link_Head_Navigate} mb-4 mx-auto d-flex align-items-center justify-content-between`}>
                            <div className="d-flex"></div>
                            <div className={styles.link__Head_Navigate}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <Link to='/crm-clients/create-crm-clients' className={`${styles.link} m-0 text-decoration-none`}>Crea tus clientes</Link>
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
                                            'Tipo de Doc. Id',
                                            'Documento identidad',
                                            'Cliente',
                                            'Email',
                                            'Teléfono',
                                            'Departamento',
                                            'Ciudad',
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
                                        {selectedColumns.includes('Tipo de Doc. Id') && (
                                            <th className={`${styles.type__Document_Id} d-flex align-items-center justify-content-center text-center`}>Tipo de Doc. Id</th>
                                        )}
                                        {selectedColumns.includes('Documento identidad') && (
                                            <th className={`${styles.document__Id} d-flex align-items-center justify-content-center text-center`}>Documento de identidad</th>
                                        )}
                                        {selectedColumns.includes('Cliente') && (
                                            <th className={`${styles.client} d-flex align-items-center justify-content-center text-center`}>Cliente</th>
                                        )}
                                        {selectedColumns.includes('Email') && (
                                            <th className={`${styles.email} d-flex align-items-center justify-content-center text-center`}>Email</th>
                                        )}
                                        {selectedColumns.includes('Teléfono') && (
                                            <th className={`${styles.phone} d-flex align-items-center justify-content-center text-center`}>Teléfono</th>
                                        )}
                                        {selectedColumns.includes('Departamento') && (
                                            <th className={`${styles.department} d-flex align-items-center justify-content-center text-center`}>Departamento</th>
                                        )}
                                        {selectedColumns.includes('Ciudad') && (
                                            <th className={`${styles.city} d-flex align-items-center justify-content-center text-center`}>Ciudad</th>
                                        )}
                                        <th className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</th>
                                    </tr>
                                </thead>
                                
                                <tbody className={`${styles.container__Body} `}>
                                    {Array.isArray(crmClient) && crmClient.length > 0 ? (
                                        crmClient.map((crmClient) => (
                                        <tr key={crmClient.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            {selectedColumns.includes('Tipo de Doc. Id') && (
                                                <td className={`${styles.type__Document_Id} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.typeDocumentId}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Documento identidad') && (
                                                <td className={`${styles.document__Id} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.documentId}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Cliente') && (
                                                <td className={`${styles.client} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.name ? crmClient.name + ' ' + crmClient.lastName : crmClient.corporateName}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Email') && (
                                                <td className={`${styles.email} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.email}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Teléfono') && (
                                                <td className={`${styles.phone} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.phone ? crmClient.phone : 'No registrado'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Departamento') && (
                                                <td className={`${styles.department} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.department ? crmClient.department : 'No definido'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Ciudad') && (
                                                <td className={`${styles.city} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{crmClient.city ? crmClient.city : 'No definido'}</span>
                                                </td>
                                            )}
                                            <td className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <MdOutlineRemoveRedEye
                                                            className={`${styles.button__Edit} `}
                                                            onClick={() => {
                                                                setIdCrmClient(crmClient.id);
                                                                setNameCrmClient(crmClient.name ?? crmClient.corporateName ?? '');
                                                                handleSeeCrmClient(crmClient);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <RiDeleteBin6Line
                                                            className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdCrmClient(crmClient.id);
                                                                setNameCrmClient(crmClient.name ?? crmClient.corporateName ?? '');
                                                                handleDelete(crmClient);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <BsPencil
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdCrmClient(crmClient.id);
                                                                handleEdit(crmClient)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <MdOutgoingMail
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdCrmClient(crmClient.id);
                                                                handleSendEmailClient(crmClient)
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
                                                No tienes clientes registrados
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Modal show={showSeeCrmClient} onHide={onCloseModal} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu cliente</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedCrmClient &&
                                    <SeeCrmClient
                                        selectedCrmClient={selectedCrmClient}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para eliminar el cliente "{nameCrmClient}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteCRMClient
                                    token={token}
                                    idCrmClient={idCrmClient}
                                    nameClient={nameCrmClient}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showCrmClientModal} onHide={onCloseModal} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles del Cliente</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedCrmClient &&
                                    <ModalEditCrmClient
                                        token={token}
                                        idCrmClient={idCrmClient}
                                        crmClient={selectedCrmClient}
                                        onCloseModal={onCloseModal}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showSendEmailCrmClientModal} onHide={onCloseModal} size="lg" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Envía un email a tu cliente</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <SendEmailClients
                                    token={token}
                                    selectedCrmClient={selectedCrmClient}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ConsultCrmClientsPage;
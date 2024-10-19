/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getRawMaterialsPaginated, getRawMaterialsByBranch } from '../../../../../redux/User/03Inventories/04InventoryRawMateralsSlice/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IRawMaterial } from '../../../../../types/User/rawMaterial.types';
import { IBranch } from '../../../../../types/User/branch.types';
import ColumnSelector from '../../../../../helpers/ColumnSelector/ColumnSelector';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import ConsultRawMaterialsOff from '../../../../../components/PanelUser/03Inventories/04RawMaterials/01ConsultRawMaterialsOff/ConsultRawMaterialsOff';
import SeeItemRawMaterials from '../../../../../components/PanelUser/03Inventories/04RawMaterials/02SeeItemRawMaterials/SeeItemRawMaterials';
import ConfirmDeleteRegister from '../../../../../components/GeneralComponents/ConfirmDeleteRegister/ConfirmDeleteRegister.tsx';
import ModalEditRawMaterial from '../../../../../components/PanelUser/03Inventories/04RawMaterials/04ModalEditRawMaterial/ModalEditRawMaterial';
import AddInventoryRawMaterial from '../../../../../components/PanelUser/03Inventories/04RawMaterials/05AddInventoryRawMaterial/AddInventoryRawMaterial';
import ModalRawMaterialOff from '../../../../../components/PanelUser/03Inventories/04RawMaterials/06ModalRawMaterialOff/ModalRawMaterialOff';
import ComponentPaginated from '../../../../../components/GeneralComponents/Paginated/ComponentPaginated.tsx';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from './styles.module.css';

function ConsultRawMateralsPage() {
    const token = jsCookie.get('token') || '';
    
    //REDUX
    const dispatch: AppDispatch = useDispatch();
    const { rawMaterial, totalRegisters} = useSelector((state: RootState) => state.rawMaterial);
    const branches = useSelector((state: RootState) => state.branch.branch);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
        }
    }, [token]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsByPage, setItemsByPage] = useState<number>(20);
    useEffect(() => {
        const fetchData = async (page: number, limit: number) => {
            try {
                await dispatch(getRawMaterialsPaginated(token, page, limit));
            } catch (error) {
                throw new Error('Error al traer las materias primas');
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
    
    const [selectedBranch, setSelectedBranch] = useState<string | undefined>('');
    useEffect(() => {
        if (token) {
            if (selectedBranch) {
                dispatch(getRawMaterialsByBranch(selectedBranch, token));
            } else {
                const fetchData = async (page: number, limit: number) => {
                    try {
                        await dispatch(getRawMaterialsPaginated(token, page, limit));
                    } catch (error) {
                        throw new Error('Error al traer las materias primas');
                    }
                };
                fetchData(currentPage, itemsByPage);
            }
        }
    }, [selectedBranch, token, dispatch]);

    const branchesArray = Array.isArray(branches) ? branches : [];

    const [idRawMaterial, setIdRawMaterial] = useState('');
    const [nameRawMaterial, setNameRawMaterial] = useState('');
    const [idBranch, setIdBranch] = useState('');
    const [selectedItem, setSelectedItem] = useState<IRawMaterial>();
    const [showSeeItem, setShowSeeItem] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditRawMaterialModal, setShowEditRawMaterialModal] = useState(false);
    const [showOff, setShowOff] = useState(false);
    const [showConsultOff, setShowConsultOff] = useState(false);
    const [showAddInventory, setShowAddInventory] = useState(false);

    const handleConsultOff = useCallback(() => {
        setShowConsultOff(true);
    }, []);

    const handleSeeItem = useCallback((asset: IRawMaterial) => {
        setSelectedItem(asset);
        setShowSeeItem(true);
    }, []);

    const handleDelete = useCallback((rawMaterial: IRawMaterial) => {
        setSelectedItem(rawMaterial);
        setShowDeleteConfirmation(true);
    }, []);

    const handleEdit = useCallback((rawMaterial: IRawMaterial) => {
        setSelectedItem(rawMaterial);
        setShowEditRawMaterialModal(true);
    }, []);

    const handleAddInventory = useCallback((rawMaterial: IRawMaterial) => {
        setSelectedItem(rawMaterial);
        setShowAddInventory(true);
    }, []);

    const handleOff = useCallback((rawMaterial: IRawMaterial) => {
        setSelectedItem(rawMaterial);
        setShowOff(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowSeeItem(false);
        setShowDeleteConfirmation(false);
        setShowEditRawMaterialModal(false);
        setShowAddInventory(false);
        setShowOff(false);
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
        'Código de barras',
        'Nombre del item',
        'Marca',
        'Inventario',
        'Unidad de medida',
        'IVA',
        'Precio de venta',
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
                        <h1 className={`${styles.title} mb-4 mt-4 mx-auto`}>Materias primas</h1>

                        <div className={`${styles.container__Link_Head_Navigate} mb-4 mx-auto d-flex align-items-center justify-content-between`}>
                            <div className={styles.link__Head_Navigate} onClick={handleConsultOff} >Ver dados de baja</div>
                            <div className={styles.link__Head_Navigate}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <Link to='/inventories/create-raw-materals' className={`${styles.link} m-0 text-decoration-none`}>Registro de materias primas</Link>
                            </div>
                        </div>

                        <Modal show={showConsultOff} onHide={() => setShowConsultOff(false)} size="xl" backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalle de las mercancías dadas de baja</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConsultRawMaterialsOff
                                    token={token}
                                    branches={branchesArray}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <div className={`${styles.container__Filters} mb-4 mx-auto d-flex align-items-center justify-content-between`}>
                            <div className={`${styles.container__Filter_Branch} d-flex align-items-center justify-content-center gap-2`}>
                                <h3 className={`${styles.title__Branch} m-0`}>Filtra tus materias primas por sede</h3>
                                <select
                                    value={selectedBranch || ''}
                                    className={`${styles.select__Branch} p-2 border rounded`}
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                >
                                    <option value=''>Todas</option>
                                    {branchesArray.map((branch: IBranch, index: number) => (
                                        <option key={index} value={branch.id}>
                                            {branch.nameBranch}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={`${styles.container__Column_Selector} d-flex align-items-center justify-content-center position-relative`} >
                                <span className={`${styles.span__Menu} p-2 text-center`} onClick={handleColumnSelector}>Escoge las columnas que deseas ver</span>
                                {menuColumnSelectorVisible && (
                                    <div ref={menuColumnSelector} className={`${styles.menu} p-3 d-flex flex-column align-items-start position-absolute`}>
                                        <ColumnSelector
                                            selectedColumns={selectedColumns}
                                            onChange={handleColumnChange}
                                            minSelectedColumns={3}
                                            availableColumns={[
                                                'Código de barras',
                                                'Nombre del item',
                                                'Marca',
                                                'Inventario',
                                                'Unidad de medida',
                                                'IVA',
                                                'Precio de venta',
                                            ]}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`${styles.container__Paginated} mb-4 mx-auto d-flex align-items-center justify-content-end gap-3`}>
                            <ComponentPaginated
                                totalRegisters={totalRegisters}
                                limit={itemsByPage}
                                onPageChange={handlePageChange}
                                currentPage={currentPage}
                            />
                            <div className={`${styles.container__Items_By_page} d-flex align-items-center justify-content-center`}>
                                <span>Ver:</span>
                                <select
                                    className={`${styles.select} p-1 border`}
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
                                <thead className={`${styles.container__Head}`}>
                                    <tr className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                        <th className={`${styles.branch} d-flex align-items-center justify-content-center text-center`}>Sede</th>
                                        {selectedColumns.includes('Código de barras') && (
                                            <th className={`${styles.bar__Code} d-flex align-items-center justify-content-center text-center`}>Código de barras</th>
                                        )}
                                        {selectedColumns.includes('Nombre del item') && (
                                            <th className={`${styles.name__Item} d-flex align-items-center justify-content-center text-center`}>Nombre del item</th>
                                        )}
                                        {selectedColumns.includes('Marca') && (
                                            <th className={`${styles.brand} d-flex align-items-center justify-content-center text-center`}>Marca</th>
                                        )}
                                        {selectedColumns.includes('Inventario') && (
                                            <th className={`${styles.inventory} d-flex align-items-center justify-content-center text-center`}>Inventario</th>
                                        )}
                                        {selectedColumns.includes('Unidad de medida') && (
                                            <th className={`${styles.unit__Measure} d-flex align-items-center justify-content-center text-center`}>Unidad de medida</th>
                                        )}
                                        {selectedColumns.includes('IVA') && (
                                            <th className={`${styles.IVA} d-flex align-items-center justify-content-center text-center`}>IVA</th>
                                        )}
                                        {selectedColumns.includes('Precio de venta') && (
                                            <th className={`${styles.selling__Price} d-flex align-items-center justify-content-center text-center`}>Precio de venta</th>
                                        )}
                                        <th className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</th>
                                    </tr>
                                </thead>
                                
                                <tbody className={`${styles.container__Body}`}>
                                    {Array.isArray(rawMaterial) && rawMaterial.length > 0 ? (
                                        rawMaterial.map((rawMaterial) => (
                                        <tr key={rawMaterial.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            <td className={`${styles.branch} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>
                                                    {Array.isArray(branches) && branches.map((branch, index) => (
                                                        rawMaterial.branchId === branch.id && (
                                                            <span className={`${styles.text__Ellipsis} text-center overflow-hidden`} key={index}>{branch.nameBranch}</span>
                                                        )
                                                    ))}
                                                </span>
                                            </td>

                                            {selectedColumns.includes('Código de barras') && (
                                                <td className={`${styles.bar__Code} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.barCode ? rawMaterial.barCode : 'No definido'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Nombre del item') && (
                                                <td className={`${styles.name__Item} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.nameItem}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Marca') && (
                                                <td className={`${styles.brand} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.brandItem ? rawMaterial.brandItem : 'No definida'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Inventario') && (
                                                <td className={`${styles.inventory} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.inventory}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Unidad de medida') && (
                                                <td className={`${styles.unit__Measure} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.unitMeasure}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('IVA') && (
                                                <td className={`${styles.IVA} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.IVA === 'No aplica' ? 'No aplica' : `${rawMaterial.IVA} %`}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Precio de venta') && (
                                                <td className={`${styles.selling__Price} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{rawMaterial.sellingPrice ? `$ ${formatNumber(rawMaterial.sellingPrice)}` : 'No definido'}</span>
                                                </td>
                                            )}

                                            <td className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <MdOutlineRemoveRedEye
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdRawMaterial(rawMaterial.id);
                                                                setNameRawMaterial(rawMaterial.nameItem || '');
                                                                handleSeeItem(rawMaterial);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <RiDeleteBin6Line
                                                            className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdRawMaterial(rawMaterial.id);
                                                                setNameRawMaterial(rawMaterial.nameItem || '');
                                                                handleDelete(rawMaterial);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <BsPencil
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdRawMaterial(rawMaterial.id);
                                                                handleEdit(rawMaterial)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <FaPlus
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdRawMaterial(rawMaterial.id);
                                                                setNameRawMaterial(rawMaterial.nameItem || '');
                                                                setIdBranch(rawMaterial.branchId);
                                                                handleAddInventory(rawMaterial)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <IoIosCloseCircleOutline
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdRawMaterial(rawMaterial.id);
                                                                setNameRawMaterial(rawMaterial.nameItem || '');
                                                                handleOff(rawMaterial)
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
                                                No tienes materias primas registradas
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Modal show={showSeeItem} onHide={onCloseModal} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu materia prima</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <SeeItemRawMaterials
                                        rawMaterial={selectedItem}
                                        branches={branchesArray}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para eliminar la materia prima "{nameRawMaterial}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteRegister
                                    typeRegisterDelete={'RawMaterial'}
                                    idItem={idRawMaterial}
                                    nameRegister={nameRawMaterial}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showEditRawMaterialModal} onHide={onCloseModal} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles de tu materia prima</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <ModalEditRawMaterial
                                        token={token}
                                        idItem={idRawMaterial}
                                        rawMaterial={selectedItem}
                                        branches={branchesArray}
                                        onCloseModal={onCloseModal}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showAddInventory} onHide={() => setShowAddInventory(false)} size="lg" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Aumenta tu inventario</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AddInventoryRawMaterial
                                    token={token}
                                    idItem={idRawMaterial}
                                    nameItem={nameRawMaterial}
                                    idBranch={idBranch}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showOff} onHide={() => setShowOff(false)} backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para dar de baja del inventario de materias primas</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ModalRawMaterialOff
                                    token={token}
                                    rawMaterial={selectedItem as IRawMaterial}
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

export default ConsultRawMateralsPage;
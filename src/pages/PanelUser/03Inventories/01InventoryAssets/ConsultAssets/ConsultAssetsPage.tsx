/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getAssetsPaginated, getAssetsByBranch } from '../../../../../redux/User/03Inventories/01InventoryAssetsSlice/actions.ts';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../types/User/assets.types';
import { IBranch } from '../../../../../types/User/branch.types';
import ColumnSelector from '../../../../../helpers/ColumnSelector/ColumnSelector';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import ConsultAssetOff from '../../../../../components/PanelUser/03Inventories/01Assets/01ConsultAssetOff/ConsultAssetOff';
import SeeItemAsset from '../../../../../components/PanelUser/03Inventories/01Assets/02SeeItemAsset/SeeItemAsset';
import ConfirmDeleteRegister from '../../../../../components/GeneralComponents/ConfirmDeleteRegister/ConfirmDeleteRegister.tsx';
import ModalEditAsset from '../../../../../components/PanelUser/03Inventories/01Assets/04ModalEditAsset/ModalEditAsset';
import AddInventoryAsset from '../../../../../components/PanelUser/03Inventories/01Assets/05AddInventoryAsset/AddInventoryAsset';
import ModalAssetOff from '../../../../../components/PanelUser/03Inventories/01Assets/06ModalAssetOff/ModalAssetOff';
import ComponentPaginated from '../../../../../components/GeneralComponents/Paginated/ComponentPaginated.tsx';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from './styles.module.css';

function ConsultAssetsPage() {
    const token = jsCookie.get('token') || '';

    //REDUX
    const dispatch: AppDispatch = useDispatch();
    const { assets, totalRegisters } = useSelector((state: RootState) => state.assets);
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
                await dispatch(getAssetsPaginated(token, page, limit));
            } catch (error) {
                throw new Error('Error al traer los activos');
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
                dispatch(getAssetsByBranch(selectedBranch, token));
            } else {
                const fetchData = async (page: number, limit: number) => {
                    try {
                        await dispatch(getAssetsPaginated(token, page, limit));
                    } catch (error) {
                        throw new Error('Error al traer los activos');
                    }
                };
                fetchData(currentPage, itemsByPage);
            }
        }
    }, [selectedBranch, token, dispatch]);

    const branchesArray = Array.isArray(branches) ? branches : [];

    const [idAsset, setIdAsset] = useState('');
    const [nameAsset, setNameAsset] = useState('');
    const [idBranch, setIdBranch] = useState('');
    const [selectedItem, setSelectedItem] = useState<IAssets>();
    const [showSeeItem, setShowSeeItem] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showModalEditAsset, setShowModalEditAsset] = useState(false);
    const [showOff, setShowOff] = useState(false);
    const [showConsultOff, setShowConsultOff] = useState(false);
    const [showAddInventory, setShowAddInventory] = useState(false);

    const handleConsultOff = useCallback(() => {
        setShowConsultOff(true);
    }, []);

    const handleSeeItem = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
        setShowSeeItem(true);
    }, []);

    const handleDelete = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
        setShowDeleteConfirmation(true);
    }, []);

    const handleEdit = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
        setShowModalEditAsset(true);
    }, []);

    const handleAddInventory = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
        setShowAddInventory(true);
    }, []);

    const handleOff = useCallback((asset: IAssets) => {
        setSelectedItem(asset);
        setShowOff(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setShowSeeItem(false);
        setShowDeleteConfirmation(false);
        setShowModalEditAsset(false);
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
        'Referencia',
        'Estado',
        'Condición',
        'Inventario',
        'Precio de compra',
        'Precio de venta',
        'IVA',
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
                        <h1 className={`${styles.title} mb-4 mt-4 mx-auto`}>Equipos, herramientas y máquinas</h1>

                        <div className={`${styles.container__Link_Head_Navigate} mb-4 mx-auto d-flex align-items-center justify-content-between`}>
                            <div className={styles.link__Head_Navigate} onClick={handleConsultOff} >Ver dados de baja</div>
                            <div className={styles.link__Head_Navigate}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <Link to='/inventories/create-assets' className={`${styles.link} m-0 text-decoration-none`}>Registro de equipos, herramientas y máquinas</Link>
                            </div>
                        </div>

                        <Modal show={showConsultOff} onHide={() => setShowConsultOff(false)} size="xl" backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalle de los equipos dados de baja</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConsultAssetOff
                                    token={token}
                                    branches={branchesArray}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <div className={`${styles.container__Filters} mb-4 mx-auto d-flex align-items-center justify-content-between`}>
                            <div className={`${styles.container__Filter_Branch} d-flex align-items-center justify-content-center gap-2`}>
                                <h3 className={`${styles.title__Branch} m-0`}>Filtra tus equipos, herramientas y máquinas por sede</h3>
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
                                                'Referencia',
                                                'Estado',
                                                'Condición',
                                                'Inventario',
                                                'Precio de compra',
                                                'Precio de venta',
                                                'IVA',
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
                                <thead className={`${styles.container__Head} `}>
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
                                        {selectedColumns.includes('Referencia') && (
                                            <th className={`${styles.reference} d-flex align-items-center justify-content-center text-center`}>Referencia</th>
                                        )}
                                        {selectedColumns.includes('Estado') && (
                                            <th className={`${styles.state__Asset} d-flex align-items-center justify-content-center text-center`}>Estado</th>
                                        )}
                                        {selectedColumns.includes('Condición') && (
                                            <th className={`${styles.condition__Asset} d-flex align-items-center justify-content-center text-center`}>Condición</th>
                                        )}
                                        {selectedColumns.includes('Inventario') && (
                                            <th className={`${styles.inventory} d-flex align-items-center justify-content-center text-center`}>Inventario</th>
                                        )}
                                        {selectedColumns.includes('Precio de compra') && (
                                            <th className={`${styles.purchase__Price_Before_Tax} d-flex align-items-center justify-content-center text-center`}>Precio de compra</th>
                                        )}
                                        {selectedColumns.includes('Precio de venta') && (
                                            <th className={`${styles.selling__Price} d-flex align-items-center justify-content-center text-center`}>Precio de venta</th>
                                        )}
                                        {selectedColumns.includes('IVA') && (
                                            <th className={`${styles.IVA} d-flex align-items-center justify-content-center text-center`}>IVA</th>
                                        )}
                                        <th className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</th>
                                    </tr>
                                </thead>
                                
                                <tbody className={`${styles.container__Body}`}>
                                    {Array.isArray(assets) && assets.length > 0 ? (
                                        assets.map((asset) => (
                                        <tr key={asset.id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            <td className={`${styles.branch} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>
                                                    {Array.isArray(branches) && branches.map((branch, index) => (
                                                        asset.branchId === branch.id && (
                                                            <span className={`${styles.text__Ellipsis} text-center overflow-hidden`} key={index}>{branch.nameBranch}</span>
                                                        )
                                                    ))}
                                                </span>
                                            </td>

                                            {selectedColumns.includes('Código de barras') && (
                                                <td className={`${styles.bar__Code} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.barCode ? asset.barCode : 'No definido'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Nombre del item') && (
                                                <td className={`${styles.name__Item} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.nameItem}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Marca') && (
                                                <td className={`${styles.brand} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.brandItem ? asset.brandItem : 'No definida'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Referencia') && (
                                                <td className={`${styles.reference} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.referenceItem ? asset.referenceItem : 'No definida'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Estado') && (
                                                <td className={`${styles.state__Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.stateAssets ? asset.stateAssets : 'No definido'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Condición') && (
                                                <td className={`${styles.condition__Asset} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.conditionAssets ? asset.conditionAssets : 'No definida'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Inventario') && (
                                                <td className={`${styles.inventory} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.inventory}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Precio de compra') && (
                                                <td className={`${styles.purchase__Price_Before_Tax} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>$ {formatNumber(asset.purchasePriceBeforeTax)}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('Precio de venta') && (
                                                <td className={`${styles.selling__Price} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.sellingPrice ? `$ ${formatNumber(asset.sellingPrice)}` : 'No definido'}</span>
                                                </td>
                                            )}
                                            {selectedColumns.includes('IVA') && (
                                                <td className={`${styles.IVA} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} overflow-hidden`}>{asset.IVA === 'No aplica' ? 'No aplica' : `${asset.IVA} %`}</span>
                                                </td>
                                            )}

                                            <td className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <MdOutlineRemoveRedEye
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdAsset(asset.id);
                                                                setNameAsset(asset.nameItem || '');
                                                                handleSeeItem(asset);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <RiDeleteBin6Line
                                                            className={`${styles.button__Delete} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdAsset(asset.id);
                                                                setNameAsset(asset.nameItem || '');
                                                                handleDelete(asset);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <BsPencil
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdAsset(asset.id);
                                                                handleEdit(asset)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <FaPlus
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdAsset(asset.id);
                                                                setNameAsset(asset.nameItem || '');
                                                                setIdBranch(asset.branchId);
                                                                handleAddInventory(asset)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                        <IoIosCloseCircleOutline
                                                            className={`${styles.button__Edit} d-flex align-items-center justify-content-center`}
                                                            onClick={() => {
                                                                setIdAsset(asset.id);
                                                                setNameAsset(asset.nameItem || '');
                                                                handleOff(asset)
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
                                            No tienes equipos, herramientas y máquinas registrados
                                        </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Modal show={showSeeItem} onHide={onCloseModal} size="xl" backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles del Activo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <SeeItemAsset
                                        asset={selectedItem}
                                        branches={branchesArray}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para eliminar el activo "{nameAsset}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ConfirmDeleteRegister
                                    typeRegisterDelete={'Asset'}
                                    idItem={idAsset}
                                    nameRegister={nameAsset}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showModalEditAsset} onHide={onCloseModal} size="xl" backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Detalles del Activo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedItem &&
                                    <ModalEditAsset
                                        token={token}
                                        idItem={idAsset}
                                        asset={selectedItem}
                                        branches={branchesArray}
                                        onCloseModal={onCloseModal}
                                    />
                                }
                            </Modal.Body>
                        </Modal>

                        <Modal show={showAddInventory} onHide={() => setShowAddInventory(false)} size="lg" backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Aumenta tu inventario</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AddInventoryAsset
                                    token={token}
                                    idItem={idAsset}
                                    nameItem={nameAsset}
                                    idBranch={idBranch}
                                    onCloseModal={onCloseModal}
                                />
                            </Modal.Body>
                        </Modal>

                        <Modal show={showOff} onHide={() => setShowOff(false)} backdrop="static" keyboard={false} >
                            <Modal.Header closeButton>
                                <Modal.Title className='text-primary-emphasis text-start'>Confirmación para dar de baja a tu activo "{nameAsset}"</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ModalAssetOff
                                    token={token}
                                    asset={selectedItem as IAssets}
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

export default ConsultAssetsPage;
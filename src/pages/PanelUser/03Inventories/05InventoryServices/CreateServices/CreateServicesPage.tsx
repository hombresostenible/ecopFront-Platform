/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getAssets, getAssetsByBranch } from '../../../../../redux/User/03Inventories/01InventoryAssetsSlice/actions.ts';
import { getProducts, getProductsByBranch } from '../../../../../redux/User/03Inventories/03InventoryProductsSlice/actions';
import { getRawMaterials, getRawMaterialsByBranch } from '../../../../../redux/User/03Inventories/04InventoryRawMateralsSlice/actions';
import { postService, getServices } from '../../../../../redux/User/03Inventories/05InventoryServicesSlice/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { IService } from '../../../../../types/UserPanel/03Inventories/services.types';
import { IBranch } from '../../../../../types/UserPanel/02Branch/branch.types.ts';
import CreateManyServices from '../../../../../components/PanelUser/03Inventories/05Servicios/CreateManyServices/CreateManyServices';
import CreateAsset from '../../../../../components/PanelUser/03Inventories/CreateComponents/01CreateAssets';
import CreateProduct from '../../../../../components/PanelUser/03Inventories/CreateComponents/02CreateProduct';
import CreateRawMateral from '../../../../../components/PanelUser/03Inventories/CreateComponents/03CreateRawMaterial';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import { FaPlus } from "react-icons/fa6";
import styles from './styles.module.css';

interface CreateServicesPageProps {
    addNotification: (type: 'success' | 'error', message: string) => void;
}

function CreateServicesPage({ addNotification }: CreateServicesPageProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    // Estados de Redux
    const errorService = useSelector((state: RootState) => state.service.errorService);
    const branches = useSelector((state: RootState) => state.branch.branch);
    const assets = useSelector((state: RootState) => state.assets.assets);
    const product = useSelector((state: RootState) => state.product.product);
    const rawMaterial = useSelector((state: RootState) => state.rawMaterial.rawMaterial);

    const [selectedBranch, setSelectedBranch] = useState('');

    useEffect(() => {
        dispatch(getBranches(token));
        dispatch(getAssets(token));
        dispatch(getProducts(token));
        dispatch(getRawMaterials(token));
        if (selectedBranch) {
            dispatch(getAssetsByBranch(selectedBranch, token));
            dispatch(getProductsByBranch(selectedBranch, token));
            dispatch(getRawMaterialsByBranch(selectedBranch, token));
        }
    }, [ token, selectedBranch ]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IService>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [loading, setLoading] = useState(false);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const onCloseCreateManyModal = () => {
        setShowCancelModal(false);
    };

    //Selección de la sede
    const handleBranchChange = (e: any) => {
        const selectedId = e.target.value;
        setSelectedBranch(selectedId);
    };


    

    //ACTIVOS
    const [isCreatingAsset, setIsCreatingAsset] = useState(false);
    const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
    const [showCancelModalAsset, setShowCancelModalAsset] = useState(false);
    //RENDERIZA TODOS LOS ACTIVOS
    const renderAssetInputs = () => {
        // Si assets es null, devolvemos null
        if (!assets) return null;
    
        // Si assets es un solo objeto, lo convertimos en un array
        const assetsArray = Array.isArray(assets) ? assets : [assets];
    
        return assetsArray.map((asset, index) => (
            <div key={index} className='d-flex'>
                <div className={`${styles.containerRender} d-flex align-items-center justify-content-center gap-2`}>
                    <p className={`${styles.renderNameItem} m-0 p-1 border rounded`}>{asset.nameItem}</p>
                    <input
                        type="checkbox"
                        checked={selectedAssets.includes(asset.id)}
                        onChange={(e) => handleAssetCheckboxChange(asset.id, e.target.checked)}
                        className={`${styles.inputCheck} border rounded`}
                    />
                </div>
            </div>
        ));
    };

    // Selecciona todos los activos utilizados en la prestación del servicio
    const handleAssetCheckboxChange = (assetId: string, isChecked: boolean) => {
        setSelectedAssets((prevSelectedAssets) => {
            if (isChecked) {
                return [...prevSelectedAssets, assetId];
            } else {
                return prevSelectedAssets.filter((id) => id !== assetId);
            }
        });
    };

    const handleCreateAsset = () => {
        setShowCancelModalAsset(true);
        setIsCreatingAsset(true);
    };

    const onCloseAssetModal = () => {
        setShowCancelModalAsset(false);
        setIsCreatingAsset(false);
    };

    const onAssetCreated = (idBranch: string, token: string) => {
        dispatch(getAssetsByBranch(idBranch, token));
        setIsCreatingAsset(false);
    };



    //PRODUCTOS
    const [isCreatingProduct, setIsCreatingProduct] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [productQuantities, setProductQuantities] = useState<{ [key: string]: number }>({});
    const [showCancelModalProduct, setShowCancelModalProduct] = useState(false);
    //RENDERIZA TODOS LOS PRODUCTOS
    const renderProductInputs = () => {
        // Si product es null, devolvemos null
        if (!product) return null;
    
        // Si product es un solo objeto, lo convertimos en un array
        const productArray = Array.isArray(product) ? product : [product];
    
        return productArray.map((product, index) => (
            <div key={index} className='d-flex'>
                <div className={`${styles.containerRender} d-flex align-items-center justify-content-center gap-2`}>
                    <p className={`${styles.renderNameItem} m-0 p-1 border rounded`}>{product.nameItem}</p>
                    <input
                        type="checkbox"
                        className={`${styles.inputCheck} border rounded`}
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => handleProductCheckboxChange(product.id, e.target.checked)}
                    />
                    <input
                        type="number"
                        className={`${styles.renderInputQuantity} p-2 border rounded`}
                        value={productQuantities[product.id] || ''}
                        onChange={(e) => handleProductQuantityChange(product.id, parseInt(e.target.value, 10))}
                        placeholder={`Cantidad de ${product.nameItem}`}
                        min={0}
                        onKeyDown={(e) => {
                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                e.preventDefault();
                            }
                        }}
                    />
                </div>
            </div>
        ));
    };

    // Selecciona todos los productos utilizados en la prestación del servicio
    const handleProductCheckboxChange = (productId: string, isChecked: boolean) => {
        setSelectedProducts((prevSelectedProducts) => {
            if (isChecked) {
                return [...prevSelectedProducts, productId];
            } else {
                return prevSelectedProducts.filter((id) => id !== productId);
            }
        });
    };

    // Modifica la función handleProductQuantityChange para manejar cambios en la cantidad de productos
    const handleProductQuantityChange = (productId: string, quantity: number) => {
        setProductQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: quantity,
        }));
    };

    //PRODUCTOS
    const handleCreateProduct = () => {
        setShowCancelModalProduct(true);
        setIsCreatingProduct(true);
    };

    const onCloseProductModal = () => {
        setShowCancelModalProduct(false);
        setIsCreatingProduct(false);
    };

    const onProductCreated = (idBranch: string, token: string) => {
        dispatch(getProductsByBranch(idBranch, token));
        setIsCreatingProduct(false);
    };



    
    //MATERIAS PRIMAS
    const [isCreatingRawMaterial, setIsCreatingRawMaterial] = useState(false);
    const [selectedRawMaterials, setSelectedRawMaterials] = useState<string[]>([]);
    const [rawMaterialQuantities, setRawMaterialQuantities] = useState<{ [key: string]: number }>({});
    const [showCancelModalRawMaterial, setShowCancelModalRawMaterial] = useState(false);
    //RENDERIZA TODAS LAS MATERIAS PRIMAS
    const renderRawMaterialInputs = () => {
        // Si assets es null, devolvemos null
        if (!rawMaterial) return null;
    
        // Si rawMaterial es un solo objeto, lo convertimos en un array
        const rawMaterialArray = Array.isArray(rawMaterial) ? rawMaterial : [rawMaterial];
    
        return rawMaterialArray.map((rawMaterial, index) => (
            <div key={index} className='d-flex'>
                <div className={`${styles.containerRender} d-flex align-items-center justify-content-center gap-2`}>
                    <p className={`${styles.renderNameItem} m-0 p-1 border rounded`}>{rawMaterial.nameItem}</p>
                    <input
                        type="checkbox"
                        className={`${styles.inputCheck} border rounded`}
                        checked={selectedRawMaterials.includes(rawMaterial.id)}
                        onChange={(e) => handleRawMaterialCheckboxChange(rawMaterial.id, e.target.checked)}
                    />
                    <input
                        type="number"
                        className={`${styles.renderInputQuantity} p-2 border rounded`}
                        value={rawMaterialQuantities[rawMaterial.id] || ''}
                        onChange={(e) => handleRawMaterialQuantityChange(rawMaterial.id, parseInt(e.target.value, 10))}
                        placeholder={`Cantidad de ${rawMaterial.nameItem}`}
                        min={0}
                        onKeyDown={(e) => {
                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                e.preventDefault();
                            }
                        }}
                    />
                    <p className={`${styles.renderInputUnitMeasure} m-0 p-1 d-flex`}>{rawMaterial.unitMeasure}s</p>
                </div>
            </div>
        ));
    };

    // Selecciona todas las materias primas utilizados en la prestación del servicio
    const handleRawMaterialCheckboxChange = (rawMaterialId: string, isChecked: boolean) => {
        setSelectedRawMaterials((prevSelectedRawMaterials) => {
            if (isChecked) {
                return [...prevSelectedRawMaterials, rawMaterialId];
            } else {
                return prevSelectedRawMaterials.filter((id) => id !== rawMaterialId);
            }
        });
    };

    const handleRawMaterialQuantityChange = (rawMaterialId: string, quantity: number) => {
        setRawMaterialQuantities((prevQuantities) => ({
            ...prevQuantities,
            [ rawMaterialId ]: quantity,
        }));
    };

    const handleCreateRawMaterial = () => {
        setIsCreatingRawMaterial(true);
        setShowCancelModalRawMaterial(true);
    };

    const onCloseRawMaterialModal = () => {
        setIsCreatingRawMaterial(false);
        setShowCancelModalRawMaterial(false);
    };

    const onRawMaterialCreated = (idBranch: string, token: string) => {
        setIsCreatingRawMaterial(false);
        dispatch(getRawMaterialsByBranch(idBranch, token));
    };
    
    //Setea el retentionType
    const [showRetentionType, setShowRetentionType] = useState('No aplica');
    const handleRetentionTypeChange = (event: { target: { value: SetStateAction<string> }}) => {
        setShowRetentionType(event.target.value);
    };

    //IVA AIU
    const [showIvaAiu, setShowIvaAiu] = useState('No');
    const handleIvaAiuChange = (event: { target: { value: SetStateAction<string> }}) => {
        setShowIvaAiu(event.target.value);
    };

    const onSubmit = (values: IService) => {
        setLoading(true);
        try {
            if (!isCreatingRawMaterial && !isCreatingProduct && !isCreatingAsset) {
                // Convertir assets, product y rawMaterial a arrays si no lo son ya
                const assetsArray = Array.isArray(assets) ? assets : assets ? [assets] : [];
                const productsArray = Array.isArray(product) ? product : product ? [product] : [];
                const rawMaterialsArray = Array.isArray(rawMaterial) ? rawMaterial : rawMaterial ? [rawMaterial] : [];
                const formData = {
                    ...values,
                    retentionType: showRetentionType,
                    serviceAssets: assetsArray
                        .filter((asset) => selectedAssets.includes(asset.id))
                        .map((asset) => ({
                            nameItem: asset.nameItem,
                            assetId: asset.id,
                        })),
    
                    serviceProducts: productsArray
                        .filter((product) => selectedProducts.includes(product.id))
                        .map((product) => ({
                            nameItem: product.nameItem,
                            productId: product.id,
                            quantity: String(productQuantities[product.id] || 0),
                        })),
    
                    serviceRawMaterials: rawMaterialsArray
                        .filter((rawMaterial) => selectedRawMaterials.includes(rawMaterial.id))
                        .map((rawMaterial) => ({
                            nameItem: rawMaterial.nameItem,
                            rawMaterialId: rawMaterial.id,
                            unitMeasure: rawMaterial.unitMeasure,
                            quantity: String(rawMaterialQuantities[rawMaterial.id] || 0),
                        })),
                } as IService;
                dispatch(postService(formData, token));
                setFormSubmitted(true);
                dispatch(getServices(token));
                reset();
                setTimeout(() => {
                    setFormSubmitted(false);
                    addNotification('success', 'Servicio creado exitosamente!');
                    setShouldNavigate(true);
                }, 1500);
            }
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/inventories/consult-services');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus Servicios</h1>

                        <div className={`${styles.container__Navigate_Inventories} mb-4 d-flex align-items-center justify-content-between`}>
                            <Link to='/inventories/consult-services' className={`${styles.link__Consult_Inventory} text-decoration-none`}>Consulta tu inventario</Link>
                            <div className={`${styles.link__Head_Navigate} d-flex align-items-center justify-content-between`}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <div className={`${styles.button__Bulk_Create} `} onClick={() => { setShowCancelModal(true) }} >Crea tus servicios de forma masiva</div>
                            </div>
                        </div>

                        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                                <Modal.Title className='text-primary-emphasis text-start'>Crea tus servicios de forma masiva</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateManyServices
                                    branches={branches}
                                    token={token}
                                    onCreateComplete={() => {
                                        onCloseCreateManyModal();
                                    }}
                                />
                            </Modal.Body>
                        </Modal>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} m-auto d-flex flex-column align-items-center justify-content-center position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}

                            {Array.isArray(errorService)&& errorService?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Selecciona una Sede</p>
                                <select
                                    {...register('branchId', { required: true })}
                                    className={`${styles.input} p-2 border `}
                                    onChange={handleBranchChange}
                                >
                                    <option value=''>Selecciona una Sede</option>
                                    {Array.isArray(branches) && branches.map((branch: IBranch, index: number) => (
                                        <option key={index} value={branch.id}>
                                            {branch.nameBranch}
                                        </option>
                                    ))}
                                </select>
                                {errors.branchId && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La Sede es requerida</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿Cuál es el nombre del servicio que vas a registrar?</p>
                                <input
                                    type="text"
                                    {...register('nameItem', { required: true })}
                                    className={`${styles.input} p-2 border `}
                                    placeholder='Nombre del servicio que quieres crear'
                                />
                                {errors.nameItem && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre del servicio es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} >¿A qué precio vendes tu servicio?</p>
                                <input
                                    type="number"
                                    {...register('sellingPrice', { setValueAs: (value) => parseFloat(value) })}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='¿A qué precio vendes tu servicio?'
                                    inputMode="numeric"
                                    min={0}
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') { e.preventDefault(); }
                                    }}
                                />
                                {errors.sellingPrice && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El precio del servicio es requerido</p>
                                )}
                            </div>

                            {/* RETENCIONES */}
                            <div className="mb-4 d-flex w-100 position-relative gap-3">
                                <div className="w-100 position-relative">
                                    <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Tipo de retención</p>
                                    <select
                                        {...register(`retentionType`, { required: true })}
                                        className={`${styles.input__Retention} p-2 border`}
                                        onChange={handleRetentionTypeChange}
                                    >
                                        <option value='No aplica'>No aplica</option>
                                        <option value='Honorarios y consultoria'>Honorarios y consultoria</option>
                                        <option value='Servicios'>Servicios</option>
                                        <option value='Compras'>Compras</option>
                                        <option value='Pagos al exterior y dividendos'>Pagos al exterior y dividendos</option>
                                        <option value='Otros'>Otros</option>
                                    </select>
                                </div>
                                
                                <div className="w-100 position-relative">
                                    <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Porcentaje de retención</p>
                                    <select
                                        {...register(`withholdingTax`, { setValueAs: value => parseInt(value, 10) })}
                                        className={`${styles.input__Retention} p-2 border`}
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

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿Cuál es el porcentaje de IVA del servicio?</p>
                                <select
                                    defaultValue={0}
                                    className={`${styles.input} p-2 border `}
                                    {...register('IVA', { required: true, setValueAs: value => parseInt(value, 10) })}
                                >
                                    <option value='No aplica'>No aplica</option>
                                    <option value={0}>0 %</option>
                                    <option value={5}>5 %</option>
                                    <option value={19}>19 %</option>
                                </select>
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Si el servicio está grabada con el impuesto al consumo, elige el porcentaje</p>
                                <select
                                    defaultValue={0}
                                    className={`${styles.input} p-2 border `}
                                    {...register('consumptionTax', { required: true, setValueAs: value => parseInt(value, 10) })}
                                >
                                    <option value='No aplica'>No aplica</option>
                                    <option value={4}>4 %</option>
                                    <option value={8}>8 %</option>
                                    <option value={16}>16 %</option>
                                </select>
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿El servicio está grabado con IVA AIU?</p>
                                <select
                                    className={`${styles.input} p-2 border `}
                                    onChange={handleIvaAiuChange}
                                >
                                    <option value={'No'}>No</option>
                                    <option value={'Si'}>Si</option>
                                </select>
                            </div>

                            {showIvaAiu === 'Si' && (
                                <div className='mb-3'>
                                    <div className='mb-3 d-flex gap-2'>
                                        <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Define el porcentaje de Administración</p>
                                        <input
                                            type="number"
                                            {...register('ivaAiu.administrativePercentage', { required: true, setValueAs: (value) => parseFloat(value) })}
                                            className={`${styles.input} p-2 border`}
                                            placeholder='Porcentaje de Administración'
                                            min={0}
                                            onKeyDown={(e) => {
                                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                        <span>%</span>
                                    </div>

                                    <div className='mb-3 d-flex gap-2'>
                                        <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Define el porcentaje de Imprevistos</p>
                                        <input
                                            type="number"
                                            {...register('ivaAiu.unforeseenPercentage', { required: true, setValueAs: (value) => parseFloat(value) })}
                                            className={`${styles.input} p-2 border`}
                                            placeholder='Porcentaje de Imprevistos'
                                            min={0}
                                            onKeyDown={(e) => {
                                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                        <span>%</span>
                                    </div>

                                    <div className='mb-3 d-flex gap-2'>
                                        <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Define el porcentaje de Utilidad</p>
                                        <input
                                            type="number"
                                            {...register('ivaAiu.utilityPercentage', { required: true, setValueAs: (value) => parseFloat(value) })}
                                            className={`${styles.input} p-2 border`}
                                            placeholder='Porcentaje de Utilidad'
                                            min={0}
                                            onKeyDown={(e) => {
                                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                        <span>%</span>
                                    </div>
                                </div>
                            )}

                            {selectedBranch && (
                                <div className={`mb-5 p-3 border border-secundary rounded`}>
                                    <div>
                                    <h3 className={`${styles.subtitle__Section} text-center`}>Equipos, herramientas o máquinas</h3>
                                        <p className={`${styles.label} `} >Selecciona los equipos, herramientas o máquinas que implementas para prestar tu servicio</p>
                                        <p className='mt-2'>Si el equipo, herramienta o máquina no existe, créala <span className={`${styles.link} text-sky-500`} onClick={handleCreateAsset}>aquí</span></p>
                                        <Modal show={showCancelModalAsset} onHide={() => setShowCancelModalAsset(false)} size="xl">
                                            <Modal.Header closeButton onClick={() => setShowCancelModalAsset(false)}>
                                                <Modal.Title>Crear Activo</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <CreateAsset
                                                    token={token}
                                                    selectedBranchId={selectedBranch}
                                                    onCreateComplete={() => {
                                                        onCloseAssetModal();
                                                        getAssetsByBranch(selectedBranch, token);
                                                    }}
                                                    onAssetCreated={onAssetCreated}
                                                />
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    <div>{renderAssetInputs()}</div>
                                </div>
                            )}

                            {selectedBranch && (
                                <div className={`mb-5 p-3 border border-secundary rounded`}>
                                    <div>
                                        <h3 className={`${styles.subtitle__Section} text-center`}>Productos</h3>
                                        <p className={`${styles.label} `} >Selecciona los productos que implementas para prestar tu servicio</p>
                                        <p className='mt-2'>Si el producto no existe, créalo <span className={`${styles.link} text-sky-500`} onClick={handleCreateProduct}>aquí</span></p>
                                        <Modal show={showCancelModalProduct} onHide={() => setShowCancelModalProduct(false)} size="xl">
                                            <Modal.Header closeButton onClick={() => setShowCancelModalProduct(false)}>
                                                <Modal.Title>Crear Producto</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <CreateProduct
                                                    token={token}
                                                    selectedBranchId={selectedBranch}
                                                    onCreateComplete={() => {
                                                        onCloseProductModal();
                                                        getProductsByBranch(selectedBranch, token);
                                                    }}
                                                    onProductCreated={onProductCreated}
                                                />
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    <div>{renderProductInputs()}</div>
                                </div>
                            )}

                            {selectedBranch && (
                                <div className={`mb-5 p-3 border border-secundary rounded`}>
                                    <div>
                                        <h3 className={`${styles.subtitle__Section} text-center`}>Materias Primas</h3>
                                        <p className={`${styles.label} `} >Selecciona las Materias Primas que implementas para prestar tu servicio</p>
                                        <p className='mt-2'>Si la materia prima no existe, créala <span className={`${styles.link} text-sky-500`} onClick={handleCreateRawMaterial}>aquí</span></p>
                                        <Modal show={showCancelModalRawMaterial} onHide={() => setShowCancelModalRawMaterial(false)} size="xl">
                                            <Modal.Header closeButton onClick={() => setShowCancelModalRawMaterial(false)}>
                                                <Modal.Title>Crear Materia Prima</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <CreateRawMateral
                                                    token={token}
                                                    selectedBranchId={selectedBranch}
                                                    onCreateComplete={() => {
                                                        onCloseRawMaterialModal();
                                                        getRawMaterialsByBranch(selectedBranch, token);
                                                    }}
                                                    onRawMaterialCreated={onRawMaterialCreated}
                                                />
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    <div>{renderRawMaterialInputs()}</div>
                                </div>
                            )}

                            <div className="mb-5 d-flex">
                                {loading ? 
                                    <div className={`${styles.container__Loading} `}>
                                        <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit' >
                                            <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Guardando...
                                        </button>
                                    </div> 
                                :
                                    <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit' >Enviar</button>
                                }
                            </div>
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default CreateServicesPage;
/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { postProduct, getProducts } from '../../../../../redux/User/03Inventories/03InventoryProductsSlice/actions';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
import { getAssetsByBranch } from '../../../../../redux/User/03Inventories/01InventoryAssetsSlice/actions.ts';
import { getRawMaterialsByBranch } from '../../../../../redux/User/03Inventories/04InventoryRawMateralsSlice/actions';
//ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../../../types/User/products.types';
import { IBranch } from '../../../../../types/User/branch.types';
import CreateManyProduct from '../../../../../components/PanelUser/03Inventories/03Products/CreateManyProducts/CreateManyProduct';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
import CreateAsset from '../../../../../components/PanelUser/03Inventories/CreateComponents/01CreateAssets';
import CreateRawMateral from '../../../../../components/PanelUser/03Inventories/CreateComponents/03CreateRawMaterial';
import { FaPlus } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import styles from './styles.module.css';

interface CreateProductPageProps {
    selectedBranchId: string;
    onCreateComplete?: () => void;
    onProductCreated?: (idBranch: string, token: string) => void;
    addNotification: (type: 'success' | 'error', message: string) => void;
}

function CreateProductsPage({ selectedBranchId, onCreateComplete, onProductCreated, addNotification }: CreateProductPageProps) {
    const token = jsCookie.get('token') || '';
    const navigate = useNavigate();
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorProduct = useSelector((state: RootState) => state.product.errorProduct);
    const branches = useSelector((state: RootState) => state.branch.branch);
    const assets = useSelector((state: RootState) => state.assets.assets);
    const rawMaterial = useSelector((state: RootState) => state.rawMaterial.rawMaterial);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<IProduct>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
            if (selectedBranchId) {
                getRawMaterialsByBranch(selectedBranchId, token);
                getAssetsByBranch(selectedBranchId, token);
            }
        }
    }, [token, selectedBranchId]);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const onCloseProductModal = () => {
        setShowCancelModal(false);
    };


    //Setea si el artículo aumentará de forma periódica en el inventario
    const [inventoryIncrease, setInventoryIncrease] = useState('Si');
    const [periodicityAutomaticIncrease, setPeriodicityAutomaticInventoryIncrease] = useState<string | undefined>(undefined);
    const handleInventoryIncrease = (value: 'Si' | 'No') => {
        setInventoryIncrease(value);
        setPeriodicityAutomaticInventoryIncrease(undefined)
        setValue('inventoryIncrease', value);
    };

    //Setea la periodicidad en la que se aumentará el inventario
    const handlePeriodicityAutomaticInventoryIncrease = (value: string) => {
        setPeriodicityAutomaticInventoryIncrease(value);
    };
    
    //Setea si el producto está empacada
    const [selectedpackaged, setSelectedpackaged] = useState('Si');
    const handlePackagedChange = (value: 'Si' | 'No') => {
        setSelectedpackaged(value);
        setValue('packaged', value);
    };

    //Setea el valor 'Si' o 'No' en la propiedad "returnablePackaging"
    const [selectedReturnablePackaging, setSelectedReturnablePackaging] = useState('Si');
    const handleReturnablePackagingChange = (value: 'Si' | 'No') => {
        setSelectedReturnablePackaging(value);
        setValue('returnablePackaging', value);
    };

    //Setea el valor 'Si' o 'No' en la propiedad "individualPackaging"
    const [selectedIndividualPackaging, setSelectedIndividualPackaging] = useState('Si');
    const handleIndividualPackagingChange = (value: 'Si' | 'No') => {
        setSelectedIndividualPackaging(value);
        setValue('individualPackaging', value);
    };
    
    //Setea el retentionType
    const [showRetentionType, setShowRetentionType] = useState('No aplica');
    const handleRetentionTypeChange = (event: { target: { value: SetStateAction<string> }}) => {
        setShowRetentionType(event.target.value);
    };
        
    //Setea el retentionType
    const [showWithHoldingTax, setShowWithHoldingTax] = useState('No aplica');
    const handleWithHoldingTaxChange = (event: { target: { value: SetStateAction<string> }}) => {
        setShowWithHoldingTax(event.target.value);
    };

    //IVA AIU
    const [showIvaAiu, setShowIvaAiu] = useState('No');
    const handleIvaAiuChange = (event: { target: { value: SetStateAction<string> }}) => {
        setShowIvaAiu(event.target.value);
    };



    //ACCESORISO DEL PRODUCTO
    const [accessoriesProduct, setAccessoriesProduct] = useState<{ accesory: string; productAccesoryPackageType: string }[]>([]);
    const [checkboxState, setCheckboxState] = useState<boolean[]>([]);

    //Setea el valor 'Si' o 'No' si el producto incluye accesorios
    const [selectedProductAccesory, setSelectedProductAccesory] = useState('Si');
    const handleShowAccesory = (value: SetStateAction<string>) => {
        setSelectedProductAccesory(value);
    };

    //Permite adicionar los accesorios
    const [newAccessory, setNewAccessory] = useState<string>('');
    const handleAddAccessory = () => {
        if (newAccessory.trim() !== '') {
            setAccessoriesProduct([...accessoriesProduct, { accesory: newAccessory, productAccesoryPackageType: '' }]);
            setNewAccessory('');
        }
    };
    
    //ACCESORIOS
    const handleCheckboxAccesoryChange = (index: number, checked: boolean) => {
        setCheckboxState((prev) => {
            const newState = [...prev];
            newState[index] = checked;
            return newState;
        });

        setAccessoriesProduct((prev) => {
            const updatedAccessories = [...prev];
            updatedAccessories[index] = {
                ...updatedAccessories[index],
                productAccesoryPackageType: checked ? '' : '',
            };
            return updatedAccessories;
        });        
    };

    const handleAccesoryPackageTypeChange = (index: number, value: string) => {
        setAccessoriesProduct((prev) => {
            const updatedAccessories = [...prev];
            updatedAccessories[index] = {
                ...updatedAccessories[index],
                productAccesoryPackageType: value,
            };
            return updatedAccessories;
        });
    };


    
    //ACTIVOS
    const [isCreatingAsset, setIsCreatingAsset] = useState(false);
    const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
    const [showCancelModalAsset, setShowCancelModalAsset] = useState(false);

    //RENDERIZA LOS ACTIVOS
    const renderAssetInputs = () => {
        return Array.isArray(assets)&& assets.map((asset, index) => (
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
    
    // Selecciona todos los activos utilizados en la elaboración del producto
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

    const onAssetCreated = (selectedBranchId: string, token: string) => {
        getAssetsByBranch(selectedBranchId, token);
        setIsCreatingAsset(false);
    };




    //MATERIAS PRIMAS
    const [isCreatingRawMaterial, setIsCreatingRawMaterial] = useState(false);
    const [selectedRawMaterials, setSelectedRawMaterials] = useState<string[]>([]);
    const [rawMaterialQuantities, setRawMaterialQuantities] = useState<{ [key: string]: number }>({});
    const [ShowCancelModalRawMaterial, setShowCancelModalRawMaterial] = useState(false);
    //RENDERIZA TODAS LAS MATERIAS PRIMAS
    const renderRawMaterialInputs = () => {
        return Array.isArray(rawMaterial) && rawMaterial.map((rawMaterial, index) => (
            <div key={index}>
                <div className={`${styles.containerRender} d-flex align-items-center justify-content-center`}>
                    <p className={`${styles.renderNameItem} m-0 p-1 border rounded text-start`}>{rawMaterial.nameItem}</p>
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

    // Selecciona todas las materias primas para elaborar el producto
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
        setShowCancelModalRawMaterial(true);
        setIsCreatingRawMaterial(true);
    };

    const onCloseRawMaterialModal = () => {
        setShowCancelModalRawMaterial(false);
        setIsCreatingRawMaterial(false);
    };

    const onRawMaterialCreated = (selectedBranchId: string, token: string) => {
        getAssetsByBranch(selectedBranchId, token);
        setIsCreatingRawMaterial(false);
    };

    const onSubmit = async (values: IProduct) => {
        setLoading(true);
        try {
            if (!isCreatingRawMaterial && !isCreatingAsset) {
                const assetsArray = Array.isArray(assets) ? assets : assets ? [assets] : [];
                const rawMaterialsArray = Array.isArray(rawMaterial) ? rawMaterial : rawMaterial ? [rawMaterial] : [];
                if (values.inventoryIncrease === 'No') values.periodicityAutomaticIncrease = undefined;
                if (values.packaged === 'No') values.primaryPackageType = undefined;
                const formData = {
                    ...values,
                    returnablePackaging: selectedReturnablePackaging,
                    individualPackaging: selectedIndividualPackaging,
                    packaged: selectedpackaged,
                    inventoryIncrease: inventoryIncrease,
                    periodicityAutomaticIncrease: periodicityAutomaticIncrease,
                    retentionType: showRetentionType,
                    withholdingTax: showWithHoldingTax ? showWithHoldingTax : null,
    
                    productAccesory: selectedProductAccesory,
                    productAccesories: accessoriesProduct.map((accessory) => ({
                        accesory: accessory.accesory,
                        productAccesoryPackageType: accessory.productAccesoryPackageType || null,
                    })),
    
                    productAssets: assetsArray
                        .filter((asset) => selectedAssets.includes(asset.id))
                        .map((asset) => ({
                            nameAssets: asset.nameItem,
                            assetId: asset.id,
                        })),
    
                    productRawMaterials: rawMaterialsArray
                        .filter((rawMaterial) => selectedRawMaterials.includes(rawMaterial.id))
                        .map((rawMaterial) => ({
                            nameItem: rawMaterial.nameItem,
                            rawMaterialId: rawMaterial.id,
                            unitMeasure: rawMaterial.unitMeasure,
                            quantity: String(rawMaterialQuantities[rawMaterial.id] || 0),  // Convertir cantidad a cadena
                        })),
                } as IProduct;
                await dispatch(postProduct(formData, token));
                setFormSubmitted(true);
                reset();
                setTimeout(() => {
                    dispatch(getProducts(token));
                    setFormSubmitted(false);
                    addNotification('success', 'Producto creado exitosamente!');
                    if (onCreateComplete) {
                        onCreateComplete();
                    } else setShouldNavigate(true);
                    if (onProductCreated && selectedBranchId) onProductCreated(selectedBranchId, token);
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
            navigate('/inventories/consult-products');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Crea tus productos</h1>

                        <div className={`${styles.container__Navigate_Inventories} mb-4 d-flex align-items-center justify-content-between`}>
                            <Link to='/inventories/consult-products' className={`${styles.link__Consult_Inventory} text-decoration-none`}>Consulta tu inventario</Link>
                            <div className={`${styles.link__Head_Navigate} d-flex align-items-center justify-content-between`}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <div className={`${styles.button__Bulk_Create} `} onClick={() => { setShowCancelModal(true) }} >Crea tus productos de forma masiva</div>
                            </div>
                        </div>

                        <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} size="xl" backdrop="static" keyboard={false} >
                            <Modal.Header closeButton onClick={() => setShowCancelModal(false)}>
                                <Modal.Title className='text-primary-emphasis text-start'>Crea tus productos de forma masiva</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateManyProduct
                                    branches={branches}
                                    token={token}
                                    onCreateComplete={() => {
                                        onCloseProductModal();
                                    }}
                                />
                            </Modal.Body>
                        </Modal>

                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} m-auto d-flex flex-column align-items-center justify-content-center position-relative`}>
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}

                            {Array.isArray(errorProduct) && errorProduct?.map((error, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                            ))}

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Selecciona una Sede</p>
                                <select
                                    {...register('branchId', { required: true })}
                                    className={`${styles.input} p-2 border`}
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
                                <p className={`${styles.label} `} >Si tiene código de barras ¿Cuál es el código?</p>
                                <input
                                    type="text"
                                    {...register('barCode')}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Código de barras del producto que quieres registrar'
                                />
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿Cuál es el nombre del producto que vas a registrar?</p>
                                <input
                                    type="text"
                                    {...register('nameItem', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Nombre del producto que quieres crear'
                                />
                                {errors.nameItem && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre del producto es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} >¿Cuál es la marca o referencia del producto que vas a registrar?</p>
                                <input
                                    type="text"
                                    {...register('brandItem')}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Marca del producto quieres registrar'
                                />
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿En qué unidad de medida desear registrar el inventario de tu producto?</p>
                                <select
                                    {...register('unitMeasure', { required: true })}
                                    className={`${styles.input} p-2 border`}
                                >                                         
                                    <option value=''>Selecciona una unidad de medida</option>
                                    <optgroup label="Unidades">                                              
                                        <option value='Unidades'>Unidades</option>
                                        <option value='Ristra'>Ristra</option>
                                        <option value='Decena'>Decena</option>
                                        <option value='Docena'>Docena</option>
                                    </optgroup>
                                    <optgroup label="Líquidos">
                                        <option value='Mililitro'>Mililitro</option>
                                        <option value='Onza'>Onza</option>
                                        <option value='Botella'>Botella</option>
                                        <option value='Litro'>Litro</option>
                                        <option value='Galon'>Galón</option>
                                        <option value='Pimpina'>Pimpina</option>
                                        <option value='Metro cubico'>Metro cúbico</option>
                                    </optgroup>
                                    <optgroup label="Sólidos">
                                        <option value='Miligramo'>Miligramo</option>
                                        <option value='Gramo'>Gramo</option>
                                        <option value='Libra'>Libra</option>
                                        <option value='Kilogramo'>Kilogramo</option>
                                        <option value='Caja'>Caja</option>
                                        <option value='Paca'>Paca</option>
                                        <option value='Paquete'>Paquete</option>
                                        <option value='Arroba'>Arroba</option>
                                        <option value='Bulto'>Bulto</option>
                                        <option value='Saco'>Saco</option>
                                        <option value='Tonelada'>Tonelada</option>
                                    </optgroup>
                                    <optgroup label="longitud">
                                        <option value='Milimetro'>Milimetro</option>
                                        <option value='Centrimetro'>Centrimetro</option>
                                        <option value='Pulgada'>Pulgada</option>
                                        <option value='Metro'>Metro</option>
                                        <option value='Centimetro cuadrado'>Centimetro cuadrado</option>
                                        <option value='Metro cuadrado'>Metro cuadrado</option>
                                    </optgroup>
                                </select>
                                {errors.unitMeasure && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de empaque de tu producto es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Hoy siendo la primer vez que registras información, ¿Cuánto producto tienes en el inventario?</p>
                                <input
                                    type="number"
                                    {...register('inventory', { required: true, setValueAs: (value) => parseFloat(value) })}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Tu inventario acá'
                                    min={0}
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') { e.preventDefault(); }
                                    }}
                                />
                                {errors.inventory && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El inventario del producto es requerido</p>
                                )}
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿El producto viene empacado en embalaje o envoltura?</p>
                                <div className={`${styles.condition__Container} d-flex align-items-center justify-content-center  border rounded`}>
                                    <div
                                        className={`${styles.condition__Option} ${selectedpackaged === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handlePackagedChange('Si')}
                                    >
                                        Si
                                    </div>
                                    <div
                                        className={`${styles.condition__Option} ${selectedpackaged === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handlePackagedChange('No')}
                                    >
                                        No
                                    </div>
                                    {errors.packaged && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                    )}
                                </div>
                            </div>

                            {selectedpackaged === 'Si' && (
                                <div>
                                    <div className="mb-4 w-100 position-relative">
                                        <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Si el producto viene empacado ¿Cuál es el tipo de empaque principal?</p>
                                        <select
                                            {...register('primaryPackageType', { required: true })}
                                            className={`${styles.input} p-2 border`}
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
                                        {errors.primaryPackageType && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de empaque de tu producto es requerido</p>
                                        )}
                                    </div>

                                    <div className="mb-4 w-100 position-relative">
                                        <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿El producto tiene empaques adicionales?</p>
                                        <div className={`${styles.condition__Container} d-flex align-items-center justify-content-center border rounded`}>
                                            <div
                                                className={`${styles.condition__Option} ${selectedIndividualPackaging === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                                                onClick={() => handleIndividualPackagingChange('Si')}
                                            >
                                                Si
                                            </div>
                                            <div
                                                className={`${styles.condition__Option} ${selectedIndividualPackaging === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                                                onClick={() => handleIndividualPackagingChange('No')}
                                            >
                                                No
                                            </div>
                                            {errors.individualPackaging && (
                                                <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                            )}
                                        </div>
                                    </div>
        
                                    {selectedIndividualPackaging === 'Si' && (
                                        <div className="mb-4 w-100 position-relative">
                                            <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Si el producto tiene empaques adicionales ¿Cuál es el tipo de empaque?</p>
                                            <select
                                                {...register('secondaryPackageType', { required: true })}
                                                className={`${styles.input} p-2 border`}                                    
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
                                            {errors.secondaryPackageType && (
                                                <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de empaque de tu producto es requerido</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {selectedpackaged === 'Si' && (
                                <div className="mb-4 w-100 position-relative">
                                    <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿El empaque, embalaje o envoltura de tu producto es retornable?</p>
                                    <div className={`${styles.condition__Container} d-flex align-items-center justify-content-center  border rounded`}>
                                        <div
                                            className={`${styles.condition__Option} ${selectedReturnablePackaging === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                                            onClick={() => handleReturnablePackagingChange('Si')}
                                        >
                                            Si
                                        </div>
                                        <div
                                            className={`${styles.condition__Option} ${selectedReturnablePackaging === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                                            onClick={() => handleReturnablePackagingChange('No')}
                                        >
                                            No
                                        </div>
                                        {errors.returnablePackaging && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿Deseas sumar existencias a tu inventario de manera periódica?</p>
                                <div className={`${styles.condition__Container} d-flex align-items-center justify-content-center  border rounded`}>
                                    <div
                                        className={`${styles.condition__Option} ${inventoryIncrease === 'Si' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handleInventoryIncrease('Si')}
                                    >
                                        Si
                                    </div>
                                    <div
                                        className={`${styles.condition__Option} ${inventoryIncrease === 'No' ? styles.selected : ''} m-1 p-2 text-center`}
                                        onClick={() => handleInventoryIncrease('No')}
                                    >
                                        No
                                    </div>
                                    {errors.inventoryIncrease && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                    )}
                                </div>
                            </div>

                            {inventoryIncrease === 'Si' && (
                                <div className="mb-4 w-100 position-relative">
                                    <div className="mb-4 w-100 position-relative">
                                        <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿Cada cuánto quieres sumar existencias a tu inventario?</p>
                                        <div className={`${styles.condition__Container} d-flex flex-wrap align-items-center justify-content-center w-100`}>
                                            <div
                                                className={`${styles.condition__Option} ${periodicityAutomaticIncrease === 'Diario' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Diario')}
                                            >
                                                Diario
                                            </div>
                                            <div
                                                className={`${styles.condition__Option} ${periodicityAutomaticIncrease === 'Semanal' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Semanal')}
                                            >
                                                Semanal
                                            </div>
                                            <div
                                                className={`${styles.condition__Option} ${periodicityAutomaticIncrease === 'Quincenal' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Quincenal')}
                                            >
                                                Quincenal
                                            </div>
                                            <div
                                                className={`${styles.condition__Option} ${periodicityAutomaticIncrease === 'Mensual' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Mensual')}
                                            >
                                                Mensual
                                            </div>
                                            <div
                                                className={`${styles.condition__Option} ${periodicityAutomaticIncrease === 'Bimestral' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Bimestral')}
                                            >
                                                Bimestral
                                            </div>
                                            <div
                                                className={`${styles.condition__Option} ${periodicityAutomaticIncrease === 'Trimestral' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Trimestral')}
                                            >
                                                Trimestral
                                            </div>
                                            <div
                                                className={`${styles.condition__Option} ${periodicityAutomaticIncrease === 'Semestral' ? styles.selected : ''} rounded m-1 p-2 text-center`}
                                                onClick={() => handlePeriodicityAutomaticInventoryIncrease('Semestral')}
                                            >
                                                Semestral
                                            </div>
                                            {errors.periodicityAutomaticIncrease && (
                                                <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-100 position-relative">
                                        <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Inventario: A futuro, ¿Cuánto deseas que se sume "{periodicityAutomaticIncrease}" a tu inventario?</p>
                                        <input
                                            type="number"
                                            {...register('automaticInventoryIncrease', { required: true, setValueAs: (value) => parseFloat(value) })}
                                            className={`${styles.input} p-2 border`}
                                            placeholder='Valor numérico de lo que quieres aumentar'
                                            min={0}
                                            onKeyDown={(e) => {
                                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                        {errors.automaticInventoryIncrease && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                        )}
                                    </div>
                                </div>
                            )}

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
                                        onChange={handleWithHoldingTaxChange}
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
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿Cuál es el porcentaje de IVA del producto?</p>
                                <select
                                    defaultValue={0}
                                    className={`${styles.input} p-2 border`}
                                    {...register('IVA', { required: true, setValueAs: value => parseInt(value, 10) })}
                                >
                                    <option value='No aplica'>No aplica</option>
                                    <option value={0}>0 %</option>
                                    <option value={5}>5 %</option>
                                    <option value={19}>19 %</option>
                                </select>
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> Si el producto está grabado con el impuesto al consumo, elige el porcentaje</p>
                                <select
                                    defaultValue={0}
                                    className={`${styles.input} p-2 border`}
                                    {...register('consumptionTax', { required: true, setValueAs: value => parseInt(value, 10) })}
                                >
                                    <option value='No aplica'>No aplica</option>
                                    <option value={4}>4 %</option>
                                    <option value={8}>8 %</option>
                                    <option value={16}>16 %</option>
                                </select>
                            </div>

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} >¿El producto está grabado con IVA AIU?</p>
                                <select
                                    className={`${styles.input} p-2 border`}
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
                                            className={` p-2 border`}
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
                                            className={` p-2 border`}
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
                                        <p className={`${styles.label} mb-0 p-2`} ><span className={`${styles.required__Information} `}>*</span> Define el porcentaje de Utilidad</p>
                                        <input
                                            type="number"
                                            {...register('ivaAiu.utilityPercentage', { required: true, setValueAs: (value) => parseFloat(value) })}
                                            className={` p-2 border`}
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

                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿Cuál es el precio de venta?</p>
                                <input
                                    type="number"
                                    {...register('sellingPrice', { required: true, setValueAs: (value) => parseFloat(value) })}
                                    className={`${styles.input} p-2 border`}
                                    placeholder='Precio de venta del producto'
                                    min={0}
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') { e.preventDefault(); }
                                    }}
                                />
                                {errors.sellingPrice && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>El precio de venta es requerido</p>
                                )}
                            </div>



                            {/* ACCESORIOS */}
                            <div className="mb-4 w-100 position-relative">
                                <p className={`${styles.label} `} ><span className={`${styles.required__Information} `}>*</span> ¿Tu producto incluye accesorios?</p>
                                <div className={`${styles.condition__Container} d-flex align-items-center justify-content-center  border rounded`}>
                                    <div
                                        className={`${styles.condition__Option} ${selectedProductAccesory === 'Si' ? styles.selected : ''} m-1 p-2 text-center`} 
                                        onClick={() => handleShowAccesory('Si')}
                                    >
                                        Si
                                    </div>
                                    <div
                                        className={`${styles.condition__Option} ${selectedProductAccesory === 'No' ? styles.selected : ''} m-1 p-2 text-center`} 
                                        onClick={() => handleShowAccesory('No')}
                                    >
                                        No
                                    </div>
                                    {errors.returnablePackaging && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                    )}
                                </div>
                            </div>

                            {selectedProductAccesory === 'Si' && (
                                <div className={`mb-5 p-3 border border-secundary rounded`}>
                                    <h3 className={`${styles.subtitle__Section} text-center`}>Accesorios</h3>
                                    <p className={`${styles.label} `} >Ingresa aquí los accesorios de tu producto</p>
                                    <div className={`m-3 d-flex align-items-center justify-content-center gap-3`}>
                                        <input
                                            type="text"
                                            className={`${styles.info} p-2 border rounded border-secundary`}
                                            value={newAccessory}
                                            onChange={(e) => setNewAccessory(e.target.value)}
                                        />
                                        <div className={`${styles.container__Icon_Add} d-flex align-items-center justify-content-center`}>
                                            <GoPlus className={`${styles.icon__Add} m-0`} onClick={handleAddAccessory}/>
                                        </div>
                                    </div>
                                    <div className={`${styles.containerAccesories} m-auto d-flex flex-column align-items-center justify-content-between`}>
                                        <p>Si el accesorio contiene algún tipo de empaque, presiona el check y selecciona un tipo de las opciones</p>
                                        {accessoriesProduct.map((accessory, index) => (
                                            <div key={index} className={`${styles.accesories} d-flex flex-column`}>
                                                <div className="m-auto p-2 d-flex" >
                                                    <p className={`${styles.accesory} p-2 text-start border rounded`}>{accessory.accesory}</p>
                                                    <input
                                                        type="checkbox"
                                                        className={styles.inputCheck}
                                                        onChange={(e) => handleCheckboxAccesoryChange(index, e.target.checked)}
                                                    />
                                                    {checkboxState[index] && (
                                                        <div>
                                                            <select
                                                                {...register(`productAccesories.${index}.productAccesoryPackageType`, { required: true })}
                                                                value={accessory.productAccesoryPackageType || ''}
                                                                onChange={(e) => handleAccesoryPackageTypeChange(index, e.target.value)}
                                                                className={`${styles.accesorySelect} border rounded`}
                                                            >
                                                                <option value=''>Selecciona una opción</option>
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
                                                            {errors.productAccesories && (
                                                                <p className={`${styles.text__Danger} text-danger position-absolute`}>El tipo de empaque de tu accesorio es requerido</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}



                            {/* ACTIVOS */}
                            <div className={`mb-5 p-3 border border-secundary rounded`}>
                                <div>
                                    <h3 className={`${styles.subtitle__Section} text-center`}>Equipos, herramientas o máquinas</h3>
                                    <p className={`${styles.label} `} >Selecciona los equipos, herramientas o máquinas que utilizas para elaborar tu producto</p>
                                    <p className='mt-2'>Si el equipo, herramienta o máquina no existe, créalo <span className={`${styles.link} text-sky-500 text-decoration-none`} onClick={handleCreateAsset}>aquí</span></p>
                                    <Modal show={showCancelModalAsset} onHide={() => setShowCancelModalAsset(false)} size="xl">
                                        <Modal.Header closeButton onClick={() => setShowCancelModalAsset(false)}>
                                            <Modal.Title>Crear Activo</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        <CreateAsset
                                            token={token}
                                            selectedBranchId={selectedBranchId}
                                            onCreateComplete={() => {
                                                onCloseAssetModal();
                                                getRawMaterialsByBranch(selectedBranchId, token);
                                            }}
                                            onAssetCreated={onAssetCreated}
                                        />
                                        </Modal.Body>
                                    </Modal>
                                </div>
                                <div>{renderAssetInputs()}</div>
                            </div>



                            {/* MATERIAS PRIMAS */}
                            <div className={`mb-5 p-3 border border-secundary rounded`}>
                                <div>
                                    <h3 className={`${styles.subtitle__Section} text-center`}>Materias primas</h3>
                                    <p className={`${styles.label} `} >Selecciona las materias primas y especifica la cantidad que utilizas para elaborar un (1) producto:</p>
                                    <Modal show={ShowCancelModalRawMaterial} onHide={() => setShowCancelModalRawMaterial(false)} size="xl">
                                        <Modal.Header closeButton onClick={() => setShowCancelModalRawMaterial(false)}>
                                            <Modal.Title>Crear Materia Prima</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <CreateRawMateral
                                                token={token}
                                                selectedBranchId={selectedBranchId}
                                                onCreateComplete={() => {
                                                    onCloseRawMaterialModal();
                                                    getRawMaterialsByBranch(selectedBranchId, token);
                                                }}
                                                onRawMaterialCreated={onRawMaterialCreated}
                                            />
                                        </Modal.Body>
                                    </Modal>
                                </div>
                                <div>{renderRawMaterialInputs()}</div>
                                <p className='mt-2'>Si la materia prima no existe, créala <span className={`${styles.link} text-sky-500`} onClick={handleCreateRawMaterial}>aquí</span></p>
                            </div>

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

export default CreateProductsPage;
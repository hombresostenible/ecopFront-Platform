/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { postAccountsBook } from '../../../../../redux/User/04AccountsSlice/actions';
import { getItemByBarCode } from '../../../../../redux/User/itemBybarCodeOrName/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook, IAccountsBookItems } from "../../../../../types/UserPanel/04Accounts/accountsBook.types";
// import { IUserPlatform } from '../../../../../types/User/userPlatform.types';
import SearchItemsByname from '../../../../../helpers/SearchItemName/SearchItemsByname';
import ModalChangeQuantityPerItem from '../../../../../helpers/ModalChangeQuantityPerItem/ModalChangeQuantityPerItem';
import SearchSupplierCrm from '../../../../../helpers/SearchSupplierCrm/SearchSupplierCrm';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from "react-icons/fa6";
import styles from './styles.module.css';

interface ExpenseCasProps {
    token: string;
    decodeUserIdRegister: string;
    // usersPlatform: IUserPlatform | IUserPlatform[] | null;
    selectedBranch: string;
    defaultDates: boolean;
    registrationDate: string | undefined;
    transactionDate: string | undefined;
    typeExpense: string;
}

function ExpenseCash({ token, decodeUserIdRegister, selectedBranch, defaultDates, registrationDate, transactionDate, typeExpense }: ExpenseCasProps) {
    const navigate = useNavigate();

    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorAccountsBook = useSelector((state: RootState) => state.accountsBook.errorAccountsBook);
    const itemByBarCode = useSelector((state: RootState) => state.itemByBarCodeOrName.itemByBarCode);

    const { handleSubmit } = useForm<IAccountsBook>();
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [messageSelectedBranch, setMessageSelectedBranch] = useState<string | null>('');
    const [messageSelectedSupplier, setMessageSelectedSupplier] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // BUSCAR Y SETEAR EL ARTICULO POR CODIGO DE BARRAS
    const [barCode, setBarCode] = useState<string>('');
    const handleBarCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setBarCode(value);
        if (value) dispatch(getItemByBarCode(value, token));
    };

    // Setea todos los artículos que se registrarán
    const [scannedItems, setScannedItems] = useState<IAccountsBookItems[]>([]);

    // SETEA EL ARTICULO BUSCADO POR CODIGO DE BARRAS
    useEffect(() => {
        if (itemByBarCode && itemByBarCode.result) {
            const item = itemByBarCode.result;
            const selectedItem: IAccountsBookItems = {
                nameItem: item.nameItem,
                id: item.id,
                type: item.type as 'Asset' | 'Merchandise' | 'Product' | 'RawMaterial' | 'Service',
                IVA: item.IVA,
                sellingPrice: item.sellingPrice,
                quantity: 1,
                subTotalValue: item.sellingPrice * 1,
            };
            setScannedItems(prevItems => [...prevItems, selectedItem]);
            setBarCode('');
        }
    }, [itemByBarCode]);

    // SETEA EL ARTICULO BUSCADO POR NOMBRE
    const handleItemSelect = (item: any) => {
        const selectedItems: IAccountsBookItems = {
            nameItem: item.nameItem,
            id: item.id,
            type: item.type as 'Asset' | 'Merchandise' | 'Product' | 'RawMaterial' | 'Service',
            IVA: item.IVA,
            sellingPrice: item.sellingPrice,
            purchasePrice: item.purchasePrice,
            quantity: 1,
            subTotalValue: item.sellingPrice * 1,
        };
        setScannedItems([...scannedItems, selectedItems]);
    };

    // ESTADO PARA CONTROLAR EL INDICE DEL ARTICULO EN scannedItems QUE SE ESTA AÑADIENDO
    const [changeQuantityIndex, setChangeQuantityIndex] = useState<number | null>(null);
    const handleChangeQuantityPerItem = (index: number) => setChangeQuantityIndex(index);

    // ESTADO PARA CONTROLAR EL INDICE DEL ARTICULO EN scannedItems QUE SE ESTA AÑADIENDO
    const handlePriceChange = (index: number, value: string) => {
        const newPrice = parseFloat(value);
        if (isNaN(newPrice) || newPrice < 0) return;
            setScannedItems((prevItems) => {
                const updatedItems = [...prevItems];
                updatedItems[index] = {
                    ...updatedItems[index],
                    purchasePrice: newPrice,
                    subTotalValue: updatedItems[index].quantity * newPrice
                };
                return updatedItems;
            }
        );
    };

    const handlePriceBlur = (index: number) => {
        setScannedItems((prevItems) => {
            const updatedItems = [...prevItems];
            const price = updatedItems[index].purchasePrice ?? 0;
            if (price >= 0) {
                updatedItems[index] = {
                    ...updatedItems[index],
                    purchasePrice: price,
                    subTotalValue: updatedItems[index].quantity * price
                };
            }
            return updatedItems;
        });
    };

    // ELIMINA EL ARTICULO AGREGADO A LA TABLA PARA COMPRA
    const handleDeleteItem = (index: number) => {
        setScannedItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1);
            return updatedItems;
        });
    };

    // CIERRA EL MODAL QUE CAMBIA LA CANTIDAD DEL ARTICULO SELECCIONADO PARA LA COMPRA
    const handleCloseModal = () => setChangeQuantityIndex(null);

    // ABRE EL MODAL DE CANTIDAD PRESIONANDO "Ctrl + Q"
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'q') setChangeQuantityIndex(0);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {  window.removeEventListener('keydown', handleKeyDown); };
    }, []);

    // ABRE EL MODAL DE CANTIDAD PRESIONANDO "Ctrl + Q"
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'q') {
                setChangeQuantityIndex(0);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // SETEA EL PROVEEDOR CUANDO SE BUSCA O SE CREA
    const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);

    // SELECCIONA EL MEDIO DE PAGO
    const [meanPayment, setMeansPayment] = useState('');
    const handleMeanPaymentChange = (event: { target: { value: SetStateAction<string> }}) => {
        setMeansPayment(event.target.value);
    };

    // CALCULA EL VALOR TOTAL DE TODOS LOS ARTICULOS AÑADIDOS A LA COMPRA
    const totalPurchaseAmount = scannedItems.reduce((total, scannedItem) => {
        const ivaAmount = scannedItem.IVA !== 'No aplica' 
            ? ((scannedItem.purchasePrice ?? 0) / 100 * Number(scannedItem.IVA)) 
            : 0;
        return total + (scannedItem.quantity * ((scannedItem.purchasePrice ?? 0) + ivaAmount));
    }, 0);
    
    const onSubmit = async (values: IAccountsBook) => {
        setLoading(true);
        try {
            const formData = {
                ...values,
                branchId: selectedBranch,
                transactionType: "Gasto",
                creditCash: "Contado",
                transactionCounterpartId: selectedSupplier,
                meanPayment: meanPayment ? meanPayment : null,
                itemsBuy: scannedItems,
                typeExpense: typeExpense,
                pay: 'No',
                userRegister: decodeUserIdRegister,
                totalValue: totalPurchaseAmount,
            } as IAccountsBook;
            if (defaultDates) {
                formData.registrationDate = new Date().toLocaleDateString();
                formData.transactionDate = new Date().toLocaleDateString();
            }
            if (registrationDate) formData.registrationDate = registrationDate;
            if (transactionDate) formData.transactionDate = transactionDate;
            if (!selectedBranch) {
                setMessageSelectedBranch('Debes de seleccionar una sede');
                setTimeout(() => setMessageSelectedBranch(null), 5000);
                return;
            }            

            if (!selectedSupplier) {
                setMessageSelectedSupplier('Debes de seleccionar un cliente o un proveedor');
                setTimeout(() => setMessageSelectedSupplier(null), 5000);
                return;
            }
            await dispatch(postAccountsBook(formData, token));
            setSelectedSupplier(null);
            setTimeout(() => {
                setShouldNavigate(true);
            }, 1500);
        } catch (error) {
            throw new Error(`Error en el envío del formulario: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/accounts/see-records');
        }
    }, [ shouldNavigate, navigate ]);
           
    return (
        <div>
            {Array.isArray(errorAccountsBook) && errorAccountsBook.map((error, i) => (
                <div key={i} className='bg-red-500 p-2 text-white text-center my-2'>{error}</div>
            ))}

            <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} `}>


                <div className='mt-4 mb-4'>
                    <div className="d-flex align-items-start justify-content-between">
                        <div>
                            <p className={`${styles.label} m-0`}>Busca el item por código de barras</p>
                            <input
                                id="barCodeInput"
                                type="text"
                                value={barCode}
                                className={`${styles.input__Bar_Code} `}
                                onChange={handleBarCodeChange}
                                placeholder='Código de barras'
                            />
                        </div>
                        <div>
                            <p className={`${styles.label} m-0`}>Busca el item por nombre</p>
                            <SearchItemsByname
                                selectedBranch={selectedBranch}
                                token={token}
                                onItemSelect={(item) => handleItemSelect(item)}
                            />
                        </div>
                    </div>

                    <h3 className="text-primary-emphasis text-center">Relación de artículos</h3>
                    <div className={`${styles.container__Table} mt-2 mb-2 mx-auto`}>
                        <table className="table">
                            <thead className={`${styles.container__Head} `}>
                                <tr className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                    <th className={`${styles.quantity} d-flex align-items-center justify-content-center text-center`}>Cantidad</th>
                                    <th className={`${styles.description__Item} d-flex align-items-center justify-content-center text-center`}>Descripción artículo</th>
                                    <th className={`${styles.unit__Price} d-flex align-items-center justify-content-center text-center`}>Vr. unitario</th>
                                    <th className={`${styles.iva} d-flex align-items-center justify-content-center text-center`}>% IVA</th>
                                    <th className={`${styles.iva} d-flex align-items-center justify-content-center text-center`}>Vr. IVA</th>
                                    <th className={`${styles.unit__Price} d-flex align-items-center justify-content-center text-center`}>Vr. unitario + IVA</th>
                                    <th className={`${styles.subtotal} d-flex align-items-center justify-content-center text-center`}>Subtotal</th>
                                    <th className={`${styles.delete} d-flex align-items-center justify-content-center text-center`}>Eliminar</th>
                                </tr>
                            </thead>

                            <tbody className={`${styles.container__Body} `}>
                                {Array.isArray(scannedItems) && scannedItems.length > 0 ? (
                                    scannedItems.map((item, index) => (
                                        <tr key={index} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                            <td className={`${styles.quantity} d-flex align-items-center justify-content-center`}>
                                                <div className={`${styles.container__Quantity} d-flex align-items-center justify-content-center`}>
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{item.quantity}</span>
                                                </div>
                                                <div className={`${styles.container__FaPlus} d-flex align-items-center justify-content-center`}>
                                                    <FaPlus
                                                        className={`${styles.icon__FaPlus} `}
                                                        onClick={() => handleChangeQuantityPerItem(index)}
                                                    />
                                                </div>
                                            </td>
                                            <td className={`${styles.description__Item} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{item.nameItem}</span>
                                            </td>
                                            <td className={`${styles.unit__Price} d-flex align-items-center justify-content-center position-relative`}>
                                                <span className={`${styles.text__Ellipsis_Purchase_Price} overflow-hidden position-absolute`}>$</span>
                                                <input
                                                    type="text"
                                                    className={`${styles.price__Input} text-end rounded`}
                                                    value={item.purchasePrice || ''}
                                                    onChange={(e) => handlePriceChange(index, e.target.value)}
                                                    onBlur={() => handlePriceBlur(index)}
                                                    placeholder="0"
                                                />
                                            </td>
                                            <td className={`${styles.iva} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>{item.IVA === 'No aplica' ? item.IVA : `${item.IVA} %`}</span>
                                            </td>
                                            <td className={`${styles.iva} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} text-center overflow-hidden`}>
                                                    {item.IVA !== 'No aplica'
                                                        ? `$ ${formatNumber((item.purchasePrice ?? 0) / 100 * Number(item.IVA))}`
                                                        : 'No aplica'
                                                    }
                                                </span>
                                            </td>
                                            <td className={`${styles.unit__Price} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>
                                                    <span>$ </span>
                                                    {item.IVA !== 'No aplica'
                                                        ? formatNumber((item.purchasePrice ?? 0) + ((item.purchasePrice ?? 0) / 100 * Number(item.IVA)))
                                                        : formatNumber(item.purchasePrice ?? 0)
                                                    }
                                                </span>
                                            </td>
                                            <td className={`${styles.subtotal} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>
                                                    <span>$ </span>
                                                    {item.IVA !== 'No aplica'
                                                        ? formatNumber(item.quantity * ((item.purchasePrice ?? 0) + ((item.purchasePrice ?? 0) / 100 * Number(item.IVA))))
                                                        : formatNumber(item.quantity * (item.purchasePrice ?? 0))
                                                    }
                                                </span>
                                            </td>
                                            <td className={`${styles.delete} d-flex align-items-center justify-content-center`}>
                                                <RiDeleteBin6Line
                                                    className={`${styles.button__Action} `}
                                                    onClick={() => handleDeleteItem(index)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={10} className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                            No tienes artículos registrados en la venta
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <Modal show={changeQuantityIndex !== null} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Aumentar Cantidad</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {changeQuantityIndex !== null && (
                                <ModalChangeQuantityPerItem
                                    onSaveQuantity={(newQuantity) => {
                                        if (changeQuantityIndex !== null) {
                                            setScannedItems(prevItems => {
                                                const updatedItems = [...prevItems];
                                                updatedItems[changeQuantityIndex].quantity = newQuantity;
                                                return updatedItems;
                                            });
                                        }
                                        handleCloseModal();
                                    }}
                                    onClose={handleCloseModal}
                                />
                            )}
                        </Modal.Body>
                    </Modal>

                    <div className={`${styles.container__Pay} d-flex align-items-start justify-content-between`}>
                        <div className={`${styles.container__Selected_Client} d-flex flex-column position-relative`}>
                            <p className={`${styles.label} m-0`}>Selecciona o crea a tu proveedor</p>
                            <SearchSupplierCrm
                                token={token}
                                onSupplierSelect={(supplier) => setSelectedSupplier(supplier)}
                            />
                            {messageSelectedSupplier && (
                                <div className={`${styles.error__Selected_Client} p-2 position-absolute`}>
                                    <div className={`${styles.triangle} position-absolute`}></div>
                                    <p className={`${styles.label} m-0`}>Selecciona el proveedor acá</p>
                                </div>
                            )}
                        </div>
                        <div className={`${styles.container__Info_Purchase} d-flex flex-column align-items-start justify-content-between`}>
                            <div className="mb-3 m-auto d-flex align-items-center justify-content-between">
                                <p className={`${styles.text__Purchase} m-0 text-start`}>Medio de pago</p>
                                <select
                                    className={`${styles.input__Info_Purchase} p-2`}
                                    value={meanPayment}
                                    onChange={handleMeanPaymentChange}
                                    required
                                >
                                    <option value="">Seleccione el medio de pago</option>
                                    <optgroup label="Tradicionales">
                                        <option value='Efectivo'>Efectivo</option>
                                        <option value='Tarjeta de Credito/Debito'>Tarjeta de Credito/Debito</option>
                                        <option value='Transferencia bancaria (PSE)'>Transferencia bancaria (PSE)</option>
                                    </optgroup>
                                    <optgroup label="Billeteras digitales">
                                        <option value='Daviplata'>Daviplata</option>
                                        <option value='Nequi'>Nequi</option>
                                        <option value='Movii'>Movii</option>
                                        <option value='Tuya Pay'>Tuya Pay</option>
                                        <option value='Dale'>Dale</option>
                                        <option value='Nubank'>Nubank</option>
                                        <option value='Uala'>Uala</option>
                                        <option value='Lulo Bank'>Lulo Bank</option>
                                        <option value='Tpaga'>Tpaga</option>
                                        <option value='Powwi'>Powwi</option>
                                        <option value='BBVA Wallet'>BBVA Wallet</option>
                                        <option value='Ahorro a la mano'>Ahorro a la mano</option>
                                        <option value='Apple Pay'>Apple Pay</option>
                                        <option value='Rappipay'>Rappipay</option>
                                        <option value='Claro Pay'>Claro Pay</option>
                                        <option value='Powwi'>Powwi</option>
                                    </optgroup>
                                    <optgroup label="Otros">
                                        <option value='Baloto'>Baloto</option>
                                        <option value='Giro'>Giro</option>
                                        <option value='Cheque'>Cheque</option>
                                    </optgroup>
                                </select>
                            </div>
                            <div className="mb-3 mx-auto d-flex align-items-center justify-content-between">
                                <p className={`${styles.text__Purchase} m-0`}>Total de la compra</p>
                                <p className={`${styles.input__Info_Purchase} m-0 p-2 text-end`}>$ {formatNumber(totalPurchaseAmount)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                

                <div className="mb-4 d-flex align-items-center justify-content-center position-relative">
                    {messageSelectedBranch && (
                        <div className={`${styles.error__Message_Selected_Branch} position-absolute`}>{messageSelectedBranch}</div>
                    )}
                    {messageSelectedSupplier && (
                        <div className={`${styles.error__Message_Selected_Client} position-absolute`}>{messageSelectedSupplier}</div>
                    )}

                    <div className="mb-5 d-flex">
                        {loading ? 
                            <div className={`${styles.container__Loading} position-relative w-100`}>
                                <button className={`${styles.button__Submit} border-0 mx-auto rounded m-auto text-decoration-none`} type='submit' >
                                    <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Guardando...
                                </button>
                            </div> 
                        :
                            <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit' >Enviar</button>
                        }
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ExpenseCash;
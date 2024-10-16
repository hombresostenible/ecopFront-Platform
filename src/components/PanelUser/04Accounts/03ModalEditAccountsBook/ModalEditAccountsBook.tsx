/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../redux/store';
import { getAccountsBooksIncomes, putAccountsBook } from '../../../../redux/User/04AccountsSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsBook } from '../../../../types/User/accountsBook.types';
import { IBranch } from '../../../../types/User/branch.types';
import styles from './styles.module.css';

interface ModalEditAccountsBookProps {
    token: string;
    idItem: string;
    registerAccount: IAccountsBook;
    branches: IBranch[] | null;
    onCloseModal: () => void;
}

function ModalEditAccountsBook({ token, idItem, registerAccount, branches, onCloseModal }: ModalEditAccountsBookProps) {
    const dispatch: AppDispatch = useDispatch();

    const [editedAccountsBook, setEditedAccountsBook] = useState<IAccountsBook>({ ...registerAccount });
    const [editedTransactionType, setEditedTransactionType] = useState(registerAccount?.transactionType);
    const [editedCreditCash, setEditedCreditCash] = useState(registerAccount?.creditCash);
    const [editedMeanPayment, setEditedMeanPayment] = useState(registerAccount?.meanPayment);

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof IAccountsBook,
        dataType: 'text' | 'number' | 'date' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedAccountsBook((prevEdited) => ({
                    ...prevEdited,
                    [field]: numericValue,
                }));
            }
        } else {
            setEditedAccountsBook((prevEdited) => ({
                ...prevEdited,
                [field]: newValue,
            }));
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsByPage, setItemsByPage] = useState<number>(20);

    const handleSaveChanges = async (editedAccountsBook: IAccountsBook) => {
        try {
            editedAccountsBook.transactionType = editedTransactionType;
            editedAccountsBook.creditCash = editedCreditCash;
            editedAccountsBook.meanPayment = editedMeanPayment;
            dispatch(putAccountsBook(idItem, editedAccountsBook, token));
            setCurrentPage(1);
            setItemsByPage(20);
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getAccountsBooksIncomes(token, currentPage, itemsByPage));
            onCloseModal();
        } catch (error) {
            throw new Error('Error al guardar cambios');
        }
    };

    const cancelEditing = () => {
        onCloseModal();
        setEditedAccountsBook({ ...registerAccount });
    };

    return (
        <div>
            <div className={`${styles.containerCard} m-auto d-flex flex-column align-items-center justify-content-center`}>
                <h1 className={`${styles.title} text-center`}>Edita la información del registro</h1>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al registro</h6>
                <div className={styles.containerInput}>
                    <select
                        value={editedAccountsBook.branchId || ''}
                        className={`${styles.inputEdit} p-2 border w-100`}
                        onChange={(e) => handleEditField(e, 'branchId')}
                    >
                        {branches && branches.map((branch, index) => (
                            <option key={index} value={branch.id}>
                                {branch.nameBranch}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Fecha de registro</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="date"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.registrationDate ? new Date(editedAccountsBook.registrationDate).toISOString().split('T')[0] : ''}
                            onChange={(e) => handleEditField(e, 'registrationDate', 'date')}
                        />
                    </div>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Fecha de transacción</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="date"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.transactionDate ? new Date(editedAccountsBook.transactionDate).toISOString().split('T')[0] : ''}
                            onChange={(e) => handleEditField(e, 'transactionDate', 'date')}
                        />
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de transacción</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.transactionType || ''}
                            onChange={(e) => {
                                const value = e.target.value as 'Ingreso' | 'Gasto';
                                setEditedTransactionType(value);
                                setEditedAccountsBook((prevEdited) => ({
                                    ...prevEdited,
                                    transactionType: value,
                                }));
                            }}
                        >
                            <option value='Ingreso'>Ingreso</option>
                            <option value='Gasto'>Gasto</option>
                        </select>
                    </div>
                </div>

                <div className="w-100">
                    <h6 className={styles.label}>Tipo de ingreso</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.creditCash || ''}
                            onChange={(e) => {
                                const value = e.target.value as 'Contado' | 'Credito';
                                setEditedCreditCash(value);
                                setEditedAccountsBook((prevEdited) => ({
                                    ...prevEdited,
                                    creditCash: value,
                                }));
                            }}
                        >
                            <option value='Contado'>Contado</option>
                            <option value='Credito'>Credito</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Medio de pago</h6>
                    <div className={styles.containerInput}>
                        <select
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.meanPayment || ''}
                            onChange={(e) => {
                                const value = e.target.value as 'Efectivo' | 'Tarjeta de Credito/Debito' | 'Transferencia bancaria (PSE)'  | 'Daviplata' | 'Nequi' | 'Movii' | 'Tuya Pay' | 'Dale' | 'Nubank' | 'Uala' | 'Lulo Bank' | 'Tpaga' | 'Powwi' | 'BBVA Wallet' | 'Ahorro a la mano' | 'Apple Pay' | 'Rappipay' | 'Claro Pay' | 'Baloto' | 'Giro' |'Cheque';
                                setEditedMeanPayment(value);
                                setEditedAccountsBook((prevEdited) => ({
                                    ...prevEdited,
                                    meanPayment: value,
                                }));
                            }}
                        >
                            <option value='Efectivo'>Efectivo</option>
                            <option value='Tarjeta de Credito/Debito'>Tarjeta de Credito/Debito</option>
                            <option value='Transferencia bancaria (PSE)'>Transferencia bancaria (PSE)</option>
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
                            <option value='Baloto'>Baloto</option>
                            <option value='Giro'>Giro</option>
                            <option value='Cheque'>Cheque</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Valor total</h6>
                    <div className={styles.containerInput}>
                        <input
                            type="number"
                            className={`${styles.inputEdit} p-2 border w-100`}
                            value={editedAccountsBook.totalValue}
                            onChange={(e) => handleEditField(e, 'totalValue', 'number')}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-4 d-flex align-items-center justify-content-center gap-4">
                <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} onClick={() => handleSaveChanges(editedAccountsBook)}>Guardar</button>
                <button className={`${styles.button__Cancel} border-0 rounded text-decoration-none`} onClick={cancelEditing}>Cancelar</button>
            </div>
        </div>
    );
}

export default ModalEditAccountsBook;
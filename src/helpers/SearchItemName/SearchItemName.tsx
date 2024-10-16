/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// REDUX
import { getItemByName } from '../../redux/User/itemBybarCodeOrName/actions';
import type { RootState, AppDispatch } from '../../redux/store';
import debounce from 'lodash/debounce';
// ELEMENTOS DEL COMPONENTE

import styles from './styles.module.css';

interface SearchItemNameProps {
    token: string;
    onItemSelect: (item: any) => void;
}

function SearchItemName({ token, onItemSelect }: SearchItemNameProps) {
    const dispatch: AppDispatch = useDispatch();
    const itemByName = useSelector((state: RootState) => state.itemByBarCodeOrName.itemByName);

    const [nameItem, setNameItem] = useState('');
    const [debouncedNameItem, setDebouncedNameItem] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const debouncedSearch = useMemo(() => debounce((nextValue: string) => setDebouncedNameItem(nextValue), 1000), []);

    useEffect(() => {
        if (debouncedNameItem && token) {
            dispatch(getItemByName(debouncedNameItem, token));
        }
    }, [debouncedNameItem, token, dispatch]);

    useEffect(() => {
        if (itemByName) {
            const results = Array.isArray(itemByName) ? itemByName : [itemByName];
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [itemByName]);

    useEffect(() => {
        return () => {
            setSearchResults([]);
            setNameItem('');
            setDebouncedNameItem('');
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNameItem(value);
        debouncedSearch(value);
    };

    const handleItemClick = (item: any) => {
        onItemSelect(item);
        setNameItem('');
        setDebouncedNameItem('');
        setSearchResults([]);
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <p className="m-0">Busca el equipo, mercancía, materia prima, producto o servicio que deseas vender</p>
            <div className='d-flex'>
                <p className="mb-0 p-2">Nombre</p>
                <div className={`${styles.container__Search_Result} position-relative`}>
                    <input
                        type="text"
                        className={`${styles.input__BarCode} p-2`}
                        value={nameItem}
                        onChange={handleChange}
                        placeholder='Escribe el nombre'
                    />
                    {nameItem && searchResults.length > 0 && (
                        <div className={`${styles.select__Container} position-absolute overflow-y-auto`}>
                            {searchResults.map((item, index) => (
                                <button key={index} onClick={() => handleItemClick(item)} className={`${styles.button__Selected_Item} text-start display-block p-2 border-0`}>
                                    {item.nameItem}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchItemName;
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { getItems } from '../../redux/User/searchItems/actions';
// ELEMENTOS DEL COMPONENTE
import { IAssets } from "../../types/UserPanel/03Inventories/assets.types";
import { IMerchandise } from "../../types/UserPanel/03Inventories/merchandise.types";
import { IProduct } from "../../types/UserPanel/03Inventories/products.types";
import { IRawMaterial } from "../../types/UserPanel/03Inventories/rawMaterial.types";
import { IService } from "../../types/UserPanel/03Inventories/services.types";
import CreateItem from '../CreateItem/CreateItem';
import { StylesReactSelect } from '../StylesComponents/StylesReactSelect';

interface SearchItemsBynameProps {
    token: string;
    selectedBranch: string | undefined;
    onItemSelect?: (item: any) => void;
    onDataItemSelect?: (data: IAssets | IMerchandise | IProduct | IRawMaterial | IService) => void;
}

interface OptionType {
    label: string;
    data?: IAssets | IMerchandise | IProduct | IRawMaterial | IService;
}

function SearchItemsByname({ token, selectedBranch, onItemSelect, onDataItemSelect }: SearchItemsBynameProps) {
    const dispatch: AppDispatch = useDispatch();
    const items = useSelector((state: RootState) => state.searchItems.items);
    
    const [filterText, setFilterText] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const [showCancelModalCreateItem, setshowCancelModalCreateItem] = useState(false);
    const selectRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (selectedBranch) dispatch(getItems(selectedBranch, token));
    }, [selectedBranch, token]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                event.target instanceof Node &&
                !selectRef.current.contains(event.target) &&
                selectedOption === null
            ) {
                setFilterText('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectRef, selectedOption]);

    const createItemOption: OptionType = {
        label: '¿No existe el artículo? Créalo acá',
    };

    const filteredOptions: OptionType[] = Array.isArray(items)
        ? items
              .filter((item) =>
                item?.nameItem && item.nameItem.toLowerCase().includes(filterText.toLowerCase())
              )
              .map((item) => ({
                label: `${item.nameItem}`,
                data: item,
            }))
        : [];

    filteredOptions.unshift(createItemOption);

    const handleInputChange = (inputValue: string) => {
        setFilterText(inputValue);
    };

    const handleSelectChange = (option: OptionType | null) => {
        if (option?.label === '¿No existe el artículo? Créalo acá') {
            setshowCancelModalCreateItem(true);
        } else {
            if (onItemSelect && option?.data) {
                onItemSelect(option.data);
            }
            if (onDataItemSelect && option?.data) {
                onDataItemSelect(option.data);
            }
            setSelectedOption(null);
            setFilterText('');
        }
    };

    const onCloseCreateItemModal = () => {
        setshowCancelModalCreateItem(false);
    };

    const onCreateItem = (token: string) => {
        if (selectedBranch) dispatch(getItems(selectedBranch, token));
    };

    return (
        <div ref={selectRef} >
            <Select
                value={selectedOption || null}
                inputValue={filterText || ''}
                onInputChange={handleInputChange}
                onChange={handleSelectChange}
                options={filteredOptions}
                placeholder="Busca por nombre"
                isSearchable
                styles={StylesReactSelect}
            />

            <Modal show={showCancelModalCreateItem} onHide={onCloseCreateItemModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crea tu artículo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateItem
                        token={token}
                        onCreateComplete={onCloseCreateItemModal}
                        onItemCreated={onCreateItem}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default SearchItemsByname;
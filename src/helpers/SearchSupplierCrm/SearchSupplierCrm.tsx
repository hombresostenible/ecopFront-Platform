/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { getCrmSuppliers } from '../../redux/User/08CrmSupplierSlice/actions';
import CreateSupplier from '../../components/PanelUser/04Accounts/CreateClientAndSupplier/CreateSupplier';
import { StylesReactSelect } from '../StylesComponents/StylesReactSelect';

interface SearchSupplierCrmCrmProps {
    token: string;
    onSupplierSelect: (value: number | null) => void;
}

function SearchSupplierCrm({ token, onSupplierSelect }: SearchSupplierCrmCrmProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const crmSuppliers = useSelector((state: RootState) => state.crmSupplier.crmSupplier);
    
    const [filterText, setFilterText] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);
    const [showCancelModalCreateSupplier, setShowCancelModalCreateSupplier] = useState(false);
    const selectRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(getCrmSuppliers(token));
    }, [ token ]);

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
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ selectRef, selectedOption ]);

    const createSupplierOption = {
        value: 'createSupplier',
        label: '¿No existe tu proveedor? Créalo acá',
    };

    const filteredOptions = Array.isArray(crmSuppliers)
        ? crmSuppliers
              .filter((suppliers) =>
                  suppliers.documentId.toString().includes(filterText) ||
                  (suppliers.name && suppliers.name.toLowerCase().includes(filterText.toLowerCase())) ||
                  (suppliers.lastName && suppliers.lastName.toLowerCase().includes(filterText.toLowerCase())) ||
                  (suppliers.corporateName && suppliers.corporateName.toLowerCase().includes(filterText.toLowerCase()))
              )
              .map((suppliers) => ({
                  value: suppliers.documentId.toString(),
                  label:
                      suppliers.name && suppliers.lastName
                          ? `${suppliers.documentId} - ${suppliers.name} ${suppliers.lastName}`
                          : `${suppliers.documentId} - ${suppliers.corporateName}`,
              }))
        : [];

    filteredOptions.unshift(createSupplierOption);

    const handleInputChange = (inputValue: string) => {
        setFilterText(inputValue);
    };

    const handleSelectChange = (option: { value: string; label: string } | null) => {
        if (option?.value === 'createSupplier') {
            setShowCancelModalCreateSupplier(true);
        } else {
            onSupplierSelect(option?.value ? parseInt(option.value) : null);
            setSelectedOption(option);
        }
    };

    const onCloseCreateSupplierModal = () => {
        setShowCancelModalCreateSupplier(false);
    };

    const onCreateSupplier = (token: string) => {
        dispatch(getCrmSuppliers(token));
    };

    return (
        <div ref={selectRef}>
            <Select
                value={selectedOption}
                inputValue={filterText}
                onInputChange={handleInputChange}
                onChange={handleSelectChange}
                options={filteredOptions}
                placeholder='Busca por nombre o número de NIT'
                isSearchable
                styles={StylesReactSelect}
            />

            <Modal show={showCancelModalCreateSupplier} onHide={() => setShowCancelModalCreateSupplier(false)} backdrop="static" keyboard={false} >
                <Modal.Header closeButton onClick={() => setShowCancelModalCreateSupplier(false)}>
                    <Modal.Title>Crea tu proveedor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateSupplier
                        token={token}
                        onCreateComplete={() => {
                            onCloseCreateSupplierModal();
                        }}
                        onSupplierCreated={onCreateSupplier}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default SearchSupplierCrm;
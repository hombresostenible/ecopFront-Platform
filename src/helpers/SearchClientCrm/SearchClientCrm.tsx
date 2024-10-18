/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { getCrmClients } from '../../redux/User/07CrmClientSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { ICrmClient } from '../../types/User/crmClient.types';
import CreateClient from '../../components/PanelUser/04Accounts/CreateClientAndSupplier/CreateClient';
import { StylesReactSelect } from '../StylesComponents/StylesReactSelect';

interface SearchClientCrmProps {
    token: string;
    onClientSelect?: (value: number | null) => void;    //Id del cliente seleccionado
    onDataClientSelect?: (data: ICrmClient) => void;    // Prop adicional
}

interface OptionType {
    value: string;
    label: string;
    data?: ICrmClient;
}

function SearchClientCrm({ token, onClientSelect, onDataClientSelect }: SearchClientCrmProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const crmClients = useSelector((state: RootState) => state.crmClient.crmClient);

    const [filterText, setFilterText] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const [showCancelModalCreateClient, setShowCancelModalCreateClient] = useState(false);
    const selectRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(getCrmClients(token));
    }, [token]);

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

    const createClientOption: OptionType = {
        value: 'createClient',
        label: '¿No existe tu cliente? Créalo acá',
    };

    const filteredOptions: OptionType[] = Array.isArray(crmClients)
        ? crmClients
              .filter((crmClient) =>
                  crmClient.documentId.toString().includes(filterText) ||
                  (crmClient.name && crmClient.name.toLowerCase().includes(filterText.toLowerCase())) ||
                  (crmClient.lastName && crmClient.lastName.toLowerCase().includes(filterText.toLowerCase())) ||
                  (crmClient.corporateName && crmClient.corporateName.toLowerCase().includes(filterText.toLowerCase()))
              )
              .map((crmClient) => ({
                  value: crmClient.documentId.toString(),
                  label:
                      crmClient.name && crmClient.lastName
                          ? `${crmClient.documentId} - ${crmClient.name} ${crmClient.lastName}`
                          : `${crmClient.documentId} - ${crmClient.corporateName}`,
                  data: crmClient, // Incluimos los datos completos del cliente
              }))
        : [];

    filteredOptions.unshift(createClientOption);

    const handleInputChange = (inputValue: string) => {
        setFilterText(inputValue);
    };

    const handleSelectChange = (option: OptionType | null) => {
        if (option?.value === 'createClient') {
            setShowCancelModalCreateClient(true);
        } else {
            if (onClientSelect) {
                onClientSelect(option?.value ? parseInt(option.value) : null); // Llama la función `onClientSelect` si está definida
            }
            if (onDataClientSelect && option?.data) {
                onDataClientSelect(option.data); // Llama la función `onDataClientSelect` con los datos completos del cliente
            }
            setSelectedOption(option);
        }
    };

    const onCloseCreateClientModal = () => {
        setShowCancelModalCreateClient(false);
    };

    const onCreateClient = (token: string) => {
        dispatch(getCrmClients(token));
    };

    return (
        <div ref={selectRef} >
            <Select
                value={selectedOption}
                inputValue={filterText}
                onInputChange={handleInputChange}
                onChange={handleSelectChange}
                options={filteredOptions}
                placeholder="Busca por nombre o número de cédula"
                isSearchable
                styles={StylesReactSelect}
            />

            <Modal show={showCancelModalCreateClient} onHide={onCloseCreateClientModal}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary-emphasis text-start'>Crea tu cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateClient
                        token={token}
                        onCreateComplete={onCloseCreateClientModal}
                        onClientCreated={onCreateClient}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default SearchClientCrm;
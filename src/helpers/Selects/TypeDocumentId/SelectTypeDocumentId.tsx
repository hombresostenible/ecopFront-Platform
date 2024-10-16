/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import typeDocumentIdSelects from './TypeDocumentId';
import styles from './styles.module.css';

interface SelectTypeDocumentIdProps {
    onSelect: (selectTypeDocumentIdProps: string) => void;
    reset: boolean;
    initialTypeDocumentId?: string;
}

const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        margin: '0 0 30px 0',
        borderRadius: '3px',
        width: '100%',
        outline: state.isFocused ? '1px solid #718bd8' : 'none',
        boxShadow: state.isFocused ? '0 0 0 1px #718bd8' : 'none',
        borderColor: state.isFocused ? '#718bd8' : provided.borderColor,
        '&:hover': {
            borderColor: state.isFocused ? '#718bd8' : provided.borderColor,
        },
    }),
};

function SelectTypeDocumentId({ onSelect, reset, initialTypeDocumentId }: SelectTypeDocumentIdProps) {
    const [typeDocumentId, setTypeDocumentId] = useState<{ value: string; label: string } | null>(null);
    const [selectedTypeDocumentId, setSelectedTypeDocumentId] = useState<{ value: string; label: string } | null>(initialTypeDocumentId ? { value: initialTypeDocumentId, label: initialTypeDocumentId } : null);

    const handlePropChange = (selectedOption: any) => {
        setTypeDocumentId(selectedOption);
        setSelectedTypeDocumentId(selectedOption);
        const selectedValue = selectedOption.value;
        onSelect(selectedValue);
    };

    useEffect(() => {
        if (reset) {
            setSelectedTypeDocumentId(null);
        }
    }, [reset]);

    return (
        <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
            <h6 className={styles.label}>Tipo de documento de identidad</h6>
            <div className={styles.container__Input}>
                <Select
                    styles={customStyles}
                    className={`${styles.input} border-0`}
                    options={typeDocumentIdSelects}
                    value={selectedTypeDocumentId || typeDocumentId}
                    onChange={handlePropChange}
                    isSearchable={true}
                    placeholder='Tipo de documento de identidad'
                />
            </div>
        </div>
    );
}

export default SelectTypeDocumentId;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import ivaSelects from './IVA';
import styles from './styles.module.css';

interface SelectIVAProps {
    onSelect: (ivaProps: string) => void;
    reset: boolean;
    initialIva?: string;
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

function SelectIVA({ onSelect, reset, initialIva }: SelectIVAProps) {
    const [iva, setIVA] = useState<{ value: string; label: string } | null>(null);
    const [selectedIVA, setSelectedIVA] = useState<{ value: string; label: string } | null>(initialIva ? { value: initialIva, label: initialIva } : null);

    const handlePropChange = (selectedOption: any) => {
        setIVA(selectedOption);
        setSelectedIVA(selectedOption);
        const selectedValue = selectedOption.value;
        onSelect(selectedValue);
    };

    useEffect(() => {
        if (reset) {
            setSelectedIVA(null);
        }
    }, [reset]);

    return (
        <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
            <h6 className={styles.label}>IVA</h6>
            <div className={styles.container__Input}>
                <Select
                    styles={customStyles}
                    className={`${styles.input} border-0`}
                    options={ivaSelects}
                    value={selectedIVA || iva}
                    onChange={handlePropChange}
                    isSearchable={true}
                    placeholder='IVA'
                />
            </div>
        </div>
    );
}

export default SelectIVA;
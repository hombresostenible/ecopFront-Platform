/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import unitMeasureSelects from './UnitMeasure';
import styles from './styles.module.css';

interface SelectUnitMeasureProps {
    onSelect: (unitMeasureProps: string) => void;
    reset: boolean;
    initialUnitMeasure?: string;
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

function SelectUnitMeasure({ onSelect, reset, initialUnitMeasure }: SelectUnitMeasureProps) {
    const [unitMeasure, setUnitMeasure] = useState<{ value: string; label: string } | null>(null);
    const [selectedUnitMeasure, setSelectedUnitMeasure] = useState<{ value: string; label: string } | null>(initialUnitMeasure ? { value: initialUnitMeasure, label: initialUnitMeasure } : null);

    const handlePropChange = (selectedOption: any) => {
        setUnitMeasure(selectedOption);
        setSelectedUnitMeasure(selectedOption);
        const selectedValue = selectedOption.value;
        onSelect(selectedValue);
    };

    useEffect(() => {
        if (reset) {
            setSelectedUnitMeasure(null);
        }
    }, [reset]);

    return (
        <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
            <h6 className={styles.label}>Unidad de medida</h6>
            <div className={styles.container__Input}>
                <Select
                    styles={customStyles}
                    className={`${styles.input} border-0`}
                    options={unitMeasureSelects}
                    value={selectedUnitMeasure || unitMeasure}
                    onChange={handlePropChange}
                    isSearchable={true}
                    placeholder='Unidad de medida'
                />
            </div>
        </div>
    );
}

export default SelectUnitMeasure;
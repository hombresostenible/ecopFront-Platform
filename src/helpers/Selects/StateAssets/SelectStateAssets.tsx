/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import stateAssetsSelects from './StateAssets';
import styles from './styles.module.css';

interface SelectStateAssetsProps {
    onSelect: (selectStateAssetsProps: string) => void;
    reset: boolean;
    initialStateAssets?: string;
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

function SelectStateAssets({ onSelect, reset, initialStateAssets }: SelectStateAssetsProps) {
    const [stateAssets, setStateAssets] = useState<{ value: string; label: string } | null>(null);
    const [selectedStateAssets, setSelectedStateAssets] = useState<{ value: string; label: string } | null>(initialStateAssets ? { value: initialStateAssets, label: initialStateAssets } : null);

    const handlePropChange = (selectedOption: any) => {
        setStateAssets(selectedOption);
        setSelectedStateAssets(selectedOption);
        const selectedValue = selectedOption.value;
        onSelect(selectedValue);
    };

    useEffect(() => {
        if (reset) {
            setSelectedStateAssets(null);
        }
    }, [reset]);

    return (
        <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
            <h6 className={styles.label}>Estado del equipo, herramienta o máquina</h6>
            <div className={styles.container__Input}>
                <Select
                    styles={customStyles}
                    className={`${styles.input} border-0`}
                    options={stateAssetsSelects}
                    value={selectedStateAssets || stateAssets}
                    onChange={handlePropChange}
                    isSearchable={true}
                    placeholder='Estado del equipo, herramienta o máquina'
                />
            </div>
        </div>
    );
}

export default SelectStateAssets;
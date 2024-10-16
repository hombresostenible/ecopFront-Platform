/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import packageTypeSelects from './PackageType';
import styles from './styles.module.css';

interface SelectPackageTypeProps {
    onSelect: (packageTypeProps: string) => void;
    reset: boolean;
    initialPackageType?: string;
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

function SelectPackageType({ onSelect, reset, initialPackageType }: SelectPackageTypeProps) {
    const [packageType, setPackageType] = useState<{ value: string; label: string } | null>(null);
    const [selectedPackageType, setSelectedPackageType] = useState<{ value: string; label: string } | null>(initialPackageType ? { value: initialPackageType, label: initialPackageType } : null);

    const handlePropChange = (selectedOption: any) => {
        setPackageType(selectedOption);
        setSelectedPackageType(selectedOption);
        const selectedValue = selectedOption.value;
        onSelect(selectedValue);
    };

    useEffect(() => {
        if (reset) {
            setSelectedPackageType(null);
        }
    }, [reset]);

    return (
        <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
            <h6 className={styles.label}>Empaque principal</h6>
            <div className={styles.container__Input}>
                <Select
                    styles={customStyles}
                    className={`${styles.input} border-0`}
                    options={packageTypeSelects}
                    value={selectedPackageType || packageType}
                    onChange={handlePropChange}
                    isSearchable={true}
                    placeholder='Empaque principal'
                />
            </div>
        </div>
    );
}

export default SelectPackageType;
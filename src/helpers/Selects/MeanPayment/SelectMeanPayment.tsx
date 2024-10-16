/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import meanPaymentSelects from './MeanPayment';
import styles from './styles.module.css';

interface SelectMeanPaymentProps {
    onSelect: (meanPaymentProps: string) => void;
    reset: boolean;
    initialMeanPayment?: string;
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

function SelectMeanPayment({ onSelect, reset, initialMeanPayment }: SelectMeanPaymentProps) {
    const [meanPayment, setMeanPayment] = useState<{ value: string; label: string } | null>(null);
    const [selectedMeanPayment, setSelectedMeanPayment] = useState<{ value: string; label: string } | null>(initialMeanPayment ? { value: initialMeanPayment, label: initialMeanPayment } : null);

    const handlePropChange = (selectedOption: any) => {
        setMeanPayment(selectedOption);
        setSelectedMeanPayment(selectedOption);
        const selectedValue = selectedOption.value;
        onSelect(selectedValue);
    };

    useEffect(() => {
        if (reset) {
            setSelectedMeanPayment(null);
        }
    }, [reset]);

    return (
        <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
            <h6 className={styles.label}>Medio de pago</h6>
            <div className={styles.container__Input}>
                <Select
                    styles={customStyles}
                    className={`${styles.input} border-0`}
                    options={meanPaymentSelects}
                    value={selectedMeanPayment || meanPayment}
                    onChange={handlePropChange}
                    isSearchable={true}
                    placeholder='Medio de pago'
                />
            </div>
        </div>
    );
}

export default SelectMeanPayment;
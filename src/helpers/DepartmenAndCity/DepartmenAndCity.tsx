/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import departments from './Departments';
import citiesByDepartment from './Cities';
import styles from './styles.module.css';

interface DepartmenAndCityProps {
    onSelect: (department: string, city: string, codeDane: string, subregionCodeDane: string) => void;
    reset: boolean;
    initialDepartment?: string;
    initialCity?: string;
}

function DepartmenAndCity({ onSelect, reset, initialDepartment, initialCity }: DepartmenAndCityProps) {
    const [department, setDepartment] = useState<{ value: string; label: string } | null>(null);
    const [city, setCity] = useState<{ value: string; label: string } | null>(null);

    useEffect(() => {
        if (initialDepartment) {
            const departmentOption = departments.find(dep => dep.value === initialDepartment) || null;
            setDepartment(departmentOption);
        }

        if (initialCity && initialDepartment) {
            const cityOptions = citiesByDepartment[initialDepartment as keyof typeof citiesByDepartment] || [];
            const cityOption = cityOptions.find(city => city.value === initialCity) || null;
            setCity(cityOption);
        }
    }, [initialDepartment, initialCity]);

    const handleDepartmentChange = (selectedOption: any) => {
        setDepartment(selectedOption);
        setCity(null);
        const selectedDepartmentValue = selectedOption.value;
        const selectedCityValue = '';
        const selectedCityCodeDane = '';
        const selectedCitysubregionCodeDane = '';
        onSelect(selectedDepartmentValue, selectedCityValue, selectedCityCodeDane, selectedCitysubregionCodeDane);
    };

    const handleCityChange = (selectedOption: any) => {
        setCity(selectedOption);
        const selectedDepartmentValue = department!.value;
        const selectedCityValue = selectedOption.value;
        const selectedCityCodeDane = selectedOption.codeDane;
        const selectedCitysubregionCodeDane = selectedOption.subregionCodeDane;
        onSelect(selectedDepartmentValue, selectedCityValue, selectedCityCodeDane, selectedCitysubregionCodeDane);
    };

    const cityOptions: { value: string; label: string }[] = department ? citiesByDepartment[department.value as keyof typeof citiesByDepartment] || [] : [];

    useEffect(() => {
        if (reset) {
            setDepartment(null);
            setCity(null);
        }
    }, [reset]);

    return (
        <div className={`${styles.container} mb-3 d-flex align-items-center justify-content-center gap-3 w-100`}>
            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Departamento</h6>
                <div className={styles.container__Input}>
                    <Select
                        className={`${styles.input} border-0`}
                        options={departments}
                        value={department}
                        onChange={handleDepartmentChange}
                        isSearchable={true}
                    />
                </div>
            </div>

            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}><span className={`${styles.required__Information} `}>*</span> Ciudad</h6>
                <div className={styles.container__Input}>
                    <Select
                        className={`${styles.input} border-0`}
                        options={cityOptions}
                        value={city}
                        onChange={handleCityChange}
                        isSearchable={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default DepartmenAndCity;
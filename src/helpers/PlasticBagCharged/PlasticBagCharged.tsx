/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface PlasticBagChargedProps {
    onSelectOption: (option: number, quantity: number) => void;
    onPlasticBagComplete: (option: number, quantity: number) => void;
}

function PlasticBagCharged ({ onSelectOption, onPlasticBagComplete }: PlasticBagChargedProps) {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
    const [bagQuantity, setBagQuantity] = useState<number | null>(null);            // Estado para almacenar la cantidad de bolsas

    const options = [
        { size: 'Bolsa pequeña', value: 50 },
        { size: 'Bolsa mediana', value: 100 },
        { size: 'Bolsa grande', value: 150 }
    ];

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowUp' && selectedOptionIndex > 0) {
            setSelectedOptionIndex(selectedOptionIndex - 1);
        } else if (event.key === 'ArrowDown' && selectedOptionIndex < options.length - 1) {
            setSelectedOptionIndex(selectedOptionIndex + 1);
        }
    };

    const handleConfirm = () => {
        const selectedOption = options[selectedOptionIndex];
        if (selectedOption && typeof bagQuantity === 'number') {
            onSelectOption(selectedOption.value, bagQuantity);
            onPlasticBagComplete(selectedOption.value, bagQuantity);
        } else {
            console.error('La cantidad de bolsas no es un número válido');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleConfirm();
        }
    };

    useEffect(() => {
        // Enfoque en el input después de seleccionar una opción
        const inputElement = document.getElementById("bagQuantityInput") as HTMLInputElement;
        if (inputElement) {
            inputElement.focus();
        }
    }, [ selectedOptionIndex ]);


    return (
        <div
            className={styles.container}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <h3>Escoge el tamaño de la bolsa</h3>
            {options.map((option, index) => (
                <div
                    key={index}
                    className={selectedOptionIndex === index ? 'selected' : ''}
                    onClick={() => setSelectedOptionIndex(index)}
                >
                    {option.size} {option.value}
                </div>
            ))}
            <input 
                id="bagQuantityInput"
                type="number"
                onChange={(e) => setBagQuantity(parseInt(e.target.value))}
                onKeyPress={handleKeyPress} // Escuchar evento de teclado para Enter
                min={0}
            />
            <button onClick={handleConfirm}>Confirmar</button>
        </div>
    );
}

export default PlasticBagCharged;
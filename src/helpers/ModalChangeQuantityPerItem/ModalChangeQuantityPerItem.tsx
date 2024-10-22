import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

interface ModalChangeQuantityPerItemProps {
    onSaveQuantity: (newQuantity: number) => void;
    onClose: () => void;
}

function ModalChangeQuantityPerItem({ onSaveQuantity, onClose }: ModalChangeQuantityPerItemProps) {
    const [newQuantity, setNewQuantity] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Cuando el componente se monta, enfoca automáticamente el input
        if (inputRef.current) inputRef.current.focus();
    }, []);

    const handleSave = () => {
        onSaveQuantity(newQuantity);
        onClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <div>
            <p className='text-center'>Escribe la nueva cantidad</p>
            <input
                ref={inputRef} // Asigna la referencia al input
                type="number"
                className={`${styles.input} mb-4 p-2 w-100`}
                onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                placeholder='Escribe la nueva cantidad'
                min={0}
                onKeyDown={handleKeyDown} // Manejador para la tecla Enter
            />
            <div className="mb-2 d-flex align-items-center justify-content-center gap-4">
                <button onClick={handleSave} className={`${styles.button__Submit} border-0 rounded text-decoration-none`}>Guardar</button>
                <button onClick={onClose} className={`${styles.button__Cancel} border-0 rounded text-decoration-none`}>Cancelar</button>
            </div>
        </div>
    );
}

export default ModalChangeQuantityPerItem;
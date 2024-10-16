import styles from './styles.module.css';

interface ColumnSelectorProps {
    onChange: (column: string) => void;
    selectedColumns: string[];
    minSelectedColumns: number;
    availableColumns: string[];
}

function ColumnSelector ({ onChange, selectedColumns, minSelectedColumns, availableColumns }: ColumnSelectorProps) {
    const handleCheckboxChange = (column: string) => {
        const isColumnSelected = selectedColumns.includes(column);
        if (isColumnSelected && selectedColumns.length <= minSelectedColumns) return;
        onChange(column);
    };

    return (
        <div className={`${styles.container__Column_Selector} overflow-auto d-flex flex-column align-items-start justify-content-start`}>
            {availableColumns.map((column) => (
                <div key={column} className={`${styles.columnSelector} pb-2`}>
                    <input
                        type="checkbox"
                        className="m-1"
                        checked={selectedColumns.includes(column)}
                        onChange={() => handleCheckboxChange(column)}
                        disabled={selectedColumns.length <= minSelectedColumns && selectedColumns.includes(column)}
                    />
                    {column}
                </div>
            ))}
        </div>
    );
}

export default ColumnSelector;
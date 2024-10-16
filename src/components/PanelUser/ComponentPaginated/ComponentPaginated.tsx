import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import styles from './styles.module.css';

interface ComponentPaginatedProps {
    totalRegisters: number;
    limit: number;
    onPageChange: (page: number) => void;
    currentPage: number;
}

function ComponentPaginated({ totalRegisters, limit, onPageChange, currentPage }: ComponentPaginatedProps) {
    const totalPages = totalRegisters > 0 && limit > 0 ? Math.ceil(totalRegisters / limit) : 1;

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className={`${styles.container} d-flex align-items-center justify-content-between`}>
            <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`${styles.container__Button__Next_Prev} d-flex align-items-center justify-content-center ${currentPage === 1 ? styles.disabled : ''}`}
            >
                <GrFormPrevious />
            </button>

            <div className={`${styles.container__Pages} d-flex align-items-center justify-content-between overflow-hidden`}>
                {Array.from(Array(Math.max(totalPages, 1)).keys()).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page + 1)}
                        className={`${currentPage === page + 1 ? styles.active : styles.inactive} border-0`}
                    >
                        <div className={`${styles.pages} d-flex align-items-center justify-content-center`}>{page + 1}</div>
                    </button>
                ))}
            </div>

            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`${styles.container__Button__Next_Prev} d-flex align-items-center justify-content-center ${currentPage === totalPages ? styles.disabled : ''}`}
            >
                <GrFormNext />
            </button>
        </div>
    );
}

export default ComponentPaginated;
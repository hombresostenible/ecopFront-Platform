// ELEMENTOS DEL COMPONENTE
import { IService } from '../../../../../types/User/services.types';
import { IBranch } from '../../../../../types/User/branch.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface SeeItemServiceProps {
    service: IService;
    branches: IBranch[] | null;
}

function SeeItemService({ service, branches }: SeeItemServiceProps) {

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Información del servicio</h1>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al servicio</h6>
                {branches && branches.map((branch, index) => (
                    service.branchId === branch.id && (
                        <p className={`${styles.input} p-2 text-start border`} key={index}>{branch.nameBranch}</p>
                    )
                ))}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{service?.barCode ? service.barCode : 'No asignado'}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre del servicio</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{service?.nameItem}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <p className={`${styles.input} p-2 text-start border`}>
                        {service?.sellingPrice !== null && service?.sellingPrice !== undefined
                            ? `$ ${formatNumber(service.sellingPrice)}`
                            : 'Precio no asignado'}
                    </p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Unidades vendidas</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{service?.salesCount}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene descuento?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{service?.isDiscounted}</p>
                </div>
                {service.isDiscounted === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Porcentage de descuento</h6>
                        <p className={`${styles.input} p-2 text-start border`}>{service?.discountPercentage}</p>
                    </div>
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>IVA</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{service?.IVA}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Impuesto al consumo</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{service?.consumptionTax}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de retención en la fuente</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{service?.retentionType}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Porcentaje de Rete Fuente</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{service?.withholdingTax}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Rete IVA</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{service?.withholdingIVA}</p> 
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Rete ICA</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{service?.withholdingICA}</p> 
                </div>
            </div>

            {/* PONER LOS ACTIVOS */}
            {/* PONER LOS PRODUCTOS */}
            {/* PONER LAS MATERIAS PRIMAS */}
        </div>
    );
}

export default SeeItemService;
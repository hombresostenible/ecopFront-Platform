// ELEMENTOS DEL COMPONENTE
import { IMerchandise } from '../../../../../types/User/merchandise.types';
import { IBranch } from '../../../../../types/User/branch.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface SeeItemMerchandiseProps {
    merchandise: IMerchandise;
    branches: IBranch[] | null;
}

function SeeItemMerchandise({ merchandise, branches }: SeeItemMerchandiseProps) {

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Información de la mercancía</h1>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada a la mercancía</h6>
                {branches && branches.map((branch, index) => (
                    merchandise.branchId === branch.id && (
                        <p className={`${styles.input} p-2 text-start border`} key={index}>{branch.nameBranch}</p>
                    )
                ))}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.barCode ? merchandise.barCode : 'No asignado'}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre de la mercancía</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.nameItem}</p>
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Marca de la mercancía</h6>
                <p className={`${styles.input} p-2 text-start border`}>{merchandise?.brandItem ? merchandise.brandItem : 'No asignada'}</p>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Empacado?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.packaged}</p>
                </div>
                {merchandise.packaged === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Tipo de empaque principal</h6>
                        <p className={`${styles.input} p-2 text-start border`}>{merchandise?.primaryPackageType}</p>
                    </div>
                )}                
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene empaques individuales?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.individualPackaging}</p>
                </div>

                {merchandise.individualPackaging === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Tipo de empaque secundario</h6>
                        <p className={`${styles.input} p-2 text-start border`}>{merchandise?.secondaryPackageType}</p>
                    </div>
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad por paquete</h6>
                    <p className={`${styles.input} p-2 text-start border`}>
                        {merchandise?.quantityPerPackage !== null && merchandise?.quantityPerPackage !== undefined
                            ? merchandise.quantityPerPackage
                            : 'Cantidad no asignada'}
                    </p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>¿Retornable?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.returnablePackaging}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Inventario</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.inventory}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Unidad de medida</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.unitMeasure}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Autoincremento?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.inventoryIncrease}</p>
                </div>
                {merchandise.inventoryIncrease === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Periodicidad del Autoincremento</h6>
                        <p className={`${styles.input} p-2 text-start border`}>{merchandise?.periodicityAutomaticIncrease ? merchandise.periodicityAutomaticIncrease : 'No asignado'}</p>
                    </div>
                )}
            </div>

            {merchandise.inventoryIncrease === 'Si' && (
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad del autoincremento</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.automaticInventoryIncrease}</p>
                </div>
            )}

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de compra</h6>
                    <p className={`${styles.input} p-2 text-start border`}>
                        {merchandise?.purchasePriceBeforeTax !== null && merchandise?.purchasePriceBeforeTax !== undefined
                            ? `$ ${formatNumber(merchandise.purchasePriceBeforeTax)}`
                            : 'Precio no asignado'}
                    </p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <p className={`${styles.input} p-2 text-start border`}>
                        {merchandise?.sellingPrice !== null && merchandise?.sellingPrice !== undefined
                            ? `$ ${formatNumber(merchandise.sellingPrice)}`
                            : 'Precio no asignado'}
                    </p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene descuento?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.isDiscounted}</p>
                </div>
                {merchandise.isDiscounted === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Porcentage de descuento</h6>
                        <p className={`${styles.input} p-2 text-start border`}>{merchandise?.discountPercentage}</p>
                    </div>
                )}
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Fecha de expiración</h6>
                <p className={`${styles.input} p-2 text-start border`}>
                    {merchandise?.expirationDate ? new Date(merchandise.expirationDate).toLocaleDateString() : 'Fecha no asignada'}
                </p>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Unidades vendidas</h6>
                <p className={`${styles.input} p-2 text-start border`}>{merchandise?.salesCount}</p>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>IVA</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.IVA}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Impuesto al consumo</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.consumptionTax}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de retención en la fuente</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.retentionType}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Porcentaje de Rete Fuente</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.withholdingTax}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Rete IVA</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.withholdingIVA}</p> 
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Rete ICA</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{merchandise?.withholdingICA}</p> 
                </div>
            </div>
        </div>
    );
}

export default SeeItemMerchandise;
// ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../../../types/UserPanel/03Inventories/products.types';
import { IBranch } from '../../../../../types/UserPanel/02Branch/branch.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface SeeItemProductProps {
    product: IProduct;
    branches: IBranch[] | null;
}

function SeeItemProduct({ product, branches }: SeeItemProductProps) {

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Información del producto</h1>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al producto</h6>
                {branches && branches.map((branch, index) => (
                    product.branchId === branch.id && (
                        <p className={`${styles.input} p-2 text-start border`} key={index}>{branch.nameBranch}</p>
                    )
                ))}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.barCode ? product.barCode : 'No asignado'}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre del producto</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.nameItem}</p>
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Marca del activo</h6>
                <p className={`${styles.input} p-2 text-start border`}>{product?.brandItem ? product.brandItem : 'No asignada'}</p>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Empacado?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.packaged}</p>
                </div>
                {product.packaged === 'Si' && (
                   <div className="w-100">
                    <h6 className={styles.label}>Tipo de empaque principal</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.primaryPackageType}</p>
                </div>
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene empaques individuales?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.individualPackaging}</p>
                </div>
                {product.individualPackaging === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Tipo de empaque secundario</h6>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.secondaryPackageType}</p>
                    </div>
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad por paquete</h6>
                    <p className={`${styles.input} p-2 text-start border`}>
                        {product?.quantityPerPackage !== null && product?.quantityPerPackage !== undefined
                            ? product.quantityPerPackage
                            : 'Precio no asignado'}
                    </p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>¿Retornable?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.returnablePackaging}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Inventario</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.inventory}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Unidad de medida</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.unitMeasure}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Autoincremento?</h6>
                    <div className={styles.containerInput}>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.inventoryIncrease}</p>
                    </div>
                </div>
                {product.inventoryIncrease === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Periodicidad del Autoincremento</h6>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.periodicityAutomaticIncrease ? product.periodicityAutomaticIncrease : 'No asignado'}</p>
                    </div>
                )}
            </div>

            {product.inventoryIncrease === 'Si' && (
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad del autoincremento</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.automaticInventoryIncrease}</p>
                </div>
            )}

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de producción</h6>
                    <p className={`${styles.input} p-2 text-start border`}>
                        {product?.productionPrice !== null && product?.productionPrice !== undefined
                            ? `$ ${formatNumber(product.productionPrice)}`
                            : 'Precio de  producción no calculado'}
                    </p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <p className={`${styles.input} p-2 text-start border`}>
                        {product?.sellingPrice !== null && product?.sellingPrice !== undefined
                            ? `$ ${formatNumber(product.sellingPrice)}`
                            : 'Precio no asignado'}
                    </p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene descuento?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.isDiscounted}</p>
                </div>
                {product.isDiscounted === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Porcentage de descuento</h6>
                        <p className={`${styles.input} p-2 text-start border`}>{product?.discountPercentage}</p>
                    </div>
                )}
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Fecha de expiración</h6>
                <p className={`${styles.input} p-2 text-start border`}>
                    {product?.expirationDate ? new Date(product.expirationDate).toLocaleDateString() : 'Fecha no asignada'}
                </p>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Unidades vendidas</h6>
                <p className={`${styles.input} p-2 text-start border`}>{product?.salesCount}</p>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>IVA</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.IVA}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Impuesto al consumo</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.consumptionTax}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de retención en la fuente</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.retentionType}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Porcentaje de Rete Fuente</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.withholdingTax}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Rete IVA</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.withholdingIVA}</p> 
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Rete ICA</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{product?.withholdingICA}</p> 
                </div>
            </div>

            {/* PONER LOS ACCESORIOS */}
            {/* PONER LOS ACTIVOS */}
            {/* PONER LAS MATERIAS PRIMAS */}

        </div>
    );
}

export default SeeItemProduct;
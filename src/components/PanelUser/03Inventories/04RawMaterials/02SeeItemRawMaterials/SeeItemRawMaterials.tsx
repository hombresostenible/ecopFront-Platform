// ELEMENTOS DEL COMPONENTE
import { IRawMaterial } from '../../../../../types/User/rawMaterial.types';
import { IBranch } from '../../../../../types/User/branch.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface SeeItemRawMaterialsProps {
    rawMaterial: IRawMaterial;
    branches: IBranch[] | null;
}

function SeeItemRawMaterials({ rawMaterial, branches }: SeeItemRawMaterialsProps) {

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Información de la meteria prima</h1>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada a la materia prima</h6>
                {branches && branches.map((branch, index) => (
                    rawMaterial.branchId === branch.id && (
                        <p className={`${styles.input} p-2 text-start border`} key={index}>{branch.nameBranch}</p>
                    )
                ))}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.barCode ? rawMaterial.barCode : 'No asignado'}</p>
                 </div>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre de la materia prima</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.nameItem}</p>
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Marca de la materia prima</h6>
                <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.brandItem ? rawMaterial.brandItem : 'No asignada'}</p>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Empacado?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.packaged}</p>
                </div>
                {rawMaterial.packaged === 'Si' && (
                   <div className="w-100">
                    <h6 className={styles.label}>Tipo de empaque principal</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.primaryPackageType}</p>
                </div>
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene empaques individuales?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.individualPackaging}</p>
                </div>
                {rawMaterial.individualPackaging === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Tipo de empaque secundario</h6>
                        <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.secondaryPackageType}</p>
                    </div>
                )}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad por paquete</h6>
                    <p className={`${styles.input} p-2 text-start border`}>
                        {rawMaterial?.quantityPerPackage !== null && rawMaterial?.quantityPerPackage !== undefined
                            ? rawMaterial.quantityPerPackage
                            : 'Cantidad no asignada'}
                    </p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>¿Retornable?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.returnablePackaging}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Inventario</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.inventory}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Unidad de medida</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.unitMeasure}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Autoincremento?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.inventoryIncrease}</p>
                </div>
                {rawMaterial.inventoryIncrease === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Periodicidad del Autoincremento</h6>
                        <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.periodicityAutomaticIncrease ? rawMaterial.periodicityAutomaticIncrease : 'No asignado'}</p>
                    </div>
                )}
            </div>

            {rawMaterial.inventoryIncrease === 'Si' && (
                <div className="w-100">
                    <h6 className={styles.label}>Cantidad del autoincremento</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.automaticInventoryIncrease}</p>
                </div>
            )}

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de compra antes de impuestos</h6>
                    <p className={`${styles.input} p-2 text-start border`}>
                        {rawMaterial?.purchasePriceBeforeTax !== null && rawMaterial?.purchasePriceBeforeTax !== undefined
                            ? `$ ${formatNumber(rawMaterial.purchasePriceBeforeTax)}`
                            : 'Precio no asignado'}
                    </p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <p className={`${styles.input} p-2 text-start border`}>
                        {rawMaterial?.sellingPrice !== null && rawMaterial?.sellingPrice !== undefined
                            ? `$ ${formatNumber(rawMaterial.sellingPrice)}`
                            : 'Precio no asignado'}
                    </p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Tiene descuento?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.isDiscounted}</p>
                </div>
                {rawMaterial.isDiscounted === 'Si' && (
                    <div className="w-100">
                        <h6 className={styles.label}>Porcentage de descuento</h6>
                        <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.discountPercentage}</p>
                    </div>
                )}
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Fecha de expiración</h6>
                <p className={`${styles.input} p-2 text-start border`}>
                    {rawMaterial?.expirationDate ? new Date(rawMaterial.expirationDate).toLocaleDateString() : 'Fecha no asignada'}
                </p>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Unidades vendidas</h6>
                <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.salesCount}</p>
            </div>


            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>IVA de la mercancía</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.IVA}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Impuesto al consumo</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.consumptionTax}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de retención en la fuente</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.retentionType}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Porcentaje de Rete Fuente</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.withholdingTax}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Rete IVA</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.withholdingIVA}</p> 
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Rete ICA</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{rawMaterial?.withholdingICA}</p> 
                </div>
            </div>
        </div>
    );
}

export default SeeItemRawMaterials;
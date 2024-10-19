// ELEMENTOS DEL COMPONENTE
import { IAssets } from '../../../../../types/UserPanel/03Inventories/assets.types';
import { IBranch } from '../../../../../types/UserPanel/02Branch/branch.types';
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

interface SeeItemAssetProps {
    asset: IAssets;
    branches: IBranch[] | null;
}

function SeeItemAsset({ asset, branches }: SeeItemAssetProps) {

    return (
        <div>
            <h1 className={`${styles.title} text-center`}>Información del equipo, herramienta o máquina</h1>

            <div className="w-100">
                <h6 className={styles.label}>Nombre de la sede asignada al activo</h6>
                {branches && branches.map((branch, index) => (
                    asset.branchId === branch.id && (
                        <p className={`${styles.input} p-2 text-start border`} key={index}>{branch.nameBranch}</p>
                    )
                ))}
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Código de barras</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.barCode ? asset.barCode : 'No asignado'}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Nombre del activo</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.nameItem}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Marca del activo</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.brandItem ? asset.brandItem : 'No asignada'}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Referencia del activo</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.referenceItem ? asset.referenceItem : 'No asignada'}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Estado del activo</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.stateAssets ? asset.stateAssets : 'No asignado'}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Condición del activo</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.conditionAssets ? asset.conditionAssets : 'No asignado'}</p>
                </div>
            </div>

            <div className="w-100">
                <h6 className={styles.label}>Inventario</h6>
                <p className={`${styles.input} p-2 text-start border`}>{asset?.inventory}</p>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de compra</h6>
                    <p className={`${styles.input} p-2 text-start border`}>$ {formatNumber(asset?.purchasePriceBeforeTax)}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Precio de venta</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.sellingPrice ? `$ ${formatNumber(asset?.sellingPrice)} ` : 'No asignado'}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>¿Equipo con descuento?</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.isDiscounted ? asset?.isDiscounted : 'No asignado'}</p> 
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Porcentaje de descuento</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.discountPercentage ? asset?.discountPercentage : 'No asignado'}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>IVA</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.IVA}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Impuesto al consumo</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.consumptionTax}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Tipo de retención en la fuente</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.retentionType}</p>
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Porcentaje de Rete Fuente</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.withholdingTax}</p>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <div className="w-100">
                    <h6 className={styles.label}>Rete IVA</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.withholdingIVA}</p> 
                </div>
                <div className="w-100">
                    <h6 className={styles.label}>Rete ICA</h6>
                    <p className={`${styles.input} p-2 text-start border`}>{asset?.withholdingICA}</p> 
                </div>
            </div>
        </div>
    );
}

export default SeeItemAsset;
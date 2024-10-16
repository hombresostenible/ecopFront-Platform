import { Document, Page, Text } from '@react-pdf/renderer';
import { IAssets } from '../../../../../types/User/assets.types';
import { stylesPDFDownloadIndicator } from '../../../../../helpers/StylesComponents/stylesPDFDownloadIndicator';

interface DownloadInventoryAssetsProps {
    data: IAssets[];
}

function DownloadInventoryAssets({ data }: DownloadInventoryAssetsProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDFDownloadIndicator.container__Component}>
                <Text style={stylesPDFDownloadIndicator.title}>Inventario de activos</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDFDownloadIndicator.table}>
                        Sede: {item.branchId}, Nombre: {item.nameItem}, Marca: {item.brandItem}, Condición: {item.conditionAssets}, Estado: {item.stateAssets}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadInventoryAssets;
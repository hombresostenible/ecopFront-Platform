import { Document, Page, Text } from '@react-pdf/renderer';
import { IRawMaterial } from '../../../../../types/UserPanel/03Inventories/rawMaterial.types';
import { stylesPDFDownloadIndicator } from '../../../../../helpers/StylesComponents/stylesPDFDownloadIndicator';

interface DownloadInventoryAssetsProps {
    data: IRawMaterial[];
}

function DownloadInventoryRawMaterials({ data }: DownloadInventoryAssetsProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDFDownloadIndicator.container__Component}>
                <Text style={stylesPDFDownloadIndicator.title}>Inventario de materias primas</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDFDownloadIndicator.table}>
                        Sede: {item.branchId}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadInventoryRawMaterials;
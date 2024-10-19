import { Document, Page, Text } from '@react-pdf/renderer';
import { IMerchandise } from '../../../../../types/UserPanel/03Inventories/merchandise.types';
import { stylesPDFDownloadIndicator } from '../../../../../helpers/StylesComponents/stylesPDFDownloadIndicator';

interface DownloadInventoryMerchandisesProps {
    data: IMerchandise[];
}

function DownloadInventoryMerchandises({ data }: DownloadInventoryMerchandisesProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDFDownloadIndicator.container__Component}>
                <Text style={stylesPDFDownloadIndicator.title}>Inventario de Mercancías</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDFDownloadIndicator.table}>
                        Sede: {item.branchId}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadInventoryMerchandises;
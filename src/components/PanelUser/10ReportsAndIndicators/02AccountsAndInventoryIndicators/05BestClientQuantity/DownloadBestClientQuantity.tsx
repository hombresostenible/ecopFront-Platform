import { Document, Page, Text } from '@react-pdf/renderer';
import { IBestClientQuantity } from "../../../../../types/User/financialIndicators.types";
import { stylesPDFDownloadIndicator } from '../../../../../helpers/StylesComponents/stylesPDFDownloadIndicator';

interface DownloadBestClientQuantityProps {
    data: IBestClientQuantity[];
}

function DownloadBestClientQuantity({ data }: DownloadBestClientQuantityProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDFDownloadIndicator.container__Component}>
                <Text style={stylesPDFDownloadIndicator.title}>Mejores clientes por cantidad</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDFDownloadIndicator.table}>
                        Sede: {item.branchId}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadBestClientQuantity;
import { Document, Page, Text } from '@react-pdf/renderer';
import { IProduct } from '../../../../../types/UserPanel/03Inventories/products.types';
import { stylesPDFDownloadIndicator } from '../../../../../helpers/StylesComponents/stylesPDFDownloadIndicator';

interface DownloadInventoryProductProps {
    data: IProduct[];
}

function DownloadInventoryProduct({ data }: DownloadInventoryProductProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDFDownloadIndicator.container__Component}>
                <Text style={stylesPDFDownloadIndicator.title}>Inventario de productos</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDFDownloadIndicator.table}>
                        Sede: {item.branchId}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadInventoryProduct;
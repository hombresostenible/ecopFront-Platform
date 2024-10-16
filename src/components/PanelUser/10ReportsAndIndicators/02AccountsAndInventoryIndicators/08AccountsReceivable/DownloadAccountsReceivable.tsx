import { Document, Page, Text } from '@react-pdf/renderer';
import { IAccountsReceivable } from '../../../../../types/User/accountsReceivable.types';
import { stylesPDFDownloadIndicator } from '../../../../../helpers/StylesComponents/stylesPDFDownloadIndicator';

interface DownloadAccountsReceivableProps {
    data: IAccountsReceivable[];
}

function DownloadAccountsReceivable({ data }: DownloadAccountsReceivableProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDFDownloadIndicator.container__Component}>
                <Text style={stylesPDFDownloadIndicator.title}>Cuentas por cobrar</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDFDownloadIndicator.table}>
                        Sede: {item.branchId}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadAccountsReceivable;
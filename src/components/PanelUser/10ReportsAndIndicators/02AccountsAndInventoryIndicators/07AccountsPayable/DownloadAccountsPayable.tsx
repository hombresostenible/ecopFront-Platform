import { Document, Page, Text } from '@react-pdf/renderer';
import { IAccountsPayable } from '../../../../../types/User/accountsPayable.types';
import { stylesPDFDownloadIndicator } from '../../../../../helpers/StylesComponents/stylesPDFDownloadIndicator';

interface DownloadAccountsPayableProps {
    data: IAccountsPayable[];
}

function DownloadAccountsPayable({ data }: DownloadAccountsPayableProps) {
    return (
        <Document>
            <Page size="A4" style={stylesPDFDownloadIndicator.container__Component}>
                <Text style={stylesPDFDownloadIndicator.title}>Cuentas por pagar</Text>
                {data.map((item, index) => (
                    <Text key={index} style={stylesPDFDownloadIndicator.table}>
                        Sede: {item.branchId}
                    </Text>
                ))}
            </Page>
        </Document>
    );
}

export default DownloadAccountsPayable;
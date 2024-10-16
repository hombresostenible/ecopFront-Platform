import { Document, Image, View, Page, Text } from '@react-pdf/renderer';
// ELEMENTOS DEL COMPONENTE
import { IUser } from '../../../../../types/User/user.types';
import { IBestClientValue } from "../../../../../types/User/financialIndicators.types";
import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import { stylesPDFDownloadIndicator } from '../../../../../helpers/StylesComponents/stylesPDFDownloadIndicator';

interface DownloadBestClientValueProps {
    user: IUser | null,
    date: Date;
    data: IBestClientValue[];
    nameBranch: string;
}

function DownloadBestClientValue({ user, date, data, nameBranch }: DownloadBestClientValueProps) {
    const renderItemsSold = () => {

        return (
            <View>
                <Text style={stylesPDFDownloadIndicator.branch}>Sede: {nameBranch === 'Sede no encontrada' ? 'Todas' : nameBranch}</Text>
                <View style={stylesPDFDownloadIndicator.table}>
                    <View style={stylesPDFDownloadIndicator.tableHeader}>
                        {/* <Text style={stylesPDFDownloadIndicator.tableTitleCell}>Fecha</Text>
                        <Text style={stylesPDFDownloadIndicator.tableTitleCell}>Sede</Text> */}
                        <Text style={stylesPDFDownloadIndicator.tableTitleCell}>Cliente</Text>
                        {/* <Text style={stylesPDFDownloadIndicator.tableTitleCell}>Vendedor</Text>
                        <Text style={stylesPDFDownloadIndicator.tableTitleCell}>Registrador</Text> */}
                        <Text style={stylesPDFDownloadIndicator.tableTitleCell}>Contado/crédito</Text>
                        <Text style={stylesPDFDownloadIndicator.tableTitleCell}>Medio de Pago</Text>
                        <Text style={stylesPDFDownloadIndicator.tableTitleCell}>Valor Total</Text>
                    </View>
                    {data.map((sale, index) => (
                        <View key={index} style={stylesPDFDownloadIndicator.tableRow}>
                            {/* <Text style={stylesPDFDownloadIndicator.tableCell}>{formatDate(sale.transactionDate)}</Text>
                            <Text style={stylesPDFDownloadIndicator.tableCell}>{sale.nameBranch}</Text> */}
                            <Text style={stylesPDFDownloadIndicator.tableCell}>{sale.transactionCounterpartId || 'N/A'}</Text>
                            {/* <Text style={stylesPDFDownloadIndicator.tableCell}>{sale.seller || 'N/A'}</Text>
                            <Text style={stylesPDFDownloadIndicator.tableCell}>{sale.userRegister || 'N/A'}</Text> */}
                            {/* <Text style={stylesPDFDownloadIndicator.tableCell}>{sale.creditCash || 'N/A'}</Text>
                            <Text style={stylesPDFDownloadIndicator.tableCell}>{sale.meanPayment || 'N/A'}</Text> */}
                            <Text style={stylesPDFDownloadIndicator.tableCellTotal}>$ {formatNumber(sale.totalValue)}</Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <Document>
            <Page size="A4" orientation="landscape" style={stylesPDFDownloadIndicator.container__Component}>
                <View style={stylesPDFDownloadIndicator.top}>
                    <View>
                        <Text style={stylesPDFDownloadIndicator.title}>VENTAS DEL PERIODO</Text>
                        <Text style={stylesPDFDownloadIndicator.generate__Date}>Reporte al día: {date.toDateString()}</Text>
                    </View>
                    <View style={stylesPDFDownloadIndicator.container__Generate__By}>
                        <Text style={stylesPDFDownloadIndicator.generate__By}>Generado por Ecopcion</Text>
                    </View>
                </View>

                <View style={stylesPDFDownloadIndicator.container__Body}>
                    <View style={stylesPDFDownloadIndicator.container__Head}>
                        <View style={stylesPDFDownloadIndicator.container__Data_User}>
                            <View style={stylesPDFDownloadIndicator.container__User_Logo}>
                                <Image src={user?.logo} style={stylesPDFDownloadIndicator.logo} />
                            </View>
                            <View style={stylesPDFDownloadIndicator.container__User_Name}>
                                <Text style={stylesPDFDownloadIndicator.name}>
                                    Empresario: {user?.name && user?.lastName ? `${user.name} ${user.lastName}` : user?.corporateName || 'Nombre no disponible'}
                                </Text>
                            </View>
                        </View>
                        <View style={stylesPDFDownloadIndicator.container__User_Info}>
                            <View style={stylesPDFDownloadIndicator.container__User_Contact}>
                                <Text>Correo: <Text>{user?.email}</Text></Text>
                                <Text>Teléfono: <Text>{user?.phone}</Text></Text>
                                <Text>Dirección: <Text>{user?.address}</Text></Text>
                            </View>
                            <View style={stylesPDFDownloadIndicator.user__Report}>
                                <Text>Reporte generado por: {user?.name && user?.lastName ? `${user.name} ${user.lastName}` : user?.corporateName || 'Nombre no disponible'}</Text>
                            </View>
                        </View>
                    </View>

                    {renderItemsSold()}
                </View>
                <View style={stylesPDFDownloadIndicator.back}></View>
            </Page>
        </Document>
    );
}

export default DownloadBestClientValue;
import { StyleSheet } from '@react-pdf/renderer';

export const stylesPDFDownloadIndicator = StyleSheet.create({
    container__Component: {
        width: '100%',
    },
    top: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#212529',
        padding: '10px',
    },
    title: {
        fontWeight: 'bold',
        color: '#f8f9fa',
        letterSpacing: '1px',
    },
    container__Generate__By: {
        padding: '0',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '3px',
    },
    generate__By: {
        color: '#f8f9fa',
        fontSize: '10px',
    },
    generate__Date: {
        color: '#f8f9fa',
        fontSize: '10px',
    },
    container__Body: {
        padding: '20px',
    },
    container__Head: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 0 20px 0',
        padding: '0 0 5px 0',
    },
    container__Data_User: {
        height: '97px',
        width: '50%',
    },
    container__User_Logo: {
        height: '80px',
        width: '250px',
    },
    logo: {
        maxHeight: '75px',
        maxWidth: '230px',
    },
    container__User_Name: {
        fontWeight: 'bold',
        opacity: 0.75,
        fontSize: '16px',
        letterSpacing: '1px',
    },
    name: {
        fontSize: '14px',
        margin: '0',
    },
    container__User_Info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '97px',
        width: '50%',
        justifyContent: 'space-between',
    },
    container__User_Contact: {
        fontSize: '14px',
        opacity: 0.75,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    user__Report: {
        width: '100%',
        fontSize: '12px',
        opacity: 0.75,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    // TABLA
    branch: {
        fontSize: '14px',
        opacity: 0.75,
        padding: '0 0 10px 0',
    },
    table: {
        border: '1px solid #ced4da',
        opacity: 0.75,
        width: '100%',
    },
    tableHeader: {
        border: '1px solid #ced4da',
        display: 'flex',
        flexDirection: 'row',
    },
    tableRow: {
        borderBottom: '1px solid #ced4da',
        display: 'flex',
        flexDirection: 'row',
    },
    tableTitleCell: {
        border: '1px solid #ced4da',
        height: '40px',
        flex: 1,
        fontSize: 12,
        padding: '10px 5px 10px 5px',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tableCell: {
        border: '1px solid #ced4da',
        fontSize: 12,
        flex: 1,
        padding: 5,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableCellTotal: {
        border: '1px solid #ced4da',
        fontSize: 12,
        flex: 1,
        padding: 5,
        textAlign: 'right',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 10,
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    back: {
        background: '#212529',
        height: '10px',
        width: '100%',
    },
});
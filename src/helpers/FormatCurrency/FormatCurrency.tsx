export const formatCurrency = (value: string) => {
    if (!value) return '';
    const numberValue = parseFloat(value.replace(/[^\d]/g, ''));
    return `$ ${new Intl.NumberFormat('es-ES').format(numberValue)}`;
};
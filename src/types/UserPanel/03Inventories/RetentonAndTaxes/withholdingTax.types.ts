export interface IWithholdingTax {
    retentionType?: 'No tiene' | 'Retefuente' | 'Rete IVA' | 'Rete ICA';
    retention?: 'retentionFeesConsulting' | 'retentionServices' | 'retentionPurchases' | 'retentionOthers' | 'retentionForeignPaymentsDividends';
    retentionPercentageFeesConsulting?: 'No aplica' | 2 | 4 | 6 | 10 | 11;
    retentionPercentageServices?: 'No aplica' | 1 | 2 | 3.5 | 4 | 6;
    retentionPercentagePurchases?: 'No aplica' | 0.1 | 0.5 | 1 | 1.5 | 2.5 | 3 | 3.5;
    retentionPercentageOthers?: 'No aplica' | 2 | 2.5 | 3 | 4 | 7 | 10 | 20;
    retentionPercentageForeignPaymentsDividends?: 'No aplica' | 0 | 1 | 2 | 5 | 7 | 8 | 10 | 15 | 20 | 33 | 35 | '35 + Num. 51';
    retentionPercentageIVA?: 'No aplica' | 15 | 100;
    retentionPercentageICA?: 'No aplica' | 2 | 3.4 | 4.14 | 5 | 6.9 | 8 | 9.66 | 11.04 | 13.8;
}
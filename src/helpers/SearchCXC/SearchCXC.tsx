/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import Select from 'react-select';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { getAccountsReceivableByBranch } from '../../redux/User/indicator/finantialIndicators/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsReceivable } from "../../types/User/accountsReceivable.types";

interface SearchCXCProps {
    token: string;
    selectedBranch: string;
    onCXCSelect: (selectedOption: IAccountsReceivable) => void;
}

function SearchCXC({ token, selectedBranch, onCXCSelect }: SearchCXCProps) {
    const dispatch: AppDispatch = useDispatch();
    const accountsReceivable = useSelector((state: RootState) => state.finantialIndicators.accountsReceivable);

    const [filteredAccounts, setFilteredAccounts] = useState<Array<any>>([]);

    useEffect(() => {
        dispatch(getAccountsReceivableByBranch(selectedBranch, token));
    }, [ token ]);

    useEffect(() => {
        if (Array.isArray(accountsReceivable)) {
            const filtered = accountsReceivable.filter(account =>
                account.stateAccount === "Activo"
            );
            setFilteredAccounts(filtered);
        }
    }, [ accountsReceivable ]);

    const handleSelectChange = (selectedOption: any) => {
        const data = selectedOption.value;
        onCXCSelect(data);
    };

    const options = filteredAccounts.map(account => ({
        label: `${account.transactionCounterpartId} - ${account.creditDescription}`,
        value: account,
    }));

    return (
        <div>
            <Select
                options={options}
                placeholder='Digita la cédula, el nombre del deudor o el nombre de la deuda'
                onChange={handleSelectChange}
                isSearchable
            />
        </div>
    );
}

export default SearchCXC;
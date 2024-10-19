/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import Select from 'react-select';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { getAccountsPayableByBranch } from '../../redux/User/10ReportsAndIndicators/finantialIndicators/actions';
// ELEMENTOS DEL COMPONENTE
import { IAccountsPayable } from "../../types/UserPanel/10ReportsAndIndicators/finantialIndicators/accountsPayable.types";

interface SearchCXPProps {
    token: string;
    selectedBranch: string | undefined;
    onCXPSelect: (selectedOption: IAccountsPayable) => void;
}

function SearchCXP({ token, selectedBranch, onCXPSelect }: SearchCXPProps) {
    const dispatch: AppDispatch = useDispatch();
    const accountsPayable = useSelector((state: RootState) => state.finantialIndicators.accountsPayable);

    const [ filteredAccounts, setFilteredAccounts ] = useState<Array<any>>([]);

    useEffect(() => {
        if (selectedBranch) dispatch(getAccountsPayableByBranch(selectedBranch, token));
    }, [ token ]);

    useEffect(() => {
        if (Array.isArray(accountsPayable)) {
            const filtered = accountsPayable.filter(account =>
                account.stateAccount === "Activo"
            );
            setFilteredAccounts(filtered);
        }
    }, [ accountsPayable ]);

    const handleSelectChange = (selectedOption: any) => {
        const data = selectedOption.value;
        onCXPSelect(data);
    };

    const options = filteredAccounts.map(account => ({
        label: `${account.transactionCounterpartId} - ${account.creditDescription}`,
        value: account,
    }));

    return (
        <div>
            <Select
                options={options}
                placeholder='Digita la cédula o el nombre de la deuda'
                onChange={handleSelectChange}
                isSearchable
            />
        </div>
    );
}

export default SearchCXP;
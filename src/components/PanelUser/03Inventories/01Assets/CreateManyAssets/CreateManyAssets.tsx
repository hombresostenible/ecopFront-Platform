/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getProfileUser } from '../../../../../redux/User/userSlice/actions';
import { postManyAssets, getAssets } from '../../../../../redux/User/03Inventories/01InventoryAssetsSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../../types/User/branch.types';
import { IAssets } from "../../../../../types/User/assets.types";
import styles from './styles.module.css';

interface CreateManyMerchandisesProps {
    branches: IBranch | IBranch[] | null;
    token: string;
    onCreateComplete: () => void;
}

function CreateManyAssets({ branches, token, onCreateComplete }: CreateManyMerchandisesProps) {
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);

    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    const [loading, setLoading] = useState(false);
    const [excelData, setExcelData] = useState<Array<{ [key: string]: any }> | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (token) {
            dispatch(getProfileUser(token));
        }
    }, [token]);

    const handleBranchChange = (e: any) => {
        const selectedId = e.target.value;
        setSelectedBranch(selectedId);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = event.target?.result as string;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
    
                const parsedData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
                const spanishColumnNames: { [key: string]: string } = {
                    "Código de barras": "barCode",
                    "Nombre del artículo": "nameItem",
                    "Marca": "brandItem",
                    "Referencia": "referenceItem",
                    "Inventario": "inventory",
                    "Precio de compra antes de impuestos": "purchasePriceBeforeTax",
                    "IVA": "IVA",
                    "Impuesto al consumo": "consumptionTax",
                    "Tipo de retención en la fuente": "retentionType",
                    "Porcentaje de Rete Fuente": "withholdingTax",
                    "Rete IVA": "withholdingIVA",
                    "Rete ICA": "withholdingICA",
                    // Agregar más nombres de columnas según sea necesario
                };
    
                // Tomar las filas 4 y 6 como encabezados y datos respectivamente
                const originalHeaders: string[] = parsedData[1] || [];
                const originalData: any[][] = parsedData[3] ? parsedData.slice(3) : [];
    
                // Traducir los encabezados originales al inglés
                const currentHeaders: string[] = originalHeaders.map((header: string) => {
                    return spanishColumnNames[header] || header;
                });
    
                if (currentHeaders.length > 0) {
                    const formattedData = originalData.map((row) =>
                        currentHeaders.slice(1).reduce((obj: { [key: string]: any }, header, index) => {
                            obj[header] = row[index + 1];
                            return obj;
                        }, {})
                    );
                    setHeaders(currentHeaders.slice(1));
                    setExcelData(formattedData);
                } else console.error('No se encontraron encabezados válidos en el archivo Excel.');
            };
            reader.readAsBinaryString(file);
        }
    };

    // Función para traducir los nombres de las columnas de inglés a español
    const englishToSpanishColumnNames: { [key: string]: string } = {
        "barCode": "Código de barras",
        "nameItem": "Nombre del artículo",
        "brandItem": "Marca",
        "referenceItem": "Referencia",
        "inventory": "Inventario",
        "purchasePriceBeforeTax": "Precio de compra antes de impuestos",
        "IVA": "IVA",
        "consumptionTax": "Impuesto al consumo",
        "retentionType": "Tipo de retención en la fuente",
        "withholdingTax": "Porcentaje de Rete Fuente",
        "withholdingIVA": "Rete IVA",
        "withholdingICA": "Rete ICA",
        // Agregar más nombres de columnas según sea necesario
    };

    const onSubmit = async () => {
        setLoading(true);
        try {
            if (!excelData || !selectedBranch) return;
            const branchId = selectedBranch;
            const nonEmptyRows = excelData.filter(row => Object.values(row).some(value => !!value));
            const formData = nonEmptyRows.map(asset => ({
                ...asset,
                branchId: branchId,
                userId: user?.id,
            }));
            await dispatch(postManyAssets(formData as unknown as IAssets[], token));
            setExcelData(null);
            setMessage('Se guardó masivamente tus equipos, herramientas o máquinas con exito');
            setTimeout(() => {
                setShouldNavigate(true);
                dispatch(getAssets(token));
                onCreateComplete();
            }, 1500);            
        } catch (error) {
            throw new Error('Error en el envío del formulario');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/inventories/consult-assets');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div className='position-relative'>
            <div className='mb-4 p-2 d-flex flex-column border rounded'>
                <div className={`${styles.container__Download_File} mb-3 p-2 d-flex align-items-center justify-content-between border rounded`}>
                    <h6 className='m-0 text-center'>Primero descarga el archivo para que lo diligencies</h6>
                    <a className={`${styles.download__File} text-center text-decoration-none`} href="/DownloadExcels/Equipos_Herramientas_y_Maquinaria.xlsx" download="Equipos_Herramientas_y_Maquinaria.xlsx">Descargar Excel</a>
                </div>
                <p className="m-0">Recuerda descargar el archivo Excel adjunto para que puedas diligenciarlo con la información de cada uno de tus mercancías y facilitar la creación masiva en la sede seleccionada.</p>
            </div>

            <div className="mb-3 p-2 d-flex align-items-center justify-content-center border rounded">
                <p className={`${styles.label} mb-0 p-2`}>Selecciona una Sede</p>
                <select
                    className={`${styles.input} p-2 border`}
                    onChange={handleBranchChange}
                >
                    <option value=''>Selecciona una Sede</option>
                    {Array.isArray(branches) && branches.map((branch: IBranch, index: number) => (
                        <option key={index} value={branch.id}>
                            {branch.nameBranch}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4 d-flex">
                <input type="file" accept=".xlsx" onChange={handleFileUpload} className="m-auto p-1 border rounded" />
            </div>

            <div className="mt-4 mb-4 table-responsive">
                {excelData && (
                    <table className="m-0 table table-bordered table-striped">
                        <thead>
                            <tr>
                                {headers.map((header) => (
                                    <th key={header} className="align-middle text-center">
                                        {englishToSpanishColumnNames[header] || header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {excelData.map((row, index) => (
                                // Verificar si hay datos en la fila antes de renderizarla
                                Object.values(row).some(value => !!value) && (
                                    <tr key={index}>
                                        {headers.map((header, columnIndex) => (
                                            <td key={columnIndex} className="align-middle text-center">{row[header]}</td>
                                        ))}
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="mb-5 d-flex align-items-center justify-content-center">
                {loading ? 
                    <div>
                        <button className={`${styles.button__Submit} mx-auto border-0 rounded`} type='submit' >
                            <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Guardando...
                        </button>
                    </div> 
                :
                    <button className={`${styles.button__Submit} m-auto border-0 rounded`} type='submit' onClick={onSubmit}>Enviar</button>
                }
            </div>

            <div className={`${styles.success} position-absolute`}>
                {message && (
                    <p className={`${styles.alert__Success} m-0 text-center alert-success`}>{message}</p>
                )}
            </div> 
        </div>
    );
}

export default CreateManyAssets;
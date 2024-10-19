/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getProfileUser } from '../../../../../redux/User/userSlice/actions';
import { postManyServices, getServices } from '../../../../../redux/User/03Inventories/05InventoryServicesSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../../types/UserPanel/02Branch/branch.types';
import { IService } from '../../../../../types/UserPanel/03Inventories/services.types';
import styles from './styles.module.css';

interface CreateManyRawMateralsProps {
    branches: IBranch | IBranch[] | null;
    token: string;
    onCreateComplete: () => void;
}

function CreateManyServices({ branches, token, onCreateComplete }: CreateManyRawMateralsProps) {
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);

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

    //Selección de la sede
    const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBranch(e.target.value);
    };

    // Renderiza el Excel adjuntado en la tabla del modal
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
    
                // Obtener los nombres de las columnas en español desde el archivo de Excel
                const spanishColumnNames: { [key: string]: string } = {
                    "Código de barras": "barCode",
                    "Nombre del servicio": "nameItem",
                    "Precio unitario de venta": "sellingPrice",
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
                    // Establecer los encabezados y los datos traducidos
                    setHeaders(currentHeaders.slice(1));
                    setExcelData(formattedData);
                } else {
                    console.error('No se encontraron encabezados válidos en el archivo Excel.');
                }
            };
            reader.readAsBinaryString(file);
        }
    };

    // Función para traducir los nombres de las columnas de inglés a español
    const englishToSpanishColumnNames: { [key: string]: string } = {
        "barCode": "Código de barras",
        "nameItem": "Nombre del servicio",
        "sellingPrice": "Precio unitario de venta",
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
            const formData = nonEmptyRows.map(service => ({
                ...service,
                branchId: branchId,
                userId: user?.id,
            }));
            dispatch(postManyServices(formData as unknown as IService[], token));
            setExcelData(null);
            setMessage('Se guardaron exitosamente los registros');
            setTimeout(() => {
                setShouldNavigate(true);
                dispatch(getServices(token));
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
            navigate('/inventories/consult-services');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div className='position-relative'>
            <div className='mb-4 p-2 d-flex flex-column border rounded'>
                <div className={`${styles.container__Download_File} mb-3 p-2 d-flex align-items-center justify-content-between border rounded`}>
                    <h6 className='m-0 text-center'>Primero descarga el archivo para que lo diligencies</h6>
                    <a className={`${styles.download__File} text-center text-decoration-none`} href="/DownloadExcels/Servicios.xlsx" download="Servicios.xlsx">Descargar Excel</a>
                </div>
                <p className="m-0">Recuerda descargar el archivo Excel adjunto para que puedas diligenciarlo con la información de cada uno de tus materias primas y facilitar la creación masiva en la sede seleccionada.</p>
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

export default CreateManyServices;
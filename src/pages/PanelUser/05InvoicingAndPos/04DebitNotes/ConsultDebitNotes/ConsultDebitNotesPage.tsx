/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
// import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../../redux/store';
import { getBranches } from '../../../../../redux/User/02BranchSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IBranch } from '../../../../../types/UserPanel/02Branch/branch.types.ts';
// import { ICreditNote } from '../../../../../../types/User/creditNote.types';
import NavBar from '../../../../../components/PanelUser/00NavBar/NavBar.tsx';
import SideBar from '../../../../../components/PanelUser/SideBar/SideBar.tsx';
import Footer from '../../../../../components/PanelUser/Footer/Footer';
// import { formatNumber } from '../../../../../helpers/FormatNumber/FormatNumber';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import styles from './styles.module.css';

function ConsultDebitNotesPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    ///ESTADOS DE REDUX
    const branches = useSelector((state: RootState) => state.branch.branch);

    const [selectedBranch, setSelectedBranch] = useState<string | undefined>('');

    useEffect(() => {
        if (token) {
            dispatch(getBranches(token));
        }
    }, [token]);

    const [idCreditNote, setIdCreditNote] = useState('');
    console.log('idCreditNote: ', idCreditNote)
    // const [selectedItem, setSelectedItem] = useState<ICreditNote>();
    // const [showSeeItem, setShowSeeItem] = useState(false);

    // const handleSeeItem = useCallback((creditNote: ICreditNote) => {
    //     setSelectedItem(creditNote);
    //     setShowSeeItem(true);
    // }, []);

    const branchesArray = Array.isArray(branches) ? branches : [];

    return (
        <div className='d-flex flex-column'>
            <NavBar />
            <div className='d-flex'>
                <SideBar />
                <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
                    <div className={`${styles.container__Component} px-5 overflow-hidden overflow-y-auto`}>
                        <h1 className={`${styles.title} mb-4 mt-4`}>Notas Débito</h1>

                        <div className='mb-4 d-flex align-items-center justify-content-between'>
                            <div className="d-flex"></div>
                            <div className={styles.link__Head_Navigate}>
                                <FaPlus className={`${styles.icon__Plus} `}/>
                                <Link to='/debit-notes/create-debit-notes' className={`${styles.link} text-decoration-none`}>Registro de notas débito</Link>
                            </div>
                        </div>

                        <div className={`${styles.container__Filter_Branch} mt-4 mb-4 d-flex align-items-center`}>
                            <h3 className='m-0'>Filtra tus notas débito por sede</h3>
                            <select
                                value={selectedBranch || ''}
                                className="mx-2 p-2 border rounded"
                                onChange={(e) => setSelectedBranch(e.target.value)}
                            >
                                <option value=''>Todas</option>
                                {branchesArray.map((branch: IBranch, index: number) => (
                                    <option key={index} value={branch.id}>
                                        {branch.nameBranch}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={`${styles.container__Table} mt-2 mb-2 mx-auto d-flex flex-column align-items-center justify-content-start`}>
                            <div className={styles.container__Head}>
                                <div className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.branch} d-flex align-items-center justify-content-center text-center`}>Sede</div>
                                    <div className={`${styles.number} d-flex align-items-center justify-content-center text-center`}>Número</div>
                                    <div className={`${styles.client} d-flex align-items-center justify-content-center text-center`}>Cliente</div>
                                    <div className={`${styles.creation} d-flex align-items-center justify-content-center text-center`}>Creación</div>
                                    <div className={`${styles.expiration} d-flex align-items-center justify-content-center text-center`}>Vencimiento</div>
                                    <div className={`${styles.total} d-flex align-items-center justify-content-center text-center`}>Total</div>
                                    <div className={`${styles.received} d-flex align-items-center justify-content-center text-center`}>Cobrado</div>
                                    <div className={`${styles.receivable} d-flex align-items-center justify-content-center text-center`}>Por cobrar</div>
                                    <div className={`${styles.dian__State} d-flex align-items-center justify-content-center text-center`}>Estado Dian</div>
                                    <div className={`${styles.state} d-flex align-items-center justify-content-center text-center`}>Estado</div>
                                    <div className={`${styles.action} d-flex align-items-center justify-content-center text-center`}>Acciones</div>
                                </div>
                            </div>

                            <div className={`${styles.container__Body} d-flex flex-column `}>
                                {/* {Array.isArray(service) && service.length > 0 ? (
                                    service.map((service) => ( */}
                                        <div  className={`${styles.container__Info} d-flex align-items-center justify-content-between`} >
                                            <div className={`${styles.branch} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>
                                                    <span className={`${styles.text__Ellipsis} text-center overflow-hidden`} >Sede</span>
                                                </span>
                                            </div>
                                            <div className={`${styles.number} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>Número</span>
                                            </div>
                                            <div className={`${styles.client} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>Cliente</span>
                                            </div>
                                            <div className={`${styles.creation} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>Creación</span>
                                            </div>
                                            <div className={`${styles.expiration} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>Vencimiento</span>
                                            </div>
                                            <div className={`${styles.total} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>Total</span>
                                            </div>
                                            <div className={`${styles.received} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>Cobrado</span>
                                            </div>
                                            <div className={`${styles.receivable} d-flex align-items-center justify-content-center`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>Por cobrar</span>
                                            </div>
                                            <div className={`${styles.dian__State} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>Estado Dian</span>
                                            </div>
                                            <div className={`${styles.state} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <span className={`${styles.text__Ellipsis} overflow-hidden`}>Estado</span>
                                            </div>
                                            <div className={`${styles.action} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <MdOutlineRemoveRedEye
                                                        className={`${styles.button__Edit} `}
                                                        onClick={() => {
                                                            setIdCreditNote('1');
                                                            // setIdCreditNote(service.id);
                                                            // handleSeeItem('creditNote');
                                                            // handleSeeItem(service);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    {/* ))
                                ) : (
                                    <div className={`${styles.message__Unrelated_Items} d-flex align-items-center justify-content-center`}>
                                        No tienes servicios registrados
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ConsultDebitNotesPage;
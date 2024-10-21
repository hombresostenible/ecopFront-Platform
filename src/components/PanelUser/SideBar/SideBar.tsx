/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
// REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store';
import { logoutUser } from '../../../redux/User/userSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { IoStorefrontSharp } from "react-icons/io5";
import { MdAppRegistration } from "react-icons/md";
import { FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
import { MdReceiptLong } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { TbCoin } from "react-icons/tb";
import { PiChartLineUp } from "react-icons/pi";
import { GoSignOut } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styles from './styles.module.css';

function SideBar() {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();

    const savedMenuVisible = localStorage.getItem('menuVisible') === 'true';
    const [menuVisible, setMenuVisible] = useState<boolean>(savedMenuVisible);

    useEffect(() => {
        const savedMenuVisible = localStorage.getItem('menuVisible') === 'true';
        setMenuVisible(savedMenuVisible);
    }, []);

    const toggleMenuVisible = () => {
        setMenuVisible(prevVisible => {
            const newVisible = !prevVisible;
            localStorage.setItem('menuVisible', newVisible.toString());
            return newVisible;
        });
        setBranchesSubMenuOpen(false);
        setInventorySubMenuOpen(false);
        setAccountsSubMenuOpen(false);
        setInvoicingPosSubMenuOpen(false);
        setElectronicPayrollSubMenuOpen(false);
        setCrmClientsSubMenuOpen(false);
        setCrmSuppliersSubMenuOpen(false);
        setReportsAndIndicatorsSubMenuOpen(false);

        //Se eliminan todos los localStorage para evitar que en la SideBar, queden desplegados algunos submenús
        localStorage.removeItem('branches');
        localStorage.removeItem('inventory');
        localStorage.removeItem('accounts');
        localStorage.removeItem('invoicingPos');
        localStorage.removeItem('electronicPayroll');
        localStorage.removeItem('crmClients');
        localStorage.removeItem('crmSuppliers');
        localStorage.removeItem('reportsAndIndicators');
    };

    // Leer el estado inicial de los submenús desde localStorage
    const getInitialState = (key: string, defaultValue: boolean) => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    };

    const [isBranchesSubMenuOpen, setBranchesSubMenuOpen] = useState(() => getInitialState('branches', false));
    const [isInventorySubMenuOpen, setInventorySubMenuOpen] = useState(() => getInitialState('inventory', false));
    const [isAccountsSubMenuOpen, setAccountsSubMenuOpen] = useState(() => getInitialState('accounts', false));
    const [isInvoicingPosSubMenuOpen, setInvoicingPosSubMenuOpen] = useState(() => getInitialState('invoicingPos', false));
    const [isElectronicPayrollSubMenuOpen, setElectronicPayrollSubMenuOpen] = useState(() => getInitialState('electronicPayroll', false));
    const [isCrmClientsSubMenuOpen, setCrmClientsSubMenuOpen] = useState(() => getInitialState('crmClients', false));
    const [isCrmSuppliersSubMenuOpen, setCrmSuppliersSubMenuOpen] = useState(() => getInitialState('crmSuppliers', false));
    const [isReportsAndIndicatorsSubMenuOpen, setReportsAndIndicatorsSubMenuOpen] = useState(() => getInitialState('reportsAndIndicators', false));

    // SUBMENU DE SEDES
    const toggleBranchesSubMenuOpen = () => {
        const newState = !isBranchesSubMenuOpen;
        setBranchesSubMenuOpen(newState);
        localStorage.setItem('branches', JSON.stringify(newState));
    };

    // SUBMENU DE INVENTARIOS
    const toggleInventorySubMenuOpen = () => {
        const newState = !isInventorySubMenuOpen;
        setInventorySubMenuOpen(newState);
        localStorage.setItem('inventory', JSON.stringify(newState));
    };

    // SUBMENU DE CUENTAS
    const toggleAccountsSubMenuOpen = () => {
        const newState = !isAccountsSubMenuOpen;
        setAccountsSubMenuOpen(newState);
        localStorage.setItem('accounts', JSON.stringify(newState));
    };

    // SUBMENU DE POS Y FACTURACION ELECTRONICA
    const toggleInvoicingPosSubMenuOpen = () => {
        const newState = !isInvoicingPosSubMenuOpen;
        setInvoicingPosSubMenuOpen(newState);
        localStorage.setItem('invoicingPos', JSON.stringify(newState));
    };

    // SUBMENU DE NOMINA ELECTRONICA
    const toggleElectronicPayrollSubMenuOpen = () => {
        const newState = !isElectronicPayrollSubMenuOpen;
        setElectronicPayrollSubMenuOpen(newState);
        localStorage.setItem('electronicPayroll', JSON.stringify(newState));
    };

    // SUBMENU DE CRM CLIENTES
    const toggleCrmClientsSubMenuOpen = () => {
        const newState = !isCrmClientsSubMenuOpen;
        setCrmClientsSubMenuOpen(newState);
        localStorage.setItem('crmClients', JSON.stringify(newState));
    };

    // SUBMENU DE CRM PROVEEDORES
    const toggleCrmSuppliersSubMenuOpen = () => {
        const newState = !isCrmSuppliersSubMenuOpen;
        setCrmSuppliersSubMenuOpen(newState);
        localStorage.setItem('crmSuppliers', JSON.stringify(newState));
    };

    // SUBMENU DE REPORTES E INDICADORES
    const toggleReportsAndIndicatorsSubMenuOpen = () => {
        const newState = !isReportsAndIndicatorsSubMenuOpen;
        setReportsAndIndicatorsSubMenuOpen(newState);
        localStorage.setItem('reportsAndIndicators', JSON.stringify(newState));
    };


    // SUBMENU LATERAL DE SEDES
    const [showBranchClick, setShowBranchClick] = useState<boolean>(false);
    const handleBranchClick = () => {
        if (!menuVisible && !isBranchesSubMenuOpen) {
            setShowBranchClick(prev => !prev);
        }
    };

    // SUBMENU LATERAL DE INVENTARIOS
    const [showInventoriesClick, setShowInventoriesClick] = useState<boolean>(false);
    const handleInventoriesClick = () => {
        if (!menuVisible && !isInventorySubMenuOpen) {
            setShowInventoriesClick(prev => !prev);
        }
    };
    
    // SUBMENU LATERAL DE CUENTAS
    const [showAccountsClick, setShowAccountsClick] = useState<boolean>(false);
    const handleAccountsClick = () => {
        if (!menuVisible && !isAccountsSubMenuOpen) {
            setShowAccountsClick(prev => !prev);
        }
    };
    
    // SUBMENU LATERAL DE POS Y FACTURACION ELECTRONICA
    const [showInvoicingPosClick, setShowInvoicingPosClick] = useState<boolean>(false);
    const handleInvoicingPosClick = () => {
        if (!menuVisible && !isInvoicingPosSubMenuOpen) {
            setShowInvoicingPosClick(prev => !prev);
        }
    };

    // SUBMENU LATERAL DE NOMINA ELECTRONICA
    const [showElectronicPayrollClick, setShowElectronicPayrollClick] = useState<boolean>(false);
    const handleElectronicPayrollClick = () => {
        if (!menuVisible && !isElectronicPayrollSubMenuOpen) {
            setShowElectronicPayrollClick(prev => !prev);
        }
    };
    
    // SUBMENU LATERAL DE CRM CLIENTS
    const [showCrmClientsClick, setShowCrmClientsClick] = useState<boolean>(false);
    const handleCrmClientsClick = () => {
        if (!menuVisible && !isCrmClientsSubMenuOpen) {
            setShowCrmClientsClick(prev => !prev);
        }
    };

    // SUBMENU LATERAL DE CRM SUPPLIERS
    const [showCrmSuppliersClick, setShowCrmSuppliersClick] = useState<boolean>(false);
    const handleCrmSuppliersClick = () => {
        if (!menuVisible && !isCrmSuppliersSubMenuOpen) {
            setShowCrmSuppliersClick(prev => !prev);
        }
    };

    // SUBMENU LATERAL DE INDICATORS
    const [showReportsIndicatorsClick, setShowReportsIndicatorsClick] = useState<boolean>(false);
    const handleReportsIndicatorsClick = () => {
        if (!menuVisible && !isReportsAndIndicatorsSubMenuOpen) {
            setShowReportsIndicatorsClick(prev => !prev)
        }
    };

    // Detectar clics fuera de los menús
    const branchesMenuRef = useRef<HTMLDivElement>(null);
    const inventoriesMenuRef = useRef<HTMLDivElement>(null);
    const accountsMenuRef = useRef<HTMLDivElement>(null);
    const invoicingPosMenuRef = useRef<HTMLDivElement>(null);
    const electronicPayrollMenuRef = useRef<HTMLDivElement>(null);
    const crmClientsMenuRef = useRef<HTMLDivElement>(null);
    const crmSuppliersMenuRef = useRef<HTMLDivElement>(null);
    const reportsAndIndicatorsMenuRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (branchesMenuRef.current && !branchesMenuRef.current.contains(event.target as Node)) setShowBranchClick(false);
            if (inventoriesMenuRef.current && !inventoriesMenuRef.current.contains(event.target as Node)) setShowInventoriesClick(false);
            if (accountsMenuRef.current && !accountsMenuRef.current.contains(event.target as Node)) setShowAccountsClick(false);
            if (invoicingPosMenuRef.current && !invoicingPosMenuRef.current.contains(event.target as Node)) setShowInvoicingPosClick(false);
            if (electronicPayrollMenuRef.current && !electronicPayrollMenuRef.current.contains(event.target as Node)) setShowElectronicPayrollClick(false);
            if (crmClientsMenuRef.current && !crmClientsMenuRef.current.contains(event.target as Node)) setShowCrmClientsClick(false);
            if (crmSuppliersMenuRef.current && !crmSuppliersMenuRef.current.contains(event.target as Node)) setShowCrmSuppliersClick(false);
            if (reportsAndIndicatorsMenuRef.current && !reportsAndIndicatorsMenuRef.current.contains(event.target as Node)) setShowReportsIndicatorsClick(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const signout = async () => {
        try {
            dispatch(logoutUser());
        } catch (error) {
            throw new Error('Error al hacer el cierre de sesión');
        }
    };

    return (
        <div className={`${menuVisible ? styles.container : styles.container__Small} position-relative`}>
            <div className={`${styles.container__Component} p-2`}>
                <div className={`${styles.container__Icon_Hamburger} mb-2 d-flex align-items-center justify-content-end`}>
                    <GiHamburgerMenu className={`${styles.icon__Hamburger} `} onClick={toggleMenuVisible} />
                </div>

                {/* HOME */}
                <div className={`${styles.container__Section} mb-2 d-flex align-items-center justify-content-start text-decoration-none`}>
                    <Link to="/home" className={`${styles.section} px-1 d-flex align-items-center justify-content-center text-decoration-none`}>
                        <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                            <IoHome className={`${styles.icon__Section} ${location.pathname === '/home' ? styles.active__Icon_Section : ''} `} />
                        </div>
                        {menuVisible &&
                            <div className={`${styles.link__Side_Bar} p-1 text-decoration-none`}>Home</div>
                        }
                    </Link>
                </div>

                {/* BRANCH */}
                <div className={`${styles.container__Section} mb-2 d-flex align-items-center position-relative`} ref={branchesMenuRef}>
                    <div className={`${styles.section} px-1 d-flex align-items-center justify-content-center text-decoration-none`}>
                        <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                            <IoStorefrontSharp className={`${showBranchClick ? styles.icon__Compact : styles.icon__Section}
                            ${(location.pathname === '/branches/consult-branches' ||
                            location.pathname === '/branches/create-branches') ?
                            styles.active__Icon_Section : ''} `} onClick={handleBranchClick} />
                        </div>
                        {menuVisible &&
                            <div className={`${styles.link__Side_Bar} p-1 d-flex align-items-center justify-content-between`} onClick={toggleBranchesSubMenuOpen}>
                                Tus sedes {isBranchesSubMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </div>
                        }
                    </div>
                    {showBranchClick && (
                        <div className={`${styles.container__Sub_Menu_Compact} pt-2 pb-2 px-3 d-flex flex-column position-absolute`}>
                            <div className={`${styles.indicator} position-absolute`}></div>
                            <h6 className={`${styles.title__Sub_Menu_Compact} m-0`}>Tus sedes</h6>
                            <Link to='/branches/consult-branches' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Consulta tus sedes</Link>
                            <Link to='/branches/create-branches' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Crea tus sedes</Link>
                        </div>
                    )}
                </div>
                {isBranchesSubMenuOpen && (
                    <div className={styles.sub__Menu}>
                        <Link to='/branches/consult-branches' className={`${styles.link__Sub_Menu} ${location.pathname === '/branches/consult-branches' ? styles.active__Sub_Menu : ''} text-decoration-none`}>
                            Consulta tus sedes
                        </Link>
                        <Link to='/branches/create-branches' className={`${styles.link__Sub_Menu} ${location.pathname === '/branches/create-branches' ? styles.active__Sub_Menu : ''} text-decoration-none`}>
                            Crea tus sedes
                        </Link>
                    </div>
                )}

                {/* INVENTORIES */}
                <div className={`${styles.container__Section} mb-2 d-flex align-items-center position-relative`} ref={inventoriesMenuRef}>
                    <div className={`${styles.section} px-1 d-flex align-items-center justify-content-center text-decoration-none`}>
                        <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                            <MdAppRegistration className={`${showInventoriesClick ? styles.icon__Compact : styles.icon__Section}
                            ${(location.pathname === '/inventories/consult-assets' ||
                                location.pathname === '/inventories/create-assets' ||
                                location.pathname === '/inventories/consult-merchandises' ||
                                location.pathname === '/inventories/create-merchandises' ||
                                location.pathname === '/inventories/consult-products' ||
                                location.pathname === '/inventories/create-products' ||
                                location.pathname === '/inventories/consult-raw-materals' ||
                                location.pathname === '/inventories/create-raw-materals' ||
                                location.pathname === '/inventories/consult-services' ||
                                location.pathname === '/inventories/create-services' ) ? styles.active__Icon_Section : ''} `} onClick={handleInventoriesClick} />
                        </div>
                        {menuVisible &&
                            <div className={`${styles.link__Side_Bar} p-1 d-flex align-items-center justify-content-between`} onClick={toggleInventorySubMenuOpen}>
                                Inventarios {isInventorySubMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </div>
                        }
                    </div>
                    {showInventoriesClick && (
                        <div className={`${styles.container__Sub_Menu_Compact} pt-2 pb-2 px-3 d-flex flex-column position-absolute`}>
                            <div className={`${styles.indicator} position-absolute`}></div>
                            <h6 className={`${styles.title__Sub_Menu_Compact} m-0`}>Inventarios</h6>
                            <Link to='/inventories/consult-assets' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Activos</Link>
                            <Link to='/inventories/consult-merchandises' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Mercancías</Link>
                            <Link to='/inventories/consult-products' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Productos</Link>
                            <Link to='/inventories/consult-raw-materals' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Materia prima</Link>
                            <Link to='/inventories/consult-services' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Servicios</Link>
                        </div>
                    )}
                </div>
                {isInventorySubMenuOpen && (
                    <div className={styles.sub__Menu}>
                        <Link to='/inventories/consult-assets' className={`${styles.link__Sub_Menu} ${(location.pathname === '/inventories/consult-assets' || location.pathname === '/inventories/create-assets') ? styles.active__Sub_Menu : ''} text-decoration-none`}>
                            Activos
                        </Link>
                        <Link to='/inventories/consult-merchandises' className={`${styles.link__Sub_Menu} ${(location.pathname === '/inventories/consult-merchandises' || location.pathname === '/inventories/create-merchandises') ? styles.active__Sub_Menu : ''} text-decoration-none`}>
                            Mercancías
                        </Link>
                        <Link to='/inventories/consult-products' className={`${styles.link__Sub_Menu} ${(location.pathname === '/inventories/consult-products' || location.pathname === '/inventories/create-products') ? styles.active__Sub_Menu : ''} text-decoration-none`}>
                            Productos
                        </Link>
                        <Link to='/inventories/consult-raw-materals' className={`${styles.link__Sub_Menu} ${(location.pathname === '/inventories/consult-raw-materals' || location.pathname === '/inventories/create-raw-materals') ? styles.active__Sub_Menu : ''} text-decoration-none`}>
                            Materia prima
                        </Link>
                        <Link to='/inventories/consult-services' className={`${styles.link__Sub_Menu} ${(location.pathname === '/inventories/consult-services' || location.pathname === '/inventories/create-services') ? styles.active__Sub_Menu : ''} text-decoration-none`}>
                            Servicios
                        </Link>
                    </div>
                )}

                {/* ACCOUNTS */}
                <div className={`${styles.container__Section} ${(location.pathname === '/sig/operations/policies') ? styles.active : ''} mb-2 d-flex align-items-center position-relative`} ref={accountsMenuRef}>
                    <div className={`${styles.section} px-1 d-flex align-items-center justify-content-center text-decoration-none`}>
                        <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                            <FaFileInvoiceDollar className={`${showAccountsClick ? styles.icon__Compact : styles.icon__Section}
                            ${(location.pathname === '/accounts/see-records' ||
                            location.pathname === '/accounts/create-incomes' ||
                            location.pathname === '/accounts/fast-incomes' ||
                            location.pathname === '/accounts/create-expenses' ||
                            location.pathname === '/accounts/consult-pending-approval' ||

                            location.pathname === '/accounts/consult-incomes' ||
                            location.pathname === '/accounts/consult-cxc' ||
                            location.pathname === '/accounts/consult-expences' ||
                            location.pathname === '/accounts/consult-cxp'
                            ) ? styles.active__Icon_Section : ''} `} onClick={handleAccountsClick}/>
                        </div>
                        {menuVisible &&
                            <div className={`${styles.link__Side_Bar} p-1 d-flex align-items-center justify-content-between`} onClick={toggleAccountsSubMenuOpen} >Cuentas {isAccountsSubMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}  </div>
                        }
                    </div>
                    {showAccountsClick && (
                        <div className={`${styles.container__Sub_Menu_Compact} pt-2 pb-2 px-3 d-flex flex-column position-absolute`}>
                            <div className={`${styles.indicator} position-absolute`}></div>
                            <h6 className={`${styles.title__Sub_Menu_Compact} m-0`}>Cuentas</h6>
                            <Link to='/accounts/see-records' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Ver todos los registros</Link>
                            <Link to='/accounts/create-incomes' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Crea ingresos y cuentas por cobrar</Link>
                            <Link to='/accounts/fast-incomes' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Venta rápida</Link>
                            <Link to='/accounts/create-expenses' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Crea gastos y cuentas por pagar</Link>
                            <Link to='/accounts/consult-pending-approval' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Transacciones pendientes de aprobación</Link>
                        </div>
                    )}
                </div>
                {isAccountsSubMenuOpen && (
                    <div className={styles.sub__Menu}>
                        <Link to='/accounts/see-records' className={`${styles.link__Sub_Menu} ${(location.pathname === '/accounts/see-records' || location.pathname === '/accounts/consult-incomes' || location.pathname === '/accounts/consult-cxc' || location.pathname === '/accounts/consult-expences' || location.pathname === '/accounts/consult-cxp') ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Ver todos los registros
                        </Link>
                        <Link to='/accounts/create-incomes' className={`${styles.link__Sub_Menu} ${location.pathname === '/accounts/create-incomes' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Crea ingresos y cuentas por cobrar
                        </Link>
                        <Link to='/accounts/fast-incomes' className={`${styles.link__Sub_Menu} ${location.pathname === '/accounts/fast-incomes' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Venta rápida
                        </Link>
                        <Link to='/accounts/create-expenses' className={`${styles.link__Sub_Menu} ${location.pathname === '/accounts/create-expenses' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Crea gastos y cuentas por pagar
                        </Link>
                        <Link to='/accounts/consult-pending-approval' className={`${styles.link__Sub_Menu} ${location.pathname === '/accounts/consult-pending-approval' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Transacciones pendientes de aprobación
                        </Link>
                    </div>
                )}

                {/* POS Y FACTURACION ELECTRÓNICA */}
                <div className={`${styles.container__Section} ${(location.pathname === '/sig/operations/policies') ? styles.active : ''} mb-2 d-flex align-items-center position-relative`} ref={invoicingPosMenuRef}>
                    <div className={`${styles.section} px-1 d-flex align-items-center justify-content-center text-decoration-none`}>
                        <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                            <MdReceiptLong className={`${showInvoicingPosClick ? styles.icon__Compact : styles.icon__Section} ${(location.pathname === '/invoicing-and-pos/pos' || location.pathname === '/invoicing-and-pos/electronic-invoicing' || location.pathname === '/invoicing-and-pos/see-electronic-invoicing-pos' || location.pathname === '/invoicing-and-pos/recurring-invoices' || location.pathname === '/invoicing-and-pos/quotations') ? styles.active__Icon_Section : ''} `} onClick={handleInvoicingPosClick}/>
                        </div>
                        {menuVisible &&
                            <div className={`${styles.link__Side_Bar} p-1 d-flex align-items-center justify-content-between`} onClick={toggleInvoicingPosSubMenuOpen} >Facturación electrónica {isInvoicingPosSubMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}  </div>
                        }
                    </div>
                    {showInvoicingPosClick && (
                        <div className={`${styles.container__Sub_Menu_Compact} pt-2 pb-2 px-3 d-flex flex-column position-absolute`}>
                            <div className={`${styles.indicator} position-absolute`}></div>
                            <h6 className={`${styles.title__Sub_Menu_Compact} m-0`}>POS y Facturación electrónica</h6>
                            <Link to='/invoicing-and-pos/pos' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>POS</Link>
                            <Link to='/invoicing-and-pos/electronic-invoicing' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Factura electrónica</Link>
                            <Link to='/invoicing-and-pos/see-electronic-invoicing-pos' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Consulta Factura electrónica</Link>
                            <Link to='/invoicing-and-pos/recurring-invoices' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Facturas recurrentes</Link>
                            <Link to='/invoicing-and-pos/quotations' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Cotizaciones</Link>
                            <Link to='/credit-notes/consult-credit-notes' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Consultar notas crédito</Link>
                            <Link to='/credit-notes/create-credit-notes' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Crear notas crédito</Link>
                            <Link to='/credit-notes/consult-debit-notes' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Consultar notas débito</Link>
                            <Link to='/credit-notes/create-debit-notes' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Crear notas débito</Link>
                        </div>
                    )}
                </div>
                {isInvoicingPosSubMenuOpen && (
                    <div className={styles.sub__Menu}>
                        <Link to='/invoicing-and-pos/pos' className={`${styles.link__Sub_Menu} ${location.pathname === '/invoicing-and-pos/pos' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            POS
                        </Link>
                        <Link to='/invoicing-and-pos/electronic-invoicing' className={`${styles.link__Sub_Menu} ${location.pathname === '/invoicing-and-pos/electronic-invoicing' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Factura electrónica
                        </Link>
                        <Link to='/invoicing-and-pos/see-electronic-invoicing-pos' className={`${styles.link__Sub_Menu} ${location.pathname === '/invoicing-and-pos/see-electronic-invoicing-pos' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Consulta Factura electrónica
                        </Link>
                        <Link to='/invoicing-and-pos/recurring-invoices' className={`${styles.link__Sub_Menu} ${location.pathname === '/invoicing-and-pos/recurring-invoices' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Facturas recurrentes
                        </Link>
                        <Link to='/invoicing-and-pos/quotations' className={`${styles.link__Sub_Menu} ${location.pathname === '/invoicing-and-pos/quotations' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Cotizaciones
                        </Link>
                        <Link to='/credit-notes/consult-credit-notes' className={`${styles.link__Sub_Menu} ${location.pathname === '/credit-notes/consult-credit-notes' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Consultar notas crédito
                        </Link>
                        <Link to='/credit-notes/create-credit-notes' className={`${styles.link__Sub_Menu} ${location.pathname === '/credit-notes/consult-credit-notes' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Crear notas crédito
                        </Link>
                        <Link to='/credit-notes/consult-debit-notes' className={`${styles.link__Sub_Menu} ${location.pathname === '/credit-notes/consult-debit-notes' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Consultar notas débito
                        </Link>
                        <Link to='/credit-notes/create-debit-notes' className={`${styles.link__Sub_Menu} ${location.pathname === '/credit-notes/consult-debit-notes' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Crear notas débito
                        </Link>
                    </div>
                )}

                {/* NOMINA ELECTRONICA */}
                <div className={`${styles.container__Section} ${(location.pathname === '/sig/operations/policies') ? styles.active : ''} mb-2 d-flex align-items-center position-relative`} ref={electronicPayrollMenuRef}>
                    <div className={`${styles.section} px-1 d-flex align-items-center justify-content-center text-decoration-none`}>
                        <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                            <BsCashCoin className={`${showElectronicPayrollClick ? styles.icon__Compact : styles.icon__Section} ${(location.pathname === '/electronic-payroll/consult-collaborators' || location.pathname === '/electronic-payroll/create-collaborators') ? styles.active__Icon_Section : ''}`} onClick={handleElectronicPayrollClick}/>
                        </div>
                        {menuVisible &&
                            <div className={`${styles.link__Side_Bar} p-1 d-flex align-items-center justify-content-between`} onClick={toggleElectronicPayrollSubMenuOpen} >Nomina electrónica {isElectronicPayrollSubMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}  </div>
                        }
                    </div>

                    {showElectronicPayrollClick && (
                        <div className={`${styles.container__Sub_Menu_Compact} pt-2 pb-2 px-3 d-flex flex-column position-absolute`}>
                            <div className={`${styles.indicator} position-absolute`}></div>
                            <h6 className={`${styles.title__Sub_Menu_Compact} m-0`}>Nomina electrónica</h6>
                            <Link to='/electronic-payroll/consult-collaborators' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Consulta tus colaboradores</Link>
                            <Link to='/electronic-payroll/create-collaborators' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Crea tus colaboradores</Link>
                            {/* <Link to='/electronic-payroll/consult-payroll-payments' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Consulta tus pagos de nómina</Link>
                            <Link to='/electronic-payroll/create-payroll-payments' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Crea tus pagos de nómina</Link>
                            <Link to='/electronic-payroll/certifications' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Certificados</Link>
                            <Link to='/electronic-payroll/payroll-settlement' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Liquidación de nómina</Link> */}
                        </div>
                    )}
                </div>
                {isElectronicPayrollSubMenuOpen && (
                    <div className={styles.sub__Menu}>
                        <Link to='/electronic-payroll/consult-collaborators' className={`${styles.link__Sub_Menu} ${location.pathname === '/electronic-payroll/consult-collaborators' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Consulta tus colaboradores
                        </Link>
                        <Link to='/electronic-payroll/create-collaborators' className={`${styles.link__Sub_Menu} ${location.pathname === '/electronic-payroll/create-collaborators' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Crea tus colaboradores
                        </Link>
                        {/* <Link to='/electronic-payroll/consult-payroll-payments' className={`${styles.link__Sub_Menu} ${location.pathname === '/electronic-payroll/consult-payroll-payments' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Consulta tus pagos de nómina
                        </Link>
                        <Link to='/electronic-payroll/create-payroll-payments' className={`${styles.link__Sub_Menu} ${location.pathname === '/electronic-payroll/create-payroll-payments' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Crea tus pagos de nómina
                        </Link>
                        <Link to='/electronic-payroll/certifications' className={`${styles.link__Sub_Menu} ${location.pathname === '/electronic-payroll/certifications' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Certificados
                        </Link>
                        <Link to='/electronic-payroll/payroll-settlement' className={`${styles.link__Sub_Menu} ${location.pathname === '/electronic-payroll/payroll-settlement' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Liquidación de nómina
                        </Link> */}
                    </div>
                )}

                {/* CRM CLIENTS */}
                <div className={`${styles.container__Section} ${(location.pathname === '/sig/operations/policies') ? styles.active : ''} mb-2 d-flex align-items-center position-relative`} ref={crmClientsMenuRef}>
                    <div className={`${styles.section} px-1 d-flex align-items-center justify-content-center text-decoration-none`}>
                        <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                            <TbCoin className={`${showCrmClientsClick ? styles.icon__Compact : styles.icon__Section} ${(location.pathname === '/crm-clients/consult-crm-clients' || location.pathname === '/crm-clients/customer-tracking') ? styles.active__Icon_Section : ''}`} onClick={handleCrmClientsClick}/>
                        </div>
                        {menuVisible &&
                            <div className={`${styles.link__Side_Bar} p-1 d-flex align-items-center justify-content-between`} onClick={toggleCrmClientsSubMenuOpen} >CRM Clientes {isCrmClientsSubMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}  </div>
                        }
                    </div>

                    {showCrmClientsClick && (
                        <div className={`${styles.container__Sub_Menu_Compact} pt-2 pb-2 px-3 d-flex flex-column position-absolute`}>
                            <div className={`${styles.indicator} position-absolute`}></div>
                            <h6 className={`${styles.title__Sub_Menu_Compact} m-0`}>CRM Clientes</h6>
                            <Link to='/crm-clients/consult-crm-clients' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Clientes</Link>
                            <Link to='/crm-clients/customer-tracking' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Seguimiento</Link>
                        </div>
                    )}
                </div>
                {isCrmClientsSubMenuOpen && (
                    <div className={styles.sub__Menu}>
                        <Link to='/crm-clients/consult-crm-clients' className={`${styles.link__Sub_Menu} ${(location.pathname === '/crm-clients/consult-crm-clients' || location.pathname === '/crm-clients/create-crm-clients') ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Clientes
                        </Link>
                        <Link to='/crm-clients/customer-tracking' className={`${styles.link__Sub_Menu} ${location.pathname === '/crm-clients/customer-tracking' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Seguimiento
                        </Link>
                    </div>
                )}

                {/* CRM SUPPLIERS */}
                <div className={`${styles.container__Section} ${(location.pathname === '/sig/operations/policies') ? styles.active : ''} mb-2 d-flex align-items-center position-relative`} ref={crmSuppliersMenuRef}>
                    <div className={`${styles.section} px-1 d-flex align-items-center justify-content-center text-decoration-none`}>
                        <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                            <FaUsers className={`${showCrmSuppliersClick ? styles.icon__Compact : styles.icon__Section} ${(location.pathname === '/crm-suppliers/consult-crm-suppliers' || location.pathname === '/crm-suppliers/tracking-your-purchases') ? styles.active__Icon_Section : ''}`} onClick={handleCrmSuppliersClick}/>
                        </div>
                        {menuVisible &&
                            <div className={`${styles.link__Side_Bar} p-1 d-flex align-items-center justify-content-between`} onClick={toggleCrmSuppliersSubMenuOpen} >CRM Proveedores {isCrmSuppliersSubMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}  </div>
                        }
                    </div>

                    {showCrmSuppliersClick && (
                        <div className={`${styles.container__Sub_Menu_Compact} pt-2 pb-2 px-3 d-flex flex-column position-absolute`}>
                            <div className={`${styles.indicator} position-absolute`}></div>
                            <h6 className={`${styles.title__Sub_Menu_Compact} m-0`}>CRM Proveedores</h6>
                            <Link to='/crm-suppliers/consult-crm-suppliers' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Proveedores</Link>
                            <Link to='/crm-suppliers/tracking-your-purchases' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Seguimiento de tus compras</Link>
                        </div>
                    )}
                </div>
                {isCrmSuppliersSubMenuOpen && (
                    <div className={styles.sub__Menu}>
                        <Link to='/crm-suppliers/consult-crm-suppliers' className={`${styles.link__Sub_Menu} ${(location.pathname === '/crm-suppliers/consult-crm-suppliers' || location.pathname === '/crm-suppliers/create-crm-suppliers') ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Proveedores
                        </Link>
                        <Link to='/crm-suppliers/tracking-your-purchases' className={`${styles.link__Sub_Menu} ${location.pathname === '/crm-suppliers/tracking-your-purchases' ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Seguimiento de tus compras
                        </Link>
                    </div>
                )}
 
                {/* CRM REPORT ANS INDICATORS */}
                <div className={`${styles.container__Section} ${(location.pathname === '/sig/operations/policies') ? styles.active : ''} mb-2 d-flex align-items-center position-relative`} ref={reportsAndIndicatorsMenuRef}>
                    <div className={`${styles.section} px-1 d-flex align-items-center justify-content-center text-decoration-none`}>
                        <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                            <PiChartLineUp className={`${showReportsIndicatorsClick ? styles.icon__Compact : styles.icon__Section} ${(location.pathname === '/reports-and-indicators/accounts-and-inventory-indicators' || location.pathname === '/reports-and-indicators/marketing-indicators') ? styles.active__Icon_Section : ''}`} onClick={handleReportsIndicatorsClick}/>
                        </div>
                        {menuVisible &&
                            <div className={`${styles.link__Side_Bar} p-1 d-flex align-items-center justify-content-between`} onClick={toggleReportsAndIndicatorsSubMenuOpen} >Reportes e indicadores {isReportsAndIndicatorsSubMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}  </div>
                        }
                    </div>

                    {showReportsIndicatorsClick && (
                        <div className={`${styles.container__Sub_Menu_Compact} pt-2 pb-2 px-3 d-flex flex-column position-absolute`}>
                            <div className={`${styles.indicator} position-absolute`}></div>
                            <h6 className={`${styles.title__Sub_Menu_Compact} m-0`}>Reportes e indicadores</h6>
                            <Link to='/reports-and-indicators/accounts-and-inventory-indicators' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Indicadores cuentas e inventarios</Link>
                            <Link to='/reports-and-indicators/marketing-indicators' className={`${styles.link__Sub_Menu_Compact} text-decoration-none`}>Indicadores de mercadeo</Link>
                        </div>
                    )}
                </div>
                {isReportsAndIndicatorsSubMenuOpen && (
                    <div className={styles.sub__Menu}>
                        <Link to='/reports-and-indicators/accounts-and-inventory-indicators' className={`${styles.link__Sub_Menu} ${(location.pathname === '/reports-and-indicators/accounts-and-inventory-indicators' || location.pathname === '/reports-and-indicators/accounts-and-inventory-indicators/calculate-financial-items') ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Indicadores cuentas e inventarios
                        </Link>
                        <Link to='/reports-and-indicators/marketing-indicators' className={`${styles.link__Sub_Menu} ${(location.pathname === '/reports-and-indicators/marketing-indicators' || location.pathname === '/reports-and-indicators/marketing-indicators/calculate-marketing-items') ? styles.active__Sub_Menu : ''} text-decoration-none`} >
                            Indicadores de mercadeo
                        </Link>
                    </div>
                )}

                <div className={`${styles.container__Section_Logout} d-flex align-items-center`}>
                    <div className={`${styles.section} px-1 d-flex align-items-center justify-content-center text-decoration-none`}>
                        <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center`}>
                            <GoSignOut className={`${styles.icon__Section_Logout} `} onClick={signout} />
                        </div>
                        {menuVisible &&
                            <div className={`${styles.link__Logout} p-1 text-decoration-none`} onClick={signout}>Cerrar sesión</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
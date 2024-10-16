export interface IUser {
    id: string;
    name?: string;
    lastName?: string;
    corporateName?: string;
    typeDocumentId: 'NIT' | 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte';
    documentId: string;
    verificationDigit?: string;
    commercialName?: string;
    logo?: string;
    typeRole: 'CEO' | 'Moderador de atención al cliente' | 'CTO' | 'Desarrollador de software' | 'Financiador de programas' | 'Superadmin' | 'Administrador' | 'Vendedor' | 'Cajero' | 'Operativo' | 'Contador';
    economicSector?:  'Agricultura' | 'Manufactura' | 'Comercio' | 'Servicios' | 'Construcción' | 'Turismo' | 'Otro';
    codeCiiu: string;
    department: 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
    city: string;
    codeDane?: string;
    subregionCodeDane?: string;
    address: string;
    postalCode?: string;
    phone: string;
    email: string;
    password: string;

    //USER MANAGEMENT
    passwordResetCode?: string;
    passwordResetCodeDate?: Date;
    loginAttempts?: number;
    isBlocked?: boolean;
    unlockCode?: string;
    expiresAt?: Date;
    emailProvider?: 'aol' | 'gmail' | 'hotmail' | 'outlook' |'yahoo' | 'zoho';
    applicationPassword?: string;
    isAceptedConditions: boolean;
    
    //RELACION CON OTRAS TABLAS
    projectFunder?: string;
}
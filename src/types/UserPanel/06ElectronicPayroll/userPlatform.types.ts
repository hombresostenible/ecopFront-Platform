export interface IUserPlatform {
    id: string;
    name: string;
    lastName: string;
    typeDocumentId: 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte';
    documentId: string;
    profilePicture?: string;
    logo?: string;
    typeRole: 'CEO' | 'Moderador de atención al cliente' | 'CTO' | 'Desarrollador de software' | 'Financiador de programas' | 'Superadmin' | 'Administrador' | 'Vendedor' | 'Cajero' | 'Operativo' | 'Contador';
    department: 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
    city: string;
    codeDane?: string;
    subregionCodeDane?: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    isAceptedConditions: boolean;
    
    //USER MANAGEMENT
    passwordResetCode?: string;
    passwordResetCodeDate?: Date;
    loginAttempts?: number;
    unlockCode?: string;
    isBlocked?: boolean;
    expiresAt?: Date;
    applicationPassword?: string;
    
    //RELACION DE TABLAS
    branchId?: string;
    userId?: string;
}
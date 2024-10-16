export interface IBranch {
    id: string;
    nameBranch: string;
    department: 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
    city: string;
    codeDane: string;
    subregionCodeDane: string;
    addressBranch: string;
    contactEmailBranch: string;
    contactPhoneBranch: string;
    nameManagerBranch: string;
    lastNameManagerBranch: string;
    typeDocumentIdManager: 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte';    
    documentIdManager: string;

    //RELACION CON OTRAS TABLAS
    userId?: string;
}
export interface ICreditNote {
    id: string;
    entityUserId?: string;
    name?: string;
    lastName?: string;
    corporateName?: string;
    typeDocumentId: 'NIT' | 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte';
    documentId: number;
    email: string;
    phone: string;
    department?: 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
    city?: string;
    codeDane?: string;
    subregionCodeDane?: string;
    address?: string;

    //RELACION CON OTRAS TABLAS
    customerTrackingId?: string;
    userId?: string;
}
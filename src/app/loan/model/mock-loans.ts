import { Loan } from "./Loan";
import { LoanPage } from "./LoanPage";

export const LOAN_DATA: LoanPage = {
    content: [
        { id: 1, begin: new Date('02/28/2023'), end: new Date('03/28/2023'), game: { id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, client: { id: 1, name: 'Client 1' } },
        { id: 2, begin: new Date('03/02/2023'), end: new Date('04/03/2023'), game: { id: 2, title: 'Juego 2', age: 8, category: { id: 1, name: 'Categoría 1' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, client: { id: 1, name: 'Client 1' } },
        { id: 3, begin: new Date('08/02/2023'), end: new Date('08/17/2023'), game: { id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, client: { id: 3, name: 'Client 3' } },
        { id: 4, begin: new Date('12/02/2022'), end: new Date('01/03/2023'), game: { id: 5, title: 'Juego 5', age: 16, category: { id: 2, name: 'Categoría 2' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, client: {id: 2, name: 'Client 2' } },
        { id: 5, begin: new Date('11/22/2022'), end: new Date('12/22/2022'), game: { id: 5, title: 'Juego 5', age: 16, category: { id: 2, name: 'Categoría 2' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, client: { id: 2, name: 'Client 2' } },
        { id: 6, begin: new Date('02/28/2023'), end: new Date('03/28/2023'), game: { id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, client: { id: 1, name: 'Client 1' } },
        { id: 7, begin: new Date('03/02/2023'), end: new Date('03/03/2023'), game: { id: 8, title: 'Juego 8', age: 14, category: { id: 3, name: 'Categoría 3' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, client: { id: 4, name: 'Client 4' } },
        { id: 8, begin: new Date('05/13/2023'), end: new Date('06/13/2023'), game: { id: 8, title: 'Juego 8', age: 14, category: { id: 3, name: 'Categoría 3' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, client: { id: 3, name: 'Client 3' } },
    ],
    pageable : {
        pageSize: 5,
        pageNumber: 0,
        sort: [
            {property: "id", direction: "ASC"}
        ]
    },
    totalElements: 8
}            
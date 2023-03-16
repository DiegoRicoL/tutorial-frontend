import { Author } from './Author';
import { Pageable } from 'src/app/core/model/page/Pageable';

export class AuthorPage {
    content: Author[];
    pageable: Pageable;
    totalElements: number;
}
import { Category } from "src/app/category/model/Category";
import { Author } from "src/app/author/model/Author";

export class Game {
    id: number;
    title: String;
    age: number;
    category: Category;
    author: Author;

    constructor() {
        console.log("Game constructor");
    }
}

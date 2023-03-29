import { Client } from "src/app/client/model/Client";
import { Game } from "src/app/game/model/Game";

export class Loan {
    id: number;
    begin: Date;
    end: Date;
    game: Game;
    client: Client;
}
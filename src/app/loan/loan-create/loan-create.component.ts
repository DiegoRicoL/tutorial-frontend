import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { Client } from 'src/app/client/model/Client';
import { ClientService } from 'src/app/client/client.service';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import { DialogErrorComponent } from '../../core/dialog-error/dialog-error.component';

@Component({
  selector: 'app-loan-create',
  templateUrl: './loan-create.component.html',
  styleUrls: ['./loan-create.component.scss']
})
export class LoanCreateComponent implements OnInit{

    loan: Loan;
    clients: Client[];
    games: Game[];

    constructor(
        public dialogRef: MatDialogRef<LoanCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private loanService: LoanService,
        private clientService: ClientService,
        private gameService: GameService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        if (this.data.loan != null) {
            this.loan = Object.assign({}, this.data.loan);
        }
        else {
            this.loan = new Loan();
        }

        //Load the clientList for the combobox
        this.clientService.getClients().subscribe(
            clients => {
                this.clients = clients;

                if (this.loan.client != null) {
                    let clientFilter: Client[] = clients.filter(client => client.id == this.data.loan.client.id);
                    if (clientFilter != null) {
                        this.loan.client = clientFilter[0];
                    }
                }
            }
        );

        //Load the gameList for the combobox
        this.gameService.getGames().subscribe(
            games => {
                this.games = games

                if (this.loan.game != null) {
                    let gameFilter: Game[] = games.filter(game => game.id == this.data.loan.game.id);
                    if (gameFilter != null) {
                        this.loan.game = gameFilter[0];
                    }
                }
            }
        );
    }

    //Method to save the loan
    onSave() {
      //Loan cannot end before it begins
      if(this.loan.begin > this.loan.end){
        const dialogRef = this.dialog.open(DialogErrorComponent, {
          data: { message: "Return date cannot be before the loan date" }
        });
      } 
      //Loan cannot be longer than 14 days
      else if((this.loan.end.getTime() - this.loan.begin.getTime()) / (1000 * 3600 * 24) > 14) {
        const dialogRef = this.dialog.open(DialogErrorComponent, {
          data: { message: "Loan cannot be longer than 14 days" }
        });
      } 
      else { //If everything is ok, save the loan
        this.loanService.saveLoan(this.loan).subscribe(
          loan => {
            this.dialogRef.close();
          }, error => {
            //alert(error.error.message);
            const dialogRef = this.dialog.open(DialogErrorComponent, {
              data: { message: error.error.message }
            });

            dialogRef.afterClosed().subscribe(result => {
              this.loan.client = null;
              this.loan.game = null;
              this.loan.begin = null;
              this.loan.end = null;
            });
          }
        );
      }
    }

    //Method to close the dialog
    onClose() {
      this.dialogRef.close();
    }
}

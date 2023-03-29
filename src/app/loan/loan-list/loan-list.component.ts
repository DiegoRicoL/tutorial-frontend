import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { Loan } from '../model/Loan';
import { LoanService } from '../loan.service';
import { LoanCreateComponent } from '../loan-create/loan-create.component';

import { GameService } from 'src/app/game/game.service';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { Game } from 'src/app/game/model/Game';


import { LOAN_DATA } from '../model/mock-loans';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {

  games: Game[];
  clients: Client[];
  filterGame: Game;
  filterClient: Client;
  filterDate: Date;

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  displayedColumns: string[] = ['id', 'game', 'client', 'begin', 'end', 'actions'];
  dataSource: MatTableDataSource<Loan> = new MatTableDataSource<Loan>();

  constructor(
    private gameService: GameService,
    private clientService: ClientService,
    private loanService: LoanService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //Load the gameList for the combobox
    this.gameService.getGames().subscribe(games => {
      this.games = games;
    });

    //Load the clientList for the combobox
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });

    //Load the loanList
    this.loadPage();
  }

  //Method to clean the filters
  onCleanFilter(): void {
    this.filterGame = null;
    this.filterClient = null;
    this.filterDate = null;

    this.onSearch();
  };

  //Method to search the loans by filters
  onSearch(): void {
    let game = this.filterGame != null ? this.filterGame.id : null;
    let client = this.filterClient != null ? this.filterClient.id : null;
    let date = this.filterDate;

    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    }

    //Call the service to get the loans by filters
    this.loanService.getLoans(pageable, client, game, date).subscribe(page => {
      this.dataSource.data = page.content;
      this.pageNumber = page.pageable.pageNumber;
      this.pageSize = page.pageable.pageSize;
      this.totalElements = page.totalElements;
    });

  }

  //Method to load the Page
  loadPage(event?: PageEvent) {
    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: "id",
        direction: "ASC"
      }]
    };

    if (event != null) {
      pageable.pageNumber = event.pageIndex;
      pageable.pageSize = event.pageSize;
    }

    this.loanService.getLoans(pageable).subscribe(page => {
      this.dataSource.data = page.content;
      this.pageNumber = page.pageable.pageNumber;
      this.pageSize = page.pageable.pageSize;
      this.totalElements = page.totalElements;
    });
  }

  //Method to open the dialog to create a new loan
  createLoan() {
    const dialogRef = this.dialog.open(LoanCreateComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  //Method to open a confirmation dialog to delete a loan
  deleteLoan(idLoan: number) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: "Delete Loan",
        message: "Are you sure you want to delete this loan?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loanService.deleteLoan(idLoan).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

import { Client } from '../model/Client';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { ClientService } from '../client.service';



@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit{

  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients =>
      this.dataSource.data = clients
    );
  }

  //Method to open the dialog to add a new client
  addNewClient(): void {
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  //Method to open the dialog to edit a client
  editClient(client: Client): void {
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: { client: client }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  //Method to open a confirmation dialog to delete a client
  deleteClient(client: Client): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar Cliente',
        description: '¿Está seguro que desea eliminar el cliente ' + client.name + '?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(client.id).subscribe(result => {
          this.ngOnInit();
        });
      }
    });
  }

}

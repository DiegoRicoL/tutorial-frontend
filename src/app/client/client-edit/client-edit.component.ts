import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogErrorComponent } from 'src/app/core/dialog-error/dialog-error.component';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  client : Client;

  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    if(this.data.client != null){
      this.client = Object.assign({}, this.data.client);
    } else {
      this.client = new Client();
    }

  }

  //Method to save a client
  onSave() {
    this.clientService.existsClient(this.client.name).subscribe(result => {
      if(result){
        const dialogRef = this.dialog.open(DialogErrorComponent, {
          data: { message: 'Client already exists' }
        });

      } else {
        this.clientService.saveClient(this.client).subscribe(result => {
          this.dialogRef.close();
        });   
         
      }
    });
  

    
  }

  //Method to close the dialog
  onClose() {
    this.dialogRef.close();
  }
}

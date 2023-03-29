import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Loan } from './model/Loan';
import { LoanPage } from './model/LoanPage';
import { LOAN_DATA } from './model/mock-loans';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  //Calls the backend to get the list of loans
  getLoans(pageable: Pageable, clientId?: number, gameId?: number, date?: Date): Observable<LoanPage> {
    return this.http.post<LoanPage>(this.composeFindUrl(clientId, gameId, date), {pageable:pageable} );
    // return of(LOAN_DATA);
  }

  //Calls the backend to save a loan
  saveLoan(loan: Loan): Observable<void> {
    let url = 'http://localhost:8080/loan';
    if (loan.id != null) url += '/'+loan.id;

    return this.http.put<void>(url, loan);
  }

  //Calls the backend to delete a loan
  deleteLoan(idLoan : number): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/loan/'+idLoan);
  }

  //Method to build the url to call the backend
  private composeFindUrl(clientId?: number, gameId?: number, date?: Date) : string {
    let params = '';

    if (clientId != null) {
      params += 'client_id='+clientId;
    }

    if (gameId != null) {
      if (params != '') params += "&";
      params += "game_id="+gameId;
    }

    if (date != null) {
      if (params != '') params += "&";
      params += "date=" + date.toLocaleDateString();
    }

    let url = 'http://localhost:8080/loan'

    if (params == '') return url;
    else return url + '?'+params;
  }
  
}

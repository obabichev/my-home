import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDatepickerInputEvent} from "@angular/material";
import {TransactionTypesService} from '../service/transaction-types.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit {

  transaction: any;
  types: string[] = [];

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private transactionTypesService: TransactionTypesService) {
  }

  ngOnInit() {
    this.getTransaction(this.route.snapshot.params['id']);
    this.types = this.transactionTypesService.getTransactionTypes();
  }

  getTransaction(id) {
    this.http.get('/api//transaction/' + id).subscribe(data => {
      this.transaction = data;
      this.transaction.date = new Date(this.transaction.date);
    });
  }

  updateBook(id) {
    this.http.put('/api/transaction/' + id, this.transaction)
      .subscribe(res => {
          const id = res['_id'];
          this.router.navigate(['/transaction-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.transaction.date = event.value;
  }

}

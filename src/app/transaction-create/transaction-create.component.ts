import {Component, OnInit} from '@angular/core';
import {Transaction} from '../model/transaction';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDatepickerInputEvent} from '@angular/material';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {

  types: string[] = ['food', 'transport', 'apartment'];
  model: Transaction = new Transaction(1, new Date(), this.types[0]);
  submitted = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  onSubmit() {
    this.submitted = true;
    this.saveTransaction();
  }

  saveTransaction() {
    this.http.post('/api/transaction', this.model)
      .subscribe(res => {
          const id = res['_id'];
          this.router.navigate(['/transaction-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  ngOnInit() {
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.model.date = event.value;
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDatepickerInputEvent} from "@angular/material";

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit {

  transaction: any;
  types: string[] = ['food', 'transport', 'apartment'];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getTransaction(this.route.snapshot.params['id']);
  }

  getTransaction(id) {
    this.http.get('/transaction/' + id).subscribe(data => {
      this.transaction = data;
      this.transaction.date = new Date(this.transaction.date);
    });
  }

  updateBook(id) {
    this.http.put('/transaction/' + id, this.transaction)
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

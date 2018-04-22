import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Transaction} from '../transaction';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {

  transaction: Transaction;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.getTransactionDetail(this.route.snapshot.params['id']);
  }

  getTransactionDetail(id) {
    this.http.get('/transaction/' + id).subscribe(data => {
      this.transaction = data;
    });
  }

  deleteTransaction(id) {
    this.http.delete('/transaction/' + id)
      .subscribe(res => {
          this.router.navigate(['/transactions']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}

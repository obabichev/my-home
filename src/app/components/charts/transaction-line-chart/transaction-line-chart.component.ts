import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {Transaction} from '../../../model/transaction';
import {TransactionPoint} from '../../../model/charts/transactionPoint';
import {transactionDateComparatorReversed} from '../../../utils/comparators/transactionDateComparator';
import {Wallet} from '../../../model/wallet';

@Component({
  selector: 'app-transaction-line-chart',
  templateUrl: './transaction-line-chart.component.html',
  styleUrls: ['./transaction-line-chart.component.css']
})
export class TransactionLineChartComponent implements OnInit, AfterContentInit {

  width = 640;
  height = 480;

  plotMargins = {
    top: 40,
    bottom: 20,
    left: 70,
    right: 30
  };

  transactionViewSizes = {
    height: 70,
    width: 200
  };

  _transactions: Transaction[] = null;
  _wallet: Wallet = null;

  @Input()
  set transactions(transactions: Transaction[]) {
    this._transactions = transactions;

    this.renderChart();
  }

  @Input()
  set wallet(wallet: Wallet) {
    this._wallet = wallet;

    this.renderChart();
  }

  svg = null;
  x = null;
  y = null;
  xAxis = null;
  yAxis = null;
  xAxisGroup = null;
  yAxisGroup = null;
  pointsGroup = null;
  transactionView = null;

  constructor() {
  }

  ngOnInit(): void {
  }


  ngAfterContentInit(): void {
    this.createSvg();
  }

  renderChart() {
    if (!this._transactions || !this._wallet || this._transactions.length === 0) {
      return;
    }
    this.createSvg();
    this.renderPoints(this.createTransactionPoints(this._transactions, this._wallet), this._wallet);
  }

  renderPoints(transactioPoints: TransactionPoint[], wallet: Wallet) {
    console.log('[obabichev] rednerPoints:transactionPoints', transactioPoints);
    console.log('[obabichev] rednerPoints:wallet', wallet);

    this.refreshXAxis(transactioPoints);
    this.refreshYAxis(transactioPoints);

    this.createLine(transactioPoints);
    this.createFill(transactioPoints);

    this.createMouseMoveController(transactioPoints);
  }

  createLine(transactionPoints: TransactionPoint[]) {
    let line = 'M';
    transactionPoints.forEach((item: TransactionPoint, i) => {
      const x0 = this.x(item.date);
      const y0 = this.y(item.value);

      if (i === 0) {
        line += `${x0},${y0}`;
      } else {
        line += `H${x0}V${y0}`;
      }
    });

    this.pointsGroup.append('path')
      .attr('class', 'fill-line')
      .attr('stroke', '#3880aa')
      .attr('stroke-width', '3px')
      .attr('fill', 'none')
      .attr('d', line);
  }

  createFill(transactionPoints: TransactionPoint[]) {
    let fill = `M0,${this.getPlotHeight()}`;
    transactionPoints.forEach((item: TransactionPoint, i) => {
      const x0 = this.x(item.date);
      const y0 = this.y(item.value);

      fill += `H${x0}V${y0}`;

    });
    fill += `V${this.getPlotHeight()}Z`;

    this.pointsGroup.append('path')
      .attr('fill', '#3880aa')
      .attr('opacity', 0.3)
      .attr('d', fill);
  }

  createMouseMoveController(transactioPoints: TransactionPoint[]) {
    this.pointsGroup.append('rect')
      .attr('width', this.getPlotWidth())
      .attr('height', this.getPlotHeight())
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mouseover', () => this.pointsGroup.style('display', null))
      .on('mouseout', () => this.hideTransactionView())
      .on('mousemove', mouseMove);

    const pointsGroup = this.pointsGroup;
    const bisectDate = d3.bisector((d: TransactionPoint) => d.date).left;
    const x = this.x;
    const y = this.y;
    const width = this.width;
    const height = this.height;
    const transactionViewSizes = this.transactionViewSizes;

    function mouseMove() {
      const current = x.invert(d3.mouse(this)[0]);
      const i = bisectDate(transactioPoints, current, 1);
      const left = transactioPoints[i - 1];
      const right = transactioPoints[i];
      const d = 2 * x(current) < x(right.date) + x(left.date) ? left : right;

      if (d.transaction) {
        let x0 = x(d.date);
        x0 -= (x0 > width / 2 ? transactionViewSizes.width : 0);
        let y0 = y(d.value);
        y0 -= (y0 > height / 2 ? transactionViewSizes.height : 0);

        pointsGroup.select('circle.tooltip-point')
          .attr('transform', `translate(${x(d.date)},${y(d.value)})`);
        pointsGroup.select('rect.transaction-view')
          .attr('transform', `translate(${x0},${y0})`)
          .attr('visibility', 'visible');
        pointsGroup.select('text.amount')
          .attr('transform', `translate(${x0},${y0})`)
          .text(`Amount: ${d.transaction.amount}`);
        pointsGroup.select('text.total')
          .attr('transform', `translate(${x0},${y0})`)
          .text(`Total: ${d.value}`);
        pointsGroup.select('text.type')
          .attr('transform', `translate(${x0},${y0})`)
          .text(`Type: ${d.transaction.type}`);
        pointsGroup.selectAll('text')
          .attr('visibility', 'visible');
      }
    }
  }

  hideTransactionView() {
    this.pointsGroup.select('rect.transaction-view')
      .attr('visibility', 'hidden');
    this.pointsGroup.selectAll('text')
      .attr('visibility', 'hidden');
  }

  createTransactionPoints(transactions: Transaction[], wallet: Wallet): TransactionPoint[] {
    const transactionPoints = transactions.sort(transactionDateComparatorReversed)
      .map((transaction: Transaction) => new TransactionPoint(transaction, /*transaction.amount*/ 0, transaction.date));
    const startDate = new Date(transactions[0].date);
    startDate.setDate(startDate.getDate() - 1);

    const endDate = new Date(transactions[transactions.length - 1].date);
    endDate.setDate(endDate.getDate() + 1);

    transactionPoints.unshift(new TransactionPoint(null, 0, startDate));
    transactionPoints.push(new TransactionPoint(null, wallet.total, endDate));

    for (let i = transactionPoints.length - 2; i >= 0; i--) {
      const currentTransactionPoint: TransactionPoint = transactionPoints[i];
      const nextTransactionPoint: TransactionPoint = transactionPoints[i + 1];
      currentTransactionPoint.value =
        nextTransactionPoint.value - (nextTransactionPoint.transaction ? nextTransactionPoint.transaction.amount : 0);
    }
    return transactionPoints;
  }

  createSvg() {
    if (this.svg) {
      return;
    }

    this.svg = d3.select('#chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    const plot = this.svg.append('g')
      .classed('plot', true)
      .attr('transform', `translate(${this.plotMargins.left},${this.plotMargins.top})`);

    this.createXAxis();
    this.createYAxis();

    this.createPointGroup(plot);
  }

  createPointGroup(plot) {
    this.pointsGroup = plot.append('g')
      .classed('points', true);

    this.createTooltipPoint();
    this.createTransactionView();
  }

  createXAxis() {
    this.x = d3.scaleTime()
      .range([0, this.getPlotWidth()]);
    this.xAxis = d3.axisBottom(this.x);
    // .tickSize(-this.getPlotHeight());

    this.xAxisGroup = this.svg.append('g')
      .classed('x', true)
      .classed('axis', true)
      .attr('transform', `translate(${this.plotMargins.left},${this.getPlotHeight() + this.plotMargins.top})`)
      .call(this.xAxis);
  }

  createTransactionView() {
    this.transactionView = this.pointsGroup.append('rect')
      .attr('class', 'transaction-view')
      .attr('width', this.transactionViewSizes.width)
      .attr('height', this.transactionViewSizes.height)
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .attr('visibility', 'hidden');

    this.pointsGroup.append('text')
      .attr('class', 'amount')
      .attr('dx', '0.5em')
      .attr('dy', '1.25em');
    this.pointsGroup.append('text')
      .attr('class', 'total')
      .attr('dx', '0.5em')
      .attr('dy', '2.25em');
    this.pointsGroup.append('text')
      .attr('class', 'type')
      .attr('dx', '0.5em')
      .attr('dy', '3.25em');
  }

  refreshXAxis(transactionPoints: TransactionPoint[]) {
    this.x.domain(d3.extent(transactionPoints, d => d.date)).nice();
    this.xAxisGroup.call(this.xAxis);
  }

  createYAxis() {
    this.y = d3.scaleLinear()
      .range([this.getPlotHeight(), 0]);

    this.yAxis = d3.axisLeft(this.y);

    this.yAxisGroup = this.svg.append('g')
      .classed('y', true)
      .classed('axis', true)
      .attr('transform', `translate(${this.plotMargins.left},${this.plotMargins.top})`)
      .call(this.yAxis);
  }

  createTooltipPoint() {
    this.pointsGroup.append('circle')
      .attr('class', 'tooltip-point')
      .attr('stroke', '#3880aa')
      .attr('fill', '#3880aa')
      .attr('r', 6);
  }

  refreshYAxis(transactionPoints: TransactionPoint[]) {
    this.y.domain(d3.extent(transactionPoints, d => d.value))
      .nice();
    this.yAxisGroup.call(this.yAxis);
  }

  getPlotWidth() {
    return this.width - this.plotMargins.left - this.plotMargins.right;
  }

  getPlotHeight() {
    return this.height - this.plotMargins.top - this.plotMargins.bottom;
  }

}

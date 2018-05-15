import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '../../../model/transaction';
import * as d3 from 'd3';

@Component({
  selector: 'app-transactions-line-chart-2',
  templateUrl: './transactions-line-chart-2.component.html',
  styleUrls: ['./transactions-line-chart-2.component.css']
})
export class TransactionsLineChart2Component implements OnInit {

  @Input()
  set transactions(transactions: Transaction[]) {
    // this.drawChart();
    if (transactions && transactions.length > 0) {
      this.drawChart();
      this.addPoints(transactions);
    }
  }

  constructor() {
  }

  ngOnInit() {
    this.drawChart();
  }

  drawChart() {
    if (this.renderedContainer) {
      return;
    }

    const width = 960;
    const height = 480;

    let svg = d3.select('#chart').append('svg')
      .attr('width', width)
      .attr('height', height);

    let plotMargins = {
      top: 30,
      bottom: 30,
      left: 150,
      right: 30
    };

    let plotGroup = svg.append('g')
      .classed('plot', true)
      .attr('transform', `translate(${plotMargins.left},${plotMargins.top})`);

    let plotWidth = width - plotMargins.left - plotMargins.right;
    let plotHeight = height - plotMargins.top - plotMargins.bottom;

    let xScale = d3.scaleTime()
      .range([0, plotWidth]);
    this.xScale = xScale;
    this.xAxis = d3.axisBottom(xScale);
    // console.log('[obabichev] this.xAxis1', this.xAxis)
    this.xAxisGroup = plotGroup.append('g')
      .classed('x', true)
      .classed('axis', true)
      .attr('transform', `translate(${0},${plotHeight})`)
      .call(this.xAxis);

    let yScale = d3.scaleLinear()
      .range([plotHeight, 0]);
    this.yScale = yScale;
    this.yAxis = d3.axisLeft(yScale);
    this.yAxisGroup = plotGroup.append('g')
      .classed('y', true)
      .classed('axis', true)
      .call(this.yAxis);

    this.pointsGroup = plotGroup.append('g')
      .classed('points', true);

    this.renderedContainer = true;
  }

  addPoints(transactions: Transaction[]) {
    if (!this.renderedContainer) {
      return;
    }
    console.log('[obabichev] Transactions', transactions);
    const prepared = transactions.map((transaction: Transaction) => ({
      date: transaction.date,
      amount: transaction.amount
    }));
    console.log('[obabichev] prepared', prepared);
    // console.log('[obabichev] this.xAxis2', this.xAxis);
    this.xScale.domain(d3.extent(prepared, d => d.date))
      .nice();
    this.xAxisGroup.call(this.xAxis);

    this.yScale.domain(d3.extent(prepared, d => d.amount))
      .nice();
    this.yAxisGroup.call(this.yAxis);

    const dataBound = this.pointsGroup.selectAll('.post')
      .data(prepared);

    // delete extra points
    dataBound
      .exit()
      .remove();

    const enterSelection = dataBound
      .enter()
      .append('g')
      .classed('post', true);


    enterSelection.merge(dataBound)
      .attr('transform', (d, i) => `translate(${this.xScale(d.date)},${this.yScale(d.amount)})`);

    enterSelection.append('circle')
      .attr('r', 2)
      .style('fill', 'red');
  }
}

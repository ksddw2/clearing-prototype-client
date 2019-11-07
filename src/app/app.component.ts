import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppService } from './app.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
    title = 'app';

    sub: Subscription;

    columnDefs = [
        {headerName: 'Status', field: 'Status', sortable: true, filter: true },
	{headerName: 'Coupon', field: 'Coupon', sortable: true, filter: true, type: ['numericColumn', 'nonEditableColumn']},
        {headerName: 'EntityCusip', field: 'EntityCusip', sortable: true, filter: true },
	{headerName: 'Trader', field: 'Trader', sortable: true, filter: true },
	{headerName: 'TradeId', field: 'TradeId', sortable: true, filter: true },
	{headerName: 'Sector', field: 'Sector', sortable: true, filter: true },
	{headerName: 'Ticker', field: 'Ticker', sortable: true, filter: true },
	{headerName: 'RedEntityCode', field: 'RedEntityCode', sortable: true, filter: true },
	{headerName: 'BuySell', field: 'BuySell', sortable: true, filter: true },
	{headerName: 'ShortName', field: 'ShortName', sortable: true, filter: true },
	{headerName: 'MaturityDate', field: 'MaturityDate', sortable: true, filter: true },
	{headerName: 'Tenor', field: 'Tenor', sortable: true, filter: true },
	{headerName: 'EntityType', field: 'EntityType', sortable: true, filter: true },
	{headerName: 'Jurisdiction', field: 'Jurisdiction', sortable: true, filter: true },
	{headerName: 'Counterparty', field: '', sortable: true, filter: true },
	{headerName: 'ReferenceEntity', field: 'ReferenceEntity', sortable: true, filter: true },
	{headerName: 'Currency', field: 'Currency', sortable: true, filter: true },
	{headerName: 'TradeDate', field: 'TradeDate', sortable: true, filter: true, type: ['dateColumn', 'nonEditableColumn']},
	{headerName: 'Notional', field: 'Notional', sortable: true, filter: true },
        {headerName: 'EffectiveDate', field: 'EffectiveDate', sortable: true, filter: true }
    ];
   
    rowData: any;

    statusBar = {
      statusPanels: [
        {
          statusPanel: "agTotalAndFilteredRowCountComponent",
          align: "left"
        },
        {
          statusPanel: "agTotalRowCountComponent",
          align: "center"
        },
        { statusPanel: "agFilteredRowCountComponent" },
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" }
      ]
    };
	
    constructor(private dataService: AppService) { }

    ngOnInit() {
        this.rowData = this.dataService.getOpenTrades();

        this.sub = this.dataService.getQuotes()
            .subscribe(quote => {
                console.log(quote);
            });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

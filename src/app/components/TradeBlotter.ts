import { Component, OnInit, OnDestroy } from '@angular/core';
import {GridOptions} from "ag-grid-community";

import '@ag-grid-enterprise/range-selection';
import '@ag-grid-enterprise/charts';

import { AppService } from '../services/app.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'trade-blotter',
  templateUrl: './TradeBlotter.html'
})

export class TradeBlotter implements OnInit, OnDestroy {

    gridOptions: GridOptions;
    title = 'app';
    sub: Subscription;
    private rowData;
    private gridApi;

    constructor(private dataService: AppService) {
      this.gridOptions = {
        columnDefs: [
          {headerName: 'Status', field: 'Status', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'Coupon', field: 'Coupon', sortable: true, filter: "agNumberColumnFilter", type: "numericColumn"},
          {headerName: 'EntityCusip', field: 'EntityCusip', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'Trader', field: 'Trader', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'TradeId', field: 'TradeId', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'Sector', field: 'Sector', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'Ticker', field: 'Ticker', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'RedEntityCode', field: 'RedEntityCode', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'BuySell', field: 'BuySell', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'ShortName', field: 'ShortName', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'MaturityDate', field: 'MaturityDate', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'Tenor', field: 'Tenor', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'EntityType', field: 'EntityType', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'Jurisdiction', field: 'Jurisdiction', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'Counterparty', field: '', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'ReferenceEntity', field: 'ReferenceEntity', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'Currency', field: 'Currency', sortable: true, filter: "agTextColumnFilter" },
          {headerName: 'TradeDate', field: 'TradeDate', sortable: true, filter: true, type: ['dateColumn', 'nonEditableColumn']},
          {headerName: 'Notional', field: 'Notional', sortable: true, filter: "agNumberColumnFilter", chartDataType: "series" },
          {headerName: 'EffectiveDate', field: 'EffectiveDate', sortable: true, filter: "agTextColumnFilter" }
        ],
        statusBar: {
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
         },
         getRowNodeId: function (data) {
             return data.TradeId;
         },
         enableCharts: true,
         enableRangeSelection: true
      }
    }

    ngOnInit() {
        this.rowData = this.dataService.getOpenTrades();
        this.sub = this.dataService.listenForTrades()
            .subscribe(msg => {
                console.log(msg);
                var trade = JSON.parse(msg.payload);
                var rowNode = this.gridApi.getRowNode(trade.TradeId);
                if (rowNode) {
                  rowNode.setData(trade);
                }
                else {
                  this.gridApi.updateRowData({
                    add: [trade],
                    addIndex: 0
                  });
                  rowNode = this.gridApi.getRowNode(trade.TradeId);
                }
                this.gridApi.flashCells({
                  rowNodes: [rowNode]
                });
            });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onGridReady(params) {
      this.gridApi = params.api;
      //this.gridColumnApi = params.columnApi;
    }
}

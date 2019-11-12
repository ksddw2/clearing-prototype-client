import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {GridOptions} from "ag-grid-community";

import { AppService } from '../services/app.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'margin-calls',
  templateUrl: './MarginCalls.html'
})

export class MarginCalls implements OnInit, OnDestroy {

    @Output() onMarginTabTextChange = new EventEmitter()

    gridOptions: GridOptions;
    title = 'app';
    sub: Subscription;
    private rowData;
    private gridApi;

    constructor(private dataService: AppService) {
      this.gridOptions = {
        columnDefs: [
          {headerName: 'Status', field: 'Status', sortable: true, filter: true },
          {headerName: 'Id', field: 'MarginCallId', sortable: true, filter: true},
          {headerName: 'Venue', field: 'Venue', sortable: true, filter: true},
          {headerName: 'Margin Call Date', field: 'MarginCallDate', sortable: true, filter: true },
          {headerName: 'Currency', field: 'Ccy', sortable: true, filter: true },
          {headerName: 'Notional', field: 'Notional', sortable: true, filter: true },
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
             return data.MarginCallId;
         }
      }
    }

    ngOnInit() {
        this.rowData = this.dataService.getMarginCalls();
        this.sub = this.dataService.listenForMarginCalls()
            .subscribe(msg => {
                console.log(msg);
                var mc = JSON.parse(msg.payload);
                var rowNode = this.gridApi.getRowNode(mc.MarginCallId);
                if (rowNode) {
                  rowNode.setData(mc);
                }
                else {
                  this.gridApi.updateRowData({
                    add: [mc],
                    addIndex: 0
                  });
                  rowNode = this.gridApi.getRowNode(mc.MarginCallId);
                }
                this.gridApi.flashCells({
                  rowNodes: [rowNode]
                });
                this.deriveOpenCalls();
            });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onGridReady(params) {
      this.gridApi = params.api;
      this.deriveOpenCalls();
      //this.gridColumnApi = params.columnApi;
    }

    private deriveOpenCalls() {
      var openCalls = 0;
      this.gridApi.forEachNode( function(rowNode, index) {
        if (rowNode.data.Status == "New") {
          openCalls++;
        }
       });
       this.onMarginTabTextChange.emit(openCalls);
    }
}

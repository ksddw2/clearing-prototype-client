import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Observer } from 'rxjs/Observer';
import { Socket } from './interfaces';
import io from 'socket.io-client';

@Injectable()
export class AppService {
 
    socket: Socket;
    observer: Observer<any>;
	  ioClient: any;
    
    private baseUrl = 'http://40.85.74.142/broadcaster';
   // private baseUrl = 'http://localhost:1337/localhost:5000';

    constructor(private http: HttpClient) {
		  this.ioClient = io.connect("http://40.85.74.142", {'path': '/broadcaster/socket.io'} );
		  this.ioClient.on('connect', function(){console.info('Socket.IO Client connected')});
		  this.ioClient.on('disconnect', function(){console.info('Socket.IO Client disconnected')});
	  }

    getOpenTrades(): Observable< any[] > {
		  return this.http.get<any[]>(this.baseUrl + '/allTrades');
    }

    getMarginCalls(): Observable< any[] > {
		  return this.http.get<any[]>(this.baseUrl + '/allMarginCalls');
    }

    listenForTrades(): Observable < any > {
		  this.ioClient.on("trade-data", (msg) => {this.observer.next(msg);});
		  return this.createObservable();
    }

    listenForMarginCalls(): Observable < any > {
		  this.ioClient.on("margin-call-data", (msg) => {this.observer.next(msg);});
		  return this.createObservable();
    }

    createObservable(): Observable < any > {
		  return new Observable<any>(observer => {
			  this.observer = observer;
		  });
	  }
} 

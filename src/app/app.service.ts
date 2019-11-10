import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Observer } from 'rxjs/Observer';

import { Socket } from './interfaces';

import io from 'socket.io-client';
var ioClient = io.connect("http://40.85.74.142", {'path': '/broadcaster/socket.io'} );

//const
 //   io = require("socket.io-client"),
//    ioClient = io.connect('http://40.127.184.241:5000');
 //   ioClient = io.connect('http://40.85.74.142', {path: '/broadcaster/socket.io'});
//const socket = io();

@Injectable()
export class AppService {
 
    socket: Socket;
    observer: Observer<any>;
    
    private baseUrl = 'http://40.85.74.142/broadcaster';
   // private baseUrl = 'http://localhost:1337/localhost:5000';

    constructor(private http: HttpClient) {
		ioClient.on('connect', function(){console.info('Socket.IO Client connected')});
		ioClient.on('disconnect', function(){console.info('Socket.IO Client disconnected')});
	}

    getOpenTrades(): Observable< any[] > {
		return this.http.get<any[]>(this.baseUrl + '/allTrades');
    }

    getQuotes(): Observable < any > {
	//  ioClient.on("FromAPI", (msg) => {console.info(msg), this.observer.next(msg.data);});
	ioClient.on("FromAPI", (msg) => {console.info(msg);});
      return this.createObservable();
    }

    createObservable(): Observable < any > {
		return new Observable<any>(observer => {
			this.observer = observer;
		});
	}
} 

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Observer } from 'rxjs/Observer';

import * as socketIo from 'socket.io-client';
import { Socket } from './interfaces';

@Injectable()
export class AppService {
 
    socket: Socket;
    observer: Observer<any>;
    
    private baseUrl = 'http://40.85.74.142/broadcaster';
   // private baseUrl = 'http://localhost:1337/localhost:5000';

    constructor(private http: HttpClient) { }


    getOpenTrades(): Observable< any[] > {
	return this.http.get<any[]>(this.baseUrl + '/allTrades');
    }

    getQuotes(): Observable < any > {
      this.socket = socketIo(this.baseUrl);
      this.socket.on('data', (res) => {
        this.observer.next(res.data);
      });
      return this.createObservable();
    }

    createObservable(): Observable < any > {
      return new Observable<any>(observer => {
        this.observer = observer;
    });
}
} 

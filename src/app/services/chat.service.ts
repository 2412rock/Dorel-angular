import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, Subject } from '@microsoft/signalr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection: HubConnection;

    private messageReceived = new Subject<[string, string]>();

    constructor() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:4500/chatHub') // URL of your backend
            .build();

        this.hubConnection.start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err));

        this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
            this.messageReceived.next([user, message]);
        });
    }

    sendMessage(user: string, message: string): void {
        this.hubConnection.invoke('SendMessage', user, message)
            .catch(err => console.error(err));
    }

    getMessageObservable(): Observable<[string, string]> {
      return new Observable(observer => {
          this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
              observer.next([user, message]);
          });
      });
  }
}

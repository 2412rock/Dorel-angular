import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, Subject } from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection: HubConnection;

    private messageReceived = new Subject<[string]>();

    constructor(private localStorageService: LocalstorageService) {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:4500/chatHub') // URL of your backend
            .build();

        this.hubConnection.start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err));

        this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
            this.messageReceived.next([message]);
        });
    }

    sendMessage(toUser: string, message: string): void {
      let fromUser = this.localStorageService.getUserEmail();
        this.hubConnection.invoke('SendMessage', fromUser, toUser, message)
            .catch(err => console.error(err));
    }

    getMessageObservable(): Observable<[string, string]> {
      return new Observable(observer => {
          this.hubConnection.on('2412rock@gmail.com', (fromuser, message: string) => {
              observer.next([fromuser ,message]);
          });
      });
  }
}

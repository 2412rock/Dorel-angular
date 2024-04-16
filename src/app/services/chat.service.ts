import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, Subject } from '@microsoft/signalr';
import { Observable, firstValueFrom } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { Message } from '../model/message';
import { ChatHttpService } from './chat-http.service';
import { SaveMessageReq } from '../model/Requests/save-message-req';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection: HubConnection;

    private messageReceived = new Subject<Message>();

    constructor(private localStorageService: LocalstorageService, private chatHttpService: ChatHttpService) {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:4500/chatHub') // URL of your backend
            .build();

        this.hubConnection.start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err));

        this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {

        });
    }

    sendMessage(toUser: string, message: string): void {
      let fromUser = this.localStorageService.getUserEmail();
      let req = new SaveMessageReq();
      req.Message = message;
      req.receipientEmail = toUser;

        firstValueFrom(this.chatHttpService.saveMessage(req)).then(r => {
          if(r.isSuccess){
            this.hubConnection.invoke('SendMessage', fromUser, toUser, message).then(e => {

            }).catch(err => console.error(err));
          }
        });
        
    }

    getMessageObservable(): Observable<Message> {
      return new Observable(observer => {
          this.hubConnection.on(this.localStorageService.getUserEmail(), (fromuser, message: string) => {
            var msgObj = new Message();
            msgObj.from = fromuser;
            msgObj.to = "2412rock@gmail.com";
            msgObj.message = message;
              observer.next(msgObj);
          });
      });
  }
}

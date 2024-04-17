import { Injectable, isDevMode } from '@angular/core';
import { HubConnection, HubConnectionBuilder, Subject } from '@microsoft/signalr';
import { Observable, firstValueFrom } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { ChatHttpService } from './chat-http.service';
import { SaveMessageReq } from '../model/Requests/save-message-req';
import { Message } from '../model/group';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection: HubConnection;
  private apiUrl = isDevMode() ? 'http://localhost:4500' : 'https://dorelapp.xyz:4200'; 
  
    private messageReceived = new Subject<Message>();

    constructor(private localStorageService: LocalstorageService, private chatHttpService: ChatHttpService) {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`${this.apiUrl}/chatHub`) // URL of your backend
            .build();

        this.hubConnection.start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err));

        this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {

        });
    }

    // sendMessage(toUser: number, message: string): void {
    //   let fromUser = this.localStorageService.getUserId();
    //   let req = new SaveMessageReq();
    //   req.Message = message;
    //   req.receipientId = toUser;

    //     firstValueFrom(this.chatHttpService.saveMessage(req)).then(r => {
    //       if(r.isSuccess){
    //         this.hubConnection.invoke('SendMessage', fromUser.toString(), toUser.toString(), message).then(e => {

    //         }).catch(err => console.error(err));
    //       }
    //     });
        
    // }

    async sendMessage(toUser: number, message: string): Promise<boolean> {
      try {
          const fromUser = parseInt(this.localStorageService.getUserId()); // Assuming getUserId() returns a string
          const req = new SaveMessageReq();
          req.Message = message;
          req.receipientId = toUser;
  
          // Wait for the HTTP request to complete
          const response = await firstValueFrom(this.chatHttpService.saveMessage(req));
  
          // If the HTTP request is successful, proceed with invoking the hub connection
          if (response.isSuccess) {
              await this.hubConnection.invoke('SendMessage', fromUser.toString(), toUser.toString(), message);
              return true;
              // The hub connection invocation was successful
          } else {
              // Handle error if the HTTP request is not successful
              console.error('HTTP request failed:', response.exceptionMessage);
              return false;
          }
      } catch (error) {
          // Handle any errors that occur during the process
          console.error('Error:', error);
          return false;
      }
  }

    getMessageObservable(): Observable<Message> {
      return new Observable(observer => {
          this.hubConnection.on(`${this.localStorageService.getUserId().toString()}`, (fromuser, message: string) => {
            console.log("Got message")
            var msgObj = new Message();
            msgObj.senderId = fromuser;
            msgObj.messageText = message;
              observer.next(msgObj);
          });
      });
  }
}

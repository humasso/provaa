import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {

  constructor(private socket: Socket) { }

  joinRoom(data){
    this.socket.emit('join',data);
  }
  leaveRoom(data){
    this.socket.emit('leave',data);
  }

  sendMessage(data){
    this.socket.emit("new-message", data);
  }
  getMessage(){
    let observable = new Observable<{utente:String, message:String}>(observer=>{
        this.socket.on('resp-message', (data)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
  }
  /*
  getMessage() : Observable<unknown> {
    return this.socket.fromEvent("resp-message");
  }
  */
}

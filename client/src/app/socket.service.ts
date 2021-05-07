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

  sendMessage(msg: string){
    this.socket.emit("new-message", msg);
  }
    getMessage() : Observable<unknown> {
    return this.socket.fromEvent("resp-message");
  }
}

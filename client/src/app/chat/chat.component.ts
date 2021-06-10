import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  obs : Observable<any>;
  utente: SocialUser;
  messageList1: Array<{utente: String, message: String}> = [];
  messageList2: Array<{utente: String, message: String}> = [];
  messageList3: Array<{utente: String, message: String}> = [];
  //nome : String;
  stanza : String;
  messageText: String;

  constructor(private authService: AuthService, private socketService: SocketService) { }

  ngOnInit(): void {
    this.authService.getAuthServiceState().subscribe(user => {
      console.log("prova")
      this.utente = user;
      console.log(this.stanza)
    });

    this.obs = this.socketService.getMessage();
    this.obs.subscribe(this.rcvMessage);
  }

  join(){
    this.socketService.joinRoom({utente:this.utente.name, room:this.stanza});
    console.log("utente: " + this.utente.name + " Stanza: " + this.stanza)
  }

  rcvMessage= (data: any)=>{
    console.log(data)

    if (this.stanza=='1') {
      this.messageList1.push(data);
      console.log("caricato message 1");
    }
    else if (this.stanza=='2') {
      this.messageList2.push(data);
      console.log("caricato message 2");
    }
    else if (this.stanza=='3') {
      this.messageList3.push(data);
      console.log("caricato message 3");
    }
    console.log("Message: ", this.messageText)
  }

  sendMessage() {
    this.socketService.sendMessage({utente:this.utente.name, room:this.stanza, message: this.messageText});
    console.log(this.utente.name, this.stanza,  this.messageText)
    console.log("Send mess");
    this.messageText='';
  }

  classe() {
    this.stanza='1'
    console.log("chiamato classe")
    this.join()
  }
  professori(){
    this.stanza='2'
    console.log("chiamato professori")
    this.join()
  }
  comunicazioni(){
    this.stanza='3'
    console.log("chiamato comunicazioni")
    this.join()
  }
}

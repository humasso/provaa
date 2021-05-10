import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { AuthService } from './auth.service';
import { SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
interface Pippo {
  nome: String;
  message: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  obs : Observable<any>;
  messageList: Array<Pippo> = [];
  utente: SocialUser;
  nome : String;
  stanza : String;
  messageText: String;

  constructor(private socketService: SocketService, private authService: AuthService) { }

  ngOnInit() {

    this.obs = this.socketService.getMessage();
    this.obs.subscribe(this.rcvMessage);


    this.authService.getAuthServiceState().subscribe(user => {
      this.utente = user;
      this.nome = this.utente.name
      console.log(user)
    });

  }
  sendMessage() {
    this.socketService.sendMessage({user:this.nome, room:this.stanza, message: this.messageText});
    /*
    console.log("sent: " + message.value)
    message.value = "";
    */
  }

  rcvMessage= (data: any)=>{
    console.log(data)
    let p : Pippo;
    p.message = this.messageText;
    p.nome = this.nome;
    this.messageList.push(data);
    console.log("Message", this.messageText)
  }

  join(){
    this.socketService.joinRoom({user:this.nome, room:this.stanza});
  }

  leave(){
    this.socketService.leaveRoom({user:this.nome, room:this.stanza});
  }





  signInWithGoogle(): void {
    this.authService.signInWithGoogle()
  }
  signOut(): void {
    this.authService.signOut();
  }
  prova(): void {
    console.log(this.utente)
    console.log(this.nome)
  }

  /*this.socketService.getMessage()
      .subscribe((message: string) => {
        this.messageList.push({nome, message});
        console.log("messagereceived: " + message)
      });
  */

}
//https://www.youtube.com/watch?v=vpQDkEgO-kA

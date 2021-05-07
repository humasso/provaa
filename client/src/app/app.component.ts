import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { AuthService } from './auth.service';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList: Array<{nome : String, message: String}> = [];
  utente: SocialUser;
  nome : String;
  stanza : String;

  constructor(private socketService: SocketService, private authService: AuthService) { }

  sendMessage(message: HTMLInputElement) {
    this.socketService.sendMessage(message.value);

    console.log("sent: " + message.value)
    message.value = "";
  }
  ngOnInit() {
    this.socketService.getMessage()
      .subscribe((message: string) => {
        this.messageList.push();
        console.log("messagereceived: " + message)
      });
      //https://www.youtube.com/watch?v=vpQDkEgO-kA
    this.authService.getAuthServiceState().subscribe(user => {
      this.utente = user;
      this.nome = this.utente.name
      console.log(user)
    });



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

  join(){
    this.socketService.joinRoom({user:this.nome, room:this.stanza});
  }

  leave(){
    this.socketService.leaveRoom({user:this.nome, room:this.stanza});
  }

}

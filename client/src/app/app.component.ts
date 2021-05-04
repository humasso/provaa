import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList:  string[] = [];
  utente: any;

  constructor(private socketService: SocketService, private AuthService: AuthService) {}

  sendMessage(message: HTMLInputElement) {
    this.socketService.sendMessage(message.value);

    console.log("sent: " + message.value)
    message.value="";
  }
  ngOnInit() {
    this.socketService.getMessage()
      .subscribe((message: string) => {
        this.messageList.push(message);
        console.log("messagereceived: " + message)
      });
    this.utente = this.AuthService.getuser()
    console.log(this.utente)
  }
  signInWithGoogle(): void {
    this.AuthService.signInWithGoogle()
  }
  signOut(): void {
    this.AuthService.signOut();
  }
}

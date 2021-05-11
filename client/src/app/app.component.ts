import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { AuthService } from './auth.service';
import { SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  messageList1: Array<{utente: String, message: String}> = [];
  messageList2: Array<{utente: String, message: String}> = [];
  messageList3: Array<{utente: String, message: String}> = [];
  utente: SocialUser;
  nome : String;
  stanza : String;
  messageText: String;

  constructor(private socketService: SocketService, private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {

    this.obs = this.socketService.getMessage();
    this.obs.subscribe(this.rcvMessage);


    this.authService.getAuthServiceState().subscribe(user => {
      this.utente = user;
      this.nome = this.utente.name
      console.log(user)
      /*
      const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');
      this.http.post<any>('https://3000-coral-marten-kydt8lju.ws-eu04.gitpod.io/user', JSON.stringify({"codice": this.utente.id,"nome":this.utente.lastName, "cognome": this.utente.firstName, "username": this.utente.name, "email": this.utente.email}), {headers: headers}).subscribe(data => {
      console.log(data)
      })
      */
    });

  }
  sendMessage() {
    this.socketService.sendMessage({user:this.nome, room:this.stanza, message: this.messageText});

    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');
    this.http.post<any>('https://3000-coral-marten-kydt8lju.ws-eu04.gitpod.io/message', JSON.stringify({"utente": this.nome,"messagge":this.messageText, "stanza": this.stanza}), {headers: headers}).subscribe(data => {
      console.log(data)
    })
  }


  rcvMessage= (data: any)=>{
    console.log(data)
    /*
    let p : Pippo;
    p.message = this.messageText;
    p.nome = this.nome;
    */
    if (this.stanza=='1') {
      this.messageList1.push(data);
      console.log("caricato message 1");
    }
    if (this.stanza=='2') {
      this.messageList2.push(data);
      console.log("caricato message 2");
    }
    if (this.stanza=='3') {
      this.messageList3.push(data);
      console.log("caricato message 3");
    }
    console.log("Message", this.messageText)
  }

  join(){
    this.socketService.joinRoom({user:this.nome, room:this.stanza});
    console.log("utente: " + this.nome + " Stanza: " + this.stanza)
  }

  leave(){
    this.socketService.leaveRoom({user:this.nome, room:this.stanza});
    console.log("utente: " + this.nome + " Ha lasciato la stanza")
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
// IDEA:     https://www.youtube.com/watch?v=NsHgvKeAEDI

//https://www.youtube.com/watch?v=vpQDkEgO-kA

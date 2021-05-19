import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { AuthService } from './auth.service';
import { SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  loggato: boolean = false;
/*
  Condizione per visualizzare le diverse liste di messaggi
  (non serve piu)

  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
*/
  constructor(private socketService: SocketService, private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.authService.getAuthServiceState().subscribe(user => {
      this.utente = user;
      //this.nome = this.utente.name
      //this.loggato=true
      console.log(user)
      /*
      const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');
      this.http.post<any>('https://3000-sapphire-carp-jctxs8te.ws-eu04.gitpod.io/user', JSON.stringify({"codice": this.utente.id,"nome":this.utente.lastName, "cognome": this.utente.firstName, "username": this.utente.name, "email": this.utente.email}), {headers: headers}).subscribe(data => {
      console.log(data)
      })
      */
    });


    this.http.get('https://3000-sapphire-carp-jctxs8te.ws-eu04.gitpod.io/list1').subscribe(data => {
        console.log("Succede qualcosa");
        //console.log(data)
        var temp =data['recordset'];
        for(var index in temp){
          console.log(temp[index].Utente + temp[index].Messaggio);
          this.messageList1.push( {'utente': temp[index].Utente, 'message': temp[index].Messaggio})
        }
        console.log(this.messageList1)
    });

    this.http.get('https://3000-sapphire-carp-jctxs8te.ws-eu04.gitpod.io/list2').subscribe(data => {
        console.log("Succede qualcosa");
        //console.log(data)
        var temp =data['recordset'];
        for(var index in temp){
          console.log(temp[index].Utente + temp[index].Messaggio);
          this.messageList2.push( {'utente': temp[index].Utente, 'message': temp[index].Messaggio})
        }
        console.log(this.messageList2)
    });

    this.http.get('https://3000-sapphire-carp-jctxs8te.ws-eu04.gitpod.io/list3').subscribe(data => {
        //console.log(data)
        var temp =data['recordset'];
        for(var index in temp){
          console.log(temp[index].Utente + temp[index].Messaggio);
          this.messageList3.push( {'utente': temp[index].Utente, 'message': temp[index].Messaggio})
        }
        console.log(this.messageList3)
    });

  }
  sendMessage() {
    this.socketService.sendMessage({utente:this.utente.name, room:this.stanza, message: this.messageText});



    if (this.stanza=='1') {
      /*
      this.show2=false;
      this.show3=false;
      this.show1=true;
      */
      this.messageList1.push({utente:this.utente.name, message: this.messageText});
      console.log("caricato message 1");
    }
    else if (this.stanza=='2') {
      /*
      this.show1=false;
      this.show3=false;
      this.show2=true;
      */
      this.messageList2.push({utente:this.utente.name, message: this.messageText});
      console.log("caricato message 2");
    }
    else if (this.stanza=='3') {
      /*
      this.show1=false;
      this.show2=false;
      this.show3=true;
      */
      this.messageList3.push({utente:this.utente.name, message: this.messageText});
      console.log("caricato message 3");
    }
    console.log("Message", this.messageText)

    //  del (MANDA MESSAGGIO AL DB)
    /*
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');
    this.http.post<any>('https://3000-coffee-starfish-gnjgeyah.ws-eu04.gitpod.io/message', JSON.stringify({"utente": this.nome,"messagge":this.messageText, "stanza": this.stanza}), {headers: headers}).subscribe(data => {
      console.log(data)
    })
    */
  }

  join(){
    this.socketService.joinRoom({user:this.nome, room:this.stanza});
    console.log("utente: " + this.utente.name + " Stanza: " + this.stanza)
  }
  /*
      Non serve

  leave(){
    this.socketService.leaveRoom({user:this.nome, room:this.stanza});
    console.log("utente: " + this.utente.name + " Ha lasciato la stanza")
  }
  */




  signInWithGoogle(): void {
    this.authService.signInWithGoogle()
    this.loggato=true;
  }
  signOut(): void {
    this.authService.signOut();
    this.authService.refreshGoogleToken();
    this.loggato=false;
  }
  prova(): void {
    console.log(this.utente)
    console.log(this.utente.name)
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

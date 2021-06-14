import { Component, OnInit, ViewChild } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { SocketService } from '../socket.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  @ViewChild('scroll', { static: true }) scroll: any;

  constructor(private authService: AuthService, private socketService: SocketService, private http: HttpClient) { }

  ngOnInit(): void {
    this.authService.getAuthServiceState().subscribe(user => {
      console.log("prova")
      this.utente = user;
      console.log(this.stanza)
    });

    this.obs = this.socketService.getMessage();
    this.obs.subscribe(this.rcvMessage);
  }
  ngAfterViewInit() {
    this.scroll.nativeElement.scrollTo(0, this.scroll.nativeElement.scrollHeight);
  }

  join(){
    this.socketService.joinRoom({utente:this.utente.name, room:this.stanza});
    console.log("utente: " + this.utente.name + " Stanza: " + this.stanza);
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
    /*
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');
    this.http.post<any>('https://3000-moccasin-cow-fdqhj0jp.ws-eu09.gitpod.io/message', JSON.stringify({"utente": this.utente.name,"messagge":this.messageText, "stanza": this.stanza}), {headers: headers}).subscribe(data => {
      console.log(data)
    })
    */
   this.scroll.nativeElement.scrollTo(0, this.scroll.nativeElement.scrollHeight);
  }

  classe() {
    this.stanza='1'
    console.log("chiamato classe")
    this.join()
    this.messageList1= []
    this.caricaClasse();
  }
  professori(){
    this.stanza='2'
    console.log("chiamato professori")
    this.join()
    this.messageList2= []
    this.caricaprofessori();
  }
  comunicazioni(){
    this.stanza='3'
    console.log("chiamato comunicazioni")
    this.join()
    this.messageList3=[];
    this.caricacomunicazioni();
  }
  caricaClasse(){
    this.http.get('https://3000-peach-barracuda-3g9gcw9e.ws-eu09.gitpod.io/list1').subscribe(data => {
        console.log("Succede qualcosa");
        //console.log(data)
        var temp =data['recordset'];
        for(var index in temp){
          console.log(temp[index].Utente + temp[index].Messaggio);
          this.messageList1.push( {'utente': temp[index].Utente, 'message': temp[index].Messaggio})
        }
        console.log(this.messageList1)
    });
  }
  caricaprofessori(){
    this.http.get('https://3000-peach-barracuda-3g9gcw9e.ws-eu09.gitpod.io/list2').subscribe(data => {
        console.log("Succede qualcosa");
        //console.log(data)
        var temp =data['recordset'];
        for(var index in temp){
          console.log(temp[index].Utente + temp[index].Messaggio);
          this.messageList2.push( {'utente': temp[index].Utente, 'message': temp[index].Messaggio})
        }
        console.log(this.messageList2)
    });
  }
  caricacomunicazioni(){
    this.http.get('https://3000-peach-barracuda-3g9gcw9e.ws-eu09.gitpod.io/list3').subscribe(data => {
        //console.log(data)
        var temp =data['recordset'];
        for(var index in temp){
          console.log(temp[index].Utente + temp[index].Messaggio);
          this.messageList3.push( {'utente': temp[index].Utente, 'message': temp[index].Messaggio})
        }
        console.log(this.messageList3)
    });
  }
}

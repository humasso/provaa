import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { AuthService, GoogleLoginProvider } from 'angular5-social-login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList:  string[] = [];

  constructor(private socketService: SocketService, private socialAuthService: AuthService) {
  }

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
  }

  public signinWithGoogle () {
   let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

   this.socialAuthService.signIn(socialPlatformProvider)
   .then((userData) => {
      //on success
      //this will return user data from google. What you need is a user token which you will send it to the server
      this.sendToRestApiMethod(userData.idToken);
    });
  }
  sendToRestApiMethod(token: string) : void {
   this.http.post("url to google login in your rest api",
      {
         token: token
      }
   }).subscribe(
      onSuccess => {
         //login was successful
         //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
      }, onFail => {
         //login was unsuccessful
         //show an error message
      }
   );
}
}

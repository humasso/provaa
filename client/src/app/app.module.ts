import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './socket.service';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { VotiComponent } from './voti/voti.component';
import { AboutComponent } from './about/about.component';
import { EsComponent } from './es/es.component';



const config: SocketIoConfig = { url: 'https://3000-ivory-dingo-yuvxo1f9.ws-eu09.gitpod.io/', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    VotiComponent,
    AboutComponent,
    EsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    SocialLoginModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('795159690542-0842gi1usvu91j52u9hl1a68k1d0ielk.apps.googleusercontent.com'),
          }
        ],
      } as SocialAuthServiceConfig,
    }, SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

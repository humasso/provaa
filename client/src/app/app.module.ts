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

const config: SocketIoConfig = { url: 'https://3000-coral-marten-kydt8lju.ws-eu04.gitpod.io/', options: {} };

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    SocialLoginModule,
    NgbModule,
    FormsModule
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

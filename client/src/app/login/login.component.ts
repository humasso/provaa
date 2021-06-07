import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  obs : Observable<any>;
  utente: SocialUser;
  nome : String;
  stanza : String;
  loggato: boolean = false;
/*
  Condizione per visualizzare le diverse liste di messaggi
  (non serve piu)

  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
*/
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.authService.getAuthServiceState().subscribe(user => {
      this.utente = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle()
    this.loggato=true;
  }
  signOut(): void {
    this.authService.signOut();
    this.authService.refreshGoogleToken();
    this.loggato=false;
  }
}

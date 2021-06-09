import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  utente: SocialUser;
  loggato: Boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuthServiceState().subscribe(user => {
      console.log("prova")
      this.utente = user;
      this.loggato = true;
    });
  }
}

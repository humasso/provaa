import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { VotiComponent } from './voti/voti.component';
import { AboutComponent } from './about/about.component';
import { EsComponent } from './es/es.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'voti', component: VotiComponent },
  { path: 'about', component: AboutComponent },
  { path: 'es', component: EsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

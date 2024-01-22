import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserpageComponent } from './components/user/userpage/userpage.component';
import { AdminpageComponent } from './components/admin/adminpage/adminpage.component';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { CreatebookComponent } from './components/admin/createbook/createbook.component';
import { UserlistComponent } from './components/admin/userlist/userlist.component';
import { AdminprofileComponent } from './components/admin/adminprofile/adminprofile.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
    {path:"", redirectTo:"allbooks",pathMatch:"full"},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent},
    {path:"allbooks",component:BooksComponent ,canActivate:[AuthGuard]},
    { path: 'userpage', component: UserpageComponent,canActivate:[AuthGuard]},
    { path: 'adminpage', component: AdminpageComponent,canActivate:[AuthGuard]},
    { path: 'createbook', component: CreatebookComponent,canActivate:[AuthGuard]},
    { path: 'listuser', component: UserlistComponent ,canActivate:[AuthGuard]},
    { path: 'adminprofile', component: AdminprofileComponent,canActivate:[AuthGuard]},


  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
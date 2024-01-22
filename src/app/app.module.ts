import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminpageComponent } from './components/admin/adminpage/adminpage.component';
import { UserpageComponent } from './components/user/userpage/userpage.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { BooksComponent } from './components/books/books.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { TopbarComponent } from './components/admin/topbar/topbar.component';
import { UserService } from './services/auth.service';

import { CreatebookComponent } from './components/admin/createbook/createbook.component';
import { UserlistComponent } from './components/admin/userlist/userlist.component';
import { AdminprofileComponent } from './components/admin/adminprofile/adminprofile.component';
import { UserprofileComponent } from './components/user/userprofile/userprofile.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminpageComponent,
    UserpageComponent,
    HomeComponent,
    BooksComponent,
    SidebarComponent,
    DashboardComponent,
    TopbarComponent,
    CreatebookComponent,
    UserlistComponent,
    AdminprofileComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule   { 

  
}
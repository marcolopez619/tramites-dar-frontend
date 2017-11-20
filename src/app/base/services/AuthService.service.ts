import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MensajesService } from '../parametros/mensajesServices'
import { MatSnackBar } from '@angular/material'
import { MenuService } from '../services/Menu.service'

@Injectable()
export class AuthService {
  token: string;
  // todo: sacar esto a config.json
  urlBase: string = "http://localhost/pruebasRestful";

  constructor(
    private router: Router,
    private http:HttpClient,
    private mensaje: MensajesService,
    private snackBar: MatSnackBar,
    private MenuService: MenuService) {}


  loginUser(username: string, password: string) {
    this.http.get<{login: string, modulos}>(this.urlBase+"/login.php").subscribe(
      data=>{
        if(data.login)
        {
          this.token = data.login;
            this.snackBar.open(this.mensaje.getMsn('loginExitoso'), 'X',{
                duration: 1750,
                verticalPosition:'bottom', horizontalPosition:'right'
              });
              
           
            this.MenuService.setMenu(data.modulos)
            this.router.navigate(['menu']);
        }
        else{
            this.snackBar.open(this.mensaje.getMsn('loginFallido'), null,{
                duration: 750,
                verticalPosition:'bottom',   horizontalPosition:'right'
              });
        }
    })
  }

  logoutUser() {
    this.token = null;
    console.log("logout");
    this.http.post(this.urlBase+"/logout.php",null).subscribe((response)=>{
        return response;
    });
    this.snackBar.open(this.mensaje.getMsn('loginCerrado'), null,{
      duration: 750,
      verticalPosition:'bottom',   horizontalPosition:'right'
    });
    this.MenuService.setMenu([])
    this.router.navigate(['/login'])
  }

  getUserToken() {
    this.http.post(this.urlBase+"/token",null).subscribe((response:string)=>{
        console.log("response");
        this.token = response;
    });
    return this.token;
  }

  isUserAuthenticated() {
    return this.token != null;
  }
}

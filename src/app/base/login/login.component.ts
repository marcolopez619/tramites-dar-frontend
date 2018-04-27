import { Component, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../shared/services/auth.service';
import { LangService } from '../../shared/services/lang.service';
import { BaseComponent } from '../../shared/base.component';
import { fadeInAnimation } from '../../shared/animations/template.animation';
import { ContextoService } from '../../shared/services/contexto.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    animations: [fadeInAnimation],
    host: { '[@fadeInAnimation]': '' }
})
export class LoginComponent extends BaseComponent implements AfterViewInit, OnInit{

    form = new FormGroup(
        {usuario: new FormControl('', [Validators.required, Validators.minLength(5)]),
        password : new FormControl('', [Validators.required, Validators.minLength(6)])}
    );

    /**
     * Creates an instance of LoginComponent.
     * @param {LangService} langService 
     * @param {AuthService} authService 
     * @memberof LoginComponent
     */
    constructor(
        public langService: LangService,
        public contextService: ContextoService,
        private authService: AuthService,
        private changeDetector : ChangeDetectorRef,
        private router: Router,

    ) {super(); }


    /**
     * Funcion que permite Realizar el login(autenticacion) utilizando un
     * servicio del backend
     * @memberof LoginComponent
     */
    login() {
        
        this.authService.loginUser(this.form.controls['usuario'].value, this.form.controls['password'].value);
    }

    ngAfterViewInit() {
        this.changeDetector.detectChanges();
    }

    ngOnInit(){
        if(this.authService.isUserAuthenticated()){
            this.router.navigate(['menu']);
        }
    }
}

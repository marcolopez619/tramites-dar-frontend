import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInAnim } from '../../shared/animations/template.animation';
import { BaseComponent } from '../../shared/base.component';
import { AuthService } from '../../shared/services/auth.service';
import { ContextoService } from '../../shared/services/contexto.service';
import { LangService } from '../../shared/services/lang.service';

@Component({
    selector: 'base-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    animations: [fadeInAnim],
    host: { '[@fadeInAnim]': '' }
})
export class LoginComponent extends BaseComponent implements OnInit {

    form: FormGroup;

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
        private router: Router,
        private formbuilder: FormBuilder
    ) {super(); }

    /**
     * Funcion que permite Realizar el login(autenticacion) utilizando un
     * servicio del backend.
     * @memberof LoginComponent
     */
    login(): void {
        this.authService.loginUser(this.form.controls['usuario'].value, this.form.controls['password'].value);
    }

    /**
     * Hook on init del componente.
     *
     * @memberof LoginComponent
     */
    ngOnInit(): void {
      if (this.authService.isUserAuthenticated()) {
          this.router.navigate(['menu']);
      } else {
          // Liebera al usuario del backend.
          this.authService.logoutUser();
      }

      this.form = this.formbuilder.group({
          usuario: ['', Validators.required],
          password: ['', Validators.required]
      });
    }
}

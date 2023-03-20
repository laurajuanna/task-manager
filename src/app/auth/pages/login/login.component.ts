import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm: FormGroup = this.fb.group({
    userid: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  public visibility: boolean = false;

  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    //private authService: AuthGuardService,
    private router: Router,
    //private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    /* TODO if (this.authService.validarToken()) {
    if (true) {
      this.router.navigateByUrl('/task/home')
    }*/
  }

  public toggleVisibility() {
    this.visibility = !this.visibility;
  }

  public login() {

    const { userid, password } = this.loginForm.value;

    const data = {
      data: {
        userid: userid, password: password
      }
    }

    this.loading = true;
    if (password === 'itpatagonia') {
      this.navigateToHome()
    }
    /* TODO this.authService.login(data).subscribe(rs => {
      if (rs) {
        this.loading = false;
        this.messagesService.showMessage('success', 'Ingreso exitoso!', `Bienvenido ${userid.toUpperCase()} !`)
        setTimeout(this.navigateToHome.bind(this), 1500)
      }
      else if (!rs.ok) {
        this.loading = false;
        this.messagesService.showMessage('error', !rs ? 'Credenciales inválidas' : 'Hubo un error', !rs ? 'Por favor ingrese un usuario y contraseña válidos.' : rs.message)
      }
    })*/
  }

  private navigateToHome() {
    this.router.navigateByUrl('/task/home');
  }

}
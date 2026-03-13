import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/Account/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: false
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async signIn(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const { email, password } = this.loginForm.value;
      const result: any = await this.authService.login({
        username: email.trim(),
        password
      });

      if (result?.success) {
        localStorage.setItem('token',  result.returnObject.token);
        localStorage.setItem('nameAr', result.returnObject.nameAr ?? '');
        localStorage.setItem('nameEn', result.returnObject.nameEn ?? '');
        this.router.navigateByUrl('/contact-admin');
      } else {
        this.errorMessage = result?.arabicMessage || 'بيانات الدخول غير صحيحة';
      }
    } catch (err: any) {
      this.errorMessage = 'حدث خطأ، يرجى المحاولة مرة أخرى';
    } finally {
      this.isLoading = false;
    }
  }
}
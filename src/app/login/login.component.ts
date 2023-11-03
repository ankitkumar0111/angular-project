import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup ;
  showPassword: boolean = false;

  dummyEmail = "dummy@gmail.com";
  dummyPassword = "dummy"


  constructor(
    private formBuilder: FormBuilder  ) {
    
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  
   }

     get password() {
      return this.loginForm.get('password');
    }
  
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }

  get email() {
    return this.loginForm.get('email');
  }

  

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const formData = this.loginForm.value;
    console.log("formdata", formData);
    
    if(formData.email === this.dummyEmail && formData.password === this.dummyPassword){
      alert("Login Successfull")
      sessionStorage.setItem("isLogged", "true")
    }
    else{
      alert("Invalid credentials")
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : FormGroup;
  
  constructor(private fb:FormBuilder ,private http : HttpClient, private router:Router) { }

  ngOnInit(): void {
    
    this.form =this.fb.group({
      username : '',
      password : ''
    });

  }

  onSubmit()
  {
    const formData =this.form.getRawValue();
    // console.log(this.form.getRawValue());
    const data = {
      email      : formData.username,
      password      : formData.password,
      // grant_type    : 'password',
      // client_id     : 2,
      // client_secret : 'JnulhYJeQ6RrCd2929Om5tpJrrO8fhBSm6KEPkte',
      // scope         : '*'
    };

    this.http.post('http://localhost/BESPortal/API_JWT/api/login',data).subscribe(
      (result:any) => {
      //  console.log(result);
        // this.router.navigate(['/secure']);
        let statusCheck = result.status;
        if(statusCheck == 'success')
        {
          sessionStorage.setItem('access_token',result.access_token);
          this.router.navigate(['/secure']);
        }

        if(statusCheck == 'error')
        {
         
          alert("chgbchgV");
        }
        

       
      },
      error =>{
        console.log("error");
        console.log(error);
      }
    )
  }

}
function setItem(arg0: string, access_token: any) {
  throw new Error('Function not implemented.');
}


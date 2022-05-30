import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'  

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  name = 'Angular';  
    
  productForm: FormGroup;  
  constructor(private router:Router,private fb:FormBuilder) {

    this.productForm = this.fb.group({  
      name: '',  
      quantities: this.fb.array([]) ,  
    }); 
   }

  ngOnInit(): void {
  }

  quantities() : FormArray {  
    return this.productForm.get("quantities") as FormArray  
  }  

  newQuantity(): FormGroup {  
    return this.fb.group({  
      qty: '',  
      price: '',  
    })  
  }  
     
  addQuantity() {  
    this.quantities().push(this.newQuantity());  
  }  
     
  removeQuantity(i:number) {  
    this.quantities().removeAt(i);  
  }  
     
  onSubmit() {  
    console.log(this.productForm.value);  
  } 
  
  clearSession()
  {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}

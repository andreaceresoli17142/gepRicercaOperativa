import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GEP';

  numberOfShops: number | undefined = undefined;
  numberOfSuppliers: number | undefined = undefined

  inputForm = new FormGroup({
    numberOfShops: new FormControl(''),
    numberOfSuppliers: new FormControl(''),
  });

  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  dataSubmit(){
    console.log( this.inputForm.value );
    var formOutput = this.inputForm.value ;
    if ( formOutput.numberOfShops == '' || formOutput.numberOfSuppliers == '' ){
      this.inputForm.setValue( { numberOfShops:'', numberOfSuppliers: '' } );
      return;
    }

  }

}

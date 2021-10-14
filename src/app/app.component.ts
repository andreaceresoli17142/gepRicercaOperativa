import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GEP';
  formError: string | undefined = undefined;

  numberOfShops: number | undefined = undefined;
  numberOfSuppliers: number | undefined = undefined

  inputForm = new FormGroup({
    numberOfShops: new FormControl(''),
    numberOfSuppliers: new FormControl(''),
    nordOvestMethod: new FormControl(false),
    minimiCostiMethod: new FormControl(false),
    vogelMethod: new FormControl(false),
    russelMethod: new FormControl(false),
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
    var formOutput = this.inputForm.value ;
    if ( formOutput.numberOfShops == '' || formOutput.numberOfSuppliers == '' ){
      this.inputForm.setValue( { numberOfShops:'', numberOfSuppliers: '', nordOvestMethod: false, minimiCostiMethod: false, vogelMethod: false, russelMethod: false } );
      this.formError = "please insert both the number of shops and the number of suppliers";
      return;
    }

    if ( formOutput.nordOvestMethod == false && formOutput.minimiCostiMethod == false && formOutput.vogelMethod == false && formOutput.russelMethod == false ){
      this.inputForm.setValue( { numberOfShops:'', numberOfSuppliers: '', nordOvestMethod: false, minimiCostiMethod: false, vogelMethod: false, russelMethod: false } );
      this.formError = "please select at least one method";
      return;
    }

    this.formError = undefined;

    console.log( this.inputForm.value );
  }



}

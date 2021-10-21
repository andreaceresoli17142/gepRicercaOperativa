import { Component, Input } from '@angular/core';
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
  numberOfSuppliers: number | undefined = undefined;

  toChildForm: any = undefined;

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
      this.formError = "please insert both the number of shops and the number of suppliers";
      return;
    }
    if ( isNaN(Number(formOutput.numberOfShops)) || isNaN(Number(formOutput.numberOfSuppliers)) ){
      this.formError = "please insert only numbers in the number of shops and the number of suppliers";
      this.inputForm.setValue( { numberOfShops:'', numberOfSuppliers: '', nordOvestMethod: false, minimiCostiMethod: false, vogelMethod: false, russelMethod: false });
      return;
    }

    if ( formOutput.nordOvestMethod == false && formOutput.minimiCostiMethod == false && formOutput.vogelMethod == false && formOutput.russelMethod == false ){
      this.formError = "please select at least one method";
      return;
    }

    this.formError = undefined;

    //console.log( this.inputForm.value );
    //pass data to other angular component

    this.toChildForm = this.inputForm.value;

    this.inputForm.setValue( { numberOfShops:'', numberOfSuppliers: '', nordOvestMethod: false, minimiCostiMethod: false, vogelMethod: false, russelMethod: false } );
  }



}

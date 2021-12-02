import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { table } from 'src/assets/tableClass';

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
  nordOvestMethodFlag = false;
  minimiCostiMethodFlag = false;
  vogelMethodFlag = false;
  russelMethodFlag = false;

  execNO = false;
  execMM = false;
  execVogel = false;


  toChildForm: any = undefined;

  inputForm = new FormGroup({
    numberOfShops: new FormControl(0),
    numberOfSuppliers: new FormControl(0),
    totalResources: new FormControl(0),
    nordOvestMethod: new FormControl(false),
    minimiCostiMethod: new FormControl(false),
    vogelMethod: new FormControl(false),
    russelMethod: new FormControl(false),
  });

  dataSubmit(){
    var formOutput = this.inputForm.value ;
    if ( formOutput.numberOfShops < 1 || formOutput.numberOfSuppliers < 1 ){
      this.formError = "both the number of shops and the number of suppliers must be greater then 1";
      return;
    }

    if ( formOutput.totalResources < formOutput.numberOfShop || formOutput.totalResources < formOutput.numberOfSuppliers  ){
      this.formError = "there must be at least one resource per shop and suppluer";
      return;
    }

    // if ( isNaN(Number(formOutput.numberOfShops)) || isNaN(Number(formOutput.numberOfSuppliers)) ){
    //   this.formError = "please insert only numbers in the number of shops and the number of suppliers";
    //   this.inputForm.setValue( { numberOfShops:0, numberOfSuppliers: 0, nordOvestMethod: false, minimiCostiMethod: false, vogelMethod: false, russelMethod: false });
    //   return;
    // }

    if ( formOutput.nordOvestMethod == false && formOutput.minimiCostiMethod == false && formOutput.vogelMethod == false && formOutput.russelMethod == false ){
      this.formError = "please select at least one method";
      return;
    }

    this.formError = undefined;

    //console.log( this.inputForm.value );
    //pass data to other angular component

    // this.toChildForm = this.inputForm.value;
    if ( formOutput.totalResources == '' ){
      this.toChildForm = JSON.stringify(new table( undefined, parseInt(formOutput.numberOfShops), parseInt(formOutput.numberOfShops)));
    }else{
      this.toChildForm = JSON.stringify(new table( undefined, parseInt(formOutput.numberOfShops), parseInt(formOutput.numberOfShops), parseInt(formOutput.totalResources)));
    }
    // this.toChildForm = new table( numberOfShops:0, numberOfSuppliers: 0, totalResources: '' );


    this.nordOvestMethodFlag = this.inputForm.value.nordOvestMethod;
    this.minimiCostiMethodFlag = this.inputForm.value.minimiCostiMethod;
    this.vogelMethodFlag = this.inputForm.value.vogelMethod;
    this.russelMethodFlag = this.inputForm.value.russelMethod;

    this.execNO = this.nordOvestMethodFlag;
    this.execMM = this.minimiCostiMethodFlag;
    this.execVogel = this.vogelMethodFlag;

    this.inputForm.setValue( { numberOfShops:0, numberOfSuppliers: 0, totalResources: 0, nordOvestMethod: false, minimiCostiMethod: false, vogelMethod: false, russelMethod: false } );
  }

  getNOflag(event:any){
    this.execNO = event;
    console.log("fired no");
  }

  getMMflag(event:any){
    this.execMM = event;
    console.log("fired mm");

  }

  getVflag(event:any){
    this.execVogel = event;
    console.log("fired v");

  }

}

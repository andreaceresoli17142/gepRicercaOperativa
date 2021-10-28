import { Component, OnInit, Input} from '@angular/core';
import {table} from 'src/assets/tableClass';

@Component({
  selector: 'app-data-elaboration',
  templateUrl: './data-elaboration.component.html',
  styleUrls: ['./data-elaboration.component.css']
})
export class DataElaborationComponent implements OnInit {
  // matrix:any = undefined;
  // columnHeaders:any = undefined;
  // rowHeaders:any = undefined;
  dataTable: table = new table();


  @Input()
  set formInput(input:any){
    if ( input != undefined ){
      if ( input.totalResources == '' )
        this.dataTable = new table( parseInt(input.numberOfShops), parseInt(input.numberOfShops));
      else
        this.dataTable = new table( parseInt(input.numberOfShops), parseInt(input.numberOfShops), parseInt(input.totalResources));
    }
  }

  constructor() { }

  ngOnInit(): void {

  }

}

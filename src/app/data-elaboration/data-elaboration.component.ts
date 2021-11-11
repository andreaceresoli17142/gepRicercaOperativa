import { Component, OnInit, Input} from '@angular/core';
import {table} from 'src/assets/tableClass';
import { Util } from 'src/assets/utilClass';

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
  totalCost: number = 0;
  util!: Util;

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

  async exexuteIter(){
    var dataTable = this.dataTable;
    var buyerI = 0;
    var sellerI = 0;

    while( dataTable.sellersTotal.length != 0 && dataTable.buyersTotal != 0 ){
      // se la richiesta é uguale o inferiore della domanda soddisfiamo completamente la richiesta con in primo venditore disponibile
      let tobuy = dataTable.buyersTotal[buyerI];

      console.log ( "B"+buyerI+" requested: " + dataTable.buyersTotal[buyerI] )
      console.log ( "S"+sellerI+" given: " + dataTable.sellersTotal[sellerI] )

      if ( tobuy <= dataTable.sellersTotal[sellerI] ){

        this.totalCost += tobuy * dataTable.transportCostMatrix[sellerI][buyerI];
        dataTable.removeColumn(buyerI);
        if( dataTable.sellersTotal[sellerI] == tobuy){
          dataTable.removeRow(sellerI);
        }
        dataTable.sellersTotal[sellerI] -=tobuy;
        // dataTable.debug();
        continue;
        //return;
      }

      // se la richiesta é maggiore della domanda soddisfiamo la massima quantià che possiamo con il primo venditore disponibile
      this.totalCost += dataTable.sellersTotal[sellerI] * dataTable.transportCostMatrix[sellerI][buyerI];
      dataTable.buyersTotal[buyerI] -= dataTable.sellersTotal[sellerI];
      dataTable.removeRow(sellerI);

      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    dataTable.debug();

  }

}

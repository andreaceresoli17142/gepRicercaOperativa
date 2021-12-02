import { Component, OnInit, Input} from '@angular/core';
import {table} from 'src/assets/tableClass';
import { Util } from 'src/assets/utilClass';

@Component({
  selector: 'app-vogel',
  templateUrl: './vogel.component.html',
  styleUrls: ['./vogel.component.css']
})
export class VogelComponent implements OnInit {

  dataTable: table = new table();
  totalCost: number = 0;
  util!: Util;
  // tempTable: table = new table();

  @Input()
  set formInput(input:any){
    if ( input != undefined ){
      this.dataTable = new table(input);
      // this.tempTable = new table(input);
      this.executeIter();
    }
  }

  constructor() { }

  ngOnInit(): void {

  }

  async executeIter0(){
    
    var dataTable = this.dataTable;
    var buyerI = 0;
    var sellerI = 0;
    let totalSold = 0;
      // se la richiesta é uguale o inferiore della domanda soddisfiamo completamente la richiesta con in primo venditore disponibile
      let selectedIndexes = dataTable.getTableCoord_vogel();
      console.log(selectedIndexes);

  }

  async executeIter(){
    await new Promise(resolve => setTimeout(resolve, 2000));

    var dataTable = this.dataTable;
    var buyerI = 0;
    var sellerI = 0;
    let totalSold = 0;
    while( dataTable.sellersTotal.length > 0 && dataTable.buyersTotal.length > 0 ){
      // se la richiesta é uguale o inferiore della domanda soddisfiamo completamente la richiesta con in primo venditore disponibile
      let selectedIndexes = dataTable.getTableCoord_vogel();
      sellerI = selectedIndexes[0];
      buyerI = selectedIndexes[1];
      let tobuy = dataTable.buyersTotal[buyerI];

      if ( tobuy <= dataTable.sellersTotal[sellerI] ){
        this.totalCost += tobuy * dataTable.transportCostMatrix[sellerI][buyerI];
        dataTable.removeColumn(buyerI);
        if( dataTable.sellersTotal[sellerI] == tobuy){
          dataTable.removeRow(sellerI);
        }
        dataTable.sellersTotal[sellerI] -=tobuy;
        continue;
        // return;
      }
      // se la richiesta é maggiore della domanda soddisfiamo la massima quantià che possiamo con il primo venditore disponibile
      this.totalCost += dataTable.sellersTotal[sellerI] * dataTable.transportCostMatrix[sellerI][buyerI];
      dataTable.buyersTotal[buyerI] -= dataTable.sellersTotal[sellerI];
      dataTable.removeRow(sellerI);

      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    console.log( "endend nord ovest" );

  }
}

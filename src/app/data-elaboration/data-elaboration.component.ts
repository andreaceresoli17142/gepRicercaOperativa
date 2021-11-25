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
      this.dataTable = new table(input);
      this.executeIter();
    }
  }

  constructor() { }
  
  ngOnInit(): void {
  }
  
  async executeIter(){
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    var dataTable = this.dataTable;
    var buyerI = 0;
    var sellerI = 0;
    let totalSold = 0;
    while( dataTable.sellersTotal.length > 0 && dataTable.buyersTotal.length > 0 ){
      // console.log(`sellers lenght is ${dataTable.sellersTotal.length} and buyers lenght is ${dataTable.buyersTotal.length}`);
      // se la richiesta é uguale o inferiore della domanda soddisfiamo completamente la richiesta con in primo venditore disponibile
      let tobuy = dataTable.buyersTotal[buyerI];

      if ( tobuy <= dataTable.sellersTotal[sellerI] ){
        // console.log(`buyer is going to buy ${tobuy} and seller is going to sell ${tobuy}`);
        // totalSold += tobuy;
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
      // totalSold += dataTable.sellersTotal[sellerI];
      // console.log(`buyer is going to buy ${dataTable.sellersTotal[sellerI]} and seller is going to sell ${dataTable.sellersTotal[sellerI]}`);
      dataTable.removeRow(sellerI);

      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    // console.log( `total sold is ${totalSold}` );
    console.log( "endend nord ovest" );

  }

}

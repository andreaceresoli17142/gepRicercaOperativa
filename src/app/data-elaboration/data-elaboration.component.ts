import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-data-elaboration',
  templateUrl: './data-elaboration.component.html',
  styleUrls: ['./data-elaboration.component.css']
})
export class DataElaborationComponent implements OnInit {
  matrix:any = undefined;
  headers:any = undefined
  @Input()
  set formInput(input:any){
    if ( input != undefined )
      this.generateRandomMatrix( parseInt(input.numberOfShops), parseInt(input.numberOfShops));
  }

  constructor() { }

  ngOnInit(): void {

  }

  generateRandomMatrix( sellers: number, buyers: number ): any{
    var retMat = new Array(buyers);
    var buyersReq = this.splitNumberInSubnumbers( sellers*buyers*100, buyers )
    var sellersReq = this.splitNumberInSubnumbers( sellers*buyers*100, sellers )

    for( let i = 0; i < buyers; i++ ){
      retMat[i] = "B" + i;
    }

    this.headers = retMat;

    retMat = [];

    //retMat.push( "S" + i );
    for( let t = 1; t < buyers; t++ ){
      retMat.push(Math.floor(Math.random() * 100 ));
    }

    /*for( let i = 0; i < buyers; i++ ){
      retMat[i] = Math.floor(Math.random() * 100 )
    }*/
  }

  splitNumberInSubnumbers( startingNum: number, numberOfSub: number ): any{
    var maxNum = startingNum/numberOfSub;
    var minNum = 1;
    var subTotal = startingNum;
    var dividedNums = [];
    let subDiv = undefined;
    for( let i = 0; i < numberOfSub; i++ ){
      subDiv = this.randNumber( maxNum, minNum );
      subTotal = subTotal - subDiv;
      dividedNums.push(subDiv);
    }

    for( let i = 0; 0 < subTotal; subTotal-- ){
      dividedNums[ i%(dividedNums.length-1) ] ++;
      i++;
    }

    return dividedNums;
  }

  randNumber( maxNum: number, minNum :number ){
    return Math.floor(Math.random()* (maxNum - minNum))+minNum ;
  }

}

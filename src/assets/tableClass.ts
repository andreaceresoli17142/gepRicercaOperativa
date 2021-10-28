export class table{
  filled:boolean;
  rowHeaders:any = [];
  columnHeaders:any = [];
  buyersTotal:any = [];
  sellersTotal:any = [];
  transportCostMatrix: any = [];
  totalResources:number;

  constructor( sellers?: number, buyers?: number, totalResources?: number) {

    if ( !sellers && !buyers){
      this.filled = false;
      this.totalResources = 0;
      return;
    }

    this.filled = true;

    if ( !totalResources ){
      this.totalResources = sellers! * buyers! * 100;
    } else {
      this.totalResources = totalResources!;
    }

    var tempMat:Array<any> = [];
    // var buyersReq = this.splitNumberInSubnumbers( totalResources, buyers! )
    // var sellersReq = this.splitNumberInSubnumbers( totalResources, sellers! )
    this.buyersTotal = this.splitNumberInSubnumbers( this.totalResources, buyers! )
    this.sellersTotal = this.splitNumberInSubnumbers( this.totalResources, sellers! )

    for( let i = 0; i < buyers!; i++ ){
      tempMat.push( "B" + i );
    }

    this.columnHeaders = tempMat;

    tempMat = [];

    for( let i = 0; i < sellers!; i++ ){
      tempMat.push( "S" + i );
    }

    this.rowHeaders = tempMat;

    tempMat = [];

    for( let i = 0; i < sellers!; i++ ){
      tempMat.push( [] );
      for( let t = 1; t < buyers!+1; t++ ){
        tempMat[i].push(Math.floor(Math.random() * 100 ));
      }
      // tempMat[i].push( sellersReq[i] );
    }

    // for( let i = 0; i < buyers!; i++ ){
    //   tempMat[tempMat.length-1].push(buyersReq[i]);
    // }


    // tempMat[tempMat.length-1].push( totalResources );

    this.transportCostMatrix = tempMat;
  }

  private splitNumberInSubnumbers( startingNum: number, numberOfSub: number ): any{
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
      dividedNums[ i%(dividedNums.length) ] ++;
      i++;
    }

    return dividedNums;
  }

  private randNumber( maxNum: number, minNum :number ){
    return Math.floor(Math.random()* (maxNum - minNum))+minNum ;
  }


}

export class table{
  public filled:boolean;
  public rowHeaders:any = [];
  public columnHeaders:any = [];
  public buyersTotal:any = [];
  public sellersTotal:any = [];
  public transportCostMatrix: any = [];
  public totalResources:number;

  public constructor( copiedData?:string, sellers?: number, buyers?: number, totalResources?: number) {

    if ( copiedData != undefined ){

      let p = JSON.parse(copiedData);
      this.filled = p.filled;
      this.rowHeaders = p.rowHeaders;
      this.columnHeaders = p.columnHeaders;
      this.buyersTotal = p.buyersTotal;
      this.sellersTotal = p.sellersTotal;
      this.transportCostMatrix = p.transportCostMatrix;
      this.totalResources = p.totalResources;
      return;
    }

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
        tempMat[i].push(Math.floor(Math.random() * 99 )+1);
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

  public removeRow( i:number ){
    this.transportCostMatrix.splice(i,1);
    this.sellersTotal.splice(i,1);
    this.rowHeaders.splice(i,1);
  }

  public removeColumn( i:number ){
    for (const row of this.transportCostMatrix) {
      row.splice(i,1);
    }
    this.buyersTotal.splice(i,1);
    this.columnHeaders.splice(i,1);
  }

  public findSmallestTransport(){
    var minValue = 100;
    var buyerI = 0;
    var sellerI = 0;

    for ( let i = 0; i < this.sellersTotal.length; i++ ){
      for ( let t = 0; t < this.buyersTotal.length; t++ ){
        if ( this.transportCostMatrix[i][t] < minValue ){
          minValue = this.transportCostMatrix[i][t];
          sellerI = i;
          buyerI = t;
        }
      }
    }
    return [ sellerI, buyerI ];
  }

  /*public clone( ){
    var newObj = new table(1,1);
    newObj.filled = this.filled;
    newObj.rowHeaders = this.rowHeaders;
    newObj.columnHeaders = this.columnHeaders;
    newObj.buyersTotal = this.buyersTotal;
    newObj.sellersTotal = this.sellersTotal;
    newObj.transportCostMatrix = this.transportCostMatrix;
    newObj.totalResources = this.totalResources;
    return newObj;
  }*/

  public debug(){

    // for (let i = 0; i < this.rowHeaders.length; i++) {
    //   console.
    // }

  }

}

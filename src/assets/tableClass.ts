export class table{
  public filled:boolean;
  public rowHeaders:any = [];
  public columnHeaders:any = [];
  public buyersTotal:any = [];
  public sellersTotal:any = [];
  public transportCostMatrix: any = [];
  public totalResources:number;

  // public constructor( args[] )
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


    for( let i = 1; i <= buyers!; i++ ){
      tempMat.push( "B" + i );
    }

    this.columnHeaders = tempMat;

    tempMat = [];

    for( let i = 1; i <= sellers!; i++ ){
      tempMat.push( "S" + i );
    }

    this.rowHeaders = tempMat;

    tempMat = [];

    for( let i = 0; i < sellers!; i++ ){
      tempMat.push( [] );
      for( let t = 0; t < buyers!; t++ ){
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
    // console.log(this.sellersTotal.length);
    // console.log( this.transportCostMatrix.length );
    // console.log( JSON.stringify(  this.transportCostMatrix ) );
    var minValue = 101;
    var buyerI = 0;
    var sellerI = 0;

    for ( let i = 0; i < this.sellersTotal.length; i++ ){
      for ( let t = 0; t < this.buyersTotal.length; t++ ){
        // console.log( "seller: "+i );
        // console.log( "buyer: "+t );
        if ( this.transportCostMatrix[i][t] < minValue ){
          minValue = this.transportCostMatrix[i][t];
          sellerI = i;
          buyerI = t;
        }
      }
    }
    return [ sellerI, buyerI ];
  }

  public getTableCoord_vogel(){
    var table = this.transportCostMatrix;
    var choosedBuyer = 0;
    var choosedSeller = 0;
    var mostCostlyBuyer = -1;
    var mostCostlySeller = -1;
    let rInc = 0;
    let cInc = 0;
    for(let row of table){
      let firstMinS = 101;
      let firstMinCellS = 0;
      let secMinS = 101;

      for (let cell of row){
        // choosing seller
        if (cell < firstMinS){
          firstMinS = cell;
          firstMinCellS = cInc;
        }
        // end of choosing seller
        cInc = (cInc+1)%table.length;
      }
      for (let cell of row){
        // choosing seller
        if (cell < secMinS && cInc != firstMinCellS){
          secMinS = cell;
        }
        // end choosing seller
        cInc = (cInc+1)%table.length;
      }

      // choosing seller
      if (mostCostlySeller < (secMinS - firstMinS)){
        mostCostlySeller = secMinS - firstMinS;
        choosedSeller = rInc;
        console.log("mostcost seller: " + mostCostlySeller + " -> " + rInc );
      }
      // end of choosing seller

      rInc++;
    }

    rInc = 0;
    cInc = 0;

    for (let i = 0; i < table[0].length ;i++) {
      let firstMinB = 101;
      let firstMinCellB = 0;
      let secMinB = 101;

      for(let row of table){
        if (row[i] < firstMinB){
          firstMinB = row[i];
          firstMinCellB = cInc;
          cInc = (cInc+1)%table.length;
        }
      }

      cInc = 0

      for(let row of table){
        if (row[i] < secMinB && (cInc+1)%table.length != firstMinCellB){
          secMinB = row[i];
          firstMinCellB = (cInc+1)%table.length;
          cInc = (cInc+1)%table.length;
        }
      }
      console.log(secMinB + ":" + firstMinB);
      if (mostCostlyBuyer < (secMinB - firstMinB)){
        mostCostlyBuyer = secMinB - firstMinB;
        console.log(((cInc))%table.length);
        choosedBuyer = ((cInc))%table.length;
        if (choosedBuyer == -1 ){
          choosedBuyer = table.length -1;
        }
        console.log(cInc + " -- " +table.length);
        console.log("mostcost buyer: " + mostCostlyBuyer + " -> " + choosedBuyer );
      }

      rInc++;
    }

    console.log("returning: " + choosedSeller + ":" + choosedBuyer);
    // this.count();
    return [choosedSeller, choosedBuyer];
  }

  public count () {
    let i = 100;
     while(i >0){

      console.log(((i-1))%6);
      i--;


     }
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

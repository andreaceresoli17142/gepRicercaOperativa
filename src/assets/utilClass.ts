export abstract class Util{

  public delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

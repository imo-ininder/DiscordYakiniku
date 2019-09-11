module.exports = class Niku {
    constructor(tpye){
      this.tpye = tpye;
      this.maxDegree = this.getDegreeByType(tpye);
      this.currentDegree = 0;
      this.updateTime = Date.now();
    }

    addDegree(currentCheckTime){
      var upper = Math.floor((currentCheckTime - this.updateTime)/1000);
      var lower = Math.floor(upper / 2)
      this.currentDegree += this.getRandom(lower, upper)
      this.updateTime = currentCheckTime;
    }
  
    isCooked(){
      if((this.maxDegree * 0.8) > this.currentDegree){
        return "這塊" + this.tpye + "看起來還是生的"
      }else if((this.maxDegree * 1.3) < this.currentDegree){
        return "這塊" + this.tpye + "已經烤焦了";
      }
      else{
        return "這塊" + this.tpye + "看起來是熟的了吧";
      }
    }

    getPrciseStatus(){
      if((this.maxDegree * 0.95) > this.currentDegree){
        return "拿到生" + this.tpye + ", 哭哭喔!"
      }else if((this.maxDegree * 1.2) < this.currentDegree){
        return "拿到烤焦的" + this.tpye + ", 哭哭喔!";
      }
      else{
        return "拿到完美的" + this.tpye + ", 恭喜他!";
      }
    }
  
    canTake(){
      return ((this.maxDegree * 0.95) < this.currentDegree && (this.maxDegree * 1.2) > this.currentDegree)
    }

    getType(){
        return this.tpye;
    }

    getStatus(){
      return this.tpye + " is " + this.currentDegree + " degree, and max degree is " + this.maxDegree;
    }

    getDegreeByType(tpye){
      var degree = 0;
      switch(tpye) { 
        case "牛肉":
            degree = this.getRandom(90, 120)
            break;             
     
        case "豬肉":
            degree = this.getRandom(70, 100)
            break;
        
        case "羊肉":
            degree = this.getRandom(80, 110)
            break; 
      } 
      return degree;
    }

    getRandom( min, max ) {
      var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
    
      return random;
    }

}
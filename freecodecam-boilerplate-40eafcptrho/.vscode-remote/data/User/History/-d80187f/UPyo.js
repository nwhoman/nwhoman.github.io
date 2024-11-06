function ConvertHandler() {
  
  this.getNum = function(input) {
    const neg = /-/;
    const multDot = /\d*\.\d*\.\d*/g;
    const multParen = /^\/\d*|\d*\/\d*\/\d*/g;
    //const numPart = /\d*\.?\d*\/?\d*/g;
    const numPart = /[\d\/\.]*/;
    if (input.match(neg) || input.match(multDot) || input.match(multParen)) {
      return 'invalid number'
    }
    const arr = input.match(numPart);
    let newNum = Number.parseFloat(0);
    arr.forEach((item) => {
      const divide = item.split(/\//);
      if (divide.length == 2){
        const dividedNumber = Number.parseFloat(divide[0])/Number.parseFloat(divide[1])
        newNum = newNum + dividedNumber;
      } else {
        if (item != ""){
          newNum = newNum + Number.parseFloat(item);
        } else {
          newNum = newNum + Number.parseFloat(1);
        }
      }
    })
    return newNum.toFixed(5);
  };
  
  this.getUnit = function(input) {
    const unit = /gal$|km$|l$|mi$|kg$|lbs$/i;
    const arr = input.match(unit);
    if (arr) {
      if (arr[0] == 'l'){
        arr[0] = 'L'
      } else {
        console.log(arr[0].toLowerCase());
      }
    }
    return arr ? arr[0] : 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    switch (initUnit) {
      case 'km': return 'mi';
      case 'mi': return 'km';
      case 'kg': return 'lbs';
      case 'lbs': return 'kg';
      case 'L': return 'gal';
      case 'gal': return 'L';
      default: return 'invalid unit';
   }
  };

  this.spellOutUnit = function(unit) {
    switch (unit) {
       case 'km': return 'kilometers';
       case 'mi': return 'miles';
       case 'kg': return 'kilograms';
       case 'lbs': return 'pounds';
       case 'L': return 'liters';
       case 'gal': return 'gallons';
       default: return 'invalid unit';
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case 'km': return (initNum / miToKm).toFixed(5);
      case 'mi': return (initNum * miToKm).toFixed(5);
      case 'kg': return (initNum * lbsToKg).toFixed(5);
      case 'lbs': return (initNum / lbsToKg).toFixed(5);
      case 'L': return (initNum / galToL).toFixed(5);
      case 'gal': return (initNum * galToL).toFixed(5);
      default: return 'nvalid number';
   }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;

var myAtoi = function(str) {

    var numList = ['0','1','2','3','4','5','6','7','8','9'];
    var is_positive = true;
    var conversionDict = {'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9};
    var result = 0;

    str = str.trim();
    var size = str.length;
    if (str.length == 0) { return 0; }

    //check for symbols
    if (str[0] == '-') {
        is_positive = false;
        //remove the symbol
        str = str.substring(1, size);
    }
    else if (str[0] == '+') {
        is_positive = true;
        //remove the symbol
        str = str.substring(1, size);
    }

    for (var i = 0; i < str.length; i++) {
        if (numList.indexOf(str[i]) == -1) {
            //read till here
            if (i == 0) { return 0; } 
            else {
                str = str.substring(0, i);
                break;
            }
        }
    }

    var index = str.length - 1;
    for (var j = 0; j < str.length; j++) {
        var currStr = str[j];
        var currInt = Math.pow(10, index) * (conversionDict[currStr]);
        result += currInt;
        index -= 1;
    }

    if (!is_positive) { result = -result; }

    if (result < -2147483648) {
        return -2147483648; 
    } 
    else if (result > 2147483647) { 
        return 2147483647; 
    }
    return result;

};

console.log(myAtoi("2147483648"));
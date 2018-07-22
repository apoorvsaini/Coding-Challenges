function checker(allowedIncrease,inputs,windowSize) {
    var initialIndex = 0;
    var windowIncrease = -1;
    for (var k = 0; k < inputs.length; k++) {
        var sum = 0;
        var count = 0;
        var lastWindowAvg = 0;
    
        if (k < windowSize) { initialIndex = 0; }
        else { initialIndex += 1 ; }
    
        for (var i = initialIndex; i < initialIndex+windowSize; i++ ) {
            sum += inputs[i];
            count += 1;
            console.log(sum/count);
            console.log("running "+k);
            if (sum/count >= allowedIncrease) {
                return "true";
            }
            lastWindowAvg = sum/count;
        }
    
        if (lastWindowAvg >= allowedIncrease) {
            return "true";
        }
    }
    return "false";
}

var allowedIncrease = 2.5;
var inputs = [1,1,2,100,2];
var windowSize = 3;

console.log(checker(allowedIncrease,inputs,windowSize));
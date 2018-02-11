var divide = function(dividend, divisor) {

    var negative_multiplier = 1;
    if (dividend < 0 && divisor >= 0) { negative_multiplier = -1; }
    else if (divisor < 0 && dividend >= 0) { negative_multiplier = -1; }
    else if (divisor < 0 && dividend < 0) { negative_multiplier = 1; }

    divisor = Math.abs(divisor);
    dividend = Math.abs(dividend);
    //console.log(dividend+" "+divisor);

    var final_reuslt = (recur_divide(0, dividend, divisor));
    if (final_reuslt == 0) { return 0; }
    else { 
        if (negative_multiplier == -1) { return -final_reuslt; }
        else { return final_reuslt; }
    }
};

var recur_divide = function(quo, dividend, divisor) {
    
    if (dividend < divisor) {
        return 0;
    }   
    else {
        while(dividend >= divisor) {
            dividend = dividend - divisor;
            quo += 1;
        }
        return quo;
    }
        
};

console.log(divide(-2147483648,-1));
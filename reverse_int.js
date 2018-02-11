var reverse = function(x) {
    
    var is_positive = true;
    if(x < 0) {
        is_positive = false;
    }

    x = Math.abs(x);
    var str = String(x);
    var str_array = str.split("");
    var result_string = "";


    
    for (var i = str_array.length - 1; i >= 0; i--) {
        result_string += str_array[i];
    }

    var result_int = parseInt(result_string);
    if(!is_positive) { result_int =  parseInt("-"+result_string); }

    if (result_int < -2147483648 || result_int > 2147483647) { return 0; }
    return result_int;

};

console.log(reverse(123));
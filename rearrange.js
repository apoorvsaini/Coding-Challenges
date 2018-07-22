function reArrange(str) {
    let tempArr = [];
    let sum = 0;
    let finalString = '';

    for (var i = 0; i < str.length; i++) {
        let element = parseInt(str[i]);
        if (isNaN(str[i])) {
            tempArr.push(str[i]);
        }
        else {
            let num = parseInt(str[i]);
            sum += num;
        }
    }

    tempArr = tempArr.sort();
    for (var j = 0; j < tempArr.length; j++) {
        finalString += tempArr[j];
    }

    return finalString+sum;
}

console.log(reArrange("ACCBA10D2EW30"));
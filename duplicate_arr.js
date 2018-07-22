var removeDuplicates = function(nums) {
    
    var newArray;
    newArray.push(nums[0]);
    for (var k = 1; k < nums.length; k++) {
        if (nums[k] != newArray[newArray.length - 1]) {
            newArray.push(nums[k]);
        }
    }
    
    return newArray;
};
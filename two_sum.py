class Solution(object):
    def twoSum(nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        one_pass = dict()
        result = []
        
        for i in range(0,len(nums)):
            diff = target - nums[i]
            if diff in one_pass:
                result.append(one_pass[diff]) 
                result.append(i)
                break
            one_pass[nums[i]] = i

        print result

    twoSum([2, 7, 11, 15],9)
            
        
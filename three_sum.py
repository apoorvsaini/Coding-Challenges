#----------INCOMPLETE---------
class Solution(object):
    def threeSum(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
        """
        non_zero_list = []
        result_list = []
        result_set = []
        last = 0
        second_last = 0

        #find consecutive zero sums
        for i in range(0, len(nums)):
            if i > 1:
                if last + second_last + nums[i] == 0:
                    if last not in result_set and second_last not in result_set and nums[i] not in result_set:
                        temp = []
                        temp.append(last)
                        temp.append(second_last)
                        temp.append(nums[i])
                        result_list.append(temp)

                        result_set.append(last)
                        result_set.append(second_last)
                        result_set.append(nums[i])

                        last = second_last
                        second_last = nums[i]
                else:
                    last = second_last
                    second_last = nums[i]
                    non_zero_list.append(nums[i]) 

            elif i == 0:
                last = nums[i]
                non_zero_list.append(nums[i]) 

            elif i == 1:
                second_last = nums[i]
                non_zero_list.append(nums[i]) 
        
        print result_list
        print non_zero_list
        print result_set



obj = Solution()
obj.threeSum([2, 3, 0, 4,-2, -2])
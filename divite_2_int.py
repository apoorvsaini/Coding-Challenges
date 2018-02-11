#------Divide Two Integers-----
class Solution(object):
    def recur_divide (self, quo, dividend, divisor):
        if dividend < divisor:
            return 0
        else:
            remainder = dividend - divisor
            if remainder >= divisor:
                return self.recur_divide(quo + 1, remainder, divisor)
            else:
                return quo + 1

    def divide(self, dividend, divisor):
        """
        :type dividend: int
        :type divisor: int
        :rtype: int
        """
        return self.recur_divide(0, dividend, divisor)
        



obj = Solution()
print obj.divide(4,5) #result should be 3
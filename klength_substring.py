def mainFunction(inputString, num):
    substring = ''
    result = []

    for k in xrange(0, len(inputString)):
        # reset substring before covering other characters
        substring = ''

        if k - 1 < len(inputString) - num: 
            substring += inputString[k]
            for i in range(k+1, len(inputString)):
                if len(substring) >= num:
                    break
                if inputString[i] not in substring:
                    substring += inputString[i]
                else:
                    substring = ''
                    break

        # filter out non-qualifying substrings
        if len(substring) > 0 and substring not in result:
            result.append(substring)
    
    return result
            

print mainFunction("abcabc",3)



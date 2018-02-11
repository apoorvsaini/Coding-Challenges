from datetime import datetime, date, time, timedelta
import re
import os

file = open(os.path.expanduser('~/Documents/test/leetcode/input002.txt'), 'r')

def ipv6Validation():
    pattern = '[0-9A-Fa-f]{1,4}'  # Four hex digits
    regex = '^({0})(:{0}){{7}}$'.format(pattern)
    res = re.compile(regex)
    return res

def ipv4Validation():
    pattern = '([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])'
    regex = '^{0}(\.{0}){{3}}$'.format(pattern)
    res = re.compile(regex)
    return res


i = 0
for line in file:
    if i > 0:
        ipv4Res = ipv4Validation()
        ipv6Res = ipv6Validation()

        
        if ipv4Res.match(line):
            print('IPv4')
        elif ipv6Res.match(line):
            print('IPv6')
        else:
            print('Neither')
    
    i += 1
from datetime import datetime, date, time, timedelta
import re
import os

file = open(os.path.expanduser('~/Documents/test/leetcode/input001.txt'), 'r')
lines=[]
invalid_response = '500'
success_dict = dict() #date_time_endpoint: [success, failure]

for line in file:
    #Clean up each line
    line = line.replace('[', '') .replace(']', '').replace('"', '')
    components = line.split()

    date_stamp = components[3].split(':')[0]
    time_stamp = components[3].split(':')[1]+':'+components[3].split(':')[2]
    gmt_stamp = components[4]
    endpoint = components[6].split('?')[0]
    status = components[8]
    endpoint_stripped = endpoint.split('/')[-1]

    #add gmt_stamp to date_stamp
    date_object = datetime.strptime(date_stamp+' '+time_stamp, '%d/%b/%Y %H:%M').strftime('%d-%m-%Y %H:%M') 
    hh_diff = int(gmt_stamp[1:3])
    mm_diff = int(gmt_stamp[3:5])
    if gmt_stamp[0] == '+':
        date_object = (datetime.strptime(date_stamp+' '+time_stamp, '%d/%b/%Y %H:%M') + timedelta(hours=hh_diff,minutes=mm_diff) ).strftime('%d-%m-%Y %H:%M') 
    else:
        date_object = (datetime.strptime(date_stamp+' '+time_stamp, '%d/%b/%Y %H:%M') - timedelta(hours=hh_diff,minutes=mm_diff) ).strftime('%d-%m-%Y %H:%M') 
    #-------------------------

    success_index = date_object.split(' ')[0]+"T"+date_object.split(' ')[1]+"$"+endpoint
    if success_index in success_dict:
        if status != invalid_response:
            success_dict[success_index][0] += 1
        else:
            success_dict[success_index][1] += 1
    else:
        success_dict[success_index] = [0,0]
        if status != invalid_response:
            success_dict[success_index][0] += 1
        else:
            success_dict[success_index][1] += 1

    #print date_object+"T"+time_stamp+" "+gmt_stamp+" "+endpoint+" "+status+" "+endpoint_stripped

success_list = sorted(list(success_dict))

for key in success_list:
    perc = (float(success_dict[key][0]) / float(success_dict[key][0]+success_dict[key][1])) * 100
    print key.split('$')[0]+" "+key.split('$')[1]+" "+"{0:.2f}".format(perc)

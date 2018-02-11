#Timeseries aggregation 

from datetime import datetime, date, time, timedelta
import re
import os



def aggregator(data_list):
    for line in data_list:
        event_date = line.split(',')[0].strip()
        event_month = event_date.split('-')[0].strip()+"-"+event_date.split('-')[1].strip()
        event_name = line.split(',')[1].strip()
        event_count = int(line.split(',')[2].strip())
        
        date_object = datetime.strptime(event_month, '%Y-%m')

        if event_month in aggregate_dict:
            if event_name in aggregate_dict[event_month]:
                aggregate_dict[event_month][event_name] += event_count
            else:
                aggregate_dict[event_month][event_name] = event_count
        else:
            if date_object < end_date and date_object >= start_date:
                aggregate_dict[event_month] = dict()
                aggregate_dict[event_month][event_name] = event_count

    aggregate_list = sorted(list(aggregate_dict), reverse=True)

    for key in aggregate_list:
        print key+"".join(", "+str(key)+", "+str(value) for key, value in sorted(aggregate_dict[key].items()))



main_data = []
aggregate_dict = dict() #month: {event_name: count, ...}

date_range = raw_input()
date_range.strip()
start_date = datetime.strptime(date_range.split(',')[0].strip(), '%Y-%m')
end_date = datetime.strptime(date_range.split(',')[1].strip(), '%Y-%m')

raw_input() #for extra new line input

while 1:
    try:
        data = raw_input()
        if len(data.strip()) == 0:
            break
        main_data.append(data)
    except:
        break

aggregator(main_data)

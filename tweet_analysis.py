tweet_size = int(raw_input())
a = []
for i in range(0, tweet_size):
    a.append(int(raw_input()))
k = int(raw_input())

total = 0
counter = 0
max_count = 0

for i in range(len(a)):

    if ((total + a[i]) <= k):
        total += a[i]
        counter += 1
    
    elif total != 0:
        total = total - a[i - counter] + a[i] 
        
    # keep track of max length.
    max_count = max(counter, max_count)
print max_count
    

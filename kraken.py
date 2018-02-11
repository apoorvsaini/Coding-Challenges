def uniquePaths(m, n):
    if not m or not n:
        return 0
    cur = [1] * n
    for i in xrange(1, m):
        for j in xrange(1, n):
            cur[j] += cur[j-1]
    print cur[-1]

uniquePaths(10,10)
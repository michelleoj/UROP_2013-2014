#!/usr/bin/python2.7

f = open('actions_clean.txt', 'r')
count = {}
for line in f:
    tokens = line.split("\t")
    identifier = tokens[0]+"&stimID="+tokens[1]
    if identifier not in count:
        count[identifier] = 1
    else:
        count[identifier] += 1
f.close()
w = open('actions_count.txt', 'w')
for key in count.keys():
    ids = key.split("&stimID=")
    userid = ids[0]
    stimid = ids[1]
    actions = count[key]
    entry = "\""+userid+"\",\""+stimid+"\",\""+str(actions)+"\"\n"
    w.write(entry)
w.close()
print "write done"

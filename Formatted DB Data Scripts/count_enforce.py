#!/usr/bin/python2.7

f = open('enforcement_clean.txt', 'r')
softcount = {}
hardcount = {}
for line in f:
    tokens = line.split("\t")
    identifier = tokens[0]+"&stimID="+tokens[1]
    if (identifier not in hardcount and tokens[3]=="hardEnforce"):
        hardcount[identifier] = 1
    elif tokens[3]=="hardEnforce":
        hardcount[identifier] += 1
    elif (identifier not in softcount and tokens[3]=="softEnforce"):
        softcount[identifier] = 1
    elif tokens[3]=="softEnforce":
        softcount[identifier] += 1
f.close()
w = open('enforcement_count.txt', 'w')
for key in softcount.keys():
    ids = key.split("&stimID=")
    userid = ids[0]
    stimid = ids[1]
    soft = softcount[key]
    if key in hardcount:
        hard = hardcount[key]
    else:
        hard = 0
    entry = "\""+userid+"\",\""+stimid+"\",\""+str(soft)+"\",\""+str(hard)+"\"\n"
    w.write(entry)
for key in hardcount.keys():
    if key not in softcount:
        ids = key.split("&stimID=")
        userid = ids[0]
        stimid = ids[1]
        hard = hardcount[key]
        entry = "\""+userid+"\",\""+stimid+"\",\"0\",\""+str(hard)+"\"\n"
        w.write(entry)
w.close()
print "write done"

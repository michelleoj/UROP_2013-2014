import csv
from sets import Set

mit = []
gongos = []
with open('1stcol-1.csv', 'rU') as f1: #Gongos
    c1 = csv.DictReader(f1, delimiter=",")
    gongos = [row['PID'] for row in c1]
    f1.close()
    
f = open('UROP_querysearch2.txt')#MIT

for line in f:
      pid = line.rstrip('\n')
      mit.append(pid)
    
f.close()


print mit[-5:-1]
num_of_matches = 0




##for name1 in mit:
##    print name1

##
####for row1 in c1rows:
####    for row2 in c2rows:
####        if row1['PID'] == row2['PID\n'].strip('\n'):
####            num_of_matches += 1
####print num_of_matches
##
##mit = []
##gongos = []
##for row2 in c2rows:
##    print row2
##    mit.append(row2.strip('\n'))
##
##for row1 in c1rows:
##    gongos.append(row1)

mit = Set(mit)
gongos = Set(gongos)
####print len(mit.difference(gongos)) #number in mit not gongos -- 1449
####print len(gongos.difference(mit)) #number in gongos but not mit -- 54
##
listOfStuff = list(gongos.difference(mit))
theFile = open('Unique PIDs in Gongos 2.csv', 'w')
csv_out = csv.writer(theFile, lineterminator='\n')
for item in listOfStuff:
     csv_out.writerow([item])
theFile.close()
##print list(gongos.difference(mit))

count = 0
for item in mit:
    if item not in gongos:
        count += 1
        
count2 = 0
for item in gongos:
    if item not in mit:
        count2 += 1        


        
print len(mit), len(mit) - count
print count

print len(gongos), len(gongos) - count2
print count2



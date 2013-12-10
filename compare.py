import csv
from sets import Set

f1 = open('1stcol-1.csv', 'rU') #Gongos
f2 = open('out.csv', 'rU') #MIT

c1 = csv.DictReader(f1, delimiter=',')
c2 = csv.DictReader(f2, delimiter=',')


num_of_matches = 0

c1rows = [row for row in c1]
c2rows = [row for row in c2]

##
##for row1 in c1rows:
##    for row2 in c2rows:
##        if row1['PID'] == row2['PID\n'].strip('\n'):
##            num_of_matches += 1
##
##print num_of_matches

mit = []
gongos = []
for row2 in c2rows:
     mit.append(row2['PID\n'].strip('\n'))

for row1 in c1rows:
    gongos.append(row1['PID'])

mit = Set(mit)
gongos = Set(gongos)
##print len(mit.difference(gongos)) #number in mit not gongos -- 1449
##print len(gongos.difference(mit)) #number in gongos but not mit -- 54

listOfStuff = list(gongos.difference(mit))
theFile = open('Unique PIDs in Gongos.csv', 'w')
csv_out = csv.writer(theFile, lineterminator='\n')
for item in listOfStuff:
     csv_out.writerow([item])
theFile.close()
print list(gongos.difference(mit))

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

f1.close()
f2.close()

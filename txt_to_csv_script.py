import csv

csv_out = csv.writer(open('out2.csv', 'w'), delimiter=',')

f = open('UROP_querysearch2.txt')

for line in f:
    
    csv_out.writerow([line])

f.close()

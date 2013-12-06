import csv

csv_out = csv.writer(open('out.csv', 'w'), lineterminator='\n')

f = open('UROP_querysearch.txt')

for line in f:
    csv_out.writerow([line])

f.close()

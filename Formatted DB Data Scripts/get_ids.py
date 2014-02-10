import csv

somelist = {}
with open('users.csv', 'rU') as f1:
    c1 = csv.DictReader(f1, delimiter=",")
    for row in c1:
        if row['userid'] not in somelist.keys():
            somelist[row['userid']] = {'doneTime': row['doneTime'], 'start': None, 'like': 0, 'comment': 0, 'photo': 0, 'clicks': 0}
    f1.close()

counter = 1
indict = 0
test = ''
prevDone = ''
target = 0
with open('users_stimuli_startstop.csv', 'rU') as f2:
    c2 = csv.DictReader(f2, delimiter=",")
    for num, row in enumerate(c2):
        if num == target:
            test = row['userID']
            somelist[test]['start'] = row['starttime']
            somelist[test]['doneTime'] = row['stoptime']
            prevDone = row['stoptime']
            break

    for num, row in enumerate(c2):
        if row['userID'] != test:
            
            test = row['userID']
            somelist[test]['start'] = row['starttime']
            somelist[test]['doneTime'] = row['stoptime']
        else:
            somelist[test]['doneTime'] = row['stoptime']
   
    f2.close()
    
clickcount = 1
temp = ''
old = ''
with open('users_stimuli_actions.csv', 'rU') as f3:
    c3 = csv.DictReader(f3, delimiter=",")
    for num, row in enumerate(c3):
        if num == target:
            temp = row['userID']
            break
        
    for row in c3:
        if row['userID'] != temp:
            temp = row['userID']
            clickcount = 1
            somelist[temp]['clicks'] = clickcount

            if row['target'] == 'like':
                somelist[row['userID']]['like'] = 1
            elif row['target'] == 'commentBox':
                somelist[row['userID']]['comment'] = 1
            elif row['target'] == 'photo':
                somelist[row['userID']]['photo'] = 1
            

        else:
            if row['target'] == 'like' or row['target'] == 'Vind ik leuk':
                somelist[row['userID']]['like'] = 1
            elif row['target'] == 'commentBox' or row['target'] == 'Reageren':
                somelist[row['userID']]['comment'] = 1
            elif row['target'] == 'photo' or row['target'] == 'album' or row['target'] == 'brand':
                somelist[row['userID']]['photo'] = 1

            clickcount += 1
            somelist[row['userID']]['clicks'] = clickcount
        
         
    f3.close()
    

##print somelist['ER14122']
##print somelist['ER14123']
##print somelist['ER14124']
##print somelist['ER14125']
##print somelist['GM14002']
##print somelist['FF14003']
##
print len(somelist)

##for key in somelist.keys():
##    print key+':', somelist[key]
    
names = ['userId', 'start time', 'finish time', 'clicks', 'like', 'comment', 'photo']
with open('formatteddata.csv', 'w') as f4:
    c4 = csv.writer(f4, delimiter=',')
    c4.writerow(names)
    for user in somelist.keys():
        c4.writerow([user, somelist[user]['start'], somelist[user]['doneTime'], somelist[user]['clicks'], somelist[user]['like'], somelist[user]['comment'], somelist[user]['photo']])

    f4.close()

    

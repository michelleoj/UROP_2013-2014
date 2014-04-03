import csv

somelist = {}
with open('users.csv', 'rU') as f1:
    c1 = csv.DictReader(f1, delimiter=",")
    for row in c1:
        if row['userid'] not in somelist.keys():
            somelist[row['userid']] = {'doneTime': row['doneTime'], 'start': None,
                                       'like': 0, 'comment': 0, 'photo': 0, 'clicks': 0,
                                       'enforceCount': 0, 'enforcement_control': 0,
                                       'enforcement_tv': 0, 'enforcement_fb': 0}
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
        if row['userID'] != test and row['userID'] != '':
            
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
            if temp in somelist.keys():            
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

start_count = 1
tvcount = 1
fbcount = 1
controlcount = 1
test = ''
prevDone = ''
target = 0
with open('users_stimuli_enforcement.csv', 'rU') as f4:
    c4 = csv.DictReader(f4, delimiter=",")
    for num, row in enumerate(c4):
        if num == target:
            test = row['userID']
            break
        
    for row in c4:
        if row['userID'] != test:
            test = row['userID']
            tvcount = 1
            fbcount = 1
            controlcount = 1
            if test in somelist.keys():
                
                if row['stimID'] == '0': #tv
                    somelist[test]['enforcment_tv'] = tvcount
                    
                if row['stimID'] == '1': #facebook
                    somelist[test]['enforcment_fb'] = fbcount


                if row['stimID'] == '2': #control
                    somelist[test]['enforcment_control'] = controlcount
            

        else:
            if row['stimID'] == '0': #tv
                tvcount += 1
                somelist[row['userID']]['enforcement_tv'] = tvcount
                
                
            if row['stimID'] == '1': #facebook
                fbcount += 1
                somelist[row['userID']]['enforcement_fb'] = fbcount
               

            if row['stimID'] == '2': #control
                controlcount += 1
                somelist[row['userID']]['enforcement_control'] = controlcount


    
   
    f4.close()
    

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
    
names = ['userId', 'start time', 'finish time', 'clicks', 'like', 'comment', 'photo', 'enforcementCount',
         'enforcement_tv', 'enforcement_fb', 'enforcement_control']
with open('clicks_Mar_20.csv', 'w') as f4:
    c4 = csv.writer(f4, delimiter=',')
    c4.writerow(names)
    for user in somelist.keys():
        c4.writerow([user, somelist[user]['start'], somelist[user]['doneTime'],
                     somelist[user]['clicks'], somelist[user]['like'],
                     somelist[user]['comment'], somelist[user]['photo'],
                     somelist[user]['enforceCount'], somelist[user]['enforcement_tv'],
                     somelist[user]['enforcement_fb'], somelist[user]['enforcement_control']])

    f4.close()

    

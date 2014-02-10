#!/usr/bin/python2.7

#Comments added 1/27/13, QN

import time

f = open('browsing_clean.txt', 'r')
w = open('browsing_format.txt', 'w')

#Helper function. Splits a url into tuple of domain name and rest of url.
#Ex. http://www.google.com/search/blah -> (http://www.google.com, search/blah)
def splitURL(url):
	try:
		tokens = url.split("/", 3) #Max splits = 3 because there are only 3 /'s we care about:
                                                #2 for the protocol and 1 which divides the domain name and the rest
		pair = (tokens[2], tokens[3]) #domain name (no protocol), and then rest
	except IndexError: #if there weren't three splits (nothing after domain name)
		pair = (url, "")
	return pair

#Converts time on browsing history from unix time to regular time
#time is in milliseconds since the epoch. Format to match db formatting
def formatTime(t):
    seconds = int(t)/1000
    return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(seconds))

for line in f:
    tokens = line.split("\t") #tab-delimited
    userid = tokens[0]
    stimid = tokens[1]
    url = tokens[3]
    (base, sub) = splitURL(url)
    t = tokens[5] #the unix time
    datetime = formatTime(t.strip())
    newline = "\t".join([userid, stimid, base, sub, datetime]) #make new tab-delimited row with info we want
    w.write(newline+"\n")
f.close()
w.close()

print "write done"

/* 
Do final cleanup of data and create final csv.
By Qui Nguyen, 8/8/12

--Should be run after mit_data_clean1.do and mit_data_merge.do--

IMPORTANT: Need to run find_404.py to create startstop_404s.txt
*/

clear
use combined5.dta

*And output the file as a csv!
outsheet userid segment cell begintime finished donetime stim1 s1start s1stop s1softe s1harde s1actions stim2 s2start s2stop s2softe s2harde s2actions stim3 s3start s3stop s3softe s3harde s3actions using combined_short.txt, comma replace

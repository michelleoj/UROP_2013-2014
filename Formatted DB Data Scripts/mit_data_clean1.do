/* 
Cleans files from database so that they will merge properly.
By Qui Nguyen, 8/8/12

IMPORTANT:
Do you have the file users_stimuli_startstop_clean.txt?
If not, follow the steps below:

Take users_stimuli_startstop.txt, reverse order rows by startstopID, save as users_stimuli_startstop_sorted.txt
Run startstop_clean.py to get users_stimuli_startstop_clean.txt. This removes extra startstop entries and leaves 1 entry for each userid/stimid pair.

*/



clear

* import users and save
insheet userid segment cell begintime finished donetime using users.txt
tostring userid segment cell, replace
*drop any blank userids
drop if missing(userid)
save users.dta, replace

*import order and save
clear
insheet userid stim1 stim2 stim3 stim4 stim5 stim6 stim7 stim8 stim9 using users_stimuli_order.txt
drop if missing(userid)
*these columns were unnecessary
drop stim5 stim6 stim7 stim8 stim9
tostring userid stim1 stim2 stim3 stim4, replace
save order.dta, replace

*merge users file with stim order info
use users.dta
merge 1:1 userid using order.dta, nogenerate
save combined.dta, replace

*import clean startstop data
clear
insheet userid stimid starttime endtime startstopid enforceStatus using users_stimuli_startstop_clean.txt
tostring stimid startstopid, replace
drop if missing(userid)
drop if userid=="undefined"
save startstop_clean.dta, replace

*trim whitespace from ids
use users
replace userid=trim(userid)
save users.dta, replace

use order.dta
replace userid=trim(userid)
save order.dta, replace

use combined.dta
replace userid=trim(userid)
save combined.dta, replace

*Import enforcement and action files and also clean up a little.
clear
insheet userid stimid enforcetime etype eid using users_stimuli_enforcement.txt
tostring userid stimid eid, replace
drop if missing(userid)
drop if userid=="undefined"
save enforcement.dta, replace
outsheet userid stimid enforcetime etype eid using enforcement_clean.txt, nonames noquote replace

clear
insheet userid stimid actiontime actiontype actionid target using users_stimuli_actions.txt
tostring userid stimid actionid, replace
drop if missing(userid)
*drop userid=="-1" because those came from people done with survey but who hadn't uninstalled extension
drop if userid=="-1"
drop if userid=="undefined"
save actions.dta, replace
outsheet userid stimid actiontime actiontype actionid target using actions_clean.txt, nonames noquote replace

/* Done cleaning!
Now, you need to run some more Python scripts to count enforcement violations and actions for each userid/stimid pair.

Run count_enforce.py and count_actions.py to get enforcement_count.txt and actions_count.txt.

Then you can run mit_data_merge.do.
*/

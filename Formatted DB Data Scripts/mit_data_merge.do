/* 
Merges startstop, enforcement, and action info with user and stim order info, so all data is on one line for each user.
By Qui Nguyen, 8/8/12

--Should be run after mit_data_clean1.do--

Now we actually start merging the startstop info with the user info. 
The merge we did during cleaning was purely for testing purposes - didn't have everything on one line.
Here, we match using both userid and stimid. 

Then we add the number of soft enforcements, hard enforcements, and actions for each userid/stimid pair.

IMPORTANT: Do you have enforcement_count.txt and actions_count.txt? If not, run count_enforce.py and count_actions.py to get enforcement_count.txt and actions_count.txt.

*/

clear

*MERGING STARTSTOP
*Change variable names so that we can match entries for stim1 (the stimuli users saw first).
*Startstop times will be labeled appropriately.
use startstop_clean.dta
rename stimid stim1
rename starttime s1start
rename endtime s1stop
save startstop_clean.dta, replace

*merge with combined.dta (users plus order)
use combined.dta
merge 1:1 userid stim1 using startstop_clean.dta, keepusing(s1start s1stop) nogenerate keep(master match)
save combined3.dta, replace

*Repeat process for stim2, stim3, stim4. If users didn't see that many stimuli, no match will be made and the start/stop fields will be blank.
use startstop_clean.dta
rename stim1 stim2
rename s1start s2start
rename s1stop s2stop
save startstop_clean.dta, replace

use combined3.dta
merge 1:1 userid stim2 using startstop_clean.dta, keepusing(s2start s2stop) nogenerate keep(master match)
save combined3.dta, replace

use startstop_clean.dta
rename stim2 stim3
rename s2start s3start
rename s2stop s3stop
save startstop_clean.dta, replace

use combined3.dta
merge 1:1 userid stim3 using startstop_clean.dta, keepusing(s3start s3stop) nogenerate keep(master match)
save combined3.dta, replace

/*use startstop_clean.dta
rename stim3 stim4
rename s3start s4start
rename s3stop s4stop
save startstop_clean.dta, replace

use combined3.dta
merge 1:1 userid stim4 using startstop_clean.dta, keepusing(s4start s4stop) nogenerate keep(master match)
save combined3.dta, replace*/

*MERGING ENFORCEMENT
*import counts
clear
infile str100 userid str3 stimid str3 softE str3 hardE using enforcement_count.txt
save enforcement_count.dta, replace

*Same process as with startstop
rename stimid stim1
rename softE s1softe
rename hardE s1harde
save enforcement_count.dta, replace

use combined3.dta
merge 1:1 userid stim1 using enforcement_count.dta, keepusing(s1softe s1harde) nogenerate keep(master match)
save combined4.dta, replace

use enforcement_count.dta
rename stim1 stim2
rename s1softe s2softe
rename s1harde s2harde
save enforcement_count.dta, replace

use combined4.dta
merge 1:1 userid stim2 using enforcement_count.dta, keepusing(s2softe s2harde) nogenerate keep(master match)
save combined4.dta, replace

use enforcement_count.dta
rename stim2 stim3
rename s2softe s3softe
rename s2harde s3harde
save enforcement_count.dta, replace

use combined4.dta
merge 1:1 userid stim3 using enforcement_count.dta, keepusing(s3softe s3harde) nogenerate keep(master match)
save combined4.dta, replace

/*use enforcement_count.dta
rename stim3 stim4
rename s3softe s4softe
rename s3harde s4harde
save enforcement_count.dta, replace

use combined4.dta
merge 1:1 userid stim4 using enforcement_count.dta, keepusing(s4softe s4harde) nogenerate keep(master match)
save combined4.dta, replace*/

*MERGING ACTIONS
*import counts
clear
infile str100 userid str3 stimid str3 actions using actions_count.txt
save actions_count.dta, replace

*Same process
rename stimid stim1
rename actions s1actions
save actions_count.dta, replace

use combined4.dta
merge 1:1 userid stim1 using actions_count.dta, keepusing(s1actions) nogenerate keep(master match)
save combined5.dta, replace

use actions_count.dta
rename stim1 stim2
rename s1actions s2actions
save actions_count.dta, replace

use combined5.dta
merge 1:1 userid stim2 using actions_count.dta, keepusing(s2actions) nogenerate keep(master match)
save combined5.dta, replace

use actions_count.dta
rename stim2 stim3
rename s2actions s3actions
save actions_count.dta, replace

use combined5.dta
merge 1:1 userid stim3 using actions_count.dta, keepusing(s3actions) nogenerate keep(master match)
save combined5.dta, replace

/*use actions_count.dta
rename stim3 stim4
rename s3actions s4actions
save actions_count.dta, replace

use combined5.dta
merge 1:1 userid stim4 using actions_count.dta, keepusing(s4actions) nogenerate keep(master match)
save combined5.dta, replace
*/
*We want enforcement/action counts of zero if the user saw that stimuli but did not trigger an enforcement/action. 
*That way it's clear if they saw the stimuli or if they just didn't take the action.
/* replace s1softe="0" if stim1 != "-1" & missing(s1softe)
replace s2softe="0" if stim2 != "-1" & missing(s2softe)
replace s3softe="0" if stim3 != "-1" & missing(s3softe)
replace s4softe="0" if stim4 != "-1" & missing(s4softe)

replace s1harde="0" if stim1 != "-1" & missing(s1harde)
replace s2harde="0" if stim2 != "-1" & missing(s2harde)
replace s3harde="0" if stim3 != "-1" & missing(s3harde)
replace s4harde="0" if stim4 != "-1" & missing(s4harde)

replace s1actions="0" if stim1 != "-1" & missing(s1actions)
replace s2actions="0" if stim2 != "-1" & missing(s2actions)
replace s3actions="0" if stim3 != "-1" & missing(s3actions)
replace s4actions="0" if stim4 != "-1" & missing(s4actions) */

replace s1softe="0" if !missing(s1start) & missing(s1softe)
replace s2softe="0" if !missing(s2start) & missing(s2softe)
replace s3softe="0" if !missing(s3start) & missing(s3softe)
*replace s4softe="0" if !missing(s4start) & missing(s4softe)

replace s1harde="0" if !missing(s1start) & missing(s1harde)
replace s2harde="0" if !missing(s2start) & missing(s2harde)
replace s3harde="0" if !missing(s3start) & missing(s3harde)
*replace s4harde="0" if !missing(s4start) & missing(s4harde)

replace s1actions="0" if !missing(s1start) & missing(s1actions)
replace s2actions="0" if !missing(s2start) & missing(s2actions)
replace s3actions="0" if !missing(s3start) & missing(s3actions)
*replace s4actions="0" if !missing(s4start) & missing(s4actions)

save combined5.dta, replace

*Next, run mit_data_clean2.do

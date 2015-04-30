'use strict';
 
 angular.module('mockedUserActivity', [])
   .value('userActivityJSON', {   
     "userActivity": [
         {
             "date": "12-04-2015",
             "action": "Action Dummy",
             "successful":true
         },
         {
             "date": "15-04-2015",
             "action": "Action Dummy II",
             "successful":false
         },
         {
            "date": "20-05-2015",
             "action": "Action Dummy III",
             "successful":true
         }
     ]
   }
 );

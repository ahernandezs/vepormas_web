'use strict';
 
 angular.module('mockedLimits', [])
   .value('limitsJSON', {   
     "limits": [
         {
             "amount": "7000",
             "type": "TRANSFER_CONSUBANCO"
         },
         {
             "amount": "8000.0",
             "type": "TRANSFER_SPEI"
         },
         {
             "amount": "9500",
             "type": "TRANSFER_TEF"
         }
     ]
   }
 );

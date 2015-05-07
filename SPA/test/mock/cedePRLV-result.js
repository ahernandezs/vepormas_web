'use strict';

angular.module('mockedcedePRLVResult',[])
    .value('cedePRLVJSON', {
        'account_number': 'dummy inversion account number',
        'expiration_date': 1434258000000,
        'interest': { 'amount': 50000, 'operation_date': 1422252000000 },
        'amount': 50000,
        'operation_date': 1422252000000
    }
);

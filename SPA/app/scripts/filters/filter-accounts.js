angular.module('spaApp').
filter('byAccountType', function () {
    return function (accounts) {
        var items = {
            out: []
        };
        accounts.forEach(
            function (value, index, ar) {
                if (value.account_type === 'DEP' || value.account_type === 'DEB_T')
                    items.out.push( value );
            }
        );
        return items.out;
    };
});

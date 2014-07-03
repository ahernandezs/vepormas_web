'use strict';

describe('Service: thirdAccountProvider', function () {

  // load the service's module
  beforeEach(module('spaApp'));

  // instantiate service
  var thirdAccountProvider;
  beforeEach(inject(function (_thirdAccountProvider_) {
    thirdAccountProvider = _thirdAccountProvider_;
  }));

  it('should do something', function () {
    expect(!!thirdAccountProvider).toBe(true);
  });

});

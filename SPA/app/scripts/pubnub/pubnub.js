'use strict'

app.run(function ($rootScope, PubNub, accountsProvider, $cookieStore) {

    //conectando a PubNub
    var joinPubNub = function () {
        console.log('joining PubNub...');

        PubNub.init({
            subscribe_key: $rootScope.subscribeKey,
            publish_key: $rootScope.subscribeKey
        });
    }

    //subscribing to channel
    var suscribePubNub = function (channel) {
        $rootScope.pubNubChannel = channel;
        PubNub.ngSubscribe({
            channel: $rootScope.pubNubChannel
        });
        console.log('subscribed to ' + $rootScope.pubNubChannel);
   
        //making callback
        $rootScope.$on(PubNub.ngMsgEv($rootScope.pubNubChannel), function (event, payload) {
            var messageType = payload.message.messageType;
            if (messageType == 'transaction') {
               accountsProvider.addNewTransaction(payload.message.user, payload.message.transaction, payload.message.account);
            }

        });
    }

    $rootScope.initPubNub = function () {
        joinPubNub();

        //change channel to X-AUTH-TOKEN
        //suscribePubNub('my_channel_anzen666_common');
        suscribePubNub($cookieStore.get('token'));
        console.log("Channel => " + $cookieStore.get('token'));
    }

    if($cookieStore.get('token')) {
      $rootScope.initPubNub();
    }
});

angular.module('starter.controllers').controller('MainCtrl', function($scope, mainInfo, adInfo, $state, $rootScope) {
  adInfo.ad()
  .then(function(data) {
    $scope.ads = data;
  }, function(data) {
    alert(data);
  });

  adInfo.adExhs()
  .then(function(data) {
    $scope.adExhs = data;
  }, function(data) {
    alert(data);
  });

  adInfo.adBooks()
  .then(function(data) {
    $scope.adBooks = data;
    $rootScope.adBooks = data;
  }, function(data) {
    alert(data);
  });

  adInfo.adStuffs()
  .then(function(data) {
    $scope.adStuffs = data;
  }, function(data) {
    alert(data);
  });

    $scope.go = function(state) {
         $state.go(state,{'id':1});
        // $scope.ad = ad;''
        // $state.go(state, {
        //     'id': ad.id,
        //     'title': ad.title,
        //     'posterURL': ad.posterURL,
        //     'description': ad.description,
        //     'subTitle': ad.subTitle
        // });
    };
});

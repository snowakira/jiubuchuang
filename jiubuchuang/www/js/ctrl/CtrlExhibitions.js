angular.module('starter.controllers').controller('ExhibitionsCtrl', function($scope, $ionicListDelegate, $state, exhibitionsInfo) {

    $scope.cities = [
      {'name':'北京'},
      {'name': '上海'},
      {'name': '成都'}
      {'name': '广州'}
    ];

    exhibitionsInfo.exhibitions()
        .then(function(data) {
            $scope.exhibitions = data;
        }, function(data) {
            alert(data);
        });

    $scope.move_item = function(item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
    };
    $scope.show_reorder = function() {
        $ionicListDelegate.showReorder(true);
    };
    $scope.go = function(state) {
        $state.go(state);
    };
});

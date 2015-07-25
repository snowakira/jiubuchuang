angular.module('starter.controllers')
.controller('ExhibitionCtrl', function($scope, $stateParams, $state, $rootScope, exhibitionInfo, $ionicModal, addPlan, $rootScope) {

    $scope.user = $rootScope.user;
    $scope.adBooks = $rootScope.adBooks;

    exhibitionInfo.exhibition($stateParams.id)
        .then(function(data) {
            $scope.exhibition = data;
        }, function(data) {
            alert(data);
        });

    $scope.go = function(state) {
        $state.go(state, {
            'id': null,
            'navigation': 'app.exhibition'
        });
    };
    $scope.goback = function(){
      alert("test");
    };
    // $rootScope.navigation = 'app.exhibition';
    //code for planning
    $scope.myModal = {
        addCalendar: true,
        planDate: new Date()
    };

    $ionicModal.fromTemplateUrl("templates/plan.html", {
        scope: $scope,
        animation: "slide-in-down"
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.postData = function() {
        addPlan.post($rootScope.user, $scope.myModal.planDate, $stateParams.id);
        if ($scope.myModal.addCalendar === true) {

            addPlan.addPhone($scope.myModal.planDate, $scope.exhibition.value[0].address, $scope.exhibition.value[0].subject);
        }


    };

    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.addPlan = function() {
        $scope.postData();
        $scope.modal.hide();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    // $scope.myToggle=function(){
    // $timeout(function() {
    // }, 0);
});

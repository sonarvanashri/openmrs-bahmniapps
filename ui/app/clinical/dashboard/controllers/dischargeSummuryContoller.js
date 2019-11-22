'use strict';
angular.module('bahmni.clinical')
    .controller('dischargeSummuryContoller', ['$scope', '$rootScope',
        function ($scope, $rootScope) {
            $scope.isTarvReport = $rootScope.isTarvReport;
            $scope.data = $rootScope.dischargeSummuryReportData;
            console.log($scope.data);
        }]);

        
var app = angular.module('directiveapp',[]);
app.directive('timer', function($compile, $interpolate){
	
	return {
		
		 controller: function($scope, $element, $attrs, $transclude) {
		 	//scope variables
		 	$scope.seconds = "00";
		 	$scope.minutes = "00";
		 	$scope.hours = "00";

		 	//private variables
		 	var secondsInt = 0;
		 	var minutesInt = 0;
		 	var hourInt = 0;

		 	function incrementMinute(){
		 		minutesInt = parseInt($scope.minutes);
		 		minutesInt = minutesInt +1;
		 		if(minutesInt < 10){
		 			$scope.minutes = "0"+minutesInt;
		 		}
		 		else{
		 			$scope.minutes = minutesInt;
		 		}
		 		if($scope.minutes == "60"){
		 			$scope.minutes = "00";
		 			incrementHour();
		 		}
		 		
		 	};
		 	function incrementHour(){
		 		hourInt = parseInt($scope.hours);
		 		hourInt = hourInt +1;
		 		if(hourInt < 10){
		 			$scope.hours = "0"+hourInt;
		 		}
		 		else{
		 			$scope.hours = hourInt;
		 		}
		 		if($scope.hours == "24"){
		 			$scope.hours = "00";
		 		}
		 	}
		 	setInterval(function(){
		 		$scope.$apply();
		 		secondsInt = parseInt($scope.seconds);
		 		secondsInt = secondsInt +1;
		 		if(secondsInt < 10){
		 			$scope.seconds = "0"+secondsInt;
		 		}
		 		else{
		 			$scope.seconds = secondsInt;
		 		}
		 		
		 		if($scope.seconds == "60"){
		 			$scope.seconds = "00";
		 			incrementMinute();
		 		}
		 	},1000);
		 },
		
		restrict: 'A',
		
		compile:function(elem,attrs){
			
			var interpolated = $interpolate('<h1 style="font-size:231px">{{hours}}::{{minutes}}::{{seconds}}</h1>');
			
			function link(scope,elem,attrs){
				
				scope.$watch('seconds',function(){
					var result = interpolated(scope);
					elem.empty();
					elem.append(result);
				});

			}
			return link;
		}
	};
});

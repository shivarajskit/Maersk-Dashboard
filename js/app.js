/**
 * @author Accenture @2014
 */

var maerskSharepointDashboardApp = angular.module('maerskSharepointDashboardApp', [ 'ngRoute' ]);

maerskSharepointDashboardApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
		when('/chart-detail', {
            templateUrl: 'partials/chart-details.html',
            controller: 'ChartDetailCtrl'
        }).
      otherwise({
          redirectTo: '/chart-detail'
      });
	  //$locationProvider.html5Mode(true);
  }]);
  
  maerskSharepointDashboardApp.directive('legendDirective', function () {
    return {
		restrict : 'A',
        templateUrl: 'partials/legends.html',
		scope:{dOnshore:'@',dOffshore:'@'},
		link:function(scope, ele, attr){
			scope.ids_1 = attr.ids1;
			scope.ids_2 = attr.ids2;
			scope.$watch(function(){
				createCanvasRect(attr.ids1, 60, 10, '#46BFBD');
				createCanvasRect(attr.ids2, 60, 10, '#F7464A');
			});
			
			var createCanvasRect = function(element, width, height, color)
			{ 
				var canvas = document.createElement('canvas');
				canvas.id = element;
				canvas.width = width;
				canvas.height = height;

				//High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
				if (window.devicePixelRatio) {
					var ctx = canvas.getContext("2d");
					ctx.canvas.style.width = width + "px";
					ctx.canvas.style.height = height + "px";
					ctx.canvas.height = height * window.devicePixelRatio;
					ctx.canvas.width = width * window.devicePixelRatio;
					ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
				}
				document.getElementById('div_' + element).innerHTML = "";
				document.getElementById('div_' + element).appendChild(canvas);
				ctx.fillStyle = color;
				ctx.fillRect(0, 0, canvas.width, canvas.height, canvas.width);
			}
		}
    };
});
  
maerskSharepointDashboardApp.controller('ChartDetailCtrl', ['$scope', '$routeParams',
  function ($scope, $routeParams) {
  function init(){
		 $.when( getNewsletters() ).done(function( data ) {
			$scope.newsletters = data;
			$scope.selectedAddress = $scope.newsletters[0];
				myPieChart[1].segments[0].value = $scope.newsletters[0].Onshore;
				myPieChart[1].segments[1].value = $scope.newsletters[0].Offshore;
				myPieChart[1].update();
			$scope.$apply();
		  });
		  $.when( getArticles() ).done(function( data ) {
			$scope.articles = data;
			$scope.selectedArticle = $scope.articles[0];
			for(var i=4;i<7;i++){
				if(i==4){
					myPieChart[i].segments[0].value = $scope.articles[0].Views.Onshore;
					myPieChart[i].segments[1].value = $scope.articles[0].Views.Offshore;
					myPieChart[i].update();
				}else if(i==5){
					myPieChart[i].segments[0].value = $scope.articles[0].Likes.Onshore;
					myPieChart[i].segments[1].value = $scope.articles[0].Likes.Offshore;
					myPieChart[i].update();
				}else if(i==6){
					myPieChart[i].segments[0].value = $scope.articles[0].Comments.Onshore;
					myPieChart[i].segments[1].value = $scope.articles[0].Comments.Offshore;
					myPieChart[i].update();
				}
			}
			$scope.$apply();
		  });
		  $.when( getDashboardDetsils() ).done(function( data ) {
			$scope.dashboard = data[0];
				myPieChart[2].segments[0].value = $scope.dashboard.Onshore;
				myPieChart[2].segments[1].value = $scope.dashboard.Offshore;
				myPieChart[2].update();
			$scope.$apply();
		  });
		  $.when( getUserLoginDetails() ).done(function( data ) {
			$scope.userlogin = data[0];
				myPieChart[3].segments[0].value = $scope.userlogin.Onshore;
				myPieChart[3].segments[1].value = $scope.userlogin.Offshore;
				myPieChart[3].update();
			$scope.$apply();
		  });
  }
  init();	
 $scope.PieChart = function() {

		var data = [
					{
						value: 1,
						color:"#46BFBD",
						label: 'Onshore',
						labelColor: 'white',
						labelFontSize: '16'
					},
					{
						value: 1,
						color: "#F7464A",
						label: 'Offshore',
						labelColor: 'black',
						labelFontSize: '16'
					}
				];
				
		var options = {
        barStrokeWidth: 2,
        };		
		myPieChart=[];
		for(var i=1;i<7;i++){
			var canvas = document.getElementById('pie'+i);
			canvas.width = 300;
			canvas.height = 200;
			var ctx = canvas.getContext("2d");
			myPieChart[i] = new Chart(ctx).Pie(data, options);
		}
	}
	
	$scope.PieChart();
	
	$scope.newsletterOnChange = function(){
		myPieChart[1].segments[0].value = $scope.selectedAddress.Onshore;
		myPieChart[1].segments[1].value = $scope.selectedAddress.Offshore;
		myPieChart[1].update();
	}
	
	$scope.articleOnChange = function(){
		for(var i=4;i<7;i++){
				if(i==4){
					myPieChart[i].segments[0].value = $scope.selectedArticle.Views.Onshore;
					myPieChart[i].segments[1].value = $scope.selectedArticle.Views.Offshore;
					myPieChart[i].update();
				}else if(i==5){
					myPieChart[i].segments[0].value = $scope.selectedArticle.Likes.Onshore;
					myPieChart[i].segments[1].value = $scope.selectedArticle.Likes.Offshore;
					myPieChart[i].update();
				}else if(i==6){
					myPieChart[i].segments[0].value = $scope.selectedArticle.Comments.Onshore;
					myPieChart[i].segments[1].value = $scope.selectedArticle.Comments.Offshore;
					myPieChart[i].update();
				}
			}
	}
	
  }]);


var messages = [];
var print = function(text) {
	if (!text.hasOwnProperty("length")) {
		return;
	}
	messages.push(text);
	if (canPrint == true) 
	{
		console.log(text);
	}
	//	$("#console").html(messages);
};

$(document).ready(function() {

	var div = document.createElement("div");
	div.innerHTML = "<!--[if lt IE 10]><i></i><![endif]-->";
	var isIeLessThan9 = (div.getElementsByTagName("i").length == 1);
	if (isIeLessThan9) {
		// Old IE browser crash if console.log is used and developer windows is not open. Normally, we do not
		// print anything with IE.
	    canPrint = false;
	    
	}
	else
	{
		canPrint = true;

	}
	print("Document ready");

});

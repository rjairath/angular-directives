angular.module('app', [])
.directive('tab', function(){
	return{
		restrict: "E",
		transclude: true,
		template: '<div ng-show="active" ng-transclude></div>',
		scope: {
			heading: '@'
		},
		require: '^tabset',
		link: function(scope, elem, attr, tabsetCtrl){
			scope.active=false;
			scope.disabled=false;

			if(attr.disable){
				attr.$observe('disable', function(value){
					scope.disabled=(value !=='false');
				})
			}
			tabsetCtrl.addTab(scope);
		}
	}
})
.directive('tabset', function(){
	return{
		restrict: "E",
		transclude: true,
		scope: {},
		templateUrl: '/TabsDirective/views/tabset.html',
		bindToController: true,
		controllerAs: 'tabset',
		controller: function(){
			var self=this;

			self.tabs=[];
			self.addTab=function(tab){
				self.tabs.push(tab);

				if(self.tabs.length===1){
					tab.active=true;
				}
			}

			self.select=function(selectedTab){
				if(selectedTab.disabled){
					return;
				}
				angular.forEach(self.tabs, function(tab){
					if(tab.active && tab!=selectedTab){
						tab.active=false;
					}
				})
				selectedTab.active=true;
			}
		}
	}
})
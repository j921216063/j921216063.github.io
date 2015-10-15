var app =angular.module('autoApp' , ['ngResource']);

    app.controller('SignUpController', ['$scope', '$resource', function($scope,$resource) {
        var backEndServer = $resource('http://192.168.1.104\\:5000/auth/register');
        $scope.submit =function(){
         console.log('submit');
         backEndServer.save({}, {
              "email": "test1123@gmail.com", 
               "password": "123456", 
               "password_confirm": "123456"
              }, function(response) {
        // Handle a successful response
                 console.log('success');
                 console.log(response);
             }, function(response) {
                 console.log(response);
                console.log('fail');
        // Handle a non-successful response
        });
     };

    }]);
    // .factory('Story', function ($resource) {
    //     var Story = $resource('/api/v1/stories/:storyId', {storyId: '@id'});
    //     Story.prototype.isNew = function(){
    //         return (typeof(this.id) === 'undefined');
    //     }
    //     return Story;
    // });

angular.module("getbookmarks", ["getbookmarks.services"]).
    config(function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: '/assets/views/stories/list.html', controller: StoryListController})
            .when('/stories/new', {templateUrl: '/assets/views/stories/create.html', controller: StoryCreateController})
            .when('/stories/:storyId', {templateUrl: '/assets/views/stories/detail.html', controller: StoryDetailController});
    });

function StoryListController($scope, Story) {
    $scope.stories = Story.query();
    
}

function StoryCreateController($scope, $routeParams, $location, Story) {

    $scope.story = new Story();

    $scope.save = function () {
    	$scope.story.$save(function (story, headers) {
    		toastr.success("Submitted New Story");
            $location.path('/');
        });
    };
}


function StoryDetailController($scope, $routeParams, $location, Story) {
    var storyId = $routeParams.storyId;
    
    $scope.story = Story.get({storyId: storyId});

}

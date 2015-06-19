/**
 * Created by jhbang on 2015. 6. 12..
 */

var app = angular.module('flapperNews', ['ui.router']);//외부모듈은 우리 app의 dependency에 추

app.controller('MainCtrl', [
    '$scope',
    'posts', //injecting service
    function($scope, posts){
        $scope.test = 'hello world!';
        $scope.posts = posts.posts;
        //$scope.posts = [
        //    {title : 'post1', upvotes : 5},
        //    {title : 'post2', upvotes : 2},
        //    {title : 'post3', upvotes : 15},
        //    {title : 'post4', upvotes : 9},
        //    {title : 'post5', upvotes : 4}
        //];
        $scope.addPost = function(){
            if(!$scope.title || $scope.title===''){return;}
            $scope.posts.push({
                title : $scope.title,
                link : $scope.link,
                upvotes:0,
                comments : [
                    {author : 'Joe', body : 'cool posts', upvotes : 4},
                    {author : 'Bob', body : 'cool postsssss', upvotes : 6}
                ]
            });
            $scope.title = '';
            $scope.link = '';
        };
        $scope.incrementUpvotes = function(post){
            post.upvotes +=1;
        }
    }
]);

app.controller('PostsCtrl', [
   '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts){
        $scope.post = posts.posts[$stateParams.id];

        $scope.addComment = function(){
            if($scope.body === ''){return;}
            $scope.post.comments.push({
                body : $scope.body,
                author : 'user',
                upvotes : 0
            });
            $scope.body = '';
        };
    }
]);

/*
* Angular Services
* 포스트 서비스
* post1~5까지는 여기에 임의로 지정했어서 comment기능 추가하고
* 여기에 comment추가안해서 comment기능 post1~5에서 안됬었음
*/

app.factory('posts', [function(){
    var o = {
        posts : [{title : 'post1', upvotes : 5 ,comments:[]},
            {title : 'post2', upvotes : 2,comments:[]},
            {title : 'post3', upvotes : 15,comments:[]},
            {title : 'post4', upvotes : 9,comments:[]},
            {title : 'post5', upvotes : 4,comments:[]}
        ]
    };
    return o;
}]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvder, $urlRouterProvider){
        $stateProvder
            .state('home',{
                url : '/home',
                templateUrl : '/home.html',
                controller : 'MainCtrl'
            })//home이라는 이름, url, templateURL, 컨트롤러 설정,

            .state('posts',{
                url : '/posts/{id}',
                templateUrl : '/posts.html',
                controller : 'PostsCtrl'
            });

        $urlRouterProvider.otherwise('home');//ohterwise메서드 : 정의되지않은 url 들어왔을때
    }
]);

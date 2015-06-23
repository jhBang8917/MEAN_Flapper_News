/**
 * Created by jhbang on 2015. 6. 12..
 */

var app = angular.module('flapperNews', ['ui.router']);//외부모듈은 우리 app의 dependency에 추

app.controller('MainCtrl', [
    '$scope',
    'posts', //injecting service
    function($scope, posts){
        //$scope.test = 'hello world!';
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
            posts.create({
                title : $scope.title,
                link : $scope.link
            });
            $scope.title = '';
            $scope.link = '';
        };
        //$scope.addPost = function(){
        //    if(!$scope.title || $scope.title===''){return;}
        //    $scope.posts.push({
        //        title : $scope.title,
        //        link : $scope.link,
        //        upvotes:0,
        //        comments : [
        //            {author : 'Joe', body : 'cool posts', upvotes : 4},
        //            {author : 'Bob', body : 'cool postsssss', upvotes : 6}
        //        ]
        //    });
        //    $scope.title = '';
        //    $scope.link = '';
        //};
        $scope.incrementUpvotes = function(post){
            posts.upvote(post);
        }
        //$scope.incrementUpvotes = function(post){
        //    post.upvotes +=1;
        //}
    }
]);

app.controller('PostsCtrl', [
   '$scope',
    'posts',
    'post',
    function($scope, posts, post){
        $scope.post = post;
        //$scope.post = posts.posts[$stateParams.id];

        $scope.addComment = function(){
            if($scope.body === ''){return;}
            posts.addComment(post._id,{
                body : $scope.body,
                author : 'user'
            }).success(function(comment){
                $scope.post.comments.push(comment);
            });
            $scope.body = '';
        };

        $scope.incrementUpvotes = function(comment){
            posts.upvoteComment(post, comment);
        };
        //$scope.addComment = function(){
        //    if($scope.body === ''){return;}
        //    $scope.post.comments.push({
        //        body : $scope.body,
        //        author : 'user',
        //        upvotes : 0
        //    });
        //    $scope.body = '';
        //};

    }
]);

/*
* Angular Services
* 포스트 서비스
* pos1~5까지는 여기에 임의로 지정했어서 comment기능 추가하고
* 여기에 comment추가안해서 comment기능 post1~5에서 안됬었음
*/

app.factory('posts', ['$http',function($http){//http 서비스 inject
    var o = {
        posts : []
    };
    o.getAll = function(){
        return $http.get('/posts').success(function(data){
            angular.copy(data, o.posts);
        });
    };
    o.create = function(post){
        return $http.post('/posts', post).success(function(data){
            o.posts.push(data);
        });
    };
    o.upvote = function(post){
        return $http.put('/posts/' + post._id + '/upvote').success(function(){
            post.upvotes +=1;
        })  ;
    };
    o.get = function(id){
        return $http.get('/posts/'+id).then(function(res){
            return res.data;
        });
    };
    o.addComment = function(id, comment){
        return $http.post('/posts/'+id + '/comments', comment);
    };
    o.upvoteComment = function(post, comment){
        return $http.put('/posts/' + post._id +'/comments/'+comment._id +'/upvote').success(function(){
            comment.upvotes +=1;
        })  ;
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
                controller : 'MainCtrl',
                resolve : {
                    postPromise :['posts', function(posts){
                        return posts.getAll();
                    }]
                }
            })//home이라는 이름, url, templateURL, 컨트롤러 설정,

            .state('posts',{
                url : '/posts/{id}',
                templateUrl : '/posts.html',
                controller : 'PostsCtrl',
                resolve : {
                    post: ['$stateParams', 'posts', function ($stateParams, posts) {
                        return posts.get($stateParams.id);
                    }]
                }
            });

        $urlRouterProvider.otherwise('home');//ohterwise메서드 : 정의되지않은 url 들어왔을때
    }
]);

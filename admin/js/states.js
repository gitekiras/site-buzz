app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('/home',{
        url:'/home',
        views:{
            'leftbar' : {
                templateUrl : 'admin/templates/main/leftbar.html',
                controller : 'InterestController'
            },
            'content' : {
                templateUrl:'admin/templates/dashboard.html',
                controller:'HomeController'      
            }
        }
    })
    .state('/interest/list',{
        url:'/interest/list',
        views:{
            'leftbar' : {
                templateUrl : 'admin/templates/main/leftbar.html',
                controller : 'InterestController'
            },
            'content' : {
                templateUrl:'admin/templates/topic/list.html',
                controller:'InterestController'      
            },
            'questions' : {
                templateUrl :'admin/templates/question/list.html',
                controller : 'QuestionController'
            }
        }
            
    })
    .state('/question/:id',{
        url : '/question/:id',
        views:{
            'leftbar' : {
                templateUrl : 'admin/templates/main/leftbar.html',
                controller : 'InterestController'
            },
            'content' : {
                templateUrl:'admin/templates/question/info.html',
                controller:'QuestionInfoController'      
            }
        }
    })
    .state('/xpert/:id',{
        url : '/xpert/:id',
        views:{
            'leftbar' : {
                templateUrl : 'admin/templates/main/leftbar.html',
                controller : 'InterestController'
            },
            'content' : {
                templateUrl:'admin/templates/xpert/info.html',
                controller:'XpertInfoController'      
            }
        }
    })
    .state('/broadcast',{
        url : '/broadcast',
        views:{
            'leftbar' : {
                templateUrl : 'admin/templates/main/leftbar.html',
                controller : 'InterestController'
            },
            'content' : {
                templateUrl:'admin/templates/beam/broad.html',
                controller:'BroadcastController'      
            }
        }
    })
    .state('/askquestion',{
        url : '/askquestion',
        views:{
            'leftbar' : {
                templateUrl : 'admin/templates/main/leftbar.html',
                controller : 'InterestController'
            },
            'content' : {
                templateUrl:'admin/templates/question/askquestion.html',
                controller:'AskQuesController'      
            }
        }
    })
    
});
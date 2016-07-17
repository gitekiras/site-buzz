app.controller('MainController',function($scope){
    $scope.defaultImage=function(){
    this.src='http://www.cs.northwestern.edu/~agupta/_projects/image_processing/web/FractalImageCompression/v1/m0.gif';
    }

});

app.controller('InterestController',function($rootScope,$scope,$stateParams,InterestService){
   InterestService.list().then(function(res){
        $scope.interests=res.data.data;
    });
});

app.controller('HomeController',function($scope,InterestService,QuestionService,XpertService,BroadcastService){
    console.log("called by home con");
   QuestionService.list().then(function(res){
       $scope.questions = res.data.data;
       console.log('check data ',res.data.data);
   });
   XpertService.list().then(function(res){
       $scope.xperts = res.data.data;
   });
    BroadcastService.list().then(function(res){
        $scope.broadcasts = res.data.data;
    });
});

app.controller('QuestionController',function($state,$scope,QuestionService){
    console.log("called by ques con");
   QuestionService.list().then(function(res){
       $scope.questions = res.data.data;
       console.log(res.data.data);
   });
    $scope.showQuestion = function(){
        console.log('called>>>>>');
        $state.go('/question/id');
    }
});
app.controller('QuestionInfoController',function($scope,$stateParams,QuestionService){
    $scope.myAnswer="";
    QuestionService.info($stateParams.id).then(function(res){
        $scope.question=res.data.data;
    });
    $scope.answer=function(){
        QuestionService.answer({'questionId': parseInt($stateParams.id), 'answer':$scope.myAnswer}).then(function(res){
            $scope.question = res.data.data;
            $scope.myAnswer="";
        });
    }
});
app.controller('XpertInfoController',function($scope,$stateParams,XpertService){
    XpertService.info($stateParams.id).then(function(res){
        $scope.xpert=res.data.data;
    });
    
});
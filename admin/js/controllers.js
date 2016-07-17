app.controller('MainController',function($scope,$rootScope){
    

    $scope.searchQuery="";
    $rootScope.search = function(){
        window.location="#seachXpert/"+$scope.searchQuery;
    }
});

app.controller('SearchXpertController',function($scope,$stateParams,XpertService){
    $scope.q=$stateParams.q;
    XpertService.search($stateParams.q).then(function(res){
        console.log(res.data );
        $scope.xperts = res.data.data;
    });
});

app.controller('InterestController',function($rootScope,$scope,$stateParams,InterestService){
   InterestService.list().then(function(res){
        $scope.interests=res.data.data;
    });
});

app.controller('HomeController',function($scope,InterestService,QuestionService,XpertService,BroadcastService){
   QuestionService.list().then(function(res){
       $scope.questions = res.data.data;
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
app.controller('BroadcastController', function($scope,$rootScope,BroadcastService) {
    $scope.mode='details';
    $scope.broadcasting =false;
    $scope.roomId = "room-1";
    $scope.message="";
    $rootScope.headerOff=true;
    $scope.broadName="How to Cook";
    
    $scope.joinRoom = function(){
        
        $scope.broadcasting =true;
        
        var options = {
            // the id/element dom element that will hold "our" video
          localVideoEl: 'viewer-localVideo',
          // the id/element dom element that will hold remote videos
          remoteVideosEl: 'viewer-remotesVideos',
//          debug :true,
          autoRequestMedia: true,
          
          localVideo : {
              autoplay: true, // automatically play the video stream on the page
              mirror: true, // flip the local video to mirror mode (for UX)
              muted: true // mute local video stream to prevent echo
          },
          receiveMedia : { offerToReceiveAudio: 1, offerToReceiveVideo: 1 }
        
        };
        console.log($scope.broadName,'##',$scope.roomId);
        
        webrtc = new SimpleWebRTC(options);
        webrtc.on('videoAdded',function(videoEl, peer){
            
        }); 
        
        $scope.broadcasting =true;
        webrtc.joinRoom($scope.roomId);
            
//        });
    };
    
    $scope.leaveRoom = function(){
        webrtc.leaveRoom();
    }
    
    
    $scope.mute=function(){
        webrtc.mute();
    }
    
    $scope.sendChat = function(){
      webrtc.sendDirectlyToAll('chatMsg','message',{'msg':$scope.message});
      $scope.message="";
    }
    
    $scope.disconnect =function(){
        webrtc.leaveRoom();
        webrtc.disconnect();
        webrtc.stopLocalVideo();
        $scope.broadcasting =false;
    }
    
});
app.controller('AskQuesController',function($scope,$state,QuestionService){
    $scope.question="";
    $scope.skills=[1];
    
    $scope.askQuestion = function(){
        console.log('ask now > ', $scope.question);
        QuestionService.ask({'question':$scope.question,'skills': $scope.skills}).then(function(res){
            window.location="#/question/"+res.data.data.id;
        });
    }
});
app.controller('BroadReciverController',function($scope,$stateParams){
   var options = {
            // the id/element dom element that will hold "our" video
          localVideoEl: 'viewer-localVideo',
          // the id/element dom element that will hold remote videos
          remoteVideosEl: 'viewer-remotesVideos',
//          debug :true,
          autoRequestMedia: true,
          
          localVideo : {
              autoplay: true, // automatically play the video stream on the page
              mirror: true, // flip the local video to mirror mode (for UX)
              muted: true // mute local video stream to prevent echo
          },
          receiveMedia : { offerToReceiveAudio: 1, offerToReceiveVideo: 1 }
        
        };
    webrtc = new SimpleWebRTC(options);

    webrtc.on('videoAdded',function(videoEl, peer){
    }); 

    $scope.broadcasting =true;

    webrtc.joinRoom($stateParams.channel);
});
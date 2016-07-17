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
app.controller('BroadcastController', function($scope,$rootScope) {
    $scope.mode='details';
    $scope.broadcasting =false;
    $scope.roomId = "room/1";
    $scope.message="";
    $rootScope.headerOff=true;
    
    $scope.joinRoom = function(){
        
        $scope.broadcasting =true;
        $scope.msg={'broadcasting':$scope.broadcasting};
        console.log('join the room ',webrtc);
        var options = {
            // the id/element dom element that will hold "our" video
          localVideoEl: 'viewer-localVideo',
          // the id/element dom element that will hold remote videos
          remoteVideosEl: 'viewer-remotesVideos',
          debug :true,
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
            console.log('>>>>>>>>>>>>',videoEl);
            console.log('>>>>>>>>>>>>',peer);
        });
        
        
        $scope.broadcasting =true;
        
        console.log('>>>>>>>>>>>  join room :: ' +$scope.roomId);
        webrtc.joinRoom($scope.roomId);
        webrtc.resume();
        $scope.msg={'broadcasting':$scope.broadcasting};
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
        webrtc.disconnect();
    }
    
});
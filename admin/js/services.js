app.service('UrlService',function(){
    var devUrl="http://52.66.72.133";
    var interests = devUrl+"/interest";
    var questions = devUrl+"/questions";
    var xperts = devUrl+"/xpert";
    var broadcasts = devUrl+"/broadcast";
    return {
        serverUrl : function(){
            return devUrl;
        },
        interest : {
            list : function(){ return interests+"/list"; }
        },
        question : {
            list : function(){ return questions+"/list"; },
            info : function(){ return questions+"/answers"; },
            answer : function(){ return questions+"/replyAnswer"; },
            ask : function(){ return questions+"/create"; },
        },
        xpert : {
            list : function(){ return xperts+"/list"; },
            info : function(id){ return xperts+"/detail/"+id;}
        },
        broadcasts : {
            list : function(){ return broadcasts+"/xperts"; }
        }
        
    }
});

app.service('InterestService',function($http,UrlService){
    return {
        list : function(){
            return $http.get(UrlService.interest.list(),{headers:{}});
        }
    }
});

app.service('QuestionService',function($http,UrlService){
    return {
        list : function(){
            return $http.post(UrlService.question.list(),{headers :{}});
        },
        info : function(id){
            return $http.post(UrlService.question.info(),JSON.stringify({'questionId':id}),{headers : {'Content-Type':'application/json'}});
        },
        'answer' : function(data){
            return $http.post(UrlService.question.answer(),JSON.stringify(data),{headers : {'Content-Type':'application/json','X-Auth-Token':'d6de2cfb3afc489f972441a3a8c9a5be'}});
        },
        ask : function(data){
             return $http.post(UrlService.question.ask(),JSON.stringify(data),{headers : {'Content-Type':'application/json','X-Auth-Token':'d6de2cfb3afc489f972441a3a8c9a5be'}});
        }
    }
});
app.service('BroadcastService',function($http,UrlService){
    return {
        list : function(){
            return $http.get(UrlService.broadcasts.list(),{headers : {}});
        }
    }
});

app.service('XpertService',function($http,UrlService){
    return {
        list : function(){
            return $http.get(UrlService.xpert.list(),{headers : {}});
        },
        broadcasts : function(){
            return $http.get(UrlService.broadcasts.list,{});
        },
        info : function(id){
            return $http.get(UrlService.xpert.info(id),{});
        }
        
    }
});
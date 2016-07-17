app.directive('viewQuestion',function(){
    return {
        templateUrl : 'admin/directives/question/view.html'
    }
});
app.directive('editQuestion',function(){
    return {
        templateUrl : 'admin/directives/question/edit.html'
    }
});
app.directive('topicList',function(){
    return {
        templateUrl : 'admin/directives/topic/list.html'
    }
});
app.directive('categoryList',function(){
    return {
        templateUrl : 'admin/directives/category/list.html'
    }
});
app.directive('addTopic',function(){
    return {
        templateUrl : 'admin/directives/topic/create.html'
    }
});
app.directive('addCategory',function(){
    return {
        templateUrl : 'admin/directives/category/create.html'
    }
});
app.directive('alert',function(){
    return {
        templateUrl : 'admin/directives/util/alert.html'
    }
});
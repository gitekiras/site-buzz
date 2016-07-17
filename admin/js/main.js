var app=angular.module('interview',['ui.router']);

app.run(function($http,$rootScope){
   

});

app.filter('ansImg',function(){
    var base ='http://res.cloudinary.com/spartan-xpert/image/gplus/h_50,w_50';
    return function(src){
        return base+'/'+src;
    }
});
app.filter('userThumb',function(){
    var base ='http://res.cloudinary.com/spartan-xpert/image/gplus/h_100,w_100';
    return function(src){
        return base+'/'+src;
    }
});

app.filter('skillLeftThumb',function(){
    var base ='http://res.cloudinary.com/spartan-xpert/image/upload/h_100,w_100,c_thumb,r_max,g_face';
    return function(src){
        return base+'/'+src;
    }
});

$(document).on('click','.pointer',function(){
    var href=$(this).data("href");
    window.location=href;
});
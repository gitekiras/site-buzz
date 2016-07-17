app.filter('listCount',function(){
    return function(list){
        return list.length;
    }
});

app.filter('arrayFromNumber',function(){
    return function(n){
        return new Array(5);
    }
});

app.filter('integreToChar',function(){
    return function(n){
        return String.fromCharCode(65+n);
    }
});
app.filter('escapeHtml', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
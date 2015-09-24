Promise.each = function(array,fn){
  var l = array.length;
  var i = 0;
  return new Promise(function(res,rej){
    array.forEach(function(item){
      fn(item).then(function(){
        i++;
        if(i===l) res();
      }).catch(rej);
    });
  });
};
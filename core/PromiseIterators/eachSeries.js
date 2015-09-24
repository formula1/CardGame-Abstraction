Promise.each = function(array,fn){
  var l = array.length;
  var i = 0;
  return new Promise(function(res,rej){
    var next = function(){
      fn(array[i]).then(function(){
        i++;
        if(i===l) return res();
        next();
      }).catch(rej);
    };
    next();
  });
};
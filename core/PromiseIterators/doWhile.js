Promise.doWhile = function(tf,fn){
  return new Promise(function(res,rej){
    var repeat = function(){
      fn().then(function(){
        if(tf()) repeat();
        else res();
      }).catch(rej);
    };
    repeat();
  });
};
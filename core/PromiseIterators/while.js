Promise.while = function(tf,fn){
  return new Promise(function(res,rej){
    var repeat = function(){
      if(tf()) fn().then(repeat).catch(rej);
      else res();
    };
    repeat();
  });
};
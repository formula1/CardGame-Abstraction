

function Player(){
  this.events = {};
}

/*
  Player Can
    -View A Pile
    -Do an Action
*/

Player.prototype.pre = function(action,fn){
  if(!(action in this.events)) this.events[action] = {pre:[],post:[]};
  this.events[action].pre.push(fn);
};

Player.prototype.post = function(action,fn){
  if(!(action in this.events)) this.events[action] = {pre:[],post:[]};
  this.events[action].post.push(fn);
};

Player.prototype.run = function(event,prepost){
  var player = this;
  return new Promise(function(res,rej){
    if(!(event in player.events)) return res();
    var ev;
    if(prepost < 0){
      ev = player.events[event].pre;
    }else if(prepost > 0){
      ev = player.events[event].post;
    }
    if(ev.length === 0) return res();
    Promise.eachSeries(ev,function(listener){
      return listener();
    });
  });
};

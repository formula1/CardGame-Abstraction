var Game = require('game');
var Pile = require('pile');
var Player = require('Player');


function PersonalDeckGame(players){
  Game.call(this,players);
  var self = this;
  this.alivePlayers = players.map(function(p){ return p; });
  return this.chooseDeck().then(function(){
    return self.resolveMulligans();
  }).then(function(){
    return self.takeTurns();
  });
}

PersonalDeckGame.prototype.chooseDeck = function(){
  var alivePlayers = this.alivePlayers;
  return Promise.each(players,function(player,index){
    player.index = index;
    player.on('dead',function(){
      alivePlayers.splice(alivePlayers.indexOf(player),1);
    });
    player.on('leave',function(){
      player.kill();
    });
    return player.chooseDeck();
  });
};

PersonalDeckGame.prototype.resolveMulligans = function(){
  /* We resolve mulligans.
      We need this after deck choice because...
      1. Aggressive mulligans will affect opponents deck/card choice(s) (BAD)
      2. Aggressive mulligans will affect opponents aggressiveness (GOOD)
        - Starter has the advantage
  */
  var starter = Math.floor(Math.random()*players.length);
  return Promise.eachSeries(players,starter,function(player){
    return player.resolveMulligan();
  });
};

PersonalDeckGame.prototype.takeTurns = function(){
  return Promise.doWhile(function(){
    return alivePlayers.length > 1;
  },function(){
    return Promise.eachSeries(alivePlayers,function(player){
      return player.takeTurn().catch(function(err){
        if(err.type === Player.DEAD){
          return true;
        }
        if(err.type === Player.LEAVE){
          return true;
        }
        throw err;
      });
    });
  });
};

var EE = require('events').EventEmitter;

function Game(players){
  EE.call(this);
  this.players = players||[];
}

Game.prototype = Object.create(EE.prototype);
Game.prototype.constructor = Game;

Game.prototype.start = function(){
  this.pre('start',this);
  this.replace('start',this);
  this.post('start',this);
};

Game.prototype.end = function(){
  this.pre('end',this);
  this.replace('end',this);
  this.post('end',this);
};

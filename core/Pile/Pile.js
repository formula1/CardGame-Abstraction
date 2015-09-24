var shuffles = require('./Shuffles');

function Pile(game,owner,parent){
  this.game = game;
  this.owner = owner;
  this.parent = parent;
  this.children = [];
  Array.apply(this);
}

Pile.prototype = Object.create(Array.prototype);

Pile.prototype.constructor = Pile;


Pile.fromArray = function(array){
  var p = new Pile();
  while(array.length) p.push(new Card(array.pop()));
  return p;
};

Pile.prototype.shuffle = function(){
  shuffles.randomize(this);
};

Object.defineProperty(Pile.prototype,'select',{
  get: function(){
    if(this.children.length)
  }
});

// Expects a selection algorithm
Pile.prototype.view = function(player,selector){
  var selection = selection(this);
  return selection;
};


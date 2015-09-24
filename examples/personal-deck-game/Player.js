var Player = require('player');
var Action = require('action');

function PDPlayer(game){
  Player.call(this,game);
  this.pre('turn',function(){
    return player.deck.select.top(1).moveTo(player.hand);
  });
}

PDPlayer.prototype.chooseDeck = function(){
  var player = this;
  var game = this.game;
  return player.request('deck',function(deckArray){
    player.deck = Pile.fromArray(game,deckArray); //Deck instanceof Pile
    player.hand = new Pile(game);
    player.hand.permit(player,"view","execute","reorder");
    player.board = new Pile(game);
    player.board.permit(PDPlayer.ALLPLAYERS,"view");
    player.board.permit(player,'execute');
  });
};

PDPlayer.prototype.resolveMulligan = function(){
  var player = this;
  var playerUnhappy = true;
  var cardsToDraw = 8;
  return Promise.while(function(){
    return playerUnhappy && cardsToDraw;
  },function(){
    cardsToDraw--;
    player.hand.select.all().moveTo(player.deck).then(function(){
      player.deck.shuffle();
      return player.deck.select.top(cardsToDraw).moveTo(player.hand);
    }).then(function(){
      return player.offer([
        {
          title:"Draw a new Hand of "+cardsToDraw,
          value: true
        },
        {
          title: "Keep This Hand",
          value: false
        }
      ],"Deny this Hand?").then(function(boo){
        playerUnhappy = boo;
      });
    });
  });
};

PDPlayer.prototype.takeTurn = function(){
  var player = this;
  return this.run(-1,'turn').then(function(){
    var curAction;
    return Promise.doWhile(function(){
      return player.request('action').then(function(action){
        curAction = new Action(action);
      }).then(function(){
        return curAction.resolve();
      }).catch(function(err){
        if(err.type === PDPlayer.DEAD && err.player === player){
          // If the player is dead, we want to stop all future actions
          throw err;
        }
        // If the action cannot be resolved or is Improper, we still are expecting next action
        return true;
      });
    },function(){
      return !curAction || curAction.type !== 'end';
    }).then(function(){
      return player.run(1,'turn');
    });
  });
};

PDPlayer.prototype.lose = function(){
  
};


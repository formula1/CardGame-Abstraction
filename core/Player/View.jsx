var React = require('react');
var Player = require('./Player');

var Table = React.createClass({
  getInitialState:function(){
    // not every game will be turn based
    // some will have both players do turns at the same time
    // but all 'turns' will have players waiting for a decision
    return {
      players:[],
      resources:[],
      piles:[]
    };
  },
  render: function(){
    // If its the players turn, highlight them
    return <div>
      <div>
        <h1>Players</h1>
        <ul>{this.state.players.map(function(player){
            return <li><Player player={player} /></li>;
        })}</ul>
      </div>
      <div>
        <h1>Piles</h1>
        <ul>{this.state.piles.map(function(pile){
            return <li><Pile pile={pile} /></li>;
        })}</ul>
      </div>
      <div>
        <h1>Global Recources</h1>
        <ul>{this.state.resources.map(function(r){
            if(r instanceof Value){
              return <li><Value resource={r} /></li>;
            }
            if(r instanceof Percentage){
              return <li><PercentageView resource={r} /></li>;
            }
            if(r instanceof Enumerated){
              return <li><EnumeratedView resource={r} /></li>;
            }
        })}</ul>
      </div>
    </div>;
  }
});
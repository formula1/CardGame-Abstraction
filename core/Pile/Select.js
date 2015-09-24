
/*

  A card that will be complicated is when...
  Player takes top 3 cards of a pile and puts them in a 'current view' pile
  - All of those cards can be
    - Viewed by the player
      - If the player stops viewing
        - the 'current view' pile is put on top of the original pile
    - Be put on the bottom of the original Pile
      - If the player chooses to put a card to the bottom
      - The top card of the original pile is moved to the 'current view' pile
      - Triggers 'card is viewed'
  - All cards in the 'current view' pile are still considered a part of the original pile
*/


function Select(pile){
  this.pile = pile;
  this.selectors = [];
}

Select.prototype.top = function(number,skip){
  var i = binaryOps.find(this.pile,number,function(){

  });
  this.selectors.push();
};

Select.prototype.bottom = function(number,skip){

};

Select.prototype.matching = function(fn){

};

Select.prototype.pattern = function(start,whileFn,incrementFn){

};

Select.prototype.at = function(index){
  var i = binaryOps.find(this.selectors,function(selector){
    if(index < selector.start) return -1;
    if(selector.start+selector.length > index) return 1;
    return 0;
  });
  if(binaryOps.isFound(i)){
    //Should I remove I? That would mean I split the range in two
    return;
  }
  attemptToConsolidate(i,{start:index,length:1});
};

Select.prototype.attemptToConsolidate = function(loc, obj){
  var testSel;
  if(loc === Number.NEGATIVE_INFINITY){
    testSel = this.selectors[0];
    if(testSel.start === obj.start+obj.length) return testSel.start = obj.start;
    return this.selectors.unshift(obj);
  }
  if(loc === Number.POSITIVE_INFINITY){
    testSel = this.selectors[this.selectors.length-1];
    if(testSel.start+testSel.length === obj.start) return testSel.length+=testSel.length;
    return this.selectors.push(obj);
  }
  var top = false;
  var bot = false;
  loc *= -1;
  testSel = this.selectors[loc];
  if(testSel.start+testSel.length === obj.start){
    testSel.length+=testSel.length;
    top = true;
  }
  testSel = this.selectors[loc+1];
  if(testSel.start === obj.start+obj.length){
    testSel.start = obj.start;
    bot = true;
  }
  if(top && bot){
    testSel.start = this.selectors[loc].start;
    this.selectors.splice(loc,1);
  }else if(!top && !bot){
    this.selectors.splice(loc,0,obj);
  }
};

Select.prototype.all = function(){
  this.selectors = [{
    start:0, length:this.pile.length
  }];
};

Select.prototype.moveTo = function(otherPile,bottom){
  var toMove = [];
  var cur;
  while(this.selectors.length){
    cur = this.selectors.shift();
    toMove.push.apply(toMove,this.pile.splice(cur.start,cur.length));
  }
  if(bottom) otherPile.push.apply(otherPile,toMove);
  else otherPile.unshift.apply(otherPile,toMove);
};


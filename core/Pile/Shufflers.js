
// Count the number of cards
// while the count is greater than zero
// choose a random card from the top number
// add it to the bottom, reduce the count

// This is the most 'random' however it is not reversable

module.exports.randomize = function(array){
  var l = array.length;
  while(l--){
    array.push(array.splice(Math.floor(Math.random()*l),1)[0]);
  }
  return array;
};

// Split the deck into multiple piles, reverse the order they originally were in

module.exports.reverse = function Reverse(array, num_splits){
    if(typeof num_splits == "undefined") num_splits = 2;
    return concatArrays(array,createSplits(array,num_splits).reverse());
};

//Similar to folding a peice of paper, the bottom meets the top. Only the middle stays the same

module.exports.foldShuffle = function FoldShuffle(array,num_splits){
  if(typeof num_splits == "undefined") num_splits = 4;

  var splits = createSplits(array,num_splits);
  while(splits.length){
    if(splits.length === 1) array.push.apply(array,splits.pop());
    else{
      array.push.apply(array,mergeArrays([],[splits.shift(),splits.pop()]));
    }
  }
  return array;

};

// Split the original pile into seperate piles
// Keep adding one from each of the piles into a new pile until non are left


module.exports.cascadeShuffle = function CascadeShuffle(array, num_splits){
  if(typeof num_splits == "undefined") num_splits = 2;
  return mergeArrays(array,createSplits(array,num_splits));
};

// The top card of the original pile goes into seperate piles until there are non left
// Put them all togethor

module.exports.pileShuffle = function PileShuffle(array, num_splits){
  if(typeof num_splits == "undefined") num_splits = 2;
  return concatArrays(array,distributePiles(array,num_splits));
};


// Below are some helper functions


function createSplits(array, num_splits){
  var items_per_split = Math.ceil(Original_length/num_splits);

  var splits = [];
  var l=0;
  while(l++ < num_splits){
    splits.push(array.splice(0,items_per_split));
  }
  return splits;
}

function distributePiles(array, num_splits){
  var l=0;
  var splits = [];
  while(l++ < num_splits) splits.push([]);

  var split = 0;
  l = array.length;
  while(l--){
    splits[split].push(array.shift());
    split = (split + 1)%num_splits;
  }
  return splits;
}


function mergeArrays(holder,splits){
  var l = splits.length;
  while(l--){
    while(splits[l].length){
      holder.push(splits[l].shift());
    }
  }
}


function concatArrays(holder, splits){
  var l = splits.length;
  while(l--){
    holder.push.apply(holder,splits.pop());
  }
}




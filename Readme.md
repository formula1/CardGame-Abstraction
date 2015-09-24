### Cardgame Abstract

#### General Concept

1. Every Card game has an end
  - Some Games have a win condition
  - Some Games have a loss condition
  - Some Games have a tie condition
  - When All players leave, the game ends
  - Can be based off State after a number of turns played
  - Can be based off State after a Game Step
  - Can be based off a specific Gamestate Reached
3. Games have a game state
  - The state can be modified
  - the state involves piles, resources and counters
  - the game state results in a win condition after modifications
  - the game state can result in a loss condition
3. Modifications to a Game State is an Effect
  - An effect can be permenent or temporary
  - an Effect may be conditional
4. Every Card Game has actions a player can make
  - An action is when a player can modify the game state (Effect)
  - These actions may be associated to cards, piles, players' state or the game state
  - These actions may be given or taken away
  - There are cases where a player can make no more actions
  - An action may request an action from another player before modifying the gamestate
5. Many games have effects that are caused by a reaction to something
  - When reacting, these effects can happen before, replacing or after what its waiting for
  - Reactions can be based off an Action, an Effect or another reaction
  - A Reaction needs a reason to happen
6. Every Card game has a series of piles
  - Piles may be viewed, reordered, moved To a different pile or have actions that can be executed
  - Piles can be evaluated to a value
  - Multiple piles (Children) can be considered a single pile (Parent) however each has seperate permissions
  - 2 Parent Piles can share children
7. Every Card Game is Based on Cards
  - A Card can enable an action
  - A Card can enable a reaction
  - A Card can cause an effect
  - A card can have resources
  - A card can have meta information

#### Road Map

1. Pick a popular card game
2. PsuedoCode it
3. Implement the functions necessary while keeping things abstract and flexible
4. Eventually Enable Card/Game Descriptions to be automated

#### How to be involved

1. Pick some code
2. Follow its function flow
3. If the object doesn't exist, create it with properties you/others will likely be reusing
4. If a function doesn't exist, create it

#### Keeping things Abstract and Flexible

1. When a function will require a user to be notified of updates, make it into a promise
  - likely the database would like to know as well When state is held
  - Also it might be a good thing to ensure the user has recieved a message
2. When a function will require user input, make it into a promise
  - We don't know when the user will respond
  - Games will likely be done on websockets or
3. Something done will have alot of its own custom logic/methods/syntax, make it into a new class

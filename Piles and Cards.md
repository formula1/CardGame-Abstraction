### Card

Cards do most of the heavy lifting in card games. Examples are

1. Poker
  - Cards have meta information
  - this information on each card can be reduced to a single value (hand/hand strength)
2. Magic The Gathering
  - Cards enable/disable actions
  - Cards cause replacement effects
  - Cards listen and react or deafen listeners
  - Cards can have resources (counters/attack/toughness)
  - Cards can modify player resources or card resorces
  - Card actions may only be enabled in specific zones and with specific resources available
    - Cast - Only from hand, needs to meet mana requirement
3. Solitair
  - Cards have meta information
  - A card with specific meta information can only go ontop of certian piles

#### Piles

There are a series of piles that get created in the course of a cardgame.
Some Examples are...

Poker
- Deck
- Cards Viewable By Everyone
  - Burned cards
  - River
- Each player
  - Hand

Magic the gathering
- Each Player
  - Deck
  - Hand
  - Battlefield
    - Attachments to Cards
  - Graveyard
  - Exile Zone

The point being is that piles are necessary to every cardgame. A pile can...

1. Have cards moved from itself to another pile
2. Can have restricted viewing: A query or array of players
3. Can enable actions or triggers that effect all individual cards within its scope
4. Originate from somewhere (Player, Computer, Generated)
5. Can check for conditions of the


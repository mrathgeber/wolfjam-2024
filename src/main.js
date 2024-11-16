import * as PIXI from 'pixi.js';
import { initDevtools } from '@pixi/devtools';

import { initStartContainer } from './StartContainer/StartContainer.js';
import { initTitleText } from './StartContainer/TitleText.js';

import { initPlayButtonContainer } from './StartContainer/PlayButton/PlayButtonContainer.js';
import { initPlayButton } from './StartContainer/PlayButton/PlayButton.js';
import { initPlayText } from './StartContainer/PlayButton/PlayText.js';

import Deck from './CardDeck/CardDeck.js';
import { initBg } from './Location/location.js';

import cards from './CardDeck/cards.json' assert { type: 'json' };

(async () => {
  const app = new PIXI.Application();

  await app.init({
    resizeTo: window,
    backgroundAlpha: 1,
  });

  app.canvas.style.position = 'absolute';
  document.body.appendChild(app.canvas);

  initDevtools({ app });


  /* ---------- Text Styes ---------- */

  const titleStyle = new PIXI.TextStyle({
    fill: 0xffffff,
    fontSize: 72,
    fontFamily: 'Poppins',
  });

  const playStyle = new PIXI.TextStyle({
    fill: 0x000000,
    fontSize: 30,
    fontFamily: 'Poppins',
  });

  /* ---------- Start Container ---------- */

  const StartContainer = initStartContainer(app);
  app.stage.addChild(StartContainer);

  /* ---------- Title Text ---------- */

  const text = initTitleText(app, titleStyle);
  StartContainer.addChild(text);

  /* ---------- Play Button ---------- */

  const playButtonContainer = initPlayButtonContainer();
  StartContainer.addChild(playButtonContainer);

  const playButton = initPlayButton();
  const playText = initPlayText(playStyle);

  playButtonContainer.addChild(playButton);
  playButtonContainer.addChild(playText);

  /* --------Play Origin Story-------- */

  await initBg(app, 0);

  const CardDeck = Deck.initCardDeck();
  app.stage.addChild(CardDeck);

  let deckSize = 60;
  startCardDeck(deckSize, app, CardDeck, "Origin");

  /* ---------- Start Game Mouse Events ---------- */

  playButtonContainer.interactive = true;

  playButtonContainer.on('pointerover', () => {
    app.canvas.style.cursor = 'pointer';
  });

  playButtonContainer.on('pointerout', () => {
    app.canvas.style.cursor = 'default';
  });

  playButtonContainer.on('pointerdown', async () => {
    app.stage.removeChild(StartContainer);

    await initBg(app, 0);

    const CardDeck = Deck.initCardDeck();
    app.stage.addChild(CardDeck);

    let deckSize = 60;
    startCardDeck(deckSize, app, CardDeck);
  });
})();

async function startCardDeck(deckSize, app, CardDeck) {
  CardDeck.visible = true;

  const backstoryCards = cards.locations.backstory;
  console.log(backstoryCards.length);

  for (let i = 0; i < backstoryCards.length; i++) {
    const backstoryCard = backstoryCards.cards[backstoryCards.length - 1 - i];
    const card = await Deck.initCard(app, backstoryCard.dialogue);
    CardDeck.addChild(card);
  }

  // for (let i = 0; i < deckSize; i++) {
  //   const card = await Deck.initCard(app, deckSize - i);
  //   CardDeck.addChild(card);
  // }
}

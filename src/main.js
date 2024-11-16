import * as PIXI from 'pixi.js';
import { initDevtools } from '@pixi/devtools';

import { initStartContainer } from './StartContainer/StartContainer.js';
import { initTitleText } from './StartContainer/TitleText.js';

import { initPlayButtonContainer } from './StartContainer/PlayButton/PlayButtonContainer.js';
import { initPlayButton } from './StartContainer/PlayButton/PlayButton.js';
import { initPlayText } from './StartContainer/PlayButton/PlayText.js';

import Deck from './CardDeck/CardDeck.js';

(async () => {
  const app = new PIXI.Application();
  
  await app.init({
    resizeTo: window,
    backgroundAlpha: 1,
  });

  app.canvas.style.position = 'absolute';
  document.body.appendChild(app.canvas);

  initDevtools({ app });

  loadStartMenu(app);

  /* ---------- Card Deck Container ---------- */

  const CardDeck = Deck.initCardDeck();
  app.stage.addChild(CardDeck);

  setTimeout(() => {
    startCardDeck(app, CardDeck);
  }, 3000);

})();

function loadStartMenu(app) {

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

  /* ---------- Start Game Mouse Events ---------- */

   playButtonContainer.interactive = true;

    playButtonContainer.on('pointerover', () => {
        app.canvas.style.cursor = 'pointer';
    });
      
    playButtonContainer.on('pointerout', () => {
        app.canvas.style.cursor = 'default';
    });

    playButtonContainer.on('pointerdown', () => {
        StartContainer.visible = false;
      });
}

function startCardDeck(app, CardDeck) {
  CardDeck.visible = true;

  const card = Deck.initCard(app);
  const card2 = Deck.initCard(app);
  CardDeck.addChild(card);
  CardDeck.addChild(card2);
  }

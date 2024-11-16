import * as PIXI from 'pixi.js';

const Deck = {
   //creates invisible box where cards will go
   initCardDeck() {
      const CardDeck = new PIXI.Container();
      CardDeck.visible = false;
      return CardDeck;
   },
   //creates a card
<<<<<<< HEAD
   async initCard(app, num, deck_name, id) {
=======
   async initCard(app, dialogue) {
>>>>>>> a5cecc7ca2657f3220a7843480bafd4f07036a59
      const card = new PIXI.Container();
      const cardWidth = 300;
      const cardHeight = 400;
      card.width = cardWidth;
      card.height = cardHeight;

      const startCardX = (app.screen.width - cardWidth) / 2;
      const startCardY = (app.screen.height - cardHeight) / 2;
      


      const cardBG = new PIXI.Graphics();
      cardBG.roundRect(startCardX, startCardY, cardWidth, cardHeight, 20);
      cardBG.fill('white');
      card.addChild(cardBG);

      const content = new PIXI.Text({text: dialogue, style: {fontSize: 12, fill: 0x0000FF, wordWrap: true, wordWrapWidth: 200, }});
      // content.anchor.set(0.5);
      // content.position.set((cardBG.width + content.width) / 2, (cardBG.height + content.height)/ 2);
      
      content.x = app.screen.width / 2 - content.width / 2;
      content.y = app.screen.height / 2 - content.height / 2 - 150;
      card.addChild(content);

      let response = await fetch("../../card-data.json");
      let data = await response.json();
      
      let background = data.deck_name[id].ImageSrc;
      await PIXI.Assets.load(background);
      const bg = PIXI.Sprite.from(background);
      bg.width = app.screen.width;
      bg.height = app.screen.height;
      app.stage.addChild(bg);


      await PIXI.Assets.load('../../textures/char1.png');
      const character = PIXI.Sprite.from('../../textures/char1.png');
      character.x = app.screen.width / 2 - character.width / 2;
      character.y = app.screen.height / 2 - character.height / 2;
      card.addChild(character);

      
      
      /* *** */

      let startX = 0;
      let isDragging = false;
      card.interactive = true;

      //changed arrow to finger
      card.on('pointerover', () => {
         app.canvas.style.cursor = 'pointer';
      });

      //finger -> pointer
      card.on('pointerout', () => {
         app.canvas.style.cursor = 'default';
      });


      card.on('pointerdown', (event) => {
         startX = event.global.x;
         isDragging = true;
      });
      card.on('pointermove', (event) => {
         if (!isDragging) return;
         const deltaX = event.global.x - startX;
         card.x += deltaX;
         // card.rotation = deltaX / 500;  // Rotate slightly based on movement
         startX = event.global.x;
      });

      // Pointer up event
      card.on('pointerup', (event) => {
         isDragging = false;

         // Determine swipe direction and animate
         if (Math.abs(card.x) > 150) {
            // Swipe left or right
            const direction = card.x > 0 ? 1 : -1;
            Deck.animateSwipeOff(app, card, direction);
         } else {
            // Return to center if swipe wasn't strong enough
            Deck.animateResetPosition(app, card);
         }
      });

      return card;
   },
   animateSwipeOff(app, card, direction) {
      const targetX = direction > 0 ? app.screen.width + card.width : app.screen.width - card.width;
      const targetRotation = direction > 0 ? 0.3 : -0.3; // Tilt angle (in radians)
      const swipeSpeed = 10;

      // Animate card position
      app.ticker.add(function swipeOff() {
         card.x += direction * swipeSpeed;
         card.y += 2
         // card.rotation += direction * 0.005;

         // Remove card when it goes off-screen
         if ((direction > 0 && card.x > app.screen.width + card.width) ||
            (direction < 0 && card.x < -app.screen.width)) {
            app.ticker.remove(swipeOff);
            app.stage.removeChild(card);
            // Optionally, create a new card or trigger an event here
         }
      });
   },
   animateResetPosition(app, card) {
      const startX = card.x;
      const startRotation = card.rotation;
      const duration = 15;
      let frame = 0;

      app.ticker.add(function reset() {
         frame += 1;
         card.x = startX + (0 - startX) * (frame / duration);
         card.rotation = startRotation * (1 - frame / duration);

         if (frame >= duration) {
            app.ticker.remove(reset);
            card.x = 0;
            card.rotation = 0;
         }
      });
   }
};



export default Deck;
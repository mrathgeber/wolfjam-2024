import * as PIXI from 'pixi.js';

const Deck = {
   initCardDeck() {
      const CardDeck = new PIXI.Container();
      CardDeck.visible = false;
      return CardDeck;
   },
   initCard(app) {
      const card = new PIXI.Container();
   
      const cardWidth = 300;
      const cardHeight = 400;
      const startCardX = (app.screen.width - cardWidth) / 2;
      const startCardY = (app.screen.height - cardHeight) / 2;
   
      const cardBG = new PIXI.Graphics();
      cardBG.roundRect(startCardX, startCardY, cardWidth, cardHeight, 20);
      cardBG.fill('white');
      card.addChild(cardBG);
      
      const content = new PIXI.Text({ text: "Scenario 1", fontSize: 24, fill: 0xffffff});
      // content.anchor.set(0.5);
      // content.position.set((cardBG.width + content.width) / 2, (cardBG.height + content.height)/ 2);
      content.x = (startCardX + cardWidth) / 2;
      content.y = (startCardY + cardHeight) / 2;
      card.addChild(content);

      /* *** */

      let startX = 0;
      let isDragging = false;
      card.interactive = true;

      card.on('pointerover', () => {
         app.canvas.style.cursor = 'pointer';
      });
     card.on('pointerout', () => {
         app.canvas.style.cursor = 'default';
      });
      card.on('pointerdown', (event) => {
          startX = event.global.x;
          isDragging = true;
      });
      card.on('pointermove', (event) => {
          if (!isDragging) return;
          const deltaX = event.data.global.x - startX;
          card.x += deltaX;
          card.rotation = deltaX / 500;  // Rotate slightly based on movement
          startX = event.global.x;
      });
  
      // Pointer up event
      card.on('pointerup', (event) => {
          isDragging = false;
          const endX = event.data.global.x;
  
          // Determine swipe direction and animate
          if (Math.abs(card.x - app.screen.width / 2) > 100) {
              // Swipe left or right
              const direction = card.x > app.screen.width / 2 ? 1 : -1;
              Deck.animateSwipeOff(app, card, direction);
          } else {
              // Return to center if swipe wasn't strong enough
              Deck.animateResetPosition(app, card);
          }
      });
   
      return card;
   },
   animateSwipeOff(app, card, direction) {
      const targetX = direction > 0 ? app.screen.width + card.width : -card.width;
      const swipeSpeed = 10;

      // Animate card position
      app.ticker.add(function swipeOff() {
         card.x += direction * swipeSpeed;
         card.rotation += direction * 0.05;

         // Remove card when it goes off-screen
         if ((direction > 0 && card.x > app.screen.width + card.width) || 
            (direction < 0 && card.x < -card.width)) {
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
         card.x = startX + (app.screen.width / 2 - startX) * (frame / duration);
         card.rotation = startRotation * (1 - frame / duration);

         if (frame >= duration) {
            app.ticker.remove(reset);
            card.x = app.screen.width / 2;
            card.rotation = 0;
         }
      });
   }
};

export default Deck;
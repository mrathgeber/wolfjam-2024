import * as PIXI from 'pixi.js';

export function initTitleText(app, textStyle) {
   const text = new PIXI.Text({text: 'GameX!!!', style: textStyle});
   text.alpha = 0.65;
   text.x = 0;
   text.y = -50;
   text.anchor.set(0.5);

   let blinkSpeed = 0.0135;
   app.ticker.add(() => {
      text.alpha -= blinkSpeed;

      if (text.alpha >= 0.8 || text.alpha <= 0.5) {
         blinkSpeed *= -1;
      }
   });

   return text;
}
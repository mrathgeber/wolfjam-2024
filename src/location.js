import * as PIXI from 'pixi.js';


export async function initBg(app, id) {
   let background;

   fetch("../background.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        background = data.Backgrounds[id].ImageSrc;
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    });
   await PIXI.Assets.load(background);
   const bg = PIXI.Sprite.from(background);
   bg.width = app.screen.width;
   bg.height = app.screen.height;
   app.stage.addChild(bg);
}
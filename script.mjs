function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
}

async function getResult(){
    try{
        let player = 'Tina'
        const Result1 = await luckyDraw(player);
        console.log(Result1);
        player = 'Jorge';
        const Result2 = await luckyDraw(player);
        console.log(Result2);
        player = 'Julien';
        const Result3 = await luckyDraw(player);
        console.log(Result3);
    }
    catch(error){
        console.log(error.message);
    }
}
getResult()

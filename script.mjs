
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

  luckyDraw('Joe')
  .then(resolve => console.log(resolve))
  .then(() => luckyDraw("caroline"))
  .then(resolve => console.log(resolve))
  .then(() => luckyDraw("Sabrina"))
  .then(resolve => console.log(resolve))
  .catch(error => console.log(error.message));



  

  
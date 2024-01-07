function playSound(keyCode) {
    const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
    if (audioElement && key) {
      audioElement.currentTime = 0; 
      audioElement.play();
      // adding playing class for that button
      key.classList.add('playing');

    // transitionend -> It is an event that gets triggered when a CSS transition completes. In the example code, 
    //   the transitionend event is used to remove the 'playing' class after the CSS transition completes, providing 
    //   a smooth visual effect.
      key.addEventListener('transitionend', ()=>{
        key.classList.remove('playing');
      });
    }
}

function handlekeypress(event){
    playSound(event.keyCode);
}

document.addEventListener('keydown', handlekeypress);
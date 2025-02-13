let rnd = (l, u) => Math.random() * (u - l) + l;
let scene;
let balls = [];

window.onload = function() {
  scene = document.querySelector("a-scene");
  let footstep = document.querySelector('#footstep');


  for (let i = 0; i < 1; i++) {
    balls.push(new Ball(-100, 5, 10));
  }
  
  window.addEventListener("keydown", function(e){
	 if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d"){
		if (footstep.paused){ 
		footstep.currentTime = 0;
        footstep.play();
	 } 
	}
  });
  window.addEventListener('keyup', function(e) {
    if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') {
      footstep.pause();
      footstep.currentTime = 0;
	}
  });

}
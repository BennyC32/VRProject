let rnd = (l, u) => Math.random() * (u - l) + l;
let scene, camera, move, move2, move3, ap, apa, ad, ade, ab, abe, box, gameover;
let balls = [];

window.onload = function () {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");
  move = document.querySelector("#move");
  ap = document.querySelector("#ap");
  output = document.querySelector("#output");
  apa = document.querySelector("#apa");
  move2 = document.querySelector("#move2");
  ad = document.querySelector("#ad");
  ade = document.querySelector("#ade");
  move3 = document.querySelector("#move3");
  ab = document.querySelector("#ab");
  abe = document.querySelector("#abe");
  box = document.querySelector("#clickable-box");
  secondcamera = document.querySelector("#secondcamera");
  gameover = document.querySelector("#gameover");
  move.z = 1;
  move.dz = -0.5;

  move2.z = 1;
  move2.dz = -0.5;

  move3.z = 1;
  move3.dz = -0.5;

  for (let i = 0; i < 1; i++) {
    balls.push(new Ball(-100, 5, 10));
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") {
      if (footstep.paused) {
        footstep.currentTime = 0;
        footstep.play();
      }
    }
  });

  window.addEventListener("keyup", function (e) {
    if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") {
      footstep.pause();
      footstep.currentTime = 0;
    }
  });

  box.addEventListener("click", function () {
  console.log("Box clicked!");
  secondcamera.setAttribute("active", true);
  camera.setAttribute("active", false);
  });

  gameover.addEventListener("click", function () {
    console.log("Second Box clicked!");
    let image = document.createElement("a-image");
    image.setAttribute("src", "C.webp");
    image.setAttribute("rotation","0 270 360")
    image.setAttribute("width", "6");
    image.setAttribute("height", "5");
    image.setAttribute("position", "2 305 3");
    image.setAttribute("visible", "true");
    document.querySelector("a-scene").appendChild(image);
    gameover.setAttribute("visible", "false"); 
  });
  /* box.addEventListener("click", function () {
    consolse.log("Box clicked!");
    const image = document.createElement("a-image");
    image.setAttribute("src", "C.webp");
    image.setAttribute("rotation","0 90 360")
    image.setAttribute("width", "10");
    image.setAttribute("height", "10");
    image.setAttribute("position", "145 7 52.5");
    image.setAttribute("visible", "true");
    document.querySelector("a-scene").appendChild(image);
    box.setAttribute("visible", "false"); 
  });
  */
  loop();
};

function loop() {
  let angle = camera.object3D.rotation.y + Math.PI;
  let x = 2 * Math.sin(angle) + camera.object3D.position.x;
  let z = 2 * Math.cos(angle) + camera.object3D.position.z;
  flashlight.setAttribute("position", { x: x, y: 1, z: z });
  // Rotate the box instead of the spot light
  flashlight.object3D.rotation.y = angle + Math.PI;
  flashlight.object3D.rotation.x = camera.object3D.rotation.x * 1.5;

  // Move the cars
  move.z += move.dz;
  move.object3D.position.z = -move.z;

  move2.z += move2.dz;
  move2.object3D.position.z = -move2.z;

  move3.z += move3.dz;
  move3.object3D.position.z = -move3.z;

  // Collision logic for Car 1
  if (distance(move, ap) < 12) {
    console.log("hit");
    move.setAttribute("rotation", "0 180 0");
    move.dz = -move.dz;
  }

  if (distance(move, camera) < 12) {
    camera.setAttribute("position", "0 50 0");
    console.log("spawn");
  }

  if (distance(move, apa) < 12) {
    move.dz = -move.dz;
    move.setAttribute("rotation", "0 360 0");
  }

  // Collision logic for Car 2
  if (distance(move2, ad) < 12) {
    console.log("hit");
    move2.setAttribute("rotation", "0 180 0");
    move2.dz = -move2.dz; // Corrected
  }

  if (distance(move2, camera) < 12) {
    camera.setAttribute("position", "0 50 0");
    console.log("spawn");
  }

  if (distance(move2, ade) < 12) {
    move2.dz = -move2.dz; // Corrected
    move2.setAttribute("rotation", "0 360 0");
  }

  // Collision logic for Car 3
  if (distance(move3, ab) < 12) {
    console.log("hit");
    move3.setAttribute("rotation", "0 180 0");
    move3.dz = -move3.dz; // Corrected
  }

  if (distance(move3, camera) < 12) {
    camera.setAttribute("position", "0 50 0");
    console.log("spawn");
  }

  if (distance(move3, abe) < 12) {
    move3.dz = -move3.dz; // Corrected
    move3.setAttribute("rotation", "0 360 0");
  }

  window.requestAnimationFrame(loop);
}

function distance(obj1, obj2) {
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
  return d;
}
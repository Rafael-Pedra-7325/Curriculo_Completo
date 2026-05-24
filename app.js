// MATRIX RAIN

const canvas = document.getElementById("matrix");

const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters =
"アァカサタナハマヤャラワ0123456789";

const array = letters.split("");

const fontSize = 14;

const columns = canvas.width/fontSize;

const drops = [];

for(let x=0;x<columns;x++){

  drops[x]=1;

}

function draw(){

  ctx.fillStyle="rgba(0,0,0,0.05)";

  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle="#00ff99";

  ctx.font=fontSize+"px monospace";

  for(let i=0;i<drops.length;i++){

    const text =
    array[Math.floor(Math.random()*array.length)];

    ctx.fillText(text,i*fontSize,drops[i]*fontSize);

    if(
      drops[i]*fontSize > canvas.height &&
      Math.random() > 0.975
    ){

      drops[i]=0;

    }

    drops[i]++;

  }

}

setInterval(draw,33);

// CURSOR

const cursor = document.querySelector(".cursor");

const glow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove",(e)=>{

  cursor.style.left=e.clientX+"px";
  cursor.style.top=e.clientY+"px";

  glow.style.left=e.clientX-150+"px";
  glow.style.top=e.clientY-150+"px";

});

// THREE JS GALAXY

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({

  canvas:document.querySelector("#galaxy"),
  alpha:true

});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

camera.position.z=30;

// STARS

const starsGeometry =
new THREE.BufferGeometry();

const starsCount = 15000;

const posArray =
new Float32Array(starsCount*3);

for(let i=0;i<starsCount*3;i++){

  posArray[i]=(Math.random()-0.5)*2000;

}

starsGeometry.setAttribute(
'position',
new THREE.BufferAttribute(posArray,3)
);

const starsMaterial =
new THREE.PointsMaterial({

  size:0.7

});

const starsMesh =
new THREE.Points(
starsGeometry,
starsMaterial
);

scene.add(starsMesh);

// ANIMATION

function animate(){

  requestAnimationFrame(animate);

  starsMesh.rotation.y += 0.0005;

  renderer.render(scene,camera);

}

animate();

// GITHUB API

fetch("https://api.github.com/users/SEUUSERNAME")

.then(res=>res.json())

.then(data=>{

  document.getElementById("repos")
  .innerHTML = data.public_repos;

  document.getElementById("followers")
  .innerHTML = data.followers;

});

// GSAP

gsap.from(".hero-content",{

  opacity:0,
  y:100,
  duration:2

});

gsap.from(".hologram",{

  opacity:0,
  scale:0.5,
  duration:2

});

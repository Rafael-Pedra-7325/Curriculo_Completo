// LOADER

window.addEventListener("load",()=>{

  setTimeout(()=>{

    document.getElementById("loader").style.display="none";

  },2500);

});

// THEME

const themeBtn = document.getElementById("theme-toggle");

themeBtn.onclick = ()=>{

  document.body.classList.toggle("light-mode");

};

// THREE JS

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
  alpha:true
});

renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.z = 30;

// GEOMETRY

const geometry = new THREE.TorusGeometry(10,3,16,100);

const material = new THREE.MeshStandardMaterial({
  color:0x00ffff,
  wireframe:true
});

const torus = new THREE.Mesh(geometry,material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(20,20,20);

scene.add(pointLight);

function animate(){

  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;

  renderer.render(scene,camera);

}

animate();

// PARTICLES

tsParticles.load("particles-js",{

  particles:{
    number:{
      value:120
    },

    color:{
      value:["#00ffff","#ff00ff","#ffffff"]
    },

    links:{
      enable:true,
      color:"#00ffff"
    },

    move:{
      enable:true,
      speed:2
    }
  }

});

// TRANSLATION

let currentLang = "en";

document.getElementById("lang-toggle")
.addEventListener("click",()=>{

  currentLang = currentLang === "en" ? "pt" : "en";

  // sistema de tradução futuramente

});

// SCROLL EFFECT

window.addEventListener("scroll",()=>{

  document.querySelectorAll(".card").forEach(card=>{

    const top = card.getBoundingClientRect().top;

    if(top < window.innerHeight - 100){

      card.classList.add("show");

    }

  });

});

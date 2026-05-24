// LOADER

window.addEventListener("load",()=>{

  setTimeout(()=>{

    document.getElementById("loader").style.opacity="0";

    setTimeout(()=>{

      document.getElementById("loader").style.display="none";

    },1000);

  },2500);

});

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

// GALAXY

const geometry = new THREE.TorusKnotGeometry(
  10,
  3,
  200,
  32
);

const material = new THREE.MeshStandardMaterial({

  color:0x00ffff,
  wireframe:true

});

const torus = new THREE.Mesh(
  geometry,
  material
);

scene.add(torus);

// LIGHT

const pointLight = new THREE.PointLight(
  0xffffff
);

pointLight.position.set(20,20,20);

scene.add(pointLight);

// ANIMATION

function animate(){

  requestAnimationFrame(animate);

  torus.rotation.x += 0.003;
  torus.rotation.y += 0.004;

  renderer.render(scene,camera);

}

animate();

// PARTICLES

tsParticles.load("particles-js",{

  particles:{

    number:{
      value:200
    },

    color:{
      value:["#00ffff","#ff00ff","#ffffff"]
    },

    move:{
      enable:true,
      speed:2
    },

    links:{
      enable:true,
      color:"#00ffff"
    }

  }

});

// GITHUB API

async function fetchGitHub(){

  const username = "SEU_GITHUB";

  const response = await fetch(
    `https://api.github.com/users/${username}`
  );

  const data = await response.json();

  document.getElementById("repo-count")
  .innerText = data.public_repos;

  document.getElementById("followers-count")
  .innerText = data.followers;

}

fetchGitHub();

// ANALYTICS CHART

const ctx = document.getElementById(
  'analyticsChart'
);

new Chart(ctx,{

  type:'radar',

  data:{

    labels:[
      'Frontend',
      'Backend',
      'AI',
      'Database',
      'Cybersecurity',
      'UX/UI'
    ],

    datasets:[{

      label:'Skills',

      data:[95,90,85,92,80,93]

    }]

  }

});

// GSAP ANIMATIONS

gsap.from(".hero-content",{

  opacity:0,
  y:100,
  duration:2

});

gsap.from(".timeline-card",{

  opacity:0,
  y:50,
  stagger:0.3

});

// LIGHT MODE

const themeBtn = document.getElementById(
  "theme-btn"
);

themeBtn.onclick = ()=>{

  document.body.classList.toggle(
    "light-mode"
  );

};

// LANGUAGE

let currentLang = "en";

document.getElementById("lang-btn")
.addEventListener("click",()=>{

  currentLang =
  currentLang === "en" ? "pt" : "en";

});

// CMS

const publishBtn = document.querySelector(
  ".cms-panel button"
);

publishBtn.addEventListener("click",()=>{

  alert("New post published!");

});

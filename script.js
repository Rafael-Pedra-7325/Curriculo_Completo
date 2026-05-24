const typing = document.querySelector(".typing");

const words = [
  "Software Engineer",
  "Full Stack Developer",
  "Computer Science Student",
  "AI Enthusiast",
  "Tech Innovator"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

  const currentWord = words[wordIndex];

  if(!deleting){
    typing.textContent = currentWord.substring(0,charIndex++);
  } else {
    typing.textContent = currentWord.substring(0,charIndex--);
  }

  if(charIndex === currentWord.length + 1){
    deleting = true;
    setTimeout(typeEffect,1000);
    return;
  }

  if(charIndex === 0){
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove",(e)=>{
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

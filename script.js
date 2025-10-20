let userScore = 0;
let computerScore = 0;
const emojis = { rock: "🪨", paper: "📄", scissors: "✂️" };

const emojiArray = ["🪨", "📄", "✂️"];

function createFloatingEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.innerText = emojiArray[Math.floor(Math.random() * emojiArray.length)];
  emoji.style.left = Math.random() * 90 + "vw";
  emoji.style.fontSize = Math.random() * 25 + 15 + "px";
  const xOffset = Math.random() * 100 - 50 + "px";
  emoji.style.setProperty("--xOffset", xOffset);
  emoji.style.animationDuration = Math.random() * 5 + 5 + "s";

  const parentPage = Math.random() > 0.5 ? "frontPage" : "gamePage";
  document.getElementById(parentPage).appendChild(emoji);
  setTimeout(() => emoji.remove(), 10000);
}
setInterval(createFloatingEmoji, 600);

function fadeTransition(fromElem, toElem) {
  fromElem.classList.remove("visible");
  fromElem.classList.add("hidden");
  toElem.classList.remove("hidden");
  toElem.classList.add("visible");

  const title = toElem.querySelector("h1");
  const btns = toElem.querySelectorAll("button");
  title.classList.add("animate-entry");
  btns.forEach((b) => b.classList.add("animate-entry"));
  setTimeout(() => {
    title.classList.remove("animate-entry");
    btns.forEach((b) => b.classList.remove("animate-entry"));
  }, 600);
}

function startGame() {
  fadeTransition(
    document.getElementById("frontPage"),
    document.getElementById("gamePage")
  );
}

function backToFront() {
  fadeTransition(
    document.getElementById("gamePage"),
    document.getElementById("frontPage")
  );
}

function play(userChoice, btn) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  btn.classList.add("pop");
  setTimeout(() => btn.classList.remove("pop"), 200);

  document.getElementById(
    "userChoice"
  ).innerText = `Your Choice: ${emojis[userChoice]} ${userChoice}`;
  document.getElementById(
    "computerChoice"
  ).innerText = `Computer Choice: ${emojis[computerChoice]} ${computerChoice}`;

  let result = "";
  if (userChoice === computerChoice) {
    result = "It's a Draw! 🤝";
    document.getElementById("drawSound").play();
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    result = `You Win! 🎉 ${emojis[userChoice]} beats ${emojis[computerChoice]}`;
    userScore++;
    document.getElementById("winSound").play();
    launchConfetti();
  } else {
    result = `You Lose! 😞 ${emojis[computerChoice]} beats ${emojis[userChoice]}`;
    computerScore++;
    document.getElementById("loseSound").play();
  }

  document.getElementById("result").innerText = result;
  document.getElementById(
    "score"
  ).innerText = `You: ${userScore} | Computer: ${computerScore}`;
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  document.getElementById("userChoice").innerText = "Your Choice: -";
  document.getElementById("computerChoice").innerText = "Computer Choice: -";
  document.getElementById("result").innerText = "Make your move!";
  document.getElementById("score").innerText = `You: 0 | Computer: 0`;
}

function launchConfetti() {
  confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
}

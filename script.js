let p1Name = document.querySelector("#l-name");
let p2Name = document.querySelector("#r-name");
let p1Health = document.querySelector("#l-score");
let p2Health = document.querySelector("#r-score");
let simulateBtn = document.querySelector("#simulate");
let restartBtn = document.querySelector("#restart");
let resultDiv = document.querySelector("#result");

let gameStatus;

let updateGame = (p1, p2, gameStatus) => {
  p1Name.innerText = p1.name;
  p2Name.innerText = p2.name;
  p1Health.innerText = p1.health;
  p2Health.innerText = p2.health;

  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true;
    gameStatus = game.isOver;
    return (resultDiv.innerText = game.whoWon(game.isOver, p1, p2));
  }
};

class Player {
  constructor(name, health, damage) {
    this.name = name;
    this.health = health;
    this.damage = damage;
  }

  strike(player, enemy, attackDmg) {
    let hitPoints = Math.ceil(Math.random() * 10);
    console.log(hitPoints);
    enemy.health -= hitPoints;
    updateGame(p1, p2, gameStatus);
    return `${player.name} strike ${enemy.name} for ${hitPoints} Points`;
  }

  heal(player) {
    let hpIncrement = Math.ceil(Math.random() * 5);
    player.health += hpIncrement;
    updateGame(p1, p2, gameStatus);
    return `${player.name} healed with ${hpIncrement}`;
  }
}

class Game {
  constructor() {
    this.isOver = false;
  }

  whoWon(isOver, p1, p2) {
    let message = null;
    if (isOver == true && p1.health <= 0) {
      message = `${p2.name} Win !`;
    } else if (isOver == true && p2.health <= 0) {
      message = `${p1.name} Win !`;
    }
    document.querySelector("#victory").play();
    return message;
  }

  reset(p1, p2) {
    p1.health = 100;
    p2.health = 100;
    this.isOver = false;
    resultDiv.innerText = "";
    updateGame(p1, p2, game.isOver);
  }

  simulate(p1, p2) {
    this.reset(p1, p2);
    while (!this.isOver) {
      p1.strike(p1, p2, p1.attackDmg);
      p1.heal(p1);
      p2.strike(p2, p1, p2.attackDmg);
      p2.heal(p2);
    }
    return this.whoWon(game.isOver, p1, p2);
  }
}

let player1 = new Player("Robbins", 100, 10);
let player2 = new Player("Sammy", 100, 10);

let p1 = player1;
let p2 = player2;

const game = new Game();
game.isOver = false;
gameStatus = game.isOver;
updateGame(p1, p2, gameStatus);

simulateBtn.addEventListener("click", () => {
  return game.simulate(p1, p2);
});

restartBtn.addEventListener("click", () => {
  return game.reset(p1, p2);
});

document.addEventListener("keydown", (e) => {
  if (e.key == "q" && p2.health > 0 && game.isOver == false) {
    p1.strike(p1, p2, p1.attackDmg);
    document.querySelector("#sword").play();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key == "p" && p1.health > 0 && game.isOver == false) {
    p2.strike(p2, p1, p2.attackDmg);
    document.querySelector("#punch").play();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key == "a" && p2.health > 0 && game.isOver == false) {
    p1.heal(p1);
    document.querySelector("#heal").play();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key == "l" && p1.health > 0 && game.isOver == false) {
    p2.heal(p2);
    document.querySelector("#heal").play();
  }
});



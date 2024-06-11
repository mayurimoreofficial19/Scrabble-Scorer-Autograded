// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");
let userInput = "";

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toLowerCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("\nLet's play some scrabble! \n");
  userInput = input.question("Enter a word to score: ");
}

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function (word) {
  word = word.toLowerCase();
  let numericalScore = 0;

  for (let index = 0; index < word.length; index++) {
    numericalScore += 1;
  }
  return numericalScore;
};

let vowelBonusScorer = function (word) {
  word = word.toLowerCase();
  let vowel = "aeiou";
  let numericalScore = 0;

  for (let index = 0; index < word.length; index++) {
    if (vowel.includes(word[index])) {
      numericalScore += 3;
    } else if (word.charAt(index) >= "a" && word.charAt(index) <= "z") {
      numericalScore += 1;
    }
  }
  return numericalScore;
};

let scrabbleScorer = function (word) {
  word = word.toLowerCase();
  let score = 0;
  for (let keys in newPointStructure) {
    for (let index = 0; index < word.length; index++) {
      if (keys.includes(word[index])) {
        score += Number(newPointStructure[keys]);
      }
    }
  }
  return score;
};

let simpleScore = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoringFunction: simpleScorer,
};

let bonusVowel = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction: vowelBonusScorer,
};

let scrabble = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoringFunction: scrabbleScorer,
};

const scoringAlgorithms = [simpleScore, bonusVowel, scrabble];

function scorerPrompt() {
  console.log(" Which scoring algorithm would you like to use?\n");

  for (let index = 0; index < scoringAlgorithms.length; index++) {
    console.log(
      `${index} - ${scoringAlgorithms[index].name} : ${scoringAlgorithms[index].description}`
    );
  }
  let selectOption = input.question("Enter 0, 1 or 2 : ");
  let scoringFunction = scoringAlgorithms[selectOption].scoringFunction;
  let score = scoringFunction(userInput);
  console.log(`\nScore for '${userInput.toLowerCase()}' : ${score}\n`);

  return scoringAlgorithms;
}
// console.log(
//   `\nScrabble Score for ${userInput.toLowerCase()} : ${numericalScore}\n`
// );

function transform(oldPointStructureObj) {
  let newPointStructureObject = {};
  let newPointStructureLetterArr = [];

  let key = "";
  let value = 0;
  oldPointStructureObj[key] = value;

  for (let keys in oldPointStructureObj) {
    newPointStructureLetterArr = oldPointStructureObj[keys];

    for (let index = 0; index < newPointStructureLetterArr.length; index++) {
      key = newPointStructureLetterArr[index].toLowerCase();
      value = Number(keys);
      newPointStructureObject[key] = value;
    }
  }

  return newPointStructureObject;
}

function runProgram() {
  initialPrompt();
  // console.log(oldScrabbleScorer(userInput));
  // console.log(simpleScorer(userInput));
  // console.log(vowelBonusScorer(userInput));
  scorerPrompt();
  //scrabbleScorer(userInput);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};

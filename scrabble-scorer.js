// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
let userInput = '';
//let numericalScore = 0;

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
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
};

let newPointStructure;

let simpleScorer = function(word)
{
      word = word.toUpperCase();
      let numericalScore = 0;

      for(let Index = 0; Index < word.length; Index++)
         {
            numericalScore += 1;
         }
         return `Score for '${word}' : ${numericalScore}`;
};

let vowelBonusScorer = function(word)
{
   word = word.toUpperCase();
   let numericalScore = 0;

   for(let Index = 0; Index < word.length; Index++)
      {
         if(word[Index] == 'A' || word[Index] == 'E' || word[Index] == 'I' || word[Index] == 'U' || word[Index] == ')')
            {
               numericalScore += 3;
            }
            else
            {
               numericalScore += 1;
            }
      }
      return `Score for '${word}' : ${numericalScore}`;
};

let scrabbleScorer;

let simpleScore = {
 'name': 'Simple Score',
 'description': 'Each letter is worth 1 point.',
 'scoringFunction': simpleScorer
};

let bonusVowel = {
'name': 'Bonus Vowels',
'description': 'Vowels are 3 pts, consonants are 1 pt.',
'scoringFunction': vowelBonusScorer
};

let scrabble = {
'name': 'Scrabble',
'description': 'The traditional scoring algorithm.',
'scoringFunction': oldScrabbleScorer
};

const scoringAlgorithms = [simpleScore,bonusVowel,scrabble];

function scorerPrompt() {
   console.log(' Which scoring algorithm would you like to use?\n');

   for(let Index = 0; Index < scoringAlgorithms.length; Index++)
      {
         console.log(`${Index} - ${scoringAlgorithms[Index].name} : ${scoringAlgorithms[Index].description}`);
         //console.log(`Scoring Function Result : ${scoringAlgorithms[Index].scoringFunction}`);
      }
      let selectOption = input.question('Enter 0, 1 or 2 : ');
      let scoringFunction = scoringAlgorithms[selectOption].scoringFunction;

      console.log(scoringFunction(userInput));

      return scoringAlgorithms;
}

function transform() {};

function runProgram() {
   initialPrompt();
   // console.log(oldScrabbleScorer(userInput));
   // console.log(simpleScorer(userInput));
   // console.log(vowelBonusScorer(userInput));
   scorerPrompt();
}

//runProgram();

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
	scorerPrompt: scorerPrompt
};

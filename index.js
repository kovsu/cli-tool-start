#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";

// chalk is used to color the text and background
// console.log(chalk.bgGreen("Hello World"));

let playerName;

const sleep = (ms = 2000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who wants to be a JavaScript Millionaire? \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("How to play")}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    So get all the questions right ...
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  // return { name's value: `input value` ... }
  // console.log(answers);
  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "JavaScript was created in 10 days then released on \n",
    choices: [
      "May 23, 1995",
      "December 4, 1995",
      "September 26, 1995",
      "Decmber 17, 1996",
    ],
  });

  return handleAnswer(answers.question_1 === "December 4, 1995");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();

  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Nice work ${playerName}. That's a legit answer.`,
    });
  } else {
    spinner.error({
      text: `💀 💀 💀 Game over, you lose ${playerName}!`,
    });
  }
}

await welcome();
await askName();
await question1();

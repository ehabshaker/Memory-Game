// Set Variables
let ctrlButtonsSpan = document.querySelector(".control-buttons span");
let userName = document.querySelector(".name span");

// When I Clicked On ctrlButtonsSpan
ctrlButtonsSpan.onclick = function () {
  // Set Variable Contain The UserName
  let yourName = prompt("What's Your Name?");

  // Check The User Typed His Name Or Not
  if (yourName == null || yourName == "") {
    userName.innerHTML = "Unknown";
  } else {
    userName.innerHTML = yourName;
  }

  // Remove Span's Parent
  this.parentElement.remove();
};

// Effect Duration
let duration = 700;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-content");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range From Order Number Rendomly
// First Way
let orderRange = [];

// Set The Rendom Numbers In OrderRange Array
for (let i = 0; i < blocks.length; i++) {
  orderRange.push(Math.floor(Math.random() * blocks.length));
}

// Second Way
// let orderRange = [...blocks.keys()];

// shuffle(orderRange);

// function shuffle(array) {
//   // Setting vars
//   let temp,
//     random,
//     current = array.length;

//   while (current > 0) {
//     // Random Number
//     random = Math.floor(Math.random() * current);

//     // Increase Current
//     current--;

//     // Swapping array[current] And array[random]

//     // First Way
//     // // [1] Save Current Element In Stash
//     // temp = array[current];

//     // // [2] current Element == Rnadom Number
//     // array[current] = array[random];

//     // // [3] Random Element == current Element
//     // array[random] = temp;

//     // Second Way
//     [array[current], array[random]] = [array[random], array[current]];
//   }

//   return array;
// }

// Selected Every Block in Blocks Container
blocks.forEach((block, index) => {
  // Add css Order Property To Every Game Block
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    // Trigger The Flipped Function
    Flipped(block);
  });
});

// Flip Block Function
function Flipped(SelectedBlock) {
  // Add Class is-flipped
  SelectedBlock.classList.add("is-flipped");

  // Collect All Flipped Cards
  let blocksFlipped = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // If There's Two Flipped cards
  if (blocksFlipped.length == 2) {
    // Stop Clicking
    stopClicking();

    // Check Matched Block Function
    MatchedBlock(blocksFlipped[0], blocksFlipped[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add Class Stop-clicking
  blocksContainer.classList.add("stop-clicking");

  // Remove Class Stop-clicking After Duration
  setTimeout(() => {
    blocksContainer.classList.remove("stop-clicking");
  }, duration);
}

// Matched Block Function
function MatchedBlock(firstBlock, secondBlock) {
  let tries = document.querySelector(".tries span");

  // Remove Class is-flipped After Duration
  setTimeout(() => {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
  }, duration);

  if (firstBlock.dataset.social === secondBlock.dataset.social) {
    setTimeout(() => {
      // Add Css Visibility Property
      firstBlock.style.visibility = "hidden";
      secondBlock.style.visibility = "hidden";

      // Add Sound Success
      document.getElementById("success").play();

      // increment success
      endGame();
    }, duration);
  } else {
    //  Add One Wrong Try
    tries.innerHTML = parseInt(tries.innerHTML) + 1;

    // Add Sound Failed
    document.getElementById("failed").play();
  }
}

let success = 0;
function endGame() {
  if (success === 9) {
    document.getElementById("end-music").play();
    document.querySelector(".end-game").style.display = "flex";

    document.querySelector(".end-game button").onclick = function () {
      window.location.reload();
    };
  }
  success++;
}

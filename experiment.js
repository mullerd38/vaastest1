/// LICENCE -----------------------------------------------------------------------------
//
// Copyright 2018 - Cédric Batailler & Yoann Julliard
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this
// software and associated documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights to use, copy, modify,
// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be included in all copies
// or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
// CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// -----------------------------------------------------------------------------


// dirty hack to lock scrolling ---------------------------------------------------------
// note that jquery needs to be loaded.
$("body").css({ overflow: "hidden" });
$(document).bind("scroll", function () {
  window.scrollTo(0, 0);
});

var jsPsych = initJsPsych();

// Participant ID ----------------------------------------------------------------------

// If you use prolific:
let subject_id = jsPsych.data.getURLVariable("PROLIFIC_PID");
// otherwise:
if (subject_id == null) subject_id = jsPsych.randomization.randomID(10);

const filename = `${subject_id}.csv`;

// Global variables
const approach_key = "T";
const avoidance_key = "B";

// VAAST --------------------------------------------------------------------------------
// Variables used to define the experimental conditions
const vaast_cond_block_1 = jsPsych.randomization.sampleWithoutReplacement(
  ["app_pos", "app_neg"],
  1
)[0];
const vaast_cond_block_2 =
  vaast_cond_block_1 === "app_pos" ? "app_neg" : "app_pos";


// VAAST variables --------------------------------------------------------------------------------
// Define experimental conditions
const vaast_condition_approach = jsPsych.randomization.sampleWithoutReplacement(
  ["approach_diamond", "approach_square"],
  1
)[0];

// VAAST variables ----------------------------------------------------------------------
// Duplicate each variable to correspond to block 1 and block 2

let movement_diamond = undefined;
let movement_square = undefined;
let shape_to_approach = undefined;
let shape_to_avoid = undefined;
let shapeimage_to_approach = undefined;
let shapeimage_to_avoid = undefined;

switch (vaast_condition_approach) {
  case "approach_diamond":
    movement_diamond = "approach";
    movement_square = "avoidance";
    shape_to_approach = "diamonds";
    shape_to_avoid = "squares";
    shapeimage_to_approach = "stimuli/diamond_instructions.png";
    shapeimage_to_avoid = "stimuli/square_instructions.png";
    break;

  case "approach_square":
    movement_diamond = "avoidance";
    movement_square = "approach";
    shape_to_approach = "squares";
    shape_to_avoid = "diamonds";
    shapeimage_to_approach = "stimuli/square_instructions.png";
    shapeimage_to_avoid = "stimuli/diamond_instructions.png";
    break;
}

// VAAST background images --------------------------------------------------------------
// Either choose which background you want to use or leave it as is, the background will then be chosen randomly.

const background_eco_env = [
  "background/eco_env/2.jpg",
  "background/eco_env/4.jpg",
  "background/eco_env/6.jpg",
];

const background_non_eco_env = [
  "background/non_eco_env/2.jpg",
  "background/non_eco_env/4.jpg",
  "background/non_eco_env/6.jpg",
];

let background = jsPsych.randomization.sampleWithoutReplacement(
  [background_eco_env, background_non_eco_env],
  1
)[0];

bg_preview =
  background == background_eco_env
    ? "media/vaast-background_eco_env.jpg"
    : "media/vaast-background_non_eco_env.jpg";

// VAAST stimuli ------------------------------------------------------------------------
// VAAST prime and target stimuli -------------------------------------------------------

// Training stimuli
const vaast_stim_training = [
  {movement: movement_diamond, shape: "diamonds", stimulus: "stimuli/diamond.png", valence: "neg",  prime: "crime"},
  {movement: movement_diamond, shape: "diamonds", stimulus: 'stimuli/diamond.png', valence: "neg",  prime: "evil"},
  {movement: movement_diamond, shape: "diamonds", stimulus: 'stimuli/diamond.png', valence: "neg",  prime: "slavery"},
  {movement: movement_diamond, shape: "diamonds", stimulus: 'stimuli/diamond.png', valence: "neg",  prime: "punishment"},
  {movement: movement_diamond, shape: "diamonds", stimulus: 'stimuli/diamond.png', valence: "neg",  prime: "terror"},

  {movement: movement_diamond, shape: "diamonds", stimulus: "stimuli/diamond.png", valence: "pos",  prime: "delirium"},
  {movement: movement_diamond, shape: "diamonds", stimulus: 'stimuli/diamond.png', valence: "pos",  prime: "glory"},
  {movement: movement_diamond, shape: "diamonds", stimulus: 'stimuli/diamond.png', valence: "pos",  prime: "honor"},
  {movement: movement_diamond, shape: "diamonds", stimulus: 'stimuli/diamond.png', valence: "pos",  prime: "reward"},
  {movement: movement_diamond, shape: "diamonds", stimulus: 'stimuli/diamond.png', valence: "pos",  prime: "success"},

  {movement: movement_square,  shape: "squares",  stimulus: "stimuli/square.png",  valence: "neg",  prime: "crime"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "evil"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "slavery"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "punishment"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "terror"},

  {movement: movement_square,  shape: "squares",  stimulus: "stimuli/square.png",  valence: "pos",  prime: "delirium"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "glory"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "honor"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "reward"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "success"}
];

// Test stimuli
const vaast_stim_test = [
  {movement: movement_diamond,  shape: "diamonds",  stimulus: "stimuli/diamond.png",  valence: "neg",  prime: "death"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "accident"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "attack"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "bomb"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "cancer"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "coffin"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "danger"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "divorce"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "pain"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "failure"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "war"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "disease"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "lost"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "murder"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "misery"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "dead"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "poison"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "suicide"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "tomb"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "neg",  prime: "torture"},

  {movement: movement_diamond,  shape: "diamonds",  stimulus: "stimuli/diamond.png",  valence: "pos",  prime: "birthday"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "baby"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "hapiness"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "gift"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "hug"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "party"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "humor"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "joy"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "peace"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "share"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "passion"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "beach"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "pleasure"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "relax"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "laugh"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "health"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "sun"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "smile"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "triumph"},
  {movement: movement_diamond,  shape: "diamonds",  stimulus: 'stimuli/diamond.png',  valence: "pos",  prime: "holidays"},

  {movement: movement_square,  shape: "squares",  stimulus: "stimuli/square.png",  valence: "neg",  prime: "death"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "accident"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "attack"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "bomb"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "cancer"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "coffin"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "danger"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "divorce"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "pain"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "failure"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "war"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "disease"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "lost"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "murder"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "misery"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "dead"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "poison"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "suicide"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "tomb"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "neg",  prime: "torture"},

  {movement: movement_square,  shape: "squares",  stimulus: "stimuli/square.png",  valence: "pos",  prime: "birthday"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "baby"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "hapiness"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "gift"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "hug"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "party"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "humor"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "joy"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "peace"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "share"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "passion"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "beach"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "pleasure"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "relax"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "laugh"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "health"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "sun"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "smile"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "triumph"},
  {movement: movement_square,  shape: "squares",  stimulus: 'stimuli/square.png',  valence: "pos",  prime: "holidays"}
];

// VAAST stimuli sizes -------------------------------------------------------------------
const stim_sizes = [34, 38, 42, 46, 52, 60, 70];

const resize_factor = 7;
const image_sizes = stim_sizes.map(function (x) {
  return x * resize_factor;
});

// Preloading
// In principle, it should have ended when participants starts VAAST procedure (which)
// contains most of the images that have to be pre-loaded.

const all_backgrounds = [
  "media/vaast-background_eco_env.jpg",
  "media/vaast-background_non_eco_env.jpg",
  "media/keyboard-vaast-tgb3.png",
  "background/eco_env/2.jpg",
  "background/eco_env/4.jpg",
  "background/eco_env/6.jpg",
  "background/non_eco_env/2.jpg",
  "background/non_eco_env/4.jpg",
  "background/non_eco_env/6.jpg",
];

const preload = {
  type: jsPsychPreload,
  images: all_backgrounds,
};

// Cursor helper functions -------------------------------------------------------------
const hiding_cursor = {
  type: jsPsychCallFunction,
  func: function () {
    document.body.style.cursor = "none";
  },
};

const showing_cursor = {
  type: jsPsychCallFunction,
  func: function () {
    document.body.style.cursor = "auto";
  },
};

// Helper function ---------------------------------------------------------------------
// next_position():
// Computes next position as function of current position and correct movement. 
// Because participants have to press the correct response key, it always shows the correct
// position.
const next_position = function () {
  const current_position = jsPsych.data.getLastTrialData().values()[0].position;
  const current_response = jsPsych.data.getLastTrialData().values()[0].key_press;
  let position = current_position;

  if (jsPsych.pluginAPI.compareKeys(current_response, approach_key)) {
    position = position + 1;
  }

  if (jsPsych.pluginAPI.compareKeys(current_response, avoidance_key)) {
    position = position - 1;
  }

  return position;
};

// Saving block ------------------------------------------------------------------------
// Add the saving trial here.

// EXPERIMENT ---------------------------------------------------------------------------

// If you want to add a browser_check trial, you can do it here.

// Initial instructions -----------------------------------------------------------------
const welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "<h1 class ='custom-title'> Welcome </h1>" +
    "<p class='instructions'>Thank you for taking part in this study.<p>" +
    "<p class='instructions'>" +
    "In this study, you will <b>complete a task named the 'Video Game task'</b>. Note that we " +
    "will not collect any personally identifying information and that you can leave the experiment " +
    "at any moment. If you complete the experiment until the end, you will be retributed as stated on Prolific. " +
    "<b>If you decide to start this study, it means that you give your free and informed consent to participate. </b>" +
    "<br>" +
    "<br>" +
    "Because we rely on third party services to gather data, ad-blocking software might interfere with data collection. " +
    "Therefore, please  disable your ad-blocking software during this study. " +
    "<b>If we are unable to record your data, we will not be able to reward you for your participation</b>. " +
    "<br>If you have any question related to this research, please send a message on Prolific. </ul>" +
    "<p class = 'continue-instructions'>Press <strong>space</strong> to start the study.</p>",
  choices: [" "],
};

// Switching to fullscreen --------------------------------------------------------------
const fullscreen_trial = {
  type: jsPsychFullscreen,
  message: "To start the study, please switch to fullscreen </br></br>",
  button_label: "Switch to fullscreen",
  fullscreen_mode: true,
};

// VAAST --------------------------------------------------------------------------------
const vaast_instructions_1 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "<h1 class ='custom-title'> Task 1: Video Game task</h1>" +
    "<p class='instructions'>In this task, just like in a video game, you " +
    "will find yourself in the environment presented below.</p>" +
    "<p class='instructions'> You will be able to move forward and backward " +
    "using your keyboard keys.</p>" +
    "<p class='instructions'>Note that <b>your complete attention is critical for this task</b> " +
    "(to ensure this, we may have added attentional check during the experiment)." +
    "<br>Note also that we monitor the time spent during the experiment and that " +
    "we will not accept submission for which the time to complete the study is unrealistic.</p>" +
    "<img src = 'media/vaast-background.png'>" +
    "<br><br>" +
    "<p class = 'continue-instructions'>Press <strong>space</strong> to continue.</p>",
  choices: [" "],
};

// If you want to add a trial to check that your participant has enough time to complete the experiment,
// you can do it here.

const vaast_instructions_2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "<h1 class ='custom-title'> Task 1: Video Game task</h1>" +
    "<p class='instructions'>A series of geometric shapes (squares or diamonds) will be displayed in this environment.</p>" +
    "<p class='instructions'>Your task will be to move forward or backward according to these geometric shapes as fast as possible.</p>" +
    "<p class='instructions'>More precise instructions will follow.</p>" +
    "<img src = '" + bg_preview + "'>" +
    "<br><br>" +
    "<p class = 'continue-instructions'>Press <strong>space</strong> to continue.</p>",
  choices: [" "],
};

const vaast_instructions_2_bis_vaast = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "<h1 class ='custom-title'> Task 1: Video Game task</h1>" +
    "<p class='instructions'>To move forward or backward, you will use the following keys of your keyboard:</p>" +
    "<img src = 'media/keyboard-vaast-tgb3.png'>" +
    "<p class = 'continue-instructions'>Press <strong>space</strong> to continue.</p>",
  choices: [" "],
};

const vaast_instructions_3 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "<h1 class ='custom-title'> Task 1: Video Game task</h1>" +
    "<p class='instructions'>At the beginning of each trial, you will see the 'O' symbol. " +
    "This symbol indicates that you have to press the START key (namely, the <b>G key</b>) to start the trial. </p>" +
    "<p class='instructions'>Then, you will see a fixation cross (+) at the center of the screen, followed by a word, and then by a geometric shape. </p>" +
    "<p class='instructions'><b>Your task is to ignore the word and to move forward or backward depending on the geometric shape</b>." +
    "<br>To move forward or backward, use the MOVE FORWARD key (namely, the <b>T key</b>) " +
    "or the MOVE BACKWARD key (namely, the <b>B key</b>)." +
    "<br> Once the geometric shape has disappeared, press again the START key (namely, the <b>G key</b>). " +
    "<p class='instructions'>Please <b>use only the index of your preferred hand</b> for all these actions. </p>" +
    "<p class = 'continue-instructions'>Press <strong>space</strong> to continue.</p>",
  choices: [" "],
};

const vaast_instructions_4 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "<h1 class ='custom-title'> Task 1: Video Game task</h1>" +
    "<p class='instructions'>More precise instructions are displayed below. Your task is to:</p>" +
    "<ul class='instructions'>" +
    "<table>" +
    "<tr>" +
    "<td><img class=shape src = " +
    shapeimage_to_approach +
    "></td>" +
    "<td align='left'>APPROACH " +
    shape_to_approach +
    " by pressing the MOVE FORWARD key (namely, the <b>T key</b>)</td>" +
    "</tr>" +
    "<tr>" +
    "<td><img class=shape src = " +
    shapeimage_to_avoid +
    "></td>" +
    "<td align='left'>AVOID " +
    shape_to_avoid +
    " by pressing the MOVE BACKWARD key (namely, the <b>B key</b>)</td>" +
    "</tr>" +
    "</table>" +
    "</ul>" +
    "<p class='instructions'>Please read carefully and make sure that you memorize the instructions above. </p>" +
    "<p class='instructions'><strong>Also, note that it is EXTREMELY IMPORTANT THAT YOU TRY TO BE AS FAST AND ACCURATE AS YOU CAN. </strong>" +
    "<br>A red cross will appear if your response is incorrect.</p>" +
    "<p class='instructions'><b>Now, let's start with a training!</b></p>" +
    "<p class = 'continue-instructions'>Press <strong>ENTER</strong> to start the training.</p>",
  choices: ["Enter"],
};

const vaast_instructions_5 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "<h1 class ='custom-title'> Task 1: Video Game task</h1>" +
    "<p class='instructions'>The training is over. Now, you will start the real task " +
    "(note that this task will take about <b>10 minutes</b> to complete).</p>" +
    "<p class='instructions'>Instructions stay the same:</p>" +
    "<ul class='instructions'>" +
    "<table>" +
    "<tr>" +
    "<td><img class=shape src = " +
    shapeimage_to_approach +
    "   ></td>" +
    "<td align='left'>APPROACH " +
    shape_to_approach +
    " by pressing the MOVE FORWARD key (namely, the <b>T key</b>)</td>" +
    "</tr>" +
    "<tr>" +
    "<td><img class=shape src = " +
    shapeimage_to_avoid +
    "   ></td>" +
    "<td align='left'>AVOID " +
    shape_to_avoid +
    " by pressing the MOVE BACKWARD key (namely, the <b>B key</b>)</td>" +
    "</tr>" +
    "</table>" +
    "</ul>" +
    "<br>" +
    "<p class='instructions'>Do not forget to be <b>as fast and accurate as you can</b> and to <b>use only the index of your preferred hand</b>.</p>" +
    "<p class = 'continue-instructions'>Press <strong>ENTER</strong> to start the task.</p>",
  choices: ["Enter"],
};

// VAAST trials ---------------------------------------------------------------------
// Note: vaast_start trial is a dirty hack which uses a regular VAAST trial. The correct
// movement is approach and the key corresponding to approach is "d", thus making the
// participant press "d" to start the trial.
// vaast-prime and vaast-blank are also dirty hacks, which use a regular VAAST trial.
// There is no correct answer, just a display time with no response expected.

// Once again, everything is duplicated, to correspond to the two blocks of the
// VAAST, trials and procedures, training comprised.

const vaast_start = {
  type: jsPsychVaastText,
  stimulus: "o",
  position: 1,
  background_images: background,
  font_sizes: stim_sizes,
  approach_key: "g",
  stim_movement: "approach",
  html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
  force_correct_key_press: true,
  display_feedback: false,
  response_ends_trial: true,
};

const vaast_fixation = {
  type: jsPsychVaastFixation,
  fixation: "+",
  font_size: 46,
  position: 1,
  background_images: background,
};

const vaast_prime = {
  type: jsPsychVaastText,
  stimulus: "prime",
  stimulus: jsPsych.timelineVariable("prime"),
  position: 1,
  background_images: background,
  font_sizes: stim_sizes,
  stim_movement: jsPsych.timelineVariable("movement"),
  response_ends_trial: false,
  trial_duration: 200,
};

const vaast_blank = {
  type: jsPsychVaastText,
  stimulus: " ",
  position: 1,
  background_images: background,
  font_sizes: stim_sizes,
  stim_movement: jsPsych.timelineVariable("movement"),
  response_ends_trial: false,
  trial_duration: 100,
};

const vaast_first_step_training_1 = {
  type: jsPsychVaastImage,
  stimulus: jsPsych.timelineVariable("stimulus"),
  position: 1,
  background_images: background,
  font_sizes: image_sizes,
  approach_key: "t",
  avoidance_key: "b",
  stim_movement: jsPsych.timelineVariable("movement"),
  html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
  force_correct_key_press: true,
  display_feedback: true,
  response_ends_trial: true,
};

const vaast_second_step_training_1 = {
  type: jsPsychVaastImage,
  stimulus: jsPsych.timelineVariable("stimulus"),
  position: next_position_training,
  background_images: background,
  font_sizes: image_sizes,
  stim_movement: jsPsych.timelineVariable("movement"),
  response_ends_trial: false,
  trial_duration: 650,
};

// VAAST training block -----------------------------------------------------------------

const vaast_training_block = {
  timeline: [
    vaast_start,
    vaast_fixation,
    vaast_prime,
    vaast_blank,
    vaast_first_step_training_1,
    vaast_second_step_training_1
  ],
  timeline_variables: vaast_stim_training,
  repetitions: 1, //1 = 20 trials,
  randomize_order: true,
  data: {
    phase: "training",
    valence: jsPsych.timelineVariable("valence"),
    prime: jsPsych.timelineVariable("prime"),
    shape: jsPsych.timelineVariable("shape"),
    stimulus: jsPsych.timelineVariable("stimulus"),
    movement: jsPsych.timelineVariable("movement"),
  },
};

const vaast_test_block = {
  timeline: [
    vaast_start,
    vaast_fixation,
    vaast_prime,
    vaast_blank,
    vaast_first_step_training_1,
    vaast_second_step_training_1
  ],
  timeline_variables: vaast_stim_test,
  repetitions: 2, //1 = 80 trials
  randomize_order: true,
  data: {
    phase: "test",
    valence: jsPsych.timelineVariable("valence"),
    prime: jsPsych.timelineVariable("prime"),
    shape: jsPsych.timelineVariable("shape"),
    stimulus: jsPsych.timelineVariable("stimulus"),
    movement: jsPsych.timelineVariable("movement"),
  },
};

// End fullscreen -----------------------------------------------------------------------
const fullscreen_exit_trial = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
};

// Demographic questions -------------------------------------------------------------

// If you want to add demographic question trial(s), you can do it here.
// First add the instruction trial, then add the question trial(s).

// End instructions ---------------------------------------------------------------------
const ending = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "<h1 class ='custom-title'>This study is over.</h1>" +
    "<p class='instructions'>We thank you for participating in this study.</p>" +
    "<p class='instructions'>In this study, we were interested in how fast individuals perform approach and avoidance actions when primed with a pleasant or an unpleasant word. " +
    "Specifically, you had to approach/avoid geometric shapes but before it appeared, we briefly displayed a pleasant/unpleasant word. " +
    "We expected this word to impact the latency of you responses: You should have been faster to make an approach action after a pleasant word and an avoidance action after an unpleasant word (rather than the other way around). </p>" +
    "<p class='instructions'> If you have any questions / remarks regarding this experiment, please send a message on Prolific.</br></p>" +
    "<p class='continue-instructions'>You can now press <b>SPACE</b> to be redirected to Prolific</p>",
  choices: [" "],
};

// Procedure ----------------------------------------------------------------------------
// Initialize timeline ------------------------------------------------------------------

let timeline = [];

// Fullscreen
timeline.push(preload, welcome, fullscreen_trial, hiding_cursor);

// Prolific verification
timeline.push(save_id);

// VAAST
timeline.push(
  vaast_instructions_1,
  vaast_instructions_2,
  vaast_instructions_2_bis_vaast,
  vaast_instructions_3,
  showing_cursor,
  hiding_cursor,
  vaast_instructions_4,
  vaast_training_block,
  vaast_instructions_5,
  vaast_test_block,
  vaast_instructions_end
);

timeline.push(fullscreen_exit_trial, showing_cursor);

// Ending
timeline.push(ending);

// Launch experiment --------------------------------------------------------------------
jsPsych.run(timeline);

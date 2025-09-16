var jsPsychVaastFixation = (function (jspsych) {
  'use strict';

  var version = "0.0.1";

  const info = {
    name: "vaast-fixation",
    version,
    parameters: {
      /**
       * The string that is displayed as fixation.
       */
      fixation: {
        type: jspsych.ParameterType.STRING,
        default: "+"
      },
      /**
       * Font size of the fixation text.
       */
      font_size: {
        type: jspsych.ParameterType.INT,
        default: 200
      },
      /**
       * Minimal duration (in ms).
       */
      min_duration: {
        type: jspsych.ParameterType.INT,
        default: 800
      },
      /**
       * Maximal duration (in ms).
       */
      max_duration: {
        type: jspsych.ParameterType.INT,
        default: 2e3
      },
      /**
       * An array with the images displayed as background as function of the position.
       */
      background_images: {
        type: jspsych.ParameterType.IMAGE,
        array: true,
        default: void 0
      },
      /**
       * The position in the "background_images" array which will be used to set the background.
       */
      position: {
        type: jspsych.ParameterType.INT,
        default: 3
      }
    },
    data: {
      /**
       * Duration of the fixation trial (in ms).
       */
      duration: {
        type: jspsych.ParameterType.INT
      }
    }
    // prettier-ignore
  };
  class VaastFixationPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    static {
      this.info = info;
    }
    trial(display_element, trial) {
      const min_duration = trial.min_duration ?? 800;
      const max_duration = trial.max_duration ?? 2e3;
      const duration_range = max_duration - min_duration;
      const trialDuration = Math.random() * duration_range + min_duration;
      let html_str = "";
      const position = trial.position ?? 3;
      html_str += "<div style='position: absolute; right: 0; top: 0; width: 100%; height: 100%; background: url(" + trial.background_images[position] + ") center no-repeat; z-index: -1; background-color: #000000'></div>";
      html_str += "<div style='height: 100vh; display: flex; justify-content: center; align-items: center; z-index:1; color: #ffffff; font-size: " + trial.font_size + "px' id='jspsych-vaast-stim'>" + trial.fixation + "</div>";
      display_element.innerHTML = html_str;
      const end_trial = () => {
        let trial_data = {
          duration: trialDuration
        };
        this.jsPsych.finishTrial(trial_data);
      };
      this.jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trialDuration);
    }
  }

  return VaastFixationPlugin;

})(jsPsychModule);
//# sourceMappingURL=jspsych-vaast-fixation.js.map

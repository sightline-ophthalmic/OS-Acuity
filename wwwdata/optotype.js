/* jshint undef: true, strict: true, esversion: 6 */
/* globals $, document, jQuery, alert, console, window, setTimeout */

var fullScreen = false;    // Global variable to track if window is in full screen mode
var qMenu = false;         // Global variable to track if the menu is open
var optoMirror = false;    // Mirror text
var losD = 20.0;           // Line of sight distance
var optoSize = 8.7500;     // Height of 20/20 font in mm at 20 feet
var pxSize = 0.2740;       // Dimensions of a single pixel on the screen in mm
var optoIndex = 3;         // Used to track current optotype size. Defaults to 20/20. Corresponds with "index" in optoRatios

var optoRatios = [{        // List of all available optotype sizes and their corresponding ratio
   index: 1,
   display: 10,            // Display: what # to show in the bottom right
   ratio: 0.5,             // Ratio when compared with 20/20 optotype
   letters: 5              // How many letters to display at this size
}, {
   index: 2,
   display: 15,
   ratio: 0.75,
   letters: 5
}, {
   index: 3,
   display: 20,
   ratio: 1.0,
   letters: 5
}, {
   index: 4,
   display: 25,
   ratio: 1.25,
   letters: 5
}, {
   index: 5,
   display: 30,
   ratio: 1.5,
   letters: 5
}, {
   index: 6,
   display: 40,
   ratio: 2.0,
   letters: 5
}, {
   index: 7,
   display: 50,
   ratio: 2.5,
   letters: 5
}, {
   index: 8,
   display: 60,
   ratio: 3.0,
   letters: 5
}, {
   index: 9,
   display: 70,
   ratio: 3.5,
   letters: 5
}, {
   index: 10,
   display: 80,
   ratio: 4.0,
   letters: 5
}, {
   index: 11,
   display: 100,
   ratio: 5.0,
   letters: 3
}, {
   index: 12,
   display: 200,
   ratio: 10.0,
   letters: 2
}, {
   index: 13,
   display: 400,
   ratio: 20.0,
   letters: 1
}];

function optoType() {
   'use strict';

   let optoLength, optoChars, optoString = '';
   let resizeObj = optoRatios.find(o => o.index == optoIndex);
   optoLength = resizeObj.letters;
   optoChars = 'CDEFHKNPRUVZ';   // These are the standard letters used for optotype.


   // Loops until characters are found
   while (optoString.length < 1) {
      let optoText = '', rlast = '', rnow = '';

      for (var i = 0; i < optoLength; i++) {
         let rnum = Math.floor(Math.random() * optoChars.length);

         rnow = optoChars.substring(rnum,rnum+1);

         // Prevent two of the same letter appearing side by side
         if (rnow != rlast) {

            // Add a space between letters
            if (optoText.length > 0) {
               optoText += ' ';
            }

            rlast = rnow;
            optoText += rnow;

         } else {
            i--;
         }

      }

      // Blacklist Filter
      if (optoText.search('F U C') == -1 && optoText.search('F U K') == -1 && optoText.search('N U D E') == -1 && optoText.search('F E C K') == -1 && optoText.search('D R U N K') == -1 && optoText.search('P E C K') == -1 && optoText.search('C U C K') && optoText != 'F U') {
         optoString = optoText;
      }
   }

   return optoString;
}

function f11Toggle() {
   'use strict';

   // Display F11 notice when window is NOT full screen
   if (((window.innerWidth/window.screen.width) >= 0.95) && ((window.innerHeight/window.screen.height) >= 0.95)) {
      $('#goFullScreen').hide();
      fullScreen = true;
   } else {
      $('#goFullScreen').show();
      fullScreen = false;
   }

   return true;
}

function changeSize(newIndex) {
   'use strict';

   if ((newIndex <= 13) && (newIndex >= 1)) {
      let resizeObj = optoRatios.find(o => o.index == newIndex);
      $('#displayType').css('font-size', (((optoSize * resizeObj.ratio) / pxSize) * 2));
      $('#acuitySize').text(resizeObj.display);
      $('#displayType').text(optoType());
   }
}


$(function () {
   'use strict';

   // Hide/show certain pop ups
   f11Toggle();
   $('#q').hide();

   // Set initial text and size
   changeSize(optoIndex);
   $('#displayType').text(optoType());

   // Full screen detection (and reaction)
   $(window).resize(function() {
      setTimeout(() => {
         f11Toggle();
         // Add additional functions here
      }, 100);
   });

   // Do things when keys are pressed
   $(document).keydown(function(e) {

      // Key press: ← or → (left or right)
      // Randomizes optotype.
      if (e.keyCode == 37 || e.keyCode == 39) {
         $('#displayType').text(optoType());
      }

      // Key press: ↑ (up)
      // Increases size
      if (e.keyCode == 38) {

         if (optoIndex < 13) {
            optoIndex++;
            changeSize(optoIndex);
         }

      }

      // Key press: ↓ (down)
      // Decreases size
      if (e.keyCode == 40) {

         if (optoIndex > 1) {
            optoIndex--;
            changeSize(optoIndex);
         }

      }

      // Key press: q
      // Opens menu
      if (e.keyCode == 81) {

         if (qMenu == false) {
            $('#q').show();
            qMenu = true;
         } else {
            // Hide the menu
            $('#q').hide();
            qMenu = false;

            // Commit changes to memory
            losD = $('#losD').val();

         }

      }

   });

});

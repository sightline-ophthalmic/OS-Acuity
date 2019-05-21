/* jshint undef: true, strict: true, esversion: 6 */
/* globals $, document, jQuery, alert, console, window, setTimeout */

var calWidth = 1;
var calRatio = 1;
var fullScreen = false;
var calibrateMode = false;

var optoSize = 4.375;   // Height of 20/10 font in mm
var pxSize = 0.274;     // Dimensions of a single pixel on the screen in mm
var optoIndex = 3;      // Start with 20/20

var optoRatios = [{
   index: 1,
   display: 10,
   ratio: 1.0,
   letters: 5
}, {
   index: 2,
   display: 15,
   ratio: 1.5,
   letters: 5
}, {
   index: 3,
   display: 20,
   ratio: 2.0,
   letters: 5
}, {
   index: 4,
   display: 25,
   ratio: 2.5,
   letters: 5
}, {
   index: 5,
   display: 30,
   ratio: 3.0,
   letters: 5
}, {
   index: 6,
   display: 40,
   ratio: 4.0,
   letters: 5
}, {
   index: 7,
   display: 50,
   ratio: 5.0,
   letters: 5
}, {
   index: 8,
   display: 60,
   ratio: 6.0,
   letters: 5
}, {
   index: 9,
   display: 70,
   ratio: 7.0,
   letters: 5
}, {
   index: 10,
   display: 80,
   ratio: 8.0,
   letters: 5
}, {
   index: 11,
   display: 100,
   ratio: 10.0,
   letters: 3
}, {
   index: 12,
   display: 200,
   ratio: 20.0,
   letters: 2
}, {
   index: 13,
   display: 400,
   ratio: 40.0,
   letters: 1
}];

function optoType() {
   'use strict';

   var optoLength, optoChars, optoString;

   let resizeObj = optoRatios.find(o => o.index == optoIndex);
   optoLength = resizeObj.letters;
   optoChars = 'CDEFHKNPRUVZ';
   optoString = '';

   // Loops until characters are found
   while (optoString.length < 1) {
      var optoText, rlast, rnow;

      optoText = '';
      rlast = '';
      rnow = '';

      for (var i = 0; i < optoLength; i++) {
         var rnum;
         rnum = Math.floor(Math.random() * optoChars.length);

         rnow = optoChars.substring(rnum,rnum+1);

         // Prevent duplicates
         if (rnow != rlast) {

            // Add space between letters
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

function calToggle() {
   'use strict';

   // Depreciated
   // Display Calibrate Message only for Full Screen. Do not display once calRatio is set.
   if ((fullScreen == true) && (calWidth == 0)) {
      $('#calibrate').show();
      $('#saveCal').show();
      calibrateMode = true;
   } else {
      $('#calibrate').hide();
      $('#saveCal').hide();
      calibrateMode = false;
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
   calToggle();

   // Set initial text and size
   changeSize(optoIndex);
   $('#displayType').text(optoType());

   // Full screen detector
   $(window).resize(function() {
      setTimeout(() => {
         f11Toggle();
         calToggle();
      }, 100);
   });

   // Do things when keys are pressed
   $(document).keydown(function(e) {
      var boxSize;

      // Randomize optotype when <- or -> keys pressed
      if (e.keyCode == 37 || e.keyCode == 39) {
         $('#displayType').text(optoType());
      }

      // Up key pressed
      if (e.keyCode == 38) {

         // Cablibration mode
         if (calibrateMode == true) {
            boxSize = $('#calibrate').width();
            $('#calibrate').width(boxSize + 1);
            $('#calibrate').height(boxSize + 1);
            $('#calibrate').css('font-size', boxSize/25);

         } else {

            // Cycle through larger acuity charts
            if (optoIndex < 13) {
               optoIndex++;
               changeSize(optoIndex);
            }

         }

      }

      // Down key pressed
      if (e.keyCode == 40) {

         // Cablibration mode
         if (calibrateMode == true) {
            boxSize = $('#calibrate').width();
            if (boxSize > 100) {
               $('#calibrate').width(boxSize - 1);
               $('#calibrate').height(boxSize - 1);
               $('#calibrate').css('font-size', boxSize/25);
            }

         } else {

            // Cycle through smaller acuity charts
            if (optoIndex > 1) {
               optoIndex--;
               changeSize(optoIndex);
            }

         }

      }

   });

   // Save Calibration Data
   $('#saveButton').click(function() {

      // Store in JS global var
      calWidth = $('#calibrate').width();
      calRatio = (calWidth / 546);

      // Store in Session Cookie
      // (Not yet built)

      // Toggle the Calibration Window
      calToggle();

      // Temporary Hack: Multiply OptoType by CalRatio
      $('#displayType').css('font-size', (calRatio * 160));

   });

});

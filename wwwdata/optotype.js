/* jshint undef: true, strict: true, esversion: 6 */
/* globals $, document, jQuery, alert, console, window, setTimeout */

var calWidth = 1;
var calRatio = 1;
var fullScreen = false;
var calibrateMode = false;

function optoType(len) {
   'use strict';

   var optoLength, optoChars, optoString;

   optoLength = len;
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
      if (optoText.search('F U C') == -1 && optoText.search('F U K') == -1 && optoText.search('N U D E') == -1 && optoText.search('F E C K') == -1 && optoText.search('D R U N K') == -1 && optoText.search('P E C K') == -1 && optoText.search('C U C K')) {
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


$(function () {
   'use strict';

   var optoLength = 5;

   // Hide/show certain pop ups
   f11Toggle();
   calToggle();

   // Set initial text
   $('#displayType').text(optoType(optoLength));

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
         $('#displayType').text(optoType(optoLength));
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
            console.log('Not yet implemented.');

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
            console.log('Not yet implemented.');

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

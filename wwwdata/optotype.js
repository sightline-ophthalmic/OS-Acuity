/* jshint undef: true, strict: true, esversion: 6 */
/* globals $, document, jQuery, alert, console, window, setTimeout */


// Global Variables with default values
var fullScreen = false;    // Track if window is in full screen mode
var qMenu = false;         // Track if the menu is open
var optoMirror = false;    // Track if optotype is mirrored
var optoIndex = 3;         // Track currently displayed optotype size. Defaults to 20/20. Corresponds with "index" in optoRatios
var optoSize = 8.7500;     // Height of 20/20 font in mm at 20 feet. Calculation by Dr. Christopher Carver, O.D.
var pxSize = 0.2740;       // Dimensions of a single pixel on the screen in mm
var losDft = 20.0;         // Line-of-sight in whole feet.
var losDin = 0.0;          // Line-of-sight inches that extend beyond last whole foot.
var tumblingE = false;     // Session only. Never read from or written to a cookie.
var currentLineKey = '';   // What is on screen now, so left/right never redraws the same line.


// Functions to simplify cookies. (Source: https://www.quirksmode.org/js/cookies.html)
function setCookie(name,value,days) {
   'use strict';

   var expires = "";
   if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
   document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
   'use strict';

   var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
   }
   return null;
}

function eraseCookie(name) {
   'use strict';

   document.cookie = name+'=; Max-Age=-99999999;';
}


// Checks for existing cookies. Replace default values if cookies exist.
if (getCookie('losDft')) {
   losDft = parseFloat(getCookie('losDft'));
}

if (getCookie('losDin')) {
   losDin = parseFloat(getCookie('losDin'));
}

if (getCookie('pxSize')) {
   pxSize = parseFloat(getCookie('pxSize'));
}

if (getCookie('optoMirror') === 'true') {
   optoMirror = true;
}


// Calculate line of sight distance by adding losDft + losDin
var losD = losDft + (losDin / 12);


// List of all available optotype sizes and their corresponding ratio
var optoRatios = [{
   index: 1,
   display: 10,            // E.g. 20/10 vision
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


// Generate random letters
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

         // Prevent the same letter appearing more than once
         if (optoText.indexOf(rnow) == -1) {

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

// Tumbling E directions. No direction beside itself, and no pair of
// directions used twice in the line. 3,2,1,4,2 is allowed. 1,1,2,4,3
// and 1,2,1,2,4 are not.
function tumblingDirs() {
   'use strict';

   var resizeObj = optoRatios.find(o => o.index == optoIndex);
   var n = resizeObj.letters;
   var all = [0, 90, 180, 270];
   var guard = 0;

   while (guard < 200) {
      guard++;
      var seq = [];
      var usedPairs = {};
      var ok = true;

      for (var i = 0; i < n; i++) {
         var choices = [];
         for (var d = 0; d < all.length; d++) {
            var dir = all[d];
            if (i > 0 && dir === seq[i - 1]) {
               continue;
            }
            if (i > 0 && usedPairs[seq[i - 1] + ',' + dir]) {
               continue;
            }
            choices.push(dir);
         }
         if (choices.length === 0) {
            ok = false;
            break;
         }
         var pick = choices[Math.floor(Math.random() * choices.length)];
         if (i > 0) {
            usedPairs[seq[i - 1] + ',' + pick] = true;
         }
         seq.push(pick);
      }

      if (ok && seq.length === n) {
         return seq;
      }
   }

   // Last resort: still never repeat a direction beside itself.
   var fallback = [];
   var prev = -1;
   for (var j = 0; j < n; j++) {
      var pick2 = all[Math.floor(Math.random() * all.length)];
      if (pick2 === prev) {
         pick2 = all[(all.indexOf(pick2) + 1) % all.length];
      }
      fallback.push(pick2);
      prev = pick2;
   }
   return fallback;
}

function tumblingHtml(dirs) {
   'use strict';

   var html = '<span class="eline">';
   for (var i = 0; i < dirs.length; i++) {
      if (i > 0) {
         html += ' ';
      }
      html += '<span class="espin" style="transform:rotate(' + dirs[i] + 'deg)">E</span>';
   }
   html += '</span>';
   return html;
}

// forceNew: left/right must not put the same characters back on screen.
function showLine(forceNew) {
   'use strict';

   var tries = 0;

   if (tumblingE) {
      var dirs, key;
      do {
         dirs = tumblingDirs();
         key = 'E:' + dirs.join(',');
         tries++;
      } while (forceNew && key === currentLineKey && tries < 40);
      currentLineKey = key;
      $('#displayType').html(tumblingHtml(dirs));
   } else {
      var text, lkey;
      do {
         text = optoType();
         lkey = 'L:' + text;
         tries++;
      } while (forceNew && lkey === currentLineKey && tries < 40);
      currentLineKey = lkey;
      $('#displayType').text(text);
   }
}

// Toggles a notice that the window is not in full screen mode
function f11Toggle() {
   'use strict';

   if (((window.innerWidth/window.screen.width) >= 0.95) && ((window.innerHeight/window.screen.height) >= 0.95)) {
      $('#goFullScreen').hide();
      fullScreen = true;
   } else {
      $('#goFullScreen').show();
      fullScreen = false;
   }

   return true;
}

// Changes the size of the optotype on arrow key presses and also on configuration changes
function changeSize(newIndex) {
   'use strict';

   if ((newIndex <= 13) && (newIndex >= 1)) {
      let resizeObj = optoRatios.find(o => o.index == newIndex);
      $('#displayType').css('font-size', (((optoSize * resizeObj.ratio) / pxSize) * 2 * (losD / 20)));
      $('#acuitySize').text(resizeObj.display);
      showLine();
   }
}


// These functions run automatically when the page loads
$(function () {
   'use strict';

   // Hide/show certain pop ups
   f11Toggle();
   $('#q').hide();

   // Set initial text and size
   changeSize(optoIndex);
   showLine();

   // Mirror text
   if (optoMirror == true) {
      $('#displayType').addClass('mirror');
   }

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
         showLine(true);
      }

      // Key press: E
      // Session-only switch between the letter chart and tumbling E.
      // Ignored while the menu is open or a settings field is focused.
      if (e.keyCode == 69 && qMenu == false) {
         var tag = e.target && e.target.tagName;
         if (tag != 'INPUT' && tag != 'TEXTAREA') {
            tumblingE = !tumblingE;
            showLine();
         }
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
            // Show the menu
            $('#q').show();
            qMenu = true;

            // Get values from memory
            $('#losDft').val(losDft);
            $('#losDin').val(losDin);
            $('#pxSize').val(pxSize);
            $('#optoMirror').prop('checked', optoMirror);

         } else {
            // Hide the menu
            $('#q').hide();
            qMenu = false;

            // Commit changes to memory
            losDft = parseFloat($('#losDft').val());
            losDin = parseFloat($('#losDin').val());
            losD = losDft + (losDin / 12);
            pxSize = parseFloat($('#pxSize').val());

            // Mirror text if checked
            if ($('#optoMirror').is(':checked')) {
               optoMirror = true;
               $('#displayType').addClass('mirror');
            } else {
               optoMirror = false;
               $('#displayType').removeClass('mirror');
            }

            // Commit changes to cookies
            setCookie('losDft', losDft, 3650);
            setCookie('losDin', losDin, 3650);
            setCookie('pxSize', pxSize, 3650);
            setCookie('optoMirror', optoMirror, 3650);

            // Adjust on screen size accordingly
            changeSize(optoIndex);

         }

      }

   });

   // Reset cookies and configuration values to default
   $('#qReset').click(function() {
      // Reset values
      optoMirror = false;
      pxSize = 0.2740;
      losDft = 20.0;
      losDin = 0.0;

      // Re-calculate distance
      losD = losDft + (losDin / 12);

      // Fix values displayed on screen
      $('#losDft').val(losDft);
      $('#losDin').val(losDin);
      $('#pxSize').val(pxSize);
      $('#optoMirror').prop('checked', optoMirror);

   });

});

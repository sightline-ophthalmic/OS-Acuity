# OS-Acuity
Open Source Visual Acuity Testing for Optometrists. This open source project (and it's continued support) is funded by Sightline Ophthalmic Associates. Original code by James Watt. This repo contains a copy of [Optician-Sans](https://github.com/anewtypeofinterference/Optician-Sans).

A live version of this site is available for demonstration purposes at [acuity.sightlinelaser.com](https://acuity.sightlinelaser.com).

## Formulas and Calculations
Optotype calculations provided by Dr. Christopher Carver, O.D.

## Update (2026-11-09)

This is still an actively maintained project. After OS-Acuity was built in 2019, it has worked without the need for any big changes or rewrites. Today, we've added the biggest change since we first went live: a tumbling E chart.

Press E to switch to a tumbling E chart. Every mark is the letter E, turned up, down, left, or right. The line has the same number of marks as the letter chart at that size. Press E again to return to the letter chart. That choice lasts until the page is reloaded. It is not saved with the other settings.

This update also includes a small update from earlier this year - fixing repeating letters from showing on the same line.

## Installation and Usage
Put the contents of wwwdata into the root directory, subfolder, or subdomain of your website. It is recommended that you clone this repo and then symlink the folder to streamline future updates.

### Configuration
Press Q to open the configuration menu. Your settings are saved as a cookie.

Enter only whole numbers for feet (e.g. 5, 10, 20) and decimal numbers for inches (e.g. 1.0625, 2, 3.5.) Please do not enter fractions (e.g. 3/4".)

### Usage
Press ↑ or ↓ (up or down) to increase or decrease the size of the optotype. Press ← or → (left or right) to randomize the line. The new line is never the same as the one already on screen.

Press E to switch to the tumbling E chart. Every mark is the letter E, turned up, down, left, or right. Press E again to return to the letter chart. That choice lasts until the page is reloaded. It is not saved with the other settings.

## Suggested Hardware
The display below has been verified for accuracy. As for the other parts, nearly any option will do; suggestions below are just for your convenience.

OS-Acuity was written for the Google Chrome web browser on the following hardware.
* [ViewSonic VP2456A 24" 1080p Display](https://www.amazon.com/ViewSonic-VP2456A-Ergonomics-Validated-DisplayPort/dp/B0F16TCSVC)
* [MeLE PCG02 Mini PC Stick w/ Windows 11](https://www.amazon.com/MeLE-PCG02-Computer-Functional-Industrial/dp/B0DK4XX23P)
* [1.75" Wall Mount](https://www.amazon.com/Mount-Universal-Computer-Extension-Compatible/dp/B073DDNHQQ)
* [Bluetooth Remote](https://www.amazon.com/Fosmon-Portable-Lightweight-Bluetooth-Controller/dp/B00BX0YKX4) (Optional)
* [USB Charging Port for Remote](https://www.amazon.com/iPhone-Charger-Anker-AirPods-Included/dp/B0C8HHV9DK) (Optional)

### Exam room
Line-of-sight distance from patient to display should be inside the range 10 ft to 30 ft. Distances outside that range may be inaccurate. Use something like a [Bosch laser tool](https://www.amazon.com/Bosch-Distance-Measure-165-Feet-GLM165-40/dp/B076C3TB8P) to measure the exact distance. OS-Acuity supports reversed optotype for rooms with mirrors.

### Understanding sizing
The most complicated part of this project is displaying and resizing optotype accurately. The ViewSonic is a professional grade display, making it a perfect candidate for this task.

Each pixel on this display measures exactly 0.274mm in the real world. This was calculated by four separate formulas and then verified through rigorous testing. Because of the work involved, this will be the only display officially supported.

Keep in mind, all existing visual acuity equipment at offices around the world are already loaded with proprietary optotype software. Those systems will never need to display OS-Acuity on their monitors. Our solution is intended for those looking to roll their own hardware.

### Using another display
If you still must use another display, please consider:
* 1920x1080 is recommended.
* The correct aspect ratio should be used for your display.
* DPI scaling should be set to 100%.
* Open a picture of a perfect square. Vertical pixel height must equal horizontal pixel height. If one side of the square is longer than the other, do not use this display.

You can use this [calculator tool](http://lcdtech.info/en/data/pixel.size.htm) to estimate the size of each pixel. This tool provides a rough estimate only; it should not be trusted until you verify the dimensions. Once you know the size of each pixel on your display, enter the value in the configuration menu.

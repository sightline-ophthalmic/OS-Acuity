# OS-Acuity
Open Source Visual Acuity Testing for Optometrists. This open source project (and it's continued support) is funded by Sightline Ophthalmic Associates. Original code by James Watt. This repo contains a copy of [Optician-Sans](https://github.com/anewtypeofinterference/Optician-Sans).

### Demo
A development demo of this code is available on [gtwy.net](https://gtwy.net/eyes/).

## Requirements
OS-Acuity was written for the Google Chrome web browser on the following hardware.
* [ViewSonic VP2458 24" 1080p Display](https://amzn.to/2JeLP8s)
* [Intel Compute Stick CS125 w/ Win 10](https://amzn.to/2H0kC80)
* [1.75" Wall Mount](https://amzn.to/2W1tTpL)
* [Bluetooth Remote](https://amzn.to/2wfzRny) (Optional)
* [Charging Ports for Remote](https://amzn.to/2WiZhzc) (Optional)

### Exam room
Line-of-sight distance from patient to display should be inside the range 10 ft to 30 ft. Distances outside that range may be inaccurate. OS-Acuity supports reversed optotype for rooms with mirrors.

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

## Installation and usage
Put the contents of wwwdata into the root directory, subfolder, or subdomain of your website. It is recommended that you clone this repo and then symlink the folder to streamline future updates.

### Configuration
Press Q to open the configuration menu. Your session's settings are saved as a cookie.

### Usage
Press ↑ or ↓ (up or down) to increase or decrease the size of the optotype. Press ← or → (left or right) to randomize the letters.

## Formulas & Calculations
Optotype calculations provided by Dr. Christopher Carver, O.D.

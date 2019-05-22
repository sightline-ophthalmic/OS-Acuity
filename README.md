# OS-Acuity
Open Source Visual Acuity Testing for Optometrists. This open source project (and it's continued support) is funded by Sightline Ophthalmic Associates. Original code by James Watt. This repo contains a copy of [Optician-Sans](https://github.com/anewtypeofinterference/Optician-Sans).

## Demo
A development demo of this code is available on [gtwy.net](https://gtwy.net/eyes/).

## Hardware
Version 1 of OS-Acuity has been designed to run inside the Chrome browser on the following hardware.
* [ViewSonic VP2458 24" 1080p Display](https://amzn.to/2JeLP8s)
* [Intel Compute Stick CS125 w/ Win 10](https://amzn.to/2H0kC80)

We cannot assure correct sizing on unsupported displays. However, if you are confident in your measurement and math abilities, calculate the real world width and height for 1px as displayed on your screen. Double check your answer matches this [calculator tool](http://lcdtech.info/en/data/pixel.size.htm). Replace the default pixel width of 0.274mm inside the configuration menu.

## Installation
Put the contents of wwwdata into the root directory, subfolder, or subdomain of your website. It is recommended that you clone this repo and then symlink the folder to streamline the update process.

## Configuration
Press Q to open the configuration menu. At a minimum, please set the correct line of sight distance.

## Room size
Line of sight distance from patient to display should be inside the range 10 ft to 30 ft. OS-Acuity supports mirrored text.

## Formulas & Calculations
Optotype calculations provided by Dr. Christopher Carver, O.D.

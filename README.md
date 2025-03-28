# Geography

Geography Flag game, shows a set ammount of flags, from 2-10. Prompts the user to click on the correct flag for the random country.
Settings tab that allows the user to set the ammount of flags, or if US States are included. Includes a basic streak counter.

This is source code, the mini game can be found on my [website](https://www.solomonhas.com/geography/) currently.

## Files

testsite.html:
This is the display page with the HTML code.

style.css:
This is the CSS code, design and layout of the webpage.

script.js:
This is the JavaScript file that the games logic is played off of. It takes a random number and fetches that countries flag using the Flagpedia API.
It displays the correct countries flag as well as other random ones.
If you get it correct it will fetch new flags and increase the counter, incorrect counter resets back to 0.

server.js:
This is the future leaderboard server, it will use PostgreSQL and node.js to obtain the top 10 streak scores and allow the user to input their name to be shown on the website, still not done.

dist/codes.json:
This is the list of the ISO 3266 country codes and the US states. It was origanlly from a long time ago, and no the whole list is in script.js, it's not as pretty but faster and easier that way.
Currently this has no use.

## Usage

This program uses various data from [flagpedia.net](https://flagpedia.net/). Including public domain images of flags and the ISO 3166 Country Codes found in Geography\dist\codes.json.

## Future Updates
I plan to add a country outline part of the quiz, where it shows an outline of a country and you have to either click the name or the flag.

I have thought about adding hints, for example the capitol city or outline of the country. A leaderboard ran with node.js and SQL will be added in the future.

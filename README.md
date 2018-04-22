## What Even Is This?
To celebrate their fifth birthday, the website Polygon decided to rank the [500 best games of all time](https://www.polygon.com/features/2017/11/27/16158276/polygon-500-best-games-of-all-time-500-401).

To pay homage, I thought it would be a fun project to create a generative version. The titles of the video games are generated via a simple Markov Chain, which takes in a large list of actual video game titles and then spits out a new combination thereof. The descriptions are actually mangled together from Polygon's feature, using simplified versions of its descriptions as the building blocks of the text.

The generator uses the title of the site as the seed for randomization; this makes a list easy to share, should you find a made up list that you think is worth sharing.

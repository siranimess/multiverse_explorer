
# Web Development Project 5 - Multiverse Explorer

Submitted by: **Animesh Niraula**

This web app: **Multiverse Explorer is a React dashboard that allows users to explore characters from Rick and Morty using a public API. Users can search for characters by name, filter them by species and status, and select a minimum number of episode appearances. The dashboard also displays summary statistics, including the total number of loaded characters, alive characters, unique species, and average episode appearances.**

Time spent: **[Enter actual hours]** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - [x] The dashboard displays at least 10 unique items, one per row
  - [x] The dashboard includes at least two features in each row

- [x] **The useEffect() React hook and async/await syntax are used**
  - [x] The application fetches character data from the Rick and Morty API

- [x] **The app dashboard includes at least three summary statistics about the data**
  - [x] Total number of characters loaded
  - [x] Number of alive characters
  - [x] Number of unique species
  - [x] Average number of episode appearances

- [x] **A search bar allows the user to search for an item in the fetched data**
  - [x] Search bar filters characters by name
  - [x] Results dynamically update as the user types into the search bar

- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - [x] Species dropdown filters characters by species
  - [x] Status dropdown filters characters by status
  - [x] Filters use different attributes from the search bar
  - [x] Dashboard dynamically updates as filters are adjusted

## Stretch Features

The following **stretch** functionality is completed:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types, including text input, dropdowns, and a slider
- [x] Users can set a minimum episode appearance value

## Video Walkthrough

Here's a walkthrough of implemented user stories:



## Notes

While building this project, I learned how to fetch data from a public API using React's useEffect hook and async/await. I also practiced using .map() to display character information and .filter() to update the results based on user input.

The most challenging part was making multiple filters work together. I had to make sure that searching for a character and selecting different filter options would update the same list correctly.

I also added summary statistics, responsive styling, a reset button, and loading and error messages to make the dashboard easier to use.

## License

Copyright 2026 Animesh Niraula

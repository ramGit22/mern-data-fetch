# Data Fetch and Manipulation
A MERN stack based application to fetch data from mongoDB database and render in the webpage including endpoint to manipulate data.

## Running the Project
- Install the latest version of node.js(https://nodejs.org/en/).
- Clone the repository.
- Install dependencies using "npm install" in both client and server folders.
- Include .env file provided separately upon request inside the "server" folder.
- Start the backend server using npm start.
- Start the frontend using npm start.
- The app will be available at http://localhost:3000/.



## Data
The app uses 1 dataset of Alko price list data.

## Note: I used only 1000 journey data due to limitation in storage capacity in my MongoDB database.


## Data Import
- The application imports data from xlsx files to a MongoDB database using script.
## Data View
- After clicking "Add" button application displays a list of alcohol in the table and clears the table when clicking "Empty" button.
- Each row has "Add" button to add the order-amount which updates the order-amount both in frontend as well as in database.



## Note: 
I haven't finished implementing all the features yet, but I am eager to add them in the future as a personal project:)

The folders here follows very simple naming convention. A brief description of the folder structure is as follows:

1. src/consts: You will find all the consts or the functions/variables which does not need to be changed throughout the project. There, I have written my react-toastify's toasts and some helper functions which I have used througout the project.

2. src/deso: Here the code for connecting to the DeSo blockchain is written. The way it is further structured is that, all the Identity code is written in src/deso/desoidentity.js. The API handling of DeSo can be found in the src/deso/desoapi.js. The way I have written them is both of them are clasess which can be imported anywhere in the project and they would work perfectly. I found this way to be the most elegant instead of having code duplication everywhere. There are almost all the endpoints which are available on the DeSo docs used here. 

3. src/navbar: This is the navbar component which is used in the project. It is a very simple component which is used to navigate through the different pages. The styling of the navbar is done in the src/navbar/styles.css file. 

4. src/redux: I chose to go with Redux as my state managment. I noticed that I was going to need very similar data everywhere in the project which would lead to a lot of code duplication and would take away from the neatness of the project so, I have used Redux. The archi of Redux used here is, since there are two chaine, Both of them are handled differently in thier respective folders. Then, both the reducers are then imported in the store, a THUNK middleware layer has been used because It would allow me to make asynchronous calls to the blockchain. The actions are then imported in the reducers. The store file and is wrapped around the Index.js file.

5. src/server: This is the server file which is used to run the project. The way this one works is that it stored the data over at the local system, which is then fetched and served elsewhere

6. src/views: This is the folder where all the views are stored. The views are the pages which are rendered in the browser. The views are stored in the src/views/ folder. The views are then imported in the index.js file using React Router. There are four pages in this application and styling to each page could be found in the respective css files in the same folder. 
-> src/views/login: This is the landing page of the application, whenever the user comes over to the app they see this page. They can actually use this page to log into both the chains and then view the project thereafter. 
-> src/views/discover: In the user journey this is the next page which they hit. Here they can see all the NFTs on both the chains. They can also click on individual NFTs to engage with them (Buy, Sell, Trade, etc.). This also has a button to switch chains, so the user will not be confused with which NFTs are from which chain.
-> src/views/generate: This is the page where user can actully use a GAN to generate thier own art. Which is then uploaded on an image sharing website imgbb.com. The link is provided to the user, in case they wanted to mint this as a NFT. The generation of the images is handled by a GAN which uses multiple models, more information and the code can be found in this link. (I did not include the Collab file with this because it is overwhelmingly big and overshadows all the other languages used in this project)
-> src/views/user: This is the page where user can see thier own NFTs, generated art and they can also mint more NFTs on both the chains. You just need a link to the image and rest is handled for you.

7. src/solana-server: This is where all the solana code is held. I went with a server client archi because solana's libraries have issues with CRA (or create react app) the solutions that they provide did not work for me on a burner app, hence I did not wanted to use them over at client side. (The issue with imports, since Solanafiles are in the extention, .mjs)

Link to Google Collab -> https://colab.research.google.com/drive/1RmWxNd7eSbkZGs9ZgXVQjVZ6k9RK3eHU#scrollTo=6zLxeZPCFnS-


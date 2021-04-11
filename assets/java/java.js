var favCoins= $('#fav-coin');


var subRedditNames = [
  "Bitcoin,BTC",
  "Ethereum,ETH",
  "Binance,BNB",
  "Tether,USDT",
<<<<<<< HEAD
  "dot,DOT",
  "nnnn,DDD"
=======
  "Dot,DOT",
>>>>>>> 6958c282f95d004769eece90c279825b44df0a06
]; // add reddit name here

var collectedData = []; // unsorted data is stored inside this array

// Once the document is load we fetch all subreddit names
$(document).ready(function () {
  console.log("Document Loaded.");
<<<<<<< HEAD


 
=======
  
>>>>>>> 6958c282f95d004769eece90c279825b44df0a06
  // Collects data for all reddits in the array.
  // Since fetch is we
  for (let i = 0; i < subRedditNames.length; i++) {
    // Split the index to get the
    var coinInfo = subRedditNames[i].split(",");
  
    // The reddit name is stored before the ',' so input index '0'
    Get_RedditSubCount(coinInfo[0], coinInfo[1]);

    


  }
  
});

// when given a subredded ex: 'https://www.reddit.com/r/Bitcoin/' we can search for that
// subreddits information.
function Get_RedditSubCount(subRedditName, symbol) {
  fetch(`https://www.reddit.com/r/${subRedditName}/about.json`)

  
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Calls another function to reduce mess inside fetch
      return CollectData(symbol, subRedditName, data.data.subscribers);
    })
    .catch(function (error) {
      console.log(error);
    });
    
}


// This function pushes information into an array 'collectedData' and then creates a card
// for the crypto.
// TODO: Sort 'collectedData' after all the fetch functions have completed.
// fetch is async so you need to make sure all fetches have completed
function CollectData(symbol, name, subRedditSubscribers) {
  // Store data for use later.
  
  var item = { coinSymbol: symbol, redditName: name, redditSubs: subRedditSubscribers };
 
  collectedData.push(item); 
    //sorting fucntion
  collectedData.sort((a, b) => (a.redditSubs < b.redditSubs) ? 1 : -1);
  //end of sorting function
  if(collectedData.length == subRedditNames.length){
    for(i = 0; i < collectedData.length; i++){
      CreateCoinCard(collectedData[i].coinSymbol, collectedData[i].redditName, collectedData[i].redditSubs );
    }
  }
   
}

function CreateCoinCard(symbol, name, subRedditSubscribers) {
  // Now that we've stored the data, add the info to the chart
  var coinCardHTML = "";
  coinCardHTML += `<div class="row fav-line" onchange="toggleCheckbox(this)">
  <div class="col-1">1</div>
<<<<<<< HEAD
  <input id="fav-coin" class="col-1 star" type="checkbox" />
  <div class="col">${symbol}: r/${name}</div>
  <div cass="col">${subscribers}</div>
    </div>`;

  $(".container").append(coinCardHTML); 
  
};


favStored= [];

function toggleCheckbox(el) {

  if (el.children[1].checked) {
  console.log(el.children[2].textContent);
  
  favStored.push(el.children[2].textContent); 
  localStorage.setItem("Fav", favStored);
  
}

else {
  
}



console.log(favStored);

  
};





// el.children[1].checked= localStorage.getItem('Fav');


 
=======
  <input class="col-1 star" type="checkbox" />
  <div class="col">${symbol}: ${name}</div>
  <div cass="col">${subRedditSubscribers}</div>
  </div>`;
  $(".container").append(coinCardHTML);
}
>>>>>>> 6958c282f95d004769eece90c279825b44df0a06

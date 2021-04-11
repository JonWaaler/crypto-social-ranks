
var subRedditNames = [
  "Bitcoin,BTC",
  "Ethereum,ETH",
  "Binance,BNB",
  "Tether,USDT",
  "Dot,DOT",
]; // add reddit name here

var collectedData = []; // unsorted data is stored inside this array

// Once the document is load we fetch all subreddit names
$(document).ready(function () {
  console.log("Document Loaded.");
  
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
  <input class="col-1 star" type="checkbox" />
  <div class="col">${symbol}: ${name}</div>
  <div cass="col">${subRedditSubscribers}</div>
  </div>`;
  $(".container").append(coinCardHTML);
};




favStored= [];

function toggleCheckbox(el) {

  if (el.children[1].checked) {
    console.log(el.children[2].textContent);
    favStored.push(el.children[2].textContent); 
    localStorage.setItem("Fav", JSON.stringify(favStored));

    console.log(localStorage.getItem('Fav'));
  
  }

  else {
  
  }



console.log(favStored);

};     
  

    // localStorage.setItem("Fav", el.children[2]);
    // $(el.children[1]).checked= localStorage.getItem("fav","val");
    
//   });
//   $(el.children[1]).on("change", function() {
//     $(el.children[1]).css("color", "pink");
//   });  
// };




// if (el.children[1].checked) {
//   console.log(el.children[2].textContent);

// // favStored.push(el.children[2].textContent); 
//   localStorage.setItem("Fav", el.children[2]);
//   $(el.children[1]).prop("checked", true) 
// }
//   else {
//     $(el.children[1]).prop("checked", false);
//   };


// console.log(favStored);

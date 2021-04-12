var subRedditNames = [
  "Bitcoin,BTC",
  "Ethereum,ETH",
  "Binance,BNB",
  "Tether,USDT",
  "Dot,DOT",
  "Litecoin,LTC",
  "Monero,XMR",
  "Nxt,NXT",
  "UniSwap,UNI",
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

    // i is the index, isChecked is for favorite functionality
    Get_RedditSubCount(coinInfo[0], coinInfo[1]);
    // The reddit name is stored before the ',' so input index '0'
  }
});

// when given a subredded ex: 'https://www.reddit.com/r/Bitcoin/' we can use 'bitcoin' for that
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
// Sort 'collectedData' after all the fetch functions have completed.
// fetch is async so you need to make sure all fetches have completed
var favorites = [];
function CollectData(symbol, name, subRedditSubscribers, rank, isChecked) {
  // Store data for use later.

  var item = {
    coinSymbol: symbol,
    redditName: name,
    redditSubs: subRedditSubscribers,
  };

  collectedData.push(item);
  //sorting fucntion
  collectedData.sort((a, b) => (a.redditSubs < b.redditSubs ? 1 : -1));
  //end of sorting function

  // Creates coin card for each coin
  if (collectedData.length == subRedditNames.length) {
    // TODO: before creating the cards figure out if is checked should be true or false
    // make sure fav array is empty
    favorites = [];

    // check all possible coins for favorites and push into an array if true or false
    for (let i = 0; i < collectedData.length; i++) {
      if (localStorage.getItem(collectedData[i].coinSymbol) === null) {
        favorites.push(false);
      } else {
        favorites.push(true);
      }
    }

    // Put card visual on screen
    for (i = 0; i < collectedData.length; i++) {
      CreateCoinCard(
        collectedData[i].coinSymbol,
        collectedData[i].redditName,
        collectedData[i].redditSubs,
        i + 1,
        favorites[i]
      );
    }
  }
}

function CreateCoinCard(symbol, name, subRedditSubscribers, rank, isChecked) {
  // Now that we've stored the data, add the info to the chart
  var coinCardHTML = "";
  if (isChecked) {
    coinCardHTML += `<div class="row" id=${symbol}>
    <input class="col-1 star" type="checkbox" onclick="save(this)" checked/>
    <div class ="col">${rank}</div>
    <div class="col">${symbol}: ${name}</div>
    <div cass="col">${subRedditSubscribers}</div>
    </div>`;
    $(".container").append(coinCardHTML);
  } else {
    coinCardHTML += `<div class="row" id=${symbol}>
    <input class="col-1 star" type="checkbox" onclick="save(this)" />
    <div class ="col">${rank}</div>
    <div class="col">${symbol}: ${name}</div>
    <div cass="col">${subRedditSubscribers}</div>
    </div>`;
    $(".container").append(coinCardHTML);
  }
}

// function to get serch value and scroll to page where value exists
function searchScroll() {
  var searchEl = document.querySelector("#symbolSearch").value.toUpperCase();
  console.log("#" + searchEl + "");
  console.log(document.querySelector("#" + searchEl + ""));
  var searchRow = document.querySelector("#" + searchEl + "");
  searchRow.scrollIntoView();
  window.scrollBy(0, -60);
  searchRow.classList.add("highlight-row");
}

function save(obj) {
  // Save data when checkbox is true
  console.log($(obj).parent().attr("id"));

  if (obj.isChecked) {
    console.log(` is now checked`);
  } else {
    console.log(` is unchecked`);
  }
  localStorage.setItem($(obj).parent().attr("id"), obj.isChecked);
}

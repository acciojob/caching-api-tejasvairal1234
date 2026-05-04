const fetchButton = document.getElementById("fetch-button");
const resultsDiv = document.getElementById("results");

const cache = new Map();
const CACHE_DURATION = 60 * 1000; // 1 minute

const fetchData = async () => {
  const cacheKey = "triviaData";
  const cachedEntry = cache.get(cacheKey);

  const now = Date.now();

  
  if (cachedEntry && (now - cachedEntry.timestamp < CACHE_DURATION)) {
    console.log("Serving data from cache");
    return cachedEntry.data;
  }

  
  console.log("Making API call");

  const response = await fetch("https://opentdb.com/api.php?amount=3");
  const data = await response.json();

  
  cache.set(cacheKey, {
    timestamp: now,
    data: data,
  });

  return data;
};

const displayData = (data) => {
  const question = data.results[0].question;
  resultsDiv.textContent = question;
};

fetchButton.addEventListener("click", async () => {
  const data = await fetchData();
  displayData(data);
});
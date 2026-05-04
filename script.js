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

  try {
    const response = await fetch("https://opentdb.com/api.php?amount=3");
    const data = await response.json();

    
    if (!data || !data.results || !Array.isArray(data.results)) {
      return null;
    }

    cache.set(cacheKey, {
      timestamp: now,
      data: data,
    });

    return data;
  } catch (error) {
    console.error("API error:", error);
    return null;
  }
};

const displayData = (data) => {
  
  if (
    !data ||
    !data.results ||
    !Array.isArray(data.results) ||
    data.results.length === 0
  ) {
    resultsDiv.textContent = "No data available";
    return;
  }

  const question = data.results[0].question || "No question found";
  resultsDiv.textContent = question;
};

fetchButton.addEventListener("click", async () => {
  const data = await fetchData();
  displayData(data);
});
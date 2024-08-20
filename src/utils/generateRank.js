const generateRank = (unavailableRanks, numOfMembers) => {
  let rank;
  const maxAttempts = 100; // Maximum number of attempts to avoid infinite loops
  let attempts = 0;

  // Retry generating a unique rank
  do {
    rank = Math.floor(Math.random() * numOfMembers) + 1; // Ensures rank is between 1 and numOfMembers
    attempts++;
  } while (unavailableRanks.includes(rank) && attempts < maxAttempts);

  // Optionally handle the case where no unique rank is found after max attempts
  if (attempts >= maxAttempts) {
    console.error('Failed to generate a unique rank after multiple attempts.');
    return null; // Indicate failure to generate a unique rank
  }

  return rank;
};

export default generateRank;

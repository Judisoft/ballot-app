
const generateRank = (unavailableRanks, numOfMembers) => {
    if (window.confirm('Are you sure you want to ballot with this choice?')) {
      let rank;
      do {
        // rank = Math.floor(Math.random() * numOfMembers + 1);
          rank = Math.floor(Math.random() * 11 + 1);
      } while (unavailableRanks.includes(rank));
      return rank;
    } else {
      window.location.reload();
    }
  };

export default generateRank;


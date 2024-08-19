
// const generateRank = (unavailableRanks, numOfMembers) => {
//     if (window.confirm('Are you sure you want to ballot with this choice?')) {
//       let rank;
//       do {
//         // rank = Math.floor(Math.random() * numOfMembers + 1);
//           rank = Math.floor(Math.random() * 11 + 1);
//       } while (unavailableRanks.includes(rank));
//       return rank;
//     } else {
//       window.location.reload();
//     }
//   };

const generateRank = (unavailableRanks, numOfMembers) => {
     // Define the array of possible ranks
    const allRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    
    // Filter out unavailable ranks
    const availableRanks = allRanks.filter(rank => !unavailableRanks.includes(rank));
    
    // Check if there are available ranks left
    if (availableRanks.length === 0) {
        throw new Error('No available ranks left to choose from.');
    }
    
    // Pick a random number from the available ranks
    const randomIndex = Math.floor(Math.random() * availableRanks.length);
    return availableRanks[randomIndex];

    // end
    // if (window.confirm('Are you sure you want to ballot with this choice?')) {
    //     let rank;
    //     const availableRanks = Array.from({ length: 11 }, (_, i) => i + 1)
    //                                 .filter(rank => !unavailableRanks.includes(rank));
        
    //     if (availableRanks.length === 0) {
    //         throw new Error('No available ranks left to choose from.');
    //     }
        
    //     rank = availableRanks[Math.floor(Math.random() * availableRanks.length)];
        
    //     return rank;
    // } else {
    //     window.location.reload();
    // }
};

export default generateRank;


// export default generateRank;


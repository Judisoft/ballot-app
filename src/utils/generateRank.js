
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
    if (window.confirm('Are you sure you want to ballot with this choice?')) {
        let rank;
        const availableRanks = Array.from({ length: 11 }, (_, i) => i + 1)
                                    .filter(rank => !unavailableRanks.includes(rank));
        
        if (availableRanks.length === 0) {
            throw new Error('No available ranks left to choose from.');
        }
        
        rank = availableRanks[Math.floor(Math.random() * availableRanks.length)];
        
        return rank;
    } else {
        window.location.reload();
    }
};

export default generateRank;


// export default generateRank;


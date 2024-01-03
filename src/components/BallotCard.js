import React, { useState, useEffect } from 'react';
import axios from 'axios';
import generateRank  from './../utils/generateRank';
import getCookie from './../utils/getCookie';
import NotifySuccess from './../utils/notifications/NotifySuccess';
import NotifyError from './../utils/notifications/NotifyError';

const BallotCard = ({members, selectedGroup}) => {
    
    const [unavailableRanks, setUnavailableRanks] = useState([]);
    const [message, setMessage] = useState('')

    useEffect(() => {
        const getUniqueRank = async () => {
          try {
            const group = selectedGroup;
            const token = getCookie('token');
            const res = await axios.post('http://localhost:5000/api/v1/ballots/ranks', { group }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            const ranks = res.data.ballotList.map(item => item.rank);
            setUnavailableRanks(ranks);
          } catch (error) {
            console.log(error);
          }
        };
    
        getUniqueRank();
      }, [unavailableRanks, selectedGroup]); 

    console.log(unavailableRanks);

    const handleMouseOver = (e) => {
      setMessage(selectedGroup);
    }

    const handleMouseOut = (e) => {
      setMessage('')
    }

    const handleClick = (e) => {
        const numOfMembers = members.length;
        const rank = generateRank(unavailableRanks, numOfMembers);
        const userName = getCookie('authUsername');
        const group = selectedGroup;
                
        const saveBallotResult = async () => {
            try {
                const token = getCookie('token');
                const res = await axios.post('http://localhost:5000/api/v1/ballots',{
                    userName: userName,
                    group: group,
                    hasBalloted: true,
                    rank: rank
                     
                 }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                NotifySuccess(res.data.message);
            } catch (error) {
                console.log(error)
                NotifyError(error.response.data.message);
            }
        }
        saveBallotResult();
    }

  return (
    <div>
        <div className="p-4">
            <button 
                className="block p-8 bg-gray-900 border border-gray-200 text-md text-center items-center justify-center font-extrabold h-32 w-32 rounded-lg shadow-md hover:bg-gray-300 hover:border-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                onClick={handleClick}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
              {message}
            </button>
        </div>
    </div>
  )
}

export default BallotCard
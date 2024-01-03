import React from 'react';
import { useState, useEffect } from 'react';
import BallotCards from './BallotCards';
import axios from 'axios';
import NotifyError from '../utils/notifications/NotifyError';
import getCookie from '../utils/getCookie';

const SelectGroup = () => {
const [data, setData] = useState([]);
const [members, setMembers] = useState([]);
const [selectedGroup, setSelectedGroup] = useState('');
  
useEffect(() => {
  // Get all groups that a user belongs to
  axios.get('http://localhost:5000/api/v1/members')
  .then(response => {
    const res = response.data.members;
    setData(res);
  })
  .catch(error => {
    console.log(error)
  })
}, []);

  const getAllMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/members');
      const res = response.data.members;
      setMembers(res);
    } catch (error) {
      if (error.response.status === 401) {
        NotifyError('Unauthorized! Please login');
      } else {
        NotifyError(error.data.message);
      }
    }
  }
 
  const filteredData = data.filter(obj => obj.telephone === getCookie('authUserTelephone'));
  const sortedGroups = Array.from(new Set(filteredData.flatMap(item => item.group))).sort();
  const options = sortedGroups.map(group => (
                                 <option key={group}>{group}</option>
                               ));

  const handleOnchange = (e) => {
    setSelectedGroup(e.target.value);
    getAllMembers();
  }

  const memberData = members.filter(item => item.group.includes(selectedGroup)).map(item => item.name);
 
  return (
    <div>
      <div className="py-2 px-4 mb-8 mx-auto max-w-screen-sm text-center lg:py-2  relative">
        <select onChange={handleOnchange} className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="">Select a Group</option>
          {options}
        </select>
        {
          (members)
            ? <BallotCards members={memberData} selectedGroup={selectedGroup} />
            : <h1 className="mb-8 pt-8 text-2xl font-semibold tracking-tight leading-none text-gray-500 md:text-2xl lg:text-2xl dark:text-white">Select Group to ballot</h1>
        }
      </div>
    </div>
  )
}

export default SelectGroup
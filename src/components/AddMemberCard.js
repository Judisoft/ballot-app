import React from 'react';
import { useState, useEffect } from 'react';
import NotifySuccess from '../utils/notifications/NotifySuccess';
import NotifyError from '../utils/notifications/NotifyError';
import axios from 'axios';
import getCookie from '../utils/getCookie';

const AddMemberCard = () => {


const [groupName, setGroupName] = useState('');
const [userName, setUserName] = useState('');
const [userTelephone, setUserTelephone] = useState('');
const [groups, setGroups] = useState([]);

useEffect(() => {
    axios.get('http://localhost:5000/api/v1/groups')
    .then(response => {
      const res = response.data.groups;
      setGroups(res);
    })
    .catch(error => {
      if (error.response.status === 401) {
        NotifyError('Unauthorized attempt to fetch groups! Please login');
      } else {
        NotifyError(`${error.data.message} while fetching groups`);
      }
    });
  }, []);

const sortedGroups = groups.map(group => group.title).sort();
const options = sortedGroups.map(group => (
                                 <option key={group}>{group}</option>
                               ));

const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
        name: userName,
        telephone: userTelephone,
        group: groupName
    }
    const addMemberToGroup = async () => {
        try {
            const token = getCookie('token');
            const res = await axios.post('http://localhost:5000/api/v1/members', userInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            NotifySuccess(`${res.data.message}`);
            //After adding a member, clear the form and add other members
            setUserName('');
            setUserTelephone('');
            setGroupName('');
        } catch (error) {
            if(error.response.status === 401) {
                NotifyError('Unauthorized to perform this action. Login and try again.')
            } else {
                NotifyError(error.response.data.message);
            }
        }
    }
    addMemberToGroup();
}

  return (
    <div>
        <section className="bg-white mb-32 dark:bg-gray-900 dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
            <div className="flex justify-center items-center px-4 mx-auto max-w-screen-xl text-center relative">
                <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div>
                    <h5 className="text-xl pb-8 font-medium text-gray-900 dark:text-white">
                        Add member {" "}<span className="text-blue-700">{groupName ? "👉 " + groupName : ""}</span>
                    </h5>
                    <form 
                        className="space-y-6" 
                        method="POST"
                        onSubmit={handleAddMemberSubmit}
                    >
                         <div>
                         <select 
                            onChange={e => setGroupName(e.target.value)}
                            className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Selet a group</option>
                            {options}
                        </select>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="userName"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Member's Name"
                                required="required"
                                autoFocus
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                name="telephone"
                                value={userTelephone}
                                onChange={e => setUserTelephone(e.target.value)}
                                className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Telephone"
                                required="required"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Add Member
                        </button>
                    </form>
                </div>
                <div className="pt-8">
                    <a href="/groups" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-sm inline-flex items-center">
                        Create New Group
                        <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default AddMemberCard
import React from 'react';
import AddMemberCard from '../../components/AddMemberCard';
import Jumbotron from '../../components/Jumbotron';

const AddMember = () => {
  return (
    <div>
      <Jumbotron 
            title={'Add Member'}
        />
        <AddMemberCard />
    </div>
  )
}

export default AddMember
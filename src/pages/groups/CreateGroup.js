import React from 'react';
import CreateGroupCard from '../../components/CreateGroupCard';
import Jumbotron from '../../components/Jumbotron';

const CreateGroup = () => {
  return (
    <div>
      <Jumbotron 
            title={'Create Group'}
        />
        <CreateGroupCard />
    </div>
  )
}

export default CreateGroup
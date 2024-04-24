import React from 'react';
import ChangePasswordCard from '../../components/ChangePasswordCard';
import Jumbotron from '../../components/Jumbotron';

const ChangePassword = () => {
  return (
    <div>
        <Jumbotron title={'BallotApp - Reset Password'} />
        <ChangePasswordCard />
    </div>
  )
}

export default ChangePassword
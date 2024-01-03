import React from 'react';
import RegisterCard from '../../components/RegisterCard';
import Jumbotron from '../../components/Jumbotron';

const Register = () => {
  return (
    <div>
      <Jumbotron title='BallotApp - Register' />
        <RegisterCard />
    </div>
  )
}

export default Register
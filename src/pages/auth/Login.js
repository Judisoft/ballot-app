import React from 'react';
import LoginCard from '../../components/LoginCard';
import Jumbotron from '../../components/Jumbotron';

const Login = () => {
  return (
    <div>
      <Jumbotron title={'BallotApp - Login'} />
        <LoginCard />
    </div>
  )
}

export default Login
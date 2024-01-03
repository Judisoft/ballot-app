import React from 'react';
import Jumbotron from '../components/Jumbotron';

const Homepage = () => {
  return (
    <div>
        <Jumbotron 
            desc={
                'Transparency at its finest! Introducing our revolutionary Transparent Ballot app, ensuring \
                every pick is seen, recorded, and protected. Embrace the future of secure and trustworthy Njangi Ballot!'
            }
            readmore={true}
        />
    </div>
  )
}

export default Homepage
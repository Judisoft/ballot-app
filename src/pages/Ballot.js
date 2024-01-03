import React from 'react';
import SelectForm from '../components/SelectForm';
import Jumbotron from '../components/Jumbotron';
import Readmore from '../components/Readmore';

const Ballot = () => {
  return (
    <div>
        <Jumbotron 
            title={'Njangi Groups'}
        />
        <SelectForm />
        <div className="mx-auto max-w-screen-sm text-center relative">
          <Readmore message='View ballot results' link={'/ballots/groups'} />
        </div>
    </div>
  )
}

export default Ballot
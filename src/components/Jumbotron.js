import React from 'react';
import { useLocation } from 'react-router-dom';
import Typed from 'react-typed';
import Readmore from './Readmore';

const Jumbotron = ({title, desc, readmore}) => {
    const location = useLocation();
  return (
    <div>
        <section className="mt-16 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
            <div className="py-16 px-4 mx-auto max-w-screen-xl text-center lg:py-16 relative">
                {
                    (location.pathname === '/')
                    
                    ?   <h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-8xl dark:text-white">Ballot with {" "}
                            <span className="text-blue-700">
                                <Typed 
                                    strings={['Ease!', 'Convenience!', 'Confidence!']} 
                                    typeSpeed={100}
                                    backSpeed={40}
                                    cursorChar='_'
                                    backDelay={500}
                                    loop
                                />
                            </span>
                        </h1>
                    : <h1 className="mb-2 text-3xl font-bold tracking-tight leading-none text-gray-700 dark:text-white">{title}</h1>
                }
                <p className="mb-8 text-lg font-normal text-gray-600 leading-loose lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">{desc}</p>
                {
                    (readmore === true)
                    ? <Readmore message={"Read more about 'Njangi' Ballot app"} link={"/about"}/>
                    : <></>
                }
            </div>
        </section>
    </div>
  )
}

export default Jumbotron
import React from 'react';
import { getProviders, signIn } from 'next-auth/react'

function login({ providers }) {
  return (
      <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
          <img className='w-52 mb-5' src='https://links.papareact.com/9xl' />

          {Object.values(providers).map(provider => (
            <div>
              <button 
                className='bg-[#18D860] text-white mt-5 pt-3 pb-3 pl-10 pr-10 rounded-full'
                onClick={() => signIn(provider.id, { callbackUrl: "/"})}  
              >
                Login with Spotify
              </button>
            </div>
          ))}
      </div>
  );
}

export default login;

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

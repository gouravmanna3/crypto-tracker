import React from 'react';
import loading from './assets/loading.gif';

const Loader = () => {
  return (
    <div className='loader'>
        <img src={loading} alt='loading..' width={400} height={400} />
    </div>
  )
}

export default Loader;
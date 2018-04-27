import React from 'react';

const Header = () => {
  const urlBase = 'http://res.cloudinary.com/sawatskeda10/image/upload/';
  return (
    <div className='header'>
      <img src={urlBase + 'v1524855456/reduxTube_t6qira.png'}
           className='logo'
           alt='logo'/>

      <div className='contact'>
        <a href="https://github.com/david-sawatske/ReduxTube/">
          <img src={urlBase + 'v1523645571/github_gepeui.png'}
               className='github'
               alt='github'/>
        </a>
        <a href="http://www.sawatske.com">
          <img src={urlBase + 'v1524860068/personal-page_qrmtcq.png'}
               className='personal-page'
               alt='personal page'/>
        </a>
      </div>
    </div>
  )
};

export default Header;

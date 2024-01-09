import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='h-[100px] bg-white mt-[30px]'>
      <div className='h-[140px] bg-[rgb(49,71,106)] items-center flex flex-row justify-center flex-wrap gap-10 text-white'>
        <Link to='https://github.com/Hawana404'><i className="fa-brands fa-github fa-2x"></i></Link><Link to='https://github.com/MohamedAly532005'><i className="fa-brands fa-github fa-2x"></i></Link>
        <h1>&copy;Design By <Link to='mailto:yousef.hawana@gmail.com'>Hawana</Link> ,<Link to="mailto:mohamedalyebrahim2005@gmail.com">Mohamed</Link> and<Link to="mailto:rawanikadoly@gmail.com"> Rawan  </Link>  </h1>
      </div>
    </footer>
  )
}

export default Footer
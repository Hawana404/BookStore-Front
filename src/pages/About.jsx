import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (<><head><title>About</title></head>
    <div className="lg:w-[70%] h-[500px] justify-center flex md:w-[90%] text-white sm:w-[90%] w-[100%] m-auto bg-[rgb(49,71,106)] rounded-lg mt-[2%]">
      <div className='w-[90%] self-center'>
        <p>This website is a college peoject made by<strong><Link to="https://github.com/Hawana404"> &copy; Youssef Hawana</Link></strong> ,<strong><Link to="https://github.com/MohamedAly532005"> Mohamed Aly</Link></strong> and Rawan Ahmed<br/> and for any inquries regarding the website feel free to contact us</p>
      </div>
    </div>
  </>
  )
}

export default About
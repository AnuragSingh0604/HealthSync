import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
         <img className="mb-5 w-40" src={assets.logo} alt=""></img>
         <p className='w-full md:w-2/3 text-gray-600 leading-6'>
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum nulla deleniti modi eum, doloribus necessitatibus aliquid debitis est? Laudantium suscipit aliquid adipisci quos voluptates aperiam, alias, soluta deleniti accusantium, iste molestias ullam quod harum sequi incidunt natus. Illum neque reprehenderit possimus animi modi molestiae aliquam nulla ipsa? Iste, animi dicta.
         </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>

                    <li>Privacy policy</li>

                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>akbgs0001@gmail.com</li>
                    </ul>

            </div>
        </div>
        <div>
            <hr></hr>

        </div>
    </div>
  )
}

export default Footer
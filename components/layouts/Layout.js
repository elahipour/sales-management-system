import React from 'react'
import Header from '../modules/Header'
import Footer from '../modules/Footer'

function Layout({children}) {
  return (
    <div>
        <Header/>
        <main className='min-h-[85vh] '>
            {children}
        </main>
        <Footer/>
    </div>
  )
}

export default Layout
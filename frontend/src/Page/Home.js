import React from 'react'
import Hero from '../Components/Hero'
import Categories from '../Components/Categories'
import Products from '../Components/Products'
import Navbar from '../Components/Navbar'
import NewsLetter from '../Components/NewsLetter'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar home={true} />
      <Hero />
      <Categories />
      <Products  />
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default Home

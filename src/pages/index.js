import React, { useState } from "react"
import AllPost from "../components/AllPost"
import Layout from "../components/Layout"
import "./index.css"

const Home = () => {
  return (
    <Layout>
      <div>
        <AllPost />
      </div>
    </Layout>
  )
}

export default Home

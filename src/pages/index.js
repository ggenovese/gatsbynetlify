import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import cantinaLogo from "../images/cantina.svg";
import axios from "axios";

const IndexPage = () => {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = e.target.values;
    console.log("data", name)
    //call lambda function for team member

    // fetch api
    const hello = () =>
      axios({
        method: "get",
        url: "/.netlify/functions/hello",
        params: {
          searchName: name,
        },
        headers: { "Access-Control-Allow-Origin": "*" }
      })


    // await for results
    const res = await hello();
    console.log('res', res);
    setResults(res.data);
  };

  const getResults = () => {
    return (
      results.map(result => {
        return (
          <li key={result}>
            {result}
            <img
              src={result}
              style={{width:'100px', height:'100px'}}/>
          </li>
        )
      }));
  };

  return (
    <Layout>
      <SEO title="Home" />
      <div style={{ backgroundColor: "black" }}>
        <img src={cantinaLogo} alt="cantina" />
      </div>
      <h1>Who?</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" />
        <input type="submit" />
      </form>

      <h2>Results</h2>
      <ul>
        {results && (
          getResults()
        )}
      </ul>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}  

export default IndexPage

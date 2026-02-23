import React, { useEffect, useState } from 'react'
import "./App.css"
import axios from 'axios'
const App = () => {
  const [jokes ,setJokes] = useState([])
  useEffect(()=>{
    axios.get('/api/jokes')
    .then((res)=>{
    setJokes(res.data)
    })
    .catch((error)=>{
     console.log(error);
     })})
  return (
    <>
    <h1>JOKES //// </h1>
    <p>Jokes:{jokes.length}</p>
    {
      jokes.map((joke)=>(
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>

        </div>
      ))
    }
    </>
  )
}
export default App

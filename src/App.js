import React,  { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"
import { Container, withStyles, Switch } from "@material-ui/core";
import Header from './components/Header';
import Definitions  from './components/Definitions/Definitions';
import { grey } from '@material-ui/core/colors';

function App() {
  const [word, setWord] = useState("")
  const [meanings, setMeanings] = useState([])
  const [category, setCategory] = useState("en")
  const [lightMode, setLightMode] = useState(false)

  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      )
      setMeanings(data.data)
    } catch(error) {
      console.log(error)
    }
  }
  console.log(meanings)
  useEffect(() => {
    dictionaryApi()
  }, [word, category])

  return (
    <div className="App" style={{height: '100vh', backgroundColor: lightMode ? "#fff" : '#282c34', color: lightMode ? 'black' : "white", transition: "all 0.5s linear"}}>
      <Container maxWidth="md" style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", height:"100vh"}}>
        <div style={{position: "absolute", top: 0, right: 15, paddingTop: 10}}>
          <span>{lightMode ? "Dark": "Light"} Mode</span>
          <DarkMode checked={lightMode} onChange={() => setLightMode(!lightMode)} />
        </div>
        <Header lightMode={lightMode} category={category} setCategory={setCategory} word={word} setWord={setWord} />
        {meanings && (<Definitions lightMode={lightMode} word={word} meanings={meanings} category={category} />)}
      </Container>
    </div>
  );
}

export default App;

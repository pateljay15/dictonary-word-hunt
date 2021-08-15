import { TextField, createMuiTheme, ThemeProvider, MenuItem } from '@material-ui/core'
import React from 'react'
import "./Header.css"
import countries from "../data/category";

const Header = ({ category, setCategory, setWord, word, lightMode}) => {
    const darkTheme = createMuiTheme({
        palette: {
            primary: {
                main:lightMode ? "#000" : "#fff"
            },
            type: lightMode ? "light" : "dark"
        }
    })

    const handleChange = (language) => {
        setCategory(language)
        setWord("")
    }

    return (
        <div className="header">
            <span className="title">Word Hunt</span>
            <div className="inputs">
                <ThemeProvider theme={darkTheme}>
                    <TextField
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    className="search" label="Search a Word" />
                    <TextField
                        className="select"
                        select
                        label="Language"
                        value={category}
                        onChange={(e) => handleChange(e.target.value)}
                        >
                        {countries.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                                {option.value}
                            </MenuItem>
                        ))}
                        </TextField>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default Header
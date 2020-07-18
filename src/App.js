import React, {useState} from 'react';
import { FaGithub, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"
import { IconContext } from "react-icons";


function App() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${process.env.base}weather?q=${query}&units=metric&APPID=${process.env.apikey}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result)
                    setQuery('');
                });
        }
    }

    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    const social = {
        github: "https://github.com/ashwinkhode/weather-app",
        twitter: "https://twitter.com/ashwin4real",
        linkedin: "https://www.linkedin.com/in/ashwin-khode/",
        instagram: "https://www.instagram.com/ui.ashwin/"
    }

    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Enter Location"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                    <div>
                         <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                             <div className="date">{dateBuilder(new Date())}</div>
                            </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}C
                            </div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </div>
                ) : ('')}

                <footer>
                <p>Made with ♥ by Ashwin Khode</p>
                <ul className="social">
                <IconContext.Provider value={{ style: {fontSize: '25px', color: "rgb(255, 255, 255)"}}}>
                    <li><a href={social.github} rel="noopener noreferrer" target="_blank"><FaGithub /></a></li>
                </IconContext.Provider>
                <IconContext.Provider value={{ style: {fontSize: '25px', color: "rgb(255, 255, 255)"}}}>
                    <li><a href={social.twitter} rel="noopener noreferrer" target="_blank"><FaTwitter /></a></li>
                </IconContext.Provider>
                <IconContext.Provider value={{ style: {fontSize: '25px', color: "rgb(255, 255, 255)"}}}>
                    <li><a href={social.linkedin} rel="noopener noreferrer" target="_blank"><FaLinkedin /></a></li>
                </IconContext.Provider>
                <IconContext.Provider value={{ style: {fontSize: '25px', color: "rgb(255, 255, 255)"}}}>
                    <li><a href={social.instagram} rel="noopener noreferrer" target="_blank"><FaInstagram /></a></li>
                </IconContext.Provider>
                </ul>
                
               
                <div className="coffee">
                <a href="https://www.buymeacoffee.com/ashwinkhode" target="_blank" rel="noopener noreferrer"><img src="https://cdn.buymeacoffee.com/buttons/default-white.png" alt="Buy Me A Coffee" /></a>
                </div>
               
            </footer>
            </main>
            
        </div>
    );
}

export default App;

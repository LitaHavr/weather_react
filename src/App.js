import React, {Component} from "react";

import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentWeather: null,
            cityName: 'Praha'
        }
    }

    getWeatherData = (cityName) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=
        ${cityName}&appid=fc9ae7dc51cf52f919c0ac883ad0a4d8`)

            .then(response => response.json())

            .then(data => this.setState({currentWeather: data}))
            //.then( data => console.log(this.state.currentWeather))

    }

    componentDidMount() {
        this.getWeatherData('Prague');

    }

    onChangeCityName = (e) => {
        console.log(e.target.value)
        this.setState({

            cityName: e.target.value,
        })

    }
    onSubmitForm = (e) => {
        e.preventDefault();
        this.getWeatherData(this.state.cityName);

    }




    render() {
        if(!this.state.currentWeather){
            return null;
        }
        const {name,main,weather,sys} = this.state.currentWeather;
        let tempInC = Math.round(main.temp-273)
        console.log(tempInC);

        console.log(this.state.currentWeather);
        return (<div className='main'>
            <form className='form' onSubmit={this.onSubmitForm}>
                <input className='btn' type='text' placeholder='city' value={this.state.cityName} onChange={this.onChangeCityName}/>
                <input className='btn' type='submit' value='search'/>
            </form>
            <p><strong>Name of city:</strong></p>
            <p>{name || 'not a data'}</p>
            <p><strong>Temperature:</strong></p>
            <p>{tempInC + "°C" || 'not a data'}</p>
            <p><strong>Weather:</strong></p>
            <p>{weather?.[0]?.description || 'not a data'}</p>
            <p><strong>Country:</strong></p>
            <p>{sys?.country || 'not a data'}</p>

        </div>);

    }
}

export default App;

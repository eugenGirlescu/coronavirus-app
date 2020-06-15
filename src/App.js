import React from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import CardBody from './CardBody';
import CardHeader from './CardHeader'
import image from './coronavirus.jpg'


class App extends React.Component {
  constructor(props) {
    super(props);
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() +' '+ today.getHours()+':'+ today.getMinutes()+':'+ today.getSeconds();
    this.state = {
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      countries: [],
      lastUpdate: "",
      date:date
    }
    this.getCountryData = this.getCountryData.bind(this);
  }
  
  async getData() {
    const resApi = await axios.get("https://covid19.mathdro.id/api");
    const resCountries = await axios.get("https://covid19.mathdro.id/api/countries");

    const countries = [];
    for (let i = 0; i < resCountries.data.countries.length; ++i) {
      countries.push(resCountries.data.countries[i].name)
    }

    this.setState({
      confirmed: resApi.data.confirmed.value,
      recovered: resApi.data.recovered.value,
      deaths: resApi.data.deaths.value,
      countries: countries,
      lastUpdate: resApi.data.lastUpdate

    })

  }
  componentDidMount() {
    this.getData();
  }

  renderCountryOptions() {
    return this.state.countries.map((country, i) => {
      return <option key={i}>{country}</option>
    })
  }
  async getCountryData(event) {
    if (event.target.value === "In total") {
      return this.getData()
    }
    const result = await axios.get(`https://covid19.mathdro.id/api/countries/${event.target.value}`);
    this.setState({
      confirmed: result.data.confirmed.value,
      recovered: result.data.recovered.value,
      deaths: result.data.deaths.value
    })
  }

  render() {
    return (
      <div className="card">
        <CardHeader image ={image} />
        <CardBody renderOptions={this.renderCountryOptions()} onchange={this.getCountryData} title={'Informatiile zilei despre Covid-19'} date={this.state.date} confirmed={this.state.confirmed} recovered={this.state.recovered} deaths={this.state.deaths}/>
      </div>
  
    );
  }
  }
  export default App;
  
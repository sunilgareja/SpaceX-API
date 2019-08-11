import React, {Component} from 'react';
import Card from './Cards/cards';
import './App.css';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Select from 'react-select';

var placeholder = [];

for (var i = 0; i < 12; i++) {
  placeholder.push(<Card key={i}/>);
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {flights: [], selectedOption: null};
  }

  componentDidMount() {
    this.getFlights();
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    // console.log(`Option selected:`, selectedOption.value);
    
    const filter =JSON.parse(localStorage.getItem('flightData')).filter(
      (flight) =>{
        if(selectedOption.value==='All'){
          return flight;  
        }else {
          return selectedOption.value===flight.rocket.rocket_name;
        }
      }
    );

    this.setState({ flights: filter });
    // console.log(filter)
  };

  getFlights = async () => {
    try{
      let res = await axios.get("https://api.spacexdata.com/v3/launches?sort=launch_date_utc");
      let data = res.data;
      this.setState({ flights: data });
      localStorage.setItem('flightData', JSON.stringify(data));

      // this is to deal with filtering the results
      const flight = this.state.flights.map(f => f.rocket.rocket_name);
      const options = flight.filter((q, idx) => flight.indexOf(q) === idx);
      let optionSelect = options.map((str) => ({ value: str, label: str }));
      optionSelect.unshift({value: "All", label: "All"});
      this.setState({ filterVals: optionSelect });
      localStorage.setItem('optionSelect', JSON.stringify(optionSelect));

    } catch(e){
      console.log('Flight API Call Failed');
      let data=localStorage.getItem('flightData');
      this.setState({ flights: JSON.parse(data) });    
    }
  };

  
  render(){
    const { selectedOption } = this.state;
    // console.log(this.state);
    return (
        <div className="App">
          <div className={{      
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'center',
            flexWrap: 'wrap',}}>
              <br></br>
              <Grid item xs={12} md={4} sm={6} style={{marginLeft:30, marginRight:30}}>
                <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={(navigator.onLine?this.state.filterVals:JSON.parse(localStorage.getItem('optionSelect')))}
                placeholder="Filter By Rocket"
                />
              </Grid>
            <Grid container direction="row" >
                {this.state.flights.length === 0 ? (
                      placeholder
                  ) : (
                      this.state.flights.map((data, i) => {
                          return <Card 
                          key={i} 
                          image={data.links.mission_patch_small}
                          imgDl={data.links.mission_patch}
                          flightNumber={data.flight_number}
                          missionName={data.mission_name}
                          launchDateTime={data.launch_date_utc}
                          launchUpcoming={data.upcoming}
                          launchSuccess={data.launch_success}
                          details={data.details}
                          ls={data.launch_site.site_name_long}
                          videoID={data.links.youtube_id}
                          rocketID={data.rocket.rocket_id}
                          ></Card>;
                      })
                  )
              }
            </Grid>
          </div>
        </div>
    );
  }
}

export default Home;




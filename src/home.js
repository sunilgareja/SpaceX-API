import React, {Component} from 'react';
import Card from './Cards/cards';
import './App.css';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';


var placeholder = [];

for (var i = 0; i < 12; i++) {
  placeholder.push(<Card key={i}/>);
}

class Home extends Component {
  state = {
    flights: []
  };

  componentDidMount() {
    this.getFlights();
  }

  getFlights = async () => {
    let res = await axios.get("https://api.spacexdata.com/v3/launches?sort=launch_date_utc");
    let data = res.data;
    this.setState({ flights: data });
  };

  render(){
    return (
        <div className="App">
          <div className={{      
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'center',
            flexWrap: 'wrap',}}>
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




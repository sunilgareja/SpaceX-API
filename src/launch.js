import React, {useState, useEffect} from 'react';
import Axios from "axios";

const Launch = ({ match }) => {

    const [data, setData] = useState(null); 
    const { params: { flight_number } } = match;

    useEffect(() => {
        let mounted = true;
    
        const loadData = async () => {
          const response = await Axios.get("https://api.spacexdata.com/v3/launches/"+flight_number);
          if (mounted) {
            setData(response.data);
          }
        };
        loadData();
    
        return () => {
          mounted = false;
        };
      }, [flight_number]);

    if (!data) {
        return null;
    }
  
    return (
      <>
        <p>
          <strong>Flight ID: </strong>{flight_number}
        </p>
        <p>
        <strong>Flight ID:</strong> {data.mission_name}
        </p>
      </>
    );
  };
  
export default Launch;


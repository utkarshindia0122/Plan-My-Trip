import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData,getWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
const App = () => {

    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    const [coords, setCoords] = useState({});// stores our location
    const [bounds, setBounds] = useState({});

    
    const [weatherData, setWeatherData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [places, setPlaces] = useState([]);


    const[autocomplete,setAutocomlete]=useState(null);
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    


    //console.log(bounds);
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoords({ lat: latitude, lng: longitude });

        });

    }, []);// our current location

    useEffect(() => {
        const filtered = places.filter((place) => Number(place.rating) > rating);
        setFilteredPlaces(filtered);

    }, [rating]);

    useEffect(() => {
        if (bounds.sw&&bounds.ne) {
            setIsLoading(true);

           getWeatherData(coords.lat,coords.lng)
           .then((data)=>setWeatherData(data));

            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    // console.log(data);
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                    setFilteredPlaces([]);
                    setRating('');
                    setIsLoading(false);
                });
        }
    }, [type,bounds]);

    const onLoad=(autoC)=>setAutocomlete(autoC);

    const onPlaceChanged=()=>{
       const lat=autocomplete.getPlace().geometry.location.lat();
       const lng=autocomplete.getPlace().geometry.location.lng();

       setCoords({lat,lng});

    };


    return (
        <>
            <CssBaseline />
            <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
            <Grid container spacing={3} styles={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />

                </Grid>
                <Grid item xs={12} md={8} styles={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Map
                        setCoords={setCoords}
                        setBounds={setBounds}
                        coords={coords}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
};
export default App;
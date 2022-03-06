import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
const App = () => {
    const [places, setPlaces] = useState([]);
    
    const [coordinates, setCoordinates] = useState({});// stores our location
    const [bounds, setBounds] = useState(null);
//console.log(bounds);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });

        })

    }, []);// our current location

// let swest=bounds.sw;
// let neast=bounds.ne;

    useEffect(() => {
        //bounds.sw,bounds.ne
        //console.log(bounds);
        Object.create(bounds)
        getPlacesData(bounds)
            .then((data) => {
                console.log(data);
                setPlaces(data);
            })
    }, [coordinates, bounds]);
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} styles={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List />

                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                    />
                </Grid>
            </Grid>
        </>
    );
}
export default App;
import axios from 'axios';

export const getPlacesData = async (type,sw,ne) => {
    
    try {
        //request
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,  {

            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
        
            },
            headers: {
                'x-rapidapi-key': 'c82b7a0c91msh723d1372cdd4faap1d3927jsnd4a7ee5dd3ef',
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
                
            }
        });

        return data;
    } catch (error) {
        // error
        console.log(error)
    }

}
import axios from 'axios';
const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'




export const getPlacesData = async (bounds) => {
    
    try {
        //request
        const { data: { data } } = await axios.get(URL,  {

            params: {
                bl_latitude: bounds.sw.lat,
                tr_latitude: bounds.ne.lat,
                bl_longitude: bounds.sw.lng,
                tr_longitude: bounds.ne.lng,
        
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
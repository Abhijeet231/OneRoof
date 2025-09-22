import Map, {Marker} from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';


const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const ListingMap = ({geometry}) => {
    return(
         <div className="w-full h-full">
         
         <Map
          initialViewState = {{
            longitude: geometry.coordinates[0],
            latitude: geometry.coordinates[1],
            zoom:10,
          }}
          style={{width: "100%", height:"100%"}}
          mapStyle= "mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken = {MAPBOX_TOKEN}
         >
            <Marker
              longitude = {geometry.coordinates[0]}
              latitude = {geometry.coordinates[1]}
              anchor="bottom"

            >
             

            </Marker>

         </Map>

        </div>
    )
};

export default ListingMap;
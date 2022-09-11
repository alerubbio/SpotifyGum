import WebPlayback from './WebPlayback.jsx'
import './App.css';
import TopTracks from './TopTracks.jsx';

export default function GumContainer(props){

    return(
        <>
            <WebPlayback token={props.token}/>
            <TopTracks />
        </>
    )

}
import { useNavigate } from 'react-router-dom';
import '../css/main.css';
import Video from '../images/videocam.png';


function Room() {
    
  return (
    <div className="Room mx-5 my-3">
      <div className="mx-auto d-flex justify-content-between align-items-center" style={{"border":"1px solid rgba(0, 0, 0, .13)", "maxWidth":"800px", "margin":"0 10px"}}>
        <div className="ms-3" > 
            <div style={{"fontWeight":"bold"}}>RoomName</div>
            <p className="">RoomURL: https://wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</p>
            <div className="d-flex">
                タブ
            </div>
        </div>
        <img className="me-3" src={Video} />
      </div>
    </div>
  );
}

export default Room;

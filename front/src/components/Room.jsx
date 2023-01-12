import { useNavigate } from 'react-router-dom';
import '../css/main.css';
import Video from '../images/videocam.png';


function Room(props) {
  console.log((props.tags))
  const a = props.tags.indexOf("[") == -1 ? [props.tags] : JSON.parse(props.tags)
  console.log(a)
    
  return (
    <div className="Room mx-5 my-3">
      <div className="mx-auto d-flex justify-content-between align-items-center" style={{"border":"1px solid rgba(0, 0, 0, .13)", "maxWidth":"800px", "margin":"0 10px"}}>
        <div className="ms-3">
          <div className="" style={{"fontWeight":"bold", "fontSize":"20px"}}>{props.title}</div>
          <div className="ms-4" style={{"color":"gray"}}>
            <div className="">作成者: {props.auther}</div>
            <div className="">開始時刻: {props.date}</div>
            <div className=""></div>
            <div style={{"wordWrap":"break-word", "width":"500px"}} className="">{props.description}</div>
            <div className="d-flex mt-3">
              {
                a?.map((data, index) => 
                <div style={{"borderRadius":"20px", "backgroundColor":"#008037", "padding":"0px 15px", "border":"none", "color":"white", "fontWeight":"bold", "margin":"3px"}} className="" key={index}>{data}</div>
                )
              }
            </div>
          </div>
        </div>
        <div className="">
          <a href={props.url}>
            <img src={Video} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Room;

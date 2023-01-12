import { useAsyncError, useNavigate } from 'react-router-dom';
import { Room } from '../components/index';
import { useState, useEffect } from 'react';
import '../css/main.css'
import Logo from '../images/logo.png'
import Account from '../images/account_circle.png'
import EditIcon from '../images/edit.png'
import Video from '../images/videocam.png'
import Search from '../images/search.png'
import Datetime from 'react-datetime'
import { ja } from 'moment/locale/ja'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import urlIcon from '../images/urlpng.png';
import autherIcon from '../images/autherpng.png';
import descriptionIcon from '../images/description.png';
import labelIcon from '../images/label.png';
import timerIcon from '../images/timer.png';


function Home() {
    const navigate = useNavigate();
    const [display, setDisplay] = useState("none");
    const Today = new Date();
    const [date, setDate] = useState(Today);
    const [tags, setTags] = useState([]);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getURL = process.env.REACT_APP_API + 'event/list';
        fetch(getURL, {method: 'GET'}).then(res => res.json()).then(data => {
            setPosts(data);
            console.log(data);
        })
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = process.env.REACT_APP_API + 'logout';
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        };
        fetch(url, requestOptions);
        navigate('/signin');
    }

    const createRoom = (event) => {
        event.preventDefault();
        setDisplay("none");
        const { auther, title, description, url, date1, date2 } = event.target.elements;
        const postURL = process.env.REACT_APP_API + 'event/register';

        const body = {
            "auther": auther.value,
            "title": title.value,
            "description": description.value,
            "url": url.value,
            "tags": JSON.stringify(tags),
            "date": date1.value + "/" + date2.value,
        }
        console.log(body)
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            credentials: 'include'
        };

        fetch(postURL, requestOptions).then((responce) => {
            console.log(responce.json());
        })
    }
    


  return (
    <div className="Home">
       <form  onSubmit={createRoom} className="Edit position-fixed" style={{"width":"100vw", "height":"100vh", "backgroundColor":"rgba(0, 0, 0, .5)", "display":display}}>
            <div className="w-100 h-100 d-flex align-items-center">
                <div className="bg-white mx-auto" style={{"width":"600px", "height":"500px"}}>
                    <div className="" style={{"margin":"40px"}}>
                        <div className="">
                            <input name="title" placeholder="タイトルを追加" style={{"outline":"none","border":"none", "borderBottom":"1px solid black", "width":"100%", "fontSize":"30px"}} />
                        </div>
                        <div className="d-flex align-items-center mt-5" style={{"color":"gray", "fontSize":"18px"}}>
                            <input name="date1" type="date"  style={{"outline":"none","color":"gray", "border":"none", "marginRight":"20px"}} />
                            <input name="date2" type="time"  style={{"outline":"none","color":"gray", "border":"none"}} />
                        </div>
                        <div className="d-flex align-items-center mt-4" style={{"color":"gray","fontSize":"18px"}}>
                            <img src={autherIcon} style={{"width":"28px"}} />
                            <input name="auther" type="text" placeholder="ニックネーム" style={{"outline":"none","border":"none", "marginLeft":"15px", "width":"100%"}} />
                        </div>
                        <div className="d-flex align-items-center mt-4" style={{"color":"gray","fontSize":"18px", "width":"100%"}}>
                            <img src={urlIcon} style={{"width":"28px"}} />
                            <input name="url" type="text" placeholder="URL" style={{"outline":"none","border":"none", "marginLeft":"15px", "width":"100%"}} />
                        </div>
                        <div className="d-flex align-items-center mt-4" style={{"color":"gray","fontSize":"18px", "width":"100%"}}>
                            <img src={labelIcon} style={{"width":"28px"}} />
                            <div className="" style={{"marginLeft":"15px", "width":"100%"}}>
                                <ReactTagInput
                                    placeholder="タグ"
                                    tags={tags} 
                                    onChange={(e) => setTags(e)}

                                />
                            </div>
                        </div>
                        <div className="d-flex align-items-center mt-4" style={{"color":"gray","fontSize":"18px"}}>
                            <img src={descriptionIcon} style={{"width":"28px"}} />
                            <textarea name="description" type="text" placeholder="説明文" style={{"border":"none", "marginLeft":"15px", "outline":"1px solid rgba(0, 0, 0, .15)", "width":"100%"}} />
                        </div>
                        <div className="w-100">
                            <button className="me-2" style={{"borderRadius":"3px", "backgroundColor":"#008037", "padding":"8px 30px", "margin":"30px 80%", "border":"none", "color":"white", "fontWeight":"bold"}}>完了</button>
                        </div>
                    </div>
                </div>
            </div>

        </form>
      <header className="d-flex justify-content-between align-items-center mt-3"> 
        <img style={{"width":"15%", "marginLeft":"50px", "minWidth":"150px"}} src={Logo} />
        <div className="d-flex align-items-center">
            <div className="me-2 d-flex" style={{"border":"1px solid rgba(0, 0, 0, .3)", "borderRadius":"5px"}}>
                <input style={{"border":"none", "borderRadius":"5px"}} type="text" />
                <img src={Search} />
            </div>
            <button onClick={(e) => {setDisplay("block")}} style={{"border":"none", "backgroundColor":"white"}}>
                <img className="me-2 " src={EditIcon} />
            </button>
            <div className="me-2 ">
                <img src={Account} />
            </div>
            <button onClick={handleSubmit} className="me-2" style={{"borderRadius":"50px", "backgroundColor":"#008037", "padding":"10px 30px", "margin":"0 auto", "border":"none", "color":"white", "fontWeight":"bold"}}>ログアウト</button>
        </div>
      </header>
      <div className="mt-5" style={{}}>
        {
            posts?.map((list, index) => 
                <Room description={list.description} auther={list.auther} date={list.date} tags={list.tags} title={list.title} url={list.url} key={index} />
            )
        }
      </div>
    </div>
  );
}

export default Home;

import { useNavigate } from 'react-router-dom';
import { Room } from '../components/index';
import { useState } from 'react';
import '../css/main.css'
import Logo from '../images/logo.png'
import Account from '../images/account_circle.png'
import EditIcon from '../images/edit.png'
import Video from '../images/videocam.png'
import Search from '../images/search.png'

function Home() {
    const navigate = useNavigate();
    const [display, setDisplay] = useState("none");

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
    


  return (
    <div className="Home">
       <div className="Edit position-fixed" style={{"width":"100vw", "height":"100vh", "backgroundColor":"rgba(0, 0, 0, .5)", "display":display}}>
            <div className="w-100 h-100 d-flex align-items-center">
                <div className="bg-white mx-auto" style={{"width":"600px", "height":"500px"}}>
                    <div className="">
                        <div className="">タイトル</div>
                        <input type="text" />
                    </div>
                    <div className="">
                        <div className="">タグ</div>
                        <input type="text" />
                    </div>
                    <div className="">
                        <div className="">URL</div>
                        <input type="text" />
                    </div>
                    <button onClick={(event) => setDisplay("none")}>完了</button>
                </div>
            </div>
        </div>
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
        <Room />
        <Room />
        <Room />
      </div>
    </div>
  );
}

export default Home;

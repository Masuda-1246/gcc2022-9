import { useNavigate } from 'react-router-dom';
import '../css/main.css'
import Logo from '../images/logo.png'

function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = process.env.REACT_APP_API + 'register';
        const { email, password } = event.target.elements;
        const data = {
                        "email":email.value,
                        "password":password.value
                    }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json', "Accept": "application/json"},
            credentials: 'include',
        };
        fetch(url, requestOptions);
        navigate('/signin');
    }

    return (
      <div className="">
        <div className="text-center">
            <img className="w-25 mt-5 mx-auto" style={{"maxWidth":"250px"}} src={Logo} alt="Logo" />
            <form onSubmit={handleSubmit} style={{textAlign:"left", margin:"10px auto", "maxWidth":"300px"}}>
                <div style={{"marginTop":"50px"}}>
                    <div>メールアドレス</div>
                    <input style={{"border":"none", "borderBottom":"1px solid black", "width":"100%", marginTop:"20px"}} name="email" type="email" />
                </div>
                <div style={{"marginTop":"50px"}}>
                    <label>パスワード</label>
                    <input style={{"border":"none", "borderBottom":"1px solid black", "width":"100%", marginTop:"20px"}} name="password" type="password" />
                </div>
                <div className="text-center mt-5">
                    <button style={{"borderRadius":"50px", "backgroundColor":"#008037", "padding":"15px 0", "margin":"0 auto", "border":"none", "width":"80%", "color":"white", "fontWeight":"bold"}}>登録</button>
                </div>
            </form>
        </div>
      </div>
    );
  }
  
  export default SignUp;
  
//POSTGRESQL
import { useState } from "react";
import jQuery from "jquery";
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7292",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
});

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword]  = useState('');
  const [message, setMessage] = useState('');
  const [disable, setDisable] = useState(false);

  const closeLogin = (event: any) => {
    event.preventDefault();
    jQuery("#reset").trigger("click");
    $("#closeLogin").trigger("click");
    location.href="/";
    location.reload();
  }

  function submitLogin(event: any) {    
    event.preventDefault();
    setDisable(true);
    setMessage('Please wait...');
    const jsondata = JSON.stringify({ username: username, password: password });
    api.post("/signin", jsondata)
    .then((res: any) => {
            setMessage(res.data.message);
            if (res.data.qrcodeurl !== null) {
                sessionStorage.setItem('USERID',res.data.id);
                sessionStorage.setItem('TOKEN',res.data.token);
                sessionStorage.setItem('ROLE',res.data.roles);
                sessionStorage.setItem('USERPIC',res.data.profilepic);
                $("#loginReset").trigger("click");
                $("#mfaModal").trigger("click");
                setDisable(false);
            } else {
                sessionStorage.setItem('USERID',res.data.id);
                sessionStorage.setItem('USERNAME',res.data.username);
                sessionStorage.setItem('TOKEN',res.data.token);                        
                sessionStorage.setItem('ROLE',res.data.roles);
                sessionStorage.setItem('USERPIC',res.data.profilepic);                    
                setDisable(false);
                closeLogin;
            }
      }, (error: any) => {
            setMessage(error.response.data.message);
            window.setTimeout(() => {
                setMessage('');
                setDisable(false);
            }, 3000);
            return;
    });        


  };

  const resetForm = (event: any) => {
    event.preventDefault();
    setUsername('');
    setPassword('');
    setMessage('');
    setDisable(false);
  };

  return (
    <div className="modal fade" id="staticLogin" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticLoginLabel" aria-hidden="true">
    <div className="modal-dialog modal-sm modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header bg-primary">
          <h1 className="modal-title text-white fs-5" id="staticLoginLabel">User's Login</h1>
          <button id="closeLogin" type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form onSubmit={submitLogin} method="post" autoComplete="off">
              <div className="mb-3">
                <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="form-control" id="usrname"  name="usrname" disabled={disable} placeholder="enter username"/>
              </div>
              <div className="mb-3">
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="passwd" name="passwd" disabled={disable}  placeholder="enter password"/>
              </div>
              <button type="submit" className="btn btn-primary mx-1" disabled={disable} >login</button>
              <button id="reset" type="reset" onClick={resetForm} className="btn btn-primary">reset</button>
          </form>
        </div>
        <div className="modal-footer">
              <div className="w-100 text-center text-danger">{message}</div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Login;
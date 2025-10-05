import { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7101",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
});


function RegistrationForm() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submitRegForm = async (event: any) => {
    event.preventDefault();
    setMessage("Please wait....");
    const jsondata =JSON.stringify({ lastname: lname, firstname: fname,email: email, mobile: mobile,username: username, password_hash: password });
    api.post("/signup", jsondata)
    .then((res: any) => {
          setMessage(res.data.message);
          window.setTimeout(() => {
            setMessage('');
          }, 3000);
          return;
      }, (error: any) => {
            setMessage(error.response.data.message);
            window.setTimeout(() => {
            setMessage('');
          }, 3000);
    });


  };

  const resetForm = async (event: any) => {
    setFname('');
    setLname('');
    setEmail('');
    setMobile('');
    setUsername('');
    setPassword('');
    setMessage('');
  }

  return (
<div className="modal fade" id="staticRegister" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticRegisterLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header bg-success">
        <h1 className="modal-title fs-5 text-white" id="staticRegisterLabel">Account Registration</h1>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={submitRegForm} autoComplete="off">
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <input type="text" required value={fname} onChange={e => setFname(e.target.value)} className="form-control" id="fname" name="fname" placeholder="enter First Name"/>
                    </div>          
                </div>
                <div className="col">
                    <div className="mb-3">
                        <input type="text" required value={lname} onChange={e => setLname(e.target.value)} className="form-control" id="lname" name="lname" placeholder="enter Last Name"/>
                      </div>          
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="email" name="email" placeholder="enter Email Address"/>
                    </div>          
                </div>
                <div className="col">
                    <div className="mb-3">
                        <input type="text" required value={mobile} onChange={e => setMobile(e.target.value)} className="form-control" id="mobile" name="mobile" placeholder="enter Mobile No."/>
                      </div>          
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="form-control" id="usrnme" name="usrnme" placeholder="enter username"/>
                    </div>          
                </div>
                <div className="col">
                    <div className="mb-3">
                        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="paswd" name="paswd" placeholder="enter password"/>
                      </div>          
                </div>
            </div>
            <button type="submit" className="btn btn-success text-white mx-1">register</button>
            <button id="reset" type="reset" onClick={resetForm} className="btn btn-success text-white">reset</button>
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

export default RegistrationForm;
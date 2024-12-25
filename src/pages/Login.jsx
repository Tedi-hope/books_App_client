import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const handleLogin = () => {
    axios
      .post('https://books-app-server-ten.vercel.app/user/login', { username, password })
      .then((response) => {
        const { username } = response.data;
        console.log('Username:', username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.username)
        enqueueSnackbar('Login Successful', { variant: 'success' });
        navigate('/home', { state: { username } });
      })
      .catch((error) => {
        enqueueSnackbar('Login Failed', { variant: 'error' });
        console.log(error)
      });
  }

  return (
    
    <div className="p-4">
      <h1 className="mx-4 my-4">Login</h1>
      <div className="p-4">

      <div className="my-4">
          <label className="mx-3 mr-4">UserName</label>
          <input type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="px-4 py-2" />
       </div>

       <div className="my-4">
          <label className="mx-3 mr-4">Password</label>
          <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2" />
        </div>
        <div>
        <button className="btn btn-primary px-3 my-3 py-2" style={{ width: 200 }}
          onClick={handleLogin}>
          Login
        </button>
        </div>
        <div>
          <p className="mx-4">Dont You Have An Account? <Link to='/signup'>Sign Up</Link></p>
        </div>

       </div>
    </div>
    
  )
}

export default Login
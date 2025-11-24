import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom"

const Login = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [_, setCookies] = useCookies(["access_token"]);
    

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("All field are required");
            return;
        }

        try {
            const responce = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await responce.json();
            if (data.token) {
                setCookies("access_token", data.token);
                window.localStorage.setItem("userId", data.id);
                navigate("/");
            } else {
                setError(data.message);
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='container text-light'>
            <form action="" onSubmit={handleSubmit} className='w-50 mx-auto fs-4 mt-5 border p-2 rounded'>
                <h3 className="text-center text-withe">{error}</h3>
                <h2 className='text-center'>Login</h2>
                <div className="mb-3">
                    <label htmlFor="username" className='form-label'>Username</label>
                    <input type="text" onChange={e => setUserName(e.target.value)} value={username} className='form-control' name='username' id='username' placeholder='username' />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} value={password} className='form-control' name='password' id='password' placeholder='*******' />
                </div>
                <input type="submit" value="Login" className='btn btn-primary d-block w-25 mx-auto' />
                <p className="text-center h5 mt-3">You don't have account <Link to={"/register"} className="link text-white">Register</Link></p>
            </form>
        </div>
    )
}

export default Login
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("All field are required");
            return;
        }
        try {
            const responce = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            const data = await responce.json();
            if (data.created) {
                navigate("/login");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='container text-light'>
            <form action="" onSubmit={handleSubmit} className='w-50 mx-auto fs-4 mt-5 border p-2 rounded'>
                <h2 className='text-center'>Register</h2>
                <div className="mb-3">
                    <label htmlFor="username" className='form-label'>Username</label>
                    <input type="text" onChange={e => setUserName(e.target.value)} className='form-control' name='username' id='username' placeholder='username' value={username} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} className='form-control' name='password' id='password' placeholder='*******' value={password} />
                </div>
                <input type="submit" value="Register" className='btn btn-primary d-block w-25 mx-auto' />
                <p className="text-center h5 mt-3">You have account <Link to={"/login"} className="link text-white">Login</Link></p>
            </form>
        </div>
    )
}

export default Register
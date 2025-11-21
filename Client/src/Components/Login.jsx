import { useState } from "react";


const Login = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className='container text-light'>
            <form action="" className='w-50 mx-auto fs-4 mt-5 border p-2 rounded'>
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
            </form>
        </div>
    )
}

export default Login
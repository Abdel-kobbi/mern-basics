


const Form = ({ handleSubmit, updateUser, clearForm, name, age, email, setName, setAge, setEmail }) => {


    return (
        <div className='w-50 m-auto border border-white rounded-2 text-white'>
            <form onSubmit={handleSubmit} id="form" >
                <div className='form-control-lg'>
                    <label htmlFor='name' className='form-label'>Name:</label>
                    <input type='text' id='name' name='name' className='form-control' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='form-control-lg'>
                    <label htmlFor='age' className='form-label'>Age:</label>
                    <input type='number' id='age' name='age' className='form-control' placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className='form-control-lg'>
                    <label htmlFor='email' className='form-label'>Email:</label>
                    <input type='email' id='email' name='email' className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="d-flex justify-content-center">
                    <input type="submit" value={updateUser._id ? "Update" : "Submit"} className='btn btn-primary w-25 m-auto d-inline-block my-4' />
                    {updateUser._id && <input type="reset" value={"Cancel"} className='btn btn-warning w-25 m-auto d-inline-block my-4' onClick={clearForm} />}
                </div>
            </form>
        </div>
    )
}

export default Form
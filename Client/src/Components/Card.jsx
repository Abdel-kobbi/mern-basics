


const Card = ({ name, age, email, _id: id, handleDelete, handleEdit }) => {
    return (
        <div className='w-50 m-auto p-2 my-2 rounded-2 shadow-lg user-card' style={{ backgroundColor: "#adfcfe" }}>
            <div className='d-flex justify-content-end align-items-center gap-3 game'>
                <button className='btn  btn-sm btn-info' onClick={() => handleEdit(id)}>Edit</button>
                <button className='btn btn-close btn-sm' title='Delete' onClick={() => handleDelete(id)}></button>
            </div>
            <table className='table'>
                <tr>
                    <th>Name</th>
                    <td className='text-capitalize'>{name}</td>
                </tr>
                <tr>
                    <th>Age</th>
                    <td>{age}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{email}</td>
                </tr>
            </table>
        </div>
    )
}

export default Card
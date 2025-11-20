import { useEffect, useState } from 'react'
import './App.css'
import Card from './Components/Card'
import Form from "./Components/Form"


function App() {
  const [users, setUsers] = useState([]);
  const [updateUser, setUpdateUser] = useState({});
  // form fields
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const fetchData = async () => {
    const data = await fetch("http://localhost:3000/users")
    const json = await data.json();
    setUsers(json);
  }

  useEffect(() => {
    fetchData();
  }, [])



  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateUser._id) {
      if (name === updateUser.name && age === updateUser.age && email === updateUser.email) {
        alert("You should modify some info");
        return;
      }
      updateUserFromServer();
    } else {
      addUser();
    }
  }

  const addUser = async (e) => {
    const data = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ name, age, email })
    })
    const responce = await data.json();

    if (responce.created) {
      alert("User added successufuly");
      setUsers(prev => [...prev, responce.data]);
      clearForm();
    } else {
      alert("Error try again");
    }
  }

  const updateUserFromServer = async () => {
    const data = await fetch("http://localhost:3000/users", {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ _id: updateUser._id, name, age, email })
    })
    const responce = await data.json();

    if (responce.updated) {
      alert("User updated successufuly");
      setUsers(prev => prev.map(user => user._id === updateUser._id ? { ...updateUser, name, age, email } : user));
      clearForm();
    } else {
      alert("Error try again");
    }
  }

  const handleDelete = async (id) => {
    if (confirm("Do you want delete this user " + users.find(user => user._id === id).name)) {
      const data = await fetch("http://localhost:3000/users", {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id })
      })
      const responce = await data.json();

      if (responce.deleted) {
        alert("User deleted successufuly");
        setUsers(prev => prev.filter(user => user._id != id));
      } else {
        alert("Error try again");
      }
    }

  }

  const handleEdit = (id) => {
    const user = users.find(user => user._id === id)
    setUpdateUser(user);
    setName(user.name);
    setAge(user.age);
    setEmail(user.email);
    scrollTo({ top: 0, "behavior": "smooth" })
  }

  const clearForm = () => {
    setUpdateUser({});
    setName('');
    setAge('');
    setEmail('');
  }

  return (
    <>
      <div className='container'>
        <Form
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
          age={age}
          setAge={setAge}
          email={email}
          setEmail={setEmail}
          updateUser={updateUser}
          clearForm={clearForm} />
        {
          users.map(user => (
            <Card {...user} key={user._id} handleDelete={handleDelete} handleEdit={handleEdit} />
          ))
        }
      </div>
    </>
  )
}

export default App

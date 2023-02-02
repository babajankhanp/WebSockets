
 
    import React, { useState, useEffect } from 'react';
    import socketIOClient from 'socket.io-client';
    import axios from 'axios';
    
    function Action() {
      const [users, setUsers] = useState([]);
      
      const socket = socketIOClient('http://localhost:3001');
    
      useEffect(() => {
        handleGetUsers()
        socket.on('users', setUsers);
        return () => {
          socket.off('users', setUsers);
          socket.disconnect();
        };
      }, []);
    
      // function handlePostUser(event) {
      //   event.preventDefault();
      //   const formData = new FormData(event.target);
      //   const data={
      //     name: formData.get('name'),
      //     email: formData.get('email')
      //   }
        
      //   console.log(data)
      //   setNewUser(data);
      //   socket.emit('postUser', data);
      //   handleGetUsers()
      // }
    
      // function handleGetUsers() {
      //   socket.emit('getUsers');
      // }

      const handlePostUser = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data={
          name: formData.get('name'),
          email: formData.get('email')
        }
        try {
          await axios.post("http://localhost:3001/api/create", data);
        } catch (error) {
          console.log(error);
        }
        setUsers([...users,data]);
        socket.emit('postUser', data);
        // handleGetUsers()
        event.reset();
      };








      // const  handleGetUsers = async () => {
      //   const res = await axios.get("http://localhost:3001/api/getusers").then(response=>setUsers(response.data));
      // console.log(res)
      // };


    const handleGetUsers = async ()=>{
      try {
       const res= await axios.get("http://localhost:3001/api/getusers").then(response=>setUsers(response.data.data));
       console.log(res.data)
      } catch (error) {
        console.log(error);
      }
      // socket.emit('getUsers')
    }


    // const handlePutUser= async (email)=> {
    //   console.log(email)


    //   try {
    //     await axios.put(`http://localhost:3001/api/user/${email}`)
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   socket.emit('updateUser', email);

    // }


    
      const handleDeleteUser= async (email)=> {
        socket.emit('deleteUser', email);
        try {
         const res= await axios.delete(`http://localhost:3001/api/user/${email}`)
         console.log(res)
        } catch (error) {
          console.log(error);
        }
      }



      
    socket.on('users',(users)=>{
      console.log(users)
      setUsers(users)
    })
      return (
        <div>
          <h2>Route 1</h2>
          <form onSubmit={handlePostUser}>
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="email" placeholder="Email" />
            <button type="submit">Add Patient</button>
          </form>
          <ul>
            {users.map(user => {
                return (
                    <li key={user._id}>
                      {user.name} - {user.email}
                      {/* <button onClick={() => handlePutUser(user.email)}>Edit</button> */}
                      <button onClick={() => handleDeleteUser(user.email)}>CheckOut</button>
                    </li>
                  )
            })}
          </ul>
    
        </div>
      );
    }
    
    export default Action;


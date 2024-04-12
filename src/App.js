import {  useEffect, useState } from "react";
import axios from 'axios'

const App = () =>{
   const [value, setValue] = useState(null);
  const [message, setMessage ] = useState(null);
   const [previousChats, setPreviousChats] = useState([]);
   const [currentTitle, setCurrentTitle] = useState([]);

   const createNewChat = ()=>{
    setMessage(null);
    setValue("");
    setCurrentTitle(null);

   }
   const handleClick = (uniqueTitle)=>{
      setCurrentTitle(uniqueTitle);
      setMessage(null);
      setValue("");
   }
  const options = {
    method:"POST",
    body:JSON.stringify({
      message:value,

    }),
    headers:{
      'Content-Type': 'application/json',
    }
  }
  //  const getMessage = async() =>{
  //   try{
  //      const response = await fetch('http://localhost:3001/completions', options);
  //      const data = await response.json();
  //      setMessage(data.choices[0].message)
  //      console.log(data);
  //   }catch(err){
  //     console.log(err);
  //   }
  //  }
  const getMessage = async () => {
    // Define the data to be sent in the POST request
    const requestData = {
        message: value
    };
    console.log("RequestDatta", requestData);
    try {
        // Make the POST request using Axios
        const response = await axios.post(`https://botbackend-delta.vercel.app/completions`, requestData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Get the data from the response
        const data = response.data;

        // Update the state with the message received from the server
        if (data.choices && data.choices[0]) {
            setMessage(data.choices[0].message);
        } else {
            console.error('Unexpected response format:', data);
        }
    } catch (error) {
        // Log the error and provide more information
        console.error('Error making request:', error.response?.data || error.message);
    }
};

useEffect(() => {
  // Check if there's a new message and if a value has been provided
  if (value && message) {
      let chatTitle;

      // Set the current title if not already set
      if (!currentTitle) {
          setCurrentTitle(value);
          chatTitle = value;
      } else {
          chatTitle = currentTitle;
      }

      // Add both the user's input and assistant's response to previous chats
      setPreviousChats((previousChats) => [
          ...previousChats,
          {
              title: chatTitle,
              role: 'user',
              content: value,
          },
          {
              title: chatTitle,
              role: message.role,
              content: message.content,
          },
      ]);

      // Clear `value` and `message` as the chat has been processed
      setValue(null);
      setMessage(null);
  }
}, [message, value, currentTitle]);



const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle);
const uniqueTitles = Array.from(new Set(previousChats.map(previousChats => previousChats.title)));
console.log(uniqueTitles);
  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}> + New chat</button>
        <ul className='history'>
         {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={()=>handleClick(uniqueTitle)}>
          {uniqueTitle}
         </li>)}
        </ul>
        
      </section>
      <section className='main'> 
     <h1>Chatgpt</h1>
      <ul className='feed'>
        {currentChat.map((chatMessage, index) =><li key = {index}>
          <p className="role">
          {chatMessage.role}

          </p>
          <p>
          {chatMessage.content}
          </p>
           </li>)}
      </ul>
      <div className='button-section'>
        <div className="input-container">
           <input value={value} onChange={(e)=>{setValue(e.target.value)}}/>
           <div id="submit" onClick={getMessage}>➢</div>
        </div>
        <p className="info">Chatgpt can make mistakes.</p>
      </div>
      </section>
    </div>
  );
}

export default App;

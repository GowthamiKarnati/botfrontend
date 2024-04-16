import {  useEffect, useState } from "react";
import axios from 'axios'

const App = () =>{
   const [value, setValue] = useState(null);
   const [message, setMessage ] = useState(null);
   const [previousChats, setPreviousChats] = useState([]);
   const [currentTitle, setCurrentTitle] = useState("");
   const [loading, setLoading] = useState(false);
  //  const createNewChat = ()=>{
  //   setMessage(null);
  //   setValue("");
  //   setCurrentTitle(null);

  //  }
  const createNewChat = () => {
    setMessage(null);
    setValue("");
    // Generate a unique title using the current timestamp for the new chat
    
    setCurrentTitle(null);
};
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
        message: value,
      //   previousMessages: previousChats.filter(chat => chat.title === currentTitle).map(chat => ({
      //     role: chat.role,
      //     content: chat.content
      // }))
      previousMessages: previousChats.map(chat => ({
        role: chat.role,
        content: chat.content,
    })),
      
    };
    console.log("RequestDatta", requestData);
    try {
      setLoading(true);
        // Make the POST request using Axios
        const response = await axios.post(`http://localhost:3001/completions`, requestData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Get the data from the response
        const data = response.data;

        // Update the state with the message received from the server
        if (data.choices && data.choices[0]) {
            setMessage(data.choices[0].message);
            //setCurrentTitle(value);
            if (!currentTitle) {
              setCurrentTitle(value);
          }
        } else {
            console.error('Unexpected response format:', data);
        }
    } catch (error) {
        // Log the error and provide more information
        console.error('Error making request:', error.response?.data || error.message);
    }finally {
      // Stop loading state
      setLoading(false);
  }
};

useEffect(() => {
  console.log("Before setting chatTitle");
  console.log("currentTitle:", currentTitle);
  if (value && message) {
      // let chatTitle;

      // // Set the current title if not already set
      // if (!currentTitle) {
      //     setCurrentTitle(value);
      //     chatTitle = value;
      // } else {
      //     chatTitle = currentTitle;
      // }
      let chatTitle;

        // If `currentTitle` is not set, set it to `value` for the first chat
        if (!currentTitle) {
            setCurrentTitle(value);
            chatTitle = value;
        } else {
            chatTitle = currentTitle;
        }
       console.log("chatTitle", chatTitle);
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
      console.log("Clearing the input field after processing chat");
      setValue('');
      setMessage(null);
  }
}, [message, value, currentTitle]);
// useEffect(()=>{
//     if(!currentTitle && value && message){
//       setCurrentTitle(value);
//     }
//     if(currentTitle && value && message){
//       setPreviousChats((previousChats) => [
//                   ...previousChats,
//                   {
//                       title: currentTitle,
//                       role: 'user',
//                       content: value,
//                   },
//                   {
//                       title: currentTitle,
//                       role: message.role,
//                       content: message.content,
//                   },
//               ]);
//     }
//     setValue('');
// },[message, currentTitle])

const truncateTitle = (title) => {
  if (title.length > 30) {
      return title.slice(0, 30) + "...";
  }
  return title;
};
const currentChat = previousChats.filter((chat) => chat.title === currentTitle);
//const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle);
const uniqueTitles = Array.from(new Set(previousChats.map(previousChats => previousChats.title)));
//console.log(uniqueTitles);
  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}> + New chat</button>
        <ul className='history'>
         {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={()=>handleClick(uniqueTitle)}>
         {truncateTitle(uniqueTitle)}
         </li>)}
        </ul>
        
      </section>
      <section className='main'> 
     <h1>ChatBot</h1>
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
           <input 
           placeholder="Message ChatBot..." 
           value={value} 
           onChange={(e)=>{setValue(e.target.value)}}
           onKeyDown={(e) => {
            if (e.key === "Enter") {
                // Trigger the send button when Enter is pressed
                getMessage();
            }
        }}
           />
           {/* <div id="submit" onClick={getMessage}>➢</div> */}
           <div id="submit" onClick={getMessage}>
                            {loading ? (
                                <div className="loader">
                                    {/* You can customize the loader */}
                                    <span>...</span>
                                </div>
                            ) : (
                                "➢"
                            )}
                        </div>
        </div>
        <p className="info">ChatBot can make mistakes.</p>
      </div>
      </section>
    </div>
  );
}

export default App;

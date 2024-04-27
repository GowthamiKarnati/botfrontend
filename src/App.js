// import {  useEffect, useState } from "react";
// import axios from 'axios'

// const App = () =>{
//    const [value, setValue] = useState(null);
//    const [message, setMessage ] = useState(null);
//    const [previousChats, setPreviousChats] = useState([]);
//    const [currentTitle, setCurrentTitle] = useState("");
//    const [loading, setLoading] = useState(false);
//    const [expandedMessages, setExpandedMessages] = useState({});
//    const [users, setUsers] = useState([]);
//    const [orders, setOrders] = useState([]);

//   //  const createNewChat = ()=>{
//   //   setMessage(null);
//   //   setValue("");
//   //   setCurrentTitle(null);

//   //  }
//   const handleExpandMessage = (index) => {
//     setExpandedMessages((prev) => ({
//         ...prev,
//         [index]: !prev[index],
//     }));
// };

//   const createNewChat = () => {
//     setMessage(null);
//     setValue("");
//     // Generate a unique title using the current timestamp for the new chat
    
//     setCurrentTitle(null);
// };
//    const handleClick = (uniqueTitle)=>{
//       setCurrentTitle(uniqueTitle);
//       setMessage(null);
//       setValue("");
//    }
//   const options = {
//     method:"POST",
//     body:JSON.stringify({
//       message:value,

//     }),
//     headers:{
//       'Content-Type': 'application/json',
//     }
//   }
// const getMessage = async () => {
//   // Define the data to be sent in the POST request
//   const requestData = {
//       message: value,
//       previousMessages: previousChats.map(chat => ({
//           role: chat.role,
//           content: chat.content,
//       })),
//   };

//   try {
//       setLoading(true);
//       // Make the POST request using Axios
//       const response = await axios.post(`https://botbackend-delta.vercel.app/completions`, requestData, {
//           headers: {
//               'Content-Type': 'application/json',
//           },
//       });

//       // Get the data from the response
//       const data = response.data;

//       console.log("data", data);

//       let formattedResults = '';

//       // Check if the response is an array
//       if (Array.isArray(data)) {
        
//           // Iterate through each item in the data
//           // data.forEach(item => {
//           //     if ('id' in item && 'name' in item && 'email' in item && 'age' in item) {
//           //         // Format user data
//           //         formattedResults += `ID: ${item.id}, Name: ${item.name}, Email: ${item.email}, Age: ${item.age}\n`;
//           //     } else if ('order_id' in item && 'user_id' in item && 'order_date' in item && 'order_amount' in item && 'order_status' in item) {
//           //         // Format order data
//           //         formattedResults += `Order ID: ${item.order_id}, User ID: ${item.user_id}, Order Date: ${new Date(item.order_date).toLocaleDateString()}, Order Amount: $${item.order_amount}, Order Status: ${item.order_status}\n`;
//           //     }
//           // });
//           // data.forEach(item => {
//           //   for (const key in item) {
//           //     formattedResults += `${key}: ${item[key]}\n`;
//           //   }
//           // });
//           data.forEach(item => {
//             // Check if item represents user data
//             if ('id' in item && 'name' in item && 'email' in item && 'age' in item) {
//               formattedResults += `ID: ${item.id}, Name: ${item.name}, Email: ${item.email}, Age: ${item.age}\n`;
              

          
            
//             } else if ('order_id' in item && 'user_id' in item && 'order_date' in item && 'order_amount' in item && 'order_status' in item) {
//               // Format order data
//               formattedResults += `Order ID: ${item.order_id}, User ID: ${item.user_id}, Order Date: ${new Date(item.order_date).toLocaleDateString()}, Order Amount: $${item.order_amount}, Order Status: ${item.order_status}\n`;
             
//             } else {
//               // If item does not match user or order data format, iterate through its properties
//               for (const key in item) {
//                 formattedResults += `${item[key]}\n`;
//               }
//             }});
//           // Update the message state with the formatted results
//           setMessage({
//               role: 'assistant',
//               content: formattedResults,
//           });

//           // Set the title if not already set
//           if (!currentTitle) {
//               setCurrentTitle(value);
//           }
//       } else if (data.role && data.content) {
//           // If the response is in the expected format, handle it
//           setMessage({ role: data.role, content: data.content });

//           // Set the title if not already set
//           if (!currentTitle) {
//               setCurrentTitle(value);
//           }
//       } else {
//           console.error('Unexpected response format:', data);
//       }
//       // Check if the data contains user details
//         const userWithID1 = data.find(user => user.id === 1);
//         if(userWithID1){
//           formattedResults = `User name: ${userWithID1.name}`
//         }
//         else {
//           formattedResults = 'No user found with ID equal to 1';
//       }
//   } catch (error) {
//       // Log the error and provide more information
//       console.error('Error making request:', error.response?.data || error.message);
//   } finally {
//       // Stop loading state
//       setLoading(false);
//   }
// };


// useEffect(() => {
//   // console.log("Before setting chatTitle");
//   // console.log("currentTitle:", currentTitle);
//   if (value && message) {
//       // let chatTitle;

//       // // Set the current title if not already set
//       // if (!currentTitle) {
//       //     setCurrentTitle(value);
//       //     chatTitle = value;
//       // } else {
//       //     chatTitle = currentTitle;
//       // }
//       let chatTitle;

//         // If `currentTitle` is not set, set it to `value` for the first chat
//         if (!currentTitle) {
//             setCurrentTitle(value);
//             chatTitle = value;
//         } else {
//             chatTitle = currentTitle;
//         }
//        console.log("chatTitle", chatTitle);
//       // Add both the user's input and assistant's response to previous chats
//       setPreviousChats((previousChats) => [
//           ...previousChats,
//           {
//               title: chatTitle,
//               role: 'user',
//               content: value,
//           },
//           {
//               title: chatTitle,
//               role: message.role,
//               content: message.content,
//           },
//       ]);
//       console.log("Clearing the input field after processing chat");
//       setValue('');
//       setMessage(null);
//   }
// }, [message, value, currentTitle]);
// // useEffect(()=>{
// //     if(!currentTitle && value && message){
// //       setCurrentTitle(value);
// //     }
// //     if(currentTitle && value && message){
// //       setPreviousChats((previousChats) => [
// //                   ...previousChats,
// //                   {
// //                       title: currentTitle,
// //                       role: 'user',
// //                       content: value,
// //                   },
// //                   {
// //                       title: currentTitle,
// //                       role: message.role,
// //                       content: message.content,
// //                   },
// //               ]);
// //     }
// //     setValue('');
// // },[message, currentTitle])

// const truncateTitle = (title) => {
//   if (title.length > 30) {
//       return title.slice(0, 30) + "...";
//   }
//   return title;
// };
// const currentChat = previousChats.filter((chat) => chat.title === currentTitle);
// //const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle);
// const uniqueTitles = Array.from(new Set(previousChats.map(previousChats => previousChats.title)));
// //console.log(uniqueTitles);
//   return (
//     <div className="app">
//       <section className="side-bar">
//         <button onClick={createNewChat}> + New chat</button>
//         <ul className='history'>
//          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={()=>handleClick(uniqueTitle)}>
//          {truncateTitle(uniqueTitle)}
//          </li>)}
//         </ul>
        
//       </section>
//       <section className='main'> 
//      <h1>ChatBot</h1>
//      <ul className="feed">
//     {currentChat.map((chatMessage, index) => {
//         const isExpanded = expandedMessages[index];
//         const content = chatMessage.content;

//         let displayedContent = content;
//         let showMoreLink = false;

//         // Truncate the message if it's longer than 1000 characters and not expanded
//         if (!isExpanded && content.length > 1000) {
//             displayedContent = content.slice(0, 1000) + "...";
//             showMoreLink = true;
//         }

//         return (
//             <li key={index}>
//                 <p className="role">{chatMessage.role}</p>
//                 <p>
//                     {displayedContent}
//                     {showMoreLink && (
//                         <>
//                             <span style={{color:'gray', fontSize:13,cursor: "pointer"}} onClick={() => handleExpandMessage(index)}>more </span>
//                             {/* <button
//                                 onClick={() => handleExpandMessage(index)}
//                                 style={{ color: "blue", cursor: "pointer" }}
//                             >
//                                 more
//                             </button> */}
//                         </>
//                     )}
//                 </p>
//             </li>
//         );
//     })}
// </ul>

//       <div className='button-section'>
//         <div className="input-container">
//            <input 
//            placeholder="Message ChatBot..." 
//            value={value} 
//            onChange={(e)=>{setValue(e.target.value)}}
//            onKeyDown={(e) => {
//             if (e.key === "Enter") {
//                 // Trigger the send button when Enter is pressed
//                 getMessage();
//             }
//         }}
//            />
//            {/* <div id="submit" onClick={getMessage}>➢</div> */}
//            <div id="submit" onClick={getMessage}>
//                             {loading ? (
//                                 <div className="loader">
//                                     {/* You can customize the loader */}
//                                     <span>...</span>
//                                 </div>
//                             ) : (
//                                 "➢"
//                             )}
//                         </div>
//         </div>
//         <p className="info">ChatBot can make mistakes.</p>
//       </div>
//       </section>
//     </div>
//   );
// }

// export default App;
import axios from 'axios';
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
const App = () =>{
    const [value, setValue] = useState(null);
    const [message, setMessage] = useState(null);
    const [previousChats, setPreviousChats] = useState([]);
    const [currentTitle, setCurrentTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [expandedMessages, setExpandedMessages] = useState({});
    const containerRef = useRef();

    const handleExpandMessage = (index) => {
        setExpandedMessages((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const createNewChat = () => {
        setMessage(null);
        setValue("");
        setCurrentTitle(null);
    };

    const handleClick = (uniqueTitle) => {
        setCurrentTitle(uniqueTitle);
        setMessage(null);
        setValue("");
    };

    const getMessage = async () => {
        const requestData = {
            message: value,
            previousMessages: previousChats.map(chat => ({
                role: chat.role,
                content: chat.content,
            })),
        };

        try {
            setLoading(true);
            const response = await axios.post(`https://botbackend-delta.vercel.app/completions`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;
            console.log(data);
            let formattedResults = '';

            // if (Array.isArray(data)) {
                
            //     data.forEach(item => {
            //         if ('id' in item && 'name' in item && 'email' in item && 'age' in item) {
            //             formattedResults += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.email}</td><td>${item.age}</td></tr>`;
            //         } else if ('order_id' in item && 'user_id' in item && 'order_date' in item && 'order_amount' in item && 'order_status' in item) {
            //             formattedResults += `<tr><td>Order ID</td><td>${item.order_id}</td><td>User ID</td><td>${item.user_id}</td><td>Order Date</td><td>${new Date(item.order_date).toLocaleDateString()}</td><td>Order Amount</td><td>${item.order_amount}</td><td>Order Status</td><td>${item.order_status}</td></tr>`;
            //         } else {
            //             for (const key in item) {
            //                 formattedResults += `<td>${item[key]}</td></tr>`;
            //             }
            //         }
            //     });


            //     setMessage({
            //         role: 'assistant',
            //         content: formattedResults ? `<table>${formattedResults}</table>` : 'No data available',
            //     });

            //     if (!currentTitle) {
            //         setCurrentTitle(value);
            //     }
            // } 
            if (Array.isArray(data)) {
                let formattedResults = '';
                let tableHeadings = '';
            
                if (data.length > 0) {
                    const keys = Object.keys(data[0]); // Get the keys of the first item to determine table headings
            
                    tableHeadings = '<thead><tr>';
                    keys.forEach(key => {
                        tableHeadings += `<th style="padding: 5px; border: 1px dashed black;">${key}</th>`;
            
                    });
                    tableHeadings += '</tr></thead>';
                }
            
                formattedResults += '<table>';
                formattedResults += tableHeadings;
                formattedResults += '<tbody>';
            
                data.forEach(item => {
                    formattedResults += '<tr>';
                    Object.values(item).forEach(value => {
                        formattedResults += `<td style="padding: 5px; border: 1px dashed #ccc;">${value}</td>`; 
                    });
                    formattedResults += '</tr>';
                });
            
                formattedResults += '</tbody></table>';
            
                setMessage({
                    role: 'assistant',
                    content: formattedResults || 'No data available',
                });
            
                if (!currentTitle) {
                    setCurrentTitle(value);
                }
            }
            else if (data.role && data.content) {
                setMessage({ role: data.role, content: data.content });

                if (!currentTitle) {
                    setCurrentTitle(value);
                }
            } else {
                console.error('Unexpected response format:', data);
            }
        } catch (error) {
            console.error('Error making request:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (value && message) {
            let chatTitle;
            if (!currentTitle) {
                setCurrentTitle(value);
                chatTitle = value;
            } else {
                chatTitle = currentTitle;
            }

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
            setValue('');
            setMessage(null);
        }
    }, [message, value, currentTitle]);

    const truncateTitle = (title) => {
        if (title.length > 30) {
            return title.slice(0, 30) + "...";
        }
        return title;
    };

    const currentChat = previousChats.filter((chat) => chat.title === currentTitle);
    const uniqueTitles = Array.from(new Set(previousChats.map(previousChats => previousChats.title)));
    useLayoutEffect(() => {
        if (containerRef.current) {
            const firstChild = containerRef.current.firstChild;
            if (firstChild) {
                firstChild.classList.add('table-container'); // Add your desired class name here
            }
        }
    }, [message]);
    return (
        <div className="app">
            <section className="side-bar">
                <button onClick={createNewChat}> + New chat</button>
                <ul className='history'>
                    {uniqueTitles?.map((uniqueTitle, index) => (
                        <li key={index} onClick={() => handleClick(uniqueTitle)}>
                            {truncateTitle(uniqueTitle)}
                        </li>
                    ))}
                </ul>
            </section>
            <section className='main'>
                <h1>ChatBot</h1>
                <ul className="feed">
                    {currentChat.map((chatMessage, index) => {
                        const isExpanded = expandedMessages[index];
                        const content = chatMessage.content;

                        let displayedContent = content;
                        let showMoreLink = false;

                        if (!isExpanded && content.length > 1000) {
                            displayedContent = content.slice(0, 1000) + "...";
                            showMoreLink = true;
                        }

                        const isTableMarkup = content.startsWith('<table>');

                        return (
                            <li key={index}>
                                <p className="role">{chatMessage.role}</p>
                                {isTableMarkup ? (
                                   <div ref={containerRef} dangerouslySetInnerHTML={{ __html: chatMessage.content }} />
                                ) : (
                                    <p>
                                        {displayedContent}
                                        {showMoreLink && (
                                            <span style={{ color: 'gray', fontSize: 13, cursor: "pointer" }} onClick={() => handleExpandMessage(index)}>more </span>
                                        )}
                                    </p>
                                )}
                            </li>
                        );
                    })}
                </ul>
                <div className='button-section'>
                    <div className="input-container">
                        <input
                            placeholder="Message ChatBot..."
                            value={value}
                            onChange={(e) => { setValue(e.target.value) }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    getMessage();
                                }
                            }}
                        />
                        <div id="submit" onClick={getMessage}>
                            {loading ? (
                                <div className="loader">
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

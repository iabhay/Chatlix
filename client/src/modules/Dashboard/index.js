import React, { useEffect, useRef, useState } from 'react'
import Avatar from '../../assets/User.png'
import Input from '../../components/Input'
import { io } from 'socket.io-client';

const Dashboard = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:details')));
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const messageRef = useRef(null);

    useEffect(()=>{
        setSocket(io('http://localhost:8080'))
    }, [])

    useEffect(()=>{
        socket?.emit('addUser', user?.id)
        socket?.on('getUsers', users =>{
            console.log(users)
        })

        socket?.on('getMessage',  data => {
            setMessages(prev => ({
                ...prev,
                messages: [...prev.messages, { user : data.user, message: data.message }],
            }));
        })
    }, [socket])


    useEffect(()=>{
        messageRef?.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages?.messages])

useEffect(()=>{
    const loggedInUser = JSON.parse(localStorage.getItem('user:details')
)

    const fetchConversations = async()=>{
        const res = await fetch(`http://localhost:8000/api/conversations/${loggedInUser?.id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const resData = await res.json();
        setConversations(resData);
    }
    fetchConversations();
}, [])

useEffect(()=>{
    const fetchUsers = async()=>{
        const res = await fetch(`http://localhost:8000/api/users/${user?.id}`,{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json',
            }
        });
        const resData = await res.json();
        setUsers(resData);
    }
    fetchUsers();
},[]);


const fetchMessages = async(conversationId, receiver)=>{
    const res = await fetch(`http://localhost:8000/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json',
    }
    });
const resData = await res.json();
setMessages({messages: resData, receiver, conversationId});
}

const sendMessage = async(e)=>{
    setMessage('')
    socket?.emit('sendMessage',{
        senderId: user?.id,
        receiverId: messages?.receiver?.receiverId,
        message,
        conversationId: messages?.conversationId,
    })
     const res = await fetch(`http://localhost:8000/api/message`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            conversationId: messages?.conversationId,
            senderId: user?.id,
            message,
            receiverId: messages?.receiver?.receiverId
        })
     });
     setMessage('');
}

  return (
    // <div className="bg-light h-screen flex justify-center items-center">
    <div className='w-screen flex'>
      <div className='w-[25%] h-screen bg-secondary overflow-scroll'>
        <div className='flex items-center ml-8 my-8 mx-10'>
            <div className='border border-primary p-[2px] rounded-full'>
                <img src={Avatar} width={60} height={60}/>
            </div>
            <div className='ml-8'>
                <h3 className='text-2xl'>{user?.name}</h3>
                <p className='text-lg font-light'>My Account</p>
            </div>
        </div>
            <hr/>
            <div className='mx-8 mt-6'>
                <div className='text-primary text-xl ml-4 mt-4'>Messages</div>
                <div >
                    {
                        conversations.length > 0 ?
                        conversations.map(({conversationId,user}) => {
                            return(
                                <div className='flex items-center py-8 border-b border-b-gray-300'>
                                    <div className='cursor-pointer flex items-center' onClick={()=> fetchMessages(conversationId, user)}>
                                        <div className=''><img src={Avatar} width={50} height={50}/></div>
                                        <div className='ml-6'>
                                            <h3 className='text-lg font-semibold'>{user?.name}</h3>
                                            <p className='text-sm font-light text-gray-600'>{user?.mobile}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        ) : <div className='text-center text-lg font-semibold my-auto mt-24'>No Conversations... </div>
                    }
                </div>
            </div>
      </div>
      <div className='w-[50%] h-screen bg-white flex flex-col items-center'>
        {
            messages?.receiver?.name &&
        <div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14 '>
        <div className='cursor-pointer'><img src={Avatar} width={50} height={50}/></div>
        <div className='ml-6 mr-auto'>
            <h3 className='text-lg font-semibold'>{messages?.receiver?.name}</h3>
            <p className='text-sm font-light text-gray-600'>{messages?.receiver?.mobile}</p>
        </div>
        <div className='flex w-[30%] ml-auto justify-'>

            <p className='text-sm font-bold text-green-600 w-1/3'>Online</p>
        <div className='cursor-pointer w-1/3'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-zoom" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M17.011 9.385v5.128l3.989 3.487v-12z"></path>
            <path d="M3.887 6h10.08c1.468 0 3.033 1.203 3.033 2.803v8.196a.991 .991 0 0 1 -.975 1h-10.373c-1.667 0 -2.652 -1.5 -2.652 -3l.01 -8a.882 .882 0 0 1 .208 -.71a.841 .841 0 0 1 .67 -.287z"></path>
            </svg>
        </div>
        <div className='cursor-pointer w-1/3'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
            <path d="M15 6h6m-3 -3v6"></path>
            </svg>
        </div>
        </div>
        </div>
        }
        <div className='h-[75%] w-full overflow-scroll border-b-2 shadow-sm'> 
                    <div className='p-14'>
                        {
                            messages?.messages?.length > 0 ?
                            messages.messages.map(({message, user: {id} = {}})=>{
                                return (
                                    <>
                                    <div className={`max-w-[40%] rounded-b-3xl p-4 mb-8  ${id === user?.id ? " text-white ml-auto bg-primary rounded-tl-3xl" : "bg-secondary rounded-tr-3xl" } `}>{message}</div>
                                    <div ref={messageRef}></div>
                                    </>
                                )
                            }) : <div className='text-center text-lg font-semibold mt-24'>No Messages or No Conversation Selected</div>
                        }
                        
                    </div>
        </div>
        {
            messages?.receiver?.name &&
      <div className='p-14 w-full flex items-center'>
        
                    <Input className='w-[75%]' placeholder='Type a Message' value={message} onChange={(e)=>setMessage(e.target.value)} inputClassName='p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none' />
                    <div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`} onClick={()=>sendMessage()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M10 14l11 -11"></path>
                        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
                        </svg>
                    </div>
                    <div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-rounded-plus" width="30" height="30" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 12h6"></path>
                        <path d="M12 9v6"></path>
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                        </svg>
                    </div>
      </div>
        }
      </div>
      <div className='w-[25%] h-screen bg-light px-8 py-16 overflow-scroll'>
            <div className='text-primary text-xl'>Contacts</div>
            <div >
                    {
                        users.length > 0 ?
                        users.map(({userId, user}) => {
                            return(
                                <div className='flex items-center py-8 border-b border-b-gray-300'>
                                    <div className='cursor-pointer flex items-center' onClick={()=> fetchMessages('new', user)}>
                                        <div className=''><img src={Avatar} width={50} height={50}/></div>
                                        <div className='ml-6'>
                                            <h3 className='text-lg font-semibold'>{user?.name}</h3>
                                            <p className='text-sm font-light text-gray-600'>{user?.mobile}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        ) : <div className='text-center text-lg font-semibold my-auto mt-24'>No Conversations... </div>
                    }
                </div>
      </div>
    </div>
    // </div>
  )
}

export default Dashboard;

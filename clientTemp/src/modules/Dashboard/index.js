import React from 'react'
import Avatar from '../../assets/User.png'

const Dashboard = () => {
    const contacts =[
    {
        name: 'User 1',
        status: 'Active',
        img: Avatar,   
    },
    {
        name: 'User 2',
        status: 'Active',
        img: Avatar,   
    },
    {
        name: 'User 3',
        status: 'Active',
        img: Avatar,   
    },
    {
        name: 'User 4',
        status: 'Active',
        img: Avatar,   
    },
    {
        name: 'User 5',
        status: 'Active',
        img: Avatar,   
    },
    {
        name: 'User 6',
        status: 'Active',
        img: Avatar,   
    }
]
  return (
    <div className='w-screen flex'>
      <div className='w-[25%] h-screen bg-secondary'>
        <div className='flex items-center ml-8 my-8 mx-10'>
            <div className='border border-primary p-[2px] rounded-full'>
                <img src={Avatar} width={60} height={60}/>
            </div>
            <div className='ml-8'>
                <h3 className='text-2xl'>Chatlix</h3>
                <p className='text-lg font-light'>My Account</p>
            </div>
        </div>
            <hr/>
            <div className='mx-8 mt-6'>
                <div className='text-primary text-xl ml-4 mt-4'>Messages</div>
                <div >
                    {
                        contacts.map(({ name, status, img }) => {
                            return(
                                <div className='flex items-center py-8 border-b border-b-gray-300'>
                                    <div className='cursor-pointer flex items-center'>
                                        <div className=''><img src={img} width={50} height={50}/></div>
                                        <div className='ml-6'>
                                            <h3 className='text-lg font-semibold'>{name}</h3>
                                            <p className='text-sm font-light text-gray-600'>{status}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        )
                    }
                </div>
            </div>
      </div>
      <div className='w-[50%] h-screen bg-white flex flex-col items-center'>
        <div className='w-[75%] bg-secondary h-[80px] mt-14 rounded-full flex items-center px-14'>
        <div className=''><img src={Avatar} width={50} height={50}/></div>
        <div className='ml-6 '>
            <h3 className='text-lg font-semibold'>User 3</h3>
            <p className='text-sm font-light text-gray-600'>Online</p>
        </div>
        </div>
      </div>
      <div className='w-[25%] h-screen'></div>
    </div>
  )
}

export default Dashboard;

import React from 'react'
import Avatar from '../../assets/User.png'
import Input from '../../components/Input'

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
    <div className="bg-light h-screen flex justify-center items-center">

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
        <div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14'>
        <div className='cursor-pointer'><img src={Avatar} width={50} height={50}/></div>
        <div className='ml-6 mr-auto'>
            <h3 className='text-lg font-semibold'>User 3</h3>
            <p className='text-sm font-light text-gray-600'>Online</p>
        </div>
        <div className='cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-zoom" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M17.011 9.385v5.128l3.989 3.487v-12z"></path>
            <path d="M3.887 6h10.08c1.468 0 3.033 1.203 3.033 2.803v8.196a.991 .991 0 0 1 -.975 1h-10.373c-1.667 0 -2.652 -1.5 -2.652 -3l.01 -8a.882 .882 0 0 1 .208 -.71a.841 .841 0 0 1 .67 -.287z"></path>
            </svg>
        </div>
        <div className='cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
            <path d="M15 6h6m-3 -3v6"></path>
            </svg>
        </div>
        </div>
        <div className='h-[75%] w-full overflow-y-scroll border-b-2 shadow-sm'> 
                    <div className='p-14'>
                        <div className=' max-w-[40%] bg-secondary rounded-b-3xl rounded-tr-3xl p-4 mb-8'>Lorem ipsum dolor</div>
                        <div className='max-w-[40%] bg-primary rounded-b-3xl rounded-tl-3xl ml-auto p-4 mb-8 text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum porro nesciunt, voluptates dignissimos eius explicabo! Exercitationem, eveniet sapiente unde maiores aliquam dolore et, vero fugit facere praesentium cum architecto numquam.</div>
                        <div className=' max-w-[40%] bg-secondary rounded-b-3xl rounded-tr-3xl p-4 mb-8'>Lorem ipsum dolor</div>
                        <div className='max-w-[40%] bg-primary rounded-b-3xl rounded-tl-3xl ml-auto p-4 mb-8 text-white'>Lorem ipsum dolor</div>
                        <div className=' max-w-[40%] bg-secondary rounded-b-3xl rounded-tr-3xl p-4 mb-8'>Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium optio dolorum vitae, itaque sint dolore velit saepe magnam, rem unde eaque maiores perspiciatis, ducimus modi consequatur soluta deleniti accusamus iste!</div>
                        <div className='max-w-[40%] bg-primary rounded-b-3xl rounded-tl-3xl ml-auto p-4 mb-8 text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum porro nesciunt, voluptates dignissimos eius explicabo! Exercitationem, eveniet sapiente unde maiores aliquam dolore et, vero fugit facere praesentium cum architecto numquam.</div>
                    </div>
        </div>
      <div className='p-14 w-full flex items-center'>
        
                    <Input className='w-[75%]' placeholder='Type a Message' inputClassName='p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none' />
                    <div className='ml-4 p-2 cursor-pointer bg-light rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M10 14l11 -11"></path>
                        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
                        </svg>
                    </div>
                    <div className='ml-4 p-2 cursor-pointer bg-light rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 12h6"></path>
                        <path d="M12 9v6"></path>
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                        </svg>
                    </div>
      </div>
      </div>
      <div className='w-[25%] h-screen bg-light'></div>
    </div>
    </div>
  )
}

export default Dashboard;

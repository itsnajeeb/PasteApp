import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch=useDispatch();
  const allPastes=useSelector((state)=>state.paste.pastes)

  useEffect(()=>{
    if(pasteId){
      const paste=allPastes.find((p)=>p._id===pasteId)
      setTitle(paste.title)
      setValue(paste.content)
    }
  },[pasteId]);

  function createPaste(){
    const paste={
      title:title,
      content:value,
      _id:pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

  
    if(pasteId){
      //update
      dispatch(updateToPastes(paste));
    }else{
      //create
      console.log("Adding");
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});

  }

  return (
    <div>
      <div className='flex w-2/4 justify-center  m-auto mt-10'>
        <input
          className='p-3 w-full bg-slate-700 rounded-lg ps-5 outline-none '
          type="text"
          placeholder='Enter Your Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createPaste} className='w-56 bg-blue-800 rounded-lg -ml-7'>
          {pasteId ? "Update My Paste " : "Create My Paste"}
        </button>
      </div>
      <div className='w-2/4 mt-5 flex justify-center m-auto '>
        <textarea name="" id="" rows={16} className='w-full rounded-md bg-slate-700  p-3' placeholder='Enter your content here' onChange={(e)=>
          setValue(e.target.value)}
          value={value} 
          >
          </textarea>
      </div>
    </div>
  )
}

export default Home

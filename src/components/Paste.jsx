import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FormatDate } from "../utlis/formatDate";




const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes)
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));
  function handleDelete(pasteId) {
    dispatch(removeFromPastes((pasteId)))
    //alert(pasteId)
  }
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className='w-2/3 flex flex-col justify-center items-center m-auto '>
      <input className='w-full bg-slate-700 p-3 mt-5 rounded-md' type="search"
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex w-full  flex-col justify-center items-center gap-4 mt-5 mb-10 border rounded'>
        <h1 className='text-left w-full text-4xl font-bold border-b py-4 pl-4'> All Pastes</h1>
        <div className='flex w-full  flex-col justify-center items-center gap-4 p-5 border-t-0'>

          {filteredPastes.length > 0 ? (

            filteredData.map((paste) => (

              <div className='border rounded-md w-full p-4 flex justify-between' key={paste?._id}>

                <div className="flex flex-col">
                  <div className="text-xl font-bold">
                    {paste.title}
                  </div>
                  <div className="text-sm text-justify pr-8">
                    {paste.content}
                  </div>
                </div>

                <div className='flex flex-col'>
                  <div className='flex flex-row place-content-evenly gap-4 mt-4 '>

                    <button className='border rounded-md p-2 text-sm'>
                      <Link to={`/?pasteId=${paste?._id}`} className="text-sm">
                        <PencilLine
                          className="group-hover:text-blue-500"
                          size={20}
                        />
                      </Link></button>

                    <button className='border rounded-md p-2 '>
                      <Link to={`/pastes/${paste?._id}`}>
                        <Eye
                          className="group-hover:text-pink-500"
                          size={20}
                        />
                      </Link>
                    </button>

                    <button className='border  rounded-md p-2 ' onClick={() => handleDelete(paste?._id)}>
                      <Trash2
                        className="group-hover:text-orange-500"
                        size={20}
                      />
                    </button>

                    <button className='border rounded-md p-2 ' onClick={() => {
                      navigator.clipboard.writeText((paste?.content),
                        toast.success("Copy to Clipboard"))
                    }}>
                      <Copy
                        className=" group-hover:text-green-500"
                        size={20}
                      />
                    </button>

                  </div>
                  <div className="flex justify-center mt-4">
                    <Calendar className="" size={20} />

                    {FormatDate(paste?.createdAt)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-2xl text-center w-full text-chileanFire-500">
              No Data Found
            </div>
          )
          }

        </div>
      </div>
    </div>
  );
};


export default Paste

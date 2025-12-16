import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { setClickedInCard } from "../store/slice";
import { search2 } from "../store/slice.js";
import { useNavigate } from 'react-router-dom';


function SearchPage() {
    const search3 = useSelector((state) => state.cart.search);
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState([]);
    const navigate = useNavigate();

     useEffect(() => {
    fetch("https://test-billing-zpdr.onrender.com/api/billing")
      .then(res => res.json())
      .then(data => setRowData(data));
  }, []);


   const deleteClient = async (id) => {
    try {
      const response = await fetch(`https://test-billing-zpdr.onrender.com/api/billing/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.message || "Failed to find infos");
        return;
      }
      navigate('/')
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } 
  };
  
 
const searchTerm = String(search3)?.trim().toLowerCase() || "";

const filteredClient = rowData?.filter((pro) =>
  pro.customer.toLowerCase().includes(searchTerm)
);


  return (
    <div className=' min-h-96 bg-green-50'>
      <div className='p-6 md:p-10 mt-48'>
        {searchTerm.length === 0 ?
        <p className="text-black  text-3xl">
          All clients :{" "}
        </p>: 
         <p className="text-black  text-3xl">
          Searched clients :{" "}
        </p>}
        {filteredClient.length > 0 || search3== true? (
                      <div 
  onMouseDown={() => dispatch(setClickedInCard(true))}
  onMouseUp={() => setTimeout(() => dispatch(setClickedInCard(false)), 200)}
  id="search-results"
                      className="grid mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  h-auto">
                        {(search3.length > 0 ? filteredClient : rowData)?.map((Client, index) => (
                         
         <div key={index} className="bg-white m-auto hover:cursor-grab rounded-xl  h-auto  shadow-sm">
              
              <img
                className=" bg-amber-50 h-50 lg:h-62.5 w-full object-cover rounded-t-xl"
                src={Client.image}
                alt={`Client `}
              />

              <p className="text-xl md:text-2xl m-2 ">
                {Client.customer} <span className="text-zinc-500 text-sm">from {Client.date}</span>
              </p>
              <p className=" mx-2 line-clamp-4  text-black text-md">
               {Client.description}             
               </p>
              <p className=" mx-2 mt-2 text-black text-xl">
                Service : {Client.service}
              </p>
              <div className="flex flex-row  items-center justify-between px-2 mt-1">
                <p className="text-black text-xl ">Location : {Client.location}</p>
              </div>
              <div className="flex flex-row  items-center justify-between px-2 mt-1">
                <p className="text-black text-xl ">Amount : {Client.amount} €</p>
              </div>
              <div className="flex flex-row  items-center justify-between px-2 mt-2">
                <div
                onClick={()=> navigate(`/update/${Client._id}`)}
                className="hover:cursor-pointer rounded-full mb-2 py-2 px-4 bg-green-50 text-zinc-700 text-xl">
                  Update infos
                </div>

                <div
                onClick={()=> {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client ?"
    );
    if (confirmed) {
      deleteClient(Client._id);
    }
  }}
                className="hover:cursor-pointer rounded-full mb-2 py-2 px-4 bg-green-50 text-red-900 text-xl">
                  Delete client
                </div>
              </div>
            </div>
      ))}
                     
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 mt-40 min-h-screen">
                        No clients available at the moment.
                      </p>
                    )}

                    </div>

                    
    </div>
  )
}

export default SearchPage
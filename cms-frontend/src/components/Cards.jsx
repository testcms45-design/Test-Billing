import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Card() {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();
  const [expandedIds, setExpandedIds] = useState({});

const toggleDescription = (id) => {
  setExpandedIds(prev => ({
    ...prev,
    [id]: !prev[id]
  }));
};


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
       fetch("https://test-billing-zpdr.onrender.com/api/billing")
      .then(res => res.json())
      .then(data => setRowData(data));
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } 
  };



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  h-auto" >
      {rowData.map((product,index)=>(
         <div key={index} className={`bg-white mx-auto rounded-xl max-sm:w-[90%] w-80 xl:w-96 ${product.description.length > 220 && !expandedIds[product._id] ? 'pb-10' : ''} ${expandedIds[product._id] ? 'h-auto ' : !expandedIds[product._id] && product.description.length > 220 ? 'h-128.5 md:h-141' :'h-125.5 md:h-138'} shadow-sm`}>
              
              <img
                className=" bg-amber-50 h-50 lg:h-62.5 w-full object-cover rounded-t-xl"
                src={product.image}
                alt={`Product `}
              />

              <p className="text-xl md:text-2xl m-2 ">
                {product.customer} <span className="text-zinc-500 text-sm">from {product.date}</span>
              </p>
              <p className={`mx-2 min-h-24 text-black text-md ${expandedIds[product._id] ? "" : "line-clamp-4" }`}>
               {product.description}            
               </p>
               <p className={`text-sm hover:cursor-pointer text-zinc-500 text-center ${product.description.length < 220 ? 'hidden' : null}`}
               onClick={() => toggleDescription(product._id)}
               >{expandedIds[product._id] ? 'View less' : 'View more'}</p>

              <p className={`mx-2  text-black text-xl ${product.description.length < 220 ? 'mt-2' : null}`}>
                Service : {product.service}
              </p>
              <div className="flex flex-row  items-center justify-between px-2 mt-1">
                <p className="text-black text-xl ">Location : {product.location}</p>
              </div>
              <div className="flex flex-row  items-center justify-between px-2 mt-1">
                <p className="text-black text-xl ">Amount : {product.amount} €</p>
              </div>
              <div className="flex flex-row  items-center justify-between px-2 mt-2">
                <div
                onClick={()=> navigate(`/update/${product._id}`)}
                className={`hover:cursor-pointer rounded-full  ${!expandedIds[product._id] ? 'mb-0' : null} py-2 px-4 bg-green-50 text-zinc-700 text-xl`}>
                  Update infos
                </div>

                <div
                onClick={()=> {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client ?"
    );
    if (confirmed) {
      deleteClient(product._id);
    }
  }}
                className={`hover:cursor-pointer rounded-full ${!expandedIds[product._id] ? 'mb-0' : null} py-2 px-4 bg-green-50 text-red-900 text-xl   `}>
                  Delete client
                </div>
              </div>
            </div>
      ))}
    </div>
  );
}

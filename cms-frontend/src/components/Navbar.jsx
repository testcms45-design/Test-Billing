
import React, { useState, useEffect } from "react";
import { ChevronRight, Menu, Search, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { search2 } from "../store/slice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
const [menu, setMenu] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState(true);
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();

const dispatch = useDispatch();
const clickedInCard = useSelector((state) => state.cart.clickedInCard);

// Ferme le menu si la fenêtre est élargie
useEffect(() => {
const onResize = () => window.innerWidth >= 705 && setMenu(false);
window.addEventListener("resize", onResize);
return () => window.removeEventListener("resize", onResize);
}, []);



const links = [
{ name: "Add client", action: "/page" },
{ name: "Billing table", action: "/billing" },
];

 useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // change after 50px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

return (<>

 <nav className={`fixed top-0 left-0 w-full  shadow-md z-50 
${ isScrolled ? "bg-white/60  " : "bg-green-50 " }`}> 
<div className="h-12 bg-black w-full flex items-center justify-center">
  <h1 className="text-xl sm:text-3xl text-white">
    Billing CMS by HANI DAOUD
  </h1>
</div>

<div className="flex items-center justify-between sm:mx-10 md:mx-14 px-6 md:px-12 py-4 sm:py-6">
{/* Logo */}
<div className={`flex flex-col items-center `}>
          <div
          onClick={()=>navigate('/')}
          className={`text-3xl sm:text-5xl  tracking-tight hover:cursor-pointer font-anton`}>
            <span className={`text-black `}>ALWESLATI</span>
          </div>
        </div>


        {/* Liens desktop */}
        <div className={`max-[640px]:hidden lg:text-xl flex  flex-row justify-between items-center`}>
          <p className={`text-black mx-2 lg:mx-4 hover:cursor-pointer `}
          onClick={()=>navigate("/page")}
          >Add client</p>
          <p
          onClick={()=>navigate("/billing")}
          className={`text-black mx-2 lg:mx-4 hover:cursor-pointer `}
          >Billing table</p>
          
           {search ?
           <Search className="font-bold ml-5 lg:ml-20 text-black hover:cursor-pointer" onClick={()=>{setSearch(!search)}} />
           :
           <X className="font-bold text-black ml-5 lg:ml-20 hover:cursor-pointer" onClick={()=>{setSearch(!search)}} />
           }
           
        </div>
    {/* Bouton mobile */}
    <div className="flex felx-row items-center min-[640px]:hidden">
    {search ?
           <Search className="font-bold ml-10 text-black hover:cursor-pointer" onClick={()=>{setSearch(!search)}} />
           :
           <X className="font-bold text-black ml-10 hover:cursor-pointer" onClick={()=>{setSearch(!search)}} />
           }

           <button className="ml-3">
    </button>
    <button
      onClick={() => setMenu(!menu)}
      className="min-[705px]:hidden p-2 ml-2 text-black rounded-md transition-colors duration-200 "
      aria-label={menu ? "Close the menu" : "Open the menu"}
    >
      {menu ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
    </button>
    
  </div>
  </div>

  

  {/* Menu mobile */}
  <div>
    
  </div>
  <div
    className={`min-[705px]:hidden bg-green-50 shadow-lg overflow-hidden transition-all duration-300 ${
      menu ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
    }`}
  >
    <ul className="border-t border-gray-100 justify-around">
      {links.map((item) => (
        <li
          key={item.name}
          className="h-12 px-6 flex items-center border-b border-gray-50 hover:bg-gray-50"
        >
          <button
            onClick={() => navigate(item.action)}
            className="flex justify-between w-full text-black"
          >
            <p
              className={`text-lg  `}
            >
              {item.name}
            </p>
            <ChevronRight className="w-6 h-6 text-black" />
          </button>
        </li>
      ))}
    </ul>
    
  </div>
  
<div className={`${search ? 'hidden': null} flex items-center justify-center w-full mb-5`}>
  <input 
  onChange={(e) => {
      const value = e.target.value;
      setSearchWord(value);
      dispatch(search2(value));
    }}
    onFocus={() => {
      if (searchWord.trim() === "") {
        dispatch(search2(true));
      }
    }}
    onBlur={() => {
      if (!clickedInCard && searchWord.trim() === "") {
        dispatch(search2(""));
        setSearch(true)
      }
    }}
    type="text" 
    placeholder="Rechercher..." 
    className="w-[80%] border bg-green-50 text-black border-gray-300 p-4 rounded-full" 
  />
</div>

</nav>
</>

);
}

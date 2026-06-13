import axios from "axios";

import { useEffect,useState } from "react";

function Ngos() {

    const [ngos,setNgos]=useState([]);

    useEffect (()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/auth/ngos`)
        .then((res)=>{
          console.log("Ngo Data:",res.data)
          setNgos(res.data);

        })
        .catch((err)=>console.log(err));
    },[]);

  

  return (

    <div className="bg-yellow-100 min-h-screen py-10 px-5">

      
      <div className="max-w-6xl mx-auto">

        
        <h1 className="
          text-4xl
          font-bold
          text-center
          mb-10
          text-gray-800
        ">
          NGO Partners
        </h1>

        {/* NGO GRID */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
        ">

          {ngos.map((ngo) => (

            <div
              key={ngo.id}
              className="
                bg-white
                p-6
                rounded-2xl
                shadow-md
                hover:shadow-2xl
                hover:scale-105
                transition
                duration-300
              "
            >

              <h2 className="
                text-2xl
                font-bold
                text-gray-800
              ">
                {ngo.name}
              </h2>

              <p className="
                text-gray-500
                mt-3
                text-lg
              ">
                 {ngo.email}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Ngos;
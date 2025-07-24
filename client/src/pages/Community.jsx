import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL ;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get(
        "/api/user/get-published-creations",
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
     

      if (data.success) {
        setCreations(data.creations);
     
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return !loading ?  (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      Creations
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
          >
            <img
              src={creation.content}
              alt=""
              className="w-full h-full
              object-cover rounded-lg"
            />

            <div className="absolute bottom-0 top-0 right-0 left-0 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg transition-all duration-300">
              <p className="text-sm hidden group-hover:block">
                {creation.prompt}
              </p>
              <div className="flex items-center gap-1">
                <p>{creation.likes.length}</p>
                <Heart
                  onClick={() => imageLikeToggle(creation.id)}
                  className={`min-w-5 h-5 hover:scale-110 cursor-pointer  ${
                    creation.likes.includes(user.id)
                      ? "fill-red-500 text-red-600"
                      : "text-white"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ):(
    <div className="flex-1 h-full flex items-center justify-center">
      <p className="text-gray-500">Loading creations...</p>
    </div>
  )
};

export default Community;

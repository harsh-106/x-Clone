import React from "react";
import Avatar from "react-avatar";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import toast from "react-hot-toast"
import { USER_API_END_POINT } from "../utils/constant";
import {followingUpdate} from "../redux/userSlice"
import {getRefresh} from "../redux/tweetSlice"
const Profile = () => {

  const {user, profile} = useSelector(store=>store.user);
  const {id} = useParams()
  const dispatch = useDispatch();
  useGetProfile(id);

const followAndUnfollowHandler = async () => {
    if(user.following.includes(id)){
      //unfollow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
        console.log(res);
        dispatch(followingUpdate(id))
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error); 
      }
    }else{
      //follow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id});
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error); 
      }
    }
}
  return (
    <div className="w-[50%] border-l border-r border-gray-200 " >
      <div>
        <div className="flex items-center py-2">
          <Link to="/" className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoMdArrowBack size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">10 Post</p>
          </div>
        </div>
        <img src="/network-3849206_1920.jpg" alt="" />
        <div className="absolute top-52 ml-2 border-4 border-white rounded-full">
        <Avatar
                src="/blank-profile-picture-973460_1920.png"
                size="110"
                round={true}
              />
        </div>
        <div className="text-right m-2">
          {
            profile?._id === user?._id ? (
              <button className="px-4 py-1 rounded-full border border-gray-400 hover:bg-gray-200">Edit rofile</button>
            ) : (
              <button onClick={followAndUnfollowHandler} className="px-4 py-1 bg-black text-white rounded-full">{user.following.includes(id) ? "Following" : "Follow"}</button>
            )
          }
         
        </div> 
        <div className="m-4">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        <div className="text-sm m-4">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae sed quisquam amet minus in. Pariatur dolorem perspiciatis delectus animi rerum?</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

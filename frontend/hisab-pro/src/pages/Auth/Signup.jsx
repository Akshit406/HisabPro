import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout'
import {Link, useNavigate} from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const Signup = () => {

  const [fullname, setFullname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

   const { updateUser } = useContext(UserContext);

  //handle signup form
  const handleSignup = async (e)=>{
    e.preventDefault();


    if (!fullname){
      setError("Please enter your full name.")
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address.")
      return;
    }

    if(!password || password.length < 8){
      setError("Please enter a valid password")
      return;
    }

    setError("");

    //Signup api call
    try {

      let profileImageUrl = "";

      //upload profile pic if present
      if( profilePic ) {
        const imageuploadRes = await uploadImage(profilePic);
        console.log(imageuploadRes);
        profileImageUrl = imageuploadRes || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullname,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate('/dashboard');
      }
    }catch(error){
      if ( error.response && error.response.data.message ){
        setError( error.response.data.message );
      } else {
        setError( "Something went wrong. Please try again later.")
      }
    }
  } 

  



  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center '>
        <h3 className='text-xl font-semibold text-black '>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below!
        </p>

        <form onSubmit={handleSignup}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Input 
          value = {fullname}
          onChange={({target})=> setFullname(target.value)}
          label="Full Name"
          placeholder="John Doe" 
          type="text" 
        />
        <Input 
          value = {email}
          onChange={({target})=> setEmail(target.value)}
          label="Email Address"
          placeholder="john@gmail.com" 
          type="text" 
        />
        <div className="col-span-2">
          <Input 
            value = {password}
            onChange={({target})=> setPassword(target.value)}
            label="Password"
            placeholder="Min 8 charactors" 
            type="password" 
          />
        </div>
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5 '>{error}</p>}
          
                  <button type='submit' className='btn-primary'>
                    SIGNUP
                  </button>
          
                  <p className='text-[13px] text-slate-800 mt-3'>
                    Already have an account?{" "}
                    <Link className="font-medium text-primary underline" to="/login">
                      Login
                    </Link>
                  </p>


        </form>
      </div>
    </AuthLayout>
  )

}
export default Signup

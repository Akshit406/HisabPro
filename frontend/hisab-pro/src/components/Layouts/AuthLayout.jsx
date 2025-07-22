import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden">
      
      <div className="w-full md:w-[60vw] px-8 md:px-16 py-10 flex flex-col justify-between bg-white z-10">
        <div>
          <h2 className="text-2xl font-bold text-purple-700 mb-6">HisabPro</h2>
          <p className="text-sm text-gray-500 mb-12">Manage your store, stock, and sales in one dashboard</p>
          {children}
        </div>
        <p className="text-xs text-gray-400 text-center mt-auto">© {new Date().getFullYear()} HisabPro. All rights reserved.</p>
      </div>

      <div className="relative hidden md:block w-[40vw] h-full bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden">

  <div className="w-32 h-32 bg-fuchsia-500 rounded-[20px] absolute top-12 left-16 shadow-xl shadow-fuchsia-300 rotate-12" />
  <div className="w-24 h-24 border-[6px] border-purple-500 rounded-[30px] absolute top-[40%] left-[30%] rotate-[25deg]" />
  <div className="w-40 h-40 bg-violet-400 rounded-[50%] opacity-20 absolute bottom-28 left-10 blur-md" />
  <div className="w-28 h-28 bg-gradient-to-tr from-purple-400 to-fuchsia-500 rounded-3xl absolute bottom-12 right-10 shadow-lg shadow-violet-300" />
  <div className="w-20 h-20 border-[5px] border-fuchsia-400 rounded-full absolute top-6 right-6" />

  <img
    className="w-56 lg:w-[90%] rounded-[20px] absolute top-[30%] left-1/2 -translate-x-1/2 shadow-xl shadow-blue-400/20"
    src="/hisabpro.png"
    alt="HisabPro Promo"
  />
</div>
    </div>
  );
};

export default AuthLayout;

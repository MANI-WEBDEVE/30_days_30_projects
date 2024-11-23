import React from "react";

const Hero = () => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 mx-6 justify-center mt-12 h-screen w-full md:h-auto md:mx-3 md:mt-8 sm:mx-2.5 sm:mt-4">
      <div className="h-full w-full md:order-2 sm:w-full">
        <img 
          src="https://images.unsplash.com/photo-1731607352247-663df98aa547?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D" 
          alt="Hero Image"
          className="h-4/5 w-[96%] rounded-[20px] object-cover object-center sm:h-[300px]"
        />
      </div>
      
      <div className="w-[150%] p-20 flex flex-col items-start gap-4 lg:w-full lg:p-8 md:order-1 md:w-full md:p-8 md:items-center md:text-center sm:p-4">
        <h1 className="text-[8rem] font-black lg:text-[3rem] md:text-[4rem] sm:text-[3rem]">
          Elevate Your 
          <span className="text-[5rem] font-thin lg:text-[3rem] md:text-[2.5rem] sm:text-[2rem]">
            Vision
          </span>
        </h1>
        <p className="text-xl lg:text-base md:text-lg sm:text-base">
          Transforming ideas into stunning visuals. Our design expertise
          brings your brand to life, captivating audiences and driving
          success.
        </p>
      </div>
      
      <div className="rotate-[56deg] flex justify-center items-center text-xl font-black uppercase tracking-[10px] lg:hidden">
        Designer and Developer
      </div>
    </div>
  );
};

export default Hero;

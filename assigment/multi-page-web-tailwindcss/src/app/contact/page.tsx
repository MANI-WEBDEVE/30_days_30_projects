import React from "react";
const page = () => {
  return (
    <>
      <section className="container flex flex-col items-center justify-center gap-10">
        <div className="text-2xl font-bold text-center">
          <h1>Contact</h1>
        </div>
        <div className="flex items-center gap-10 flex-col justify-center w-full">
          <input className="py-3 pl-11 pr-10 bg-blue-400/10 rounded-lg"  type="text"  placeholder="Enter Your Name"/>
          <input  className="py-3 pl-11 pr-10 bg-blue-400/10 rounded-lg" type="email"  placeholder="Enter Your Email"/>
          <input  className="py-3 pl-11 pr-10 bg-blue-400/10 rounded-lg" type="text" placeholder="Enter Your Message" />
          <div className="w-full flex items-center justify-center">
            <button className="py-3 px-10 bg-blue-700/70 rounded-lg">Submit</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;

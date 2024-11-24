"use client";
import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <>
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8 md:items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1 space-y-4">
            <h1 className="text-3xl font-bold uppercase mb-4">About</h1>
            <p className="text-xl font-thin tracking-tighter">
              Web design is the art and science of creating visually appealing and
              functional websites. It encompasses various elements including
              layout, color theory, typography, and user experience (UX) design.
              Modern web design focuses on creating responsive, accessible, and
              user-friendly interfaces that work seamlessly across all devices.
            </p>
            <p className="text-xl font-thin tracking-tighter">
              Key principles of effective web design include: Visual hierarchy
              Color harmony Responsive layouts Intuitive navigation Fast loading
              times Accessibility
            </p>
          </div>

          {/* Image Content */}
          <div className="order-1 md:order-2 mb-8 md:mb-0">
            <div className="flex justify-center h-auto">
              <Image
                height={100}
                width={100}
                src="https://images.unsplash.com/photo-1651833826115-7530e72ce504?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="design-image"
                className="rounded-[20px] object-cover object-center h-[400px] w-[400px] md:h-[400px] md:[340px]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;

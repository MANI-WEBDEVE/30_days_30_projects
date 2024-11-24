import React from "react";
import styles from "./Blog.module.css";
import Image from "next/image";

const page = () => {
  const blogData = [
    {
      id: 1,
      title: "Blog 1",
      description: "This is the description of blog 1.",
      image:
        "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 2,
      title: "Blog 2",
      description: "This is the description of blog 2.",
      image:
        "https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      title: "Blog 3",
      description: "This is the description of blog 3.",
      image:
        "https://images.unsplash.com/photo-1604076984203-587c92ab2e58?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];

  return (
    <>
      <section className="container mx-auto  px-4 py-7 flex items-center flex-col justify-center gap-2">
        <div className="text-3xl font-bold">
          <h1>Blog List</h1>
        </div>
        <div>
          <ul>
            {blogData.map((blog) => (
              <li key={blog.id} className="border-b border-black w-[90vw] flex items-center justify-between">
                <div className="flex gap-10 my-3 items-center justify-start md:items-start md:gap-2  md:my-0 md:flex-col ">
                  <h2 className="text-xl md:text-2xl font-bold">{blog.title}</h2>
                  <p className="text-sm md:text-lg font-semibold">{blog.description}</p>
                </div>
                <div className="md:w-[12vw] md:h-[22vw] md:py-6 md:flex hidden">
                  <Image
                    height={160}
                    width={200} 
                    src={blog.image}
                    alt={blog.title}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;

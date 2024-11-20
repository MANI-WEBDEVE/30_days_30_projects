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
      <section className={styles.blogsection}>
        <div className={styles.blogHeading}>
          <h1>Blog List</h1>
        </div>
        <div>
          <ul>
            {blogData.map((blog) => (
              <li key={blog.id} className={styles.blogList}>
                <div className={styles.blogContent}>
                  <h2>{blog.title}</h2>
                  <p>{blog.description}</p>
                </div>
                <div className={styles.blogImage}>
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

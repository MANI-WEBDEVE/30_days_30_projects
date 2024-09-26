import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex  items-center justify-center gap-4 py-8 md:py-10 w-full ">
      <div className="w-1/2">
        <span className={title()}>Find Your&nbsp;</span>
        <span className={title({ color: "blue" })}>Favorite&nbsp;</span>
        <br />
        <span className={title({ color: "green" })}>Movies</span>
        <br />
        <span className={title({color: "cyan"})}>
        Instantly and
        <br /> Easily!
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Movie Search is a simple and easy-to-use web application
          that allows users to search for movies instantly.
        </div>
      </div>
      <div className="w-[50%]"></div>

      {/* <div className="flex gap-3">

        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div> */}

     
    </section>
  );
}

//Find Your Favorite Movies Instantly and Easily!
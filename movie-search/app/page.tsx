import { title, subtitle } from "@/components/primitives";
import ThreeComp from "@/components/ThreeCom";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";


export default function Home() {
  return (
    <section className="flex  justify-center gap-4 py-8 md:py-10 w-full  ">
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
        <div>
{/*          
          <Button radius="full" href="/search-movie" className="bg-gradient-to-tr from-cyan-400 to-blue-300 text-black shadow-lg mt-2 font-semibold border-[3px] border-cyan-500 hover:bg-gradient-to-tr hover:from-cyan-300 hover:to-blue-200">Search Movie</Button> */}
          <Link href="/search-movie" className="bg-gradient-to-tr from-cyan-400 to-blue-300 text-black shadow-lg mt-2 font-semibold border-[3px] border-cyan-500 hover:bg-gradient-to-tr hover:from-cyan-300 hover:to-blue-200 px-6 py-[0.55rem] rounded-full">Search Movie</Link>
        </div> 

      </div>
      <div className="w-[50%] ">
        <ThreeComp/>
      </div>

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
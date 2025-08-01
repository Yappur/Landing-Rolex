import { useState } from "react";
import dayDateImg from "./assets/DayDate40.avif";

function App() {
  return (
    <>
      <main>
        <section className="relative h-screen overflow-hidden">
          <img
            src={dayDateImg}
            alt="hero"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md"
          />

          <div className="relative z-0 flex flex-col items-center justify-center h-full px-4 text-center  ">
            <h1 className=" font-extrabold mt-4 text-center ">
              Day-Date <br /> 40
            </h1>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";

function Introduction() {
  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'url("https://blogpatagonia.australis.com/wp-content/uploads/2020/06/cultural-travel-pros-and-cons.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
      </div>

      {/* Content Section */}
      <section className="relative z-10">
        <div className="mx-auto max-w-screen-xl lg:flex lg:items-center">
          <div
            className="mx-auto max-w-xl text-center p-8 backdrop-blur-sm bg-white/10 border border-white/10 rounded-3xl shadow-2xl"
            style={{
              backdropFilter: "blur(10px)",
            }}
          >
            <h1 className="text-4xl font-bold sm:text-6xl text-white">
              Where will your
              <strong className="font-bold text-red-400 sm:block">
                {" "}
                adventure unfold?{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl text-white/80">
              Embark on a seamless journey of discovery
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/explore"
                className="block w-full rounded-lg bg-red-600 px-12 py-3 text-sm font-medium text-white shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 sm:w-auto"
              >
                Explore
              </Link>

              <Link
                to="/maps"
                className="block w-full rounded-lg bg-white/10 px-12 py-3 text-sm font-medium text-white shadow-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 transition-all duration-300 sm:w-auto"
              >
                Visit Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Introduction;
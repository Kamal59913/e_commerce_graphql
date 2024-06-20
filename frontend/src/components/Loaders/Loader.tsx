import { useState, CSSProperties } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";


export default function Loader() {

  return (
    <div className="h-screen sweet-loading bg-black flex justify-center items-center">
    <div className="">
      <ScaleLoader
        color='white'
        height={35}
        width={4}
        radius={2}
        margin={2}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    </div>
  );
}


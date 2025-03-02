import { useState } from "react";
import { useSelector } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const RecentEvents = () => {
  const { slideArr } = useSelector((state) => state.homeSlide);
  const ArrObj = slideArr;
  const [myState, setState] = useState(0);

  const nextFun = () => {
    setState((prevSt) => {
      return prevSt < ArrObj.length - 1 ? prevSt + 1 : 0;
    });
  };

  const prevFun = () => {
    setState((prevSt) => {
      return prevSt > 0 ? prevSt - 1 : ArrObj.length - 1;
    });
  };
  return (
    <div className="w-[100%] flex mt-5 p-3">
      <div className="basis-[80%]">
        <div className="w-[100%] h-[100%] flex justify-center items-center">
          <div className="w-[100%] h-[20rem]" style={{ position: "relative" }}>
            <span
              style={{ position: "absolute", top: "50%", right: "0px" }}
              className="bg-white p-4 rounded-full cursor-pointer"
              onClick={nextFun}
            >
              <MdNavigateNext size={20} />
            </span>
            <img
              src={ArrObj[myState].imgS}
              alt={`imgss ${ArrObj[myState].id}`}
              className="w-[100%] h-[100%] object-cover"
            />
            <span
              style={{ position: "absolute", top: "50%", left: "0px" }}
              className="bg-white p-4 rounded-full cursor-pointer"
              onClick={prevFun}
            >
              <GrFormPrevious size={20} />
            </span>
          </div>
        </div>
      </div>
      <div className="basis-[20%] text-[2rem] flex items-center justify-center font-bold">
        <h1>Recent Events</h1>
      </div>
    </div>
  );
};

export default RecentEvents;

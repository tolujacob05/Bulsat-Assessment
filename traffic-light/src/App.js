import { useState, useRef } from "react";
import "./App.css";

const colors = {
  RED: "RED",
  GREEN: "GREEN",
  YELLOW: "YELLOW",
};

const trafficOrder = {
  [colors.RED]: colors.GREEN,
  [colors.YELLOW]: colors.RED,
  [colors.GREEN]: colors.YELLOW,
};

// const trafficOrder2 = {
// [colors.GREEN]: colors.YELLOW,
// [colors.RED]: colors.GREEN,
// [colors.YELLOW]: colors.RED,
// };

const trafficLight = (currentColor, color) => {
  return [
    {
      color: colors.RED,
      // active: currentColor === colors.RED || color === colors.GREEN,
      active: currentColor
        ? currentColor === colors.RED
        : color
        ? color === colors.GREEN
        : "",
      className: currentColor ? "red" : "green",
    },

    {
      color: colors.YELLOW,
      active: currentColor
        ? currentColor === colors.YELLOW
        : color
        ? color === colors.RED
        : "",
      className: "yellow",
    },

    {
      color: colors.GREEN,
      active: currentColor
        ? currentColor === colors.GREEN
        : color
        ? color === colors.YELLOW
        : "",
      className: currentColor ? "green" : "red",
    },
  ];
};

export default function App() {
  const [currentColor, setCurrentColor] = useState(colors.RED);

  const [color, setColor] = useState(colors.GREEN);

  // const [timer1, setTimer1] = useState(10);

  // const [timer2, setTimer2] = useState(5);

  const [count, setCount] = useState(5);

  const intervalIdRef = useRef();

  const maxCount = 0;

  /*function twoTimers() {
    if (timer1 > 0) {
      setTimer1((prevTimer1) => prevTimer1 - 1);
    }

    if (timer2 > 0) {
      setTimer2((prevTimer2) => prevTimer2 - 1);
    }

    if (timer1 === 0) {
      setTimer1(timer1);
    }

    if (timer2 === 0) {
      setTimer2(5);
    }
  }

  function click() {
    let timer = setInterval(twoTimers, 1000);

    return () => {
      clearInterval(timer);
    };
  }

  console.log(click());

  */

  function handleClick() {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    intervalIdRef.current = setInterval(() => {
      // trafficLight.active === colors.RED || colors.GREEN ? count : halfCycle

      /* if ((currentColor && color === colors.GREEN) || colors.RED) {
        setCurrentColor((color) => {
          return trafficOrder[color];
        });

        setColor((color) => {
          return trafficOrder[color];
        });
      } else if (currentColor && color === colors.YELLOW) {
      }*/

      if (count > 0) {
        setCount((prevCount) => prevCount - 1);
      }

      setCurrentColor((color) => {
        return trafficOrder[color];
      });
      setColor((color) => {
        return trafficOrder[color];
      });

      // if (trafficLight.active === colors.RED || colors.GREEN) {
      // } else {
      // setCount(halfCycle);
      // }
    }, count * 1000);

    if (count >= maxCount) {
      setCount(5);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }

  function handleReset() {
    setCurrentColor(colors.RED);
    setColor(colors.GREEN);
    setCount(5);

    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  }

  /*useEffect(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    intervalIdRef.current = setInterval(() => {
      setCurrentColor((color) => {
        return trafficOrder[color];
      });
    }, 10 * 1000);
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);*/

  return (
    <>
      <div className="app">
        <div className="cross">
          <div className="t-light">
            <div className="street-B">
              <div className="item-2">
                <div>
                  <Street count={count} color={color} />
                </div>

                <div className="move-1">
                  <span>👟</span>
                </div>
              </div>

              <div className="item-4">
                <div>
                  <Street color={color} />
                </div>

                <div className="move-2">
                  <span>👟</span>
                </div>
              </div>
            </div>

            <div className="street-A">
              <div className="item-1">
                <div>
                  <Street currentColor={currentColor} />
                </div>
                <div>
                  <span>🤚</span>
                </div>
              </div>
              <div className="item-3">
                <div>
                  <span>🤚</span>
                </div>
                <div>
                  <Street currentColor={currentColor} />
                </div>
              </div>
            </div>
          </div>
          <div className="button-1">
            <Button onClick={handleClick}>Start</Button>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </div>
      </div>
      {/* <div className="button-2"> */}
      {/* <Button>Reset</Button> */}
      {/* </div> */}
    </>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function Street({ currentColor, color, count }) {
  return (
    <>
      <div className="parent">
        {trafficLight(currentColor, color).map((light) => {
          return (
            <div
              key={light.color}
              className={light.active ? `light ${light.className}` : "light"}
            ></div>
          );
        })}
      </div>
    </>
  );
}

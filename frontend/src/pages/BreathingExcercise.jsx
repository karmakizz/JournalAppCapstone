import React, { useState, useEffect } from "react";
import "../css/BreathingExcercise.css";

function BreathingExercise() {
  const [phase, setPhase] = useState("Inhale");
  const [countdown, setCountdown] = useState(4); // Default to 4 seconds for inhale
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!isStarted) return; // Don't start the effect until user clicks "Start"

    const phases = ["Inhale", "Hold", "Exhale"];
    const durations = { Inhale: 4, Hold: 4, Exhale: 6 };

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          setPhase((prevPhase) => {
            const nextPhase = phases[(phases.indexOf(prevPhase) + 1) % phases.length];
            setCountdown(durations[nextPhase]);
            return nextPhase;
          });
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted]); // Only run effect when `isStarted` changes

  const startBreathingExercise = () => {
    setPhase("Inhale"); // Reset phase to Inhale
    setCountdown(4); // Reset countdown
    setIsStarted(true); // Start exercise

    // Add timeout to delay the inhale animation slightly
    setTimeout(() => {
      setPhase("Inhale"); // Force an immediate phase change to trigger the inhale animation
    }, 100); // Add a slight delay to let the scale transition happen
  };

  return (
    <div className="breathing-container">
      {!isStarted ? (
        <button onClick={startBreathingExercise}>Start Exercise</button>
      ) : (
        <>
          <div className={`circle ${phase.toLowerCase()}`}></div>
          <h2>{phase}</h2>
          <p>{countdown} seconds</p>
        </>
      )}
    </div>
  );
}

export default BreathingExercise;

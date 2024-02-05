import { useState } from "react"

export default function useLinearStateMachine(linearStates) {
  const [currentState, setCurrentState] = useState(linearStates[0]);

  function moveToNextState() {
    setCurrentState(current => {
      if (current.next === null) {
        return current;
      }
      else {
        let found = linearStates.find(x => x.id === current.next);
        if (found !== null) {
          return found;
        }
        throw new Error("Couldn't find next state named" + current.next);
      }
    });
  }

  function moveToPrevState() {
    setCurrentState(current => {
      if (current.prev === null) {
        return current;
      }
      else {
        let found = linearStates.find(x => x.id === current.prev);
        if (found !== null) {
          return found;
        }
        throw new Error("Couldn't find prev state named" + current.next);
      }
    });
  }

  const availableDirections = (function() {
    let array = [];
    if (currentState.next !== null) {
      array.push("next");
    }
    if (currentState.prev !== null) {
      array.push("prev");
    }
    return array;
  })();

  return { 
    currentState,
    moveToNextState,
    moveToPrevState,
    availableDirections,
  };
}
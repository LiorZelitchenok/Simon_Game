import React, { useState, useEffect } from "react";
import Bulb from "../Bulb/Bulb";
import "./Board.css";
const greenColor = "#33cc33";
const blueColor = "#3333ff";
const orangeColor = "#ffcc66";
const blackColor = "#000000";
const purpleColor = "#6600cc";
const yellowColor = "#ffff00";
const Board = () => {
  const [bulbsArray, setBulbsArray] = useState([
    { id: "1", color: greenColor, isActive: false },
    { id: "2", color: blueColor, isActive: false },
    { id: "3", color: blackColor, isActive: false },
    { id: "4", color: yellowColor, isActive: false },
    { id: "5", color: purpleColor, isActive: false },
    { id: "6", color: orangeColor, isActive: false },
  ]);
  const [score, setScore] = useState("");
  const [count, setCount] = useState(1);
  const [tmpArray, setTmpArray] = useState([]);
  const [userClickedArray, setUserClickedArray] = useState([]);
  useEffect(() => {
    if (userClickedArray.length > 0) {
      checkIfUserCorrect();
    }
  }, [userClickedArray]);
  //Starts the game
  const startGame = () => {
    let randomNumber = Math.floor(Math.random() * 6);
    let tmpBulb = bulbsArray[randomNumber];
    tmpArray.push(tmpBulb);
    let tmpArr = bulbsArray;

    tmpArray.map((bulb, index) => {
      tmpArr.map((item) => {
        if (item.id == bulb.id) {
          item.isActive = true;
        }
      });
    });
    //setBulbsArray(tmpArr)
    setBulbsArray([...tmpArr]);
    setTimeout(() => {
      tmpArray.map((bulb, index) => {
        tmpArr.map((item) => {
          if (item.id == bulb.id) {
            item.isActive = false;
          }
        });
      });
      setBulbsArray([...tmpArr]);
    }, 3000);
  };
  const bulbIsClicked = (bulb) => {
    setUserClickedArray((userClickedArray) => [...userClickedArray, bulb]);
  };
  //Checks if the user clicked the right order
  const checkIfUserCorrect = () => {
    //If yes , continue to the next move
    if (JSON.stringify(userClickedArray) == JSON.stringify(tmpArray)) {
      setScore((score) => score + 10);
      //Continues to the next move!!!
      nextMove();
    } else {
      //If not , show alert to the user.
      alert("Wrong! Restart Game!!!!");
    }
  };

  //Next move of the game only if the user got the correct answer.
  const nextMove = () => {
    //Pushing random bulb from bulbsArray to tmpArray
    let randomNumber = Math.floor(Math.random() * 6);
    let tmpBulb = bulbsArray[randomNumber];
    tmpArray.push(tmpBulb);
    let tmpArr = bulbsArray;
    let interval = 1000;

    tmpArray.map((bulb, index) => {
      tmpArr.forEach((item, i) => {
        if (item.id == bulb.id) {
          (function(it){
            setTimeout(() => {
              item.isActive = true;
              console.log(item);
              setBulbsArray([...tmpArr]);
            },  2000);
          }(i))
        }
      });
    });

    setTimeout(() => {
      tmpArray.map((bulb, index) => {
        tmpArr.map((item) => {
          if (item.id == bulb.id) {
            item.isActive = false;
          }
        });
      });
      setBulbsArray([...tmpArr]);
    }, 2000);
  };

  return (
    <main>
      <span>The Score Is : {score} </span>
      <button className="startGame" onClick={startGame}>
        Start Game
      </button>
      <div className="board">
        <div className="wrapper">
          {bulbsArray.map((bulb, index) => {
            return (
              <Bulb
                key={bulb.id}
                bulb={bulb}
                isClicked={(bulb) => bulbIsClicked(bulb)}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Board;

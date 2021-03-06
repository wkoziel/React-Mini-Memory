import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { initialCards } from '../constants';
import { shuffle } from '../helpers';

import Card from '../components/Card';
import { useHistory } from 'react-router';
import Window from '../components/Window';

const GamePage = () => {
   const [cards, setCards] = useState([]);
   const [points, setPoints] = useState(10);
   const [username, setUsername] = useState('Anonim');
   const [win, setWin] = useState(false);
   const [firstSelected, setFirstSelected] = useState(null);
   const [secondSelected, setSecondSelected] = useState(null);
   const history = useHistory();

   // INITIALIZATION
   useEffect(() => {
      resetState();
   }, []);

   const resetState = () => {
      let shuffledCards = shuffle(initialCards);
      shuffledCards = shuffledCards.map((card) => {
         return { ...card, disabled: false };
      });
      setCards(shuffledCards);

      if (localStorage.getItem('Username') === null) {
         localStorage.setItem('Username', username);
      } else setUsername(localStorage.getItem('Username'));

      setPoints(10);
      setFirstSelected(null);
      setSecondSelected(null);
   };

   // CHECK IF PAIR MATCHES
   useEffect(() => {
      if (firstSelected !== null && secondSelected !== null) {
         if (firstSelected.color === secondSelected.color) {
            const tempCards = cards.map((card) =>
               card.color === firstSelected.color
                  ? { ...card, disabled: true }
                  : card
            );
            setCards(tempCards);
            setPoints((old) => old + 1);
            setFirstSelected(null);
            setSecondSelected(null);
         } else {
            setTimeout(() => {
               setFirstSelected(null);
               setSecondSelected(null);
               setPoints((old) => old - 1);
            }, 1000);
         }
      }
   }, [firstSelected, secondSelected]);

   // CHECK IF PLAYER WIN
   useEffect(() => {
      const countFlipped = cards.reduce((total, card) => {
         if (card.disabled === true) total += 1;
         return total;
      }, 0);

      if (cards.length !== 0 && countFlipped === cards.length)
         handleWin(points);
   }, [cards]);

   // SET CARDS AS SELECTED
   const handleClick = (id) => {
      let tempCards = cards.filter((card) => card.id === id)[0];
      if (firstSelected === null) setFirstSelected(tempCards);
      else if (secondSelected === null && id !== firstSelected.id)
         setSecondSelected(tempCards);
   };

   // ADD SCORE TO SCORE TABLE
   const handleWin = (points) => {
      let tempScores;

      if (localStorage.getItem('scoreTable') === null)
         localStorage.setItem('scoreTable', JSON.stringify([]));

      tempScores = JSON.parse(localStorage.getItem('scoreTable'));
      tempScores.push({ username, score: points });
      tempScores.sort((a, b) => b.score - a.score);
      tempScores = tempScores.filter((item, index) => index < 10);
      localStorage.setItem('scoreTable', JSON.stringify(tempScores));

      setTimeout(() => {
         setWin(true);
      }, 1000);
   };

   return (
      <>
         {win ? (
            <StyleWrapper className='page'>
               <Window points={points} />
            </StyleWrapper>
         ) : (
            <StyleWrapper className='page'>
               <div className='box'>
                  <p>Nick: {username}</p>
                  <p>Punkty: {points}</p>
                  <button
                     className='reset'
                     onClick={() => {
                        history.push('/');
                     }}
                  >
                     Powr??t
                  </button>
                  <button
                     className='reset'
                     onClick={() => {
                        resetState();
                     }}
                  >
                     Reset
                  </button>
               </div>
               <div className='container'>
                  {cards.map((card) => (
                     <Card
                        key={card.id}
                        {...card}
                        handleClick={handleClick}
                        flipped={
                           card.id === firstSelected?.id ||
                           card.id === secondSelected?.id
                        }
                     />
                  ))}
               </div>
            </StyleWrapper>
         )}
      </>
   );
};

const StyleWrapper = styled.div`
   display: flex;
   flex-direction: column;

   .container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5vw;
   }

   .box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 5rem;
      margin-bottom: 0.5rem;
      background: lightgray;
      border-radius: 2rem;
      max-width: 100vw;
      min-width: 30%;
   }

   p {
      font-size: 1.5rem;
      font-weight: 700;
   }

   @media (max-width: 480px) {
      p,
      button {
         font-size: 1rem;
         font-weight: 700;
      }
      .box {
         gap: 1rem;
         padding: 1rem 2rem;
      }
   }

   .reset {
      border: none;
      background: #fff;
      border-radius: 1rem;
      padding: 0.2rem 1rem;
      cursor: pointer;
   }
`;

export default GamePage;

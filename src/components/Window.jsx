import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Button from './Button';

const Window = ({ points = 0 }) => {
   const history = useHistory();
   return (
      <StyleWrapper>
         <h1>Gratulacje!</h1>
         <h2>Twój wynik to {points} </h2>
         <div className='buttons'>
            <Button
               label='Wyniki'
               second
               onClick={() => history.push('/score')}
            />
            <Button
               label='Zagraj ponownie'
               onClick={() => window.location.reload()}
            />
         </div>
      </StyleWrapper>
   );
};

const StyleWrapper = styled.div`
   min-width: 50rem;
   width: fit-content;
   min-height: 20rem;
   border: 2px blue solid;
   border-radius: 2rem;
   padding: 1rem;

   display: flex;
   flex-direction: column;
   gap: 3rem;

   justify-content: center;
   align-items: center;

   animation-name: showUp;
   animation-duration: 0.5s;

   h1 {
      font-size: 3rem;
   }

   h2 {
      font-size: 2rem;
      font-weight: 600;
   }

   .buttons {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      justify-content: center;
   }

   @keyframes showUp {
      0% {
         opacity: 0;
         margin-bottom: -1000px;
      }
      100% {
         opacity: 1;
         margin-bottom: 0;
      }
   }
`;

export default Window;

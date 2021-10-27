import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Button from '../components/Button';

const ScorePage = () => {
   const [scores, setScores] = useState([{}]);
   const history = useHistory();

   useEffect(() => {
      let tempScores;
      if (localStorage.getItem('scoreTable') === null)
         localStorage.setItem('scoreTable', JSON.stringify([]));
      else tempScores = JSON.parse(localStorage.getItem('scoreTable'));
      setScores(tempScores);
   }, []);

   return (
      <StyleWrapper className='page'>
         <div className='container'>
            <h1 className='item item-main'>
               <span>Miejsce</span> <span>Nick</span>
               <span>Punkty</span>
            </h1>
            {scores &&
               scores.map((item, index) => (
                  <div key={index}>
                     <h1 className='item'>
                        <span>{index + 1}.</span> <span>{item.username}</span>
                        <span>{item.score}</span>
                     </h1>
                  </div>
               ))}
            <Button label='Powrót' second onClick={() => history.push('/')} />
         </div>
      </StyleWrapper>
   );
};

const StyleWrapper = styled.div`
   .container {
      display: flex;
      flex-direction: column;
      align-content: space-between;
      justify-content: space-between;
      background-color: #fff;
      padding: 2rem 5rem;
      border-radius: 1rem;
      min-width: 30rem;
      gap: 2rem;
      border: 3px lightgray solid;
      box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
   }

   @media (max-width: 480px) {
      .container {
         min-width: 100vw;
      }
   }

   .item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px lightgray solid;
      padding: 0 2rem;

      &-main {
         background-color: lightgray;
         border-radius: 1rem;
         padding: 1rem 1rem;
      }
   }

   @media (min-width: 480px) {
      .item {
         gap: 5rem;
      }
   }
`;

export default ScorePage;

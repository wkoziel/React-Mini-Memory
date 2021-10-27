import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { useHistory } from 'react-router';
import { useState } from 'react';

const StartPage = () => {
   const [username, setUsername] = useState('');
   const history = useHistory();

   const handleClick = () => {
      localStorage.setItem('Username', username);
      history.push('/game');
   };
   return (
      <StyleWrapper className='page'>
         <div className='container'>
            <h1>Mini-memory</h1>
            <input
               type='text'
               name='username'
               id='username'
               placeholder='Wpis swój nick'
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
            <div className='buttons'>
               <Button
                  label='Wyniki'
                  type='button'
                  onClick={() => history.push('/score')}
                  second
               />
               <Button
                  label='Rozpocznij'
                  type='submit'
                  disable={username.length < 1}
                  onClick={() => handleClick()}
               />
            </div>
         </div>
      </StyleWrapper>
   );
};

const StyleWrapper = styled.div`
   h1 {
      font-size: 3.5rem;
      text-align: center;
      margin-bottom: 1rem;
   }

   input {
      width: 30rem;
      border: none;
      outline: none;
      border-bottom: 1px solid gray;
      align-self: center;
      font-size: 2.5rem;
   }

   .container {
      display: flex;
      flex-direction: column;
      align-content: space-between;
      justify-items: center;
      background-color: #fff;
      padding: 2rem;
      border-radius: 1rem;
      min-width: 50rem;
      gap: 3rem;
      border: 3px lightgray solid;
      box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
   }

   form {
      display: flex;
      flex-direction: column;
   }

   input {
      text-align: center;
   }

   input:focus::placeholder {
      color: transparent;
   }

   .buttons {
      display: flex;
      justify-content: center;
      gap: 2rem;
   }
`;

export default StartPage;

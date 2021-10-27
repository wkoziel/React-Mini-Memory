import React from 'react';
import styled from 'styled-components';

const Button = ({ label, type, onClick, disable, second }) => {
   return (
      <StyleWrapper>
         <button
            className={`${disable && 'disable'} ${second && 'second'}`}
            type={type}
            onClick={onClick}
            disabled={disable}
         >
            {label}
         </button>
      </StyleWrapper>
   );
};

const StyleWrapper = styled.div`
   align-self: center;
   button {
      color: white;
      background-color: blue;
      border-radius: 1rem;
      padding: 1rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      min-width: 15rem;

      &:hover {
         transform: scale(1.1);
         box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
      }
   }

   .second {
      color: blue;
      background-color: white;
      border: 2px blue solid;
   }

   .disable {
      background-color: lightgrey;
   }
`;

export default Button;

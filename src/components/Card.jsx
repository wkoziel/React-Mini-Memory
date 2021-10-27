import styled from 'styled-components';
import questionMark from '../assets/questionMark.svg';
// import { useGlobalContext } from '../context';

const Card = ({ color, id, flipped, disabled, handleClick }) => {
   const checkClick = () => {
      if (!disabled) handleClick(id);
   };

   return (
      <StyleWrapper onClick={() => checkClick()}>
         <div
            className={`side front-side ${
               (flipped || disabled) && 'front-flipped'
            } ${disabled && 'disabled'}`}
         >
            <img src={questionMark} alt='Question mark' />
         </div>
         <div
            className={`side back-side ${
               (flipped || disabled) && 'back-flipped'
            } ${disabled && 'disabled'}`}
         >
            <div className='color' style={{ backgroundColor: color }} />
         </div>
      </StyleWrapper>
   );
};

const StyleWrapper = styled.div`
   perspective: 150rem;
   height: 15rem;
   width: 10rem;
   position: relative;

   .side {
      height: 15rem;
      width: 100%;
      padding: 0.75rem;
      border: 0.3rem solid blue;
      border-radius: 1rem;

      position: absolute;
      top: 0;
      left: 0;

      backface-visibility: hidden;
      transition: all 0.3s;

      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
   }

   .front-side {
      img {
         width: 100%;
      }
   }

   .back-side {
      transform: rotateY(180deg);
   }

   .front-flipped {
      transform: rotateY(-180deg);
   }

   .back-flipped {
      transform: rotateY(0);
   }

   .color {
      height: 100%;
      width: 100%;
      border-radius: 1rem;
   }

   .disabled {
      filter: opacity(0.3);
   }
`;

export default Card;

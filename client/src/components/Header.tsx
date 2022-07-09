import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import BachleBars from '../assets/BachleBars';
import BachleQuestion from '../assets/BachleQuestion';

interface IProps {
  gameFinished: boolean;
}

export default function Header({ gameFinished }: IProps) {
  const { setActiveModal } = useContext(GameContext);

  return (
    <div className={gameFinished ? `header header__fixed` : `header`}>
      <div className="header__left">
        <div onClick={() => setActiveModal('stats')}>
          <BachleBars />
        </div>
      </div>
      <div className="header__center">
        <h1>Bachle</h1>
      </div>
      <div className="header__right">
        <div onClick={() => setActiveModal('how-to-play')}>
          <BachleQuestion />
        </div>
      </div>
    </div>
  );
}

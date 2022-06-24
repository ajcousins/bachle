import BachleBars from '../assets/BachleBars';
import BachleQuestion from '../assets/BachleQuestion';

interface IProps {
  gameFinished: boolean;
  activeModal: null | string;
  setActiveModal: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Header({
  gameFinished,
  activeModal,
  setActiveModal,
}: IProps) {
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

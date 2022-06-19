interface IProps {
  gameFinished: boolean;
}

export default function Header({gameFinished}:IProps) {
  return (
    <div className={gameFinished ? `header header__fixed` : `header`}>
      <div className="header__left"></div>
      <div className="header__center">
        <h1>Bachle</h1>
      </div>
      <div className="header__right">v1.22</div>
    </div>
  );
}

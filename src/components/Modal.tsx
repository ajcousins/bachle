import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import BachleExit from '../assets/BachleExit';
import { VERSION } from '../data/appConsts';
import UserStatistics from './UserStatistics';

interface IProps {
  handleReset: any;
}

interface InnerModalProps {
  title: string;
  children: any;
}

export default function Modal({ handleReset }: IProps) {
  const { activeModal, setActiveModal } = useContext(GameContext);

  const InnerModal = ({ title, children }: InnerModalProps) => {
    return (
      <div className="modal__inner">
        <div className="modal__inner__heading">
          <h2>{title}</h2>
          <div onClick={() => setActiveModal(null)}>
            <BachleExit />
          </div>
        </div>
        {children}
      </div>
    );
  };

  switch (activeModal) {
    case 'stats':
      return (
        <div className="modal">
          <InnerModal title="Stats">
            <p>Placeholder for stats.</p>
            <UserStatistics />
            <div style={{ marginBottom: '2em' }}>v{VERSION}</div>
            <button className="btn-mid" type="button" onClick={handleReset}>
              RESET HISTORY
            </button>
          </InnerModal>
        </div>
      );
    case 'how-to-play':
      return (
        <div className="modal">
          <InnerModal title="How To Play">
            <p>
              Listen to the first track, then find the correct composer in the
              list.
            </p>
            <p>Skipped or incorrect attempts unlock more tracks.</p>
            <p>Answer in as few tries as possible and share your score!</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '0.5em',
                height: '4em',
              }}
            >
              <button
                className="btn-full"
                style={{ margin: 'auto' }}
                type="button"
                onClick={() => setActiveModal(null)}
              >
                PLAY
              </button>
            </div>
          </InnerModal>
        </div>
      );
    default:
      return null;
  }
}

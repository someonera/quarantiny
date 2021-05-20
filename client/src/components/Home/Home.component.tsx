import React, { useState, useEffect } from 'react';
import './Home.styles.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { store } from '../../app/store';
import { setUserName } from '../../features/user/userSlice';
import { setCurrentSong } from '../../features/music/musicSlice';
import { resetGamePlay } from '../../helpers/game.helper';
import {
  btnPressOne,
  btnPressTwo,
  btnClickOne,
  whooshOne,
  bleepOneHover,
  bleepTwo,
  bleepFiveConfirmation,
  bleepSevenHover,
  cancelButton,
  handleBtnHoverEnter,
  handleBtnHoverLeave,
} from '../../audioControllers/buttonSounds';
import { musicController } from '../../audioControllers/musicController';
import IntroAnimations from '../IntroAnimations/IntroAnimations.component';

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [nameInput, setNameInput] = useState('');
  const [isUserNameAlert, setIsUserNameAlert] = useState(false);
  const { userName } = useAppSelector((state) => state.user);
  const { isCurrentGameActive } = useAppSelector((state) => state.game);
  const handleNoUserName = (): void => {
    cancelButton.play();
    setIsUserNameAlert(true);
  };
  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    const input = e.currentTarget.value;
    setIsUserNameAlert(false);
    setNameInput(input.toUpperCase());
  };
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!nameInput) {
      handleNoUserName();
      return;
    }
    dispatch(setUserName(nameInput));
    btnPressOne.play();
    history.push('/new-game');
  };
  const handleNewGame = (): void => {
    bleepFiveConfirmation.play();
    resetGamePlay();
    history.push('/new-game');
  };

  const handleContinueGame = (): void => {
    btnPressTwo.play();
    history.push('/start');
  };
  useEffect(() => {
    const howlSongFile = musicController?.findHowlFileFromTitle('Connect');
    if (howlSongFile) {
      const songTitle = musicController?.findSongTitleFromHowlFile(
        howlSongFile
      );
      if (songTitle) {
        store.dispatch(setCurrentSong(songTitle));
        musicController?.playSong(howlSongFile);
      }
    }
  }, []);
  const newUser = (
    <>
      <div className="home-form">
        <form className="form" autoComplete="off">
          <h2>You´re new!</h2>
          <label htmlFor="userName">
            Type your user name
            <div className="brown_border_box">
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="Type here..."
                className=""
                value={nameInput}
                onChange={handleInput}
              />
            </div>
          </label>
          <div>
            {isUserNameAlert && !nameInput ? (
              <p>Please fill in your name</p>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
  const returnUser = (
    <>
      <div className="returnGreeting">
        <h2>Hey {userName}!</h2>
        <h2>Welcome Back</h2>
      </div>
      <div className="home-btn-container">
        {isCurrentGameActive && (
          <button
            type="button"
            onClick={handleContinueGame}
            onMouseEnter={handleBtnHoverEnter}
            onMouseLeave={handleBtnHoverLeave}
            className="bordered-button"
          >
            Continue
          </button>
        )}
        <button
          type="button"
          onClick={handleNewGame}
          onMouseEnter={handleBtnHoverEnter}
          onMouseLeave={handleBtnHoverLeave}
          className="bordered-button"
        >
          New Game
        </button>
      </div>
    </>
  );
  return (
    <div className="home-background-color">
      <div className="max-width-container">
        <div className="home-container">
          <div className="home-title-row">
            <h1>Quaranteeny</h1>
          </div>
          <div className="home-middle-row">
            <div className="home-col-left">
              <div className="home-story">
                <h2>The story so far...</h2>
                <p>
                  Giant crabs have overrun the world and Quaranteeny has been
                  put in lockdown. Keep your Quaranteeny happy, healthy...and
                  inside!”
                </p>
                <p>
                  Pay attention to your Quaranteeny´s needs, make sure they have
                  health, energy, and money - and <br />
                  don´t let them stay in the danger zone too long!
                </p>
              </div>
            </div>
            <div className="home-col-right">
              {userName ? returnUser : newUser}
            </div>
          </div>
          {!userName && (
            <div className="home-bottom-row">
              <button
                type="button"
                className="submit-btn"
                id="submit-btn"
                onClick={handleSubmit}
                onMouseEnter={handleBtnHoverEnter}
                onMouseLeave={handleBtnHoverLeave}
              >
                New Game
              </button>
            </div>
          )}
          <IntroAnimations />
        </div>
      </div>
    </div>
  );
};

export default Home;

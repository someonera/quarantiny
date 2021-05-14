import React, { useEffect } from 'react';
import './Mood.styles.css';
import { useAppSelector } from '../../app/hooks';
import { bubblePop } from '../../audioControllers/alerts';

const Mood = (): JSX.Element => {
  const conditions: string[] = useAppSelector(
    (state) => state.sprite.conditions
  );
  const moodList = [...Array.from(new Set(conditions))];

  const renderBoard = (): JSX.Element => {
    return (
      <div className="nes-balloon from-right mood-board">
        {/* <div className="mood-board"> */}
        <h3>I´m feeling a little</h3>
        <ul className="moodList">
          {moodList &&
            moodList.map(
              (mood): JSX.Element => {
                return <li key={mood}>{mood}</li>;
              }
            )}
        </ul>
      </div>
    );
  };
  return <div>{conditions.length ? renderBoard() : null}</div>;
};

export default Mood;

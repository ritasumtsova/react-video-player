import React from 'react';
import { Button } from '../Button';
import './SelectVideoBar.scss';

export const SelectVideoBar = ({
  videoLink,
  handleClick,
  handleFileChange,
  handleInputChange,
}) => {
  return (
    <div className={'selectVideoBar'}>
      <span>Select video or paste an URL</span>
      <input type="file" onChange={handleFileChange} className="button" />
      <div className={'flexRow'}>
        <input
          type="text"
          placeholder="Put video URL here"
          value={videoLink}
          onChange={handleInputChange}
        />
        <Button
          disabled={!videoLink}
          type="submit"
          clickHandler={handleClick}
          label={'Watch!'}
        />
      </div>
    </div>
  );
};

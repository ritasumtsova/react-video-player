import React, { useState, useCallback, useRef, useEffect } from 'react';
import { SelectVideoBar } from '../SelectVideoBar';
import { Video } from '../Video';
import { SideBar } from '../SideBar';
import { Button } from '../Button';
import './VideoPlayer.scss';
import { useNotesStore } from '../../state/state';

export const VideoPlayer = () => {
  const videoRef = useRef(null);
  const addNewNote = useNotesStore((state) => state.addNewNote);

  const [videoLink, setVideoLink] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState('');
  const [note, setNote] = useState(false);

  useEffect(() => {
    console.log(videoRef);
  }, []);

  const handleInputChange = useCallback(
    (event) => {
      setVideoLink(event.target.value);
    },
    [setVideoLink]
  );

  const handleClick = useCallback(() => {
    setUrl(videoLink);
    setVideoLink('');
    setFile('');
  }, [videoLink]);

  const handleFileChange = useCallback((event) => {
    try {
      const file = event.target.files[0];
      setFile(URL.createObjectURL(file));
      setUrl('');
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleNewNote = useCallback(() => {
    setNote(() => !note);
  }, [note, setNote]);

  const addNote = useCallback(
    (note) => {
      const timecode = file
        ? videoRef.current.currentTime
        : videoRef.current.getCurrentTime();
      const newNote = {
        timecode,
        note,
        src: url || file,
      };

      if (videoRef) addNewNote(newNote);
    },
    [addNewNote, file, url]
  );

  return (
    <div className={'container'}>
      <div className={'videoBar'}>
        <Video url={url} file={file} forwardedRef={videoRef} />
        <SelectVideoBar
          videoLink={videoLink}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleClick={handleClick}
        />
      </div>
      <Button
        className={'addNote button'}
        clickHandler={handleNewNote}
        label={note ? 'X' : 'Add note'}
      />
      <SideBar src={url || file} addNewNote={addNote} addNote={note} />
    </div>
  );
};

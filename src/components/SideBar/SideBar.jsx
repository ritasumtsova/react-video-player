import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '../Button';
import './SideBar.scss';
import { useNotesStore } from '../../state/state';

export const SideBar = ({ src, addNote, addNewNote }) => {
  const [note, setNote] = useState('');
  const notes = useNotesStore((state) => state.notes);
  const notesToRender = useMemo(
    () => notes.filter((note) => note.src === src),
    [notes, src]
  );
  const removeNotes = useNotesStore((state) => state.removeNotes);

  const handleChange = useCallback(
    (event) => {
      setNote(() => event.target.value);
    },
    [setNote]
  );

  const handleDownload = useCallback(() => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(notes)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'notes.json';

    link.click();
  }, [notes]);

  const handleNote = useCallback(() => {
    addNewNote(note);
  }, [addNewNote, note]);

  return (
    <div className={addNote ? 'sideBar' : 'closed'}>
      {addNote && (
        <div className={'flexRow'}>
          <input
            placeholder="Add note"
            type="text"
            onChange={handleChange}
            value={note}
          />
          <Button clickHandler={handleNote} label={'Save'} />
        </div>
      )}
      {notesToRender?.length > 0 && (
        <span>
          <strong>Your notes:</strong>
        </span>
      )}
      <ul className={'list'}>
        {notesToRender?.length > 0 &&
          notesToRender.map(({ timecode, note }, index) => (
            <li key={index}>{`Time: ${timecode}, ${note}`}</li>
          ))}
      </ul>
      {notesToRender?.length > 0 && (
        <div className={'flexRow'}>
          <Button clickHandler={handleDownload} label={'Download'} />
          <Button clickHandler={removeNotes} label={'Clear'} />
        </div>
      )}
    </div>
  );
};

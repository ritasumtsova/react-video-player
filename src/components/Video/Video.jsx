import React from 'react';
import ReactPlayer from 'react-player';

export const Video = ({ forwardedRef, url, file }) => {
  return (
    <>
      {url ? (
        <ReactPlayer url={url} ref={forwardedRef} width="100%" height="320px" />
      ) : (
        <video
          ref={forwardedRef}
          src={file}
          controls
          width="100%"
          height="320px"
          autoPlay
        >
          Sorry, your browser doesn't support embedded videos.
        </video>
      )}
    </>
  );
};

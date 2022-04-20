import React from "react";
import AudioPlayer from "react-h5-audio-player";

const Player = ({ src }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        zIndex: "9999999",
      }}
    >
      <AudioPlayer
        autoPlay
        src={src}
        onPlay={(e) => console.log("onPlay" + src)}
        // other props here
      />
    </div>
  );
};

export default Player;

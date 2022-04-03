import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import xgPlayer from 'xgplayer';

interface IProps {
  url: string;
}

const Player: React.FC<IProps> = forwardRef((props, ref) => {
  const { url } = props;
  const videoRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    destroy: () => {
      videoRef.current.destroy();
    },
  }));

  const initPlayer = () => {
    videoRef.current = new xgPlayer({
      id: 'mse',
      url,
      autoplay: true,
    });
  };

  useEffect(() => {
    initPlayer();
  }, [url]);

  return (
    <div>
      <div id="mse"></div>
    </div>
  );
});

export default Player;

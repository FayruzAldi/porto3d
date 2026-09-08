import { useEffect, useRef } from 'react';
import { soundCloudManager } from '../../utils/soundCloudManager';

export const SoundCloudHost = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      soundCloudManager.init(iframeRef.current);
    }
  }, []);

  // SoundCloud iframe is kept active and accessible in the DOM
  return (
    <div
      id="soundcloud-host-container"
      style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        width: '320px',
        height: '166px',
        pointerEvents: 'none',
        zIndex: -9999,
      }}
      aria-hidden="true"
    >
      <iframe
        ref={iframeRef}
        id="sc-widget-iframe"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/lofi-girl/sets/lofi-hip-hop-radio-beats-to&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
        title="SoundCloud Background Player"
      />
    </div>
  );
};

import React from 'react';

const RandomBlobs: React.FC = () => {
  const blobData = [
    {
      className: 'top-0 left-0 md:top-[-10%] md:left-[-10%] w-[50vh] h-[50vh] md:w-[60vh] md:h-[60vh]',
      hue: 0,
    },
    {
      className: 'top-[20%] right-[-20%] md:top-[10%] md:right-[-10%] w-[60vh] h-[60vh] md:w-[70vh] md:h-[70vh]',
      hue: 120,
    },
    {
      className: 'bottom-[-10%] left-[20%] md:bottom-[-10%] md:left-[30%] w-[55vh] h-[55vh] md:w-[65vh] md:h-[65vh]',
      hue: 240,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {blobData.map((blob, index) => (
        <div
          key={index}
          className={`
            absolute ${blob.className} bg-gradient-to-br from-neo-purple via-neo-blue to-neo-pink
            rounded-full opacity-20
            mix-blend-multiply dark:mix-blend-screen
          `}
          style={{
            // The blur filter is very performance-intensive. Keeping it static avoids costly animations.
            // The responsive blur was not working previously due to inline style override, so we'll use a fixed value.
            filter: `hue-rotate(${blob.hue}deg) blur(80px)`,
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(RandomBlobs);
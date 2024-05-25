import React from 'react';

interface IframeProps {
  src: string;
  width?: string | number;
  height?: string | number;
}

const IframeComp: React.FC<IframeProps> = ({ src, width, height }) => {
  return (
    <iframe
      src={src}
      width={width}
      height={height}
      frameBorder="0"
      scrolling="no"
    />
  );
};

export default IframeComp;
import React from 'react';
import ReactLoading from 'react-loading';

interface ILoadingProps {
   color?: string;
   height?: number;
   width?: number;
}

const Loading: React.FC<ILoadingProps> = ({
   color = "white",
   height = "20%",
   width = "20%",
}) => (
   <ReactLoading
      type="bubbles"
      color={color}
      width={width}
      height={height}
   />
);


export default Loading;
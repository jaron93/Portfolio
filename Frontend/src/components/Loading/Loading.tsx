import React from 'react';
import ReactLoading from 'react-loading';
import './loading.css'

interface ILoadingProps {
   color?: string;
   height?: number;
   width?: number;
}

const Loading: React.FC<ILoadingProps> = ({
   color = "white",
   height = 22,
   width = 60,
}) => (
   <ReactLoading
      className="loading"
      type="bubbles"
      color={color}
      width={width}
      height={height}
   />
);


export default Loading;
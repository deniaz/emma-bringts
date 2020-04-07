import React, { FC } from 'react';

type Props = {
  title?: string;
  text: string[];
  img?: string;
  style?: string;
};

export const ContentBox: FC<Props> = ({ title, text, img, style }) => (
  <div className={"content-secation " + style}> 
    <img src={img} alt="" />
    <div className="text">
      <h2>{title}</h2>
      {text.map(( value ) => (
        <p>{value}</p>
      ))}
    </div>
  </div>

);

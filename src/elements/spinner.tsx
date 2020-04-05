import React, { FC } from 'react';
import cn from '../utils/classname';

type Props = {
  className?: string;
  size?: number;
};
export const Spinner: FC<Props> = ({ className, size = 128 }) => (
  <svg
    className={cn([className, 'endless-spinning'])}
    width={size}
    height={size}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 496 496"
    xmlSpace="preserve"
  >
    <path
      d="M248,0C111.256,0,0,111.256,0,248s111.256,248,248,248s248-111.256,248-248S384.744,0,248,0z M248,480
				C120.072,480,16,375.928,16,248S120.072,16,248,16s232,104.072,232,232S375.928,480,248,480z"
    />
    <path
      d="M373,91.872l-10.008,12.488c3.216,2.576,6.296,5.272,9.304,8.032l-79.416,79.416
				c-10.36-8.288-23.024-13.784-36.888-15.328V64.288c32.664,1.408,64.208,11.296,91.664,29.016l8.68-13.448
				C324.056,59.016,286.592,48,248,48C137.72,48,48,137.72,48,248c0,62.408,28.352,120.12,77.792,158.336l9.792-12.656
				c-4.136-3.2-8.056-6.592-11.864-10.08l79.4-79.4c10.36,8.288,23.024,13.784,36.888,15.328v112.184
				c-32.664-1.408-64.208-11.296-91.664-29.016l-8.68,13.448C171.944,436.984,209.408,448,248,448c110.28,0,200-89.72,200-200
				C448,186.984,420.664,130.08,373,91.872z M383.616,123.696c29.208,31.776,46.296,72.68,48.16,116.304H319.528
				c-1.544-13.864-7.04-26.528-15.328-36.888L383.616,123.696z M240,64.2v112.272c-13.864,1.544-26.528,7.04-36.888,15.328
				l-79.368-79.368C154.672,84.064,195.288,66.128,240,64.2z M112.336,372.352C83.096,340.608,66.088,299.76,64.224,256h112.248
				c1.544,13.864,7.04,26.528,15.328,36.888L112.336,372.352z M176.472,240H64.2c1.92-44.712,19.864-85.328,48.232-116.256
				l79.368,79.368C183.512,213.472,178.016,226.136,176.472,240z M192,248c0-30.88,25.12-56,56-56s56,25.12,56,56s-25.12,56-56,56
				S192,278.88,192,248z M312.456,420.32l-9.304-21.912l14.728-6.256l9.304,21.912C322.384,416.36,317.472,418.44,312.456,420.32z M341.344,406.472l-14.984-35.296l-14.728,6.256l-6.256-14.728l-14.728,6.248l6.256,14.728l-14.728,6.248l15,35.344
				c-13.2,3.664-26.976,5.912-41.176,6.528V319.528c13.864-1.544,26.528-7.04,36.888-15.328l79.368,79.368
				C362.808,392.232,352.44,399.912,341.344,406.472z M383.568,372.256L304.2,292.888c8.288-10.36,13.784-23.024,15.328-36.888
				H431.8C429.88,300.712,411.936,341.328,383.568,372.256z"
    />
    <path
      d="M248,208c-22.056,0-40,17.944-40,40c0,22.056,17.944,40,40,40c22.056,0,40-17.944,40-40C288,225.944,270.056,208,248,208
				z M248,272c-13.232,0-24-10.768-24-24s10.768-24,24-24s24,10.768,24,24S261.232,272,248,272z"
    />
  </svg>
);
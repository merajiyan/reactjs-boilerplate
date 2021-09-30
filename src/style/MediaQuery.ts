import { css } from 'styled-components';

export const sizes: { [x: string]: number } = {
  xxBDesktop: 1800,
  xMBDesktop: 1550,
  xBDesktop: 1400,
  xDesktop: 1200,
  mDesktop: 1140,
  desktop: 991,
  tablet: 767,
  bPhone: 576,
  phone: 480,
};

const media = Object.keys(sizes).reduce((acc: { [key: string]: (...args: any) => any }, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...(args as [any]))};
    }
  `;
  return acc;
}, {});

export const mediaMobileFirst = Object.keys(sizes).reduce(
  (acc: { [key: string]: (...args: any) => any }, label) => {
    acc[label] = (...args) => css`
      @media (min-width: ${sizes[label] / 16}em) {
        ${css(...(args as [any]))};
      }
    `;
    return acc;
  },
  {},
);

export default media;

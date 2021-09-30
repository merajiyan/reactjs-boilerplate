import { createGlobalStyle } from 'styled-components';
import media from 'style/MediaQuery';

const GlobalStyle = createGlobalStyle`

body{
  margin:0;
  padding:0;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin:0;
}

.container {
  max-width:1670px;
  width:100%;
  margin-right:auto;
  margin-left:auto;
  ${media.xxBDesktop`width:1370px`};
  ${media.xBDesktop`width:1170px`};
  ${media.xDesktop`width:992px`};
  ${media.desktop`width:760px`};
  ${media.tablet`width:100%`};
  ${media.bPhone`width:100%`};
}
`;
export default GlobalStyle;

import { createGlobalStyle } from 'styled-components';
import media from 'style/MediaQuery';

const GlobalStyle = createGlobalStyle`

h1 {
  font-size: 25px;
  line-height: 39px;
}
h2 {
  font-size: 23px;
}
h3 {
  font-size: 20px;
  line-height: 31px;
}
h4 {
  font-size: 15px;
  line-height: 23px;
}
h5 {
  font-size: 14px;
}
h6 {
  font-size: 12px;
}
p {
  font-size: 17px;
  line-height: 34px;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom:0;
}

//***input error style***//
.ant-form-item-has-error {
  .text-input {
    border: 2px solid #f93e3e !important;
    ${media.tablet`
      border: 1px solid #f93e3e !important;
    `}
  }
}
.ant-form-item-has-success {
  .text-input {
    border: 2px solid #00bf4d !important;
    ${media.tablet`
      border: 1px solid #00bf4d !important;
    `}
  }
  .noValidation{
    border: 2px solid rgba(212, 216, 224, 0.56) !important;
    background: none;
  }
}

//***ant validation***//
.ant-form-item-has-error .ant-form-item-explain, .ant-form-item-has-error .ant-form-item-split {
  padding-top:10px;
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

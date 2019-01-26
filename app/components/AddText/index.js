import styled from 'styled-components';

const colors = {
  black: '#282828',
  blue: '#576FED',
  gray: '#7B7B7B',
};

const AddText = styled.span`
  color: ${props => (props.color ? colors[props.color] : colors.black)};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  font-size: ${props => (props.fontSize ? +props.fontSize : '16')}px;
  line-height: ${props => (props.fontSize ? 1.25 * +props.fontSize : '20')}px;
  font-family: Open Sans, sans-serif;
  text-align: left;

  .chevron {
    margin-right: 12px;
    color: ${props => (props.color ? colors[props.color] : colors.gray)};
  }
`;

export default AddText;

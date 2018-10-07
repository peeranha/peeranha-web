import styled from 'styled-components';

const FormWidth = 480;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px 0;
  form {
    flex-basis: ${FormWidth}px;
  }
  form * {
    margin: 3px 0;
  }
  .text-danger {
    padding-left: 10px;
    padding-top: 2px;
    font-size: 14px;
  }
`;

export const AvatarEditorBorder = 30;
export const AvatarEditorWidth = FormWidth - 2 * AvatarEditorBorder;
export const AvatarEditorColor = [255, 255, 255, 0.6];
export const AvatarEditorScale = 1.5;
export const AvatarEditorRotate = 0;

export default Wrapper;

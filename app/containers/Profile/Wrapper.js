import styled from 'styled-components';

const FormWidth = 480;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px 0;
  form,
  .view-form {
    flex-basis: ${FormWidth}px;
    * {
      margin: 3px 0;
    }
  }
  .text-danger {
    padding-left: 10px;
    padding-top: 2px;
    font-size: 14px;
  }
  .view-form {
    > * {
      margin: 10px 0;
    }
    p {
      padding: 10px;
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

export const AvatarEditorBorder = 30;
export const AvatarEditorWidth = FormWidth - 2 * AvatarEditorBorder;
export const AvatarEditorColor = [255, 255, 255, 0.6];
export const AvatarEditorScale = 1.5;
export const AvatarEditorRotate = 0;

export default Wrapper;

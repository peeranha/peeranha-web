import styled from 'styled-components';

export const AvatarEditorBorder = 20;
export const AvatarEditorBorderRadius = 100;
export const AvatarEditorSize = 160;
export const AvatarEditorColor = [255, 255, 255, 0.6];
export const AvatarEditorScale = 1.5;
export const AvatarEditorRotate = 0;
export const AvatarCrossOrigin = 'anonymous';

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
  .profile-image {
    width: ${AvatarEditorSize}px;
    height: ${AvatarEditorSize}px;
    border-radius: 50%;
    margin-bottom: 10px;
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

export default Wrapper;

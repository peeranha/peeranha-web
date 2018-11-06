const TextEditorConfig = {
  apiKey: process.env.TEXT_EDITOR_APIKEY,
  menubar: false,
  plugins: [
    'codesample textpattern advlist autolink lists link image preview textcolor',
    'searchreplace visualblocks code',
    'media contextmenu paste code help wordcount',
  ],
  toolbar:
    'insert | undo redo | codesample formatselect | bold italic backcolor  | bullist numlist | help',
};

export default TextEditorConfig;

export const copyToClipboard = function (text) {
  const input = document.createElement('input');
  input.value = text;
  input.readOnly = true;
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, input.value.length);
  document.execCommand('Copy');
  document.body.removeChild(input);
};
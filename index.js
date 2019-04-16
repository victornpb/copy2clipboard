/**
 * Copy a string to clipboard
 * @param  {String} string         The string to be copied to clipboard
 * @return {Boolean}               returns a boolean correspondent to the success of the copy operation.
 * @author Victor B. www.victorborges.com
 */
export function copyToClipboard(string) {
  let textarea;
  let result;
  
  try {
    textarea = document.createElement('textarea');
    // prevent scroll from jumping to the bottom when focus is set.
    textarea.style.cssText = 'position:fixed; top:0px; z-index: 999;';
    textarea.readOnly = true;
    textarea.value = string;
    document.body.appendChild(textarea);
  
    // Try selecting text using setSelectionRange (Works on iOS Mobile Safari)
    textarea.setSelectionRange(0, string.length);
  
    const selection = window.getSelection().toString();
    if (selection !== string) {
      // test whats selected (setSelectionRange doesn't work on chrome for some reason)
      // Select using old school method (this also works on iOS, but it makes zoom jump to selection)
      textarea.focus();
      textarea.select();
    }
  
    result = document.execCommand('copy');
  } catch (err) {
    console.error(err);
    result = null;
  } finally {
    // setTimeout(() => { //debugging
    document.body.removeChild(textarea);
    // }, 1000 * 10);
  }
  return result;
}

/**
 * @function copyRichTextToClipboard
 * @param  {String} html The string to be copied to clipboard
 * @return {Boolean} returns a boolean correspondent to the success of the copy operation.
 * @author Victor B. www.victorborges.com
 */
export function copyRichTextToClipboard(html) {
  let el;
  let result;
  
  try {
    el = document.createElement('div');
  
    // prevent scroll from jumping to the bottom when focus is set.
    el.style.cssText = 'position:fixed; top:0px;';
  
    el.innerHTML = html;
    document.body.appendChild(el);
  
    // html selection (works on chrome and iOS)
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  
    result = document.execCommand('copy');
  } catch (err) {
    console.error(err);
    result = null;
  } finally {
    // setTimeout(() => { //debugging
    document.body.removeChild(el);
    // }, 1000 * 10);
  }
  return result;
}

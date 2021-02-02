"use strict";

window.Util = (function() {
  function format(input) {
    var type = typeof input;
    if(type == "number") return input.toLocaleString();
    return input;
  }

  function escapeHTML(unsafe) {
    if(unsafe == null) return "";
    return unsafe.toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatThenEscape(input) {
    return escapeHTML(format(input));
  }

  // Following function sourced from https://stackoverflow.com/a/23329386
  function byteLength(str) {
    // returns the byte length of an utf8 string
    var s = str.length;
    for(var i = str.length - 1; i >= 0; i--) {
      var code = str.charCodeAt(i);
      if(code > 0x7f && code <= 0x7ff) s++;
      else if(code > 0x7ff && code <= 0xffff) s+=2;
      if(code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
    }
    return s;
  }

  // Following function sourced from https://stackoverflow.com/a/14919494
  /**
   * Format bytes as human-readable text.
   *
   * @param bytes Number of bytes.
   * @param si True to use metric (SI) units, aka powers of 1000. False to use
   *           binary (IEC), aka powers of 1024.
   * @param dp Number of decimal places to display.
   *
   * @return Formatted string.
   */
  function humanFileSize(bytes, si, dp) {
    const thresh = si ? 1000 : 1024;

    if(Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }

    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(dp) + ' ' + units[u];
  }

  return {
    format: format,
    escapeHTML: escapeHTML,
    formatThenEscape: formatThenEscape,
    byteLength: byteLength,
    humanFileSize: humanFileSize
  }
})();

window.e = Util.escapeHTML;
window.ef = Util.formatThenEscape;
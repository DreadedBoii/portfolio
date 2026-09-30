// Lightweight utility functions for binary conversion & strings
export function textToBinary(text: string): string {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

export function binaryToText(binary: string): string {
  try {
    const cleanBinary = binary.replace(/[^01]/g, '');
    const bytes = cleanBinary.match(/.{1,8}/g) || [];
    return bytes.map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
  } catch {
    return '';
  }
}

export function textToHex(text: string): string {
  return text
    .split('')
    .map(char => '0x' + char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'))
    .join(' ');
}

// Silent sound helpers to maintain API compatibility without intrusive sound
export function setAudioMuted(_muted: boolean) {}
export function getAudioMuted(): boolean { return true; }
export function playCyberKeySound(_type?: string) {}

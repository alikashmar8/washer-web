import { HttpHeaders } from '@angular/common/http';

export function getAccessToken() {
  return localStorage.getItem('access_token');
}

export function getHeaders(): HttpHeaders {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
  });
  return headers;
}

export function getFormDataHeaders(): HttpHeaders {
  const headers = new HttpHeaders({
    // 'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${getAccessToken()}`,
  });
  return headers;
}

export function getEnumArray(enumType: any) {
  let result = [];
  for (var enumMember in enumType) {
    result.push(enumMember);
  }
  return result;
}

export function isMobile() {
  return window.innerWidth <= 900;
}

export function getLang(): string {
  if (localStorage) {
    return localStorage['lang'] || '';
  } else {
    return '';
  }
}

export function setLang(language: string) {
  if (localStorage) {
    localStorage['lang'] = language;
  }
}

// typescript generate random text?
export function generateRandomText(lengthOfCode: number) {
  const possibleChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]=-)(*&amp;^%$#@!~`";
  let text = '';
  for (let i = 0; i < lengthOfCode; i++) {
    text += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
  }
  return text;
}

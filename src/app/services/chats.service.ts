import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHeaders } from 'src/common/utils/functions';
import { chatsEndpoint } from 'src/constants/api-constants';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  constructor(private http: HttpClient) {}

  sendGlobalMessage(data: { text: string }) {
    return this.http.post(chatsEndpoint + 'sendGlobalMessage', data, {
      headers: getHeaders(),
    });
  }
}

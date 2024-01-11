import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHeaders } from 'src/common/utils/functions';
import { notificationsEndpoint } from 'src/constants/api-constants';
import { SendGlobalNotificationDTO } from './../../dtos/send-global-notification.dto';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  sendGlobalNotification(data: SendGlobalNotificationDTO) {
    return this.http.post(
      notificationsEndpoint + 'sendGlobalNotification',
      data,
      {
        headers: getHeaders(),
      }
    );
  }
}

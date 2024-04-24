import { notification } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { RootState } from '../redux/store';

const useNotification = (callback: (data: string) => void) => {
  const WS_URL = 'https://referity.online/api/websocket';
  // const WS_URL = 'http://localhost:8080/websocket';
  const socket = new SockJS(WS_URL);
  const stomp = Stomp.over(socket);
  const [api, context] = notification.useNotification();
  const user = useSelector((store: RootState) => store.user);

  useEffect(() => {
    const onConnected = () => {
      console.log('WebSocket connected');
      stomp.subscribe(`/topic/notification/${user.id}`, message => {
        callback(message.body);
      });
    };

    const onError = (error: any) => {
      console.error('WebSocket error:', error);
      // Handle the error here.
    };

    stomp.connect({}, onConnected, onError);

    return () => {
      //   stomp.disconnect();
      console.log('WebSocket disconnected');
    };
  }, [user.id]);
  return <></>;
};

export default useNotification;

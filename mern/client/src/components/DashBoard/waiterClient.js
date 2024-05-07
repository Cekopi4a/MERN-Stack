// waiterClient.js
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://localhost:8080');

client.onerror = function() {
  console.error('WebSocket грешка');
};

client.onopen = function() {
  console.log('WebSocket връзка установена');
};

client.onclose = function() {
  console.log('WebSocket връзката е затворена');
};

export { client };

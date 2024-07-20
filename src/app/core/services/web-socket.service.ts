import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { upperFirst } from 'lodash';
import * as SocketIOClient from 'socket.io-client';
import { Task } from 'zone.js/lib/zone-impl';
import { environment } from '../../../environments/environment';
import { SocketResponse } from '../../models/socket-response';
import { tasksInitialState } from '../../store/tasks/tasks.reducer';

interface Room {
    email: string
    expireIn: string
}


@Injectable({ providedIn: 'root' })
export class WebSocketService {

    private token: string | null | undefined;
    public connected = false;
    public authenticated = false;
    public reconfigureItens = false;
    private readonly socket: SocketIOClient.Socket;
    private io = SocketIOClient.io

    private readonly connectedRooms: { [key: string]: Room } = {};

    constructor(
        private store: Store
    ) {

        const parsedUrl = new URL(environment.apiUrl);
        this.socket = this.io(parsedUrl.origin, {
            reconnection: true,
            transports: ['websocket'],
        });

        this.socket.on('connect', () => {
            console.log('connected');
            this.connected = true;
            this.autenticate(this.token);
        });

        this.socket.on('testing', data => {
            console.log('cheguei', data);
        });

        this.socket.on('authenticated', () => {
            this.authenticated = true;
            console.log('User logged in successful!');
            this.socket.emit('connection');
            this.reconfigure();
        });

        this.socket.on('unauthorized', error => {
            this.authenticated = false;
            console.error('Error in authentication', error.message);
        });

        this.socket.on('disconnect', () => {
            this.disconnect();
        });

        this.socket.on('error', err => {
            this.disconnect();
            console.error(`Connection error: ${err.message}`);
        });

        this.socket.on('connect_timeout', err => {
            this.disconnect();
            console.error(`Connection error timeout: ${err.message}`);
        });

        this.socket.on('reconnect', n => {
            this.disconnect();
            console.log(`Reconnected in ${n} tries`);
        });

        this.socket.on('reconnect_attempt', n => {
            this.disconnect();
            console.log(`Trying reconnect by ${n == 1 ? n + ' time' : n + ' times'}`);
        });

        this.socket.on('reconnecting', n => {
            this.disconnect();
            console.log(`Reconnecting by ${n == 1 ? n + ' time' : n + ' times'}`);
        });

        this.socket.on('reconnect_error', err => {
            this.disconnect();
            console.error(`Reconnection error: ${err.message}`);
        });

        this.socket.on('reconnect_failed', err => {
            this.disconnect();
            console.error('Error in reconnection');
        });

        this.socket.on('task-list', (socketResponse: SocketResponse<Task>) => {
            console.log("chegueii",socketResponse)
            this.store.dispatch({ type: `[TaskList Component] ${upperFirst(socketResponse.type)}`, playload: socketResponse.object })
        })
    }

    reconfigure() {
        setTimeout(() => {
            for (const room of Object.values(this.connectedRooms)) {
                this.joinRoom(room);
            }
        }, 1000);
    }

    joinRoom(room: Room) {
        const key = `${room.email}:${room.expireIn}`;
        this.connectedRooms[key] = room;
        this.socket.emit('join room', room);
    }

    leaveSala(room: Room) {
        this.socket.emit('leave room', room);
        const key = `${room.email}:${room.expireIn}`
        delete this.connectedRooms[key];
    }

    on(...args: any[]) {

        return this.socket.on.apply(this.socket, arguments as any);
    }

    once(...args: any[]) {
        return this.socket.once.apply(this.socket, arguments as any);
    }

    emit(...args: any[]) {
        return this.socket.emit.apply(this.socket, arguments as any);
    }

    off(eventName: string, callback: () => null) {
        if (callback) {
            return this.socket.off(eventName, callback);
        } else {
            return this.socket.off(eventName);
        }
    }

    disconnect() {
        this.authenticated = false;
        this.connected = false;
        this.reconfigureItens = true;
    }

    autenticate(token: string | null | undefined) {
        if (!token) {
            return null;
        }
        this.token = token;
        if (!this.socket.connected) {
            this.socket.connect();
            return
        } else {
            this.socket.emit('authenticate', {
                token
            });
            return
        }
    }

    logoff() {
        this.token = '';
        this.socket.disconnect();
    }

}

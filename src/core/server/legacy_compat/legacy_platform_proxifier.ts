/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { EventEmitter } from 'events';
import { IncomingMessage, ServerResponse } from 'http';
import { Server } from 'net';

import { Logger } from '../logging';
import { Root } from '../root';

/**
 * List of the server events to be forwarded to the legacy platform.
 */
const ServerEventsToForward = ['listening', 'error', 'clientError', 'connection'];

/**
 * Represents "proxy" between legacy and current platform.
 * @internal
 */
export class LegacyPlatformProxifier extends EventEmitter {
  private readonly eventHandlers: Map<string, (...args: any[]) => void>;
  private readonly log: Logger;
  private server?: Server;

  constructor(private readonly root: Root) {
    super();

    this.log = root.logger.get('legacy-platform-proxifier');

    // HapiJS expects that the following events will be generated by `listener`, see:
    // https://github.com/hapijs/hapi/blob/v14.2.0/lib/connection.js.
    this.eventHandlers = new Map(
      ServerEventsToForward.map(eventName => {
        return [
          eventName,
          (...args: any[]) => {
            this.log.debug(`Event is being forwarded: ${eventName}`);
            this.emit(eventName, ...args);
          },
        ] as [string, (...args: any[]) => void];
      })
    );
  }

  /**
   * Neither new nor legacy platform should use this method directly.
   */
  public address() {
    return this.server && this.server.address();
  }

  /**
   * Neither new nor legacy platform should use this method directly.
   */
  public async listen(port: number, host: string, callback?: (error?: Error) => void) {
    this.log.debug(`"listen" has been called (${host}:${port}).`);

    let error: Error | undefined;
    try {
      await this.root.start();
    } catch (err) {
      error = err;
      this.emit('error', err);
    }

    if (callback !== undefined) {
      callback(error);
    }
  }

  /**
   * Neither new nor legacy platform should use this method directly.
   */
  public async close(callback?: (error?: Error) => void) {
    this.log.debug('"close" has been called.');

    let error: Error | undefined;
    try {
      await this.root.shutdown();
    } catch (err) {
      error = err;
      this.emit('error', err);
    }

    if (callback !== undefined) {
      callback(error);
    }
  }

  /**
   * Neither new nor legacy platform should use this method directly.
   */
  public getConnections(callback: (error: Error | null, count?: number) => void) {
    // This method is used by `even-better` (before we start platform).
    // It seems that the latest version of parent `good` doesn't use this anymore.
    if (this.server) {
      this.server.getConnections(callback);
    } else {
      callback(null, 0);
    }
  }

  /**
   * Binds Http/Https server to the LegacyPlatformProxifier.
   * @param server Server to bind to.
   */
  public bind(server: Server) {
    const oldServer = this.server;
    this.server = server;

    for (const [eventName, eventHandler] of this.eventHandlers) {
      if (oldServer !== undefined) {
        oldServer.removeListener(eventName, eventHandler);
      }

      this.server.addListener(eventName, eventHandler);
    }
  }

  /**
   * Forwards request and response objects to the legacy platform.
   * This method is used whenever new platform doesn't know how to handle the request.
   * @param request Native Node request object instance.
   * @param response Native Node response object instance.
   */
  public proxy(request: IncomingMessage, response: ServerResponse) {
    this.log.debug(`Request will be handled by proxy ${request.method}:${request.url}.`);
    this.emit('request', request, response);
  }
}

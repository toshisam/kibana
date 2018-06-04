/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { defaults } from 'lodash';
import { timefilter } from 'ui/timefilter';
export function executorProvider(Promise, $timeout) {

  const queue = [];
  let executionTimer;
  let ignorePaused = false;

  /**
     * Resets the timer to start again
     * @returns {void}
     */
  function reset() {
    cancel();
    start();
  }

  function killTimer() {
    if (executionTimer) { $timeout.cancel(executionTimer); }
  }

  /**
     * Cancels the execution timer
     * @returns {void}
     */
  function cancel() {
    killTimer();
    timefilter.off('update', killIfPaused);
    timefilter.off('fetch', reFetch);
  }

  /**
     * Registers a service with the executor
     * @param {object} service The service to register
     * @returns {void}
     */
  function register(service) {
    queue.push(service);
  }

  /**
     * Stops the executor and empties the service queue
     * @returns {void}
     */
  function destroy() {
    cancel();
    ignorePaused = false;
    queue.splice(0, queue.length);
  }

  /**
     * Runs the queue (all at once)
     * @returns {Promise} a promise of all the services
     */
  function run() {
    const noop = () => Promise.resolve();
    return Promise.all(queue.map((service) => {
      return service.execute()
        .then(service.handleResponse || noop)
        .catch(service.handleError || noop);
    }))
      .finally(reset);
  }

  function reFetch(_changes) {
    cancel();
    run();
  }

  function killIfPaused() {
    if (timefilter.getRefreshInterval().pause) {
      killTimer();
    }
  }

  /**
     * Starts the executor service if the timefilter is not paused
     * @returns {void}
     */
  function start() {
    timefilter.on('fetch', reFetch);
    timefilter.on('update', killIfPaused);
    if ((ignorePaused || timefilter.getRefreshInterval().pause === false) && timefilter.getRefreshInterval().value > 0) {
      executionTimer = $timeout(run, timefilter.getRefreshInterval().value);
    }
  }

  /**
     * Expose the methods
     */
  return {
    register,
    start(options = {}) {
      options = defaults(options, {
        ignorePaused: false,
        now: false
      });
      if (options.now) {
        return run();
      }
      if (options.ignorePaused) {
        ignorePaused = options.ignorePaused;
      }
      start();
    },
    run,
    destroy,
    reset,
    cancel
  };
}

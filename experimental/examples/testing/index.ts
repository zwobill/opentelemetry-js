/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DiagConsoleLogger, DiagLogLevel, diag } from '@opentelemetry/api';
import { logs, SeverityNumber } from '@opentelemetry/api-testing';
import {
  LoggerProvider,
  ConsoleLogRecordExporter,
  SimpleLogRecordProcessor,
} from '@opentelemetry/sdk-testing';

const api = require('@opentelemetry/api');
const tracer = require('./tracer')('example-http-server');
import { IncomingMessage, ServerResponse, createServer } from 'http';

/** Starts a HTTP server that receives requests on sample server port. */
function startServer(port: number) {
  // Creates a server
  const server = createServer(handleRequest);
  // Starts the server
  server.listen(port, (err: Error) => {
    if (err) {
      throw err;
    }
    console.log(`Node HTTP listening on ${port}`);
  });
}

/** A function which handles requests and send response. */
async function handleRequest(request: IncomingMessage, response: ServerResponse) {
  const currentSpan = api.testing.getCurrentCall();
  // display traceid in the terminal
  const traceId = currentSpan.spanContext().traceId;
  console.log(`traceId: ${traceId}`);
  const span = tracer.startSpan('handleRequest', {
    kind: 1, // server
    attributes: { key: 'value' },
  });
  // Annotate our span to capture metadata about the operation
  span.addEvent('invoking handleRequest');

  
  const body = [];
  request.on('error', (err) => console.log(err));
  request.on('data', (chunk) => body.push(chunk));
  request.on('end', () => {
    // deliberately sleeping to mock some action.
    setTimeout(() => {
      span.end();
      response.end('Hello World!');
    }, 2000);
  });

  await remoteHttpCall();

  // record the request and response
  span.record(request, response);
}

function remoteHttpCall(): Promise<String> {
  const span = tracer.startSpan('remoteHttpCall', {
    kind: 3, // client
    attributes: { key: 'value' },
  });
  span.addEvent('invoking remoteHttpCall');
  
  if (span.isReplaying()) {
    return span.loadFromRecording('');
  }

  // simulate some action
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello World!');
    }, 2000);
  });
}

startServer(8080);

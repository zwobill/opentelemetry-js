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

// import {
//     getGlobal,
//     registerGlobal,
//     unregisterGlobal,
//   } from '../internal/global-utils';
  
//   const API_NAME = 'mock';
  
  /**
   * Singleton object which represents the entry point to the OpenTelemetry Tracing API
   */
  export class MockAPI {
    private static _instance?: MockAPI;
  
    // private _proxyTracerProvider = new ProxyTracerProvider();
  
    /** Empty private constructor prevents end users from constructing a new instance of the API */
    private constructor() {}
  
    /** Get the singleton instance of the Mock API */
    public static getInstance(): MockAPI {
      if (!this._instance) {
        this._instance = new MockAPI();
      }
  
      return this._instance;
    }
  
    /**
     * Set the current global tracer.
     *
     * @returns true if the tracer provider was successfully registered, else false
     */
    // public setGlobalTracerProvider(provider: TracerProvider): boolean {
    //   const success = registerGlobal(
    //     API_NAME,
    //     this._proxyTracerProvider,
    //     DiagAPI.instance()
    //   );
    //   if (success) {
    //     this._proxyTracerProvider.setDelegate(provider);
    //   }
    //   return success;
    // }
  
    /**
     * Returns the global tracer provider.
     */
    // public getTracerProvider(): TracerProvider {
    //   return getGlobal(API_NAME) || this._proxyTracerProvider;
    // }
  
    /**
     * Returns a tracer from the global tracer provider.
     */
    // public getMocker(name: string, version?: string): Mocker {
    //   return this.getTracerProvider().getTracer(name, version);
    // }
  
    // /** Remove the global tracer provider */
    // public disable() {
    //   unregisterGlobal(API_NAME, DiagAPI.instance());
    //   this._proxyTracerProvider = new ProxyTracerProvider();
    // }
  
    // public wrapSpanContext = wrapSpanContext;
  
    // public isSpanContextValid = isSpanContextValid;
  
    // public deleteSpan = deleteSpan;
  
    // public getSpan = getSpan;
  
    // public getActiveSpan = getActiveSpan;
  
    // public getSpanContext = getSpanContext;
  
    // public setSpan = setSpan;
  
    // public setSpanContext = setSpanContext;
  }
  
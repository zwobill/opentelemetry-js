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

import {
  BatchObservableCallback,
  Counter,
  Histogram,
  MetricAttributes,
  MetricOptions,
  Observable,
  ObservableCounter,
  ObservableGauge,
  ObservableUpDownCounter,
  UpDownCounter,
} from './Metric';

/**
 * An interface describes additional metadata of a testing.
 */
export interface TestingOptions {
  /**
   * The schemaUrl of the Testing or instrumentation library
   */
  schemaUrl?: string;
}

/**
 * An interface to allow the recording and replay testing cases.
 *
 * {@link Metric}s are used for recording pre-defined aggregation (`Counter`),
 * or raw values (`Histogram`) in which the aggregation and attributes
 * for the exported metric are deferred.
 */
export interface Testing {
  /**
   * Creates and returns a new `Histogram`.
   * @param name the name of the metric.
   * @param [options] the metric options.
   */
  createHistogram<AttributesTypes extends MetricAttributes = MetricAttributes>(
    name: string,
    options?: MetricOptions
  ): Histogram<AttributesTypes>;

  /**
   * Creates a new `Counter` metric. Generally, this kind of metric when the
   * value is a quantity, the sum is of primary interest, and the event count
   * and value distribution are not of primary interest.
   * @param name the name of the metric.
   * @param [options] the metric options.
   */
  createCounter<AttributesTypes extends MetricAttributes = MetricAttributes>(
    name: string,
    options?: MetricOptions
  ): Counter<AttributesTypes>;

  /**
   * Creates a new `UpDownCounter` metric. UpDownCounter is a synchronous
   * instrument and very similar to Counter except that Add(increment)
   * supports negative increments. It is generally useful for capturing changes
   * in an amount of resources used, or any quantity that rises and falls
   * during a request.
   * Example uses for UpDownCounter:
   * <ol>
   *   <li> count the number of active requests. </li>
   *   <li> count memory in use by instrumenting new and delete. </li>
   *   <li> count queue size by instrumenting enqueue and dequeue. </li>
   *   <li> count semaphore up and down operations. </li>
   * </ol>
   *
   * @param name the name of the metric.
   * @param [options] the metric options.
   */
  createUpDownCounter<
    AttributesTypes extends MetricAttributes = MetricAttributes,
  >(
    name: string,
    options?: MetricOptions
  ): UpDownCounter<AttributesTypes>;

  /**
   * Creates a new `ObservableGauge` metric.
   *
   * The callback SHOULD be safe to be invoked concurrently.
   *
   * @param name the name of the metric.
   * @param [options] the metric options.
   */
  createObservableGauge<
    AttributesTypes extends MetricAttributes = MetricAttributes,
  >(
    name: string,
    options?: MetricOptions
  ): ObservableGauge<AttributesTypes>;

  /**
   * Creates a new `ObservableCounter` metric.
   *
   * The callback SHOULD be safe to be invoked concurrently.
   *
   * @param name the name of the metric.
   * @param [options] the metric options.
   */
  createObservableCounter<
    AttributesTypes extends MetricAttributes = MetricAttributes,
  >(
    name: string,
    options?: MetricOptions
  ): ObservableCounter<AttributesTypes>;

  /**
   * Creates a new `ObservableUpDownCounter` metric.
   *
   * The callback SHOULD be safe to be invoked concurrently.
   *
   * @param name the name of the metric.
   * @param [options] the metric options.
   */
  createObservableUpDownCounter<
    AttributesTypes extends MetricAttributes = MetricAttributes,
  >(
    name: string,
    options?: MetricOptions
  ): ObservableUpDownCounter<AttributesTypes>;

  /**
   * Sets up a function that will be called whenever a metric collection is
   * initiated.
   *
   * If the function is already in the list of callbacks for this Observable,
   * the function is not added a second time.
   *
   * Only the associated observables can be observed in the callback.
   * Measurements of observables that are not associated observed in the
   * callback are dropped.
   *
   * @param callback the batch observable callback
   * @param observables the observables associated with this batch observable callback
   */
  addBatchObservableCallback<
    AttributesTypes extends MetricAttributes = MetricAttributes,
  >(
    callback: BatchObservableCallback<AttributesTypes>,
    observables: Observable<AttributesTypes>[]
  ): void;

  /**
   * Removes a callback previously registered with {@link Testing.addBatchObservableCallback}.
   *
   * The callback to be removed is identified using a combination of the callback itself,
   * and the set of the observables associated with it.
   *
   * @param callback the batch observable callback
   * @param observables the observables associated with this batch observable callback
   */
  removeBatchObservableCallback<
    AttributesTypes extends MetricAttributes = MetricAttributes,
  >(
    callback: BatchObservableCallback<AttributesTypes>,
    observables: Observable<AttributesTypes>[]
  ): void;
}

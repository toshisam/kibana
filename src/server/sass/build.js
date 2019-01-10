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

import path from 'path';
import { promisify } from 'util';
import fs from 'fs';
import sass from 'node-sass';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import mkdirp from 'mkdirp';

const renderSass = promisify(sass.render);
const writeFile = promisify(fs.writeFile);
const mkdirpAsync = promisify(mkdirp);

export class Build {
  constructor(source, log, targetPath) {
    this.source = source;
    this.log = log;
    this.targetPath = targetPath;
    this.includedFiles = [source];
  }

  /**
   * Glob based on source path
   */

  async buildIfIncluded(path) {
    if (this.includedFiles && this.includedFiles.includes(path)) {
      await this.build();
      return true;
    }

    return false;
  }

  /**
   * Transpiles SASS and writes CSS to output
   */

  async build() {
    const rendered = await renderSass({
      file: this.source,
      outFile: this.targetPath,
      sourceMap: true,
      sourceMapEmbed: true,
      includePaths: [
        path.resolve(__dirname, '../..'),
        path.resolve(__dirname, '../../../node_modules')
      ]
    });

    const prefixed = postcss([ autoprefixer ]).process(rendered.css);

    this.includedFiles = rendered.stats.includedFiles;

    await mkdirpAsync(path.dirname(this.targetPath));
    await writeFile(this.targetPath, prefixed.css);

    return this;
  }
}

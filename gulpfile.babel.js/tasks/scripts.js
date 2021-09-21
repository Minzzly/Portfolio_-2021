/*
 * @title Scripts
 * @description A task to concatenate and compress js files via webpack.
 */

// Dependencies
import { src, dest, series } from 'gulp';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import plumber from 'gulp-plumber';
import errorHandler from '../util/errorHandler.js';

// Config
import { paths } from '../config';

// Task
export function scripts() {
  return src(paths.scripts.src)
    .pipe(plumber({ errorHandler }))
    .pipe(gulpWebpack(require('../webpack.config.js'), webpack))
    .pipe(dest(paths.scripts.dest));
}

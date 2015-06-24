import express from './express';
import path from 'path';

express({
  indexHtmlPath: path.join(__dirname, '/index.html')
});

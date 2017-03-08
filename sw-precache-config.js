module.exports = {
  staticFileGlobs: [
    'img/**.*',
    'offline.html',
    'shell.html',
    'js/**.js'
  ],
  runtimeCaching: [{
    urlPattern: '*',
    handler: (request, values, options) => {
      // If this is NOT a navigate request, such as a request for
      // an image, use the cacheFirst strategy.
      if (request.mode !== 'navigate') {
        return toolbox.cacheFirst(request, values, options);
      }

      return caches.match('/shell.html', {ignoreSearch: true});
    }
  }, {
    urlPattern: /cdn\.ampproject\.org/,
    handler: 'networkFirst'
  }],
  importScripts: ['service-worker-import.js']
};

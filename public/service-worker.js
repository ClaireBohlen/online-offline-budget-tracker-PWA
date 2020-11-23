//cache for no internet connection
const CACHE_NAME = "my-site-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

//Array of all the URLS
const urlsToCache = [
    "/",
    "/db.js",
    "/index.js",
    "/manifest.json",
    "/styles.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
  ];

  self.addEventListener("fetch", function(event) {
 
    if (event.request.url.includes("/api/")) {
      event.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache => {
  
          return fetch(event.request)
            .then(response => {
           
              if (response.status === 200) {
                cache.put(event.request.url, response.clone());
              }
  
              return response;
            })
  
         
            .catch(err => {
              
              return cache.match(event.request);
            });
        }).catch(err => console.log(err))
      );
  
      return;
    }


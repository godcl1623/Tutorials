// cache_name: 앱의 새 버전을 사용하기 위해 업데이트가 필요할 때 사용
// 수정 사항이 발생했을 때 서비스 워커 내에서 cache_name의 값을 변경하면 업데이트가 발생
// 새 서비스 워커가 설치되고 이전의 것이 사용하는 페이지가 없을 때까지 이전 서비스 워커가 작동
let CACHE_NAME = 'my-app-cache-v1';

const urlsToCache = [
  '/'
];

// install: 캐시 초기화, 오프라인 사용을 위한 파일 추가
/*
  캐시할 파일은 변수 할당을 통해 직접 설정할 수도, addAll 메소드로 특정 url 내 모든 파일을 대상으로 할 수도 있음
  ExtendableEvent.waitUntil: 메소드 내 코드가 실행될 때까지 서비스 워커 설치 유예, promise 반환
  caches: 서비스 워커 스코프 내에서 데이터 저장을 위해 주어진 특별한 객체
*/
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// fetch: 앱에서 HTTP 요청이 출발할 때마다 발생 - 요청을 가로채 커스텀 응답에 사용
/*
  사용례: 리소스가 캐시에 존재하는 한 네트워크 대신 캐시 사용, 파일이 캐시에 없을 때 파일을 먼저 추가함
  FetchEvent.respondWith: 앱, 네트워크 사이 프록시 서버로 기능하는 부분
    서비스 워커에 의해 준비 - 캐시에서 가져와 필요한 경우 수정
*/
// self.addEventListener('fetch', event => {
//   if (event.request.method === 'POST') return;
//   if (!(event.request.url.indexOf('http') === 0)) return;
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => {
//         console.log('[Service Worker] Fetching resources: ', event.request.url);
//         return response ||
//         fetch(event.request)
//           .then(response =>
//             caches.open(CACHE_NAME)
//               .then(cache => {
//                 console.log('[Service Worker] Caching new resources: ', event.request.url);
//                 cache.put(event.request, response.clone());
//                 return response;
//               })
//           )
//       })
//   );
// });

self.addEventListener('fetch', event => {
  if (event.request.method === 'POST' || event.request.method === 'PUT') return;
  if (!(event.request.url.indexOf('http') === 0)) return;
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        console.log('[Service Worker] Fetching resources: ', event.request.url);
        return response ||
        fetch(event.request)
          .then(response =>
            caches.open(CACHE_NAME)
              .then(cache => {
                console.log('[Service Worker] Caching new resources: ', event.request.url);
                cache.put(event.request, response.clone());
                return response;
              })
          )
          .catch(err => {
            const cache = caches.open(CACHE_NAME);
          })
      })
  );
});

// activate: 더 이상 필요하지 않은 오래된 캐시를 지우는데 사용
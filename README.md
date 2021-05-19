# Redmine Web Hook (Proxy)

* **author** : garam park

- gitea 에서 push 한 후에 redmine git repository 를 자동으로 업데이트 하기 위해서 만듦.
- gitea 와 redmine 의 repository file system 을 공유한다는 전제로 만들어졌음.

## environment 변수 설정

`.env.example` 파일을 확인하여 각 값을 설정할 수 있습니다.

* `SERVICE_HOST` (opt): redmine-webhook 이 동작하는 host
* `SERVICE_PORT` : redmine-webhook service port
 
* `REDMINE_URL` : 적용할 redmine 의 url
* `REDMINE_KEY` : `~/settings?tab=repositories` 에서 설정한 API 키 값

* `NODE_TLS_REJECT_UNAUTHORIZED` (opt): SSL 이 공증받았는 지 확인, default : 1. (자체인증 SSL 등 이면 `0` 으로 설정)

## 호출 방법

`redmine-webhook` 배포 후에 http request를 보낸다.

get method, query params 에 id 값을 프로젝트 id 로 주면 해당 프로젝트 id 의 저장소를 업데이트 한다.
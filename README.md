# design-patterns

디자인 패턴 스터디 (주교재 : https://refactoring.guru/ko/design-patterns)


---
## 대상 (22)

- 생성 패턴 (5)
- 구조 패턴 (7)
- 행동 패턴 (10)


---
## 진행방식

- 개요 정리 + 사용사례(발췌 or 직접작성)
  - 개요 정리
    - 해결하고자 하는 문제 + 문제해결 아이디어 + 코드 (tobe only)

  - 사용사례 (asis → tobe)
    - 발췌 : 책/유튜브/블로그/github 등 다양한 소스에서 찾아보기 (개요와 연결할 사례를 찾는게 목적)
    - 직접작성 : 직접 문제사례 정의 + 패턴적용 개선 (찾기에 너무 애매한 내용일때)


---
## 스터디 일정

- 4/9일요일 ~ ? (?주)
  - 21:00 ~ 22:30

- 2명 4주목표 인 경우  =>  4주
  - 22패턴 ÷4주 ÷2명
  - 1주 1명당 3패턴씩 (6+6+6+4)
  - 첫주는 min1 ~ max3 로 찍먹해보기..??? (난이도 체험한 후 일정 재조정)

- 22패턴 ÷1주2개 ÷2명  =>  6주
  - 1주 1명당 2패턴씩 (4 +4 +4 +4 +4 +2)



---
## 파일명 규칙

- 카테고리 폴더 : creational / structural / behavioral
- 폴더명 : `{패턴 영문명}/`
- 파일명 : `{패턴 영문명}.md`
  - 영어 소문자 사용
- 예시)
  ```
  behavioral/
  creational/
    factory-method/
      factory-method.md
      image1.png
      image2.png
    abstract-factory/
    builder/
    ...
  structural/
  ```



---
## 목차



### 행동 패턴
| Title | Author | Date |
| ----------- | ----- | ---- |
|[Command 패턴](./behavioral/command/command.md)|[안바울](https://github.com/anpaul0615)|2023. 4. 9.|
|[반복자 패턴](./behavioral/iterator/iterator.md)|[조예진](https://github.com/ooooorobo)|2023. 4. 9.|
|[State 패턴](./behavioral/state/state.md)|[안바울](https://github.com/anpaul0615)|2023. 4. 16.|
|[비지터 패턴](./behavioral/visitor/visitor.md)|[조예진](https://github.com/ooooorobo)|2023. 4. 23.|
|[Strategy 패턴](./behavioral/strategy/strategy.md)|[안바울](https://github.com/anpaul0615)|2023. 5. 1.|
|[책임 연쇄 패턴](./behavioral/chain-of-responsibility/chain-of-responsibility.md)|[박성현](https://github.com/pshdev1030)|2023. 5. 3.|
|[옵저버 패턴](./behavioral/observer/observer.md)|[박성현](https://github.com/pshdev1030)|2023. 5. 7.|
|[Template-method pattern](./behavioral/template-method/template-method.md)|[박성현](https://github.com/pshdev1030)|2023. 5. 28.|
|[중재자 패턴](./behavioral/mediator/mediator.md)|[조예진](https://github.com/ooooorobo)|2023. 6. 6.|
|[옵저버 패턴](./behavioral/observer/observer-yj.md)|[조예진](https://github.com/ooooorobo)|2023. 6. 6.|,

### 생성 패턴
| Title | Author | Date |
| ----------- | ----- | ---- |
|[빌더 패턴](./creational/builder/builder.md)|[조예진](https://github.com/ooooorobo)|2023. 5. 1.|
|[싱글턴 패턴](./creational/singleton/singleton.md)|[조예진](https://github.com/ooooorobo)|2023. 5. 21.|
|[프로토타입 패턴](./creational/prototype/prototype.md)|[조예진](https://github.com/ooooorobo)|2023. 5. 28.|
|[추상 팩토리 패턴](./creational/abstract-factory/abstract-factory.md)|[조예진](https://github.com/ooooorobo)|2023. 6. 6.|
|[팩토리 메서드 패턴](./creational/factory-method/factory-method.md)|[조예진](https://github.com/ooooorobo)|2023. 6. 6.|,

### 구조 패턴
| Title | Author | Date |
| ----------- | ----- | ---- |
|[복합체 패턴](./structural/composite/composite.md)|[조예진](https://github.com/ooooorobo)|2023. 4. 16.|
|[Decorator 패턴](./structural/decorator/decorator.md)|[안바울](https://github.com/anpaul0615)|2023. 4. 23.|
|[Adapter 패턴](./structural/adapter/adapter.md)|[안바울](https://github.com/anpaul0615)|2023. 5. 21.|
|[Proxy 패턴](./structural/proxy/proxy.md)|[안바울](https://github.com/anpaul0615)|2023. 5. 28.|
|[Bridge 패턴](./structural/bridge/bridge.md)|[박성현](https://github.com/pshdev1030)|2023. 5. 28.|
|[Facade 패턴](./structural/facade/facade.md)|[조예진](https://github.com/ooooorobo)|2023. 6. 6.|

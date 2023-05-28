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

### behavioral

- [chain-of-responsibility](./behavioral/chain-of-responsibility/chain-of-responsibility.md)
- [command](./behavioral/command/command.md)
- [iterator](./behavioral/iterator/iterator.md)
- [mediator](./behavioral/mediator/mediator.md)
- [observer-yj](./behavioral/observer/observer-yj.md)
- [observer](./behavioral/observer/observer.md)
- [state](./behavioral/state/state.md)
- [strategy](./behavioral/strategy/strategy.md)
- [template-method](./behavioral/template-method/template-method.md)
- [visitor](./behavioral/visitor/visitor.md)

### creational

- [abstract-factory](./creational/abstract-factory/abstract-factory.md)
- [builder](./creational/builder/builder.md)
- [factory-method](./creational/factory-method/factory-method.md)
- [prototype](./creational/prototype/prototype.md)
- [singleton](./creational/singleton/singleton.md)

### structural

- [adapter](./structural/adapter/adapter.md)
- [bridge](./structural/bridge/bridge.md)
- [composite](./structural/composite/composite.md)
- [decorator](./structural/decorator/decorator.md)
- [facade](./structural/facade/facade.md)
- [proxy](./structural/proxy/proxy.md)

# 책임 연쇄 패턴

## 개요

책임 연쇄 패턴은 핸들러들의 체인(사슬)을 따라 요청을 전달할 수 있게 해주는 행동 디자인 패턴이다.

각 핸들러는 요청을 받으면 요청을 처리할지 아니면 체인의 다음 핸들러로 전달할지를 결정한다.

## 해결하고자 하는 문제

어플리케이션에선 요청 순서가 정해진 로직이 있는 경우가 있다.
<img src="https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/problem1-ko-2x.png?id=3c121f18651118d1f87703b80b7a6717" alt="요청 순서가 정해진 로직">

요청 순서가 정해진 로직의 경우 실패하면 다음 순서를 진행할 이유가 없다.

요청 순서가 정해진 로직의 경우 이전 실행의 결과 혹은 순서에 영향을 받게 된다. 이는 요청을 처리하는 객체간의 결합도가 높아지는 것을 의미한다.

<img src="https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/problem2-ko-2x.png?id=1c8aeab6ceee85b6bb4d10a9470febf8" alt="거대한 객체">

만약 요청을 처리하는 로직이 집중된 객체가 있다면 추가 혹은 삭제, 수정하기 더욱 어려워진다.
요청을 처리하는 객체 하나를 수정할 때 다른 객체들도 수정해야 할 수 있기 때문이다.

## 해결방안

<img src="https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/solution1-ko-2x.png?id=d36782ad64bf8aa8369e185a36869ec4" alt="책임 연쇄 패턴">

객체간 결합도를 줄이기 위해 특정 행동들을 핸들러라는 독립 실행형 객체들로 변환할 수 있다.
이러한 순서가 있는 로직들을 핸들러간 참조를 통해 핸들러에서 요청을 처리한 뒤 다음 핸들러에게 요청을 전달하는 형태로 수정할 수 있다.

다음 순서를 진행할지 말지 결정하는 권한이 핸들러에게 있기 때문에 핸들러에서 다른 핸들러에게 전달하지 않고 추가 처리를 사실 상 중지할 수 있다.

<img src="https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/solution2-ko-2x.png?id=a046b0c919f5b079294e2e2437f9cbff" alt="핸들러 변형">

해당 패턴의 변형으로 요청을 처리할 핸들러가 있을 때 까지 다음 핸들러에게 전달하는 경우도 있다.

## UML

<img src="https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/structure-indexed-2x.png?id=4f27e2c48e635f45a78472d707a8df3c" alt="책임 연쇄 패턴">

1. 핸들러는 모든 구상 핸들러에 공통된 인터페이스를 선언한다.
   요청을 처리하기 위한 단일 메서드를 포함하고 때로는 체인의 다음 핸들러를 세팅하기 위한 메서드가 있을 수 있다.

2. 기초 핸들러는 선택적 클래스이며, 모든 핸들러 클래스들에 공통적인 상용구 코드를 넣을 수 있다. 일반적으로 핸들러에 대한 참조를 저장하기 위한 필드를 정의한다. 핸들러를 이전 핸들러의 생성자 혹은 setter에 전달하여 체인을 구축한다.

3. 구상 핸들러에는 요청을 처리하기 위한 실제 코드가 포함되어 있다. 그리고 어떻게 체인을 따라 전달할지를 결정할 수 있다.

4. 클라이언트는 앱의 로직에 따라 체인들을 한 번만 구성하거나 동적으로 구성할 수 있다.

## 사용 예시

다음과 같은 사용 예시가 있다.

### 미들웨어

### nest의 pipe and filter

HTTP 요청에 대해 변환하거나 검증하는데에 사용된다.

https://docs.nestjs.com/pipes

https://learn.microsoft.com/ko-kr/azure/architecture/patterns/pipes-and-filters

### axios interceptor

axios에서도 요청과 응답을 가로채기 위해 interceptor를 사용할 수 있다.

요청과 응답을 가로채 처리하고 다음 interceptor에게 전달하거나 HTTP 요청을 보낸다.

https://axios-http.com/kr/docs/interceptors

# 중재자 패턴

중재자(mediator) 패턴은 객체 간의 `혼란스러운 의존 관게들을 줄일 수 있는 디자인 패턴`이다.
이 패턴은 객체 간의 직접 통신을 제한하고 중재자 객체를 통해서만 협력하도록 한다.

## 해결하고자 하는 문제

어플리케이션에선 각 컴포넌트(객체,클래스)가 서로 다른 역할을 가지고 있으며 다른 컴포넌트와 상호작용하며 기능을 수행한다.

하지만 컴포넌트들이 서로 직접적으로 상호작용하게 되면 컴포넌트 간 결합도가 높아져서 유지보수가 어려워지거나 컴포넌트를 재사용하기 힘들어질 수 있다.

<img src="https://refactoring.guru/images/patterns/diagrams/mediator/problem1-ko-2x.png"/>

## 해결방안

중재자 패턴은 다음과 같이 서로 독립적으로 동작해야 하는 컴포의 모든 직접적인 상호작용을 중단한 후, 이러한 호출들을 적절한 컴포넌트들로 리다이렉션 하는 중재자 객체를 만들어 이러한 상호작용을 중재자에서 모두 처리하도록 한다.

이렇게 되면 컴포넌트들은 여러개의 컴포넌트와 결합되는 대신 단일 중재자 클래스에만 의존하게 된다.

이렇게 중간에 중재자 클래스를 만들게 되면, 컴포넌트간 데이터 교환 로직은 없애고 복잡한 데이터 검증과 같은 로직등은 중재자에게 위임하고 컴포넌트는 단순히 중재자에게 다른 컴포넌트들에게 해당 요소들에 발생하는 일을 알려달라는 메소드를 호출하는 것으로 역할을 나눌 수 있다.

즉 중재자는 단일 중자자 객체 내부의 다양한 객체간의 복잡한 관계망을 캡슐화 할 수 있다.

<img src="https://refactoring.guru/images/patterns/diagrams/mediator/solution1-ko-2x.png"/>

## UML

<img src="https://refactoring.guru/images/patterns/diagrams/mediator/structure-indexed-2x.png"/>

UML에서 각 객체들은 다음과 같은 속성을 가지고 있다.

### 컴포넌트

컴포넌트들은 어떤 비즈니스 로직을 포함한 다양한 클래스들이다.
각 컴포넌트들은 중재자에 대한 참조를 가지고 있다.
컴포넌트는 중재자의 실제 클래스를 인식하지 못하기 떄문에, 컴포넌트를 다른 중자재에 연결하여 다른 프로그램에서 재사용 할 수 있다.

### 중재자

일반적으로 단일 알람 메서드만을 포함하는 컴포넌트들간의 통신 메서드를 선언한 인터페이스이다.
컴포넌트들은 이 메서드의 인수로 어떠한 데이터든 전달할 수 있지만, 이는 수신자와 발신자간의 결합이 발생하지 않는 방식으로만 가능하다.

### 구상 중재자

중재자 인터페이스의 구현체로 다양한 컴포넌트간의 관계를 캡슐화한다. 구상 중재자들은 자신이 관리하는 모든 컴포넌트에 대한 참조를 유지하고, 때로는 그들의 생명주기를 관리하기도 한다.

## 주의해야할 점

1. 컴포넌트들은 다른 컴포넌트들에 대해서 몰라야 한다.
   컴포넌트 내에서 또는 컴포넌트 간 중요한 일이 발생하면 컴포넌트들은 이를 중재자에게만 알려야한다.

## 예시 코드

```ts
interface Mediator {
  notify(sender: object, event: string): void;
}

class ConcreteMediator implements Mediator {
  private component1: Component1;
  private component2: Component2;

  constructor(c1: Component1, c2: Component2) {
    this.component1 = c1;
    this.component1.setMediator(this);
    this.component2 = c2;
    this.component2.setMediator(this);
  }

  public notify(sender: object, event: string): void {
    if (event === "A") {
      console.log("Mediator reacts on A and triggers following operations:");
      this.component2.doC();
    }

    if (event === "D") {
      console.log("Mediator reacts on D and triggers following operations:");
      this.component1.doB();
      this.component2.doC();
    }
  }
}

class BaseComponent {
  protected mediator: Mediator;

  constructor(mediator?: Mediator) {
    this.mediator = mediator!;
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

class Component1 extends BaseComponent {
  public doA(): void {
    console.log("Component 1 does A.");
    this.mediator.notify(this, "A");
  }

  public doB(): void {
    console.log("Component 1 does B.");
    this.mediator.notify(this, "B");
  }
}

class Component2 extends BaseComponent {
  public doC(): void {
    console.log("Component 2 does C.");
    this.mediator.notify(this, "C");
  }

  public doD(): void {
    console.log("Component 2 does D.");
    this.mediator.notify(this, "D");
  }
}

const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);

console.log("Client triggers operation A.");
c1.doA();

console.log("");
console.log("Client triggers operation D.");
c2.doD();
```

실행 결과

```
Client triggers operation A.
Component 1 does A.
Mediator reacts on A and triggers following operations:
Component 2 does C.

Client triggers operation D.
Component 2 does D.
Mediator reacts on D and triggers following operations:
Component 1 does B.
Component 2 does C.
```

## 헷갈렸던 점

Flux 패턴은 Mediator 패턴이 아닐지 헷갈렸다.

React에서 상태관리를 위해 사용하는 Flux 패턴의 대표적인 구현체인 Redux는 전역 State를 Store에 두고 각 컴포넌트에선 Action을 호출해서 State를 변경한다.
그리고 이에 대한 변경사항 처리는 Reducer에서 수행한다.

UML은 다음과 같다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FMX0QN%2FbtrvJZqlrdP%2FZY4L7U2NaKWsdLkhFPDxFk%2Fimg.png"/>

컴포넌트간 직접 상호작용 하지 않고 컴포넌트는 단순히 Action을 호출하고 Store와 리듀서에서 변경을 만들고 렌더링을 트리거 하는 방식이 Mediator + Observer 패턴이 아닐까 생각했다.

하지만 Flux 패턴은 Mediator 패턴이 아니다.

정확하게는 Store는 컴포넌트간 상호작용을 중재하는 역할을 하지만 Flux는 다음과 같은 이유로 Mediator 패턴이 아니다.

### 데이터 흐름의 차이

Mediator 패턴에서는 중재자가 컴포넌트간 일대일,일대다 상호작용을 중재하지만 Flux는 데이터의 단방향 바인딩을 강제한다.

Flux에서 Action을 호출하여 Store의 State를 변경하였다면, Store로부터 해당 데이터를 사용하는 컴포넌트로의 전달이 강제된다.

이처럼 설계한 이유는 Flux는 데이터의 단방향 바인딩을 강제하여 데이터의 일관성과 추적을 쉽게 하기 위한 패턴이기 때문이다.

### 구조의 차이

위에서 언급한 데이터 흐름의 차이로 인해 구조의 차이 또한 발생하는데,

Flux 는 데이터의 단방향 바인딩 강제라는 특징으로 인해 객체간 상호작용을 중재하는 구상 중재자가 존재하지 않는다.

state를 업데이트하고, 데이터 전달을 강제할 뿐이다.

### 정리

정리하자면 Mediator 패턴은

Flux 패턴은 Store와 Action을 사용하여 컴포넌트간 상호작용을 캡슐화하는 역할은 하지만, Mediator 패턴보다 훨씬 구체적이고 상세하다.

## 예시

mediator pattern을 사용하는 다음과 같은 예시들이 있다.

### Event Driven Architecture

이벤트 기반 아키텍쳐(Event Driven Architecture)를 설계할 때도 많이 쓰인다.

이벤트 중재자를 두어, 이벤트를 수신하여 특정 비즈니스 로직을 실행한다.

이벤트 중재자에서 객체간 작업 순서에 대해 조율할 수 있기 때문에 실행할 비즈니스 로직을 여러 단계로 나누어야 할 때 유용하다.

https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch02.html

### DOM Event

[Event mdn](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Building_blocks/Events)DOM에는 이벤트 버블링이라는 개념과 이벤트 버블링을 이용한 이벤트 위임이라는 개념이 있다.

노드 각각이 이벤트 핸들러와 직접 연결되지 않고, 상위요소에서 이벤트 핸들러와 각 노드 사이의 연결을 중재한다는 점에서 DOM의 이벤트 위임도 중재자 패턴이라고 할 수 있다.

예시로 리액트에선 다음과 같은 이벤트 아키텍쳐[https://ko.legacy.reactjs.org/blog/2020/10/20/react-v17.html#changes-to-event-delegation]를 사용하고 있다.

### MVVM

View Model이 중재자의 역할을 하고있다.

https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel

### Micro Service(Kafka)

대규모 분산시스템에서도 시스템간 연결이나 상호작용을 추적하고, 결합을 줄이기 위해 사용한다.

https://ducmanhphan.github.io/2020-05-15-Understanding-about-Kafka/

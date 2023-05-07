# 옵저버 패턴

## 개요

옵저버 패턴은 객체간의 일대다 의존성을 정의하는 행동 디자인 패턴이다.
어떤 객체의 상태가 변경되었을 때, 이를 관찰하는 다른 객체들에게 알리고, 그에 따른 처리를 할 수 있게 해주는 패턴이다.

## 해결하고자 하는 문제

<img src="https://refactoring.guru/images/patterns/content/observer/observer-comic-1-ko-2x.png" alt="옵저버 패턴이 해결하고자 하는 문제">

예시가 너무 적절해서 가지고 왔습니다.

```
Customer​(손님) 및 Store​(가게)​라는 두 가지 유형의 객체들이 있다고 가정합니다.
손님은 곧 매장에 출시될 특정 브랜드의 제품​(예: 새 아이폰 모델)​에 매우 관심이 있습니다.

손님은 매일 매장을 방문하여 제품 재고를 확인할 수 있으나, 제품이 매장에 아직 운송되는 동안 이러한 방문 대부분은 무의미합니다.

반면 매장에서는 새로운 제품이 출시될 때마다 모든 고객에게 스팸으로 간주할 수 있는 수많은 이메일을 보낼 수 있습니다. 이 수많은 이메일은 일부 고객들을 신제품 출시 확인을 위한 잦은 매장 방문으로부터 구출해낼 수 있으나, 동시에 신제품 출시에 관심이 없는 다른 고객들을 화나게 할 것입니다.

여기서 충돌이 발생합니다. 손님들이 신제품 출시 확인을 위해 시간을 낭비하든지, 매장들이 알림을 원하지 않는 고객들에게 신제품 출시를 알리며 자원을 낭비해야 합니다.
```

이는 매장에서 관심이 있는 손님들에게만 이메일을 보내는 방식으로 해결할 수 있다.

## 해결방안

<img src="https://refactoring.guru/images/patterns/diagrams/observer/solution1-ko-2x.png" alt="옵저버 패턴 구독">

위에서 언급했듯이 변경될 수 있는 중요한 상태를 가진 쪽에서 상태 변경에 대해 다른 객체들이 적절한 처리를 할 수 있도록 알림을 보내면 된다.

즉 구독과 구독 취소 메커니즘을 추가하여, 중요한 이벤트가 발생할 때 마다 객체들에 있는 특정 메서드를 호출하여 해결할 수 있다.

<img src="https://refactoring.guru/images/patterns/diagrams/observer/solution2-ko-2x.png" alt="옵저버 패턴 인터페이스">

여기서 결합도를 낮추기 위해 모든 구독자가 같은 인터페이스를 구현하는 것이 매우 중요하다.
즉 알림과 어떤 컨텍스트 데이터를 전달하는 데에 사용할 수 있는 매개변수들의 집합과 알림 메서드를 선언해야 한다.

해결 예시를 통해 옵저버 패턴이 해결하려는 문제를 좀 더 일반적으로 정의할 수 있다.

1. 객체간의 의존성 문제

객체 A가 객체 B의 상태변화에 의존하고 있을 때, 객체 A와 B를 강하게 결합시켜서 구현하면 유연성이 떨어진다. 이를 해결하기 위해 객체 A를 B의 옵저버로 등록하여 B가 상태를 변경할 때 B에서 A의 메서드를 호출해주면 된다.

2. 상태변화를 어떻게 다수의 객체에게 알릴지에 대한 문제

객체 B의 상태가 변경되었을 때 이를 다수의 객체에게 알리는 것은 매우 번거롭다. 옵저버 패턴을 적용해서 다수의 객체의 메서드를 호출하는 방식으로 구현할 수 있다.

## UML

<img src="https://refactoring.guru/images/patterns/diagrams/observer/structure-indexed-2x.png" alt="옵저버 패턴 UML">

1. Publisher는 Publisher가 상태를 전환하거나 어떤 행동들을 실행할 때 다른 객체들에게 알린다. 출판사들에는 구독인터페이스가 있어 새로운 객체를 리스트에 추가하고 제거할 수 있다.

2. Subscriber는 Publisher의 상태가 변경될 때의 알림 인터페이스를 선언한다. 대부분의 경우 단일 update 메서드로 구성된다. 이 메서드에는 Publisher가 이벤트와 여러 매개변수를 전달할 수 있도록 하는 매개변수가 있을 수 있다.

3. Concrete Subscribers들은 실제 update 메서드를 구현한다. 즉 Publisher가 보낸 알림들에 대한 응답으로 몇 가지 작업을 수행합니다. 이러한 모든 클래스는 Publisher가 Concrete Subscribers들과 결합하지 않도록 같은 인터페이스(update,update의 parameter)를 구현해야 한다.

4. Client는 Publisher와 Subscriber를 생성 후 연결한다.

## 사용 예시

다음과 같은 사용 예시가 있다.

### Mobx

Mobx에서는 observe를 사용할 수 있다.

```js
import { observable, observe } from "mobx";

const person = observable({
  firstName: "Maarten",
  lastName: "Luther",
});

// Observe all fields.
const disposer = observe(person, (change) => {
  console.log(
    change.type,
    change.name,
    "from",
    change.oldValue,
    "to",
    change.object[change.name]
  );
});

person.firstName = "Martin";
// Prints: 'update firstName from Maarten to Martin'

// Ignore any future updates.
disposer();

// Observe a single field.
const disposer2 = observe(person, "lastName", (change) => {
  console.log("LastName changed to ", change.newValue);
});
```

https://mobx.js.org/intercept-and-observe.html#observe

### 브라우저의 이벤트 핸들러

```js
window.addEventListener("click", () => console.log("click"));
window.addEventListener("click", () => console.log("click2"));
```

브라우저의 이벤트 핸들러도 일종의 옵저버 패턴이다. window(DOM Element)객체에 이벤트와 핸들러를 등록하고, 이벤트가 발생할 때 마다 등록된 콜백을 실행한다.

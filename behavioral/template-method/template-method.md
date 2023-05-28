# Template-method pattern

## 개요

템플릿 메서드는 부모 클래스에서 알고리즘의 골격을 정의하고, 자식 클래스들이 이 알고리즘의 구조를 변경하지 않고 알고리즘의 특정 단계들을 재정의 할 수 있도록 하는 행동 디자인 패턴이다.

## 해결하고자 하는 문제

문서들을 분석하여 데이터를 추출하는 앱이 있다고 가정하면, 다양한 형식의 문서들에서 데이터를 추출할 수 있도록 해야한다.

<img src="https://refactoring.guru/images/patterns/diagrams/template-method/problem-2x.png?id=fc8b434afec7b6135043d0d2f48189f0" alt="예시 이미지">

PDF,DOC,CSV 등의 다양한 형식에서 데이터를 추출하는 클래스를 만들 경우, 각 클래스들에는 중복되는 코드가 많게 된다. 다양한 데이터 형식들을 처리하는 코드는 클래스마다 다르지만 데이터 처리 및 분석을 위한 코드는 거의 같기 때문이다.

## 해결책

알고리즘을 일련의 단계들로 나누고, 이러한 단계들을 메서드로 변한한 뒤, 단일 템플릿 메서드 내부에 이러한 메서드들에 대한 일련의 호출을 넣는다. 그리고 이를 클래스로 구현한다.

서브클래스는 모든 abstract 단계를 구현해야 하며 템플릿 메서드를 제외한 메서드들의 일부를 오버라이드 해서 확장할 수 있다.

<img src="https://refactoring.guru/images/patterns/diagrams/template-method/solution-ko-2x.png?id=100524477c04daae219a201c35478ea2" alt="해결책">

또한 훅(hook)이라는 메서드도 있다. 훅은 알고리즘의 중요한 단계들의 전 후에 배치되어 자식클래스들에 알고리즘에 대한 추가 확장 지점을 제공한다.

정리하자면 템플릿 메서드 패턴은 다음과 같은 문제를 해결하기 위해 사용한다.

- 전체적인 알고리즘의 구조를 일관되게 유지하기 위해
- 중복 코드를 제거하고 재사용성을 높이고 싶을 때
- 서브클래스에서 알고리즘의 특정 단계를 변경하거나 확장하기위해

## UML

<img src="https://refactoring.guru/images/patterns/diagrams/template-method/structure-indexed-2x.png?id=86f28789cdcc5a4c415d6a1100de56fc" alt="템플릿 메서드 패턴 UML">

## 예시 코드

```ts
class AbstractClass {
  templateMethod() {
    this.operation1();
    this.subOperation1();
    this.operation2();
    this.hook();
  }

  operation1() {
    console.log("AbstractClass: operation1");
  }

  operation2() {
    console.log("AbstractClass: operation2");
  }

  hook() {}
}

class ConcreteClass extends AbstractClass {
  subOperation1() {
    console.log("ConcreteClass: subOperation1");
  }

  hook() {
    console.log("ConcreteClass: hook");
  }
}
```

### 추상클래스

알고리즘의 단계들의 역할을 하는 메서드를 선언하며, 이러한 메서드를 특정 순서로 호출하는 실제 템플릿 메서스도 선언한다. 단계들은 abstract로 선언되거나 디폴트 구현을 갖는다.

### 구상클래스

모든 단계들을 오버라이드 할 수 있지만 템플릿 메서드 자체는 오버라이드 할 수 없다.

## 사용예시

### Reactjs의 라이프사이클

https://ko.legacy.reactjs.org/docs/react-component.html

### HTTP Servlet

https://github.com/javaee/servlet-spec/blob/master/src/main/java/javax/servlet/http/HttpServlet.java

# 추상 팩토리 패턴

추상 팩토리 패턴에 대해 정리해보았다.

## 추상 팩토리 패턴이란?

관련 객체들의 구상 클래스들을 지정하지 않고도 관련 객체들의 모음을 생성할 수 있도록 하는 생성패턴이다.

즉 추상화된 팩토리와 제품 인터페이스를 정의하고 이를 구현하는 팩토리와 제품 클래스들을 정의한다.

즉 제품간의 일관성을 유지하고 "함께" 생성되는 객체를 관리하는데에 사용된다.

## UML

<img src="https://refactoring.guru/images/patterns/diagrams/abstract-factory/structure.png"/>

URL을 보면 Abstract Factory라는 기초 인터페이스를 정의한다. 또한 팩토리에서 생성할 제품들도 각각 인터페이스를 정의한다.

그 후 ConcreteFactory1과 ConcreteFactory2에서 이 인터페이스를 구현한다.

제품군의 인터페이스를 정의하고 제품의 인터페이스도 정의하여 각 팩토리마다 다양한 변형의 제품, 제품군을 구현하기 때문에, 팩토리의 팩토리 패턴이라고 볼 수도 있을 것 같다.

## 해결하고자 하는 문제

여러 제품들의 집합으로 제품군을 구성할 때 각각의 제품이 제품군 안에서의 제품간의 연관성을 해치지 않도록 해야한다.

즉 제품군 안에서 제품들의 일관성을 보장하고자 한다.

팩토리를 사용하여 제품군을 클라이언트에게 반환하기 때문에 객체 생성 또한 클라이언트 로직으로부터 분리할 수 있다.

또한 유연하게 확장할 수 있다.

추상팩토리 인터페이스에 새로운 변형이 추가될 때에도 유연하게 확장할 수 있고, 새로운 제품이 추가될 때에도 유연하게 추가할 수 있다.

## 주의해야할 점

해결하고자 하는 문제에서 파생되는 여러 주의해야할 점들이 있다.

1. 클라이언트는 팩토리의 구상클래스(제품)들에 대해 신경을 쓰지 않아도 되어야 한다.
   즉 클라이언트에서는 제품의 어떤 변형을 생성할지 알 필요가 없고, 잘못 생성될까 걱정할 필요도 없다.
   그리고 클라이언트 입장에서 모든 제품을 같은 방식으로 생성해야 한다.

2. 추상 팩토리 패턴은 클라이언트 코드와 객체 생성 코드를 분리하고 같이 생성되어야 하는 객체들의 일관성을 보장하고자 한다.
   즉 제품군에 해당하는 기초 인터페이스를 정의하고 이에 대해 다양한 변형을 만들 때, 항상 제품군(객체들의 집합) 단위로 호환되어야 한다.
   한 변형의 제품들은 다른 변형의 제품들과 호환되지 않는다. 이는 제품간의 일관성을 해치는 행위이다.

## 해결책

```ts
// 추상팩토리 인터페이스를 정의한다.
// 즉 각각 다른 제품들을 반환하는 메서드의 집합을 선언한다.
// 각 제품들에는 여러 변형이 있을 수 있지만, 한 변형의 제품들은 다른 변형의 제품들과 호환되지 않는다.
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// 윈도우에 사용되는 ui 제품군이다.
// 구상 팩토리는 단일 변형에 속하는 제품군을 생성한다.
// 이 팩토리는 제품들의 호환을 보장한다.
class WinFactory implements GUIFactory {
  createButton(): Button {
    return new WinButton();
  }
  createCheckbox(): Checkbox {
    return new WinCheckbox();
  }
}

// 맥에 사용되는 ui 제품군이다.
class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }
  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}
interface Button {
  paint(): void;
}

class WinButton implements Button {
  paint(): void {
    // 윈도우 스타일의 버튼
  }
}

class MacButton implements Button {
  paint(): void {
    // 맥 스타일의 버튼
  }
}

interface Checkbox {
  paint(): void;
}

class WinCheckbox implements Checkbox {
  paint(): void {}
}

class MacCheckbox implements Checkbox {
  paint(): void {}
}
```

클라이언트 코드는 다음과 같다.

```ts
//팩토리만 생성해서 하위 ui 제품들의 일관성을 보장하며 생성할 수 있다.
class Application {
  private factory: GUIFactory;
  private button: Button;
  private checkBox: Checkbox;

  constructor(factory: GUIFactory) {
    this.factory = factory;
  }

  createUI(): void {
    this.button = this.factory.createButton();
    this.checkbox = this.factory.createCheckbox();
  }

  paint(): void {
    this.button.paint();
  }
}

class ApplicationConfigurator {
  main(): void {
    const config = readApplicationConfigFile();

    let factory: GUIFactory;

    if (config.OS === "Windows") {
      factory = new WinFactory();
    } else if (config.OS === "Mac") {
      factory = new MacFactory();
    } else {
      throw new Error("Error! Unknown operating system.");
    }

    const app = new Application(factory);
  }
}
```

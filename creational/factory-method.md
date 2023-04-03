## 개요 정리

팩토리메서드 패턴에 대해 정리해보았다.

### 팩토리 메소드 패턴이란?

부모 클래스에서 객체들을 생성할 수 있는 인터페이스를 제공하지만, 자식 클래스들이 생성될 객체의 유형을 변경할 수 있도록 하는 생성 패턴이다.

### 해결하고자 하는 문제

클래스의 인스턴스를 생성하는 코드와 생성된 클래스의 인스턴스를 사용하는 코드와 결합되어 있다면 확장이 어렵다.

만약 어플리케이션에서 border: 1px solid red를 가지는 버튼을 생성한다고 정하고 어플리케이션의 모든 버튼에 대해 다음과 같이 작성하였다고 생각해보자.

```tsx
const Component = () => {
  // ...logic
  return (
    // ...JSX
    <button
      style={{ border: "1px solid red" }}
      onClick={() => console.log("click")}
    >
      {children}
    </button>
  );
};
```

만약 UI가 변경되거나 어플리케이션에 다양한 디자인의 버튼이 추가된다면 일일히 해당하는 부분을 찾아서 고쳐야 한다.

### 해결책

버튼이라는 큰 카테고리 아래서, 어떤 type에 따라 다른 ui의 버튼을 생성하도록 추상화할 수 있다.

이렇게 어떤 버튼을 생성할지 Button 컴포넌트에게 위임하고 해당 로직을 추상화하면 다른 ui의 버튼을 추가할 때는 ButtonProps의 type을 추가하고 해당 유형에 맞는 버튼을 추가해주면 된다.

변경이 있을 시에도 단순하게 Button의 type prop만 변경해주면 된다.

```tsx
type ButtonProps = {
  type: "redBorder" | "blueBorder" | "redDotted" | "blueDotted";
  handleClick: () => void;
  children: ReactNode;
};

const Button = ({ type = "redBorder", handleClick, children }: ButtonProps) => {
  switch (type) {
    case "redBorder":
      return (
        <button style={{ border: "1px solid red" }} onClick={handleClick}>
          {children}
        </button>
      );
    case "blueBorder":
      return (
        <button style={{ border: "1px solid blue" }} onClick={handleClick}>
          {children}
        </button>
      );
    case "redDotted":
      return (
        <button style={{ border: "1px dotted red" }} onClick={handleClick}>
          {children}
        </button>
      );
    case "blueDotted":
      return (
        <button style={{ border: "1px dotted blue" }} onClick={handleClick}>
          {children}
        </button>
      );
  }
};
export { Button };
```

### 헷갈렸던 점

```tsx
type ButtonProps = {
  handleClick: () => void;
  children: ReactNode;
};

const RedBorderButton = ({ handleClick, children }: ButtonProps) => {
  return (
    <button style={{ border: "1px solid red" }} onClick={handleClick}>
      {children}
    </button>
  );
};
```

이러한 버튼을 ui마다 정의하는 것, 즉 리액트에서 자주 사용하는 재사용 가능한 단위의 컴포넌트로 나누는 패턴은 팩토리 메서드 패턴일까?

객체가 어떻게 생성되는지 호출하는 쪽에서 정할 수 있기 때문에 헷갈렸다.

하지만 이는 팩토리 메서드 패턴이 아니다.

핵심은 객체 생성자의 추상화이다.

어떤 객체 유형이 생성될지를 추상화 하여 객체의 생성자와 호출하는 부분을 분리하는 것이 팩토리 메서드 패턴이다.

즉 단순하게 컴포넌트 단위로 분리하는 것은 팩토리메서드 패턴이 아니다.

### 주의할 점

1. 팩토리메서드에서 반환하는 객체들은 같은 인터페이스를 공유해야 한다. 즉 모든 객체에서 의미있는 메서드만으로 인터페이스를 구성해야한다.

2. 모든 객체들에 대해 자식 클래스(리액트의 경우 컴포넌트)를 구성하기가 어려울 경우 일부 공통된 메서드나 프로퍼티만 추출해서 기초클래스를 만들고 이를 확장할 수 있다.

문서에선 다음과 같은 예시를 들고있다.

예를 들어, 다음과 같은 클래스 계층구조가 있다고 상상해 보세요. Mail​(우편) 기초 클래스의 자식 클래스들은 Air­Mail​(항공우편)​과 Ground­Mail​(지상우편)​이며, Transport​(운송수단) 클래스의 자식 클래스들은 Plane​(비행기), Truck​(트럭), 그리고 Train​(기차)​입니다. Air­Mail​(항공우편) 클래스는 Plane​(비행기) 객체만 사용하지만, Ground­Mail​(지상우편)​은 Truck 과 Train 객체들 모두 사용할 수 있습니다. 이 두 가지 경우를 모두 처리하기 위해 새 자식 클래스​(예: Train­Mail​(기차우편))​를 만들 수도 있으나, 다른 방법도 있습니다. 클라이언트 코드가 받으려는 제품을 제어하기 위해 Ground­Mail 클래스의 팩토리 메서드에 전달인자​(argument)​를 전달하는 방법입니다.

즉 자식클래스에 기초클래스의 제어매개변수를 전달한다.

그림으로 나타내면 다음과 같다.

```lua
       +-------------------------------------+
       |                 Mail                |
       +-------------------------------------+
            |                           |
     +--------------+           +-------------+
     |   AirMail    |           |  GroundMail |
     +--------------+           +-------------+
            |                   |             |
       +---------+          +---------+  +---------+
       |  Plane  |          |  Truck  |  |  Train  |
       +---------+          +---------+  +---------+
```

### 사용사례

1. mui에서의 button variant
   variant에 따라 다른 ui의 버튼을 반환함.
   https://mui.com/material-ui/react-button/

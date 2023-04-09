# 반복자 패턴

## 요약

컬렉션의 유형과 관계 없이 구성 요소를 순회할 수 있도록 하는 행동 디자인 패턴

## 문제

객체들을 관리하기 위해서 주로 컬렉션을 사용한다. 컬렉션은 단순 리스트일 수도 있고, 스택, 트리, 그래프 등 복잡한 데이터 구조일 수도 있다.

컬렉션이 담고 있는 요소를 사용하려면 요소에 접근할 수 있는 방법이 제공돼야 한다. 요소를 순회하는 방법은 컬렉션의 유형에 따라 달라질 수 있다.

- 리스트의 경우, index 순서대로 접근하게 한다
- 트리의 경우,
    - 깊이 우선으로 순회할 수 있다
    - 너비 우선으로도 순회할 수 있다

그런데 컬렉션의 책임은 데이터를 효율적으로 저장하는 것이다. 위와 같은 순회 알고리즘과 순회와 관련된 정보가 컬렉션에 추가된다면 컬렉션이 복잡해지고 책임이 불분명해진다.

컬렉션을 사용하는 쪽에서 컬렉션을 순회하는 방법에 대해 알고 있게 하는 것도 적절하지 않다. 클라이언트 코드는 여러 종류의 컬렉션을 다루게 된다. 이 컬렉션에 담긴 요소에 접근하기 위해 각 컬렉션이 요소를 어떻게 순회하는지를 알아야 한다면 클라이언트 코드와 컬렉션 간의 결합도가 불필요하게 높아지게 된다.

결국 컬렉션의 요소를 순회하는 방법을 알고 있는 책임을 누가 가져야 할 것인지가 불분명해진다.

## 해결

반복자 패턴에서는 컬렉션의 순회 동작을 반복자(iterator)라는 별도의 객체로 추출한다. 반복자는 순회 알고리즘과 순회 세부 정보를 함께 캡슐화한다.

반복자는 컬렉션의 요소를 가져오기 위한 하나의 주요 메서드를 제공하는데, 클라이언트는 반복자가 모든 요소를 순회할 때까지 계속 호출할 수 있다.

모든 반복자는 같은 인터페이스를 구현하기 때문에, 반복자가 제공된다면 컬렉션의 유형과 관계 없이 컬렉션의 요소를 순회할 수 있다. 만약 컬렉션을 순회하는 새로운 방법이 필요하다면 컬렉션이나 클라이언트 코드의 변경 없이 새로운 반복자만 추가되면 된다.

## 장점

- 컬렉션의 종류와 상관 없이 같은 방식으로 컬렉션의 요소를 순회할 수 있다
- 클라이언트 코드와 컬렉션 코드에서 순회 알고리즘을 분리할 수 있다 ⇒ 단일 책임 원칙
- 기존 코드의 변경 없이 새로운 컬렉션과 반복자를 추가할 수 있다 ⇒ 개방 폐쇄 원칙
- 컬렉션을 병렬로 순회하거나, 순회를 지연할 수 있다.

## 단점

- 반복자에서 컬렉션의 참조를 저장할 경우 메모리 누수가 발생할 수 있다
- 데이터 구조에서 지정한 방식이 아닌 다른 순회 방식으로 데이터를 순회해야 한다면, 이를 위한 새로운 반복자를 만들어 다른 순회 방식으로 데이터를 순회해야 한다.
- 반복과 변경이 동시에 일어날 수 있는 환경에서는 반복자를 구현하기 어렵다. 만약 순회가 일어나고 있는 도중에 새로운 요소가 추가돼 순서가 변경됐다면 어떻게 순회를 이어나가야 할까?

## 구조

![제목 없는 다이어그램.drawio (1).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bd2f6160-7152-40a2-94dc-0240002845c2/%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8_%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%82%E1%85%B3%E1%86%AB_%E1%84%83%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%84%80%E1%85%B3%E1%84%85%E1%85%A2%E1%86%B7.drawio_(1).png)

- 반복자(Iterator): 컬렉션 순회에 필요한 작업 선언
- 구체적인 반복자(Concrete Iterator): 특정 컬렉션 순회를 위한 알고리즘 구현 및 진행 상황 저장
- 집합체(Aggregate): 반복자가 작업할 컬렉션의 기본 인터페이스
- 구체적인 집합체(Concrete aggregate): 반복자를 생성하기 위한 데이터 구조와 팩토리 메서드, 게터 정의

## 예시

```tsx
interface AbstractIterator<T> {
    init: () => void;
    next: () => void;
    getItem: () => T;
    hasNext: () => boolean;
}

class ArrayReverseIterator<T> implements AbstractIterator<T> {
    private index = 0;

    constructor(private array: T[]) {
        this.init();
    }

    public init() {
        this.index = this.array.length - 1;
    }

    public next(): void {
        if (this.hasNext()) {
            this.index -= 1;
        }
    }

    public hasNext(): boolean {
        return this.index > 0;
    }

    public getItem(): T {
        return this.array[this.index];
    }
}

Object.defineProperty(Array.prototype, 'iterator', {
    get() {
        return new ArrayReverseIterator(this);
    }
})

declare global {
    interface Array<T> {
        iterator: AbstractIterator<T>;
    }
}

export {};

// 클라이언트 코드

const arr = [1, 2, 3]

test('array iterator', () => {
    const iterator = arr.iterator;

    expect(iterator.getItem()).toBe(3);

    iterator.next()

    expect(iterator.getItem()).toBe(2);
    expect(iterator.hasNext()).toBe(true)

    iterator.next();
    iterator.next();
    iterator.next();

    expect(iterator.hasNext()).toBe(false)
})
```

## 사례

- lazy.js - 지연 평가를 위해 사용 [https://github.com/dtao/lazy.js/blob/master/lazy.js#L5332](https://github.com/dtao/lazy.js/blob/master/lazy.js#L5332)
- immutable.js
    - [https://github.com/immutable-js/immutable-js/blob/main/src/Iterator.js](https://github.com/immutable-js/immutable-js/blob/main/src/Iterator.js)
    - List iterator: [https://github.com/immutable-js/immutable-js/blob/main/src/List.js#L190](https://github.com/immutable-js/immutable-js/blob/main/src/List.js#L190)

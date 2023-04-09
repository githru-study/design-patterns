# 개요 정리

팩토리메서드 패턴에 대해 정리해보았다.

## 팩토리 메소드 패턴이란?

부모 클래스에서 객체들을 생성할 수 있는 인터페이스를 제공하지만, 자식 클래스들이 생성될 객체의 유형을 변경할 수 있도록 하는 생성 패턴이다.

## 해결하고자 하는 문제

클래스의 인스턴스를 생성하는 코드와 생성된 클래스의 인스턴스를 사용하는 코드와 결합되어 있다면 확장이 어렵다.

이는 클라이언트와 객체 생성코드의 결합을 분리시켜 클라이언트에서 객체 생성 로직을 캡슐화 하여 해결할 수 있다.

캡슐화 함으로서 새로운 객체 유형이 추가되더라도 확장이 쉬워지며, 객체 생성 코드가 분리되었기 떄문에 객체 생성 로직이 변경되면 객체 생성 코드만 수정하여 유연하게 관리할 수 있으며, 객체를 생성하는 중복 코드도 줄일 수 있다.

### UML

<img src="https://refactoring.guru/images/patterns/diagrams/factory-method/structure-2x.png?id=9ea3aa8a47f8be22e12e523c15b448fd">

## 헷갈렸던 점

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

## 주의할 점

팩토리 메서드를 구현하려 할 때 다음과 같은 점을 조심해야 한다.

### 같은 인터페이스를 공유하기

팩토리메서드에서 반환하는 객체들은 같은 인터페이스를 공유해야 한다. 즉 모든 객체에서 의미있는 메서드만으로 인터페이스를 구성해야한다.

### 기초클래스로 추상화하기

모든 객체들에 대해 자식 클래스(리액트의 경우 컴포넌트)를 구성하기가 어려울 경우 일부 공통된 메서드나 프로퍼티만 추출해서 기초클래스를 만들고 기초 클래스의 제어 매개변수를 활용할 수 있다.
이는 아래 react-router 예시에서 잘 설명되어있다.

# 사용사례

팩토리 메서드 패턴의 사용 사례는 다음과 같다.

## JSX

react에서 사용하는 JSX도 팩토리 메서드 패턴의 일종이다.

JSX는 React.createElement() 메서드를 사용하여 React 요소를 생성하게 된다.
React.createElement()는 요소의 타입, 속성, 자식 요소를 받아 React 요소를 반환한다.
즉 JSX 인터페이스를 정의하고, 이를 어떻게 구현할지는 타입, 속성, 자식만 받아 객체 생성 로직은 React.createElement()내부에 추상화한다.

## mui

MUI의 [Button](https://mui.com/material-ui/react-button/#basic-button) 에서도 팩토리 메서드 패턴을 찾아볼 수 있다.

같은 인터페이스를 공유하는 Button이라는 기초 인터페이스를 만들어놓고, 어떻게 JSX 객체를 생성할지 variant로 추상화한다.

variant에 따라 다른 ui의 버튼을 반환한다.

```jsx
<Button variant="text">Text</Button>
<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
```

https://mui.com/material-ui/react-button/

## react-router

SPA를 구현하기 위한 라이브러리인 react에서 자주 사용하는 react-router에서도 팩토리메서드 패턴을 찾아볼 수 있다.

[createRouter](https://github.com/remix-run/react-router/blob/main/packages/router/router.ts#L671)라는 기초 인터페이스의 구현체(함수)와
이 이를 확장한 구현체인[createBrowserRouter](https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L213)와 [createHashRouter](https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L227)가 그 예시이다.

### 기초 인터페이스와 구현체(함수)) : createRouter

[createRouter](https://github.com/remix-run/react-router/blob/main/packages/router/router.ts#L671) 함수는 [RouterInit](https://github.com/remix-run/react-router/blob/main/packages/router/router.ts#L342)을 props로 받아서 initialize() 함수를 실행하여 [Router](https://github.com/remix-run/react-router/blob/main/packages/router/router.ts#L56) 객체를 반환한다.

[RouterInit](https://github.com/remix-run/react-router/blob/main/packages/router/router.ts#L342) 인터페이스의 routes는 [AgonosticRouteObject](https://github.com/remix-run/react-router/blob/main/packages/router/utils.ts#L235) 타입인데, 아래에서의 설명을 위해 링크를 달아놓았다. 자세한 내용은 아래에서 설명하겠다.

```ts
function createRouter(init: RouterInit): Router;

export interface RouterInit {
  routes: AgnosticRouteObject[];
  history: History;
  basename?: string;
  detectErrorBoundary?: DetectErrorBoundaryFunction;
  future?: FutureConfig;
  hydrationData?: HydrationState;
}

interface Router {
  get basename(): RouterInit["basename"];
  get state(): RouterState;
  get routes(): AgnosticDataRouteObject[];
  initialize(): Router;
  subscribe(fn: RouterSubscriber): () => void;
  enableScrollRestoration(
    savedScrollPositions: Record<string, number>,
    getScrollPosition: GetScrollPositionFunction,
    getKey?: GetScrollRestorationKeyFunction
  ): () => void;
  navigate(to: number): Promise<void>;
  navigate(to: To, opts?: RouterNavigateOptions): Promise<void>;
  fetch(
    key: string,
    routeId: string,
    href: string,
    opts?: RouterNavigateOptions
  ): void;
  revalidate(): void;
  createHref(location: Location | URL): string;
  encodeLocation(to: To): Path;
  getFetcher<TData = any>(key?: string): Fetcher<TData>;
  deleteFetcher(key?: string): void;
  dispose(): void;
  getBlocker(key: string, fn: BlockerFunction): Blocker;
  deleteBlocker(key: string): void;
  _internalSetRoutes(routes: AgnosticRouteObject[]): void;
  _internalFetchControllers: Map<string, AbortController>;
  _internalActiveDeferreds: Map<string, DeferredData>;
}
```

### 파생된 인터페이스와 구현체(함수) : createBrowserRouter , createHashRouter

[createBrowserRouter](https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L213)는 [createHashHistory](https://github.com/remix-run/react-router/blob/main/packages/router/history.ts#L414)와 마찬가지로 [RouteObject](https://github.com/remix-run/react-router/blob/main/packages/react-router/lib/context.ts#L54)와 [DOMRouterOpts](https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L206)를 props로 받아 [Router](https://github.com/remix-run/react-router/blob/main/packages/router/router.ts#L56)를 반환한다.

[createHashRouter](https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L227)도 마찬가지로 [RouteObject](https://github.com/remix-run/react-router/blob/main/packages/react-router/lib/context.ts#L54)와 [DOMRouterOpts](https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L206)를 props로 받아 [Router](https://github.com/remix-run/react-router/blob/main/packages/router/router.ts#L56)를 반환한다.

선언부엔 RemixRouter를 반환한다고 되어있지만 왜 Router를 반환하냐면 [import 해올 때](https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L39) Router type을 RemixRouter로 타입명을 바꾸어 가져왔기 때문이다.

함수는 다음과 같이 구현되어 있다.

```ts
export function createBrowserRouter(
  routes: RouteObject[],
  opts?: DOMRouterOpts
): RemixRouter {
  return createRouter({
    basename: opts?.basename,
    future: opts?.future,
    history: createBrowserHistory({ window: opts?.window }),
    hydrationData: opts?.hydrationData || parseHydrationData(),
    routes,
    detectErrorBoundary,
  }).initialize();
}

export function createHashRouter(
  routes: RouteObject[],
  opts?: DOMRouterOpts
): RemixRouter {
  return createRouter({
    basename: opts?.basename,
    future: opts?.future,
    history: createHashHistory({ window: opts?.window }),
    hydrationData: opts?.hydrationData || parseHydrationData(),
    routes,
    detectErrorBoundary,
  }).initialize();
}
```

해당 함수들의 선언부를 보면 공통된 인터페이스로 정의되어 있다. 하나씩 살펴보자.

RouteObject를 보면 다음과 같이 정의되어 있다.

```ts
export interface IndexRouteObject {
  caseSensitive?: AgnosticIndexRouteObject["caseSensitive"];
  path?: AgnosticIndexRouteObject["path"];
  id?: AgnosticIndexRouteObject["id"];
  loader?: AgnosticIndexRouteObject["loader"];
  action?: AgnosticIndexRouteObject["action"];
  hasErrorBoundary?: AgnosticIndexRouteObject["hasErrorBoundary"];
  shouldRevalidate?: AgnosticIndexRouteObject["shouldRevalidate"];
  handle?: AgnosticIndexRouteObject["handle"];
  index: true;
  children?: undefined;
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  ErrorBoundary?: React.ComponentType | null;
  lazy?: LazyRouteFunction<IndexRouteObject>;
}

export interface NonIndexRouteObject {
  caseSensitive?: AgnosticNonIndexRouteObject["caseSensitive"];
  path?: AgnosticNonIndexRouteObject["path"];
  id?: AgnosticNonIndexRouteObject["id"];
  loader?: AgnosticNonIndexRouteObject["loader"];
  action?: AgnosticNonIndexRouteObject["action"];
  hasErrorBoundary?: AgnosticNonIndexRouteObject["hasErrorBoundary"];
  shouldRevalidate?: AgnosticNonIndexRouteObject["shouldRevalidate"];
  handle?: AgnosticNonIndexRouteObject["handle"];
  index?: false;
  children?: RouteObject[];
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  ErrorBoundary?: React.ComponentType | null;
  lazy?: LazyRouteFunction<NonIndexRouteObject>;
}

export type RouteObject = IndexRouteObject | NonIndexRouteObject;
```

이 [RouteObject](https://github.com/remix-run/react-router/blob/main/packages/react-router/lib/context.ts#L54)는 위에서 언급한 [RouterInit](https://github.com/remix-run/react-router/blob/main/packages/router/router.ts#L342)에서 routes의 타입인 [AgonosticRouteObject](https://github.com/remix-run/react-router/blob/main/packages/router/utils.ts#L235)인터페이스를 확장한 인터페이스이다.

또한 [DOMRouterOpts](https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L206)는 다음과 같이 정의되어 있다.

```ts
interface DOMRouterOpts {
  basename?: string;
  future?: FutureConfig;
  hydrationData?: HydrationState;
  window?: Window;
}
```

이는 [RouterInit](https://github.com/remix-run/react-router/blob/main/packages/router/router.ts#L342) 인터페이스의 나머지 프로퍼티임을 알 수 있다.

[RouterInit](https://github.com/remix-run/react-router/blob/main/packages/router/router.ts#L342)의 몇몇 프로퍼티(detectErrorBoundary)들은 정의되어있지 않은데, 이는 BrowserRouter와 HistoryRouter에서 사용되지 않는 옵셔널 프로퍼티이다.( 정확히는 [createMemoryRouter](https://github.com/remix-run/react-router/blob/main/packages/react-router/index.ts#L233)에서 사용한다.)

즉 라이브러리에서 [createRouter](https://github.com/remix-run/react-router/blob/main/packages/router/router.ts#L671) 구현체를 확장하는 구현체인 [createBrowserRouter](https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L213)와 [createHashRouter](https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L227)를 정의하고, Router객체의 생성을 추상화하였다.

## History

여담으로 [createBrowserRouter](https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L213)와 [createHashRouter](https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L227)에서 각각 사용하는 [createBrwoserHistory](https://github.com/remix-run/react-router/blob/main/packages/router/history.ts#L357)와 [createHashHistory](https://github.com/remix-run/react-router/blob/main/packages/router/history.ts#L414)의 함수 선언부를 찾아보면 다음과 같다.

```ts
function createHashHistory(options: HashHistoryOptions = {}): HashHistory;

function createBrowserHistory(
  options: BrowserHistoryOptions = {}
): BrowserHistory;

interface BrowserHistory extends UrlHistory {}
type BrowserHistoryOptions = UrlHistoryOptions;

interface HashHistory extends UrlHistory {}
type HashHistoryOptions = UrlHistoryOptions;

interface UrlHistory extends History {}
export type UrlHistoryOptions = {
  window?: Window;
  v5Compat?: boolean;
};

export interface History {
  readonly action: Action;
  readonly location: Location;
  createHref(to: To): string;
  createURL(to: To): URL;
  encodeLocation(to: To): Path;
  push(to: To, state?: any): void;
  replace(to: To, state?: any): void;
  go(delta: number): void;
  listen(listener: Listener): () => void;
}
```

마찬가지로 기초 인터페이스인 [History](https://github.com/remix-run/react-router/blob/main/packages/router/history.ts#L113) 인터페이스를 정의하고 이를 확장하였다. 정확하겐 확장보다는 고유한 시그니처를 갖게하였다.

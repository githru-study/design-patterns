# Facade 패턴

Facade 패턴은 라이브러리에 대한, 프레임 워크에 대한 또는 다른 클래스들의 복잡한 집합에 대한 단순화된 인터페이스를 제공하는 구조적 디자인 패턴이다.

## 문제

정교한 라이브러리나 프레임워크에 속하는 광범위한 객체들의 집합을 사용하여 코드를 작동하게 만들어야 할 때 객체들을 초기화하고 종속성 관계를 추적하고, 올바른 순서대로 메서드를 실행하는 등의 여러 작업을 수행해야 한다.

이럴 경우 비즈니스 로직이 다른 객체의 구현 세부사항들과 밀접하게 결합ㅈ하여 코드를 이해하고 유지관리하기가 어려워진다.

## 해결책

정교한 라이브러리나 프레임워크에 속하는 광범위한 객체들의 내부 복잡성을 감추고 클라이언트에게 단순한 인터페이스를 제공하여 클라이언트가 시스템과 상호작용 하도록 하면 된다.

클라이언트와 복잡한 객체의 중간에 이러한 역할을 하는 파사드(facade)라는 객체를 만들어서 해결한다.

또한 객체의 모든 기능을 클라이언트에게 노출하지 않고 클라이언트 입장에서 정말 필요한 기능만 노출할 수 있다.

## 사용 예시

<img src='https://refactoring.guru/images/patterns/diagrams/facade/live-example-ko-2x.png' alt=''>

## 구조

<img src="https://refactoring.guru/images/patterns/diagrams/facade/structure-indexed-2x.png" alt="">

1. 퍼사드 객체는 하위 시스템 기능의 특정 부분에 접근할 수 있다. 즉 클라이언트의 요청을 복잡한 하위시스템의 어디에 보내야 할지를 처리한다.

2. 기능단위로 추가적인 퍼사드 클래스를 생성하여 하나의 퍼사가 다른 기능으로 오염되는 것을 막을 수 있다.

3. 복잡한 하위 시스템은 다양한 객체들로 구성된다. 사용하려면 적절한 형식의 데이터를 제공하는 등의 작업을 수행해야 한다.

4. 클라이언트는 하위 시스템 객체들을 직접 호출하는 대신 퍼사드를 사용한다.

## 예시 코드

```js
class VideoFile {
  // ...
}

class OggCompressionCodec {
  // ...
}

class MPEG4CompressionCodec {
  // ...
}

class CodecFactory {
  // ...
}

class BitrateReader {
  static read(filename, codec) {
    // ...
  }

  static convert(buffer, codec) {
    // ...
  }
}

class AudioMixer {
  fix(result) {
    // ...
  }
}

class VideoConverter {
  convert(filename, format) {
    const file = new VideoFile(filename);
    const sourceCodec = new CodecFactory().extract(file);

    let destinationCodec;
    if (format === "mp4") {
      destinationCodec = new MPEG4CompressionCodec();
    } else {
      destinationCodec = new OggCompressionCodec();
    }

    const buffer = BitrateReader.read(filename, sourceCodec);
    let result = BitrateReader.convert(buffer, destinationCodec);
    result = new AudioMixer().fix(result);

    return new File(result);
  }
}

class Application {
  main() {
    const converter = new VideoConverter();
    const mp4 = converter.convert("funny-cats-video.ogg", "mp4");
    mp4.save();
  }
}
```

## Prisma

Prisma와 같은 ORM들은 데이터베이스별 세부 구현사항을 감추고 prismaClient를 사용하여 데이터베이스와의 연결, 생성, CRUD 작성등을 단순화한다.

```prisma
datasource db {
    provider = "mongodb"
    url      = env("DATABASE_URL")
}

generator client {
    provider = "prisma-client-js"
}

model ToDoList {
    id          String   @id @default(uuid()) @map("_id")
    title       String
    description String
    createdAt   DateTime @default(now())
    updatedAt   DateTime @default(now()) @updatedAt
    toDos       ToDo[]
}

model ToDo {
    id          String   @id @default(uuid()) @map("_id")
    title       String
    description String
    createdAt   DateTime @default(now())
    upatedAt    DateTime @default(now()) @updatedAt
    toDoList    ToDoList @relation(fields: [toDoListId], references: [id])
    toDoListId  String
}
```

```ts
await prisma.toDoList.upsert({
  where: {
    id: "3",
  },
  update: {},
  create: {
    id: "3",
    title: "dummy todolist",
    description: "더미데이터 입니다.",
  },
});
```

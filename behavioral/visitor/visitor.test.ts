import {Circle, CompoundShape, JsonExportVisitor, Page, Rectangle, XmlExportVisitor} from "./visitor";

test('노드가 올바르게 추가된다', () => {
    const page = new Page();
    const compoundShape = new CompoundShape();

    compoundShape.add(new Rectangle({x: 40, y: 50}, 10, 50));
    compoundShape.add(new Circle({x: 80, y: 20}, 20));
    page.add(compoundShape);
    page.add(new Rectangle({x: 10, y: 10}, 20, 40));

    expect(page.getChildren().size).toBe(2)
    expect(compoundShape.getChildren().size).toBe(2)
})

describe('노드 변환하기', function () {
    const visitor = new XmlExportVisitor();

    test.each([
        ['rectangle', new Rectangle({x: 40, y: 50}, 10, 50), '<Rectangle left="40" top="50" right="50" bottom="100" width="10" height="50" area="500"/>'],
        ['circle', new Circle({x: 80, y: 20}, 20), '<Circle centerX="80" centerY="20" radius="20" area="1256"/>'],
    ])('%s 노드를 올바르게 변환한다', (_, received, expected) => {
        const result = received.accept(visitor)

        expect(result).toBe(expected)
    });

    test('compoundShape 노드 변환하기', () => {
        const compoundShape = new CompoundShape();
        compoundShape.add(new Rectangle({x: 40, y: 50}, 10, 50));
        compoundShape.add(new Circle({x: 80, y: 20}, 20));

        const result = compoundShape.accept(visitor)

        expect(result).toBe(`<CompoundShape><Rectangle left="40" top="50" right="50" bottom="100" width="10" height="50" area="500"/><Circle centerX="80" centerY="20" radius="20" area="1256"/></CompoundShape>`)
    })

    test('page 노드 변환하기', () => {
        const page = new Page();
        const compoundShape = new CompoundShape();
        compoundShape.add(new Rectangle({x: 40, y: 50}, 10, 50));
        compoundShape.add(new Circle({x: 80, y: 20}, 20));
        page.add(compoundShape);
        page.add(new Rectangle({x: 10, y: 10}, 20, 40));

        const result = page.accept(visitor);

        const expected = `<Page><CompoundShape><Rectangle left="40" top="50" right="50" bottom="100" width="10" height="50" area="500"/><Circle centerX="80" centerY="20" radius="20" area="1256"/></CompoundShape><Rectangle left="10" top="10" right="30" bottom="50" width="20" height="40" area="800"/></Page>`
        expect(result).toBe(expected)
    })
});

describe('노드를 JSON으로 변환하기', function () {
    const visitor = new JsonExportVisitor();

    test.each([
        ['rectangle', new Rectangle({x: 40, y: 50}, 10, 50), {position: {x: 40, y: 50}, width: 10, height: 50}],
        ['circle', new Circle({x: 80, y: 20}, 20), {center: {x: 80, y: 20}, radius: 20}],
    ])('%s 노드를 올바르게 변환한다', (_, received, expected) => {
        const result = received.accept(visitor)

        expect(result).toEqual(expected)
    });

    test('compoundShape 노드 변환하기', () => {
        const compoundShape = new CompoundShape();
        compoundShape.add(new Rectangle({x: 40, y: 50}, 10, 50));
        compoundShape.add(new Circle({x: 80, y: 20}, 20));

        const result = compoundShape.accept(visitor)

        expect(result).toEqual({children: [{position: {x: 40, y: 50}, width: 10, height: 50}, {center: {x: 80, y: 20}, radius: 20}]})
    })

    test('page 노드 변환하기', () => {
        const page = new Page();
        const compoundShape = new CompoundShape();
        compoundShape.add(new Rectangle({x: 40, y: 50}, 10, 50));
        compoundShape.add(new Circle({x: 80, y: 20}, 20));
        page.add(compoundShape);
        page.add(new Rectangle({x: 10, y: 10}, 20, 40));

        const result = page.accept(visitor);

        const expected = {children: [{children: [{position: {x: 40, y: 50}, width: 10, height: 50}, {center: {x: 80, y: 20}, radius: 20}]}, {position: {x: 10, y: 10}, width: 20, height: 40}]}
        expect(result).toEqual(expected)
    })
});

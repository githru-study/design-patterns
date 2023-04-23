import {Circle, CompoundShape, Page, Rectangle} from "./visitor";

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
    test.each([
        ['rectangle', new Rectangle({x: 40, y: 50}, 10, 50), '<Rectangle left="40" top="50" right="50" bottom="100" width="10" height="50" area="500"/>'],
        ['circle', new Circle({x: 80, y: 20}, 20), '<Circle centerX="80" centerY="20" radius="20" area="1256"/>'],
    ])('%s 노드를 올바르게 변환한다', (_, received, expected) => {
        const result = received.exportAsXml()

        expect(result).toBe(expected)
    });

    test('compoundShape 노드 변환하기', () => {
        const compoundShape = new CompoundShape();
        compoundShape.add(new Rectangle({x: 40, y: 50}, 10, 50));
        compoundShape.add(new Circle({x: 80, y: 20}, 20));

        const result = compoundShape.exportAsXml()

        expect(result).toBe(`<CompoundShape><Rectangle left="40" top="50" right="50" bottom="100" width="10" height="50" area="500"/><Circle centerX="80" centerY="20" radius="20" area="1256"/></CompoundShape>`)
    })

    test('page 노드 변환하기', () => {
        const page = new Page();
        const compoundShape = new CompoundShape();
        compoundShape.add(new Rectangle({x: 40, y: 50}, 10, 50));
        compoundShape.add(new Circle({x: 80, y: 20}, 20));
        page.add(compoundShape);
        page.add(new Rectangle({x: 10, y: 10}, 20, 40));

        const result = page.exportAsXml();

        const expected = `<Page><CompoundShape><Rectangle left="40" top="50" right="50" bottom="100" width="10" height="50" area="500"/><Circle centerX="80" centerY="20" radius="20" area="1256"/></CompoundShape><Rectangle left="10" top="10" right="30" bottom="50" width="20" height="40" area="800"/></Page>`
        expect(result).toBe(expected)
    })
});

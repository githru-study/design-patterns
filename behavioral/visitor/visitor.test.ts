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

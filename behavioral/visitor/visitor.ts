import builder from "xmlbuilder";

interface ExportVisitor<T = any> {
    exportPage(component: Page): T;
    exportCompoundShape(component: CompoundShape): T;
    exportRectangle(component: Rectangle): T;
    exportCircle(component: Circle): T;
}

export class XmlExportVisitor implements ExportVisitor<string> {
    public exportPage(page: Page) {
        const result = builder.create('Page')
        let child = ''
        page.getChildren().forEach(x => child += x.accept(this))
        return result.raw(child).toString()
    }

    public exportCompoundShape(compound: CompoundShape) {
        const result = builder.create('CompoundShape')
        let child = ''
        compound.getChildren().forEach(x => child += x.accept(this))
        return result.raw(child).toString()
    }

    public exportCircle(circle: Circle) {
        return builder.create('Circle')
            .att('centerX', circle.getPosition().x)
            .att('centerY', circle.getPosition().y)
            .att('radius', circle.radius)
            .att('area', Math.floor(Math.pow(circle.radius, 2) * Math.PI))
            .toString()
    }

    public exportRectangle(rect: Rectangle) {
        const position = rect.getPosition();
        return builder.create('Rectangle')
            .att('left', position.x)
            .att('top', position.y)
            .att('right', position.x + rect.width)
            .att('bottom', position.y + rect.height)
            .att('width', rect.width)
            .att('height', rect.height)
            .att('area', rect.width * rect.height)
            .toString()
    }
}

export class JsonExportVisitor implements ExportVisitor<object> {

    exportCompoundShape(component: CompoundShape) {
        const children: object[] = [];
        component.getChildren().forEach(x => children.push(x.accept(this)))
        return { children }
    }

    exportPage(component: Page) {
        const children: object[] = [];
        component.getChildren().forEach(x => children.push(x.accept(this)))
        return { children }
    }

    exportCircle(component: Circle) {
        return {
            center: component.getPosition(),
            radius: component.radius
        }
    }

    exportRectangle(component: Rectangle) {
        return {
            position: component.getPosition(),
            width: component.width,
            height: component.height
        }
    }
}

export abstract class Component {
    protected parent!: Component | null;

    public setParent(parent: Component | null) {
        this.parent = parent;
    }

    public getParent(): Component | null {
        return this.parent;
    }

    public abstract getChildren(): Set<Component> | null;
    public abstract add(component: Component): void;
    public abstract remove(component: Component): void;
    public abstract accept(visitor: ExportVisitor<any>): any;
}

export class Page extends Component {
    private children: Set<Component> = new Set<Component>();

    public getChildren(): Set<Component> {
        return this.children;
    }

    public override add(component: Component) {
        this.children.add(component);
        component.setParent(this);
    }

    public override remove(component: Component) {
        this.children.delete(component);
        component.setParent(null);
    }

    public override accept(visitor: ExportVisitor) {
        return visitor.exportPage(this);
    }
}

export class CompoundShape extends Component {
    private children: Set<Component> = new Set<Component>();

    public getChildren(): Set<Component> {
        return this.children;
    }

    public override add(component: Component) {
        if (component instanceof Page) {
            throw new Error('CompoundShape에 Page를 추가할 수 없음');
        }
        this.children.add(component);
        component.setParent(this);
    }

    public override remove(component: Component) {
        this.children.delete(component);
        component.setParent(null);
    }

    public override accept(visitor: ExportVisitor) {
        return visitor.exportCompoundShape(this);
    }
}

export interface Point {
    x: number;
    y: number;
}

export abstract class Shape extends Component {
    protected constructor(protected position: Point) {
        super();
    }

    public getPosition(): Point {
        return this.position;
    }

    public getChildren(): null {
        return null;
    }

    public override add(component: Component) {
        throw new Error('도형에서 component를 추가할 수 없음')
    }

    public override remove(component: Component) {
        throw new Error('도형에서 component를 삭제할 수 없음')
    }
}

export class Circle extends Shape {
    constructor(center: Point, public readonly radius: number) {
        super(center);
    }

    public override accept(visitor: ExportVisitor) {
        return visitor.exportCircle(this);
    }
}

export class Rectangle extends Shape {
    constructor(lt: Point, public readonly width: number, public readonly height: number) {
        super(lt);
    }

    public override accept(visitor: ExportVisitor) {
        return visitor.exportRectangle(this);
    }
}

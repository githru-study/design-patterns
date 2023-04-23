import builder from "xmlbuilder";
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

    public abstract getNodeName(): string;
    public abstract exportAsXml(baseNode?: builder.XMLElement): string;
}

export class Page extends Component {
    private children: Set<Component> = new Set<Component>();

    public getChildren(): Set<Component> {
        return this.children;
    }

    public override add(component: Component) {
        this.children.add(component);
    }

    public override remove(component: Component) {
        this.children.delete(component);
    }

    public getNodeName(): string {
        return 'Page';
    }

    public exportAsXml(baseNode?: builder.XMLElement): string {
        const result = (baseNode ?? builder.create(this.getNodeName()))
        this.children.forEach(x => {
            // x.constructor.name 등의 방법으로 접근 시, minify 과정 거쳤을 때 클래스 명이 다른 이름으로 바뀔 수 있음
            x.exportAsXml(result.ele(x.getNodeName()))
        })
        return result.toString()
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
    }

    public override remove(component: Component) {
        this.children.delete(component);
    }

    public getNodeName(): string {
        return 'CompoundShape';
    }

    public exportAsXml(baseNode?: builder.XMLElement): string {
        const result = (baseNode ?? builder.create(this.getNodeName()))
        this.children.forEach(x => {
            // x.constructor.name 등의 방법으로 접근 시, minify 과정 거쳤을 때 클래스 명이 다른 이름으로 바뀔 수 있음
            x.exportAsXml(result.ele(x.getNodeName()))
        })
        return result.toString()
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
    constructor(center: Point, private radius: number) {
        super(center);
    }

    public getNodeName(): string {
        return 'Circle';
    }

    public exportAsXml(baseNode?: builder.XMLElement): string {
        return (baseNode ?? builder.create(this.getNodeName()))
            .att('centerX', this.position.x)
            .att('centerY', this.position.y)
            .att('radius', this.radius)
            .att('area', Math.floor(Math.pow(this.radius, 2) * Math.PI))
            .toString()
    }
}

export class Rectangle extends Shape {
    constructor(lt: Point, private width: number, private height: number) {
        super(lt);
    }

    public getNodeName(): string {
        return 'Rectangle';
    }

    public exportAsXml(baseNode?: builder.XMLElement): string {
        return (baseNode ?? builder.create(this.getNodeName()))
            .att('left', this.position.x)
            .att('top', this.position.y)
            .att('right', this.position.x + this.width)
            .att('bottom', this.position.y + this.height)
            .att('width', this.width)
            .att('height', this.height)
            .att('area', this.width * this.height)
            .toString()
    }
}

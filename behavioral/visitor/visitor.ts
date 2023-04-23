abstract class Component {
    protected parent!: Component | null;

    public setParent(parent: Component | null) {
        this.parent = parent;
    }

    public getParent(): Component | null {
        return this.parent;
    }

    public abstract add(component: Component): void;
    public abstract remove(component: Component): void;
}

class Page extends Component {
    private children: Set<Component> = new Set<Component>();

    public override add(component: Component) {
        this.children.add(component);
    }

    public override remove(component: Component) {
        this.children.delete(component);
    }
}

class CompoundShape extends Component {
    private children: Set<Component> = new Set<Component>();

    public override add(component: Component) {
        if (component instanceof Page) {
            throw new Error('CompoundShape에 Page를 추가할 수 없음');
        }
        this.children.add(component);
    }

    public override remove(component: Component) {
        this.children.delete(component);
    }
}

interface Point {
    x: number;
    y: number;
}

abstract class Shape extends Component {
    protected constructor(protected position: Point) {
        super();
    }

    public override add(component: Component) {
        throw new Error('도형에서 component를 추가할 수 없음')
    }

    public override remove(component: Component) {
        throw new Error('도형에서 component를 삭제할 수 없음')
    }
}

class Circle extends Shape {
    constructor(center: Point, private radius: number) {
        super(center);
    }
}

class Rectangle extends Shape {
    constructor(lt: Point, private width: number, private height: number) {
        super(lt);
    }
}

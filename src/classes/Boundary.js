export default class Boundary{
    static size = 40;

    constructor({position, image}) {
        this.position = position;
        this.width = Boundary.size;
        this.height = Boundary.size;
        this.image = image;
    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}
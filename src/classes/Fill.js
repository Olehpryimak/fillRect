export default class Fill{
    static size = 40;

    constructor({position}) {
        this.position = position;
        this.width = Fill.size;
        this.height = Fill.size;
    }

    draw(context) {
        context.fillStyle = 'rgba(255, 255, 0, 0.1)';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
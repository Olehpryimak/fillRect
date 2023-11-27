<template>
    <div>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
import Boundary from "@/classes/Boundary";
import Player from "@/classes/Player";

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '2'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['6', ']', '', ' ', ' ', ' ',  ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', '[', '8'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', '^', ' ', '|'],
    ['4', '-', '-', '-', '-', '5', '-', '3'],
]
const boundaries = [];

function createImage(src) {
    const image = new Image();

    image.src = src;

    return image;
}

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        let image = null;

        switch (symbol) {
            case '-':
                image = createImage('/images/pipeHorizontal.png');
                break;
            case '|':
                image = createImage('/images/pipeVertical.png');
                break;
            case '1':
                image = createImage('/images/pipeCorner1.png');
                break;
            case '2':
                image = createImage('/images/pipeCorner2.png');
                break;
            case '3':
                image = createImage('/images/pipeCorner3.png');
                break;
            case '4':
                image = createImage('/images/pipeCorner4.png');
                break;
            case 'b':
                image = createImage('/images/block.png');
                break;
            case '[':
                image = createImage('/images/capLeft.png');
                break;
            case ']':
                image = createImage('/images/capRight.png');
                break;
            case '_':
                image = createImage('/images/capBottom.png');
                break;
            case '^':
                image = createImage('/images/capTop.png');
                break;
            case '+':
                image = createImage('/images/pipeCross.png');
                break;
            case '5':
                image = createImage('/images/pipeConnectorTop.png');
                break;
            case '6':
                image = createImage('/images/pipeConnectorRight.png');
                break;
            case '7':
                image = createImage('/images/pipeConnectorBottom.png');
                break;
            case '8':
                image = createImage('/images/pipeConnectorLeft.png');
                break;
        }

        if (image) {
            boundaries.push(new Boundary({
                position: {
                    x: Boundary.size * j,
                    y: Boundary.size * i,
                },
                image,
            }))
        }
    });
});
function circleCollidesWithRectanlge({circle, rectangle}) {
    const padding = Boundary.size / 2 - circle.radius - 1;
    return circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding

}
let pressedKey = '';

export default {
    name: 'GameMain',
    data() {
        return {
            ctx: null,
        };
    },
    async mounted() {
        await this.$nextTick();

        this.setup();
    },
    methods: {
        setup() {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext('2d');

            this.ctx = ctx;

            canvas.width = innerWidth;
            canvas.height = innerHeight;

            const player = new Player({
                position: {
                    x: Boundary.size * 1.5,
                    y: Boundary.size * 1.5,
                },
                velocity: {
                    x: 0,
                    y: 0,
                }
            })

            // let animationId;d

            function animate() {
                // animationId = requestAnimationFrame(animate);
                requestAnimationFrame(animate);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (pressedKey === 'w') {
                    for (const boundary of boundaries) {
                        if (circleCollidesWithRectanlge({
                            circle: {
                                ...player, velocity: {
                                    x: 0,
                                    y: -5,
                                }
                            }, rectangle: boundary
                        })) {
                            player.velocity.y = 0;
                            pressedKey = '';
                            break;
                        } else {
                            player.velocity.y = -5;
                        }
                    }
                } else if (pressedKey === 'a') {
                    for (const boundary of boundaries) {
                        if (circleCollidesWithRectanlge({
                            circle: {
                                ...player, velocity: {
                                    x: -5,
                                    y: 0,
                                }
                            }, rectangle: boundary
                        })) {
                            player.velocity.x = 0;
                            pressedKey = '';
                            break;
                        } else {
                            player.velocity.x = -5;
                        }
                    }
                } else if (pressedKey === 'd') {
                    for (const boundary of boundaries) {
                        if (circleCollidesWithRectanlge({
                            circle: {
                                ...player, velocity: {
                                    x: 5,
                                    y: 0,
                                }
                            }, rectangle: boundary
                        })) {
                            player.velocity.x = 0;
                            pressedKey = '';
                            break;
                        } else {
                            player.velocity.x = 5;
                        }
                    }
                } else if (pressedKey === 's') {
                    for (const boundary of boundaries) {
                        if (circleCollidesWithRectanlge({
                            circle: {
                                ...player, velocity: {
                                    x: 0,
                                    y: 5,
                                }
                            }, rectangle: boundary
                        })) {
                            player.velocity.y = 0;
                            pressedKey = '';
                            break;
                        } else {
                            player.velocity.y = 5;
                        }
                    }
                }

                boundaries.forEach((boundary) => {
                    boundary.draw(ctx);
                })

                player.update(ctx);
            }

            animate();

            addEventListener('keydown', ({key}) => {
                if (pressedKey) {
                    return;
                }

                switch (key) {
                    case 'w':
                        pressedKey = 'w';
                        break;
                    case 's':
                        pressedKey = 's';
                        break;
                    case 'a':
                        pressedKey = 'a';
                        break;
                    case 'd':
                        pressedKey = 'd';
                        break;
                }
            });
        }
    },
}
</script>
console.log('MAIN.JS LOADED');

import '../css/styles.scss';


// 🔒 SERVER CONTROLLED MODE — frontend locked
const SERVER_LOCKED = true;

const data = [
    {
        image: '/assets/images/slide-1.jpg',
        place: 'Dhaka City',
        title1: 'DHAKA',
        title2: 'BY NIGHT',
        description:
            'At the heart of Bangladesh, Dhaka comes alive after sunset with glowing bridges, bustling streets, and rivers reflecting the city’s restless energy. A place where tradition and modern life move side by side.'
    },
    {
        image: '/assets/images/slide-2.jpg',
        place: 'Rural Bangladesh',
        title1: 'FIELDS',
        title2: 'OF GOLD',
        description:
            'Endless mustard fields stretch across the countryside, painting rural Bangladesh in shades of yellow and green. Life here flows gently, shaped by seasons, soil, and simplicity.'
    },
    {
        image: '/assets/images/slide-3.jpg',
        place: 'Kyoto, Japan',
        title1: 'KYOTO',
        title2: 'HORIZON',
        description:
            'Ancient temples rise above the city as Kyoto blends centuries of tradition with modern life. From quiet hills to historic streets, the city carries Japan’s cultural soul.'
    },
    {
        image: '/assets/images/slide-4.jpg',
        place: 'Mount Fuji',
        title1: 'FUJI',
        title2: 'SUNRISE',
        description:
            'As the sun breaks through the horizon, Mount Fuji stands calm and timeless. A symbol of Japan’s natural beauty, watched from temples, lakes, and distant towns.'
    },
    {
        image: '/assets/images/slide-5.jpg',
        place: 'Seoul, South Korea',
        title1: 'SEOUL',
        title2: 'LIGHTS',
        description:
            'Seoul shines after dark with vibrant streets, glowing signs, and cultural celebrations. A city where history, technology, and creativity move at the same fast pace.'
    },
    {
        image: '/assets/images/slide-6.jpg',
        place: 'Seoul Skyline',
        title1: 'CITY',
        title2: 'OF NIGHT',
        description:
            'From high above, Seoul reveals its endless skyline framed by hills and rivers. The city pulses with life, offering energy, ambition, and unforgettable views.'
    },
    {
        image: '/assets/images/slide-7.jpg',
        place: 'San Francisco',
        title1: 'GOLDEN',
        title2: 'GATE',
        description:
            'The Golden Gate Bridge stretches across the bay, connecting city and sea. San Francisco’s iconic skyline meets rolling hills and coastal winds in perfect balance.'
    },
    {
        image: '/assets/images/slide-8.jpg',
        place: 'New York City',
        title1: 'NEW',
        title2: 'YORK',
        description:
            'Towering buildings and endless streets define New York City. A global crossroads where ambition, culture, and stories from around the world come together.'
    }
];

const _ = (id) => document.getElementById(id)
const cards = data.map((i, index) => `<div class="card" id="card${index}" style="background-image:url(${i.image})"  ></div>`).join('')

const cardContents = data.map((i, index) => `<div class="card-content" id="card-content-${index}">
<div class="content-start"></div>
<div class="content-place">${i.place}</div>
<div class="content-title-1">${i.title1}</div>
<div class="content-title-2">${i.title2}</div>

</div>`).join('')

const sildeNumbers = data.map((_, index) => `<div class="item" id="slide-item-${index}" >${index + 1}</div>`).join('')
_('demo').innerHTML = cards + cardContents
_('slide-numbers').innerHTML = sildeNumbers

const range = (n) =>
    Array(n)
        .fill(0)
        .map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
    return `#card${index}`;
}
function getCardContent(index) {
    return `#card-content-${index}`;
}
function getSliderItem(index) {
    return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
    return new Promise((resolve) => {
        gsap.to(target, {
            ...properties,
            duration: duration,
            onComplete: resolve,
        });
    });
}

let order = range(data.length);
let detailsEven = true;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";

function updateSlideText(index) {
    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    document.querySelector(`${detailsActive} .place-box .text`).textContent = data[index].place;
    document.querySelector(`${detailsActive} .title-1`).textContent = data[index].title1;
    document.querySelector(`${detailsActive} .title-2`).textContent = data[index].title2;
    document.querySelector(`${detailsActive} .desc`).textContent = data[index].description;
}

function init() {
    const [active, ...rest] = order;
    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
    updateSlideText(active);
    const { innerHeight: height, innerWidth: width } = window;
    offsetTop = height - 430;
    offsetLeft = width - 830;

    gsap.set("#pagination", {
        top: offsetTop + 330,
        left: offsetLeft,
        y: 200,
        opacity: 0,
        zIndex: 60,
    });
    gsap.set("nav", { y: -200, opacity: 0 });

    gsap.set(getCard(active), {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
    });
    gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
    gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
    gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
    gsap.set(`${detailsInactive} .text`, { y: 100 });
    gsap.set(`${detailsInactive} .title-1`, { y: 100 });
    gsap.set(`${detailsInactive} .title-2`, { y: 100 });
    gsap.set(`${detailsInactive} .desc`, { y: 50 });
    gsap.set(`${detailsInactive} .cta`, { y: 60 });

    gsap.set(".progress-sub-foreground", {
        width: 500 * (1 / order.length) * (active + 1),
    });

    rest.forEach((i, index) => {
        gsap.set(getCard(i), {
            x: offsetLeft + 400 + index * (cardWidth + gap),
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            zIndex: 30,
            borderRadius: 10,
        });
        gsap.set(getCardContent(i), {
            x: offsetLeft + 400 + index * (cardWidth + gap),
            zIndex: 40,
            y: offsetTop + cardHeight - 100,
        });
        gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
    });

    gsap.set(".indicator", { x: -window.innerWidth });

    const startDelay = 0.6;

    gsap.to(".cover", {
        x: width + 400,
        delay: 0.5,
        ease,
        onComplete: () => {
            setTimeout(() => {
                loop();
            }, 500);
        },
    });
    rest.forEach((i, index) => {
        gsap.to(getCard(i), {
            x: offsetLeft + index * (cardWidth + gap),
            zIndex: 30,
            delay: 0.05 * index,
            ease,
            delay: startDelay,
        });
        gsap.to(getCardContent(i), {
            x: offsetLeft + index * (cardWidth + gap),
            zIndex: 40,
            delay: 0.05 * index,
            ease,
            delay: startDelay,
        });
    });
    gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
    gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
    gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}

let clicks = 0;

function step() {
    return new Promise((resolve) => {
        const tl = gsap.timeline({ onComplete: resolve });

        tl.call(() => {
            order.push(order.shift());
            detailsEven = !detailsEven;
            updateSlideText(order[0]);
        });

        tl.add(() => {
            const detailsActive = detailsEven ? "#details-even" : "#details-odd";
            const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
            const [active, ...rest] = order;
            const prv = rest[rest.length - 1];

            const sub = gsap.timeline();

            sub.set(detailsActive, { zIndex: 22 });
            sub.to(detailsActive, { opacity: 1, duration: 0.4, ease }, 0);
            sub.to(`${detailsActive} .text`, {
                y: 0,
                delay: 0.1,
                duration: 0.7,
                ease,
            }, 0);
            sub.to(`${detailsActive} .title-1`, {
                y: 0,
                delay: 0.15,
                duration: 0.7,
                ease,
            }, 0);
            sub.to(`${detailsActive} .title-2`, {
                y: 0,
                delay: 0.15,
                duration: 0.7,
                ease,
            }, 0);
            sub.to(`${detailsActive} .desc`, {
                y: 0,
                delay: 0.3,
                duration: 0.4,
                ease,
            }, 0);
            sub.to(`${detailsActive} .cta`, {
                y: 0,
                delay: 0.35,
                duration: 0.4,
                ease,
            }, 0);
            sub.set(detailsInactive, { zIndex: 12 }, 0);

            sub.set(getCard(prv), { zIndex: 10 }, 0);
            sub.set(getCard(active), { zIndex: 20 }, 0);
            sub.to(getCard(prv), { scale: 1.5, ease }, 0);

            sub.to(getCardContent(active), {
                y: offsetTop + cardHeight - 10,
                opacity: 0,
                duration: 0.3,
                ease,
            }, 0);
            sub.to(getSliderItem(active), { x: 0, ease }, 0);
            sub.to(getSliderItem(prv), { x: -numberSize, ease }, 0);
            sub.to(".progress-sub-foreground", {
                width: 500 * (1 / order.length) * (active + 1),
                ease,
            }, 0);

            sub.to(getCard(active), {
                x: 0,
                y: 0,
                ease,
                width: window.innerWidth,
                height: window.innerHeight,
                borderRadius: 0,
                onComplete: () => {
                    const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
                    gsap.set(getCard(prv), {
                        x: xNew,
                        y: offsetTop,
                        width: cardWidth,
                        height: cardHeight,
                        zIndex: 30,
                        borderRadius: 10,
                        scale: 1,
                    });

                    gsap.set(getCardContent(prv), {
                        x: xNew,
                        y: offsetTop + cardHeight - 100,
                        opacity: 1,
                        zIndex: 40,
                    });
                    gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

                    gsap.set(detailsInactive, { opacity: 0 });
                    gsap.set(`${detailsInactive} .text`, { y: 100 });
                    gsap.set(`${detailsInactive} .title-1`, { y: 100 });
                    gsap.set(`${detailsInactive} .title-2`, { y: 100 });
                    gsap.set(`${detailsInactive} .desc`, { y: 50 });
                    gsap.set(`${detailsInactive} .cta`, { y: 60 });
                    clicks -= 1;
                    if (clicks > 0) {
                        step();
                    }
                },
            }, 0);

            rest.forEach((i, index) => {
                if (i !== prv) {
                    const xNew = offsetLeft + index * (cardWidth + gap);
                    sub.set(getCard(i), { zIndex: 30 }, 0);
                    sub.to(getCard(i), {
                        x: xNew,
                        y: offsetTop,
                        width: cardWidth,
                        height: cardHeight,
                        ease,
                        delay: 0.1 * (index + 1),
                    }, 0);

                    sub.to(getCardContent(i), {
                        x: xNew,
                        y: offsetTop + cardHeight - 100,
                        opacity: 1,
                        zIndex: 40,
                        ease,
                        delay: 0.1 * (index + 1),
                    }, 0);
                    sub.to(getSliderItem(i), { x: (index + 1) * numberSize, ease }, 0);
                }
            });

            return sub;
        });
    });
}

async function loop() {
    await animate(".indicator", 2, { x: 0 });
    await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
    set(".indicator", { x: -window.innerWidth });
    await step();
    loop();
}

async function loadImage(src) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

async function loadImages() {
    const promises = data.map(({ image }) => loadImage(image));
    return Promise.all(promises);
}

async function start() {
    try {
        await loadImages();
        init();
    } catch (error) {
        console.error("One or more images failed to load", error);
    }
}

start()
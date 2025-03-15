// trigger to play music in the background with sweetalert
window.addEventListener('load', () => {
    Swal.fire({
        title: 'Do you want to play music in the background?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('.song').play();
            animationTimeline();
        } else {
            animationTimeline();
        }
    });
});

// animation timeline
const animationTimeline = () => {
    // split chars that needs to be animated individually
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    // Replace full stops with <br/> and split into segments
    let replacedText = textBoxChars.innerHTML.replace(/\.\s*/g, '.<br/>');
    let segments = replacedText.split(/<br\s*\/?>/gi);

    // Now wrap each segment in a container with class "line" and each character in its own span.
    segments = segments.map(segment => {
        // Trim to remove extra whitespace and split into characters
        const letterSpans = segment.trim().split("").map(letter => `<span>${letter}</span>`).join("");
        return `<div class="line">${letterSpans}</div>`;
    });

    // Replace the innerHTML with the new content (do not include extra <br/> tags since each line is its own block)
    textBoxChars.innerHTML = segments.join('');

    const hbd = document.getElementsByClassName("wish-hbd")[0];

    hbd.innerHTML = `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    // timeline
    const tl = new TimelineMax();

    tl.to(".container", 0.6, {
        visibility: "visible"
    })
    .from(".zero", 0.7, {
        opacity: 0,
        y: 10
    })
    .to(".zero", 0.7, {
        opacity: 0,
        y: 10
    }, "+=0")
    .from(".one", 0.7, {
        opacity: 0,
        y: 10
    })
    .from(".two", 0.4, {
        opacity: 0,
        y: 10
    })
    .to(".one",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "+=3.5")
    .to(".two",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "-=1")
    .from(".three", 0.7, {
        opacity: 0,
        y: 10
    })
    .to(".three",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "+=3")
    .from(".four", 0.7, {
        scale: 0.2,
        opacity: 0,
    })
    .from(".fake-btn", 0.3, {
        scale: 0.2,
        opacity: 0,
    })
    .staggerTo(
        ".hbd-chatbox span",
        1.5, {
            visibility: "visible",
        },
        0.00001// stagger time     
    )
    .to(".fake-btn", 0.1, {
        backgroundColor: "rgb(255,128,160)",
    },
    "+=4")
    .to(
        ".four",
        0.5, {
            scale: 0.2,
            opacity: 0,
            y: -150
        },
    "+=1")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
        scale: 1.2,
        x: 10,
        backgroundColor: "rgb(255,128,160)",
        color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(
        ".idea-5",
        0.7, {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
        },
        "+=1.5"
    )
    .to(
        ".idea-5 span",
        0.7, {
            rotation: 90,
            x: 8,
        },
        "+=1.4"
    )
    .to(
        ".idea-5",
        0.7, {
            scale: 0.2,
            opacity: 0,
        },
        "+=2"
    )
    .staggerFrom(
        ".idea-6 span",
        0.8, {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: Expo.easeOut,
        },
        0.2
    )
    .staggerTo(
        ".idea-6 span",
        0.8, {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: Expo.easeOut,
        },
        0.2,
        "+=1.5"
    )
    .staggerFromTo(
        ".baloons img",
        2.5, 
        {
            opacity: 0.9,
            y: 1400,
            x: () => Math.random() * 200 - 100  // random horizontal offset at start
        }, 
        {
            opacity: 1,
            y: -1000,
            x: () => Math.random() * 200 - 100  // random horizontal offset at end
        },
        0.1
    )
    .from(
        ".profile-picture",
        0.5, {
            scale: 3.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
        },
        "-=2"
    )
    .from(".hat", 0.5, {
        x: -100,
        y: 350,
        rotation: -180,
        opacity: 0,
    })
    .staggerFrom(
        ".wish-hbd span",
        0.7, {
            opacity: 0,
            y: -50,
            // scale: 0.3,
            rotation: 150,
            skewX: "30deg",
            ease: Elastic.easeOut.config(1, 0.5),
        },
        0.1
    )
    .staggerFromTo(
        ".wish-hbd span",
        0.7, {
            scale: 1.4,
            rotationY: 150,
        }, {
            scale: 1,
            rotationY: 0,
            color: "rgb(196, 95, 212)",
            ease: Expo.easeOut,
        },
        0.1,
        "party"
    )
    // Add glow effect tween after the Expo.easeOut tween
    .to(
        ".wish-hbd span",
        1,
        {
            textShadow: "0px 0px 20px #d883e6", // adjust color and blur as desired
            ease: Expo.easeOut,
        },
        "party+=0.7" // position the tween 0.7 seconds after the "party" label
    )
    .from(
        ".wish h5",
        0.5, {
            opacity: 0,
            y: 10,
            skewX: "-15deg",
        },
        "party"
    )
    .staggerTo(
        ".eight svg",
        1.5, {
            visibility: "visible",
            opacity: 0,
            scale: 80,
            repeat: 3,
            repeatDelay: 1.4,
        },
        0.3
    )
    .to(".six", 0.5, {
        opacity: 0,
        y: 30,
        zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
        ".last-smile",
        0.5, {
            rotation: 90,
        },
        "+=1"
    );


    // Restart Animation on click
    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        tl.restart();
    });

    // Create emoji rain
    createEmojiRain();
}

/**
 * Enhanced Emoji Rain with combined features
 * @param {Object} options - Animation options
 * @param {number} options.minSize - Minimum emoji size in pixels (default: 15)
 * @param {number} options.maxSize - Maximum emoji size in pixels (default: 50)
 * @param {number} options.baseSpeed - Base falling speed in seconds (default: 5)
 * @param {number} options.speedFactor - Speed multiplier (default: 1.5)
 * @param {number} options.frequency - Milliseconds between emoji creation (default: 300)
 * @param {boolean} options.behindContent - Position emojis behind content (default: true)
 */
function createEmojiRain(options = {}) {
    // Default settings with combined configuration options
    const settings = {
        minSize: 25,             // Minimum emoji size in pixels
        maxSize: 60,             // Maximum emoji size in pixels
        baseSpeed: 5,            // Base falling duration
        speedFactor: 1,        // Speed multiplier (higher = slower)
        frequency: 500,          // Milliseconds between emoji creation
        behindContent: true,     // Position emojis behind other content
        ...options
    };
    
    // Combined emoji list from both implementations
    const emojis = ['🎂', '🎁', '🎉', '🎊', '✨', '💖', '🍰', '🧁', '🍬', '🥳', '😍', '❤️', '💓', '💗', '💖', '💞', '💕', '💘', '💝'];
    
    // Create or get container for emojis
    let emojiContainer = document.querySelector('.emoji-rain');
    if (!emojiContainer) {
        emojiContainer = document.createElement('div');
        emojiContainer.className = 'emoji-rain';
        document.body.appendChild(emojiContainer);
        
        // Add styling for the container
        const style = document.createElement('style');
        style.innerHTML = `
            .emoji-rain {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: ${settings.behindContent ? '-1' : '100'};
                overflow: hidden;
            }
            .emoji-rain span {
                position: absolute;
                user-select: none;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create interval for continuous emoji creation
    const intervalId = setInterval(() => {
        // Create emoji element
        const emoji = document.createElement('span');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emojiContainer.appendChild(emoji);
        
        // Random size between min and max
        const size = Math.random() * (settings.maxSize - settings.minSize) + settings.minSize;
        emoji.style.fontSize = `${size}px`;
        
        // Random position and rotation
        const startX = Math.random() * window.innerWidth;
        const rotation = Math.random() * 15;
        
        // Calculate duration with variation for natural feel
        const durationVariation = gsap.utils.random(0.8, 1.2);
        const duration = settings.baseSpeed * settings.speedFactor * durationVariation;
        
        // Apply GSAP animation with combined approach
        gsap.fromTo(emoji, 
            {
                x: startX,
                y: -50,
                rotation: rotation,
                opacity: gsap.utils.random(0.7, 1),
            },
            {
                y: window.innerHeight + 100,
                x: startX + gsap.utils.random(-50, 50),
                rotation: rotation + gsap.utils.random(-15, 15),
                duration: duration,
                // Use your preferred ease (power1.out for smoother movement)
                ease: "power1.out",
                onComplete: () => {
                    // Clean up DOM
                    if (emoji.parentNode) {
                        emoji.parentNode.removeChild(emoji);
                    }
                }
            }
        );
    }, settings.frequency);
    
    // Return control object
    return {
        stop: () => clearInterval(intervalId)
    };
}

// Simple start function
function startEmojiRain(options = {}) {
    return createEmojiRain(options);
}

// Simple stop function
function stopEmojiRain(controller) {
    if (controller && controller.stop) {
        controller.stop();
    }
}

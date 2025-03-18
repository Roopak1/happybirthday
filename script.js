function promptForPassword() {
    Swal.fire({
        title: 'Enter Password',
        icon: 'info',
        input: 'password',
        inputLabel: 'Password',
        showCancelButton: false,
        confirmButtonText: 'Unlock',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.dismiss) {
            // User canceled
            Swal.fire('Access Denied', 'You cannot access this page.', 'error').then(() => {
                document.body.innerHTML = '';
            });
        } else if (result.value === '1') {
            // Correct password; now show gradient selector first
            showGradientSelector();
        } else {
            // Incorrect password; re-prompt
            Swal.fire('Wrong Password', 'Please try again.', 'error').then(() => {
                promptForPassword();
            });
        }
    });
}

// New function for selecting background gradient
function showGradientSelector() {
    // Remove text glow
    document.body.classList.add("disable-text-glow");

    const gradients = {
        lightBlue: 'radial-gradient(circle at top left, #91b6fa, #5597fa)',
        darkBlue: 'radial-gradient(circle at top left, #0a0f3a, #020b26)',
        black: 'black'
    };

    const htmlContent = `
        <div class="gradient-options" style="display: flex; flex-direction: column; align-items: center;">
            <div class="gradient-option" data-gradient="lightBlue" 
                 style="background: ${gradients.lightBlue}; height: 60px; width: 90%; margin: 10px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                Light Blue Gradient
            </div>
            <div class="gradient-option" data-gradient="darkBlue" 
                 style="background: ${gradients.darkBlue}; height: 60px; width: 90%; margin: 10px; border-radius: 8px; cursor: pointer; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                Dark Blue Gradient
            </div>
            <div class="gradient-option" data-gradient="black" 
                 style="background: ${gradients.black}; height: 60px; width: 90%; margin: 10px; border-radius: 8px; cursor: pointer; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                All Black
            </div>
        </div>
    `;
    
    Swal.fire({
        title: 'Select Background',
        html: htmlContent,
        showCancelButton: false,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        didOpen: () => {
            const options = document.querySelectorAll('.gradient-option');
            options.forEach(option => {
                option.addEventListener('mouseenter', () => {
                    const gradientType = option.getAttribute('data-gradient');
                    document.body.style.background = gradients[gradientType];
                });
                option.addEventListener('mouseleave', () => {
                    if (!document.body.dataset.selectedGradient) {
                        document.body.style.background = 'black';
                    } else {
                        document.body.style.background = gradients[document.body.dataset.selectedGradient];
                    }
                });
                option.addEventListener('click', () => {
                    options.forEach(opt => opt.classList.remove('selected-gradient'));
                    option.classList.add('selected-gradient');
                    document.body.dataset.selectedGradient = option.getAttribute('data-gradient');
                });
            });
            
            const style = document.createElement('style');
            style.textContent = `
                .gradient-option {
                    border: 3px solid transparent;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    box-shadow: 0px 2px 8px rgba(0,0,0,0.2);
                }
                .gradient-option:hover {
                    transform: scale(1.05);
                    box-shadow: 0px 4px 16px rgba(0,0,0,0.4);
                }
                .selected-gradient {
                    border: 3px solid #fff !important;
                    box-shadow: 0px 0px 15px #fff;
                }
                .gradient-options {
                    animation: fadeIn 0.5s ease forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        },
        preConfirm: () => {
            return document.body.dataset.selectedGradient || 'black';
        }
    }).then((result) => {
        // Restore text glow
        document.body.classList.remove("disable-text-glow");

        if (result.isConfirmed && result.value) {
            document.body.style.background = gradients[result.value];
        } else {
            document.body.style.background = 'black';
        }
        
        triggerMusicPrompt();
    });
}

// Add this function to create animation controls
function createAnimationControls(timeline) {
    // Create control container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'animation-controls';
    
    // Create Music control button (now first for top placement)
    const musicButton = document.createElement('button');
    musicButton.className = 'control-btn music-btn';
    musicButton.textContent = 'Play Music';
    
    // Create a row container for the other buttons
    const bottomRowContainer = document.createElement('div');
    bottomRowContainer.className = 'bottom-row-controls';
    
    // Create Back button
    const backButton = document.createElement('button');
    backButton.className = 'control-btn';
    backButton.textContent = 'Back';
    
    // Create Pause/Play button
    const pausePlayButton = document.createElement('button');
    pausePlayButton.className = 'control-btn';
    pausePlayButton.textContent = 'Pause';
    
    // Add bottom row buttons to their container
    bottomRowContainer.appendChild(backButton);
    bottomRowContainer.appendChild(pausePlayButton);
    
    // Add all elements to main container (music on top, then row of other buttons)
    controlsContainer.appendChild(musicButton);
    controlsContainer.appendChild(bottomRowContainer);
    
    // Add container to body
    document.body.appendChild(controlsContainer);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .animation-controls {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 10px;
        }
        
        .bottom-row-controls {
            display: flex;
            gap: 10px;
        }
        
        .control-btn {
            background-color: white;
            color: black;
            border: none;
            border-radius: 5px;
            padding: 8px 15px;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
        }
        
        .control-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .control-btn:active {
            transform: translateY(0);
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        
        .music-btn {
            background-color: #ffcce0;
            width: 100%;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners
    backButton.addEventListener('click', () => {
        // Go back 5 seconds in the timeline
        const currentTime = timeline.time();
        const newTime = Math.max(0, currentTime - 5);
        timeline.seek(newTime);
    });
    
    pausePlayButton.addEventListener('click', () => {
        if (timeline.paused()) {
            timeline.resume();
            pausePlayButton.textContent = 'Pause';
        } else {
            timeline.pause();
            pausePlayButton.textContent = 'Play';
        }
    });
    
    // Add music control functionality
    const audioElement = document.querySelector('.song');
    
    // Initial button state should reflect audio's initial state
    if (audioElement) {
        musicButton.textContent = audioElement.paused ? 'Play Music' : 'Pause Music';
        
        musicButton.addEventListener('click', () => {
            if (audioElement.paused) {
                audioElement.play();
                musicButton.textContent = 'Pause Music';
            } else {
                audioElement.pause();
                musicButton.textContent = 'Play Music';
            }
        });
    } else {
        // If audio element doesn't exist or isn't available yet
        musicButton.style.display = 'none';
    }
    
    return controlsContainer;
}

// Changed code: wrap existing music prompt in a function
function triggerMusicPrompt() {
    Swal.fire({
        title: 'Do you want to play music in the background?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        const audioElement = document.querySelector('.song');
        
        if (result.isConfirmed && audioElement) {
            audioElement.play();
            // Find and update the music button if it exists
            const musicBtn = document.querySelector('.music-btn');
            if (musicBtn) {
                musicBtn.textContent = 'Pause Music';
            }
        }
        
        animationTimeline();
    });
}

// Now run the password check first on load
window.addEventListener('load', promptForPassword);

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

    // Right before creating the timeline, disable replay area interactions:
    gsap.set(".ten", { pointerEvents: "none", opacity: 0 });

    // Create the timeline
    const tl = new TimelineMax();
    
    // Add animation controls after timeline is created
    createAnimationControls(tl);

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
    }, "+=7")
    .from(".zero-1", 0.7, {
        opacity: 0,
        y: 10
    })
    .to(".zero-1", 0.7, {
        opacity: 0,
        y: 10
    }, "+=9")
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
        0.09// stagger time     
    )
    .to(".fake-btn", 0.1, {
        backgroundColor: "rgb(255,128,160)",
    },
    "+=1")
    .to(
        ".four",
        0.5, {
            scale: 0.2,
            opacity: 0,
            y: -150
        },
    "+=1")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=4")
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
    .from(".transition-line", 0.7, { opacity: 0, y: 20, })
    .to(".transition-line", 0.7, { opacity: 0, y: -20, }, "+=2")
  
    .from(".final-one", 0.7, { opacity: 0, y: 20, })
    .to(".final-one", 0.7, { opacity: 0, y: -20, }, "+=2")
  
    .from(".final-two", 0.7, { opacity: 0, y: 20, })
    .to(".final-two", 0.7, { opacity: 0, y: -20, }, "+=2")
  
    .from(".final-three", 0.7, { opacity: 0, y: 20, })
    .to(".final-three", 0.7, { opacity: 0, y: -20, }, "+=2")
  
    .from(".final-four", 0.7, { opacity: 0, y: 20, })
    .to(".final-four", 0.7, { opacity: 0, y: -20, }, "+=2")
  
    .from(".final-five", 0.7, { opacity: 0, y: 20, })
    .to(".final-five", 0.7, { opacity: 0, y: -20, }, "+=2")
  
    .from(".final-six", 0.7, { opacity: 0, y: 20, })
    .to(".final-six", 0.7, { opacity: 0, y: -20, ease: Power2.easeIn }, "+=2")
  
  // ✨ Transition to Poem
    .from(".poem-intro-one", 0.7, { opacity: 0, y: 20, })
    .to(".poem-intro-one", 0.7, { opacity: 0, y: -20, }, "+=4")
  
    .from(".poem-intro-two", 0.7, { opacity: 0, y: 20, })
    .to(".poem-intro-two", 0.7, { opacity: 0, y: -20, }, "+=3")
  
    function showPoemAnimation(tl) {
        const poem = [
            ["Rani, the love of my life so true,", "If I were a cat, I'd still choose you.", "In all my nine lives, time after time,", "You’d forever and always be mine."],
            ["You're the most beautiful soul I've seen,", "Your vibe gives me the strength I need.", "Your voice calms the war inside of me,", "Like waves that soothe the restless sea."],
            ["Your eyes shine brighter than the stars,", "A universe held in your tender heart.", "I long to hold you, just for a while,", "To feel your warmth, to live in your smile."],
            ["Yet sometimes, you forget to care,", "For the heart that beats with love so rare.", "You hide your pain, but I can see,", "The weight you carry silently."],
            ["And when you do, it breaks me too,", "Like I have failed in loving you.", "You love the world with a heart so wide,", "But sometimes, love should stand with pride."],
            ["You give so much, yet you forget,", "That you, my love, deserve respect.", "I love the way you tease me light,", "Your playful ways just feel so right."],
            ["But when the words grow sharp and deep,", "They wound my heart and make me weep.", "I want to show you how precious you are,", "May God grant your wishes, near and far."],
            ["But not so easily, that you forget,", "The beauty of working for dreams unmet.", "Yet what pains me most, beyond control,", "Is the distance that tugs upon my soul."],
            ["You deserve the world, yet here I stand,", "So far away, yet reaching my hand.", "Rani, my love, my heart, my light,", "With you, my world feels just so right."]
        ];
    
        const container = document.createElement("div");
        container.classList.add("poem-container");
        document.body.appendChild(container);
    
        let stanzaIndex = 0;
        
        // 🔹 Pause main GSAP timeline while poem plays
        tl.pause();
    
        function showStanza() {
            if (stanzaIndex >= poem.length) {
                // 🔹 Resume the main GSAP timeline when poem is done
                gsap.to(container, { 
                    opacity: 0, duration: 1.5, ease: "expo.out", 
                    onComplete: () => {
                        container.remove();
                        // Add delay before resuming the timeline
                        setTimeout(() => {
                            tl.resume(); // Resume main timeline
                        }, 6000); // 6 seconds delay (adjust as needed)
                    } 
                });
                return;
            }
    
            container.innerHTML = ""; // Clear previous stanza
    
            let tlStanza = gsap.timeline();
            poem[stanzaIndex].forEach((line, i) => {
                let lineElement = document.createElement("p");
                lineElement.textContent = line;
                lineElement.style.opacity = "0";
                container.appendChild(lineElement);
    
                tlStanza.to(lineElement, { opacity: 1, duration: 1, delay: i * 0.9, ease: "power2.in" });
            });
    
            tlStanza.to(container.children, { 
                opacity: 0, duration: 1.5, delay: 4, ease: "expo.out", stagger: 0.3, 
                onComplete: () => {
                    stanzaIndex++;
                    showStanza(); // Show next stanza
                }
            });
        }
    
        showStanza(); // Start the animation
    }
    
    // 🔹 Add Poem Animation to Timeline (it will pause until the poem completes)
    tl.add(() => showPoemAnimation(tl), "+=2"); // Adjust timing if needed    


  // 💖 Transition Before HBD Wish
  tl.from(".transition-feeling", 0.7, { opacity: 0, scale: 1.2, ease: Expo.easeOut })
    .to(".transition-feeling", 0.7, { opacity: 0, scale: 1.2, ease: Expo.easeIn }, "+=2")
  
    .from(".transition-deep", 0.7, { opacity: 0, scale: 1.2, ease: Expo.easeOut })
    .to(".transition-deep", 0.7, { opacity: 0, scale: 1.2, ease: Expo.easeIn }, "+=2")
  
    .from(".transition-after-poem", 0.7, { opacity: 0, scale: 1.2, ease: Expo.easeOut })
    .to(".transition-after-poem", 0.7, { opacity: 0, scale: 1.2, ease: Expo.easeIn }, "+=2")
  
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
    .staggerFrom(".nine p", 1, ideaTextTrans, 2.5)
    .to(
        ".last-smile",
        0.5, {
            rotation: 90,
        },
        "+=4"
    )
    .to(".nine", { opacity: 0, duration: 1, ease: "power2.out" })
    .set(".ten", { opacity: 1, pointerEvents: "auto" });

    document.querySelector("#replay").addEventListener("click", () => {
        gsap.to(".ten", { 
            opacity: 0, 
            pointerEvents: "none", 
            duration: 0.5, 
            ease: "power2.out", 
            onComplete: () => {
                tl.restart(); // Restart the GSAP animation
            }
        });
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
        // Emoji size range
        minSize: 25,
        maxSize: 60,
        
        // Text size range
        minTextSize: 20,
        maxTextSize: 40,
        
        baseSpeed: 6,
        speedFactor: 1,
        frequency: 450,
        behindContent: true,
        ...options
    };
    
    const emojis = [ 
        'BABE', '🎂', '💍', 'QUEEN', '🎉', 'DARLING', '🎊', '💖', '🍰', 'JOY',
        '💋', 'SWEET', '🥳', '💘', '💝', '🥰', '✨', '❤️', '💎', '💞', 
        'BAE', '🎉', '💋', '💋', '🍬', 'SMILE', '💋', '💞', 'CUTE', '💖',
        'KISS', '✨', '💗', '💓', 'RANI', 'BABY', 'LOVE', '🎂', '🍬', 'BBG',
        '🧁', '😍', '💎', '💍', '🥰', '💝', '🥳', 'MY LOVE', 'LOVELY', 'HONEY',
        '💗', '😍', '💓', '🎊', '🍰', '🧁', '❤️', 'DEAR', '🎁', 'MOON', '💘', '🎁'
      ];
      

    let emojiContainer = document.querySelector('.emoji-rain');
    if (!emojiContainer) {
        emojiContainer = document.createElement('div');
        emojiContainer.className = 'emoji-rain';
        document.body.appendChild(emojiContainer);

        // Add styling for the container and text-based items
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
            .emoji-rain .text-emoji {
                color: rgb(255, 114, 150);
                font-weight: 700;
            }
        `;
        document.head.appendChild(style);
    }

    // Create interval for continuous emoji creation
    const intervalId = setInterval(() => {
        const item = emojis[Math.floor(Math.random() * emojis.length)];
        const element = document.createElement('span');

        // Check if item is text, then apply text-emoji class and size
        let size;
        if (/[a-zA-Z]/.test(item)) {
            element.classList.add('text-emoji');
            size = Math.random() * (settings.maxTextSize - settings.minTextSize) + settings.minTextSize;

            // Add pulsing glow effect to text only
            gsap.to(element, {
                textShadow: "0 0 10px #ff91ad",    // customize color / intensity
                duration: 1.2,                    // pulsing speed
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        } else {
            size = Math.random() * (settings.maxSize - settings.minSize) + settings.minSize;
        }

        element.style.fontSize = `${size}px`;
        element.textContent = item;
        emojiContainer.appendChild(element);

        // Apply falling animation
        const startX = Math.random() * window.innerWidth;
        const rotation = Math.random() * 15;
        const durationVariation = gsap.utils.random(0.8, 1.2);
        const duration = settings.baseSpeed * settings.speedFactor * durationVariation;

        gsap.fromTo(
            element,
            {
                x: startX,
                y: -50,
                rotation: rotation,
                opacity: gsap.utils.random(0.7, 1),
            },
            {
                y: window.innerHeight + 100,
                x: startX + gsap.utils.random(-50, 50),
                rotation: rotation + gsap.utils.random(-20, 15),
                duration: duration,
                ease: "power1.out",
                onComplete: () => {
                    if (element.parentNode) {
                        element.parentNode.removeChild(element);
                    }
                }
            }
        );
    }, settings.frequency);

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

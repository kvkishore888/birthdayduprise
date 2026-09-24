/* ✨ Edit this file to personalize the birthday adventure. */
window.BIRTHDAY_CONFIG = {
  name: "Your Name",
  message: `Happy Birthday! ❤️\nI hope today gives you all the little reasons to smile, laugh until your cheeks hurt, and make memories you'll want to keep forever.\n\nThank you for being wonderfully you. May this next chapter bring you exciting adventures, peaceful moments, ridiculous laughter, and people who always remind you how special you are.\n\nNow go enjoy your day. You absolutely deserve it! 🎂✨`,
  music: "assets/birthday-music.mp3",
  typingSpeed: 24,
  confettiColors: ["#ff6b9a", "#ffc98e", "#a78bfa", "#ffffff", "#75e6c2"],

  // WALL 1 — HER PHOTOS
  // Replace these image paths with the photos you want in her personal frame wall.
  memories: [
    { image: "assets/her-1.jpg", caption: "A moment worth remembering ❤️", date: "Her moments" },
    { image: "assets/her-2.jpg", caption: "That smile though ✨", date: "Her moments" },
    { image: "assets/her-3.jpg", caption: "One of those beautiful days 🌸", date: "Her moments" },
    { image: "assets/her-4.jpg", caption: "Certified good memory 💫", date: "Her moments" }
  ],

  // WALL 2 — OUR GANG MEMORIES
  // Add gang photos here later using the same format.
  gangMemories: [],

  missionQuiz: [
    { q: "What's today's occasion?", options: ["Friday 😐", "Random day 🤨", "Treat day 🍰"], correct: 2, wrong: "Hmm... Friday? Nice try 😂 But this is definitely a treat day!" },
    { q: "What should you receive today?", options: ["Homework 📚", "More homework 😭", "Gifts 🎁"], correct: 2, wrong: "WHO VOTED FOR HOMEWORK?! 😂" },
    { q: "Who deserves an amazing day today?", options: ["Me 😎", "Obviously me 😌", "ME!!! 🎉"], correct: 2, wrong: "There is only one acceptable answer here. 😌" }
  ],
  selfQuiz: [
    { q: "What are you most likely to say?", options: ["I'm hungry.", "I'm tired.", "Let's go somewhere.", "All of the above 😂"], correct: 3 },
    { q: "What's your hidden superpower?", options: ["Sleeping", "Overthinking", "Making everyone laugh", "Being late"], correct: 2 },
    { q: "Your birthday survival strategy?", options: ["Cake first", "Photos later", "Enjoy everything", "All of the above 🎂"], correct: 3 }
  ]
};
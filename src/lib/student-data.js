const names_array = [
    "Aria Frost", "Ethan Drake", "Seraphina Vega", "Oliver Knight", "Luna Rose",
    "Mason Storm", "Isabella Wilde", "Noah Ember", "Zoey Raven", "Alexander Blaze",
    "Willow Sky", "Sebastian Orion", "Aurora Storm", "Liam Phoenix", "Mia Shadow",
    "Lucas Steele", "Harper Star", "Elijah Stone", "Penelope Frost", "Logan Hawk",
    "Sophia Nova", "Jackson Frost", "Amelia Rain", "Caleb Hawk", "Grace Ember",
    "Gabriel Storm", "Scarlett Luna", "Levi Eclipse", "Ava Blaze", "Samuel Frost",
    "Stella Dawn", "Benjamin Nova", "Chloe Raven", "Daniel Frost", "Emily Eclipse",
    "Owen Drake", "Ruby Star", "Carter Storm", "Lily Ember", "Isaac Sky", "Evelyn Moon",
    "Wyatt Blaze", "Victoria Raven", "Henry Hawk", "Zoe Storm", "Julian Frost",
    "Penelope Rain", "Nolan Orion", "Scarlett Star", "Xavier Blaze"
]

const scores_array = [
    { 'A+': 95 },
    { 'A': 90 },
    { 'B+': 85 },
    { 'B': 80 },
    { 'C+': 75 },
    { 'C': 70 },
    { 'D+': 65 },
    { 'D': 60 },
    { 'E+': 55 },
    { 'E': 50 },
    { 'F': 45 }
]

const gen_student_data = () => {
    return names_array.map((name, i) => {
        const scoreObj = scores_array[Math.floor(Math.random() * scores_array.length)]
        const score = Object.keys(scoreObj)[0];

        return {
            name,
            score,
            percentage: scoreObj[score],
            class: Math.floor(i / 10) + 1
        };
    })
}

// console.log(JSON.stringify(gen_student_data()));

export default gen_student_data;
export const staticGameData = {
    "cards": [
        "ZS1","ZS2","ZS3","ZS4",
        "HP1","HP2","HP3","HP4",
        "AP1","AP2","AP3","AP4",
        "AT1","AT2","AT3","AT4",
        "HD1","HD2","HD3","HD4",
        "PS1","PS2","PS3","PS4"
    ],
    "oppCards": ["ZS1","HP1","HP2", "AP1","AP2","AT1","AT2","HD1","HD3","PS1"],
    "stabCards": {"ZS": 0, "HP": 1, "AP": 2, "AT": 3, "HD": 4, "PS": 5},
    "rivalCards": {"ZS": [1,4], "HP": [0,1], "AP": [1,3], "AT": [3,5], "HD": [0,5], "PS": [3,4]},
    "gods": ['zeus','hephaestus','aphrodite', 'athena', 'hades', 'poseidon'],
    "godStats": {
        'zeus': {
            health: 340,
            strength: 150,
            defense: 100,
            speed: 110,
            charm: 10,
            affinity: -10    
        },
        'hephaestus': {
            health: 360,
            strength: 100,
            defense: 170,
            speed: 100,
            charm: -40,
            affinity: 0    
        },
        'aphrodite': {
            health: 320,
            strength: 100,
            defense: 100,
            speed: 110,
            charm: 50,
            affinity: 30    
        },
        'athena': {
            health: 260,
            strength: 150,
            defense: 100,
            speed: 120,
            charm: 0,
            affinity: 20    
        },
        'hades': {
            health: 300,
            strength: 120,
            defense: 90,
            speed: 140,
            charm: 40,
            affinity: 0    
        },
        'poseidon': {
            health: 300,
            strength: 100,
            defense: 140,
            speed: 100,
            charm: 0,
            affinity: 50    
        }
    }
}
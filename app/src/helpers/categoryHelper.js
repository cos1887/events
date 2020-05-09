export function getCategoryIcon(category='angle right') {
    const categoryIcons = {
        "Conferencias": "microphone", 
        "Cursos": "book", 
        "Espectaculos":"eye",
        "Otros": "circle",
        "Exposiciones":  "camera retro",
        "Cine": "film", 
        "Excursiones":  "globe",
        "Deportes":  "volleyball ball",
        "Fiestas":  "magic", 
        "Actividades": "tasks", 
        "default": "angle right"
    }; 
    if( categoryIcons[category]) {
        return categoryIcons[category];  
    }
    return categoryIcons["default"];  
}
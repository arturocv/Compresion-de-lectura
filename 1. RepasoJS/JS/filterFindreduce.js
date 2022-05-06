const personas = [
    {nombre: 'Arturo', edad: 40, aprendiendo: 'JS'},
    {nombre: 'Julio', edad: 12, aprendiendo: 'Java'},
    {nombre: 'Milena', edad: 38, aprendiendo: 'Angular'},
    {nombre: 'Mari', edad: 15, aprendiendo: 'PHP'},
    {nombre: 'Thomas', edad: 9, aprendiendo: 'React'}
]

console.log(personas);

//Metodo filter
const mayores = personas.filter(persona => {
    return persona.edad > 28;
});

console.log(mayores);

//Medoto find
const julio = personas.find(persona => {
    return persona.nombre === 'Julio';
});

console.log(julio);

//METODO REDUCE
let total = personas.reduce((edadTotal, persona) => {
    return edadTotal + persona.edad;
}, 0);

console.log(total);
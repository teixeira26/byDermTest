const products = [{
    name: 'Cleanser Gel - 100gr',
    description: 'Con Aloe Vera.',
    imagePath: 'cleanser100.webp'
}, {
    name: 'Cleanser Gel - 150gr',
    description: 'Con Aloe Vera.',
    imagePath: 'cleanser150.webp'
}, {
    name: 'Cleanser Milk - 100gr',
    description: 'Con vitamina E (antioxidante).',
    imagePath: 'milk100.webp'
}, {
    name: 'Cleanser Milk - 150gr',
    description: 'Con vitamina E (antioxidante).',
    imagePath: 'milk150.webp'
}, {
    name: 'Cleanser Aqua - 250ml',
    description: 'Aloe Vera + Té verde + Hammamelis.',
    imagePath: 'aqua250.webp'
},{
    name: 'Cleanser Aqua - 100ml',
    description: 'Aloe Vera + Té verde + Hammamelis.',
    imagePath: 'aqua100.webp'
},
{
    name: 'By Block - Tono Claro',
    description: 'Ectoína + D.Titanio + Hamamelis + A.Vera + M.Karite + C.Levadura.',
    imagePath: 'blockClaro.webp'
},
{
    name: 'By Block Fluid - Tono Claro',
    description: 'Ectoina + Hamamelis + Manteca de karité + Aloe vera + Extracto de células vivas de levadura',
    imagePath: 'fluidClaro.webp'
},
{
    name: 'By Block Fluid - Tono Medio',
    description: 'Ectoina + Hamamelis + Manteca de karité + Aloe vera + Extracto de células vivas de levadura',
    imagePath: 'fluidMedio.webp'
},
{
    name: 'By Block - Tono Oscuro',
    description: 'Ectoína + D.Titanio + Hamamelis + A.Vera + M.Karite + C.Levadura.',
    imagePath: 'blockOscuro.webp'
},
{
    name: 'By Block - Blanco Clásico',
    description: 'Ectoína + D.Titanio + Hamamelis + A.Vera + M.Karite + C.Levadura.',
    imagePath: 'blockClasico.webp'
},
{
    name: 'Fresh Skin Roxa - 75ml',
    description: 'Malva + Hamamelis + Manzanilla + Aloe Vera',
    imagePath: 'freshRoxa.webp'
},
{
    name: 'Fresh Skin Roxa - 150ml',
    description: 'Malva + Hamamelis + Manzanilla + Aloe Vera',
    imagePath: 'freshRoxa150.webp'
},
{
    name: 'Eyes - 15gr',
    description: 'Con uniesferas de vitaminas A+E y aloe vera.',
    imagePath: 'eyes15.webp'
},
{
    name: 'Eyes - 30gr',
    description: 'Con uniesferas de vitaminas A+E y aloe vera.',
    imagePath: 'eyes30.webp'
},
{
    name: 'Repair Skin - 50gr',
    description: 'Con liposomas Antiage de Vitamina E + Filtro Solar FPS 15.',
    imagePath: 'repair50.webp'
},
{
    name: 'Nutri Skin Facial - 60gr',
    description: 'Con vitaminas A+E+ Aceite de almendras.',
    imagePath: 'nutri60.webp'
},
{
    name: 'Nutri Skin Facial - 50gr',
    description: 'Con vitaminas A+E+ Aceite de almendras.',
    imagePath: 'nutri50.webp'
},
{
    name: 'Hydra Skin - 50gr',
    description: 'Con aceite vegetal de Borraja y jojoba, ADN vegetal y fosfolípidos de soja.',
    imagePath: 'hydra50.webp'
},
{
    name: 'Hydra Skin - 60gr',
    description: 'Con aceite vegetal de Borraja y jojoba, ADN vegetal y fosfolípidos de soja.',
    imagePath: 'hydra60.webp'
},];

export interface product
{
    name: string,
    description: string,
    imagePath: string
}

export default products;
const products = [{
    name: 'Cleanser Gel',
    quantity: '100',
    function: 'Astringente',
    vehicle: 'Gel Limpieza',
    price: '9,430.56',
    discount: '25',
    activeIngredient: 'Con Aloe Vera.',
    imagePath: 'cleanser100.webp',
    category: 'string',
    id: '12'
}, {
    name: 'Cleanser Gel',
    quantity: '150',
    function: 'Astringente',
    vehicle: 'Gel Limpieza',
    price: '12,341.16',
    discount: '25',
    activeIngredient: 'Con Aloe Vera.',
    imagePath: 'cleanser150.webp',
    category: 'Higiene',
    id: '2344'
}, {
    name: 'Cleanser Milk',
    quantity: '100',
    function: 'Antioxidante',
    vehicle: 'Solución Micelar',
    price: '7,754.40',
    discount: '25',
    activeIngredient: 'Con vitamina E (antioxidante).',
    imagePath: 'milk100.webp',
    category: 'Higiene',
    id: 'dsf'
}, {
    name: 'Cleanser Milk',
    quantity: '150',
    function: 'Antioxidante',
    vehicle: 'Solución Micelar',
    price: '12,064.68',
    discount: '25',
    activeIngredient: 'Con vitamina E (antioxidante).',
    imagePath: 'milk150.webp',
    category: 'Higiene',
    id: '2314243'
}, {
    name: 'Cleanser Aqua',
    quantity: '250',
    function: 'Descongestivo',
    vehicle: 'Solución Micelar',
    price: '11,575.44',
    discount: '25',
    activeIngredient: 'Aloe Vera + Té verde + Hammamelis.',
    imagePath: 'aqua250.webp',
    category: 'Higiene',
    id: '4dr2142'
},{
    name: 'Cleanser Aqua',
    quantity: '100',
    function: 'Descongestivo',
    vehicle: 'Solución Micelar',
    price: '8,561.16',
    discount: '25',
    activeIngredient: 'Aloe Vera + Té verde + Hammamelis.',
    imagePath: 'aqua100.webp',
    category: 'string',
    id: 'dfdasfs'
},
// {
//     name: 'By Block - Tono Claro',
//     quantity: '',
//     function: '',
//     vehicle: '',
//     price: '',
//     discount: '25',
//     activeIngredient: 'Ectoína + D.Titanio + Hamamelis + A.Vera + M.Karite + C.Levadura.',
//     imagePath: 'blockClaro.webp',
//     category: 'string'
// },
// {
//     name: 'By Block Fluid - Tono Claro',
//     quantity: '',
//     function: '',
//     vehicle: '',
//     price: '',
//     discount: '25',
//     activeIngredient: 'Ectoina + Hamamelis + Manteca de karité + Aloe vera + Extracto de células vivas de levadura',
//     imagePath: 'fluidClaro.webp',
//     category: 'string'
// },
// {
//     name: 'By Block Fluid - Tono Medio',
//     quantity: '',
//     function: '',
//     vehicle: '',
//     price: '',
//     discount: '25',
//     activeIngredient: 'Ectoina + Hamamelis + Manteca de karité + Aloe vera + Extracto de células vivas de levadura',
//     imagePath: 'fluidMedio.webp',
//     category: 'string'
// },
// {
//     name: 'By Block - Tono Oscuro',
//     quantity: '',
//     function: '',
//     vehicle: '',
//     price: '',
//     discount: '25',
//     activeIngredient: 'Ectoína + D.Titanio + Hamamelis + A.Vera + M.Karite + C.Levadura.',
//     imagePath: 'blockOscuro.webp',
//     category: 'string'
// },
// {
//     name: 'By Block - Blanco Clásico',
//     quantity: '',
//     function: '',
//     vehicle: '',
//     price: '',
//     discount: '25',
//     activeIngredient: 'Ectoína + D.Titanio + Hamamelis + A.Vera + M.Karite + C.Levadura.',
//     imagePath: 'blockClasico.webp',
//     category: 'string'
// },
// {
//     name: 'Fresh Skin Roxa',
//     quantity: '',
//     function: '',
//     vehicle: '',
//     price: '',
//     discount: '25',
//     activeIngredient: 'Malva + Hamamelis + Manzanilla + Aloe Vera',
//     imagePath: 'freshRoxa.webp',
//     category: 'string'
// },
// {
//     name: 'Fresh Skin Roxa',
//     quantity: '150',
//     function: '',
//     vehicle: '',
//     price: '',
//     discount: '25',
//     activeIngredient: 'Malva + Hamamelis + Manzanilla + Aloe Vera',
//     imagePath: 'freshRoxa150.webp',
//     category: 'string'
// },
// {
//     name: 'Eyes',
//     quantity: '15',
//     function: '',
//     vehicle: '',
//     price: '',
//     discount: '25',
//     activeIngredient: 'Con uniesferas de vitaminas A+E y aloe vera.',
//     imagePath: 'eyes15.webp',
//     category: 'string'
// },
// {
//     name: 'Eyes',
//     quantity: '30',
//     function: '',
//     vehicle: '',
//     price: '',
//     discount: '25',
//     activeIngredient: 'Con uniesferas de vitaminas A+E y aloe vera.',
//     imagePath: 'eyes30.webp',
//     category: 'string'
// },
// {
//     name: 'Repair Skin',
//     quantity: '50',
//     function: '',
//     vehicle: '',
//     price: '',
//     discount: '25',
//     activeIngredient: 'Con liposomas Antiage de Vitamina E + Filtro Solar FPS 15.',
//     imagePath: 'repair50.webp',
//     category: 'string'
// },
// {
//     name: 'Nutri Skin Facial',
//     quantity: '60',
//     function: '',
//     vehicle: '',
//     price: '',
//     discount: '25',
//     activeIngredient: 'Con vitaminas A+E+ Aceite de almendras.',
//     imagePath: 'nutri60.webp',
//     category: 'string'
// },
// {
//     name: 'Nutri Skin Facial',
//     quantity: '50',
//     function: '',
//     vehicle: '',
//     price: '',
//     discount: '25',
//     activeIngredient: 'Con vitaminas A+E+ Aceite de almendras.',
//     imagePath: 'nutri50.webp',
//     category: 'string'
// },
// {
//     name: 'Hydra Skin',
//     quantity: '50',
//     function: '',
//     vehicle: '',
//     price: '',
//     discount: '25',
//     activeIngredient: 'Con aceite vegetal de Borraja y jojoba, ADN vegetal y fosfolípidos de soja.',
//     imagePath: 'hydra50.webp',
//     category: 'string'
// },
// {
//     name: 'Hydra Skin',
//     quantity: '60',
//     function: '',
//     vehicle: '',
//     price: '',
//     discount: '25',
//     activeIngredient: 'Con aceite vegetal de Borraja y jojoba, ADN vegetal y fosfolípidos de soja.',
//     imagePath: 'hydra60.webp',
//     category: 'string'
// }
];

export interface product
{
    name: string;
  imagePath: string;
  quantity: string;
  function: string;
  vehicle: string;
  price: string;
  discount: string;
  activeIngredient: string;
  category: string;
  id: string,
}

export default products;
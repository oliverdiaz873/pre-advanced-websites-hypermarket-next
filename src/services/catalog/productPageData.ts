/**
 * productPageData.ts
 *
 * PropÃ³sito: Contiene el contenido editorial exclusivo de las pÃ¡ginas de detalle
 * de cada producto: pÃ¡rrafo de descripciÃ³n y lista de caracterÃ­sticas (detalles).
 *
 * Â¿Por quÃ© existe separado de productos.ts?
 * productos.ts guarda los datos estructurales que usa toda la app (precio, imagen,
 * categorÃ­a, URL). Este archivo guarda Ãºnicamente el contenido largo que solo
 * necesita la pÃ¡gina /product/:id â€” mantenerlos separados evita cargar texto
 * innecesario en el resto de la aplicaciÃ³n.
 *
 * ConvenciÃ³n de claves: el productId debe coincidir exactamente con el campo `id`
 * en productos.ts. Los productos sin entrada aquÃ­ usan un fallback genÃ©rico
 * definido en ProductDetailSection.tsx.
 *
 * MigraciÃ³n por fases:
 *   Fase 1 â€“ Alimentos
 *   Fase 2 â€“ ElectrodomÃ©sticos
 *   Fase 3 â€“ TecnologÃ­a
 *   Fase 4 â€“ Farmacia
 *   Fase 5 â€“ FerreterÃ­a
 *   Fase 6 â€“ Juguetes
 *   Fase 7 â€“ Muebles y DecoraciÃ³n
 *   Fase 8 â€“ Ropa
 */

export interface ProductPageData {
    description: string
    detalles: string[]
}

export const productPageData: Record<string, ProductPageData> = {

    // â”€â”€â”€ ALIMENTOS / BEBIDAS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    coca_cola: {
        description: 'Coca Cola es la bebida refrescante mÃ¡s icÃ³nica del mundo. Disfruta de su sabor Ãºnico, burbujeante y refrescante que acompaÃ±a los mejores momentos de tu vida.',
        detalles: [
            'Sabor: Original',
            'CalorÃ­as: 140 kcal',
            'PresentaciÃ³n: Botella de 2 Litros',
            'Ideal para: AcompaÃ±ar cualquier momento',
            'Temperatura recomendada: FrÃ­a',
        ],
    },

    coca_cola_zero: {
        description: 'Coca Cola Zero es la opciÃ³n perfecta para quienes buscan el sabor original de Coca-Cola pero sin azÃºcar y sin calorÃ­as. RefrÃ©scate con la chispa de siempre, ahora mÃ¡s ligera.',
        detalles: [
            'Sabor: Original (Zero Sugar)',
            'CalorÃ­as: 0 kcal',
            'AzÃºcares: 0g',
            'PresentaciÃ³n: Botella de 2 Litros',
            'Ideal para: AcompaÃ±ar cualquier momento',
        ],
    },

    country_club_frambuesa: {
        description: 'Country Club Frambuesa es el refresco dominicano por excelencia, con su caracterÃ­stico sabor a frambuesa que encanta a todos. Ideal para compartir en familia y amigos.',
        detalles: [
            'Sabor: Frambuesa',
            'PresentaciÃ³n: Botella de 2 Litros',
            'Beneficios: Sabor Ãºnico y refrescante',
            'Ideal para: Fiestas, comidas y meriendas',
            'TamaÃ±o: 2 Litros',
        ],
    },

    country_club_uva: {
        description: 'Country Club Uva ofrece un sabor intenso y dulce que encanta a todos. Disfruta de la frescura de la uva en cada sorbo. Perfecto para cualquier ocasiÃ³n.',
        detalles: [
            'Sabor: Uva',
            'PresentaciÃ³n: Botella de 2 Litros',
            'Beneficios: Sabor intenso y dulce',
            'Ideal para: AcompaÃ±ar comidas y meriendas',
            'TamaÃ±o: 2 Litros',
        ],
    },

    gatorade_uva: {
        description: 'Gatorade Uva es la bebida deportiva cientÃ­ficamente formulada para reponer los electrolitos perdidos durante el entrenamiento fÃ­sico. Mantente hidratado y al mÃ¡ximo rendimiento.',
        detalles: [
            'Sabor: Uva',
            'Tipo: Bebida IsotÃ³nica',
            'Beneficios: Repone electrolitos y energÃ­a',
            'Ideal para: Deportes y actividad fÃ­sica intensa',
            'PresentaciÃ³n: Botella de 600ml',
        ],
    },

    jugo_de_naranja_rica: {
        description: 'El Jugo de Naranja Rica es 100% natural, sin conservantes y lleno de vitaminas. La mejor opciÃ³n para empezar tu dÃ­a con energÃ­a y sabor real a frutas.',
        detalles: [
            'Sabor: Naranja',
            'Tipo: Jugo Natural',
            'Beneficios: Rico en vitamina C',
            'Ideal para: Desayunos y meriendas',
            'PresentaciÃ³n: Botella de 1 Litro',
        ],
    },

    jugo_de_pera_santal: {
        description: 'Jugo de Pera Santal ofrece una experiencia de suavidad y dulzura. Hecho con las mejores peras, es una opciÃ³n ligera y refrescante para toda la familia.',
        detalles: [
            'Sabor: Pera',
            'Tipo: NÃ©ctar',
            'Beneficios: Dulce y ligero',
            'Ideal para: Loncheras y meriendas',
            'PresentaciÃ³n: Botella de 1 Litro',
        ],
    },

    red_bull: {
        description: 'Red Bull es la bebida energÃ©tica lÃ­der en el mundo. Con su fÃ³rmula Ãºnica, te da las alas que necesitas para mantenerte activo, concentrado y con energÃ­a en todo momento.',
        detalles: [
            'Tipo: Bebida EnergÃ©tica',
            'CafeÃ­na: 80mg',
            'Vitaminas: B3, B5, B6, B12',
            'Ideal para: Deportes, estudio y jornadas largas',
            'PresentaciÃ³n: Lata de 250ml',
        ],
    },

    // â”€â”€â”€ ALIMENTOS / CARNES, PESCADOS Y MARISCOS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    camarones_crudos: {
        description: 'Camarones Crudos de alta calidad, perfectos para preparar a tu gusto. Ideales para cÃ³cteles, ceviches, paellas o al ajillo. Frescura garantizada.',
        detalles: [
            'Tipo: Marisco',
            'Estado: Crudo',
            'Ideal para: Platos gourmet y caseros',
            'Venta: Por libra',
            'Calidad: Premium',
        ],
    },

    camarones_precocidos: {
        description: 'Camarones Precocidos listos para servir. Perfectos para ensaladas, cÃ³cteles o platos rÃ¡pidos sin necesidad de cocciÃ³n prolongada.',
        detalles: [
            'Tipo: Marisco',
            'Estado: Precocido',
            'Ideal para: Ensaladas y platos frÃ­os',
            'Venta: Por libra',
            'Calidad: Premium',
        ],
    },

    carne_de_res_para_hamburguesas: {
        description: 'Carne de Res fresca y de primera calidad, ideal para preparar las mejores hamburguesas caseras. Molida al momento para garantizar frescura y sabor.',
        detalles: [
            'Tipo: Carne de Res',
            'Corte: Especial para hamburguesas',
            'Estado: Fresco',
            'Venta: Por libra',
            'Ideal para: Hamburguesas y albÃ³ndigas',
        ],
    },

    chuleta_de_cerdo: {
        description: 'Chuleta de Cerdo fresca, jugosa y llena de sabor. Perfecta para asar a la plancha, al horno o frita. Una delicia para toda la familia.',
        detalles: [
            'Tipo: Carne de Cerdo',
            'Corte: Chuleta',
            'Estado: Fresco',
            'Venta: Por libra',
            'Ideal para: Asados, fritos y horneados',
        ],
    },

    pollo_entero_don_pollo: {
        description: 'Pollo Entero Don Pollo, criado con los mÃ¡s altos estÃ¡ndares de calidad. VersÃ¡til y sabroso, perfecto para preparar tu plato favorito.',
        detalles: [
            'Tipo: Pollo Entero',
            'Marca: Don Pollo',
            'Estado: Fresco',
            'Venta: Por unidad',
            'Ideal para: Asado, al horno y sopas',
        ],
    },

    tilapia_roja: {
        description: 'Tilapia Roja fresca, rica en proteÃ­nas y baja en grasa. Perfecta para preparaciones al vapor, fritas o en caldo. Una opciÃ³n saludable y deliciosa.',
        detalles: [
            'Tipo: Pescado',
            'Variedad: Tilapia Roja',
            'Estado: Fresco',
            'Venta: Por libra',
            'Ideal para: Fritos, sopas y al vapor',
        ],
    },

    // â”€â”€â”€ ALIMENTOS / DESPENSA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    aceite_crisol: {
        description: 'Aceite Crisol, el aceite vegetal de confianza para tus preparaciones diarias. Ideal para freÃ­r, saltear y aderezar tus platos favoritos.',
        detalles: [
            'Tipo: Aceite Vegetal',
            'Marca: Crisol',
            'Uso: FreÃ­r, saltear y cocinar',
            'PresentaciÃ³n: Botella de 1 Litro',
            'Sin colesterol',
        ],
    },

    aceite_oliva_extra_virgen: {
        description: 'Aceite de Oliva Extra Virgen de primera extracciÃ³n en frÃ­o. Ideal para aderezos, ensaladas y cocina mediterrÃ¡nea. Un producto premium para tu cocina.',
        detalles: [
            'Tipo: Aceite de Oliva',
            'CategorÃ­a: Extra Virgen',
            'ExtracciÃ³n: Prensado en frÃ­o',
            'Uso: Aderezos y cocina fina',
            'PresentaciÃ³n: Botella de 750ml',
        ],
    },

    mayonesa_baldom: {
        description: 'Mayonesa Baldom, el sabor clÃ¡sico de la mayonesa dominicana. Cremosa y deliciosa, perfecta para acompaÃ±ar todos tus platos y sÃ¡ndwiches.',
        detalles: [
            'Tipo: Mayonesa',
            'Marca: Baldom',
            'Sabor: ClÃ¡sico',
            'Uso: SÃ¡ndwiches, ensaladas y aderezos',
            'PresentaciÃ³n: Frasco de 946ml',
        ],
    },

    sal_refisal: {
        description: 'Sal Refisal, la sal de mesa mÃ¡s usada en los hogares dominicanos. Finamente molida para una distribuciÃ³n uniforme en tus recetas.',
        detalles: [
            'Tipo: Sal de Mesa',
            'Marca: Refisal',
            'Textura: Fina',
            'Uso: Cocina y mesa',
            'PresentaciÃ³n: Bolsa de 1 kg',
        ],
    },

    sazon_completo_maggi: {
        description: 'SazÃ³n Completo Maggi, el condimento que no puede faltar en tu cocina. Su mezcla especial de especias da el sabor perfecto a todas tus preparaciones.',
        detalles: [
            'Tipo: Condimento',
            'Marca: Maggi',
            'Mezcla: Especias y hierba',
            'Uso: Carnes, vegetales y sopas',
            'PresentaciÃ³n: Frasco de 400g',
        ],
    },

    sopita_dona_gallina: {
        description: 'Sopita DoÃ±a Gallina, el sazonador de pollo mÃ¡s popular de la cocina dominicana. Da a tus platos el sabor casero y autÃ©ntico que todos aman.',
        detalles: [
            'Tipo: Sazonador',
            'Marca: DoÃ±a Gallina',
            'Sabor: Pollo',
            'Uso: Sopas, arroces y guisos',
            'PresentaciÃ³n: Caja de cubitos',
        ],
    },

    vinagre_baldom: {
        description: 'Vinagre Baldom, el vinagre blanco de uso diario en la cocina dominicana. Ideal para aderezos, conservas y limpieza de vegetales.',
        detalles: [
            'Tipo: Vinagre Blanco',
            'Marca: Baldom',
            'Usos: Aderezos, encurtidos y cocina',
            'Sabor: Ãcido suave',
            'PresentaciÃ³n: Botella de 946ml',
        ],
    },

    // â”€â”€â”€ ALIMENTOS / ENLATADOS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    atun_dimar: {
        description: 'AtÃºn Dimar en aceite, fuente de proteÃ­nas de alta calidad. Ideal para ensaladas, sÃ¡ndwiches y platos rÃ¡pidos. PrÃ¡ctico y nutritivo.',
        detalles: [
            'Tipo: AtÃºn en aceite',
            'Marca: Dimar',
            'ProteÃ­nas: Alto contenido',
            'Uso: Ensaladas, sÃ¡ndwiches y pasta',
            'PresentaciÃ³n: Lata de 170g',
        ],
    },

    gandules_verdes_goya: {
        description: 'Gandules Verdes Goya, el ingrediente esencial del arroz con gandules. Tiernos y sabrosos, listos para usar directamente de la lata.',
        detalles: [
            'Tipo: Legumbre',
            'Marca: Goya',
            'Estado: Cocido y listo para usar',
            'Uso: Arroz con gandules y guisos',
            'PresentaciÃ³n: Lata de 439g',
        ],
    },

    habichuelas_negras_goya: {
        description: 'Habichuelas Negras Goya, tiernas y sabrosas. Perfectas para hacer moro de habichuelas negras o acompaÃ±ar tus platos favoritos.',
        detalles: [
            'Tipo: Legumbre',
            'Variedad: Habichuelas Negras',
            'Marca: Goya',
            'Estado: Pre-cocidas',
            'PresentaciÃ³n: Lata de 439g',
        ],
    },

    maiz_la_famosa: {
        description: 'MaÃ­z La Famosa en lata, dulce y tierno. Perfecto para ensaladas, guisos y como acompaÃ±ante de cualquier plato principal.',
        detalles: [
            'Tipo: MaÃ­z dulce en grano',
            'Marca: La Famosa',
            'Estado: Cocido',
            'Uso: Ensaladas y guisos',
            'PresentaciÃ³n: Lata de 439g',
        ],
    },

    salchichas_jaja: {
        description: 'Salchichas Jaja, las salchichas mÃ¡s populares del mercado dominicano. Jugosas y sabrosas, perfectas para el desayuno, la merienda o cualquier receta.',
        detalles: [
            'Tipo: Salchichas',
            'Marca: Jaja',
            'Uso: Desayuno, merienda y guisos',
            'Estado: Listas para calentar',
            'PresentaciÃ³n: Lata de 400g',
        ],
    },

    sardinas_gord: {
        description: 'Sardinas Gord en salsa de tomate, ricas en Omega-3 y proteÃ­nas. Una opciÃ³n nutritiva y econÃ³mica para cualquier comida rÃ¡pida.',
        detalles: [
            'Tipo: Sardinas en salsa de tomate',
            'Marca: Gord',
            'Nutrientes: Rico en Omega-3',
            'Uso: Sandwiches y platos rÃ¡pidos',
            'PresentaciÃ³n: Lata de 125g',
        ],
    },

    tomates_pelados_la_famosa: {
        description: 'Tomates Pelados La Famosa, enteros y en su jugo natural. Perfectos para preparar salsas, guisos y sopas con sabor casero.',
        detalles: [
            'Tipo: Tomates pelados enteros',
            'Marca: La Famosa',
            'Estado: En jugo natural',
            'Uso: Salsas, guisos y sopas',
            'PresentaciÃ³n: Lata de 794g',
        ],
    },

    // â”€â”€â”€ ALIMENTOS / FRUTAS Y VERDURAS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    ajies_morrones: {
        description: 'AjÃ­es Morrones frescos, coloridos y llenos de sabor. Perfectos para ensaladas, salteados y como decoraciÃ³n de tus platos.',
        detalles: [
            'Tipo: Vegetal',
            'Variedad: MorrÃ³n',
            'Colores: Rojo, amarillo y verde',
            'Uso: Ensaladas y salteados',
            'Venta: Por unidad',
        ],
    },

    cebollas_rojas: {
        description: 'Cebollas Rojas frescas, con su caracterÃ­stico sabor dulce y ligeramente picante. Imprescindibles en la cocina dominicana.',
        detalles: [
            'Tipo: Vegetal',
            'Variedad: Cebolla Roja',
            'Sabor: Dulce y ligeramente picante',
            'Uso: Ensaladas, guisos y condimentos',
            'Venta: Por libra',
        ],
    },

    fresas: {
        description: 'Fresas frescas, dulces y aromÃ¡ticas. Perfectas para postres, smoothies o disfrutarlas solas como snack saludable.',
        detalles: [
            'Tipo: Fruta',
            'Variedad: Fresa',
            'Sabor: Dulce y Ã¡cido',
            'Uso: Postres, batidos y snacks',
            'PresentaciÃ³n: Paquete de 250g',
        ],
    },

    limones_persa: {
        description: 'Limones Persa frescos, con su jugo Ã¡cido y aromÃ¡tico. Esenciales para aderezar ensaladas, marinar carnes y preparar limonada.',
        detalles: [
            'Tipo: Fruta cÃ­trica',
            'Variedad: Persa',
            'Sabor: Ãcido',
            'Uso: Jugos, aderezos y marinadas',
            'Venta: Por libra',
        ],
    },

    mandarinas: {
        description: 'Mandarinas dulces y fÃ¡ciles de pelar. Una fruta rica en vitamina C, perfecta como snack saludable para toda la familia.',
        detalles: [
            'Tipo: Fruta cÃ­trica',
            'Variedad: Mandarina',
            'Sabor: Dulce',
            'Beneficios: Rica en vitamina C',
            'Venta: Por libra',
        ],
    },

    manzanas_amarillas: {
        description: 'Manzanas Amarillas dulces y jugosas. Una fruta versÃ¡til perfecta para comer sola, en ensaladas de frutas o en postres.',
        detalles: [
            'Tipo: Fruta',
            'Variedad: Manzana Amarilla',
            'Sabor: Dulce y jugoso',
            'Uso: Snack, ensaladas y postres',
            'Venta: Por unidad',
        ],
    },

    manzanas_rojas: {
        description: 'Manzanas Rojas, crujientes y con un sabor equilibrado entre dulce y Ã¡cido. Una fruta clÃ¡sica que nunca falla.',
        detalles: [
            'Tipo: Fruta',
            'Variedad: Manzana Roja',
            'Sabor: Dulce-Ã¡cido',
            'Beneficios: Rica en fibra y antioxidantes',
            'Venta: Por unidad',
        ],
    },

    manzanas_verdes: {
        description: 'Manzanas Verdes con su particular sabor Ã¡cido y refrescante. Perfectas para snacks, jugos y recetas de reposterÃ­a.',
        detalles: [
            'Tipo: Fruta',
            'Variedad: Manzana Verde',
            'Sabor: Ãcido y refrescante',
            'Uso: Jugos, snacks y reposterÃ­a',
            'Venta: Por unidad',
        ],
    },

    pepinos: {
        description: 'Pepinos frescos y crujientes. Bajos en calorÃ­as e hidratantes, son el ingrediente perfecto para ensaladas y platos frÃ­os.',
        detalles: [
            'Tipo: Vegetal',
            'Variedad: Pepino',
            'Sabor: Fresco y suave',
            'Beneficios: Hidratante y bajo en calorÃ­as',
            'Venta: Por unidad',
        ],
    },

    tomates_de_ensalada: {
        description: 'Tomates de Ensalada frescos, rojos y jugosos. El ingrediente base de cualquier ensalada y plato mediterrÃ¡neo.',
        detalles: [
            'Tipo: Vegetal',
            'Variedad: Tomate de Ensalada',
            'Sabor: Dulce y Ã¡cido',
            'Uso: Ensaladas, sÃ¡ndwiches y guisos',
            'Venta: Por libra',
        ],
    },

    uvas_moradas: {
        description: 'Uvas Moradas dulces y refrescantes. Una fruta deliciosa como snack o para preparar jugos y postres especiales.',
        detalles: [
            'Tipo: Fruta',
            'Variedad: Uva Morada',
            'Sabor: Dulce',
            'Uso: Snack, jugos y postres',
            'Venta: Por libra',
        ],
    },

    zanahorias: {
        description: 'Zanahorias frescas, crujientes y ricas en betacaroteno. Perfectas para ensaladas, jugos o como snack saludable.',
        detalles: [
            'Tipo: Vegetal',
            'Variedad: Zanahoria',
            'Beneficios: Rica en vitamina A',
            'Uso: Ensaladas, jugos y sopas',
            'Venta: Por libra',
        ],
    },

    // â”€â”€â”€ ALIMENTOS / LÃCTEOS Y HUEVOS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    huevos_don_pancho: {
        description: 'Huevos Don Pancho, frescos y de la mÃ¡s alta calidad. Fuente natural de proteÃ­nas y nutrientes esenciales para toda la familia.',
        detalles: [
            'Tipo: Huevos de gallina',
            'Marca: Don Pancho',
            'TamaÃ±o: Grande',
            'Nutrientes: ProteÃ­nas y vitaminas',
            'PresentaciÃ³n: CartÃ³n de 30 unidades',
        ],
    },

    leche_entera_rica: {
        description: 'Leche Entera Rica, rica en calcio y proteÃ­nas. El alimento esencial para el desarrollo de niÃ±os y adultos, con el sabor fresco y natural que todos necesitan.',
        detalles: [
            'Tipo: Leche Entera',
            'Marca: Rica',
            'Nutrientes: Calcio y vitamina D',
            'Pasteurizada: SÃ­',
            'PresentaciÃ³n: CartÃ³n de 1 Litro',
        ],
    },

    queso_gorgonzola: {
        description: 'Queso Gorgonzola italiano, con su caracterÃ­stico sabor fuerte y cremoso. Perfecto para tablas de quesos, pastas y salsas gourmet.',
        detalles: [
            'Tipo: Queso azul',
            'Origen: Italia',
            'Sabor: Fuerte e intenso',
            'Uso: Tablas de queso, pasta y salsas',
            'Venta: Por unidad',
        ],
    },

    queso_gouda: {
        description: 'Queso Gouda holandÃ©s, cremoso y de sabor suave. Ideal para sÃ¡ndwiches, tablas de quesos y gratinados.',
        detalles: [
            'Tipo: Queso semiduro',
            'Origen: Holanda',
            'Sabor: Suave y cremoso',
            'Uso: SÃ¡ndwiches y gratinados',
            'Venta: Por unidad',
        ],
    },

    yogurt_fresa_yoka: {
        description: 'Yogurt de Fresa Yoka, cremoso y delicioso. Con trozos de fresa real, es la merienda perfecta para niÃ±os y adultos.',
        detalles: [
            'Tipo: Yogurt con frutas',
            'Sabor: Fresa',
            'Marca: Yoka',
            'Beneficios: ProbiÃ³ticos y calcio',
            'PresentaciÃ³n: Vaso de 150g',
        ],
    },

    yogurt_natural_rica: {
        description: 'Yogurt Natural Rica, sin azÃºcar aÃ±adida y lleno de probiÃ³ticos. Perfecto para una dieta saludable, solo o mezclado con frutas.',
        detalles: [
            'Tipo: Yogurt Natural',
            'Marca: Rica',
            'AzÃºcar aÃ±adida: Sin',
            'Beneficios: ProbiÃ³ticos y calcio',
            'PresentaciÃ³n: Vaso de 200g',
        ],
    },

    // â”€â”€â”€ ELECTRODOMÃ‰STICOS / CLIMATIZACIÃ“N â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    'aire-acondicionado_tecnomaster': {
        description: 'El Aire Acondicionado Tecnomaster ofrece un rendimiento confiable y eficiente para mantener cualquier espacio fresco. DiseÃ±ado con tecnologÃ­a moderna que optimiza el consumo energÃ©tico y brinda un enfriamiento uniforme.',
        detalles: [
            'Alta eficiencia energÃ©tica',
            'Modo silencioso',
            'Control remoto incluido',
            'FunciÃ³n de temporizador',
            'DiseÃ±o moderno y compacto',
        ],
    },

    'aire-acondicionado_whirlpool': {
        description: 'El Aire Acondicionado Whirlpool combina potencia y eficiencia energÃ©tica en un diseÃ±o elegante. Ideal para enfriar grandes espacios con un mÃ­nimo consumo elÃ©ctrico.',
        detalles: [
            'Potencia de enfriamiento superior',
            'TecnologÃ­a inverter de bajo consumo',
            'FunciÃ³n calor/frÃ­o reversible',
            'Panel digital con pantalla LED',
            'Filtro de purificaciÃ³n de aire',
        ],
    },

    ventilador_daiwa: {
        description: 'El Ventilador Daiwa ofrece una circulaciÃ³n de aire fresca y silenciosa para cualquier habitaciÃ³n. Perfecto para mantener el confort en el hogar durante los dÃ­as calurosos.',
        detalles: [
            'Velocidades: 3 niveles',
            'OscilaciÃ³n automÃ¡tica',
            'DiseÃ±o de pedestal regulable',
            'Motor silencioso y eficiente',
            'FÃ¡cil de ensamblar',
        ],
    },

    ventilador_kdk: {
        description: 'El Ventilador KDK es reconocido por su durabilidad y su flujo de aire potente. Una opciÃ³n confiable y econÃ³mica para refrescar cualquier espacio.',
        detalles: [
            'Velocidades: 3 niveles',
            'Aspas de gran diÃ¡metro',
            'Motor de larga vida Ãºtil',
            'DiseÃ±o clÃ¡sico y resistente',
            'Bajo consumo elÃ©ctrico',
        ],
    },

    ventilador_pequeno: {
        description: 'Ventilador PequeÃ±o compacto e ideal para escritorios, mesas de noche o espacios reducidos. PortÃ¡til y de fÃ¡cil traslado a cualquier lugar del hogar.',
        detalles: [
            'TamaÃ±o compacto y portÃ¡til',
            'Velocidades: 2 niveles',
            'Base antideslizante',
            'Bajo nivel de ruido',
            'FÃ¡cil limpieza de aspas',
        ],
    },

    ventilador_de_techo_kdk: {
        description: 'Ventilador de Techo KDK para una circulaciÃ³n de aire amplia y eficiente en toda la habitaciÃ³n. Con diseÃ±o moderno y motor silencioso, ideal para salas y dormitorios.',
        detalles: [
            'DiÃ¡metro de aspas: 56 pulgadas',
            'Motor silencioso de alta eficiencia',
            'Velocidades: 3 niveles',
            'Control remoto incluido',
            'Acabado moderno y elegante',
        ],
    },

    // â”€â”€â”€ ELECTRODOMÃ‰STICOS / COCINA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    nevera_lg: {
        description: 'La Nevera LG combina tecnologÃ­a de enfriamiento avanzada con un diseÃ±o moderno. Su alta eficiencia energÃ©tica, amplio espacio interior y funcionamiento silencioso la convierten en la elecciÃ³n perfecta para mantener tus alimentos frescos y organizados.',
        detalles: [
            'Capacidad: 18 pies cÃºbicos',
            'TecnologÃ­a: Door Cooling+ y Smart Inverter',
            'Consumo energÃ©tico: Bajo (A+)',
            'Tipo: Doble puerta',
            'Color: Plateado',
        ],
    },

    estufa_lg: {
        description: 'La Estufa LG de gas ofrece cocciÃ³n precisa, eficiente y segura. Sus amplias hornillas y encendido elÃ©ctrico automÃ¡tico la hacen ideal para cualquier cocina.',
        detalles: [
            'Tipo: Gas natural',
            'Hornillas: 4 quemadores',
            'Encendido: ElÃ©ctrico automÃ¡tico',
            'Horno integrado con grill',
            'Parrillas de hierro fundido',
        ],
    },

    'extractor-de-grasa_drija': {
        description: 'El Extractor de Grasa Drija mantiene tu cocina libre de humo, olores y vapores de grasa. InstalaciÃ³n fÃ¡cil y funcionamiento silencioso para una cocina siempre fresca.',
        detalles: [
            'Tipo: Campana extractora',
            'Marca: Drija',
            'Motor de alta aspiraciÃ³n',
            'Filtros de grasa lavables',
            'IluminaciÃ³n LED integrada',
        ],
    },

    cilindro_de_gas_duragas: {
        description: 'Cilindro de Gas Duragas, el mÃ¡s confiable del mercado dominicano. Certificado para uso domÃ©stico y comercial, garantizando seguridad y durabilidad en cada uso.',
        detalles: [
            'Marca: Duragas',
            'Capacidad: 25 libras',
            'Certificado para uso domÃ©stico',
            'Material: Acero reforzado',
            'VÃ¡lvula de seguridad incluida',
        ],
    },

    freezer_7_pies: {
        description: 'Freezer de 7 pies de capacidad, ideal para conservar grandes cantidades de alimentos congelados. Perfecto para hogares y negocios que necesitan mayor espacio de congelaciÃ³n.',
        detalles: [
            'Capacidad: 7 pies cÃºbicos',
            'Tipo: Congelador horizontal (chest)',
            'Temperatura regulable',
            'Canasta organizadora incluida',
            'Sellado hermÃ©tico eficiente',
        ],
    },

    bebedero_tecnomaster: {
        description: 'El Bebedero Tecnomaster ofrece agua frÃ­a y caliente al instante. Ideal para oficinas, hogares y negocios que buscan comodidad e higiene en la hidrataciÃ³n diaria.',
        detalles: [
            'Agua frÃ­a y caliente',
            'Marca: Tecnomaster',
            'Compatible con botellones de 5 galones',
            'Dispensador tipo push',
            'Bandeja removible fÃ¡cil de limpiar',
        ],
    },

    // â”€â”€â”€ ELECTRODOMÃ‰STICOS / LAVADO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    lavadora_lg: {
        description: 'La Lavadora LG ofrece un lavado profundo, eficiente y silencioso gracias a su motor de tecnologÃ­a avanzada, ideal para hogares modernos que buscan calidad y durabilidad.',
        detalles: [
            'Capacidad de 18 kg',
            'Motor inverter silencioso',
            'Panel digital inteligente',
            'MÃºltiples programas de lavado',
            'Alta eficiencia energÃ©tica',
        ],
    },

    lavadora_frigidaire: {
        description: 'La Lavadora Frigidaire combina eficiencia y capacidad en un tamaÃ±o ideal para el hogar. Con mÃºltiples ciclos de lavado y bajo consumo de agua.',
        detalles: [
            'Capacidad: 12 kg',
            'Tipo: Carga frontal',
            'MÃºltiples ciclos de lavado',
            'Bajo consumo de agua y energÃ­a',
            'Panel de control digital',
        ],
    },

    lavadora_dimensions: {
        description: 'La Lavadora Dimensions es la opciÃ³n econÃ³mica y confiable para el hogar. FÃ¡cil de usar y con excelente desempeÃ±o en cada ciclo de lavado.',
        detalles: [
            'Capacidad: 8 kg',
            'Tipo: Carga superior',
            'Agitador central eficiente',
            'Programas: normal, delicado, rÃ¡pido',
            'Precio accesible',
        ],
    },

    'lavadora-y-secadora_lg': {
        description: 'La combinaciÃ³n perfecta: Lavadora y Secadora LG en un solo equipo. Ahorra espacio y tiempo con tecnologÃ­a de lavado y secado de Ãºltima generaciÃ³n.',
        detalles: [
            'FunciÃ³n: Lavar y secar',
            'Capacidad de lavado: 15 kg',
            'Motor inverter de bajo ruido',
            'Secado por vapor',
            'Sistema AI DD (detecciÃ³n de carga)',
        ],
    },

    'lavadora-y-secadora_tecnomaster': {
        description: 'La Lavadora y Secadora Tecnomaster es la soluciÃ³n 2 en 1 que necesitas. Lava y seca en un solo ciclo con eficiencia energÃ©tica y mÃºltiples programas.',
        detalles: [
            'FunciÃ³n: Lavar y secar',
            'Capacidad: 10 kg',
            'Programas: 14 ciclos',
            'Pantalla LED',
            'Motor silencioso de alta durabilidad',
        ],
    },

    // â”€â”€â”€ TECNOLOGÃA / BOCINAS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    bocina_aiwa: {
        description: "La Bocina Aiwa ofrece un sonido potente y nÃ­tido, ideal para cualquier ocasiÃ³n. Con conectividad Bluetooth de largo alcance, baterÃ­a de larga duraciÃ³n y un diseÃ±o robusto y elegante.",
        detalles: [
            "Conectividad Bluetooth estable",
            "BaterÃ­a de larga duraciÃ³n",
            "Sonido envolvente de alta calidad",
            "Entrada USB y tarjeta SD",
            "DiseÃ±o resistente y portÃ¡til",
        ],
    },
    bocina_lg: {
        description: "La Bocina LG ofrece una experiencia auditiva excepcional con tecnologÃ­a de audio avanzada. Perfecta para disfrutar de tu mÃºsica favorita con bajos profundos y agudos nÃ­tidos, en un diseÃ±o moderno y compacto.",
        detalles: [
            "Sonido de alta resoluciÃ³n",
            "Bajos reforzados con tecnologÃ­a LG",
            "Conectividad Bluetooth multidispositivo",
            "BaterÃ­a recargable integrada",
            "ProtecciÃ³n contra salpicaduras de agua",
        ],
    },
    bocina_samsung: {
        description: "La Bocina Samsung combina un diseÃ±o elegante con un rendimiento sonoro potente y equilibrado. Ideal para cualquier ambiente, ofreciendo conectividad sin cables y una calidad de audio superior que llena todo el espacio.",
        detalles: [
            "Sonido Premium de 360 grados",
            "IntegraciÃ³n con el ecosistema Samsung",
            "ConexiÃ³n inalÃ¡mbrica instantÃ¡nea",
            "Control mediante aplicaciÃ³n mÃ³vil",
            "Acabado sofisticado y minimalista",
        ],
    },
    bocina_stage: {
        description: "La Bocina Stage es la opciÃ³n perfecta para quienes buscan potencia y claridad en un solo dispositivo. Con un diseÃ±o pensado para durar y una autonomÃ­a sorprendente, es tu compaÃ±era ideal para fiestas y viajes.",
        detalles: [
            "Gran potencia de salida",
            "Modo TWS (True Wireless Stereo)",
            "Resistencia a impactos y polvo",
            "Carga rÃ¡pida mediante USB-C",
            "Llamadas manos libres integradas",
        ],
    },
    bocina_tecnomaster: {
        description: "La Bocina Tecnomaster ofrece un gran rendimiento a un precio accesible. Con un sonido equilibrado, mÃºltiples opciones de entrada y una baterÃ­a que te acompaÃ±a en tus largas jornadas, es la soluciÃ³n prÃ¡ctica para tu entretenimiento.",
        detalles: [
            "Excelente relaciÃ³n calidad-precio",
            "Radio FM integrada",
            "MÃºltiples puertos: AUX, USB, SD",
            "Liviana y fÃ¡cil de transportar",
            "BaterÃ­a recargable de alta eficiencia",
        ],
    },

    // â”€â”€â”€ TECNOLOGÃA / CELULARES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    celular_samsung_a26: {
        description: "El Samsung A26 es el equilibrio perfecto entre rendimiento y precio. Disfruta de una pantalla fluida, gran baterÃ­a y un sistema de cÃ¡maras versÃ¡til diseÃ±ado para capturar tus mejores momentos.",
        detalles: [
            "Pantalla Super AMOLED fluida",
            "BaterÃ­a de larga duraciÃ³n con carga rÃ¡pida",
            "Sistema de cÃ¡mara triple de alta resoluciÃ³n",
            "Rendimiento confiable para el dÃ­a a dÃ­a",
            "Seguridad avanzada con sensor de huellas",
        ],
    },
    celular_samsung_a35: {
        description: "El Samsung A35 ofrece una experiencia visual envolvente con su pantalla de alta resoluciÃ³n y colores vibrantes. Con un procesador potente y diseÃ±o elegante, es la compaÃ±Ã­a ideal para multitarea y gaming.",
        detalles: [
            "Pantalla Infinity-O con alta tasa de refresco",
            "Procesador potente para juegos y apps",
            "Resistencia al agua y al polvo (certificada)",
            "CÃ¡mara principal con estabilizaciÃ³n Ã³ptica (OIS)",
            "IntegraciÃ³n total con servicios de Samsung",
        ],
    },
    celular_s24_ultra: {
        description: "El Samsung S24 Ultra redefine la gama alta con su sistema de cÃ¡maras profesional, pantalla de mÃ¡xima calidad y el potente S-Pen integrado. DiseÃ±ado para quienes buscan lo mejor en rendimiento y productividad.",
        detalles: [
            "Pantalla Dynamic AMOLED 2X de Ãºltima generaciÃ³n",
            "Sistema de cÃ¡maras con Zoom espacial avanzado",
            "S-Pen integrado para mÃ¡xima productividad",
            "Estructura de titanio ultra resistente",
            "Inteligencia Artificial integrada para fotos y traducciÃ³n",
        ],
    },
    iphone_14: {
        description: "El iPhone 14 ofrece un rendimiento excepcional gracias a su chip avanzado y un sistema de cÃ¡maras que captura fotos increÃ­bles en cualquier condiciÃ³n de luz. Seguridad, elegancia y potencia en la palma de tu mano.",
        detalles: [
            "Sistema de dos cÃ¡maras avanzado",
            "Modo Cine en resoluciÃ³n 4K Dolby Vision",
            "Ceramic Shield, mÃ¡s resistente que cualquier vidrio",
            "BaterÃ­a diseÃ±ada para durar todo el dÃ­a",
            "DetecciÃ³n de choques y servicios de emergencia",
        ],
    },
    iphone_14_pro: {
        description: "El iPhone 14 Pro eleva la experiencia mÃ³vil con la Dynamic Island, una cÃ¡mara de 48 MP que captura detalles asombrosos y una pantalla siempre activa de gran brillo. TecnologÃ­a e innovaciÃ³n en estado puro.",
        detalles: [
            "Dynamic Island, una forma mÃ¡gica de interactuar",
            "CÃ¡mara Gran Angular de 48 MP con ProRAW",
            "Chip A16 Bionic para un desempeÃ±o imbatible",
            "Pantalla ProMotion con Refresh Rate adaptable",
            "DiseÃ±o de acero inoxidable de grado quirÃºrgico",
        ],
    },

    // â”€â”€â”€ TECNOLOGÃA / LAPTOPS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    laptop_asus: {
        description: "La Laptop Asus ofrece potencia y portabilidad para profesionales y estudiantes. Con una pantalla de alta resoluciÃ³n y un rendimiento fluido, es la herramienta ideal para trabajar, estudiar y disfrutar contenido multimedia.",
        detalles: [
            "Procesador de Ãºltima generaciÃ³n",
            "Pantalla con bordes ultra delgados (NanoEdge)",
            "Teclado ergonÃ³mico retroiluminado",
            "Gran autonomÃ­a de baterÃ­a",
            "Chasis ligero y resistente",
        ],
    },
    laptop_dell: {
        description: "La Laptop Dell es sinÃ³nimo de confiabilidad y alto rendimiento. DiseÃ±ada para soportar largas jornadas de trabajo, ofrece una experiencia de uso fluida gracias a sus componentes de alta gama y diseÃ±o robusto.",
        detalles: [
            "Conocida durabilidad y materiales de calidad",
            "Pantalla anti-reflejo de alta definiciÃ³n",
            "Amplia capacidad de almacenamiento y RAM",
            "Excelente soporte y actualizaciones",
            "Teclado resistente a salpicaduras",
        ],
    },
    laptop_dragonx: {
        description: "La Laptop DragonX es la elecciÃ³n de los gamers que buscan el mejor rendimiento. Equipada con grÃ¡ficos potentes y un sistema de enfriamiento avanzado, te permite disfrutar de tus juegos favoritos sin lÃ­mites.",
        detalles: [
            "Tarjeta grÃ¡fica de alta gama (NVIDIA/AMD)",
            "Sistema de ventilaciÃ³n de alto flujo",
            "Pantalla con alta tasa de refresco para gaming",
            "Teclado mecÃ¡nico/membrana optimizado",
            "DiseÃ±o agresivo con iluminaciÃ³n RGB",
        ],
    },
    laptop_hp: {
        description: "La Laptop HP combina un diseÃ±o elegante con funciones inteligentes que facilitan tu dÃ­a a dÃ­a. Potente, versÃ¡til y segura, es ideal para quienes buscan un equipo equilibrado para la oficina o el hogar.",
        detalles: [
            "DiseÃ±o elegante con acabados premium",
            "CÃ¡mara HD con obturador de privacidad",
            "Carga rÃ¡pida optimizada",
            "Audio de alta fidelidad (B&O u otros)",
            "Seguridad integrada por hardware",
        ],
    },
    laptop_lenovo: {
        description: "La Laptop Lenovo destaca por su versatilidad y eficiencia. Ya sea para productividad empresarial o uso creativo, sus funciones avanzadas y diseÃ±o inteligente te permiten lograr mÃ¡s en menos tiempo.",
        detalles: [
            "Famoso teclado AccuType para mayor comodidad",
            "Bisagra de apertura de 180 grados",
            "BaterÃ­a de larga duraciÃ³n con carga rÃ¡pida",
            "Software de optimizaciÃ³n de sistema Lenovo",
            "Excelente relaciÃ³n portabilidad-desempeÃ±o",
        ],
    },

    // â”€â”€â”€ TECNOLOGÃA / TABLETS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    tablet_apple: {
        description: "La Tablet Apple combina rendimiento excepcional, pantalla de alta resoluciÃ³n y una experiencia fluida diseÃ±ada para trabajar, estudiar y disfrutar contenido multimedia con la mejor calidad.",
        detalles: [
            "Pantalla Retina de alta resoluciÃ³n",
            "Procesador Apple rÃ¡pido y eficiente",
            "Ecosistema fluido con iCloud y App Store",
            "BaterÃ­a de larga duraciÃ³n",
            "DiseÃ±o premium, ligero y resistente",
        ],
    },
    tablet_rted: {
        description: "La Tablet RTED ofrece un rendimiento confiable con excelente fluidez para multitarea. Perfecta para estudiar, trabajar y disfrutar contenidos multimedia gracias a su pantalla de alta definiciÃ³n, procesador eficiente y diseÃ±o portÃ¡til.",
        detalles: [
            "Excelente relaciÃ³n calidad-precio",
            "Pantalla amplia y nÃ­tida",
            "Ideal para navegaciÃ³n y apps educativas",
            "Memoria expandible mediante microSD",
            "BaterÃ­a optimizada para el dÃ­a a dÃ­a",
        ],
    },
    tablet_samsung: {
        description: "La Tablet Samsung es una excelente opciÃ³n para quienes buscan rendimiento, fluidez y una pantalla de alta calidad. Perfecta para estudiar, trabajar y disfrutar contenido multimedia gracias a su diseÃ±o moderno, baterÃ­a duradera y ecosistema Samsung.",
        detalles: [
            "Pantalla vibrante con tecnologÃ­a AMOLED/LCD",
            "Procesador potente para multitarea",
            "Compatibilidad con S-Pen (segÃºn modelo)",
            "Modo DeX para experiencia de escritorio",
            "IntegraciÃ³n con el ecosistema Galaxy",
        ],
    },
    tablet_tcl: {
        description: "La Tablet TCL ofrece un excelente equilibrio entre rendimiento y portabilidad. Ideal para estudiar, trabajar o disfrutar contenido multimedia gracias a su pantalla brillante, procesador eficiente y baterÃ­a de larga duraciÃ³n.",
        detalles: [
            "TecnologÃ­a de pantalla protectora de vista",
            "Experiencia visual envolvente",
            "Ligera y fÃ¡cil de transportar",
            "Interfaz amigable y rÃ¡pida",
            "Conectividad Wi-Fi estable",
        ],
    },
    tablet_tecnomaster: {
        description: "La Tablet Tecnomaster es ideal para usuarios que buscan una excelente relaciÃ³n entre rendimiento, portabilidad y funciones para el dÃ­a a dÃ­a. DiseÃ±ada para estudiar, trabajar y consumir contenido con fluidez y gran autonomÃ­a.",
        detalles: [
            "Rendimiento confiable para el trabajo",
            "Pantalla de alta definiciÃ³n",
            "DiseÃ±o robusto y duradero",
            "Varias opciones de conectividad",
            "Excelente duraciÃ³n de baterÃ­a",
        ],
    },

    // â”€â”€â”€ TECNOLOGÃA / TELEVISORES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    televisor_led_50: {
        description: "El Televisor LED de 50 pulgadas ofrece una excelente experiencia visual gracias a su amplia pantalla, colores intensos y resoluciÃ³n nÃ­tida. Ideal para salas, habitaciones o espacios donde busques una pantalla grande con gran rendimiento.",
        detalles: [
            "Pantalla LED de 50 pulgadas",
            "Excelente nitidez y colores brillantes",
            "Interfaz moderna y fÃ¡cil de usar",
            "Compatible con mÃºltiples dispositivos",
            "DiseÃ±o elegante y delgado",
        ],
    },
    televisor_led_lg: {
        description: "El Televisor LED LG ofrece una imagen nÃ­tida con colores realistas gracias a su avanzado panel LED. Cuenta con sistema Smart TV para acceder a tus aplicaciones favoritas y un diseÃ±o moderno que se adapta a cualquier espacio.",
        detalles: [
            "TecnologÃ­a de panel IPS para mejores Ã¡ngulos",
            "Procesador de imagen con IA integrada",
            "Sonido envolvente de alta fidelidad",
            "Sistema operativo WebOS fluido",
            "Control remoto por voz inteligente",
        ],
    },
    televisor_led_samsung: {
        description: "El Televisor LED Samsung ofrece una experiencia visual clara y vibrante, ideal para salas, dormitorios o espacios de entretenimiento. Con calidad Full HD/4K (segÃºn modelo) y acceso a aplicaciones inteligentes, es perfecto para disfrutar tus series, juegos y pelÃ­culas.",
        detalles: [
            "Colores vibrantes con tecnologÃ­a Crystal LED",
            "DiseÃ±o sin bordes en tres lados",
            "Mando a distancia Ãºnico para todos tus dispositivos",
            "Compatible con asistentes de voz",
            "Modo de juego automÃ¡tico para mayor fluidez",
        ],
    },
    televisor_led_tecnomaster: {
        description: "El Televisor LED Tecnomaster combina buena calidad de imagen con un diseÃ±o elegante. Su panel LED ofrece colores intensos, excelente brillo y nitidez. Ideal para disfrutar tus programas, pelÃ­culas y contenido favorito con un rendimiento estable.",
        detalles: [
            "ResoluciÃ³n de alta definiciÃ³n",
            "Sintonizador digital integrado",
            "MÃºltiples entradas HDMI y USB",
            "DiseÃ±o robusto y duradero",
            "Bajo consumo de energÃ­a",
        ],
    },
    televisor_samsung_75_pulgadas: {
        description: "El Televisor Samsung de 75 pulgadas ofrece una experiencia visual impresionante con resoluciÃ³n Ultra HD 4K, colores vibrantes y tecnologÃ­as avanzadas de imagen. Ideal para salas grandes, gaming y cine en casa.",
        detalles: [
            "Pantalla gigante de 75 pulgadas LED",
            "ResoluciÃ³n 4K UHD para detalles asombrosos",
            "TecnologÃ­a HDR para colores mÃ¡s realistas",
            "Smart TV con acceso a tus apps favoritas",
            "DiseÃ±o refinado que complementa cualquier espacio",
        ],
    },


    // â”€â”€â”€ FARMACIA / ANALGÃ‰SICOS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    tylenol: {
        description: 'Tylenol AnalgÃ©sico es eficaz para aliviar dolores leves y moderados. Seguro y confiable para el uso diario segÃºn indicaciones del envase.',
        detalles: [
            'Tipo: AnalgÃ©sico',
            'PresentaciÃ³n: Tabletas / CÃ¡psulas',
            'Dosis recomendada: SegÃºn indicaciones del envase',
            'Contenido: 20 unidades',
            'Beneficios: Alivio el dolor, seguro, confiable y fÃ¡cil de usar',
        ],
    },

    equate_analgesico: {
        description: 'El AnalgÃ©sico Equate proporciona un alivio efectivo contra el dolor y la fiebre. Una opciÃ³n econÃ³mica y de alta calidad para el botiquÃ­n del hogar.',
        detalles: [
            'Marca: Equate',
            'Uso: Alivio de dolor y fiebre',
            'PresentaciÃ³n: Tabletas',
            'Eficacia comprobada',
            'RelaciÃ³n calidad-precio excelente',
        ],
    },

    flanax: {
        description: 'Flanax AnalgÃ©sico es potente para el alivio de dolores musculares, de espalda y articulares. Su efecto prolongado permite retomar las actividades diarias sin molestias.',
        detalles: [
            'Efecto prolongado (hasta 12 horas)',
            'Ideal para dolores musculares y articulares',
            'Reduce la inflamaciÃ³n',
            'FÃ¡cil de ingerir',
            'Resultados rÃ¡pidos',
        ],
    },

    thera_gesic: {
        description: 'Thera-Gesic es una crema analgÃ©sica de acciÃ³n tÃ³pica que penetra profundamente para aliviar el dolor muscular y de articulaciones al instante.',
        detalles: [
            'Tipo: Crema tÃ³pica',
            'AcciÃ³n rÃ¡pida y profunda',
            'No grasosa',
            'Ideal para deportistas',
            'Alivio local del dolor',
        ],
    },

    vaporizing: {
        description: 'Vaporizing es un ungÃ¼ento tÃ³pico que ayuda a aliviar la congestiÃ³n nasal y la tos, ademÃ¡s de proporcionar alivio a dolores musculares leves.',
        detalles: [
            'Uso: TÃ³pico e inhalatorio',
            'Alivia la congestiÃ³n y la tos',
            'Efecto refrescante',
            'Ideal para resfriados',
            'Multiuso',
        ],
    },

    // â”€â”€â”€ FARMACIA / ANTIGRIPALES Y RESFRIADO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    theraflu: {
        description: 'Theraflu es un medicamento diseÃ±ado para aliviar los sÃ­ntomas del resfriado y la gripe, proporcionando alivio rÃ¡pido y comodidad durante el dÃ­a y la noche.',
        detalles: [
            'Tipo: Antigripal en polvo',
            'PreparaciÃ³n: Disolver en agua caliente',
            'Beneficios: Alivio reconfortante, descongestionante',
            'Sabor: LimÃ³n miel',
            'Contenido: 6 sobres',
        ],
    },

    antiflu_des: {
        description: 'Antiflu-Des es un antigripal de mÃºltiple acciÃ³n que combate los sÃ­ntomas del resfriado, incluyendo la fiebre y el malestar general.',
        detalles: [
            'AcciÃ³n mÃºltiple',
            'Combate fiebre y malestar',
            'Dosis: 1 cÃ¡psula cada 8 horas',
            'Marca reconocida',
            'Alivio integral',
        ],
    },

    coldyflu: {
        description: 'Coldyflu ofrece una fÃ³rmula avanzada para el alivio de la gripe y el resfriado comÃºn, ayudando a despejar las vÃ­as respiratorias.',
        detalles: [
            'FÃ³rmula avanzada',
            'Despeja vÃ­as respiratorias',
            'Ideal para resfriado comÃºn',
            'Efecto rÃ¡pido',
            'PresentaciÃ³n en comprimidos',
        ],
    },

    mucinex: {
        description: 'Mucinex ayuda a aflojar la mucosidad y adelgazar las secreciones bronquiales para que la tos sea mÃ¡s productiva y las vÃ­as respiratorias se limpien.',
        detalles: [
            'Expectorante potente',
            'Alivia la congestiÃ³n de pecho',
            'DuraciÃ³n: Hasta 12 horas',
            'Facilita la respiraciÃ³n',
            'Tabletas de liberaciÃ³n prolongada',
        ],
    },

    nyquil: {
        description: 'NyQuil proporciona un alivio nocturno para los peores sÃ­ntomas del resfriado y la gripe, ayudÃ¡ndote a descansar mejor para despertar renovado.',
        detalles: [
            'Alivio nocturno',
            'Ayuda a descansar mejor',
            'Combate tos, dolor y fiebre',
            'Sabor reconfortante',
            'Ideal para uso antes de dormir',
        ],
    },

    // â”€â”€â”€ FARMACIA / DERMOCOSMÃ‰TICA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    hidratante_cerave: {
        description: 'La Crema Hidratante Cerave es ideal para pieles secas a muy secas, proporcionando hidrataciÃ³n profunda y restaurando la barrera protectora de la piel.',
        detalles: [
            'Tipo: Crema hidratante corporal y facial',
            'Ingredientes: 3 ceramidas esenciales, Ãcido hialurÃ³nico',
            'TecnologÃ­a: MVE para liberaciÃ³n prolongada de hidrataciÃ³n',
            'Beneficios: No comedogÃ©nica, sin perfume, apta para todo tipo de piel',
            'Contenido: 340g',
        ],
    },

    acido_hialuronico: {
        description: 'El Ãcido HialurÃ³nico en serum ayuda a mantener la piel hidratada, firme y con un aspecto mÃ¡s joven, reduciendo las lÃ­neas de expresiÃ³n.',
        detalles: [
            'HidrataciÃ³n intensa',
            'Reduce lÃ­neas de expresiÃ³n',
            'Para todo tipo de piel',
            'Textura ligera y absorciÃ³n rÃ¡pida',
            'Efecto reafirmante',
        ],
    },

    hidratante_eucerin: {
        description: 'Eucerin Hidratante es una fÃ³rmula dermatolÃ³gica diseÃ±ada para proteger y fortalecer la barrera de la piel, ideal para pieles sensibles.',
        detalles: [
            'DermatolÃ³gicamente probado',
            'Ideal para piel sensible',
            'Sin fragancias ni colorantes',
            'Fortalece la piel',
            'HidrataciÃ³n de larga duraciÃ³n',
        ],
    },

    hidratante_grande: {
        description: 'CeraVe Crema Hidratante en presentaciÃ³n grande, perfecta para el cuidado diario de toda la familia, asegurando hidrataciÃ³n continua.',
        detalles: [
            'PresentaciÃ³n: XL (454g)',
            'Larga duraciÃ³n',
            'Mismos beneficios Cerave',
            'Ideal para uso familiar',
            'Cuidado corporal completo',
        ],
    },

    retinol: {
        description: 'El Retinol ayuda a renovar la superficie de la piel y a mejorar su textura, reduciendo manchas y signos de la edad de manera efectiva.',
        detalles: [
            'Antienvejecimiento',
            'Mejora la textura de la piel',
            'Reduce manchas oscuras',
            'Estimula la renovaciÃ³n celular',
            'Uso nocturno recomendado',
        ],
    },

    serum_vitaminac: {
        description: 'El Serum de Vitamina C aporta luminosidad y protecciÃ³n antioxidante a la piel, ayudando a unificar el tono y prevenir el daÃ±o ambiental.',
        detalles: [
            'Antioxidante potente',
            'Aporta luminosidad instantÃ¡nea',
            'Unifica el tono de piel',
            'ProtecciÃ³n contra radicales libres',
            'Ligero y de fÃ¡cil aplicaciÃ³n',
        ],
    },

    // â”€â”€â”€ FARMACIA / VITAMINAS Y MINERALES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    multivitaminico: {
        description: 'Suplemento completo que proporciona una amplia gama de vitaminas y minerales esenciales para mantener la energÃ­a y el bienestar general diario.',
        detalles: [
            'Tipo: Suplemento vitamÃ­nico diario',
            'Referencia: Apoyo a la salud integral',
            'Beneficios: MÃ¡s energÃ­a, mejor rendimiento mental y fÃ­sico',
            'Modo de uso: Una cÃ¡psula al dÃ­a',
            'Contenido: 60 cÃ¡psulas',
        ],
    },

    flintstones: {
        description: 'MultivitamÃ­nico Flintstones en gomitas, diseÃ±ado especÃ­ficamente para niÃ±os para asegurar que reciban las vitaminas necesarias para su crecimiento.',
        detalles: [
            'Ideal para niÃ±os',
            'PresentaciÃ³n: Gomitas masticables',
            'Sabor delicioso a frutas',
            'Apoyo al crecimiento saludable',
            'Contiene vitaminas A, C, D, E',
        ],
    },

    omega3: {
        description: 'El Suplemento de Omega 3 es esencial para la salud cardiovascular y cerebral, proporcionando Ã¡cidos grasos de alta pureza.',
        detalles: [
            'Salud cardiovascular',
            'Apoyo a la funciÃ³n cerebral',
            'CÃ¡psulas de gel fÃ¡ciles de tragar',
            'Alta pureza y concentraciÃ³n',
            'Sin sabor a pescado',
        ],
    },

    vitafusion: {
        description: 'Vitafusion ofrece vitaminas en gomitas para adultos, una forma deliciosa y fÃ¡cil de complementar la dieta diaria sin pastillas.',
        detalles: [
            'Para adultos',
            'Formato: Gomitas',
            'Complemento dietÃ©tico',
            'Sabor natural',
            'FÃ¡cil de incorporar a la rutina',
        ],
    },

    vitaminac: {
        description: 'La Vitamina C refuerza el sistema inmunolÃ³gico y actÃºa como un potente antioxidante para proteger las cÃ©lulas del cuerpo.',
        detalles: [
            'Refuerza el sistema inmunolÃ³gico',
            'Antioxidante esencial',
            'Tabletas masticables',
            'Ayuda a la absorciÃ³n de hierro',
            'ProtecciÃ³n diaria',
        ],
    },

    // â”€â”€â”€ FERRETERÃA / ELECTRICIDAD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    bombillas_led: {
        description: 'Ahorra energÃ­a con nuestras bombillas LED de larga duraciÃ³n, diseÃ±adas para ofrecer una luz brillante y eficiente.',
        detalles: [
            'Tipo: TecnologÃ­a LED',
            'Soporte: E27',
            'Potencia: 9W (equivalente a 75W)',
            'Vida Ãºtil: 25,000 horas',
            'Pack: 3 unidades',
        ],
    },

    bombillas: {
        description: 'Ilumina tus espacios con nuestras bombillas incandescentes de alta calidad y rendimiento confiable.',
        detalles: [
            'Tipo: Incandescente',
            'Potencia: 60W',
            'Rosca: E27',
            'Luz cÃ¡lida',
            'EconÃ³micas',
        ],
    },

    extension: {
        description: 'ExtensiÃ³n elÃ©ctrica reforzada para interiores y exteriores, ideal para conectar mÃºltiples dispositivos con seguridad.',
        detalles: [
            'Longitud: 5 metros',
            'Tomas: 3 salidas',
            'Calibre: 14 AWG',
            'Uso rudo',
            'Color: Naranja',
        ],
    },

    linterna: {
        description: 'Linterna LED recargable de alta potencia, compacta y resistente al agua, perfecta para emergencias y actividades al aire libre.',
        detalles: [
            'LÃºmenes: 1000',
            'BaterÃ­a: Ion de litio recargable',
            'Modos: Alto, Bajo, EstroboscÃ³pico',
            'Resistencia: IPX4',
            'Material: Aluminio aeroespacial',
        ],
    },

    toma_corriente: {
        description: 'Toma corriente doble de pared con diseÃ±o moderno y seguridad mejorada para tu hogar u oficina.',
        detalles: [
            'Tipo: Duplex',
            'Voltaje: 125V',
            'Amperaje: 15A',
            'Color: Blanco',
            'Material: TermoplÃ¡stico resistente',
        ],
    },

    // â”€â”€â”€ FERRETERÃA / HERRAMIENTAS MANUALES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    martillo: {
        description: 'Martillo de uÃ±a con mango de fibra de vidrio para una mayor absorciÃ³n de impactos y durabilidad.',
        detalles: [
            'Tipo: De uÃ±a (Carpintero)',
            'Peso: 16 oz',
            'Material: Cabeza de acero forjado',
            'Mango: Fibra de vidrio ergonÃ³mica',
            'Marca: Superior Tools',
        ],
    },

    destornillador: {
        description: 'Juego de destornilladores de precisiÃ³n con puntas magnÃ©ticas, ideales para trabajos electrÃ³nicos y reparaciones del hogar.',
        detalles: [
            'Kit: 6 piezas',
            'Tipo: Phillips y Planos',
            'Puntas magnÃ©ticas',
            'Mango antideslizante',
            'Material: Acero cromo vanadio',
        ],
    },

    llave_de_tuerca: {
        description: 'Llave ajustable de gran apertura, diseÃ±ada para mÃ¡xima versatilidad en trabajos de mecÃ¡nica y plomerÃ­a.',
        detalles: [
            'TamaÃ±o: 10 pulgadas',
            'Apertura mÃ¡xima: 1.5 pulgadas',
            'Escala mÃ©trica e imperial',
            'Acero forjado',
            'Acabado cromado',
        ],
    },

    pinza: {
        description: 'Pinza universal con corte lateral, indispensable para electricistas y mantenimiento general.',
        detalles: [
            'Tipo: Universal (Electricista)',
            'TamaÃ±o: 7 pulgadas',
            'Mangos aislados',
            'Capacidad de corte: Alambre duro',
            'Forjado en caliente',
        ],
    },

    sierra_de_mano: {
        description: 'Sierra de mano para madera con dientes templados para un corte rÃ¡pido y preciso en carpinterÃ­a.',
        detalles: [
            'Largo: 20 pulgadas',
            'Dientes por pulgada: 8 TPI',
            'Mango ergonÃ³mico de madera',
            'Hoja de acero alto carbono',
            'Corte agresivo',
        ],
    },

    // â”€â”€â”€ FERRETERÃA / PINTURAS Y ACABADOS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    pinturas_tropical: {
        description: 'Pintura acrÃ­lica de secado rÃ¡pido con excelente cobertura y resistencia a la intemperie, perfecta para exteriores.',
        detalles: [
            'Tipo: AcrÃ­lica',
            'Uso: Exterior e Interior',
            'Acabado: Mate',
            'Resistencia: Rayos UV y Humedad',
            'Marca: Tropical',
        ],
    },

    pinturas_tucan: {
        description: 'Pintura premium con acabado satinado, lavable y de bajo olor, ideal para interiores y decoraciÃ³n.',
        detalles: [
            'Tipo: Vinil-AcrÃ­lica',
            'Acabado: Satinado',
            'Propiedad: Lavable',
            'Bajo VOC (Olor)',
            'Marca: TucÃ¡n',
        ],
    },

    brocha: {
        description: 'Brocha profesional de cerdas naturales para un acabado suave y uniforme en cualquier superficie.',
        detalles: [
            'Ancho: 3 pulgadas',
            'Cerdas: 100% naturales',
            'Mango de madera barnizada',
            'Virola de acero inoxidable',
            'Para todo tipo de pinturas',
        ],
    },

    rodillo_de_pintura: {
        description: 'Rodillo de alta densidad para superficies lisas, minimiza el goteo y maximiza la transferencia de pintura.',
        detalles: [
            'TamaÃ±o: 9 pulgadas',
            'Felpa: PoliÃ©ster 3/8"',
            'Para pinturas de lÃ¡tex y aceite',
            'Mango ergonÃ³mico',
            'Cubierta reemplazable',
        ],
    },

    kit_de_pintura: {
        description: 'Kit completo para pintar que incluye bandeja, rodillo, brocha y cinta adhesiva, todo lo necesario para tu proyecto.',
        detalles: [
            'Incluye: Bandeja, Rodillo (9"), Brocha (2"), Cinta',
            'Material: PlÃ¡stico resistente',
            'Ideal para principiantes',
            'Ahorro de tiempo',
            'FÃ¡cil de limpiar',
        ],
    },

    // â”€â”€â”€ FERRETERÃA / PLOMERÃA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    grifo_moderno: {
        description: 'Grifo monomando con acabado cromado mate, diseÃ±o elegante y sistema de ahorro de agua integrado para una eficiencia superior.',
        detalles: [
            'Tipo: Monomando',
            'Acabado: Cromo Mate',
            'Soporte: Ahorro de Agua',
            'Material: LatÃ³n de alta pureza',
            'InstalaciÃ³n: Sencilla',
        ],
    },

    grifo: {
        description: 'Grifo tradicional de lavabo con diseÃ±o clÃ¡sico y duradero, fÃ¡cil de instalar y mantener.',
        detalles: [
            'Tipo: Grifo de bola',
            'Material: LatÃ³n cromado',
            'InstalaciÃ³n: Rosca estÃ¡ndar',
            'Larga vida Ãºtil',
            'DiseÃ±o funcional',
        ],
    },

    manguera_de_jardin: {
        description: 'Manguera de jardÃ­n reforzada de triple capa, ultra flexible y resistente a torceduras y climas extremos.',
        detalles: [
            'Longitud: 15 metros',
            'Material: PVC reforzado',
            'Incluye: Boquilla ajustable',
            'Resistencia: 300 PSI',
            'Color: Verde',
        ],
    },

    manguera: {
        description: 'Manguera flexible para conexiÃ³n de inodoros o lavabos, trenzada en acero inoxidable para evitar fugas.',
        detalles: [
            'Longitud: 16 pulgadas',
            'Trenzado: Acero inoxidable',
            'Tuercas: LatÃ³n niquelado',
            'Resistente a la corrosiÃ³n',
            'FÃ¡cil instalaciÃ³n',
        ],
    },

    tubo: {
        description: 'Tubo de PVC de alta presiÃ³n para drenaje y sistemas sanitarios, ligero y fÃ¡cil de cortar e instalar.',
        detalles: [
            'DiÃ¡metro: 2 pulgadas',
            'Largo: 3 metros',
            'Material: PVC de alta densidad',
            'Uso: Sanitario',
            'Resistente a quÃ­micos',
        ],
    },

    // â”€â”€â”€ JUGUETES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    muneca_barbie: {
        description: "MuÃ±eca Barbie clÃ¡sica con un vestido elegante y accesorios modernos. DiseÃ±ada para inspirar la imaginaciÃ³n y recordar que tÃº puedes ser lo que quieras.",
        detalles: [
            "Modelo: Barbie Fashionistas",
            "Incluye: Vestido, zapatos y bolso",
            "Material: PlÃ¡stico de alta calidad",
            "Edad: 3+ aÃ±os",
            "Marca: Mattel"
        ]
    },
    muneca_baby_doll: {
        description: "Adorable muÃ±eca Baby Doll con accesorios de cuidado. Fomenta la empatÃ­a y el juego imaginativo mientras los mÃ¡s pequeÃ±os aprenden a cuidar.",
        detalles: [
            "Tipo: MuÃ±eca de Cuidado",
            "Incluye: BiberÃ³n y sonajero",
            "Material: Vinilo suave",
            "Edad: 2+ aÃ±os",
            "Marca: Little Hearts"
        ]
    },
    juguetes_de_peluqueria: {
        description: "Set completo de peluquerÃ­a de juguete. Incluye un secador que emite aire suave, peines, clips coloridos y un espejo para crear estilos fantÃ¡sticos y divertidos.",
        detalles: [
            "Contenido: Secador, 2 peines, 4 clips",
            "Funcionalidad: Secador a pilas (no incl.)",
            "Material: PlÃ¡stico libre de BPA",
            "Edad: 5+ aÃ±os",
            "Marca: Style Stars"
        ]
    },
    kit_de_maquillaje: {
        description: "Kit de maquillaje artÃ­stico para niÃ±as, totalmente lavable y seguro. Incluye sombras, rubores y aplicadores, ideal para fiestas, cumpleaÃ±os y juegos de disfraces.",
        detalles: [
            "Tipo: Maquillaje Lavable",
            "Seguridad: No tÃ³xico, dermatolÃ³gicamente probado",
            "Incluye: Sombras, rubor, 2 aplicadores",
            "Edad: 6+ aÃ±os",
            "Marca: Glamour Kids"
        ]
    },
    pinta_unas: {
        description: "Set de esmaltes de uÃ±as de colores vibrantes y stickers decorativos. No tÃ³xico, base agua y fÃ¡cil de remover, perfecto para una tarde de spa y creatividad.",
        detalles: [
            "Contenido: 3 esmaltes, 1 hoja de stickers",
            "Seguridad: No tÃ³xico, lavable",
            "Colores: Rosa, Morado, Azul",
            "Edad: 4+ aÃ±os",
            "Marca: Little Diva"
        ]
    },
    legos_de_minecraft: {
        description: "Set LEGO Minecraft: La CabaÃ±a-Abeja. Una aventura de construcciÃ³n llena de posibilidades, con miel, abejas zumbadoras y figuras de personajes para recrear el juego en la vida real.",
        detalles: [
            "Set: La CabaÃ±a-Abeja",
            "Piezas: 251 bloques",
            "Incluye: Apicultor, Osito Zombi, 3 Abejas",
            "Edad: 8+ aÃ±os",
            "Marca: LEGO / Minecraft"
        ]
    },
    auto_azul: {
        description: "Auto deportivo de color azul brillante, con ruedas de fricciÃ³n y detalles realistas para horas de diversiÃ³n a toda velocidad.",
        detalles: [
            "Color: Azul Brillante",
            "Material: PlÃ¡stico resistente",
            "Sistema: Ruedas de FricciÃ³n",
            "Edad: 3+ aÃ±os",
            "Marca: Speed Master"
        ]
    },
    avion_de_juguete: {
        description: "AviÃ³n de juguete con luces y sonidos reales de despegue. Perfecto para pequeÃ±os pilotos que aman la aventura en las alturas.",
        detalles: [
            "Tipo: AviÃ³n con Efectos",
            "Funciones: Luces LED y Sonido",
            "Material: ABS de alta resistencia",
            "Edad: 4+ aÃ±os",
            "Marca: Fly High"
        ]
    },
    autos_hot_wheels: {
        description: "ColecciÃ³n de 5 autos Hot Wheels clÃ¡sicos. DiseÃ±os veloces, colores vibrantes y acabados metÃ¡licos de alta calidad para coleccionistas y niÃ±os por igual.",
        detalles: [
            "Contenido: Pack de 5 autos",
            "Escala: 1:64",
            "Material: Metal y PlÃ¡stico",
            "Edad: 3+ aÃ±os",
            "Marca: Hot Wheels / Mattel"
        ]
    },
    legos_de_creeper: {
        description: "Los Legos de Creeper son ideales para los niÃ±os amantes de la construcciÃ³n y de Minecraft. Permiten desarrollar la creatividad, motricidad fina y habilidades de resoluciÃ³n de problemas mientras construyen uno de los personajes mÃ¡s icÃ³nicos del juego.",
        detalles: [
            "Serie: Minecraft",
            "Tema: Creeper BigFigure",
            "Edad recomendada: 7+ aÃ±os",
            "Material: PlÃ¡stico ABS de alta calidad",
            "Marca: LEGO"
        ]
    },

    // â”€â”€â”€ MUEBLES Y DECORACIÃ“N â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    // SofÃ¡s
    sofa_verde: {
        description: "SofÃ¡ espacioso en color verde esmeralda. Un mueble imponente que destaca por su color vibrante y su capacidad para acoger a toda la familia con estilo.",
        detalles: [
            "Material: Terciopelo verde esmeralda and madera noble",
            "Capacidad: 4-5 personas",
            "Estilo: Glamour Moderno",
            "GarantÃ­a: 3 aÃ±os",
            "Marca: LuxuryComfort"
        ]
    },
    sofa_gris: {
        description: "SofÃ¡ contemporÃ¡neo en color gris. Con una estructura robusta y cojines extra suaves, es la elecciÃ³n perfecta para maratones de series y relax familiar.",
        detalles: [
            "Material: Estructura reforzada y tela resistente",
            "Plazas: 3",
            "Confort: Premium",
            "GarantÃ­a: 2 aÃ±os",
            "Marca: UrbanLiving"
        ]
    },
    sofa_media_luna: {
        description: "SofÃ¡ con un diseÃ±o innovador en media luna. Ideal para crear espacios de conversaciÃ³n acogedores y dinÃ¡micos en salas de estar amplias.",
        detalles: [
            "Material: Espuma de alta densidad y tela premium",
            "Forma: Circular / Media Luna",
            "Uso: Salas de estar / Espera",
            "GarantÃ­a: 1 aÃ±o",
            "Marca: UniqueDesign"
        ]
    },
    sofa_negro: {
        description: "SofÃ¡ elegante en color negro profundo. Su acabado premium y lÃ­neas sofisticadas aportan un toque de lujo industrial a cualquier oficina o sala de estar moderna.",
        detalles: [
            "Material: Cuero sintÃ©tico premium y metal",
            "Estilo: Industrial Moderno",
            "Acabado: Negro Mate",
            "GarantÃ­a: 5 aÃ±os (estructura)",
            "Marca: EliteFurniture"
        ]
    },
    sofa_cama_blanco: {
        description: "SofÃ¡ cama en color blanco puro. Funcionalidad y diseÃ±o se unen en esta pieza versÃ¡til que se transforma fÃ¡cilmente para recibir a tus invitados con el mÃ¡ximo confort.",
        detalles: [
            "Material: Estructura de madera y tela suave",
            "Tipo: SofÃ¡ Cama",
            "Capacidad: 3 plazas (sofÃ¡) / 2 plazas (cama)",
            "GarantÃ­a: 2 aÃ±os",
            "Marca: RelaxHome"
        ]
    },

    // Sillones
    sillon_amarillo: {
        description: "SillÃ³n individual en color amarillo vibrante. Su diseÃ±o ergonÃ³mico y acolchado de alta densidad garantizan un confort excepcional mientras aÃ±ades una pieza de acento audaz a tu sala.",
        detalles: [
            "Material: Tela premium y madera",
            "Estilo: ContemporÃ¡neo",
            "ErgonomÃ­a: Alta",
            "GarantÃ­a: 1 aÃ±o",
            "Marca: ComfortPlus"
        ]
    },
    sillon_azul: {
        description: "SillÃ³n de terciopelo azul profundo. Elegancia clÃ¡sica combinada con una estructura moderna de patas metÃ¡licas, ideal para un rincÃ³n de lectura sofisticado.",
        detalles: [
            "Material: Terciopelo y metal",
            "Estilo: ClÃ¡sico moderno",
            "Uso: Interior",
            "GarantÃ­a: 2 aÃ±os",
            "Marca: EliteFurniture"
        ]
    },
    sillon_blanco: {
        description: "SillÃ³n minimalista en color blanco puro. Su diseÃ±o de lÃ­neas limpias y tejido resistente a manchas lo hace perfecto para ambientes luminosos y modernos.",
        detalles: [
            "Material: Microfibra y madera",
            "Estilo: Loft Minimalista",
            "Tratamiento: Anti-manchas",
            "GarantÃ­a: 1 aÃ±o",
            "Marca: UrbanDesign"
        ]
    },
    sillon_gris: {
        description: "SillÃ³n contemporÃ¡neo en gris jaspeado. VersÃ¡til y atemporal, este sillÃ³n se adapta a cualquier estilo de decoraciÃ³n ofreciendo una durabilidad superior para el uso diario.",
        detalles: [
            "Material: Lino sintÃ©tico y madera",
            "Color: Gris jaspeado",
            "Uso: Familiar",
            "GarantÃ­a: 2 aÃ±os",
            "Marca: HomeStyle"
        ]
    },
    sillon_verde: {
        description: "SillÃ³n estilo nÃ³rdico en verde olivo. Fabricado con materiales sostenibles, aporta un toque de naturaleza y frescura a tu hogar sin comprometer el estilo.",
        detalles: [
            "Material: AlgodÃ³n orgÃ¡nico y roble",
            "Sostenibilidad: Alta",
            "Estilo: Escandinavo",
            "GarantÃ­a: 3 aÃ±os",
            "Marca: EcoLiving"
        ]
    },

    // Mesas
    mesa_de_madera: {
        description: "Mesa de comedor fabricada en madera sÃ³lida de roble de alta calidad. Su acabado natural resalta la belleza de la veta, aportando calidez y robustez a tu hogar.",
        detalles: [
            "Material: Roble sÃ³lido seleccionado",
            "Acabado: Barniz natural mate",
            "Capacidad: 6-8 comensales",
            "Dimensiones: 180cm x 90cm x 75cm",
            "Marca: WoodMaster"
        ]
    },
    mesa_de_noche: {
        description: "Elegante mesa de noche con un diseÃ±o moderno y funcional. Incluye un cajÃ³n de suave apertura para mantener tus objetos personales organizados.",
        detalles: [
            "Material: Madera MDF con acabado premium",
            "Cajones: 1 con guÃ­as metÃ¡licas",
            "Estilo: Minimalista Urbano",
            "Dimensiones: 45cm x 40cm x 55cm",
            "Marca: SleepWell"
        ]
    },
    mesa_moderna: {
        description: "Mesa de centro con diseÃ±o vanguardista. Combina superficies de cristal templado con una estructura metÃ¡lica minimalista para un estilo contemporÃ¡neo.",
        detalles: [
            "Material: Cristal templado y acero inoxidable",
            "Estilo: Loft Moderno",
            "Uso: Mesa de centro decorativa",
            "GarantÃ­a: 2 aÃ±os",
            "Marca: UrbanDesign"
        ]
    },
    mesa_oscura: {
        description: "Mesa de comedor imponente en tono Ã©bano profundo. Su diseÃ±o sÃ³lido y majestuoso estÃ¡ pensado para ser la pieza central de comedores amplios.",
        detalles: [
            "Color: Ã‰bano profundo",
            "Capacidad: 8-10 personas",
            "Resistencia: Alta durabilidad",
            "Estilo: ClÃ¡sico contemporÃ¡neo",
            "Marca: EliteFurniture"
        ]
    },
    mesa_pequena: {
        description: "Mesa auxiliar de diseÃ±o exclusivo en mÃ¡rmol. Esta pieza destaca por el uso de materiales de lujo y una artesanÃ­a excepcional.",
        detalles: [
            "Material: MÃ¡rmol de Caoba y latÃ³n",
            "Tipo: EdiciÃ³n limitada",
            "Uso: Auxiliar de lujo",
            "Acabado: Pulido a mano",
            "Marca: LuxHome"
        ]
    },

    // Floreros
    florero_de_plantas: {
        description: "Florero de cerÃ¡mica ideal para plantas de interior. Su diseÃ±o minimalista y acabado mate aporta frescura, orden y elegancia a cualquier espacio.",
        detalles: [
            "Material: CerÃ¡mica de alta calidad",
            "Estilo: Minimalista ContemporÃ¡neo",
            "Dimensiones: 25cm x 12cm",
            "Uso: Interior exclusivamente",
            "Marca: DecorHome"
        ]
    },
    florero_de_vidrio: {
        description: "Florero de vidrio soplado artesanalmente. Su transparencia cristalina resalta la belleza de tus flores naturales, creando un ambiente de arte y sofisticaciÃ³n.",
        detalles: [
            "Material: Vidrio soplado artesanal",
            "Estilo: ClÃ¡sico Atemporal",
            "Dimensiones: 30cm x 15cm",
            "CaracterÃ­sticas: Alta transparencia, base pesada",
            "Marca: CrystalDesign"
        ]
    },
    jarron: {
        description: "JarrÃ³n decorativo de terracota. Con su acabado natural y textura Ãºnica, este jarrÃ³n aporta un toque rÃºstico y sofisticado a cualquier rincÃ³n.",
        detalles: [
            "Material: Terracota artesanal",
            "Estilo: RÃºstico Moderno",
            "Color: Tonos tierra naturales",
            "Uso: Decorativo interior",
            "Marca: RusticHome"
        ]
    },
    jarrones: {
        description: "Set de jarrones decorativos en diferentes tamaÃ±os coordinados. Perfectos para crear atractivas composiciones visuales en estanterÃ­as o centros de mesa.",
        detalles: [
            "Contenido: Set de 3 piezas",
            "Material: CerÃ¡mica esmaltada",
            "Estilo: ContemporÃ¡neo versÃ¡til",
            "CaracterÃ­sticas: TamaÃ±os escalonados, acabado liso",
            "Marca: DecorHome"
        ]
    },
    tulipanes: {
        description: "Arreglo decorativo de tulipanes artificiales de tacto real. Disfruta de la belleza y delicadeza de los tulipanes durante todo el aÃ±o sin necesidad de cuidados.",
        detalles: [
            "Tipo: Flores artificiales de tacto real",
            "Cantidad: Ramo de 10 unidades",
            "Material: PolÃ­mero suave de alta calidad",
            "Ventajas: Belleza duradera, fÃ¡cil limpieza",
            "Marca: NatureFake"
        ]
    },

    // â”€â”€â”€ ROPA / PANTALONES PARA HOMBRES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    pantalon_negro: {
        description: "El PantalÃ³n Negro combina elegancia y comodidad. Su diseÃ±o moderno y su tela de alta calidad lo hacen ideal para ocasiones formales y el uso diario.",
        detalles: [
            "DiseÃ±o elegante y moderno",
            "Tela suave y duradera",
            "Corte ajustado y cÃ³modo",
            "Ideal para eventos y oficina",
            "Disponible en varias tallas"
        ]
    },
    pantalones_de_golf: {
        description: "Los Pantalones de Golf estÃ¡n diseÃ±ados para ofrecerte el mÃ¡ximo rendimiento y comodidad en el campo. Su tela transpirable y flexible permite una total libertad de movimiento.",
        detalles: [
            "Tela transpirable y ligera",
            "Flexibilidad para mayor movimiento",
            "DiseÃ±o moderno y deportivo",
            "Resistente a las arrugas",
            "Ideal para el campo de golf"
        ]
    },
    pantalones_deportivos_joggers: {
        description: "Los Pantalones Deportivos Joggers combinan estilo urbano y comodidad deportiva. Perfectos para tus entrenamientos o para un look relajado en tu dÃ­a a dÃ­a.",
        detalles: [
            "DiseÃ±o jogger moderno",
            "Material suave y elÃ¡stico",
            "Cintura ajustable con cordÃ³n",
            "Bolsillos prÃ¡cticos",
            "Ideal para deporte o casual"
        ]
    },
    pantalones_jeans: {
        description: "Los Pantalones Jeans son un clÃ¡sico que nunca pasa de moda. Con su diseÃ±o resistente y versÃ¡til, son la prenda ideal para cualquier ocasiÃ³n informal.",
        detalles: [
            "DiseÃ±o clÃ¡sico de mezclilla",
            "Tela resistente y duradera",
            "Ajuste cÃ³modo y versÃ¡til",
            "FÃ¡cil de combinar",
            "Disponible en varios lavados"
        ]
    },
    pantalones_joggers: {
        description: "Los Pantalones Joggers ofrecen la mezcla perfecta entre comodidad y estilo. Con su ajuste relajado y su tela suave, son ideales para descansar o para un look casual.",
        detalles: [
            "Ajuste relajado y cÃ³modo",
            "Tela suave al tacto",
            "PuÃ±os elÃ¡sticos en los tobillos",
            "Ideal para el uso diario",
            "Disponible en varios colores"
        ]
    },

    // â”€â”€â”€ ROPA / PANTALONES PARA MUJERES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    leggings_de_licra: {
        description: "Los Leggings de Licra son flexibles, cÃ³modos y perfectos para ejercicio, yoga o uso diario. Su tela suave permite libertad total de movimiento.",
        detalles: [
            "Tela de licra ultra flexible",
            "DiseÃ±o cÃ³modo y ajustado",
            "Suaves y ligeros",
            "Perfectos para deporte o uso diario",
            "Disponibles en varias tallas"
        ]
    },
    pantalon_acampanado: {
        description: "El PantalÃ³n Acampanado combina estilo y comodidad. Su diseÃ±o moderno y su caÃ­da elegante lo hacen ideal para ocasiones casuales o formales.",
        detalles: [
            "DiseÃ±o acampanado moderno",
            "Tela suave y cÃ³moda",
            "Ajuste perfecto a la cintura",
            "Ideal para uso diario o eventos",
            "Disponible en varias tallas"
        ]
    },
    pantalon_casual: {
        description: "El PantalÃ³n Casual estÃ¡ diseÃ±ado para acompaÃ±arte en tu dÃ­a a dÃ­a. Su estilo moderno y su comodidad lo convierten en una prenda esencial para cualquier guardarropa.",
        detalles: [
            "DiseÃ±o casual y moderno",
            "Tela suave y ligera",
            "Ajuste cÃ³modo en la cintura",
            "Ideal para uso diario",
            "Disponible en varias tallas"
        ]
    },
    pantalon_jean: {
        description: "El PantalÃ³n Jean ofrece durabilidad, estilo y comodidad. Perfecto para combinar con cualquier outfit y usar en cualquier ocasiÃ³n.",
        detalles: [
            "DiseÃ±o clÃ¡sico y moderno",
            "Tela resistente y de alta calidad",
            "Ajuste cÃ³modo y flexible",
            "Ideal para uso diario",
            "Disponible en varias tallas"
        ]
    },
    pantalon_liso_mujer: {
        description: "El PantalÃ³n Liso para Mujer combina elegancia y comodidad, ideal para el uso diario o para ocasiones semi-formales. Su diseÃ±o minimalista permite combinarlo fÃ¡cilmente con diferentes estilos.",
        detalles: [
            "DiseÃ±o liso y elegante",
            "Material suave y cÃ³modo",
            "Ideal para combinar con blusas o camisetas",
            "Perfecto para uso casual o de oficina",
            "Disponible en varias tallas y colores"
        ]
    },

    // â”€â”€â”€ ROPA / PANTALONES PARA NIÃ‘OS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    jean_para_ninos: {
        description: "El Jean para NiÃ±os combina el estilo clÃ¡sico de la mezclilla con la resistencia necesaria para el juego. Un pantalÃ³n que dura y se ve bien.",
        detalles: [
            "Mezclilla reforzada en puntos clave",
            "Cintura ajustable interna",
            "Estilo clÃ¡sico de 5 bolsillos",
            "Efecto de lavado moderno",
            "Alta durabilidad"
        ]
    },
    licra_para_ninos: {
        description: "La Licra para NiÃ±os ofrece total libertad de movimiento para los mÃ¡s pequeÃ±os. Ideal para actividades deportivas o juegos activos con mÃ¡xima comodidad.",
        detalles: [
            "Material ultra elÃ¡stico",
            "Costuras planas anti-rozaduras",
            "Secado rÃ¡pido",
            "ProtecciÃ³n contra el desgaste",
            "Ideal para deportes infantiles"
        ]
    },
    pantalon_deportivo: {
        description: "El PantalÃ³n Deportivo para niÃ±os es perfecto para la educaciÃ³n fÃ­sica y el juego diario. Su material resistente aguanta el ritmo de los niÃ±os mÃ¡s activos.",
        detalles: [
            "Tela resistente y duradera",
            "Cintura elÃ¡stica con cordÃ³n",
            "Bolsillos de seguridad",
            "FÃ¡cil de lavar y secar",
            "DiseÃ±o dinÃ¡mico y cÃ³modo"
        ]
    },
    pantalon_liso: {
        description: "El PantalÃ³n Liso para niÃ±os es una prenda bÃ¡sica y versÃ¡til. Su diseÃ±o sencillo permite combinarlo fÃ¡cilmente para cualquier ocasiÃ³n cotidiana.",
        detalles: [
            "Color sÃ³lido y elegante",
            "Tela suave para piel sensible",
            "Ajuste cÃ³modo para el juego",
            "Resistencia a las manchas",
            "BÃ¡sico indispensable"
        ]
    },
    pantalones_lisos_para_ninos: {
        description: "Los Pantalones Lisos para NiÃ±os ofrecen comodidad y durabilidad para el dÃ­a a dÃ­a. DiseÃ±ados pensando en el movimiento constante de los niÃ±os.",
        detalles: [
            "Color sÃ³lido y elegante",
            "Tela suave para piel sensible",
            "Ajuste cÃ³modo para el juego",
            "Resistencia a las manchas",
            "BÃ¡sico indispensable"
        ]
    },

    // â”€â”€â”€ ROPA / TRAJES PARA HOMBRES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    traje_2_piezas: {
        description: "El Traje 2 Piezas combina elegancia y comodidad. Incluye chaqueta y pantalÃ³n confeccionados con materiales de alta calidad, perfectos para eventos formales y ocasiones especiales.",
        detalles: [
            "Corte Slim Fit moderno",
            "Tela suave y de alta calidad",
            "Forro interior sedoso",
            "Perfecto para oficina o eventos",
            "Incluye saco y pantalÃ³n combinados"
        ]
    },
    traje_azul: {
        description: "El Traje Azul combina elegancia y comodidad. Incluye chaqueta y pantalÃ³n confeccionados con materiales de alta calidad, perfectos para eventos formales y ocasiones especiales.",
        detalles: [
            "Corte Slim Fit moderno",
            "Tela suave y de alta calidad",
            "Forro interior sedoso",
            "Perfecto para oficina o eventos",
            "Tono azul profundo sofisticado"
        ]
    },
    traje_completo: {
        description: "El Traje Completo combina elegancia y comodidad. Incluye saco, pantalÃ³n y chaleco confeccionados con materiales de alta calidad, ideales para eventos de gala.",
        detalles: [
            "Incluye saco, pantalÃ³n y chaleco",
            "DiseÃ±o clÃ¡sico y atemporal",
            "Ideal para bodas y galas",
            "Tela de alta durabilidad",
            "Ajuste preciso"
        ]
    },
    traje_elegante: {
        description: "El Traje Elegante destaca por su acabado premium. Ideal para quienes buscan distinciÃ³n y exclusividad en cada detalle para sus momentos mÃ¡s importantes.",
        detalles: [
            "DiseÃ±o premium para ocasiones especiales",
            "Tela con acabado sutil y sofisticado",
            "Ajuste perfecto a la medida",
            "Materiales importados de alta calidad",
            "MÃ¡xima elegancia"
        ]
    },
    traje_negro: {
        description: "El Traje Negro es la definiciÃ³n de la sobriedad y el estilo. Una pieza indispensable para eventos nocturnos y rigurosa etiqueta formal.",
        detalles: [
            "De color negro sÃ³lido y elegante",
            "Tela resistente a las arrugas",
            "Ideal para cualquier evento formal",
            "Corte clÃ¡sico que nunca pasa de moda",
            "Acabado impecable"
        ]
    },

    // â”€â”€â”€ ROPA / VESTIDOS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    vestido_ajustado: {
        description: "El Vestido Ajustado realza la figura con sofisticaciÃ³n. Su diseÃ±o moderno y material elÃ¡stico aseguran un ajuste impecable para noches inolvidables.",
        detalles: [
            "Corte ajustado que realza la silueta",
            "Material elÃ¡stico y cÃ³modo",
            "Ideal para cenas y eventos nocturnos",
            "DiseÃ±o vanguardista",
            "Tela de alta calidad"
        ]
    },
    vestido_cuello_cuadrado: {
        description: "El Vestido de Cuello Cuadrado combina una estÃ©tica clÃ¡sica con un toque moderno. Su diseÃ±o favorecedor es ideal para eventos sociales y salidas especiales.",
        detalles: [
            "Elegante diseÃ±o de cuello cuadrado",
            "Material suave y con caÃ­da",
            "Corte femenino y fluido",
            "Ideal para fiestas de dÃ­a o noche",
            "Acabado delicado"
        ]
    },
    vestido_de_invierno: {
        description: "El Vestido de Invierno estÃ¡ diseÃ±ado para ofrecer calidez sin sacrificar la elegancia. Perfecto para mantener el estilo durante las temporadas mÃ¡s frÃ­as.",
        detalles: [
            "Tejido tÃ©rmico ligero",
            "DiseÃ±o sofisticado para frÃ­o",
            "Corte cÃ³modo y protector",
            "Ideal para eventos invernales",
            "Material de alta densidad"
        ]
    },
    vestido_elegante: {
        description: "El Vestido Elegante es la mÃ¡xima expresiÃ³n de estilo. Confeccionado con atenciÃ³n al detalle, es la prenda perfecta para brillar en galas y recepciones.",
        detalles: [
            "DiseÃ±o de alta costura",
            "Telas exclusivas y delicadas",
            "Corte que garantiza distinciÃ³n",
            "Detalles artesanales",
            "Alta gama"
        ]
    },
    vestido_negro: {
        description: "El ClÃ¡sico Vestido Negro es versÃ¡til y atemporal. Un 'must-have' que ofrece elegancia instantÃ¡nea tanto para eventos de cÃ³ctel como para cenas formales.",
        detalles: [
            "Estilo negro clÃ¡sico y versÃ¡til",
            "Tela fresca con cuerpo",
            "DiseÃ±o minimalista y moderno",
            "Indispensable en todo guardarropa",
            "FÃ¡cil de accesorizar"
        ],
    },
};


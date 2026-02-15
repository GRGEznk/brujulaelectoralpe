const preguntas = [
  {
    id: 1,
    texto:
      "La justicia social y la equidad de oportunidades deben estar por encima de la libertad de mercado.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Principios y Visión",
  },
  {
    id: 2,
    texto:
      "La libertad individual de cada persona es anterior y superior a los fines del Estado.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Principios y Visión",
  },
  {
    id: 3,
    texto:
      'El Perú es una "Nación en formación" que requiere un Estado fuerte para consolidar su identidad.',
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Principios y Visión",
  },
  {
    id: 4,
    texto:
      "La propiedad privada es el cimiento irrenunciable de la prosperidad económica.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Principios y Visión",
  },
  {
    id: 5,
    texto:
      "El Estado debe intervenir activamente para corregir las desigualdades históricas de género y etnia.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Principios y Visión",
  },
  {
    id: 6,
    texto:
      "La moral y la honestidad deben ser los motores del desarrollo por encima de la eficiencia técnica.",
    eje: "Y",
    direccion: 1,
    estado: "activa",
    categoria: "Principios y Visión",
  },
  {
    id: 7,
    texto:
      "El Estado debe actuar solo de forma subsidiaria, interviniendo únicamente donde el privado no llega.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Principios y Visión",
  },
  {
    id: 8,
    texto:
      "La verdadera democracia solo se logra mediante la participación activa de las organizaciones sociales de base.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Principios y Visión",
  },
  {
    id: 9,
    texto:
      "El sistema de salud debe ser unificado (Minsa, EsSalud, Privados) bajo una sola red pública universal.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Salud",
  },
  {
    id: 10,
    texto:
      "La gestión de los hospitales públicos debe entregarse a operadores privados especializados para asegurar eficiencia.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Salud",
  },
  {
    id: 11,
    texto:
      "La Educación Sexual Integral (ESI) con enfoque de género debe ser obligatoria para prevenir embarazos adolescentes.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Salud",
  },
  {
    id: 12,
    texto:
      "El historial clínico electrónico debe ser de propiedad absoluta del ciudadano y accesible digitalmente en todo el país.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Salud",
  },
  {
    id: 13,
    texto:
      "La salud mental debe ser tratada como un componente central y obligatorio de la atención primaria.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Salud",
  },
  {
    id: 14,
    texto:
      "El Estado debe garantizar el 100% de la cobertura de vacunación infantil de forma obligatoria.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Salud",
  },
  {
    id: 15,
    texto:
      "Los colegios públicos deben gozar de autonomía para adaptar el currículo a su realidad regional.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Educación",
  },
  {
    id: 16,
    texto:
      "La meritocracia docente (evaluación y retiro) debe ser la prioridad para mejorar la calidad educativa.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Educación",
  },
  {
    id: 17,
    texto:
      "Se debe enseñar chino mandarín en las escuelas para mejorar la competitividad en el mercado global.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Educación",
  },
  {
    id: 18,
    texto:
      'El Estado debe financiar "Becas TEC" que prioricen carreras técnicas sobre las universitarias.',
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Educación",
  },
  {
    id: 19,
    texto:
      'La educación debe formar ciudadanos con mentalidad de "Libertad Financiera" y emprendimiento empresarial.',
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Educación",
  },
  {
    id: 20,
    texto:
      "Los Institutos de Educación Superior deben fusionarse con las universidades regionales para mejorar su calidad.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Educación",
  },
  {
    id: 21,
    texto:
      "Es fundamental que las escuelas enseñen la cosmovisión y saberes de los pueblos indígenas.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Educación",
  },
  {
    id: 22,
    texto:
      "El Estado debe financiar directamente la construcción masiva de 1.25 millones de viviendas sociales.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Vivienda y Saneamiento",
  },
  {
    id: 23,
    texto:
      "Las empresas de agua (EPS) deben ser privatizadas o manejadas por operadores globales técnicos.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Vivienda y Saneamiento",
  },
  {
    id: 24,
    texto:
      "El acceso al agua potable debe ser un derecho humano que prime sobre el uso minero o industrial.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Vivienda y Saneamiento",
  },
  {
    id: 25,
    texto:
      "Se debe fomentar el mercado de alquiler de vivienda formal mediante subsidios estatales para jóvenes.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Vivienda y Saneamiento",
  },
  {
    id: 26,
    texto:
      "El canon minero debe usarse obligatoriamente para financiar bonos de vivienda en zonas rurales.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Vivienda y Saneamiento",
  },
  {
    id: 27,
    texto:
      "Los títulos de propiedad urbana deben entregarse de forma masiva y digital para dar seguridad jurídica.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Vivienda y Saneamiento",
  },
  {
    id: 28,
    texto:
      'Se debe crear un "Seguro Laboral Solidario" para los trabajadores informales.',
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Empleo e Inclusión",
  },
  {
    id: 29,
    texto:
      'El Estado debe dar un "Capital Semilla" a cada recién nacido para garantizar su futura pensión.',
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Empleo e Inclusión",
  },
  {
    id: 30,
    texto:
      "Los programas sociales deben tener una fecha de caducidad obligatoria para evitar el asistencialismo.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Empleo e Inclusión",
  },
  {
    id: 31,
    texto:
      "Las compras estatales deben priorizar en un 40% a las micro y pequeñas empresas locales.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Empleo e Inclusión",
  },
  {
    id: 32,
    texto:
      "Se debe implementar un régimen laboral especial con menos beneficios para incentivar la formalización de MYPEs.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Empleo e Inclusión",
  },
  {
    id: 33,
    texto:
      "La formalización se logra mejor con incentivos tributarios que con fiscalización punitiva de la Sunat.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Empleo e Inclusión",
  },
  {
    id: 34,
    texto:
      "Se deben integrar los comedores populares en unidades productivas con visión empresarial.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Empleo e Inclusión",
  },
  {
    id: 35,
    texto:
      "Los sitios arqueológicos (huacas) deben ser gestionados por empresas privadas mediante Alianzas Público-Privadas.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Cultura",
  },
  {
    id: 36,
    texto:
      "El Estado debe subsidiar misiones comerciales para la exportación de cine, música y moda peruana.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Cultura",
  },
  {
    id: 37,
    texto:
      'Se debe crear el sello "Sabores con Origen" para proteger la gastronomía vinculada a pequeños agricultores.',
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Cultura",
  },
  {
    id: 38,
    texto:
      "Las lenguas originarias deben ser obligatorias en los trámites públicos de sus respectivas regiones.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Cultura",
  },
  {
    id: 39,
    texto:
      "Las Fuerzas Armadas deben patrullar las calles permanentemente en apoyo a la Policía Nacional.",
    eje: "Y",
    direccion: 1,
    estado: "activa",
    categoria: "Seguridad Ciudadana",
  },
  {
    id: 40,
    texto:
      "Se deben construir cárceles de máxima seguridad en la Cordillera de los Andes para criminales avezados.",
    eje: "Y",
    direccion: 1,
    estado: "activa",
    categoria: "Seguridad Ciudadana",
  },
  {
    id: 41,
    texto:
      "La investigación preliminar de los delitos debe volver a ser tarea exclusiva de la Policía, quitándole esa facultad a la Fiscalía.",
    eje: "Y",
    direccion: 1,
    estado: "activa",
    categoria: "Seguridad Ciudadana",
  },
  {
    id: 42,
    texto:
      "Los altos mandos policiales y del INPE deben someterse obligatoriamente a la prueba del polígrafo.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Seguridad Ciudadana",
  },
  {
    id: 43,
    texto:
      'Se debe crear el "Bono Anticrimen" para los investigadores que desarticulen bandas de extorsionadores.',
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Seguridad Ciudadana",
  },
  {
    id: 44,
    texto:
      "Los extranjeros que cometan cualquier delito deben ser expulsados del país de forma inmediata.",
    eje: "Y",
    direccion: 1,
    estado: "activa",
    categoria: "Seguridad Ciudadana",
  },
  {
    id: 45,
    texto:
      "El Perú debe acatar estrictamente todas las sentencias de la Corte Interamericana de Derechos Humanos.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Justicia y Derechos Humanos",
  },
  {
    id: 46,
    texto:
      "Se debe eliminar la ratificación periódica de jueces para evitar el clientelismo político.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Justicia y Derechos Humanos",
  },
  {
    id: 47,
    texto:
      "Los ciudadanos deben pagar una fianza para iniciar un juicio, reembolsable si ganan el proceso.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Justicia y Derechos Humanos",
  },
  {
    id: 48,
    texto:
      "La Inteligencia Artificial debe reemplazar a los jueces en la resolución de delitos comunes menores.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Justicia y Derechos Humanos",
  },
  {
    id: 49,
    texto:
      "El hacinamiento penal se soluciona otorgando beneficios penitenciarios y medidas alternativas a la prisión.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Justicia y Derechos Humanos",
  },
  {
    id: 50,
    texto:
      "El Perú debe priorizar su ingreso a la OCDE por encima de la integración latinoamericana.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Relaciones Exteriores y Defensa",
  },
  {
    id: 51,
    texto:
      "Se debe permitir que extranjeros posean tierras y propiedades en zonas de frontera (antes de los 50 km).",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Relaciones Exteriores y Defensa",
  },
  {
    id: 52,
    texto:
      "La diplomacia peruana debe priorizar las relaciones con el Sur Global (BRICS) sobre los bloques tradicionales.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Relaciones Exteriores y Defensa",
  },
  {
    id: 53,
    texto:
      'El Servicio Militar debe ser "dignificado" pagando un Sueldo Mínimo Vital a los reclutas.',
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Relaciones Exteriores y Defensa",
  },
  {
    id: 54,
    texto:
      "La ingeniería militar debe encargarse de las grandes obras de infraestructura en la Amazonía.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Relaciones Exteriores y Defensa",
  },
  {
    id: 55,
    texto:
      "El número de ministerios debe reducirse drásticamente (de 19 a 10) para evitar burocracia.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Economía",
  },
  {
    id: 56,
    texto:
      "El Congreso debe tener prohibido por ley crear cualquier tipo de iniciativa de gasto.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Economía",
  },
  {
    id: 57,
    texto:
      "El Estado debe cobrar impuestos a la riqueza para redistribuirlos en programas de inclusión.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Economía",
  },
  {
    id: 58,
    texto:
      'Se debe crear un "Fondo Soberano de Riqueza" con los excedentes de la minería para financiar inversión pública.',
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Economía",
  },
  {
    id: 59,
    texto:
      "Los impuestos para nuevas empresas deben ser cero durante sus primeros dos años de vida.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Economía",
  },
  {
    id: 60,
    texto:
      "Se debe eliminar el financiamiento estatal a los partidos políticos.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Economía",
  },
  {
    id: 61,
    texto:
      "El Estado debe liderar la creación de un Polo Petroquímico nacional en el sur del país.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Industrialización y Transporte",
  },
  {
    id: 62,
    texto:
      "Se debe priorizar la construcción del Tren de la Costa (Barranca-Lima-Ica) sobre más carreteras.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Industrialización y Transporte",
  },
  {
    id: 63,
    texto:
      "El transporte masivo eléctrico es más importante que facilitar la compra de autos privados.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Industrialización y Transporte",
  },
  {
    id: 64,
    texto:
      "La gestión de los aeropuertos regionales debe entregarse totalmente a concesionarios privados internacionales.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Industrialización y Transporte",
  },
  {
    id: 65,
    texto:
      "Se debe permitir la creación de Zonas Económicas Especiales (ZEE) con exoneración total de impuestos.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Industrialización y Transporte",
  },
  {
    id: 66,
    texto:
      'Se debe entregar el "Cheque Minero": dinero directo del canon a las familias en zonas de influencia.',
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Agricultura, Energía y Minas",
  },
  {
    id: 67,
    texto:
      "La minería debe ser el motor principal de la economía, eliminando trámites ambientales lentos.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Agricultura, Energía y Minas",
  },
  {
    id: 68,
    texto:
      "El Estado no debe inyectar ni un sol más de presupuesto a Petroperú y debe permitir inversión privada en ella.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Agricultura, Energía y Minas",
  },
  {
    id: 69,
    texto:
      "La agricultura familiar debe ser protegida con aranceles frente a la importación de alimentos.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Agricultura, Energía y Minas",
  },
  {
    id: 70,
    texto:
      "Se debe prohibir toda actividad extractiva en cabeceras de cuenca para proteger el agua.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Agricultura, Energía y Minas",
  },
  {
    id: 71,
    texto:
      "El gas natural debe ser el combustible obligatorio para todo el transporte público nacional.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Agricultura, Energía y Minas",
  },
  {
    id: 72,
    texto:
      "Se debe formalizar a los mineros artesanales sin exigirles estándares ambientales imposibles de cumplir.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Agricultura, Energía y Minas",
  },
  {
    id: 73,
    texto:
      "El cambio climático es la amenaza más grave y debe primar sobre cualquier proyecto extractivo.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Medio Ambiente",
  },
  {
    id: 74,
    texto:
      "El Estado debe pagar un sueldo a las comunidades que conserven sus bosques (Servicios Ecosistémicos).",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Medio Ambiente",
  },
  {
    id: 75,
    texto:
      "Se deben aplicar impuestos elevados a las empresas con alta huella de carbono.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Medio Ambiente",
  },
  {
    id: 76,
    texto:
      "La Amazonía solo se salvará si se otorgan títulos de propiedad masivos a las comunidades nativas.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Medio Ambiente",
  },
  {
    id: 77,
    texto:
      "Es preferible fomentar la reforestación comercial privada que la conservación estática del bosque.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Medio Ambiente",
  },
  {
    id: 78,
    texto:
      "El 30% de la energía del país debe provenir de fuentes renovables (solar/eólica) para el 2031.",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Medio Ambiente",
  },
  {
    id: 79,
    texto:
      "Los ciudadanos deben poder evaluar la calidad de atención de cada comisaría o posta médica mediante una app oficial.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Rendición de Cuentas",
  },
  {
    id: 80,
    texto:
      "Todas las agendas y reuniones de altos funcionarios deben publicarse en tiempo real en internet.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Rendición de Cuentas",
  },
  {
    id: 81,
    texto:
      'Se debe crear un "Viceministerio de Cumplimiento" para vigilar que los ministros cumplan sus metas.',
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Rendición de Cuentas",
  },
  {
    id: 82,
    texto:
      "Las compras del Estado deben ser monitoreadas por Inteligencia Artificial para detectar fraudes automáticamente.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Rendición de Cuentas",
  },
  {
    id: 83,
    texto:
      "Se debe convocar a referéndum para que el pueblo decida sobre reformas constitucionales importantes.",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Rendición de Cuentas",
  },
  {
    id: 84,
    texto:
      "El control gubernamental debe enfocarse en los resultados logrados y no solo en el papeleo burocrático.",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Rendición de Cuentas",
  },
  {
    id: 85,
    texto:
      "¿Prefiere que el Estado sea dueño de empresas en sectores estratégicos como el litio?",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 86,
    texto:
      "¿Cree que los subsidios a los pobres deben ser temporales y condicionados al trabajo?",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 87,
    texto:
      "¿La familia tradicional debe ser el centro de toda política social del Estado?",
    eje: "Y",
    direccion: 1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 88,
    texto:
      "¿Está de acuerdo con las cuotas de género obligatorias para cargos directivos en el Estado?",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 89,
    texto:
      "¿Cree que el orden social es más importante que la libertad de protesta en situaciones de crisis?",
    eje: "Y",
    direccion: 1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 90,
    texto:
      "¿El mercado libre es capaz de eliminar la pobreza sin ayuda del Estado?",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 91,
    texto:
      "¿Debería el Estado regular el contenido de los medios de comunicación por razones éticas?",
    eje: "Y",
    direccion: 1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 92,
    texto:
      "¿Apoya la legalización de la marihuana para uso medicinal y recreativo?",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 93,
    texto:
      "¿La religión debe tener peso en las decisiones sobre educación sexual y salud?",
    eje: "Y",
    direccion: 1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 94,
    texto:
      "¿Se debe priorizar el gasto en cultura y artes incluso en épocas de crisis económica?",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 95,
    texto:
      "¿Cree que el Perú debería ser un Estado Federal con plena autonomía para las regiones?",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 96,
    texto:
      "¿Apoya la inhabilitación perpetua para cargos públicos de cualquier sentenciado por corrupción?",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 97,
    texto:
      '¿El Estado debe garantizar un "Ingreso Mínimo Vital" a todos los ciudadanos desempleados?',
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 98,
    texto:
      "¿Se debe permitir el matrimonio entre personas del mismo sexo en el Perú?",
    eje: "Y",
    direccion: -1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 99,
    texto:
      "¿Cree que el sistema de AFP debe desaparecer y pasar a un sistema nacional público único?",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 100,
    texto:
      "¿La defensa de la soberanía nacional justifica la compra de armamento moderno de alta tecnología?",
    eje: "X",
    direccion: -1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 101,
    texto:
      "¿Se debe sancionar penalmente a las empresas de telefonía cuyas líneas se usen para extorsión?",
    eje: "Y",
    direccion: 1,
    estado: "activa",
    categoria: "Política Social",
  },
  {
    id: 102,
    texto:
      "¿Cree que la disciplina fiscal (no gastar más de lo que se tiene) es más importante que el bienestar social inmediato?",
    eje: "X",
    direccion: 1,
    estado: "activa",
    categoria: "Política Social",
  },
];

export default preguntas;

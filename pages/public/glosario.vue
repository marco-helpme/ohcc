<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      :no-results-text="'No se encontraron Datos'"
      hide-default-footer
    >
      <template v-slot:header>
        <v-text-field
          v-model="search"
          prepend-inner-icon="search"
          label="Buscar"
        />
      </template>

      <template v-slot:default="props">
        <v-row
          v-for="item in props.items"
          :key="item.titulo"
        >
          <v-col
            cols="12"
          >
            <v-card
              color="white"
              class="glossary"
            >
              <v-card-title class="title">
                {{ item.titulo }}
              </v-card-title>
              <hr style="margin-right: 50px; margin-left: 50px" class="line">
              <v-card-text class="text">
                {{ item.descripcion }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                dark
                text
                color="primary"
                class="ml-2"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer />
          <v-btn
            @click="formerPage"
            fab
            dark
            color="blue darken-3"
            class="mr-1"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            @click="nextPage"
            fab
            dark
            color="blue darken-3"
            class="ml-1"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  layout: 'principal',
  data () {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'titulo',
      keys: [
        'TITULO',
        'ACCESIBILIDAD'
      ],
      items: [
        {
          titulo: 'ACCESIBILIDAD',
          descripcion: ' Condición que deben cumplir las edificaciones (especialmente las destinadas a funciones públicas y viviendas multifamiliares), los medios de transporte y los elementos de información y señalización, de modo que se garantice un uso seguro y cómodo para todas las personas y, en especial, para quienes presentan algún grado de discapacidad física.'
        },
        {
          titulo: 'ACCIÓN CONSTRUCTIVA',
          descripcion: 'Obras o trabajos de construcción que se ejecutan en edificaciones, vías o espacios públicos.'
        },
        {
          titulo: 'ACCIÓN URBANÍSTICA',
          descripcion: 'Obras o intervenciones constructivas en las áreas urbanas en sus diversas escalas.'
        },
        {
          titulo: 'ALTURA EN FACHADA DEL EDIFICIO',
          descripcion: 'Distancia vertical medida, en su fachada, desde el nivel de la acera hasta el plano superior del techo del último de los pisos comprendidos en su altura. No se incluyen los niveles retranqueados, ni los motivos ornamentales como torres abiertas, cúpulas y pérgolas. Se expresa en plantas y en metros.'
        },
        {
          titulo: 'ALTURA MÁXIMA DEL EDIFICIO',
          descripcion: 'Distancia vertical de fachada que incluye la altura de los niveles retranqueados.'
        },
        {
          titulo: 'AMENAZA',
          descripcion: 'Fenómeno natural o creado por el hombre que trae como consecuencia peligro para la vida humana, el medio ambiente y la economía, cuando no existe algún tipo de precaución.'
        },
        {
          titulo: 'AMPLIACIÓN',
          descripcion: 'Toda nueva construcción que amplía el área del inmueble original y comunica con este mediante puerta, pasillo, escalera o cualquier otra solución constructiva.'
        },
        {
          titulo: 'ANASTILOSIS',
          descripcion: 'Se dice de la recolocación de un elemento arquitectónico que estaba fuera de su lugar.'
        },
        {
          titulo: 'ANTEPECHO',
          descripcion: 'Pretil o murete de baja altura, debajo de las ventanas, utilizado como elemento parcial de cierre y protección.'
        },
        {
          titulo: 'ANTRÓPICO',
          descripcion: 'Elementos o cambios introducidos en la naturaleza por el quehacer humano.'
        },
        {
          titulo: 'ÁREA CONSTRUIDA',
          descripcion: 'Sumatoria del área edificada en cada uno de los niveles de un inmueble. En cada nivel se considera la totalidad del área cubierta y cerrada por paredes.'
        },
        { titulo: 'ÁREA LIBRE', descripcion: 'Todo espacio descubierto (no techado), independientemente de su uso.' },
        {
          titulo: 'ÁREA OCUPADA',
          descripcion: 'Proyección en planta de la construcción techada, excluyendo sus áreas descubiertas pavimentadas.'
        },
        {
          titulo: 'AUTORIZACIÓN DE CONSTRUCCIÓN',
          descripcion: 'Permiso oficial para realizar trabajos que, siendo de poca complejidad, no requieren licencia de construcción o de obra.'
        },
        {
          titulo: 'BARBACOA',
          descripcion: 'Nombre popular con el cual se identifica el entresuelo construido artesanalmente en el interior de un local de puntal alto.'
        },
        {
          titulo: 'BARRERA ARQUITECTÓNICA',
          descripcion: 'Impedimento físico-constructivo que interfiere o dificulta la accesibilidad y circulación, en especial a las personas discapacitadas y a los adultos mayores.'
        },
        {
          titulo: 'BASAMENTO',
          descripcion: 'En arquitectura, cuerpo situado debajo del fuste de la columna que comprende la base y el pedestal, asiento sobre el cual descansa la columna o estatua, o eventualmente los elementos que funcionan como zapata. En urbanismo, alegoría para señalar bases y cuerpos bajos de edificios donde se ubican equipamiento y servicios u otras funciones diferenciadas arquitectónica y urbanísticamente.'
        },
        {
          titulo: 'CALIFICACIÓN DEL SUELO',
          descripcion: 'Utilización genérica a la que el plan de ordenamiento territorial y urbano destina un área determinada del territorio.'
        },
        {
          titulo: 'CALLE DE INTERÉS',
          descripcion: 'Vía o tramo jerarquizado por hechos acontecidos en ellos, o por valor histórico, comercial, cívico o público de instalaciones allí situadas.'
        },
        {
          titulo: 'CALZADA',
          descripcion: 'Parte de la vía utilizada para la circulación de vehículos por una o más sendas. Una vía puede comprender varias calzadas separadas entre sí por una franja divisoria. En la terminología del urbanismo tradicional cubano se usa como acepción de gran avenida, franqueada por portales corridos.'
        },
        { titulo: 'CARRERAS', descripcion: 'En el sentido de elemento estructural, viga de cerramento.' },
        {
          titulo: 'CATEGORÍAS DE USO',
          descripcion: 'Determinaciones para normar las funciones de cada uno de los edificios o zonas urbanas, se aplican con diferente carácter: a) Prohibido/a: uso no permitido o vedado, para impedirlo. b) Restringido/a: uso limitado o reservado, para hacerlo restrictivo. c) Permisible: uso admitido o tolerado, para aceptarlo en algunos casos, según proyecto. d) Preferente: uso seleccionado o preferido sobre otro, para favorecerlo.'
        },
        {
          titulo: 'CATEGORÍAS DE INTERVENCIÓN',
          descripcion: 'Acciones constructivas de diferentes características que se aplican a edificios o zonas urbanas.'
        },
        {
          titulo: 'CERCADOS',
          descripcion: 'Cerca, valla o muro circundante que delimita parcelas de terreno con construcciones o sin ellas.'
        },
        {
          titulo: 'CERTIFICACIÓN DE HABITABLE - UTILIZABLE',
          descripcion: 'Documento emitido, una vez concluidas totalmente las acciones constructivas amparadas en la licencia de obra, que demuestra su realización según lo aprobado y como constancia para los trámites legales de ocupación y titularidad inmobiliaria u otros procedentes, tanto para viviendas como para otras edificaciones, respectivamente.'
        },
        {
          titulo: 'CHAFLÁN',
          descripcion: 'Parte de muro en esquina de una construcción que une dos paramentos o superficies planas que forman ángulo.'
        },
        {
          titulo: 'CODESARROLLO',
          descripcion: 'Acción inversionista de desarrollo cooperado que destina un porcentaje del presupuesto de un proyecto del sector terciario a beneficio de un proyecto del sector público.'
        },
        {
          titulo: 'COEFICIENTE DE OCUPACIÓN DEL SUELO (COS)',
          descripcion: 'Resultado de dividir la proyección del área edificada u ocupada en metros cuadrados, entre el área total de la parcela. Se expresa en por cientos.'
        },
        {
          titulo: 'COEFICIENTE DE UTILIZACIÓN DEL SUELO (CUS)',
          descripcion: 'Resultado de dividir la totalidad del área construida (sumatoria de cada uno de los niveles) entre el área total de la parcela cuya equivalencia es metros cuadrados de techo por metros cuadrados de suelo. También se le conoce como edificabilidad.'
        },
        {
          titulo: 'COMPATIBILIZACIÓN DE INVERSIONES',
          descripcion: 'Comprende el conjunto de actividades efectuadas a partir de su análisis integral inicial hasta lograr la materialización de los requerimientos que deben tenerse en cuenta en la ejecución de inversiones, adquisición y producción de equipos, prestación de servicios y realización de otras producciones, estudios e investigaciones científico-técnicas. Este conjunto de actividades se realiza de forma coordinada entre el inversionista y los órganos de consulta obligatoria para la defensa.'
        },
        {
          titulo: 'COMPLETAMIENTO',
          descripcion: 'Intervención constructiva en zonas con aceptable estructura urbana, redes y servicios que cuentan con áreas libres e infraestructura aprovechables urbanísticamente.'
        },
        {
          titulo: 'CONJUNTOS Y FOCOS DE CENTRALIDAD',
          descripcion: 'Sitios urbanos que por sus características físicas y funcionales generan animación.'
        },
        {
          titulo: 'CONSERVACIÓN',
          descripcion: 'Conjunto de categorías de intervención que se aplican a una edificación, vías públicas, redes técnicas o espacios urbanos, para preservar sus valores patrimoniales.'
        },
        {
          titulo: 'CONSERVACIÓN INTEGRAL',
          descripcion: 'Consistirá en la recuperación de los valores patrimoniales de una zona mediante la aplicación de las diferentes categorías de intervención arquitectónica a los edificios que la componen y sus espacios urbanos, según cada caso, se conservarán al máximo los valores tangibles e intangibles de la misma, con la participación de diferentes disciplinas. Se aplicará en zonas de altos valores urbanos y arquitectónicos.'
        },
        {
          titulo: 'CONSOLIDACIÓN',
          descripcion: 'Consistirá en acciones constructivas necesarias para conservar la estabilidad estructural del edificio, de una de sus partes o de elementos decorativos que lo integran. Se aplicará en edificios en peligro de perderse completa o parcialmente, hasta que puedan restaurarse o como parte del proceso de restauración.'
        },
        { titulo: 'CONSTRUCCIÓN', descripcion: 'Proceso de ejecución de una obra de diversa escala y naturaleza.' },
        {
          titulo: 'CORREDOR',
          descripcion: 'Vía de gran circulación peatonal, flanqueada por instalaciones de interés comercial, turístico o de otra índole que vincula zonas o núcleos de interés urbano.'
        },
        { titulo: 'CORREDORES COMERCIALES', descripcion: 'Vías urbanas definidas por su carácter terciario.' },
        { titulo: 'CRUJÍA', descripcion: 'Espacio comprendido entre dos muros de carga de una edificación.' },
        { titulo: 'CUADRA', descripcion: 'Frente de calle comprendido entre dos esquinas de una manzana.' },
        {
          titulo: 'CUADRÍCULA URBANA',
          descripcion: 'Trazado urbano tradicional conformado por calles que se cruzan en ángulos, definiendo esquinas y espacios o polígonos cerrados o manzanas.'
        },
        {
          titulo: 'CUARTERÍA',
          descripcion: 'Casa de origen unifamiliar transformada mediante un proceso de subdivisión especulativa, y ocupada por múltiples familias que comparten algunas de sus áreas y servicios.'
        },
        {
          titulo: 'CUARTO O HABITACIÓN',
          descripcion: 'En una vivienda, el local destinado a dormitorio. En ciudadelas y cuarterías constituye la vivienda.'
        },
        {
          titulo: 'DEMOLICIÓN',
          descripcion: 'Consiste en la eliminación total o parcial de un edificio debido a que su alto grado de deterioro lo hace irrecuperable.'
        },
        {
          titulo: 'DEMOLICIÓN URBANA',
          descripcion: 'Consiste en la eliminación de una zona urbana debido a que su gran descualificación y estado de deterioro la hacen irrecuperable.'
        },
        {
          titulo: 'DERRUMBE',
          descripcion: 'Caída de partes o todos los componentes de una estructura en una edificación producto de la acción combinada de diversos tipos de desperfectos o sobrecargas actuantes sobre sus más importantes elementos por errores de proyecto o constructivos.'
        },
        {
          titulo: 'DESASTRE',
          descripcion: 'Término que permite definir el mismo como un acontecimiento o serie de sucesos que ocasionan víctimas y/o daños o pérdidas de la propiedad, infraestructura, servicios esenciales o medios de sustento a escala o dimensión más allá de la capacidad normal de las comunidades afectadas para dar abasto sin ayuda. Los desastres con frecuencia se categorizan de acuerdo a las causas que se perciben o a la velocidad del impacto.'
        },
        {
          titulo: 'DESASTRE NATURAL',
          descripcion: 'Suceso identificable en el tiempo y en el espacio, no atribuible a la mano del hombre, por el cual una instalación o comunidad, zona o territorio sufre daños de magnitud de sus medios básicos, la producción y los servicios con afectaciones a la estructura social que impiden el cumplimiento de sus actividades esenciales. Ejemplos: ciclones tropicales, intensas lluvias, tormentas locales severas (tornados, trombas marinas, granizos y vientos fuertes superiores a 95 km/h), penetraciones del mar, sismos, intensas sequías, incendios en áreas rurales.'
        },
        {
          titulo: 'DESASTRE TECNOLÓGICO',
          descripcion: 'Suceso que interrumpe la vida normal con alerta previa o no, que causa o amenaza con originar muertos y heridos o necesidad de evacuación de un número importante de personas, produce graves afectaciones económicas y ocasiona la contaminación de objetos o territorios, la cual requiriere acciones de emergencia mediante procedimientos normales o de medidas especiales. Ejemplos: accidentes catastróficos del transporte aéreo y terrestre, accidentes con sustancias peligrosas, explosiones de gran magnitud, derrame de hidrocarburos, incendios de grandes proporciones en instalaciones industriales y edificaciones sociales, derrumbe en edificaciones, ruptura de obras hidráulicas.'
        },
        {
          titulo: 'DESASTRE SANITARIO',
          descripcion: 'Graves epidemias y pandemias. Ejemplos: cólera, enfermedades diarreicas agudas, dengue, A (H1N1), enfermedades epizoóticas, entre otros.'
        },
        {
          titulo: 'DIVISIÓN (DESGLOSE)',
          descripcion: 'Acción constructiva mediante la cual se obtienen dos o más viviendas a partir de la original.'
        },
        {
          titulo: 'EJES DE INTERCONEXIÓN ',
          descripcion: 'Vías de enlace entre los diferentes focos o sitios de centralidad (plazas, paseos, pequeñas zonas revitalizadas) o algunos de estos con los accesos y salidas del centro histórico.'
        },
        {
          titulo: 'ELEMENTOS DECORATIVOS',
          descripcion: 'Esculturas, zócalos, cenefas, fuentes, portadas, copas, portafaroles, escudos u otros elementos tradicionales en la arquitectura de la zona.'
        },
        {
          titulo: 'ELEMENTOS DE PROTECCIÓN',
          descripcion: 'Unidades de carpintería, herrería, albañilería u otros tradicionales en la arquitectura de la zona (guardacantones, guardapolvos, barandas, etc.), que cumplen una función protectora de espacios y áreas edificadas.'
        },
        {
          titulo: 'ELEMENTOS COMPOSITIVOS',
          descripcion: 'Muros, vanos, balcones, loggias, aleros, pretiles, cornisas u otros.'
        },
        {
          titulo: 'ENTREPISO',
          descripcion: 'Estructura permanente –plana y horizontal– de las edificaciones, que divide dos plantas habitables.'
        },
        {
          titulo: 'ENTRESUELO',
          descripcion: 'Planta habitable entre el piso bajo (o la planta baja) y el principal de una edificación colonial.'
        },
        {
          titulo: 'EQUIPAMIENTO PRIMARIO',
          descripcion: 'Instalaciones de servicio, generalmente vinculadas a sectores residenciales o barrios por la frecuencia de su utilización. Incluye unidades de comercio minorista, instalaciones escolares y de salud y áreas libres para el uso recreativo o deportivo.'
        },
        {
          titulo: 'ESPACIO PÚBLICO',
          descripcion: 'Espacios libres constituidos por plazas, plazuelas (y otros que resultan del ensanche de las vías), parques, calles y demás áreas de circulación, así como por excepción las zonas tributarias de las instalaciones públicas y de servicios.'
        },
        {
          titulo: 'ESPACIO PÚBLICO HISTÓRICO',
          descripcion: 'Plazas, plazuelas, paseos y parques heredados del pasado, que constituyeron focos de animación de la ciudad por su actividad social y económica y que han sido, al mismo tiempo, elementos integradores de la imagen urbana.'
        },
        {
          titulo: 'ESPACIOS PRINCIPALES',
          descripcion: 'En la arquitectura doméstica se refiere a zaguanes, vestíbulos, salones y comedores, galerías y patio principal.'
        },
        {
          titulo: 'ESPACIOS SECUNDARIOS',
          descripcion: 'En la arquitectura doméstica tradicional se refiere a traspatios, dormitorios, cocinas y baños.'
        },
        {
          titulo: 'ESTRATIFICACIÓN HISTÓRICA',
          descripcion: 'Proceso mediante el cual el inmueble incorpora, por sustitución o adición, nuevas soluciones técnico-constructivas, otras plantas o niveles, materiales y componentes arquitectónicos, expresiones formales más contemporáneas, etc.'
        },
        {
          titulo: 'FALSO HISTÓRICO',
          descripcion: 'Se dice de una obra realizada en la actualidad que imita estilos arquitectónicos antiguos.'
        },
        { titulo: 'FRENTE DE CALLE', descripcion: 'Conjunto de fachadas que integran una calle urbana.' },
        {
          titulo: 'FUNCIÓN ADMINISTRACIÓN',
          descripcion: 'La actividad de una o varias oficinas en cuanto a gestionar, controlar y ofrecer servicios de carácter público, empresarial y privado de tipo: gubernamental (a diversos niveles), fi nancieros, de negocios varios, etc.'
        },
        {
          titulo: 'FUNCIÓN ALMACENES Y TALLERES',
          descripcion: 'Tipo de actividad de uno o más espacios construidos o al aire libre edificados para guardar y proteger bienes, partes y productos terminados y a elaborar o reparar partes o productos para la industria, la construcción, la cultura, etc.'
        },
        {
          titulo: 'FUNCIÓN ALOJAMIENTO',
          descripcion: 'Aquella que se desarrolla en uno o más espacios construidos destinados a albergar a visitantes temporales y donde estos reciben servicios de hotelería.'
        },
        {
          titulo: 'FUNCIÓN COMERCIO',
          descripcion: 'Aquella que se desarrolla en uno o más espacios construidos o al aire libre dedicados a la venta de productos alimenticios, industriales, culturales o de otro tipo.'
        },
        {
          titulo: 'FUNCIÓN CULTURA',
          descripcion: 'Comprende en mayor medida actividades relacionadas con el arte, la literatura, la artesanía y otras manifestaciones artísticas.'
        },
        {
          titulo: 'FUNCIÓN DEPORTE',
          descripcion: 'Comprende la organización y desarrollo de todo tipo de actividades deportivas al aire libre o bajo techo realizadas o no en instalaciones diseñadas con ese fin.'
        },
        {
          titulo: 'FUNCIÓN EDUCACIÓN',
          descripcion: 'Todo tipo de enseñanza impartida en horario diurno o nocturno, a tiempo completo o parcial, para cualquier nivel o profesión. La mayor parte de los establecimientos representa un sistema de enseñanza escolar progresiva para niños y jóvenes, que se extiende desde la enseñanza prescolar hasta el nivel universitario.'
        },
        {
          titulo: 'FUNCIONES ESPECIALES',
          descripcion: 'Aquellas cuyo dominio público queda supeditado a la decisión de las autoridades competentes en cada caso.'
        },
        {
          titulo: 'FUNCIÓN ESTACIONAMIENTO',
          descripcion: 'Actividad de aparcamiento de todo tipo de vehículos en la faja vial o fuera de ella (techados o no), como garajes en el cuerpo de edificios, soterrados en el espacio público, parcelas (techadas o no), etc.'
        },
        {
          titulo: 'FUNCIÓN GASTRONOMÍA',
          descripcion: 'La que se desarrolla en uno o más espacios construidos, o al aire libre, dedicados a prestar servicios de expendio de comidas y bebidas ligeras, restaurantes especializados, cafés y otras.'
        },
        {
          titulo: 'FUNCIÓN RELIGIOSA',
          descripcion: 'Cualquier tipo de culto religioso, ya sean misas, bautizos, festividades u otra diversidad de actividades relacionadas.'
        },
        {
          titulo: 'FUNCIÓN RECREACIÓN',
          descripcion: 'Actividades de entretenimiento propias de salones de baile, discotecas, parques de diversión y espectáculos.'
        },
        {
          titulo: 'FUNCIÓN SALUD',
          descripcion: 'Actividad en centros de atención a la salud pública como policlínicas, consultorios del médico de la familia, clínicas estomatológicas y otras instituciones sanitarias con servicio de alojamiento o sin él.'
        },
        {
          titulo: 'FUNCIÓN SERVICIOS BÁSICOS',
          descripcion: 'Servicios que recibe la comunidad en su territorio (educación, atención primaria de salud, comercio de alimentos, gastronomía, servicios generales, comunales, cultura y deportes), gestionados por las direcciones sectoriales del gobierno municipal.'
        },
        { titulo: 'FUNCIÓN DE SERVICIOS MEDIOS', descripcion: 'Servicios de nivel intermedio en el centro de ciudad.' },
        { titulo: 'FUNCIÓN SERVICIOS SUPERIORES', descripcion: 'Servicios de nivel metropolitano.' },
        {
          titulo: 'FUNCIÓN SERVICIOS AVANZADOS',
          descripcion: 'Actividades fundamentalmente de diseño informacional, de software, y desfile de modas, edición de audiovisuales u otras para el desarrollo de las nuevas tecnologías de la comunicación.'
        },
        {
          titulo: 'FUNCIÓN RESIDENCIAL DE ARRENDAMIENTO',
          descripcion: 'Actividades relacionadas con cualquier alternativa de alojamiento en alquiler.'
        },
        {
          titulo: 'FUNCIÓN RESIDENCIAL ESPECIAL',
          descripcion: 'Instalación destinada al alojamiento de determinados grupos sociales, por lo general vulnerables (ancianos, niños, discapacitados).'
        },
        {
          titulo: 'FUNCIÓN RESIDENCIAL MULTIFAMILIAR',
          descripcion: 'Casa diseñada expresamente para alojamiento de un grupo de familias, en cada uno de sus niveles.'
        },
        {
          titulo: 'FUNCIÓN RESIDENCIAL UNIFAMILIAR',
          descripcion: 'Se aplica en las dos situaciones siguientes:– Casa diseñada para una sola familia. Puede ocupar una planta o más de una en edificios de varios niveles. – Casa (o dos casas gemelas) que, en un edificio de dos o más plantas, ocupan cada uno de sus niveles.'
        },
        {
          titulo: 'GRADO DE PROTECCIÓN',
          descripcion: 'Categoría establecida por la Ley de Monumentos para proteger y preservar especialmente las edificaciones según sus valores patrimoniales intrínsecos. La legislación establecida en el Decreto no. 55 de 1979 incluye cuatro grados de protección, según el grado de conservación de la edificación y otros factores que determinan el interés social y cultural del inmueble.'
        },
        {
          titulo: 'HABITABLE',
          descripcion: 'Condición que se otorga a una vivienda o edificación que cumple los requisitos técnico-constructivos mínimos exigidos en cuanto a área, ventilación, iluminación, accesibilidad, privacidad e higiene sanitaria.'
        },
        {
          titulo: 'HIDRANTE',
          descripcion: 'Material de protección contra incendios conectado a una red de suministro destinado a proveer agua en caso de incendio en todas las fases del mismo. Los hidrantes estarán formados por el cuerpo, mecanismo de cierre, mecanismo de accionamiento y bridas de conexión. Destinado para el uso exclusivo del Cuerpo de Bomberos u otro personal debidamente entrenado.'
        },
        {
          titulo: 'HITO',
          descripcion: 'Se usa también en urbanismo para designar aquellas edificaciones o elementos naturales que se destacan en las ciudades o en partes de estas.'
        },
        {
          titulo: 'INFRAESTRUCTURA',
          descripcion: 'Conjunto de elementos estructurales encargados de transmitir las acciones al terreno. Todo el conjunto de pilas (columnas intermedias) y estribos (muros de contención en los costados) que soportan a la superestructura.'
        },
        {
          titulo: 'INFRAESTRUCTURA TÉCNICA',
          descripcion: 'Conjunto de redes técnicas urbanas: acueducto, alcantarillado, electricidad, comunicaciones, etc.'
        },
        {
          titulo: 'IMAGEN URBANA',
          descripcion: 'Expresión y contexto resultantes de la integración coordinada de los componentes urbanos más los elementos y aspectos socioculturales que la caracterizan.'
        },
        {
          titulo: 'INHABITABLE',
          descripcion: ';Se refiere al estado técnico del inmueble, cuando  este presenta lesiones estructurales de envergadura por en-cima del 20 %, tales como fallas en vigas, columnas, cubiertas y muros, alto deterioro de entrepisos, grietas, desplomes parciales y hundimiento de pisos, condiciones que determinan peligrosidad y representan riesgos para la vida.'
        },
        {
          titulo: 'INTEGRACIÓN',
          descripcion: 'Consistirá en acciones constructivas encaminadas a la introducción de partes nuevas o faltantes, ampliaciones o la construcción de un edificio de nueva planta en parcelas libres, que persigue el completamiento de un bien arquitectónico-artístico, dotar de mayor área al mismo o crear un nuevo edificio. No se trata de reconstrucción en estilo ni de completamiento neutro que nada aporta, se refiere a la inserción de nueva obra con una actitud crítico-creativa.'
        },
        {
          titulo: 'INTEGRACIÓN URBANA',
          descripcion: 'Consistirá en la construcción de conjuntos de edificios de nueva planta o ampliaciones que se inserten arquitectónica y urbanísticamente para lograr coherencia con el entorno existente. Se aplicará en zonas muy degradadas previo derrumbe o demolición, o en parcelas vacías que pue dan fusionarse, solo cuando esté ampliamente justificada.'
        },
        {
          titulo: 'INUNDACIÓN',
          descripcion: 'Efecto generado por el flujo de una corriente cuando sobrepasa las condiciones normales y alcanza niveles extraordinarios que no pueden ser controlados en los vasos naturales o artificiales que la contienen, lo cual deriva ordinariamente los daños que en aguas desbordadas ocasiona en zonas urbanas, tierras productivas y en general en valles y sitios bajos. Atendiendo a los lugares donde se producen las inundaciones pueden ser: costeras, fluviales, lacustres y pluviales según se registren en las costas marítimas, en las zonas aledañas a las márgenes de los ríos y lagos y en terrenos de topografía llana a causa de lluvias excesivas y a la inexistencia o defecto del sistema de drenaje respectivamente. Los niveles de inundación dependen no solo de las precipitaciones, sino del grado de saturación del suelo y los días de lluvia.'
        },
        {
          titulo: 'JARDÍN',
          descripcion: 'Espacio descubierto, tratado con áreas verdes. En el centro histórico se presentan en la zona de La Vigía y La Caridad y como tratamiento generalizado de parcelas completas que perdieron sus edificaciones.'
        },
        {
          titulo: 'LIBERACIÓN',
          descripcion: 'Acción de retirar elementos arquitectónicos, escultóricos, pictóricos o de acabado que, carentes de mérito artístico o histórico, fueron agregados en el transcurso del tiempo a un bieninmueble y cuya presencia representa daño estructural funcional o resulta en detrimento de su unidad formal.'
        },
        {
          titulo: 'LICENCIA DE CONSTRUCCIÓN (LICENCIA DE OBRA)',
          descripcion: 'Documento técnico-legal o permiso oficial emitido para la realización de las obras constructivas correspondientes donde se señalan requisitos y condicionales que obligatoriamente deben cumplirse.'
        },
        {
          titulo: 'LÍMITE DE PROPIEDAD',
          descripcion: 'Lindero o línea que confina físicamente la titularidad o posesión de un terreno o parcela.'
        },
        {
          titulo: 'LÍNEA DE CONSTRUCCIÓN (LÍNEA DE EDIFICACIÓN)',
          descripcion: 'Alineación constructiva en parcelas urbanas construidas en el perímetro de la manzana y que incluye la denominación de línea de fachada o línea frontal de edificaciones.'
        },
        {
          titulo: 'LOCAL AUXILIAR (EN VIVIENDAS)',
          descripcion: 'Locales destinados a servicios o circulación interior, tales como cocina, servicio sanitario, clóset o alacena, pasillos cubiertos, portal, terraza, patios de servicio cubiertos y balcón.'
        },
        {
          titulo: 'LOCAL HABITABLE (PRINCIPAL)',
          descripcion: 'El que se destina a las funciones principales de la vivienda, básicamente estar, comer y dormir, así como locales de uso prolongado como cuartos de estudio, juego o trabajo.'
        },
        {
          titulo: 'LOGGIA',
          descripcion: 'Crujía abierta hacia la calle a modo de galería que aparece sobre la primera crujía o el portal público de la planta baja, coincide con sus dimensiones.'
        },
        {
          titulo: 'MANTENIMIENTO',
          descripcion: 'Consistirá en reparaciones menores, pintura y/o limpieza según el caso. Se aplicará en sus diferentes grados en edificios que posean un bajo grado de deterioro y en el que no sea necesario otro tipo de intervención más profunda.'
        },
        {
          titulo: 'MANTENIMINETO URBANO',
          descripcion: 'Consistirá en reparaciones menores, pintura y/o limpieza según el caso. Se aplicará en sus diferentes grados en zonas que posean un bajo grado de deterioro y en las que no sea necesario otro tipo de intervención más profunda.'
        },
        {
          titulo: 'MANZANA URBANA',
          descripcion: 'Célula o elemento esencial de la estructura o cuadrícula urbana,  conformada por polígonos cerrados, generalmente cuadriláteros y definidos por el trazado vial, que convergen en las esquinas. Las manzanas, a su vez, están constituidas por elementos menores, que son las parcelas urbanas (lotes, fincas urbanas o parcelas) en las cuales se construyen las edificaciones.'
        },
        {
          titulo: 'MANZANA COMPACTA',
          descripcion: 'Manzana que posee continuidad en las fachadas en todo su perímetro mediante medianerías y solo deja un espacio interior libre, coincidentes con los traspatios, de un 15 % del área total.'
        },
        {
          titulo: 'MANZANA SEMICOMPACTA',
          descripcion: 'Manzana que posee discontinuidad en las fachadas, en su perímetro, por la utilización de pasillos laterales que, junto a los traspatios, dejan libre hasta un 30 % del área total.'
        },
        { titulo: 'MANZANA DE LOTE ÚNICO', descripcion: 'Manzana que solo contiene una parcela o lote.' },
        {
          titulo: 'MARQUESINA',
          descripcion: 'Saliente de un edificio destinado a proteger y jerarquizar la entrada principal del inmueble.'
        },
        {
          titulo: 'MEDIANERÍA',
          descripcion: 'Condición del muro o pared que separa dos propiedades contiguas y pertenece mancomunadamente a los dueños de ambas. Pueden ser: paredes medianeras, contiguas o inmediatas.'
        },
        {
          titulo: 'MEDIO AMBIENTE URBANO',
          descripcion: 'Conjunto de circunstancias ecológicas, culturales y antrópicas en que se desenvuelve la ciudadanía en el contexto urbano.'
        },
        {
          titulo: 'MEZZANINE',
          descripcion: 'Entrepiso del interior de un establecimiento (de puntal alto) industrial, comercial o de servicio que se construye guardando distancia de la línea de fachada, de modo que se logra un mayor aprovechamiento del puntal y se favorece la vinculación espacial y funcional entre las áreas resultantes.'
        },
        {
          titulo: 'MICROLOCALIZACIÓN',
          descripcion: 'Documento oficial expedido por Planificación Física para la localización de inversiones de los organismos y entidades.'
        },
        {
          titulo: 'MOBILIARIO URBANO',
          descripcion: 'Conjunto de elementos utilitarios, ornamentales o conmemorativos situados en los espacios públicos y en la vía pública, tales como: luminarias, farolas, bancos, apeaderos, fuentes, esculturas, bustos, estatuas, jardineras, cestos, señalizaciones, entre otros.'
        },
        {
          titulo: 'MONUMENTO NACIONAL',
          descripcion: 'Todo centro histórico urbano y toda construcción, sitio u objeto que por su carácter excepcional merezca ser conservado y que, como tal, sea declarado por la Comisión Nacional de Monumentos de acuerdo con lo dispuesto en el Decreto no. 55 del Comité Ejecutivo del Consejo de Ministros de 29 de noviembre de 1979: Reglamento para la ejecución de la Ley no. 2 de Monumentos Nacionales y Locales del 4 de agosto de 1977, e inscripto en el Registro de los Monumentos Nacionales y Locales.'
        },
        {
          titulo: 'MORFOLOGÍA URBANA',
          descripcion: 'Expresión formal del urbanismo. Resulta de la integración del tejido y el trazado urbano condicionada, entre otros elementos, por la topografía, la forma y tamaño de manzanas y parcelas, el modo de asociación de las edificaciones al interior de la manzana y su volumetría, según las particularidades del trazado viario –sección vial, regularidad, pendientes, etc.'
        },
        {
          titulo: 'OBRA NUEVA / NUEVA EDIFICACIÓN',
          descripcion: 'Construcción de nueva planta de un inmueble en un solar yermo o parcela libre.'
        },
        { titulo: 'OBRA TRAVIESA', descripcion: 'Crujía intermedia entre dos patios.' },
        {
          titulo: 'PARCELA',
          descripcion: 'Porción pequeña de terreno en zona urbana. En el catastro cada uno de los terrenos de un propietario es llamado lote (finca urbana). Por regla general son los espacios o unidades de parcelación que integran las manzanas.'
        },
        { titulo: 'PARCELA LIBRE', descripcion: 'Toda parcela o lote sin edificación, independientemente de su uso.' },
        {
          titulo: 'PARCELA COMPACTA',
          descripcion: 'Porción de terreno urbano en la cual se respeta una mínima superficie descubierta del 15 % del área total. El área descubierta puede estar compuesta por patios, patinejos, pasillos laterales y de fondo.'
        },
        {
          titulo: 'PARCELA SEMICOMPACTA',
          descripcion: 'Porción de terreno urbano que utiliza para su construcción una ocupación media y respeta una superficie descubierta mínima del 30 % del área total. El área descubierta puede estar compuesta por patios, patinejos, pasillos laterales y de fondo.'
        },
        { titulo: 'PARED DE CERRADURA', descripcion: 'Pared de cierre.' },
        {
          titulo: 'PAREDES MEDIANERAS CONTIGUAS',
          descripcion: 'La que toca el límite del terreno vecino o deja un espacio hasta cierto límite. Es una de las formas que adquiere la medianería.'
        },
        {
          titulo: 'PARQUEO',
          descripcion: 'Espacio descubierto o con cubierta ligera ubicado en parcelas libres, a borde de contén y a todo lo largo de una cuadra o calle, o en una sección prevista para el estacionamiento público de vehículos.'
        },
        {
          titulo: 'PASAJE',
          descripcion: 'Pasillo público peatonal que da acceso a locales comerciales en planta baja, y permite o no cruzar la manzana y pasar a los patios interiores de las edificaciones.'
        },
        {
          titulo: 'PASILLOS LATERALES Y DE FONDO',
          descripcion: 'Espacios sanitarios de protección y circulación entre el límite, lindero o cercado de la parcela de terreno y los bordes o paredes de la edificación interior.'
        },
        {
          titulo: 'PATINEJO',
          descripcion: 'Pequeño espacio en el interior de las edificaciones cerrado con paredes o galerías, descubierto o semidescubierto que cumple funciones de ventilación, iluminación, confort térmico y de servicio a la vivienda.'
        },
        {
          titulo: 'PASEO',
          descripcion: 'Espacio público urbano de forma longitudinal concebido como sitio de circulación y esparcimiento, con vegetación y/o mobiliario urbano.'
        },
        {
          titulo: 'PLANO CATASTRAL',
          descripcion: 'Documento oficial que registra la codificación de las parcelas y manzanas de un territorio urbanizado.'
        },
        {
          titulo: 'PLAZAS',
          descripcion: 'Espacios públicos principales de la ciudad colonial que integran su sistema de centralidades. Pueden tener un carácter principal o secundario según su jerarquía.'
        },
        {
          titulo: 'PLAZUELAS',
          descripcion: 'Sistema de espacios públicos de la ciudad colonial que por lo general constituyen encuentros viales.'
        },
        {
          titulo: 'PONCHES EN ACERAS',
          descripcion: 'Perforaciones en aceras para la colocación de árboles, usadas en vías principales, paseos y alamedas, generalmente equidistantes. '
        },
        {
          titulo: 'PORTAL PÚBLICO',
          descripcion: 'Espacio abierto a las vías a través de un sistema de arquerías sobre columnas o columnar arquitrabado que posibilita el libre recorrido peatonal por las cuadras.'
        },
        {
          titulo: 'PORTAL PRIVADO',
          descripcion: 'Espacio abierto a la calle, situado en la parte frontal de las edificaciones y del uso exclusivo de estas.'
        },
        {
          titulo: 'PRESERVACIÓN PATRIMONIAL',
          descripcion: 'Acción y efecto de defender, amparar y proteger de daños y peligros los bienes inmobiliarios patrimoniales.'
        },
        {
          titulo: 'PUNTAL',
          descripcion: 'Altura o espacio entre los niveles de piso terminado correspondientes a dos plantas consecutivas, a diferencia del puntal libre que es la altura entre el piso y el techo de un mismo local o edificación.'
        },
        {
          titulo: 'QUICIO O GRADA',
          descripcion: 'Uno o más escalones que salvan un desnivel, principalmente en la entrada de los edificios.'
        },
        {
          titulo: 'REANIMACIÓN URBANA',
          descripcion: 'Consistirá en el mejoramiento de la imagen urbana de una zona a través de acciones ligeras y reversibles como pintura, dotación de gráfica urbana, mobiliario urbano, área verde, etc. Se aplicará en zonas urbanas descualificadas que se desean mejorar provisionalmente hasta que puedan intervenirse.'
        },
        {
          titulo: 'RECONSTRUCCIÓN',
          descripcion: 'Acción constructiva de obra nueva en edificaciones deterioradas o desaparecidas total o parcialmente, con el objetivo de lograr su recuperación y capacidad de uso.'
        },
        {
          titulo: 'RECONSTRUCCIÓN URBANA',
          descripcion: 'Consistirá en la reedificación parcial de una zona para la recuperación de su integridad. De aplicación para casos ampliamente justificados.'
        },
        {
          titulo: 'REHABILITACIÓN',
          descripcion: 'Acción constructiva encaminada a la recuperación de los valores patrimoniales tangibles e intangibles. Es la acción ejercida para que un edificio mantenga su función u otra diferente que implique transformaciones mínimas. Aplicable en edificios grado de protección 1,2,3.'
        },
        {
          titulo: 'REHABILITACIÓN URBANA',
          descripcion: 'Consiste en la recuperación de los valores patrimoniales de una zona para mantener su funcionamiento tradicional mediante la aplicación de las diferentes categorías de intervención arquitectónica a los edificios que la componen y sus espacios urbanos, según el caso, conservando los valores tangibles e intangibles con la participación de diferentes disciplinas. Aplicable en zonas de altos valores urbanos y arquitectónicos.'
        },
        {
          titulo: 'REINTEGRACIÓN',
          descripcion: 'Consiste en acciones constructivas encaminadas a la recuperación de los elementos compositivos básicos perdidos, integrando el edificio nuevamente al entorno existente. Aplicable en edificios muy descualificados por transformaciones, principalmente en la fachada, y de cualquier grado de protección.'
        },
        {
          titulo: 'REINTEGRACIÓN URBANA',
          descripcion: 'Consiste en la recuperación de un conjunto de edificios muy degradados debido a la pérdida de los elementos compositivos básicos, integrándolos arquitectónica y urbanísticamente en coherencia con el entorno.'
        },
        {
          titulo: 'RENOVACIÓN URBANA O REFUNCIONALIZACIÓN',
          descripcion: 'Consiste en la recuperación de los valores patrimoniales de una zona para cambiar su funcionamiento tradicional, mediante la aplicación de las diferentes categorías de intervención arquitectónica a los edificios y sus espacios urbanos con la implicación de cambios de uso, según el caso, conservando los valores tangibles e intangibles, a través de diferentes disciplinas. Aplicable en zonas de valores urbanos y arquitectónicos altos y medios.'
        },
        {
          titulo: 'REMODELACIÓN',
          descripcion: 'Consiste en acciones constructivas encaminadas a la recuperación de los valores patrimoniales tangibles e intangibles conservados en el inmueble. Es la acción de transformación de la estructura espacial de un inmueble, que no posee o ha perdido sus valores, con el fin de ponerlo en uso nuevamente. Aplicable a edificios grado de protección 3 y 4.'
        },
        {
          titulo: 'REMODELACIÓN URBANA',
          descripcion: 'Consiste en la modificación de la estructura urbana de una zona para cambiar sus funciones y conformación, aplicando las diferentes categorías de intervención arquitectónica a los edificios y sus espacios urbanos, según el caso, conservando los valores tangibles e intangibles. Aplicable en zonas de valores urbanos y arquitectónicos bajos y cuando esté ampliamente justificada.'
        },
        {
          titulo: 'REPARACIÓN MAYOR',
          descripcion: 'Acciones constructivas de consolidación de elementos portantes y/o cubiertas, así como de redes principales de la edificación.'
        },
        {
          titulo: 'REPARACIÓN MENOR',
          descripcion: 'Secciones constructivas de escasa entidad en estructuras, acabados, cubierta, redes y carpintería.'
        },
        {
          titulo: 'REPRODUCCIÓN',
          descripcion: 'Reconstrucción de un elemento arquitectónico perdido que se realiza de forma idéntica al original.'
        },
        {
          titulo: 'RESTAURACIÓN',
          descripcion: 'Consiste en acciones constructivas de carácter excepcional. Tiene como fin conservar y revelar los valores estéticos o históricos y se fundamenta en el respeto hacia los elementos antiguos y las partes auténticas. Se detiene en el momento en que comienza la hipótesis, más allá todo complemento reconocido como indispensable, se destacará de la composición arquitectónica y llevará el sello de nuestro tiempo. Estará precedida y acompañada de un estudio arqueológico o histórico. Aplicable a edificios grado de protección 1 y 2.'
        },
        {
          titulo: 'RESTRICCIONES URBANÍSTICAS',
          descripcion: 'Limitaciones que, desde el punto de vista urbano, se establecen en el uso de suelo y en las intervenciones constructivas de las inversiones estatales y particulares.'
        },
        {
          titulo: 'RETRANQUEO DE LA EDIFICACIÓN',
          descripcion: 'Distancia a que debe situarse la línea de edificación respecto a las alineaciones oficiales medida perpendicularmente a ella, o respecto al lindero de parcela o medianeras.'
        },
        {
          titulo: 'REUSO / RECICLAJE / USO ADAPTATIVO',
          descripcion: 'Consiste en la acción constructiva encaminada a la recuperación de los valores patrimoniales tangibles e intangibles de una edificación. Implica cambio de uso en su función original o tradicional considerando las exigencias contemporáneas, puede conllevar a cierto grado de transformación en el inmueble. Aplicable en edificios grado de protección 1, 2 y 3.'
        },
        {
          titulo: 'RIESGO',
          descripcion: 'Probabilidad de que se produzcan consecuencias perjudiciales o eventuales pérdidas de vidas, heridos, destrucción de propiedades y medios de vida, trastornos de la actividad económica o daños al medio ambiente, como resultado de la interacción entre las amenazas naturales o provocadas por las actividades humanas y las condiciones de vulnerabilidad.'
        },
        {
          titulo: 'SALIENTES SOBRE LA VÍA',
          descripcion: 'Elementos, partes u objetos de las edificaciones que se proyectan sobre la vía pública, tales como balcones, marquesinas, aleros y otros, cuyas dimensiones y alturas sobre la vía pública(incluida la acera) son regulados.'
        },
        {
          titulo: 'SERVIDUMBRE DE VISTAS Y DE LUCES',
          descripcion: 'Gravámenes o limitaciones impuestas por unos inmuebles a otros para evitar vistas rectas, de costados u oblicuas, separación entre ventanas colindantes, apertura de vanos en paredes medianeras y otros aspectos similares.'
        },
        {
          titulo: 'SOLAR YERMO URBANO',
          descripcion: 'Toda porción de terreno, sin uso alguno, donde no exista edificación o que existiendo sea de poca significación. No se considera solar yermo el terreno anexo a otro edificio que integre unidad física inmobiliaria con él y, como tal, se encuentre inscripto en el Registro de propiedad.'
        },
        {
          titulo: 'SUBESTRUCTURA',
          descripcion: 'Conjunto de elementos estructurales encargados de trasmitir las acciones desde la superestructura a la infraestructura.'
        },
        {
          titulo: 'SUPERESTRUCTURA',
          descripcion: 'Conjunto de elementos estructurales que soportan directamente las acciones consecuencia del cumplimiento de su propia misión estructural. Constituida en términos generales por las vigas de puente, diafragmas, tablero, aceras, postes, pasamanos, capa de rodadura o durmientes, rieles, etc.'
        },
        {
          titulo: 'SUPERFICIE DESCUBIERTA',
          descripcion: 'Espacio no edificado dentro de la parcela. En regímenes de medianería esta superficie se obtiene físicamente a partir de patios interiores y patinejos, y ocupa un mínimo del 15 % de la parcela. Excepcionalmente, cuando se rompe este régimen, el área de pasillos laterales y de fondo de dicha parcela se considera también en la superficie descubierta.'
        },
        {
          titulo: 'TERRAZAS',
          descripcion: 'Espacios cubiertos o descubiertos de un edificio generalmente limitados por muros, rejas o balaustradas, resultante del retranqueo de la primera línea de fachada y/o en azotea.'
        },
        {
          titulo: 'TIPOLOGÍA ARQUITECTÓNICA',
          descripcion: 'Es el resultado de la agrupación de las edificaciones en tipos a partir de la determinación de rasgos constantes que las hacen integrar un conjunto claramente identificable.'
        },
        {
          titulo: 'TIPOLOGÍA URBANA',
          descripcion: 'Es el resultado de la agrupación de las manzanas de una zona urbana en tipos o modelos urbanos a partir de la determinación de rasgos constantes, que las hacen integrar un conjunto claramente identificable en virtud de su morfología, características ambientales, históricas y socioeconómicas.'
        },
        {
          titulo: 'TRAMPAS DE GRASA',
          descripcion: 'Dispositivos que se colocan en las instalaciones de producción industrial, agropecuarias y otras, para recoger los residuos de lubricantes minerales o compuestos orgánicos (glicéridos, lipoideos y otros) a fin de evitar la contaminación ambiental.'
        },
        {
          titulo: 'TRATAMIENTO DE RESIDUALES',
          descripcion: 'Técnicas y procedimientos que se aplican a los desechos sólidos, líquidos y gaseosos de la producción industrial, agropecuaria, de origen doméstico y otros a fin de proteger el medio ambiente. El tratamiento puede implicar el uso de dispositivos mecánicos, físicos, químicos y biológicos.'
        },
        {
          titulo: 'UNIDAD DE CARPINTERÍA',
          descripcion: 'Elemento completo y autónomo como puerta, ventana u otro similar.'
        },
        {
          titulo: 'UNIDAD DE HERRERÍA',
          descripcion: 'Elemento completo y autónomo de hierro, como rejas de puertas y ventanas, guardavecinos, portafaroles, barandas, balaustradas de balcones, etc.'
        },
        {
          titulo: 'UNIFICACIÓN',
          descripcion: 'Acción de crear una parcela, vivienda o servicio a partir de dos parcelas, viviendas o servicios inmediatos.'
        },
        {
          titulo: 'USO DE SUELO',
          descripcion: 'Calificación funcional urbanística del terreno urbanizado y urbanizable. Aprobación oficial para utilizarlo a tal fin.'
        },
        {
          titulo: 'USO TEMPORAL',
          descripcion: 'Uso de inmueble o parcela libre fijado por un espacio de tiempo limitado con máximo de hasta tres años.'
        },
        {
          titulo: 'USO TRANSITORIO',
          descripcion: 'Uso de inmueble o parcela libre fijado por un espacio de tiempo que caduca pronto con máximo de un año.'
        },
        {
          titulo: 'UTILIZABLE',
          descripcion: 'Documento que se otorga al ocupante de un inmueble como prueba fehaciente de que las obras han sido realizadas de acuerdo con la licencia de microlocalización concedida.'
        },
        {
          titulo: 'VALOR ARQUITECTÓNICO',
          descripcion: 'Cualidad de un bien cultural en todo o alguna de sus partes, o en su especialidad o tipología, que lo distingue de otro común por rasgos de carácter estético, utilitario, tecnológico, etc.'
        },
        {
          titulo: 'VALOR URBANÍSTICO',
          descripcion: 'Cualidad de un conjunto, sector, zona o área urbana, o de una ciudad que la distingue de otro comúnpor las características y aportes relevantes en cuanto a estructura, tipología, morfología, paisaje, historicidad, grado de conservación e innovaciones tecnológicas y funcionales.'
        },
        {
          titulo: 'VALOR ARTÍSTICO',
          descripcion: 'Calidad de un bien cultural que lo distingue de otro común por las características y aportes relevantes en el diseño, estilo, riqueza de los materiales usados y la presencia de elementos decorativos de especial interés.'
        },
        {
          titulo: 'VALOR HISTÓRICO',
          descripcion: 'Calidad reconocida de un bien cultural que lo distingue de otro común por hechos relevantes en el ámbito político, social, científico o cultural, o por la presencia de personalidades o por su antigüedad.'
        },
        { titulo: 'VANO', descripcion: 'Hueco o abertura en paredes para puertas y ventanas, o calado simplemente.' },
        {
          titulo: 'VENTANA DE LUZ',
          descripcion: 'Rompimientos menores en paredes que sirven más para iluminar que para mirar al exterior.'
        },
        {
          titulo: 'VÍA PÚBLICA',
          descripcion: 'Fajas pavimentadas destinadas al libre tránsito de vehículos y/o peatones tales como arterias, calles, senderos peatonales, paseos.'
        },
        {
          titulo: 'VÍAS O CALLES COLECTORAS',
          descripcion: 'Son las encargadas de encauzar el tráfico de distancias medias dentro del municipio o entre este y otros colindantes.'
        },
        {
          titulo: 'VÍAS O CALLES LOCALES',
          descripcion: 'Vías que conectan el tránsito entre instalaciones ubicadas en ellas y las de mayor jerarquía. Se caracterizan por bajas velocidades y moderado volumen de circulación, pueden destinarse a tránsito netamente peatonal de forma permanente, eventual o durante horarios establecidos al efecto.'
        },
        {
          titulo: 'VIGA Y LOSA',
          descripcion: 'Sistema constructivo generalizado a inicios del siglo XX basado en perfiles metálicos a modo de vigas separadas entre sí de 0,60 m a 1,00 m, sobre las que se apoyan pequeñas losas prefabricadas de variados tipos.'
        },
        {
          titulo: 'VINCULACIÓN DE EDIFICACIONES',
          descripcion: 'Acción de vincular internamente dos o más inmuebles contiguos.'
        },
        {
          titulo: 'VISTA',
          descripcion: 'Todo rompimiento o apertura que permita mirar directamente, con mayor o menor facilidad, fuera del edificio en que se practica.'
        },
        {
          titulo: 'VISTA OBLICUA',
          descripcion: 'Cuando la apertura esté practicada en una pared que forme ángulo con la línea divisoria de dos predios colindantes a menos de 0,60 m.'
        },
        {
          titulo: 'VISTA RECTA',
          descripcion: 'Cuando la apertura esté practicada en una pared paralela a la línea divisoria de dos predios colindantes. Pueden ser de dos tipos: a) De simple vista: Se extiende solo a la distancia de 2,00 m a contar desde el paramento exterior de la pared. Entran en el número de las servidumbres continuas y disfrutarlas durante treinta años concede el derecho de conservarlas. b) De registros: Se extiende a cuanto puede alcanzar la vista del hombre, y su servidumbre. Solo se adquiere por título, pero, esta última circunstancia, debe expresarse en los convenios de aperturas de vistas, a fin de evitar cuestionamientos.'
        },
        {
          titulo: 'VIVIENDA',
          descripcion: 'Toda edificación, local o recinto estructuralmente separado e independiente, construido o adaptado, en todo o en parte, para fines de alojamiento permanente de personas, y que cuente con los servicios básicos y auxiliares requeridos para tal función.'
        },
        {
          titulo: 'VULNERABILIDAD',
          descripcion: 'Dimensión en la cual una comunidad, estructura, servicio o área geográfica puede ser dañada o alterada por el impacto de una amenaza particular de un desastre debido a su naturaleza, construcción y proximidad a un terreno peligroso o área propensa al desastre.'
        },
        {
          titulo: 'ZAGUÁN',
          descripcion: 'Pieza cubierta que sirve de acceso a una edificación y que originalmente posibilitaba la entrada de carretas, coches y carruajes.'
        },
        {
          titulo: 'ZÓCALO',
          descripcion: 'Arquitectónicamente la franja horizontal del arranque de la edificación, de igual o diferente material que el resto de la fachada.'
        }
      ]
    }
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== `Name`)
    }
  },
  methods: {
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) { this.page += 1 }
    },
    formerPage () {
      if (this.page - 1 >= 1) { this.page -= 1 }
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    }
  }
}
</script>

<style scoped>
  .glossary {
    border-width: 3px !important;
    border-color: #8d0000 !important;
    border-style: solid !important;
  }
  .line {
    border-width: 1px !important;
    border-color: #8d0000 !important;
    border-style: solid !important;
  }
  .title {
    font-size: 24px !important;
    font-family: Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif !important;
  }
  .text {
    font-size: 18px !important;
    font-family: Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif !important;
    color: #464646 !important;
  }
</style>

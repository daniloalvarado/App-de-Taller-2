import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const patches = [
  {
    id: "1e302ac1-5eed-49da-ab7f-5eb0f12357b7", // Mauritia flexuosa
    patch: {
      set: {
        tipo_flor: "Actinomorfa, unisexual (especie dioica).",
        caracteres_diagnosticos: "Hojas costapalmadas muy grandes (en forma de abanico) en corona esférica; presencia de escamas rómbicas en el fruto.",
        tipo_infrutescencia: "Racimo de drupas colgante (suele cargar cientos de frutos)."
      }
    }
  },
  {
    id: "2c662568-e252-4393-8430-c8e70cad0e35", // Croton lechleri
    patch: {
      set: {
        tipo_flor: "Pequeña, actinomorfa y unisexual; flor pistilada sin pétalos vistosos.",
        caracteres_diagnosticos: "Secreción inmediata de un látex rojo oscuro (Sangre de grado) al cortar la corteza; hojas acorazonadas alternas.",
        tipo_infrutescencia: "Espiga de cápsulas."
      }
    }
  },
  {
    id: "acf3f468-5634-4306-ad32-69f6e85f7595", // Handroanthus serratifolius
    patch: {
      set: {
        tipo_flor: "Campanulada a tubular (zigomorfa), muy vistosa.",
        caracteres_diagnosticos: "Árbol caducifolio que explota en una floración masiva amarilla estando sin hojas; corteza fisurada y fuertes ramas.",
        tipo_infrutescencia: "No forma infrutescencia compleja (forman silicuas o cápsulas alargadas independientes)."
      }
    }
  },
  {
    id: "adb3e1bc-d639-4e2a-a7a8-eeb91a37ee90", // Heliconia rostrata
    patch: {
      set: {
        tipo_flor: "Tubular zigomorfa (escondida dentro de la bráctea).",
        caracteres_diagnosticos: "Inflorescencia péndula en forma de zigzag con hojas modificadas (brácteas) rojo pasión y borde amarillo-verdoso.",
        tipo_infrutescencia: "Espiga con drupas madurando dentro de las brácteas dísticas."
      }
    }
  }
]

async function run() {
  try {
    const transaction = client.transaction();
    patches.forEach(p => {
      transaction.patch(p.id, p.patch);
    });
    const res = await transaction.commit();
    console.log("Patched successfully:", res);
  } catch(e) {
    console.error("Error patching:", e);
  }
}

run();

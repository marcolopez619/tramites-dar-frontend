import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ImpresionFormularioCambioCarrera } from '../../estudiante/models/cambio_carrera.model';
import { ImpresionFormularioTraspaso } from '../../estudiante/models/traspaso.model';
import { EstudianteModel } from '../models/estudiante.model';
import { Imagen } from '../models/report.model';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class ReportesService {

  private fechaActual = this.getFechaActualAsLiteral();

  constructor() {
    //...
  }

  printAnulacionEstudiante(pEstudianteData: EstudianteModel, pMotivo?: string): void {
    const docDefinition = {
      pageSize: 'LETTER',
      background: [
        this.getDocumentoBackground()
      ],

      content: [
        {
          // Columnas para la cabecera
          columns: [
            this.getColumnsCabecera( 'FORMULARIO DE ANULACION DE CARRERA' ),
            this.getQRCode( `${pEstudianteData.tipoTramite} de : ${pEstudianteData.nombreCompleto}, en fecha : ${pEstudianteData.fechaSolicitud}` )
          ]
        },
        {
          // Columnas para datos del estudiante
          columns: [
            this.getColumnsDatoEstudiante(),
            this.getColumnsValuesDatoEstudiante( pEstudianteData , pMotivo)
          ]
        },

        {
          // Datos aclaratorios
          columns: [
            [
              {
                text: '\n\n\n\n\n\n\n\n\n'
              },
              {
                text: '*** NOTA ACLARATORIA *** \n\n',
                style: 'cuerpoTitulo'
              },
              {
                text: 'MEDIANTE LA FIRMA DEL PRESENTE DOCUMENTO IMPLICA LA DESVINCULACION DEFINITIVA DE LA CARRERA, SIN POSIBILIDAD DE REALIZAR TRAMITES DE CUALQUIER OTRO TIPO',
                style: 'cuerpoTexto'
              },
              {
                text: '\n'
              },
              {
                text: 'PARA CONSTANCIA DE LA PRESENTE ANULACION DE CARRERA Y ESTANDO CONSCIENTE DEL ALCANCE DEL MISMO FIRMO AL PIE DE LA PRESENTE',
                style: 'cuerpoTexto'
              },
              {
                text: '\n\n\n\n\n\n\n\n\n'
              }
            ]
          ]
        },
        {
          // columnas de las firmas
          columns: [
            {
              text: `Univ : ${pEstudianteData.nombreCompleto} \n Solicitante`,
              style: 'firma'
            },

            {
              text: '...................................... \n DIRECTOR DE CARRERA',
              style: 'firma'
            },

            {
              text: 'Lic: JOSE ALFREDO QUISBERT CHAVEZ \n JEFE ADMICIONES Y REGISTROS',
              style: 'firma'
            }
          ]
        }
      ],
      styles: {
        titulo: {
          bold: true,
          alignment: 'center',
          fontSize: 18
        },
        subtitulo: {
          bold: true,
          decoration: 'underline',
          alignment: 'center',
          fontSize: 16
        },
        columnTitle: {
          bold: true,
          alignment: 'right',
          fontSize: 14
        },
        columnValue: {
          bold: false,
          alignment: 'left',
          fontSize: 14
        },
        cuerpoTitulo: {
          bold: true,
          decoration: 'underline',
          alignment: 'center',
          fontSize: 11
        },
        cuerpoTexto: {
          bold: false,
          alignment: 'justify',
          fontSize: 10
        },
        firma: {
          bold: true,
          alignment: 'center',
          fontSize: 8
        }
      }
    };

    pdfMake.createPdf( docDefinition ).open();
  }

  printSuspencionEstudiante(pEstudianteData: EstudianteModel, pMotivo: string, pTiempo: number): void {
    const docDefinition = {
      pageSize: 'LETTER',
      background: [
        this.getDocumentoBackground()
      ],

      content: [
        {
          // Columnas para la cabecera
          columns: [
            this.getColumnsCabecera( 'FORMULARIO DE SUSPENCION DE ESTUDIOS' ),
            this.getQRCode( `${pEstudianteData.tipoTramite} de : ${pEstudianteData.nombreCompleto}, en fecha : ${pEstudianteData.fechaSolicitud}` )
          ]
        },
        {
          // Columnas para datos del estudiante
          columns: [
            this.getColumnsDatosSuspencionEstudiante(),
            this.getColumnsValuesDatosSuspencionEstudiante( pEstudianteData , pMotivo, pTiempo)
          ]
        },

        {
          // Datos aclaratorios
          columns: [
            [
              {
                text: '\n\n\n\n'
              },
             /*  {
                text: '*** NOTA ACLARATORIA *** \n\n',
                style: 'cuerpoTitulo'
              }, */
              {
                text: 'MEDIANTE LA FIRMA DEL PRESENTE DOCUMENTO ME COMPROMETO A CUMPLIR CON LOS REGLAMENTOS DE LA UATF PARA MI RETORNO A LA UNIVERSIDAD',
                style: 'cuerpoTexto'
              },
              {
                text: `\n\n\n\n\n\n\n\n\n\n Univ : ${pEstudianteData.nombreCompleto} \n Solicitante`,
                style: 'firma'
              },

              {
                text: '\n\n'
              },
              {
                text: 'CUMPLIDO LOS REQUISITOS REGLAMENTARIOS, SE ADMITE, LA SUSPENCION VOLUNTARIA DE ESTUDIOS A PARTIR DEL PERIODO ACTUAL',
                style: 'cuerpoTexto'
              },
              {
                text: '\n\n\n\n\n\n\n'
              }
            ]
          ]
        },
        {
          // columnas de las firmas
          columns: [
           /*  {
              text: `Univ : ${pEstudianteData.nombreCompleto} \n Solicitante`,
              style: 'firma'
            }, */
            {
              text: 'Lic: JOSE ALFREDO QUISBERT CHAVEZ \n JEFE ADMICIONES Y REGISTROS',
              style: 'firma'
            },

            {
              text: 'M.B.A. VICTOR HUGO VILLEGAS CH. \n VICERECTOR U.A.T.F.',
              style: 'firma'
            }

          ]
        }
      ],
      styles: {
        titulo: {
          bold: true,
          alignment: 'center',
          fontSize: 18
        },
        subtitulo: {
          bold: true,
          decoration: 'underline',
          alignment: 'center',
          fontSize: 16
        },
        columnTitle: {
          bold: true,
          alignment: 'right',
          fontSize: 14
        },
        columnValue: {
          bold: false,
          alignment: 'left',
          fontSize: 14
        },
        cuerpoTitulo: {
          bold: true,
          decoration: 'underline',
          alignment: 'center',
          fontSize: 11
        },
        cuerpoTexto: {
          bold: false,
          alignment: 'justify',
          fontSize: 10
        },
        firma: {
          bold: true,
          alignment: 'center',
          fontSize: 8
        }
      }
    };

    pdfMake.createPdf( docDefinition ).open();
  }

  printCambioCarreraEstudiante(pDataImpresion: ImpresionFormularioCambioCarrera): void {
    const docDefinition = {
      pageSize: 'LETTER',
      background: [
        this.getDocumentoBackground()
      ],

      content: [
        {
          // Columnas para la cabecera
          columns: [
            this.getColumnsSinSaltosDeLinea( 'FORMULARIO DE CAMBIO DE CARRERA' ),
            this.getQRCode( `Cambio de carrera de : ${pDataImpresion.nombrecompleto}, en fecha : ${pDataImpresion.fechaSolicitud}` )
          ]
        },
        {
          // Columnas para datos del estudiante
          columns: [[
            {
              text: '1) A Departamento de Admsiones y Registros de la U.A.T.F. '.toUpperCase(),
              style: 'cuerpoTextoNegritaSubrayado',
              aligment : 'left'
            },
            {
              text : `Yo ${pDataImpresion.nombrecompleto}, con número de CI: ${pDataImpresion.ci} y número de RU : ${pDataImpresion.ru}; respetuosamente SOLICITO CAMBIO DE CARRERA de la carrera : ${pDataImpresion.carreraOrigen} a la carrera de : ${pDataImpresion.carreradestino}, teniendo hasta el momento los siguientes datos :\n `,
              style : 'cuerpoTexto'
            },
            {
              ul : [
                `Cantidad de trasapasos de universidad realizados : ${pDataImpresion.cantidadtraspasosrealizados}`,
                `Materias aprobadas : ${pDataImpresion.materiasaprobadas}`,
                `Materias reprobadas : ${pDataImpresion.materiasreprobadas}`
              ],
              style : 'cuerpoTextoIzquierda',
              aligment : 'left'
            },
            {
              text : `El motivo por la cual solicito el cambio es: ${pDataImpresion.motivo}`,
              style : 'cuerpoTexto'
            },
            {
              text : `\n\n\n\n`
            },
            {
              columns : [
                {
                  text : `${this.fechaActual}`,
                  style : 'cuerpoTexto',
                  aligment : 'left'
                },
                {
                  text: `Univ : ${pDataImpresion.nombrecompleto} \n Solicitante`,
                  style: 'firma',
                  aligment : 'right'
                }
              ]
            }

          ]]
        },

        // DATOS PARA LA CARRERA ORGIEN
        {
          columns: [
            [
              {
                text: '\n'
              },
              {
                text:  `2) INFORME ACADEMICO DE LA JEFETURA DE LA CARRERA DE ORIGEN : ${pDataImpresion.carreraOrigen}`,
                style: 'cuerpoTextoNegritaSubrayado'
              },
              {
                text: `\n ${pDataImpresion.nombrecompleto}, de acuerdo a su archivo, ingresó a la universidad en la gestion academica : 1/2017, por lo tanto se encuentra inscrito en la presente carrera.`,
                style: 'cuerpoTexto'
              },
              {
                text : '\n\n\n\n'
              },
             {
              columns : [
                {
                  text : `Potosí, ...... de ...................... del 20...`,
                  style : 'cuerpoTexto',
                  aligment : 'left'
                },
                {
                  text: `Director de Carrera \n ${pDataImpresion.carreraOrigen}`,
                  style: 'firma',
                  aligment : 'right'
                }
              ]
             }
            ]
          ]
        },

        {
          // DATOS PARA LA CARRERA DESTINO
          columns: [
            [
              {
                text: '\n'
              },
              {
                text:  `3) INFORME ACADEMICO DE LA JEFETURA DE LA CARRERA DE DESTINO : ${pDataImpresion.carreradestino}`,
                style: 'cuerpoTextoNegritaSubrayado'
              },
              {
                text: `\n Realizadas las consultas pertinentes a la carrera pertinente, se llega a las siguientes conclusiones : `,
                style: 'cuerpoTexto'
              },
              {
                text : `( ) SE ACEPTA - ( ) NO SE ACEPTA, LA SOLICITUD DE CAMBIO DE CARRERA,  ( ) CON CONVALIDACIONES DE MATERIAS - ( ) SIN CONVALIDACIONES DE MATERIAS`,
                style : 'cuerpoTexto'
              },
              {
                text: '\n\n\n'
              },
             {
              columns : [
                {
                  text : `Potosí, ...... de ...................... del 20...`,
                  style : 'cuerpoTexto',
                  aligment : 'left'
                },
                {
                  text: `Director de Carrera \n ${pDataImpresion.carreradestino}`,
                  style: 'firma',
                  aligment : 'right'
                }
              ]
             }
            ]
          ]
        },

        {
          // DATOS PARA EL DAR
          columns: [
            [
              {
                text: '\n'
              },
              {
                text:  `4) VERIFICACION DEL DEPARTAMENTO DE ADMISIONES Y REGISTROS`,
                style: 'cuerpoTextoNegritaSubrayado'
              },
              {
                text: `\nUna vez ACEPTADA la solicitud de Cambio de Carrera de : ${pDataImpresion.nombrecompleto}, en las condiciones señaladas en el punto 3 de la presente, procédase a la inscripcion en la carrera de : ${pDataImpresion.carreradestino}, previo cumplimiento de ltodos los requisitos reglamentarios vigentes.`,
                style: 'cuerpoTexto'
              },
             {
              columns : [
                {
                  text: '\n\n\n\n\n Lic: JOSE ALFREDO QUISBERT CHAVEZ \n JEFE ADMICIONES Y REGISTROS',
                  style: 'firma',
                  aligment : 'right'
                }
              ]
             }
            ]
          ]
        }

      ],
      styles: {
        titulo: {
          bold: true,
          alignment: 'center',
          fontSize: 18
        },
        subtitulo: {
          bold: true,
          decoration: 'underline',
          alignment: 'center',
          fontSize: 16
        },
        columnTitle: {
          bold: true,
          alignment: 'right',
          fontSize: 14
        },
        columnValue: {
          bold: false,
          alignment: 'left',
          fontSize: 14
        },
        cuerpoTitulo: {
          bold: true,
          decoration: 'underline',
          alignment: 'center',
          fontSize: 11
        },
        cuerpoTexto: {
          bold: false,
          alignment: 'justify',
          fontSize: 10
        },
        cuerpoTextoIzquierda: {
          bold: false,
          alignment: 'left',
          fontSize: 10
        },
        cuerpoTextoCentro: {
          bold: false,
          alignment: 'center',
          fontSize: 10
        },
        cuerpoTextoNegritaSubrayado: {
          bold: true,
          decoration: 'underline',
          alignment: 'justify',
          fontSize: 10
        },
        firma: {
          bold: true,
          alignment: 'center',
          fontSize: 8
        }
      }
    };

    pdfMake.createPdf( docDefinition ).open();
  }

  printTraspasoUniversidadEstudiante(pDataImpresion: ImpresionFormularioTraspaso): void {
    const docDefinition = {
      pageSize: 'LETTER',
      background: [
        this.getDocumentoBackground()
      ],

      content: [
        {
          // Columnas para la cabecera
          columns: [
            this.getColumnsSinSaltosDeLinea( 'FORMULARIO DE TRASPASO DE UNIVERSIDAD' ),
            this.getQRCode( `Traspaso de universidad de : UATF, a : ${pDataImpresion.universidaddestino}, carrera : ${pDataImpresion.carreradestino}, en fecha : ${pDataImpresion.fechaSolicitud}` )
          ]
        },
        {
          // Columnas para datos del estudiante
          columns: [[
            {
              text: '1) A DEPARTAMENTO DE ADMISIONES Y REGISTROS DE LA  U.A.T.F. \n',
              style: 'cuerpoTextoNegritaSubrayado',
              aligment : 'left'
            },
            {
              text : `Yo ${pDataImpresion.nombrecompleto}, con número de CI: ${pDataImpresion.ci} y número de RU : ${pDataImpresion.ru}; respetuosamente SOLICITO TRASPASO a la : ${pDataImpresion.universidaddestino}, a la carrera de : ${pDataImpresion.carreradestino}, para el período ; ${pDataImpresion.periodo}; para ello, cuento con la siguiente información :\n `,
              style : 'cuerpoTexto'
            },
            {
              ul : [
                `Año de ingreso a la universidad : ${pDataImpresion.anioIngreso}`,
                `Carrera actual : ${pDataImpresion.carreraorigen}`,
                `Número de diploma de bachiller : ${pDataImpresion.numerodiploma}`,
                `Materias aprobadas : ${pDataImpresion.materiasAprobadas}`,
                `Materias reprobadas : ${pDataImpresion.materiasReprobadas}`,
                `Promedio general : ${pDataImpresion.promediogeneral} %`
              ],
              style : 'cuerpoTextoIzquierda',
              alignment: 'left'
            },
            {
              text : `El motivo por la cual solicito el traspaso de universidad es : ${pDataImpresion.motivo}`,
              style : 'cuerpoTexto'
            },
            {
              text : `\n\n\n\n`
            },
            {
              columns : [
                {
                  text : `${this.fechaActual}`,
                  style : 'cuerpoTexto',
                  aligment : 'left'
                },
                {
                  text: `Univ : ${pDataImpresion.nombrecompleto} \n Solicitante`,
                  style: 'firma',
                  aligment : 'right'
                }
              ]
            }

          ]]
        },

        // DATOS PARA VERIFICACION DEL DAR
        {
          columns: [
            [
              {
                text: '\n'
              },
              {
                text:  `2) VERIFICACION DE INFORMACION EN REGISTROS Y ADMISIONES \n`,
                style: 'cuerpoTextoNegritaSubrayado'
              },
              {
                text: `Realizadas las consultas a la : ${pDataImpresion.universidaddestino}, me permito informar a su autoridad que la SOLICITUD DE TRASPASO efectuada por ${pDataImpresion.nombrecompleto}, ha sido : `,
                style: 'cuerpoTexto'
              },
              {
                text : `\n\n (   ) ACEPTADA      (   ) RECHAZADA  \n\n En consecuencia  se : (   ) CONTINUA      (    ) FINALIZA , con el tramite solicitado `,
                style : 'cuerpoTexto',
                alignment: 'center'
              },
              {
                text : '\n\n\n\n'
              },
             {
              columns : [
                {
                  text : `Potosí, ...... de ...................... del 20...`,
                  style : 'cuerpoTexto',
                  aligment : 'left'
                },
                {
                  text: 'Lic: JOSE ALFREDO QUISBERT CHAVEZ \n JEFE ADMICIONES Y REGISTROS',
                  style: 'firma',
                  aligment : 'right'
                }
              ]
             }
            ]
          ]
        },

        {
          // Datos para enviar al DAR de la universidad destino.
          columns: [
            [
              {
                text: '\n'
              },
              {
                text:  `3) DEPARTAMENTO DE REGISTROS Y ADMISIONES DE LA : ${pDataImpresion.universidaddestino} \n`,
                style: 'cuerpoTextoNegritaSubrayado'
              },
              {
                text: `Se ACEPTA la solicitud de TRASPASO DE UNIVERSIDAD de: ${pDataImpresion.nombrecompleto}, en las considiones señaladas en la presente, agradecemos su colaboracion para la inscripcion en la mencionada universidad, previo cumplimiento de todos los requisitos reglamentarios.`,
                style: 'cuerpoTexto'
              },
              {
                text : '\n\n\n\n'
              },
             {
              columns : [
                {
                  text : `Potosí, ...... de ...................... del 20...`,
                  style : 'cuerpoTexto',
                  aligment : 'left'
                },
                {
                  text: 'M.B.A. Victor Hugo Villegas Ch. \n VICERECTOR U.A.T.F.',
                  style: 'firma',
                  aligment : 'right'
                }
              ]
             }
            ]
          ]
        }

      ],
      styles: {
        titulo: {
          bold: true,
          alignment: 'center',
          fontSize: 18
        },
        subtitulo: {
          bold: true,
          decoration: 'underline',
          alignment: 'center',
          fontSize: 16
        },
        columnTitle: {
          bold: true,
          alignment: 'right',
          fontSize: 14
        },
        columnValue: {
          bold: false,
          alignment: 'left',
          fontSize: 14
        },
        cuerpoTitulo: {
          bold: true,
          decoration: 'underline',
          alignment: 'center',
          fontSize: 11
        },
        cuerpoTexto: {
          bold: false,
          alignment: 'justify',
          fontSize: 10
        },
        cuerpoTextoIzquierda: {
          bold: false,
          alignment: 'left',
          fontSize: 10
        },
        cuerpoTextoCentro: {
          bold: false,
          alignment: 'center',
          fontSize: 10
        },
        cuerpoTextoNegritaSubrayado: {
          bold: true,
          decoration: 'underline',
          alignment: 'justify',
          fontSize: 10
        },
        firma: {
          bold: true,
          alignment: 'center',
          fontSize: 8
        }
      }
    };

    pdfMake.createPdf( docDefinition ).open();
  }

  private getFechaActualAsLiteral(): string {
    const fechaActual = new Date();
    let fechaActualLiteral = `Potosí, ${fechaActual.getDate()} de `;

    switch (fechaActual.getMonth()) {
      case 0 :  fechaActualLiteral = fechaActualLiteral.concat( 'Enero' ).concat( ` de ${fechaActual.getFullYear() }` ); break;
      case 1 :  fechaActualLiteral = fechaActualLiteral.concat( 'Febrero' ).concat( ` de ${fechaActual.getFullYear() }` ); break;
      case 2 :  fechaActualLiteral = fechaActualLiteral.concat( 'Marzo' ).concat( ` de ${fechaActual.getFullYear() }` ); break;
      case 3 :  fechaActualLiteral = fechaActualLiteral.concat( 'Abril' ).concat( ` de ${fechaActual.getFullYear() }` ); break;
      case 4 :  fechaActualLiteral = fechaActualLiteral.concat( 'Mayo' ).concat( ` de ${fechaActual.getFullYear() }` ); break;
      case 5 :  fechaActualLiteral = fechaActualLiteral.concat( 'Junio' ).concat( ` de ${fechaActual.getFullYear() }` ); break;
      case 6 :  fechaActualLiteral = fechaActualLiteral.concat( 'Julio' ).concat( ` de ${fechaActual.getFullYear() }` ); break;
      case 7 :  fechaActualLiteral = fechaActualLiteral.concat( 'Agosto' ).concat( ` de ${fechaActual.getFullYear() }` ); break;
      case 8 :  fechaActualLiteral = fechaActualLiteral.concat( 'Septiembre' ).concat( ` de ${fechaActual.getFullYear() }` ); break;
      case 9 :  fechaActualLiteral = fechaActualLiteral.concat( 'Octubre' ).concat( ` de ${fechaActual.getFullYear() }` ); break;
      case 10 :  fechaActualLiteral = fechaActualLiteral.concat( 'Noviembre' ).concat( ` de ${fechaActual.getFullYear() }` ); break;
      case 11 :  fechaActualLiteral = fechaActualLiteral.concat( 'Diciembre' ).concat( ` de ${fechaActual.getFullYear() }` ); break;
      default: break;
    }

    return fechaActualLiteral;
  }

  private getDocumentoBackground(): any {
    return {
      image           : Imagen.LOGO_UATF,
      width           : 400,
      alignment       : 'center',
      opacity         : 0.1,
      absolutePosition: { y: 150 }
    };
  }

  private getColumnsCabecera(pTituloTramite: string): any {
    return [
      [
        {
          text: '\n\n'
        },
        {
          text : 'UNIVERSIDAD AUTONOMA TOMAS FRIAS',
          style: 'titulo'
        },
        {
          text: '\n'
        },
        {
          text : pTituloTramite,
          style: 'subtitulo'
        },
        {
          text: '\n\n\n\n\n\n\n\n'
        }
      ]
    ];
  }

  private getColumnsSinSaltosDeLinea(pTituloTramite: string): any {
    return [
      [
        {
          text: '\n\n'
        },
        {
          text : 'UNIVERSIDAD AUTONOMA TOMAS FRIAS',
          style: 'titulo'
        },
        {
          text: '\n'
        },
        {
          text : pTituloTramite,
          style: 'subtitulo'
        },
        {
          text : '\n'
        }
      ]
    ];
  }

  private getQRCode( pData: any ): any {
    return {
      qr       : pData,
      fit      : '100',
      width    : 80,
      alignment: 'right'
    };
  }

  private getColumnsDatoEstudiante(): any {
    return [
      {
        text: 'FACULTAD : ',
        style: 'columnTitle'
      },
      {
        text: 'CARRERA : ',
        style: 'columnTitle'
      },
      {
        text: 'R.U. : ',
        style: 'columnTitle'
      },
      {
        text: 'C.I. : ',
        style: 'columnTitle'
      },
      {
        text: 'NOMBRE COMPLETO : ',
        style: 'columnTitle'
      },
      {
        text: 'FECHA SOLICITUD : ',
        style: 'columnTitle'
      },
      {
        text: 'MOTIVO : ',
        style: 'columnTitle'
      }
    ];
  }

  private getColumnsDatosSuspencionEstudiante(): any {
    return [
      {
        text: 'FACULTAD : ',
        style: 'columnTitle'
      },
      {
        text: 'CARRERA : ',
        style: 'columnTitle'
      },
      {
        text: 'R.U. : ',
        style: 'columnTitle'
      },
      {
        text: 'C.I. : ',
        style: 'columnTitle'
      },
      {
        text: 'NOMBRE COMPLETO : ',
        style: 'columnTitle'
      },
      {
        text: 'FECHA SOLICITUD : ',
        style: 'columnTitle'
      },
      {
        text: 'TIEMPO SOLICITADO : ',
        style: 'columnTitle'
      },
      {
        text: 'MOTIVO : ',
        style: 'columnTitle'
      }
    ];
  }

  private getColumnsValuesDatoEstudiante( pEstudianteData: EstudianteModel, pMotivo?: string ): any {
    return [
      {
        text: pEstudianteData.facultad,
        style: 'columnValue'
      },
      {
        text: pEstudianteData.carrera,
        style: 'columnValue'
      },
      {
        text: pEstudianteData.ru,
        style: 'columnValue'
      },
      {
        text: pEstudianteData.ci,
        style: 'columnValue'
      },
      {
        text: pEstudianteData.nombreCompleto,
        style: 'columnValue'
      },
      {
        text: pEstudianteData.fechaSolicitud,
        style: 'columnValue'
      },
      {
        text: pMotivo ?? '------ SIN MOTIVO -------',
        style: 'columnValue'
      }
    ];
  }
  private getColumnsValuesDatosSuspencionEstudiante( pEstudianteData: EstudianteModel, pMotivo: string, pTiempo: number ): any {
    return [
      {
        text: pEstudianteData.facultad,
        style: 'columnValue'
      },
      {
        text: pEstudianteData.carrera,
        style: 'columnValue'
      },
      {
        text: pEstudianteData.ru,
        style: 'columnValue'
      },
      {
        text: pEstudianteData.ci,
        style: 'columnValue'
      },
      {
        text: pEstudianteData.nombreCompleto,
        style: 'columnValue'
      },
      {
        text: pEstudianteData.fechaSolicitud,
        style: 'columnValue'
      },
      {
        text: `${pTiempo} GESTION(ES)`,
        style: 'columnValue'
      },
      {
        text: pMotivo ?? '------ SIN MOTIVO -------',
        style: 'columnValue'
      }
    ];
  }
}

import { Injectable } from '@angular/core';
import { ContextoService } from './contexto.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Imagen } from '../models/report.model';
import { EstudianteModel } from '../models/estudiante.model';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class ReportesService {

  constructor(private contextoService: ContextoService) {}

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

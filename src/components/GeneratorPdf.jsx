import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import ButtonVe from './ButtonVe';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const GeneratorPDF = ({ titulo, headers, data }) => {

    const handleClick = () => {
        // console.log('Esta imprimiendo')
        const filas = data.map(row => headers.map(header => row[header]));

        const document = {
            content: [
                {
                    text: titulo,
                    style: 'header',
                    bold: true,
                    fontSize: 20,
                    alignment: 'center',
                    margin: [0, 0, 0, 20]
                },
                {
                    style: 'data',
                    table: {
                        widths: Array(headers.length).fill('*'), // Ajusta el ancho de las columnas
                        body: [
                            // Agrega un estilo a los encabezados de la tabla
                            headers.map(header => ({ text: header, style: 'tableHeader' })),
                            ...filas
                        ]
                    },
                    layout: 'lightHorizontalLines' // Agrega líneas horizontales a la tabla
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                tableExample: {
                    margin: [0, 5, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }
        };

        pdfMake.createPdf(document).download()
    }

    return (
        <ButtonVe content={'Generar PDF'} click={handleClick} />
    );
}

export default GeneratorPDF;

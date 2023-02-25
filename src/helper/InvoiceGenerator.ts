import RNHTMLtoPDF, {Pdf} from 'react-native-html-to-pdf';
import {MilkEntryList} from '../model/MilkEntryList';
import moment from 'moment';
import {Alert, Share} from 'react-native';

export class InvoiceGenerator {
  async createPDF(list: MilkEntryList, total: number) {
    const fileName = `MilkCan_Invoice_${new Date().getTime()}`;
    let listHTML = '';

    list.map(milkEntry => {
      const date = `${moment(milkEntry.dateEntry).format('DD/MM/YYYY')}`;
      const litter = `${milkEntry.literEntry}`;
      const fat = `${milkEntry.fatEntry}`;
      const prise = `${milkEntry.prizeEntry}`;
      const totalInRaw =
        parseInt(litter, 10) * parseInt(fat, 10) * parseInt(prise, 10);

      listHTML =
        listHTML +
        `<tr style="border: 1px solid black">
           <td style="border: 1px solid black; text-align: center;">${date}</td> 
           <td style="border: 1px solid black; text-align: center;">${litter}</td> 
           <td style="border: 1px solid black; text-align: center;">${fat}</td> 
           <td style="border: 1px solid black; text-align: center;">${prise}</td> 
           <td style="border: 1px solid black; text-align: center;">${totalInRaw}</td>
         </tr>
        `;
    });

    let options = {
      html: `<div>
              <h1>MilkCan</h1>
              <h2>Invoice : ${new Date().getTime()}</h2>
              <table style="width:100%; border: 1px solid black">
               <tr style="border: 1px solid black">
                 <th style="border: 1px solid black; text-align: center;">Date</th> 
                 <th style="border: 1px solid black; text-align: center;">Litter</th> 
                 <th style="border: 1px solid black; text-align: center;">Fat</th> 
                 <th style="border: 1px solid black; text-align: center;">Price</th> 
                 <th style="border: 1px solid black; text-align: center;">Total</th>
               </tr>
              ${listHTML}</table>
              </br>
              <h1 style="text-align: right">Total : ${total}</h1>
             </div>`,
      fileName: fileName,
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file);
    if (file) {
      this.shareFile(file, fileName);
    }
  }

  async shareFile(file: Pdf, filName: string) {
    try {
      await Share.share({
        url: file.filePath ?? '',
        title: filName,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }
}

export const invoiceGenerator = new InvoiceGenerator();

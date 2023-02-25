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
        `<div>
           <p>Date: ${date}</p> 
           <p>Litter: ${litter}</p> 
           <p>Fat: ${fat}</p> 
           <p>Prise: ${prise}</p> 
           <p>Total: ${totalInRaw}</p>
         </div>
         </br>`;
    });

    let options = {
      html: `<div>
              <h1>MilkCan</h1>
              </br>
              <h2>Invoice : ${new Date().getTime()}</h2>
              </br>
               ${listHTML}
              </br>
              <h1>Total : ${total}</h1>
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

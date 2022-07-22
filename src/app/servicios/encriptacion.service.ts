import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncriptacionService {

  private secretKey = "construccion$proceso%aviles#moreira";

  constructor() { }

  encrypt_text(value : string) : string{
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  }

  decrypt_text(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey).toString(CryptoJS.enc.Utf8);
  }

  encrypt_object(value : any) : string{
    return CryptoJS.AES.encrypt(JSON.stringify(value), this.secretKey).toString();
  }

  decrypt_object(textToDecrypt : any){
    return JSON.parse(CryptoJS.AES.decrypt(textToDecrypt, this.secretKey).toString(CryptoJS.enc.Utf8));
  }
}

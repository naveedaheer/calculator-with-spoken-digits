import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
   @ViewChild('ageInput', {static:false}) ageInput: ElementRef;

  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;
  age;

  constructor() { }

  ngOnInit() {
  }

  setAge(){
  this.age = this.ageInput.nativeElement.value;
  }

  back(){
    this.age = undefined;
  }

  public getNumber(v: string){
    console.log(v);
    const path = `../../assets/${v}.wav`
    const audio = new Audio(path);


    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;

    }
audio.play();

  }

  getDecimal(){
    const audio = new Audio('../../assets/point.wav');
    audio.play();
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }

  private doCalculation(op , secondOp){
    switch (op){
      case '+':
      return this.firstOperand += secondOp; 
      case '-': 
      return this.firstOperand -= secondOp; 
      case '*': 
      return this.firstOperand *= secondOp; 
      case '/': 
      return this.firstOperand /= secondOp; 
      case '=':
      return secondOp;
    }
  }
  public getOperation(op: string){
    console.log(op);
    let audioPath;
    if(op==="*"){
      audioPath = `../../assets/Multiply.wav`
    }else if(op==="/"){
      audioPath = `../../assets/Divide.wav`
    }
    else if(op==="="){
      audioPath = `../../assets/ANSWER.wav`
    }
    else{
      audioPath = `../../assets/${op}.wav`
    }
    const audio = new Audio(audioPath);
    if(this.firstOperand === null){
      this.firstOperand = Number(this.currentNumber);

    }else if(this.operator){
      const result = this.doCalculation(this.operator , Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = result;
     setTimeout(() => {
       this.resultAudio(result);
     }, 1000); 
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);
audio.play(); 
  }

  public clear(){
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }

  private resultAudio(result){
    const resultFinal = result.toString();
    console.log("result", resultFinal)
    let audioPath;
    for(let i=0; i<resultFinal.length; i++){
      (function(index) {
      audioPath = `../../assets/${resultFinal.charAt(index)}.wav`;
      console.log("audioPath", audioPath);
      const audio = new Audio(audioPath);
      setTimeout(() => {
        audio.play(); 
      }, i * 1000);
    })(i); 
    }

  }

  decimalToOctal(){
    this.currentNumber = (Number(this.currentNumber)).toString(8);
  }
  octalToDecimal(){
    this.currentNumber = (parseInt(this.currentNumber, 8).toString());
  }
  binaryToDecimal(){
    this.currentNumber = (Number(this.currentNumber)).toString(2);
  }
  decimalToBinary(){
    this.currentNumber = (parseInt(this.currentNumber, 2).toString());
  }
}

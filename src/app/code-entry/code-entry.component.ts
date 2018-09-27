import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-code-entry',
  templateUrl: './code-entry.component.html',
  styleUrls: ['./code-entry.component.css']
})
export class CodeEntryComponent implements OnInit {
  @ViewChild("code1") code1Input: ElementRef;
  @ViewChild("code2") code2Input: ElementRef;
  @ViewChild("code3") code3Input: ElementRef;
  @ViewChild("code4") code4Input: ElementRef;
  showSubmitProgress: boolean = false;
  showSubmitSuccess: boolean = false;
  codeChars: Array<string>;
  maxchars: number = 4;

  constructor() {
    this.codeChars = new Array(this.maxchars)
  }

  ngOnInit() {
    this.code1Input.nativeElement.focus();
  }

  onCodeKey(charNum: number, value: string) {
    if (value.trim().length > 0) {
      this.advance(value.trim(), charNum)
    }
  }

  advance(currentChar: string, currentPos: number) {
    this.codeChars[currentPos - 1] = currentChar;
    let complete = true; // until proven otherwise
    for (let i=0; i<this.maxchars; i++) {
      if (!this.codeChars[i]) {
        complete = false;
        break;
      } else if (this.codeChars[i].trim().length <= 0) {
        complete = false;
        break;
      }
    }
    if (!complete) {
      // advance position
      switch (currentPos) {
        case 1:
          this.code2Input.nativeElement.focus();
          break;
        case 2:
          this.code3Input.nativeElement.focus();
          break;
        case 3:
          this.code4Input.nativeElement.focus();
          break;
      }
    } else {
      // complete
      this.showSubmitProgress = true;
      // todo ...
      let completedCode = this.codeChars.join('');
      console.log(`Ready to submit: ${completedCode}`)


    }
  }

}

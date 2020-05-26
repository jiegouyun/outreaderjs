import { readLineByLine, extractData } from "@outreader/core";
import * as path from "path";

export async function readWmassOutput(dir: string) {
  const file = path.join(dir, "wmass1.out");
  await readLineByLine(file, (line: string) => {
    // TODO
    // Extract valuable data from .out
    // console.log(line);

    // Divide line into array
    let lineArray: string[] = [];    
    if (line.length >0) {
      lineArray = lineToArray(line);
      // console.log(`${typeof(lineArray)} : ${lineArray}`);
    }

    // Temporary parameter definition, will be deleted after database was used
    let engineering: string = "";
    let engineeringCode: string = "";
    let designer: string = "";
    let checker: string = "";
    let software: string = "";
    let softwareVersion: string[] = [];
    let calDate: string[] = [];
    
    // Extract information{}
    if (lineArray.length != 0) {
      // console.log(lineArray);
      engineering = extractData(lineArray, "工程名称", 0, 1);
      engineeringCode = extractData(lineArray, "工程代号", 0, 1);
      designer = extractData(lineArray, "设计人", 0, 1);
      checker = extractData(lineArray, "校核人", 0, 1);
      software = extractData(lineArray, "软件名称", 0, 1);
      softwareVersion = extractData(lineArray, "版本", 0, [1, 2]);
      calDate = extractData(lineArray, "计算日期", 0, [1, 2, 3]);

    }
  });
}

/**
 * @description devide line string and return string array
 * @param line: original line string
 */
export function lineToArray(line: string): string[] {  
  const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa5]+\d*\-?\d*|-?\d+\.?\d*[a-zA-Z]*\+?\d*/g;
  return line.match(regexp) || [];  
}
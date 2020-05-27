import {
  readLineByLine,
  extractData,
  checkObjectKeysIfAllExtracted,
} from "@outreader/core";
import * as path from "path";

export interface IWmass {
  information: IInformation;
}

export interface IInformation {
  engineering?: string;
  engineeringCode?: string;
  designer?: string;
  checker?: string;
  software?: string;
  softwareVersion?: string[];
  calDate?: string[];
  allExtracted?: boolean;
}

export async function readWmassOutput(dir: string): Promise<IWmass> {
  const file = path.join(dir, "wmass.out");
  let wmass: IWmass = {
    information: { allExtracted: false },
  };

  await readLineByLine(file, (line: string) => {
    // Extract valuable data from .out

    if (line.length === 0) {
      return;
    }

    // Divide line into array
    let lineArray: string[] = [];
    if (line.length > 0) {
      lineArray = lineToArray(line);
      // console.log(`${typeof(lineArray)} : ${lineArray}`);
    }

    if (lineArray.length === 0) {
      return;
    }

    // Extract information{}
    if (!wmass.information.allExtracted) {
      wmass.information = extractInformation(wmass.information, lineArray);
    }
  });

  console.log(wmass);
  return wmass;
}

export function extractInformation(
  information: IInformation,
  lineArray: string[]
): IInformation {
  if (!Boolean(information.engineering)) {
    information.engineering = extractData(lineArray, "工程名称", 0, 1);
  }
  if (!Boolean(information.engineeringCode)) {
    information.engineeringCode = extractData(lineArray, "工程代号", 0, 1);
  }
  if (!Boolean(information.designer)) {
    information.designer = extractData(lineArray, "设计人", 0, 1);
  }
  if (!Boolean(information.checker)) {
    information.checker = extractData(lineArray, "校核人", 0, 1);
  }
  if (!Boolean(information.software)) {
    information.software = extractData(lineArray, "软件名称", 0, 1);
  }
  if (!Boolean(information.softwareVersion)) {
    information.softwareVersion = extractData(lineArray, "版本", 0, [1, 2]);
  }
  if (!Boolean(information.calDate)) {
    information.calDate = extractData(lineArray, "计算日期", 0, [1, 2, 3]);
  }

  information.allExtracted = checkObjectKeysIfAllExtracted(information);

  return information;
}

/**
 * @description devide line string and return string array
 * @param line: original line string
 */
export function lineToArray(line: string): string[] {
  const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa5]+\d*\-?\d*|-?\d+\.?\d*[a-zA-Z]*\+?\d*/g;
  return line.match(regexp) || [];
}
